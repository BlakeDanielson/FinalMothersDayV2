import { useState, useCallback, useEffect, useMemo } from 'react';
import { PopularRecipe } from '../utils/types';
import { RecipeData } from '../../first-recipe-flow/utils/types';
import { POPULAR_RECIPES } from '../data/recipes';

interface UsePopularRecipeSelectionProps {
  onComplete: (recipe: RecipeData) => void;
  userCategories: string[];
  onProgressUpdate?: (progress: number) => void;
}

export function usePopularRecipeSelection({
  onComplete,
  userCategories,
  onProgressUpdate
}: UsePopularRecipeSelectionProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<PopularRecipe | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [customizedRecipe, setCustomizedRecipe] = useState<Partial<RecipeData>>({});

  // Filter recipes based on search and filters
  const filteredRecipes = useMemo(() => {
    return POPULAR_RECIPES.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      
      return matchesSearch && matchesCuisine && matchesCategory;
    }).sort((a, b) => b.popularity - a.popularity);
  }, [searchTerm, selectedCuisine, selectedCategory]);

  // Update progress based on selection
  useEffect(() => {
    const progress = selectedRecipe ? 80 : 40;
    onProgressUpdate?.(progress);
  }, [selectedRecipe, onProgressUpdate]);

  // Handle recipe selection
  const handleRecipeSelect = useCallback((recipe: PopularRecipe) => {
    setSelectedRecipe(recipe);
    setCustomizedRecipe({
      title: recipe.title,
      description: recipe.description,
      ingredients: [...recipe.ingredients],
      steps: [...recipe.steps],
      prepTime: recipe.prepTime,
      cuisine: recipe.cuisine,
      category: recipe.category
    });
  }, []);

  // Handle recipe customization
  const handleCustomize = useCallback(() => {
    setIsCustomizing(true);
  }, []);

  // Handle going back from customization
  const handleCancelCustomization = useCallback(() => {
    setIsCustomizing(false);
  }, []);

  // Handle going back from recipe details
  const handleBackFromDetails = useCallback(() => {
    setSelectedRecipe(null);
    setIsCustomizing(false);
  }, []);

  // Handle recipe completion
  const handleComplete = useCallback(() => {
    if (!selectedRecipe) return;

    const finalRecipe: RecipeData = {
      title: customizedRecipe.title || selectedRecipe.title,
      description: customizedRecipe.description || selectedRecipe.description,
      ingredients: customizedRecipe.ingredients || selectedRecipe.ingredients,
      steps: customizedRecipe.steps || selectedRecipe.steps,
      prepTime: customizedRecipe.prepTime || selectedRecipe.prepTime,
      cuisine: customizedRecipe.cuisine || selectedRecipe.cuisine,
      category: customizedRecipe.category || userCategories[0] || selectedRecipe.category
    };

    onComplete(finalRecipe);
  }, [selectedRecipe, customizedRecipe, onComplete, userCategories]);

  return {
    // State
    selectedRecipe,
    isCustomizing,
    searchTerm,
    selectedCuisine,
    selectedCategory,
    showFilters,
    customizedRecipe,
    filteredRecipes,
    
    // State setters
    setSearchTerm,
    setSelectedCuisine,
    setSelectedCategory,
    setShowFilters,
    setCustomizedRecipe,
    
    // Actions
    handleRecipeSelect,
    handleCustomize,
    handleCancelCustomization,
    handleBackFromDetails,
    handleComplete
  };
} 