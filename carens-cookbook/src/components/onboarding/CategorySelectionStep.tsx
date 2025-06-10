'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, AlertCircle, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { VALIDATION_RULES } from '@/lib/constants/user-preferences';

// Import our extracted modules
import { 
  CategorySelectionStepProps,
  CategorySelectionData,
  CATEGORY_SUGGESTIONS 
} from './category-selection-step/utils';
import { 
  EnhancedCategoryCard, 
  ActionBar, 
  BulkActionsBar 
} from './category-selection-step/components';
import { useCategorySelection } from './category-selection-step/hooks';

// Re-export the main interface for external use
export type { CategorySelectionData } from './category-selection-step/utils';

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
  const {
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
  } = useCategorySelection({
    initialData,
    onSubmit: onNext
  });

  // Bulk selection handlers
  const handleBulkToggle = (categoryId: string, selected: boolean) => {
    setSelectedForBulk(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(categoryId);
      } else {
        newSet.delete(categoryId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const allIds = categories.map(cat => cat.id);
    toggleBulkCategories(allIds, true);
    setSelectedForBulk(new Set());
  };

  const handleDeselectAll = () => {
    const allIds = categories.map(cat => cat.id);
    toggleBulkCategories(allIds, false);
    setSelectedForBulk(new Set());
  };

  const handleRemoveSelected = () => {
    // For bulk removal, we only remove custom categories
    const customCategoryIds = Array.from(selectedForBulk).filter(id => 
      categories.find(cat => cat.id === id && cat.isCustom)
    );
    
    customCategoryIds.forEach(removeCustomCategory);
    setSelectedForBulk(new Set());
    setBulkSelectMode(false);
  };

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
      <ActionBar
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        showSuggestions={showSuggestions}
        onToggleSuggestions={() => setShowSuggestions(!showSuggestions)}
        bulkSelectMode={bulkSelectMode}
        onToggleBulkMode={() => setBulkSelectMode(!bulkSelectMode)}
      />

      {/* Bulk Actions Bar */}
      {bulkSelectMode && (
        <BulkActionsBar
          selectedCount={selectedForBulk.size}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onRemoveSelected={handleRemoveSelected}
        />
      )}

      {/* Category Suggestions */}
      {showSuggestions && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Info className="h-5 w-5" />
              Suggested Categories
            </CardTitle>
            <CardDescription className="text-blue-700">
              Here are some popular categories that might be useful for organizing your recipes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {CATEGORY_SUGGESTIONS.map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <h4 className="font-medium">{suggestion.name}</h4>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setNewCategoryName(suggestion.name);
                      setNewCategoryDescription(suggestion.description);
                      setIsAddingCustom(true);
                    }}
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress indicator */}
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <span className="text-sm font-medium">
          Selected: {selectedCount} categories
        </span>
        <div className="flex items-center gap-2">
          {selectedCount < 3 && (
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              Need {3 - selectedCount} more
            </Badge>
          )}
          {selectedCount >= 3 && (
            <Badge variant="default" className="bg-green-600">
              ✓ Ready
            </Badge>
          )}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <EnhancedCategoryCard
            key={category.id}
            category={category}
            onToggle={toggleCategory}
            onStartEdit={startEdit}
            onSaveEdit={saveEdit}
            onCancelEdit={cancelEdit}
            onRemove={removeCustomCategory}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            validationError={validationErrors[category.id]}
            bulkSelectMode={bulkSelectMode}
            isSelectedForBulk={selectedForBulk.has(category.id)}
            onBulkToggle={(selected) => handleBulkToggle(category.id, selected)}
          />
        ))}
      </div>

      {/* Add Custom Category Section */}
      <div className="space-y-4">
        {!isAddingCustom ? (
          <Button
            variant="outline"
            onClick={() => setIsAddingCustom(true)}
            className="w-full flex items-center gap-2 h-12 border-dashed"
          >
            <Plus className="h-4 w-4" />
            Add Custom Category
          </Button>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Add Custom Category</CardTitle>
              <CardDescription>
                Create a category that fits your specific cooking style.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="newCategoryName">Category Name</Label>
                <Input
                  id="newCategoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g., Comfort Food, Quick Meals"
                  maxLength={VALIDATION_RULES.categoryName.maxLength}
                  className={validationErrors.newCategory ? 'border-red-500' : ''}
                />
                {validationErrors.newCategory && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.newCategory}</p>
                )}
              </div>
              <div>
                <Label htmlFor="newCategoryDescription">Description (Optional)</Label>
                <Textarea
                  id="newCategoryDescription"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
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