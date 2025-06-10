'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useFormik } from 'formik';
import { toast } from 'sonner';
import { CATEGORY_METADATA } from '@/lib/constants/categories';
import { VALIDATION_RULES } from '@/lib/constants/user-preferences';
import { 
  CategoryItem, 
  CategorySelectionData, 
  HistoryState,
  validationSchema,
  MAX_HISTORY_SIZE,
  MIN_CATEGORIES_REQUIRED,
  useDebounce,
  DEBOUNCE_DELAY
} from '../utils';

interface UseCategorySelectionProps {
  initialData?: Partial<CategorySelectionData>;
  onSubmit: (data: CategorySelectionData) => void;
}

export function useCategorySelection({ 
  initialData, 
  onSubmit 
}: UseCategorySelectionProps) {
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
  const debouncedCategoryName = useDebounce(newCategoryName, DEBOUNCE_DELAY);

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
    
    // Limit history to MAX_HISTORY_SIZE items
    if (newHistory.length > MAX_HISTORY_SIZE) {
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

  // Toggle category selection
  const toggleCategory = useCallback((categoryId: string) => {
    setCategories(prev => {
      const newCategories = prev.map(cat => 
        cat.id === categoryId ? { ...cat, isSelected: !cat.isSelected } : cat
      );
      saveToHistory(newCategories);
      return newCategories;
    });
  }, [saveToHistory]);

  // Start editing category
  const startEdit = useCallback((categoryId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, isEditing: true } : cat
    ));
  }, []);

  // Save category edit
  const saveEdit = useCallback((categoryId: string, newName: string, newDescription: string) => {
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

  // Bulk selection helpers
  const toggleBulkCategories = useCallback((categoryIds: string[], select: boolean) => {
    setCategories(prev => {
      const newCategories = prev.map(cat => 
        categoryIds.includes(cat.id) ? { ...cat, isSelected: select } : cat
      );
      saveToHistory(newCategories);
      return newCategories;
    });
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

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    setCategories(prev => {
      const draggedIndex = prev.findIndex(cat => cat.id === draggedItem);
      const targetIndex = prev.findIndex(cat => cat.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const newCategories = [...prev];
      const [draggedCategory] = newCategories.splice(draggedIndex, 1);
      newCategories.splice(targetIndex, 0, draggedCategory);
      
      // Update order
      const reorderedCategories = newCategories.map((cat, index) => ({ ...cat, order: index }));
      
      saveToHistory(reorderedCategories);
      return reorderedCategories;
    });

    setDraggedItem(null);
    toast.success('Category order updated');
  }, [draggedItem, saveToHistory]);

  // Form handling
  const formik = useFormik({
    initialValues: {
      selectedCategories: categories.filter(cat => cat.isSelected).map(cat => cat.name),
      customCategories: categories.filter(cat => cat.isCustom && cat.isSelected).map(cat => ({
        name: cat.name,
        description: cat.description
      }))
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const selectedCategories = categories.filter(cat => cat.isSelected).map(cat => cat.name);
      const customCategories = categories.filter(cat => cat.isCustom && cat.isSelected).map(cat => ({
        name: cat.name,
        description: cat.description
      }));
      
      onSubmit({
        selectedCategories,
        customCategories,
        removedCategories: [],
        categoryOrder: categories.map(cat => cat.name)
      });
    }
  });

  // Computed values
  const selectedCount = categories.filter(cat => cat.isSelected).length;
  const isValidSelection = selectedCount >= MIN_CATEGORIES_REQUIRED;
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    // State
    categories,
    isAddingCustom,
    setIsAddingCustom,
    newCategoryName,
    setNewCategoryName,
    newCategoryDescription,
    setNewCategoryDescription,
    validationErrors,
    setValidationErrors,
    bulkSelectMode,
    setBulkSelectMode,
    selectedForBulk,
    setSelectedForBulk,
    showSuggestions,
    setShowSuggestions,
    draggedItem,
    
    // Computed values
    selectedCount,
    isValidSelection,
    canUndo,
    canRedo,
    
    // Actions
    undo,
    redo,
    toggleCategory,
    startEdit,
    saveEdit,
    cancelEdit,
    removeCustomCategory,
    addCustomCategory,
    toggleBulkCategories,
    handleDragStart,
    handleDragOver,
    handleDrop,
    
    // Form
    formik
  };
} 