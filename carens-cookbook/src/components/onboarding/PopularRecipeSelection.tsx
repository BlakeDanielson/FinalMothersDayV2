'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Award, ChefHat } from 'lucide-react';
import { PopularRecipeSelectionProps } from './popular-recipe-selection/utils/types';
import { usePopularRecipeSelection } from './popular-recipe-selection/hooks';
import {
  RecipeCard,
  SearchAndFilters,
  RecipeDetailsView,
  CustomizationForm
} from './popular-recipe-selection/components';

export function PopularRecipeSelection({ 
  onComplete, 
  onBack, 
  userCategories = [],
  onProgressUpdate 
}: PopularRecipeSelectionProps) {
  const {
    selectedRecipe,
    isCustomizing,
    searchTerm,
    selectedCuisine,
    selectedCategory,
    showFilters,
    customizedRecipe,
    filteredRecipes,
    setSearchTerm,
    setSelectedCuisine,
    setSelectedCategory,
    setShowFilters,
    setCustomizedRecipe,
    handleRecipeSelect,
    handleCustomize,
    handleCancelCustomization,
    handleBackFromDetails,
    handleComplete
  } = usePopularRecipeSelection({
    onComplete,
    userCategories,
    onProgressUpdate
  });

  // Show customization form
  if (isCustomizing && selectedRecipe) {
    return (
      <CustomizationForm
        selectedRecipe={selectedRecipe}
        customizedRecipe={customizedRecipe}
        setCustomizedRecipe={setCustomizedRecipe}
        userCategories={userCategories}
        onComplete={handleComplete}
        onCancel={handleCancelCustomization}
      />
    );
  }

  // Show recipe details
  if (selectedRecipe) {
    return (
      <RecipeDetailsView
        recipe={selectedRecipe}
        onBack={handleBackFromDetails}
        onCustomize={handleCustomize}
        onComplete={handleComplete}
      />
    );
  }

  // Main recipe selection view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Award className="h-8 w-8 text-purple-600 mx-auto" />
        <h2 className="text-xl font-semibold text-gray-900">Choose a Popular Recipe</h2>
        <p className="text-gray-600">
          Start with one of these tried-and-tested favorites, perfect for beginners
        </p>
      </div>

      {/* Search and filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filteredCount={filteredRecipes.length}
      />

      {/* Recipe grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isSelected={false}
            onSelect={handleRecipeSelect}
          />
        ))}
      </div>

      {/* No results state */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Methods
        </Button>

        <div className="text-sm text-gray-500">
          Select a recipe to continue
        </div>
      </div>

      <p className="text-gray-600">
        Don&apos;t worry, you can always add more recipes later!
      </p>
    </div>
  );
} 