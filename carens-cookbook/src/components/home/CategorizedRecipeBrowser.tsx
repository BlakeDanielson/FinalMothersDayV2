import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCarousel } from './CategoryCarousel';

interface CategoryWithCount {
  name: string;
  count: number;
  imageUrl?: string | null;
}

interface CategorizedRecipeBrowserProps {
  // Recipe Categories (Protein/Ingredient)
  recipeCategories: CategoryWithCount[];
  // Meal Types
  mealTypes: CategoryWithCount[];
  // Cuisines
  cuisines: CategoryWithCount[];
  // Loading states
  isLoading?: boolean;
  error?: string | null;
  // Event handlers
  onCategoryClick: (categoryName: string, type: 'category' | 'mealType' | 'cuisine') => void;
  // Stats
  totalRecipes: number;
}

export function CategorizedRecipeBrowser({
  recipeCategories,
  mealTypes,
  cuisines,
  isLoading = false,
  error = null,
  onCategoryClick,
  totalRecipes
}: CategorizedRecipeBrowserProps) {
  
  // Loading State
  if (isLoading) {
    return (
      <div className="text-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-lg text-muted-foreground font-light">Loading your recipe collection...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-800 font-medium mb-2">Unable to load recipe categories</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Check if we have any data
  const hasData = recipeCategories.length > 0 || mealTypes.length > 0 || cuisines.length > 0;

  if (!hasData) {
    return (
      <div className="text-center py-16">
        <div className="bg-muted/30 border border-muted rounded-lg p-8 max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl">🍽️</span>
          </motion.div>
          <h3 className="text-lg font-medium mb-2">No recipes yet</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Start by importing your first recipe to see your organized collection here
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-bold text-foreground mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Your Recipe Collection
        </motion.h1>
        <motion.p 
          className="text-lg text-muted-foreground font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Browse and discover your {totalRecipes} recipes organized by category, meal type, and cuisine
        </motion.p>
      </div>

      {/* Recipe Categories Section */}
      {recipeCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CategoryCarousel
            title="Recipe Categories"
            subtitle="Browse by main ingredient or protein type"
            categories={recipeCategories}
            onCategoryClick={(name) => onCategoryClick(name, 'category')}
            className="mb-12"
          />
        </motion.div>
      )}

      {/* Meal Types Section */}
      {mealTypes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CategoryCarousel
            title="Meal Types"
            subtitle="Find recipes by when and how they're served"
            categories={mealTypes}
            onCategoryClick={(name) => onCategoryClick(name, 'mealType')}
            className="mb-12"
          />
        </motion.div>
      )}

      {/* Cuisines Section */}
      {cuisines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <CategoryCarousel
            title="Cuisines"
            subtitle="Explore recipes from around the world"
            categories={cuisines}
            onCategoryClick={(name) => onCategoryClick(name, 'cuisine')}
            className="mb-12"
          />
        </motion.div>
      )}
    </motion.div>
  );
} 