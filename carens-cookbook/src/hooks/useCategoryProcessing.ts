"use client";

import { useState, useEffect, useMemo } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useUserRecipes } from "@/hooks/useRecipes";
import { placeholderRecipes, ALL_POSSIBLE_CATEGORIES } from "@/lib/constants/placeholderRecipes";

interface ProcessedCategory {
  name: string;
  count: number;
  imageUrl?: string | null;
}

export function useCategoryProcessing() {
  const [processedCategories, setProcessedCategories] = useState<ProcessedCategory[]>([]);

  // React Query hooks for data fetching
  const { 
    data: categories = [], 
    isLoading: categoriesLoading, 
    error: categoriesError,
    refetch: refetchCategories 
  } = useCategories();
  
  const { 
    data: savedRecipes = [], 
    refetch: refetchRecipes 
  } = useUserRecipes();

  // Memoize processed categories to prevent unnecessary recalculations
  const processedCategoriesData = useMemo(() => {
    if (categories.length === 0) return [];
    
    return categories.map(categoryData => {
      let imageUrl = null;
      
      // If category has recipes, try to find an image from saved recipes
      if (categoryData.count > 0 && savedRecipes.length > 0) {
        const recipesInThisCategory = savedRecipes.filter(r => r.category === categoryData.name);
        const recipeWithImage = recipesInThisCategory.find(r => r.image);
        if (recipeWithImage) {
          imageUrl = recipeWithImage.image;
        }
      }
      
      // Fallback to placeholder recipe image
      if (!imageUrl) {
        const placeholder = placeholderRecipes.find(p => p.category === categoryData.name);
        if (placeholder && placeholder.image) {
          imageUrl = placeholder.image;
        }
      }

      // Fallback to predefined default image
      if (!imageUrl) {
        const predefinedCategory = ALL_POSSIBLE_CATEGORIES.find(c => c.name === categoryData.name);
        if (predefinedCategory) {
          imageUrl = predefinedCategory.defaultImageUrl;
        }
      }

      return {
        name: categoryData.name,
        count: categoryData.count,
        imageUrl: imageUrl,
      };
    });
  }, [categories, savedRecipes]);

  // Update processed categories when categories data changes
  useEffect(() => {
    if (processedCategoriesData.length > 0) {
      // Only update if the processed categories actually changed
      setProcessedCategories(prev => {
        if (prev.length !== processedCategoriesData.length) {
          return processedCategoriesData;
        }
        
        // Check if any category data has changed
        const hasChanged = processedCategoriesData.some((newCategory, index) => {
          const oldCategory = prev[index];
          return !oldCategory || 
                 oldCategory.name !== newCategory.name ||
                 oldCategory.count !== newCategory.count ||
                 oldCategory.imageUrl !== newCategory.imageUrl;
        });
        
        return hasChanged ? processedCategoriesData : prev;
      });
    }
  }, [processedCategoriesData]);

  return {
    categories,
    categoriesLoading,
    categoriesError: categoriesError?.message || null,
    savedRecipes,
    processedCategories,
    refetchCategories,
    refetchRecipes,
  };
} 