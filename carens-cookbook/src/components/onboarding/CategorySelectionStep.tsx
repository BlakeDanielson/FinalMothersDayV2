'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Edit2, Check, AlertCircle, Info, GripVertical, Undo2, Redo2, Trash2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CATEGORY_METADATA } from '@/lib/constants/categories';
import { VALIDATION_RULES } from '@/lib/constants/user-preferences';
import { toast } from 'sonner';

// Types for category management
interface CategoryItem {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  isCustom: boolean;
  isEditing: boolean;
  originalName?: string;
  order: number;
}

interface CategorySelectionStepProps {
  onNext: (data: CategorySelectionData) => void;
  onBack: () => void;
  initialData?: Partial<CategorySelectionData>;
  isLoading?: boolean;
}

export interface CategorySelectionData {
  selectedCategories: string[];
  customCategories: Array<{
    name: string;
    description: string;
  }>;
  removedCategories: string[];
  categoryOrder: string[];
}

// Category suggestions based on cooking patterns
const CATEGORY_SUGGESTIONS = [
  { name: 'Quick Meals', description: 'Recipes that can be made in 30 minutes or less' },
  { name: 'Meal Prep', description: 'Make-ahead recipes perfect for weekly meal planning' },
  { name: 'One-Pot Meals', description: 'Complete meals made in a single pot or pan' },
  { name: 'Healthy Options', description: 'Nutritious and wholesome recipe choices' },
  { name: 'Comfort Food', description: 'Hearty, satisfying dishes for cozy meals' },
  { name: 'Holiday Treats', description: 'Special recipes for celebrations and holidays' },
  { name: 'Kid-Friendly', description: 'Recipes that children will love' },
  { name: 'Date Night', description: 'Romantic and special occasion recipes' },
  { name: 'Budget-Friendly', description: 'Delicious meals that won\'t break the bank' },
  { name: 'Seasonal', description: 'Recipes featuring seasonal ingredients' }
];

// History management for undo/redo
interface HistoryState {
  categories: CategoryItem[];
  timestamp: number;
}

// Validation schema
const validationSchema = Yup.object({
  selectedCategories: Yup.array()
    .min(3, 'Please select at least 3 categories for better organization')
    .required('Please select at least 3 categories'),
  customCategories: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .min(VALIDATION_RULES.categoryName.minLength, `Category name must be at least ${VALIDATION_RULES.categoryName.minLength} characters`)
        .max(VALIDATION_RULES.categoryName.maxLength, `Category name must be less than ${VALIDATION_RULES.categoryName.maxLength} characters`)
        .required('Category name is required'),
      description: Yup.string()
        .max(VALIDATION_RULES.categoryDescription.maxLength, `Description must be less than ${VALIDATION_RULES.categoryDescription.maxLength} characters`)
    })
  )
});

// Custom hook for debounced validation
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Enhanced Category Selection Interface for Onboarding
 * Includes drag-and-drop, bulk operations, suggestions, and undo/redo
 */
export function CategorySelectionStep({
  onNext,
  onBack,
  initialData,
  isLoading = false
}: CategorySelectionStepProps) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [bulkSelectMode, setBulkSelectMode] = useState(false);
  const [selectedForBulk, setSelectedForBulk] = useState<Set<string>>(new Set());
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  // History management for undo/redo
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoOperation = useRef(false);

  // Debounced category name for validation
  const debouncedCategoryName = useDebounce(newCategoryName, 300);

  // Initialize categories from metadata
  useEffect(() => {
    const defaultCategories = Object.entries(CATEGORY_METADATA).map(([name, metadata], index) => ({
      id: `default-${name}`,
      name,
      description: metadata.description || '',
      isSelected: initialData?.selectedCategories?.includes(name) ?? true,
      isCustom: false,
      isEditing: false,
      originalName: name,
      order: index
    }));

    // Add any custom categories from initial data
    const customCategories = (initialData?.customCategories || []).map((cat, index) => ({
      id: `custom-${index}`,
      name: cat.name,
      description: cat.description,
      isSelected: true,
      isCustom: true,
      isEditing: false,
      order: defaultCategories.length + index
    }));

    const allCategories = [...defaultCategories, ...customCategories];
    setCategories(allCategories);
    
    // Initialize history
    if (!isUndoRedoOperation.current) {
      setHistory([{ categories: allCategories, timestamp: Date.now() }]);
      setHistoryIndex(0);
    }
  }, [initialData]);

  // Save state to history (for undo/redo)
  const saveToHistory = useCallback((newCategories: CategoryItem[]) => {
    if (isUndoRedoOperation.current) return;
    
    const newHistoryState: HistoryState = {
      categories: JSON.parse(JSON.stringify(newCategories)),
      timestamp: Date.now()
    };
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newHistoryState);
    
    // Limit history to 20 items
    if (newHistory.length > 20) {
      newHistory.shift();
    } else {
      setHistoryIndex(prev => prev + 1);
    }
    
    setHistory(newHistory);
  }, [history, historyIndex]);

  // Undo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      isUndoRedoOperation.current = true;
      const previousState = history[historyIndex - 1];
      setCategories(previousState.categories);
      setHistoryIndex(prev => prev - 1);
      toast.success('Undid last action');
      setTimeout(() => {
        isUndoRedoOperation.current = false;
      }, 100);
    }
  }, [history, historyIndex]);

  // Redo functionality
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      isUndoRedoOperation.current = true;
      const nextState = history[historyIndex + 1];
      setCategories(nextState.categories);
      setHistoryIndex(prev => prev + 1);
      toast.success('Redid last action');
      setTimeout(() => {
        isUndoRedoOperation.current = false;
      }, 100);
    }
  }, [history, historyIndex]);

  // Form handling with Formik
  const formik = useFormik({
    initialValues: {
      selectedCategories: initialData?.selectedCategories || [],
      customCategories: initialData?.customCategories || [],
      removedCategories: initialData?.removedCategories || [],
      categoryOrder: initialData?.categoryOrder || []
    },
    validationSchema,
    onSubmit: (values: CategorySelectionData) => {
      onNext(values);
    }
  });

  // Update formik values when categories change
  useEffect(() => {
    const selectedCategories = categories
      .filter(cat => cat.isSelected)
      .sort((a, b) => a.order - b.order)
      .map(cat => cat.name);
    
    const customCategories = categories
      .filter(cat => cat.isCustom && cat.isSelected)
      .map(cat => ({ name: cat.name, description: cat.description }));

    const removedCategories = categories
      .filter(cat => !cat.isCustom && !cat.isSelected)
      .map(cat => cat.originalName || cat.name);

    const categoryOrder = categories
      .sort((a, b) => a.order - b.order)
      .map(cat => cat.name);

    formik.setValues({
      selectedCategories,
      customCategories,
      removedCategories,
      categoryOrder
    });
  }, [categories, formik]);

  // Debounced validation for new category names
  useEffect(() => {
    if (debouncedCategoryName && debouncedCategoryName.length >= 2) {
      // Simulate API call for real-time validation
      const isDuplicate = categories.some(cat => 
        cat.name.toLowerCase() === debouncedCategoryName.toLowerCase() && 
        cat.isSelected
      );
      
      if (isDuplicate) {
        setValidationErrors(prev => ({ 
          ...prev, 
          newCategory: 'A category with this name already exists' 
        }));
      } else {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.newCategory;
          return newErrors;
        });
      }
    }
  }, [debouncedCategoryName, categories]);

  // Memoized sorted categories for performance
  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => a.order - b.order);
  }, [categories]);

  // Toggle category selection
  const toggleCategory = useCallback((categoryId: string) => {
    setCategories(prev => {
      const newCategories = prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, isSelected: !cat.isSelected }
          : cat
      );
      saveToHistory(newCategories);
      return newCategories;
    });
  }, [saveToHistory]);

  // Bulk toggle categories
  const toggleBulkCategories = useCallback((categoryIds: string[], selected: boolean) => {
    setCategories(prev => {
      const newCategories = prev.map(cat => 
        categoryIds.includes(cat.id) 
          ? { ...cat, isSelected: selected }
          : cat
      );
      saveToHistory(newCategories);
      return newCategories;
    });
    setSelectedForBulk(new Set());
    setBulkSelectMode(false);
    toast.success(`${selected ? 'Selected' : 'Deselected'} ${categoryIds.length} categories`);
  }, [saveToHistory]);

  // Drag and drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, categoryId: string) => {
    setDraggedItem(categoryId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetCategoryId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetCategoryId) return;

    setCategories(prev => {
      const draggedIndex = prev.findIndex(cat => cat.id === draggedItem);
      const targetIndex = prev.findIndex(cat => cat.id === targetCategoryId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const newCategories = [...prev];
      const [draggedCategory] = newCategories.splice(draggedIndex, 1);
      newCategories.splice(targetIndex, 0, draggedCategory);

      // Update order values
      const reorderedCategories = newCategories.map((cat, index) => ({
        ...cat,
        order: index
      }));

      saveToHistory(reorderedCategories);
      return reorderedCategories;
    });

    setDraggedItem(null);
    toast.success('Category order updated');
  }, [draggedItem, saveToHistory]);

  // Add suggested category
  const addSuggestedCategory = useCallback((suggestion: typeof CATEGORY_SUGGESTIONS[0]) => {
    const isDuplicate = categories.some(cat => 
      cat.name.toLowerCase() === suggestion.name.toLowerCase() && 
      cat.isSelected
    );

    if (isDuplicate) {
      toast.error('This category already exists');
      return;
    }

    const newCategory: CategoryItem = {
      id: `custom-${Date.now()}`,
      name: suggestion.name,
      description: suggestion.description,
      isSelected: true,
      isCustom: true,
      isEditing: false,
      order: categories.length
    };

    setCategories(prev => {
      const newCategories = [...prev, newCategory];
      saveToHistory(newCategories);
      return newCategories;
    });
    
    toast.success(`Added "${suggestion.name}" category`);
  }, [categories, saveToHistory]);

  // Start editing a category
  const startEditing = useCallback((categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isEditing: true }
        : { ...cat, isEditing: false }
    ));
  }, []);

  // Save category edit
  const saveEdit = useCallback((categoryId: string, newName: string, newDescription: string) => {
    if (!newName.trim()) {
      setValidationErrors(prev => ({ ...prev, [categoryId]: 'Category name is required' }));
      return;
    }

    if (newName.length < VALIDATION_RULES.categoryName.minLength || 
        newName.length > VALIDATION_RULES.categoryName.maxLength) {
      setValidationErrors(prev => ({ 
        ...prev, 
        [categoryId]: `Category name must be between ${VALIDATION_RULES.categoryName.minLength} and ${VALIDATION_RULES.categoryName.maxLength} characters` 
      }));
      return;
    }

    const isDuplicate = categories.some(cat => 
      cat.id !== categoryId && 
      cat.name.toLowerCase() === newName.toLowerCase() && 
      cat.isSelected
    );

    if (isDuplicate) {
      setValidationErrors(prev => ({ ...prev, [categoryId]: 'A category with this name already exists' }));
      return;
    }

    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[categoryId];
      return newErrors;
    });

    setCategories(prev => {
      const newCategories = prev.map(cat => 
        cat.id === categoryId 
          ? { 
              ...cat, 
              name: newName.trim(), 
              description: newDescription.trim(),
              isEditing: false 
            }
          : cat
      );
      saveToHistory(newCategories);
      return newCategories;
    });

    toast.success('Category updated successfully');
  }, [categories, saveToHistory]);

  // Cancel editing
  const cancelEdit = useCallback((categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isEditing: false }
        : cat
    ));
    
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[categoryId];
      return newErrors;
    });
  }, []);

  // Remove custom category
  const removeCustomCategory = useCallback((categoryId: string) => {
    setCategories(prev => {
      const newCategories = prev.filter(cat => cat.id !== categoryId);
      saveToHistory(newCategories);
      return newCategories;
    });
    toast.success('Custom category removed');
  }, [saveToHistory]);

  // Add custom category
  const addCustomCategory = useCallback(() => {
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    if (newCategoryName.length < VALIDATION_RULES.categoryName.minLength || 
        newCategoryName.length > VALIDATION_RULES.categoryName.maxLength) {
      toast.error(`Category name must be between ${VALIDATION_RULES.categoryName.minLength} and ${VALIDATION_RULES.categoryName.maxLength} characters`);
      return;
    }

    const isDuplicate = categories.some(cat => 
      cat.name.toLowerCase() === newCategoryName.toLowerCase() && 
      cat.isSelected
    );

    if (isDuplicate) {
      toast.error('A category with this name already exists');
      return;
    }

    const newCategory: CategoryItem = {
      id: `custom-${Date.now()}`,
      name: newCategoryName.trim(),
      description: newCategoryDescription.trim(),
      isSelected: true,
      isCustom: true,
      isEditing: false,
      order: categories.length
    };

    setCategories(prev => {
      const newCategories = [...prev, newCategory];
      saveToHistory(newCategories);
      return newCategories;
    });
    
    setNewCategoryName('');
    setNewCategoryDescription('');
    setIsAddingCustom(false);
    toast.success('Custom category added successfully');
  }, [newCategoryName, newCategoryDescription, categories, saveToHistory]);

  // Get selected count
  const selectedCount = categories.filter(cat => cat.isSelected).length;
  const isValidSelection = selectedCount >= 3;
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Organize Your Recipes</h2>
        <p className="text-muted-foreground">
          Choose categories that work for you. You can always add more or make changes later.
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            className="flex items-center gap-2"
          >
            <Undo2 className="h-4 w-4" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={!canRedo}
            className="flex items-center gap-2"
          >
            <Redo2 className="h-4 w-4" />
            Redo
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="flex items-center gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Suggestions
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setBulkSelectMode(!bulkSelectMode)}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {bulkSelectMode && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-700">
              Select categories for bulk actions. Selected: {selectedForBulk.size}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => toggleBulkCategories(Array.from(selectedForBulk), true)}
                disabled={selectedForBulk.size === 0}
              >
                Select All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleBulkCategories(Array.from(selectedForBulk), false)}
                disabled={selectedForBulk.size === 0}
              >
                Deselect All
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setBulkSelectMode(false);
                  setSelectedForBulk(new Set());
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Category Suggestions */}
      {showSuggestions && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Category Suggestions
            </CardTitle>
            <CardDescription>
              Popular categories that might fit your cooking style
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CATEGORY_SUGGESTIONS.map((suggestion) => (
                <div
                  key={suggestion.name}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium">{suggestion.name}</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addSuggestedCategory(suggestion)}
                    disabled={categories.some(cat => 
                      cat.name.toLowerCase() === suggestion.name.toLowerCase() && cat.isSelected
                    )}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selection Summary */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          {selectedCount < 3 ? (
            <span className="text-orange-600">
              Select at least 3 categories to continue. Currently selected: {selectedCount}
            </span>
          ) : (
            <span className="text-green-600">
              Great! You&apos;ve selected {selectedCount} categories.
            </span>
          )}
        </AlertDescription>
      </Alert>

      {/* Categories Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Available Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedCategories.map((category) => (
            <EnhancedCategoryCard
              key={category.id}
              category={category}
              onToggle={toggleCategory}
              onStartEdit={startEditing}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
              onRemove={removeCustomCategory}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              validationError={validationErrors[category.id]}
              bulkSelectMode={bulkSelectMode}
              isSelectedForBulk={selectedForBulk.has(category.id)}
              onBulkToggle={(selected) => {
                const newSelected = new Set(selectedForBulk);
                if (selected) {
                  newSelected.add(category.id);
                } else {
                  newSelected.delete(category.id);
                }
                setSelectedForBulk(newSelected);
              }}
            />
          ))}
        </div>
      </div>

      {/* Add Custom Category */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Custom Categories</h3>
          {!isAddingCustom && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingCustom(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Custom Category
            </Button>
          )}
        </div>

        {isAddingCustom && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Add Custom Category</CardTitle>
              <CardDescription>
                Create a category that fits your cooking style
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="new-category-name">Category Name</Label>
                <Input
                  id="new-category-name"
                  value={newCategoryName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Quick Meals, Holiday Treats"
                  maxLength={VALIDATION_RULES.categoryName.maxLength}
                  className={validationErrors.newCategory ? 'border-red-500' : ''}
                />
                {validationErrors.newCategory && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.newCategory}</p>
                )}
              </div>
              <div>
                <Label htmlFor="new-category-description">Description (Optional)</Label>
                <Textarea
                  id="new-category-description"
                  value={newCategoryDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewCategoryDescription(e.target.value)}
                  placeholder="Brief description of this category"
                  maxLength={VALIDATION_RULES.categoryDescription.maxLength}
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={addCustomCategory} 
                  size="sm"
                  disabled={!!validationErrors.newCategory || !newCategoryName.trim()}
                >
                  Add Category
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setIsAddingCustom(false);
                    setNewCategoryName('');
                    setNewCategoryDescription('');
                    setValidationErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.newCategory;
                      return newErrors;
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Form Validation Errors */}
      {formik.errors.selectedCategories && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {formik.errors.selectedCategories}
          </AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <Button 
          onClick={() => formik.handleSubmit()}
          disabled={!isValidSelection || isLoading}
          className="min-w-[120px]"
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

// Enhanced Category Card Component with drag-and-drop and bulk selection
interface EnhancedCategoryCardProps {
  category: CategoryItem;
  onToggle: (id: string) => void;
  onStartEdit: (id: string) => void;
  onSaveEdit: (id: string, name: string, description: string) => void;
  onCancelEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: string) => void;
  validationError?: string;
  bulkSelectMode: boolean;
  isSelectedForBulk: boolean;
  onBulkToggle: (selected: boolean) => void;
}

const EnhancedCategoryCard = React.memo(function EnhancedCategoryCard({
  category,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  validationError,
  bulkSelectMode,
  isSelectedForBulk,
  onBulkToggle
}: EnhancedCategoryCardProps) {
  const [editName, setEditName] = useState(category.name);
  const [editDescription, setEditDescription] = useState(category.description);

  useEffect(() => {
    if (category.isEditing) {
      setEditName(category.name);
      setEditDescription(category.description);
    }
  }, [category.isEditing, category.name, category.description]);

  return (
    <Card 
      className={`transition-all ${category.isSelected ? 'ring-2 ring-primary' : ''} ${
        isSelectedForBulk ? 'ring-2 ring-blue-500' : ''
      }`}
      draggable={!category.isEditing}
      onDragStart={(e) => onDragStart(e, category.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, category.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {bulkSelectMode ? (
            <Checkbox
              checked={isSelectedForBulk}
              onCheckedChange={onBulkToggle}
              className="mt-1"
            />
          ) : (
            <Checkbox
              checked={category.isSelected}
              onCheckedChange={() => onToggle(category.id)}
              className="mt-1"
            />
          )}
          
          <div className="flex-1 space-y-2">
            {category.isEditing ? (
              <div className="space-y-3">
                <div>
                  <Input
                    value={editName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditName(e.target.value)}
                    placeholder="Category name"
                    className={validationError ? 'border-red-500' : ''}
                  />
                  {validationError && (
                    <p className="text-sm text-red-500 mt-1">{validationError}</p>
                  )}
                </div>
                <Textarea
                  value={editDescription}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditDescription(e.target.value)}
                  placeholder="Category description"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onSaveEdit(category.id, editName, editDescription)}
                  >
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCancelEdit(category.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <h4 className="font-medium">{category.name}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    {category.isCustom && (
                      <Badge variant="secondary" className="text-xs">
                        Custom
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onStartEdit(category.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    {category.isCustom && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemove(category.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
                {category.description && (
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}); 