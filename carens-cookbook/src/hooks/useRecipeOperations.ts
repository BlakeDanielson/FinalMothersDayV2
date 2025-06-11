"use client";

import { useCallback } from 'react';
import { toast } from 'sonner';
import { RecipeData } from "@/components/RecipeDisplay";

interface UseRecipeOperationsOptions {
  refetchRecipes?: () => void;
  refetchCategories?: () => void;
  onRecipeDeleted?: () => void;
  onRecipeUpdated?: (recipe: RecipeData) => void;
}

export function useRecipeOperations({
  refetchRecipes,
  refetchCategories,
  onRecipeDeleted,
  onRecipeUpdated
}: UseRecipeOperationsOptions) {

  const handleSaveRecipe = useCallback(async (recipeToSave: RecipeData) => {
    console.log("Attempting to save recipe:", recipeToSave.title);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeToSave),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success(`Recipe '${recipeToSave.title}' saved successfully!`);
        refetchRecipes?.();
        refetchCategories?.();
      } else {
        const errorMessage = responseData.error || 'Failed to save recipe. Please try again.';
        toast.error(`Error saving recipe: ${errorMessage}`);
        console.error("Error saving recipe - API response not OK:", responseData);
        throw new Error(errorMessage);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred while saving. Please check your connection and try again.';
      toast.error(errorMessage);
      console.error("Error in handleSaveRecipe catch block:", err);
      throw err;
    }
  }, [refetchRecipes, refetchCategories]);

  const handleDeleteRecipeFromDisplay = useCallback(async (recipeId: string) => {
    if (!recipeId) return;
    try {
      const response = await fetch(`/api/recipes?id=${recipeId}`, {
        method: 'DELETE',
      });
      const responseData = await response.json(); 

      if (response.ok) {
        toast.success(responseData.message || 'Recipe deleted successfully!');
        onRecipeDeleted?.();
        refetchRecipes?.();
        refetchCategories?.();
      } else {
        toast.error(responseData.error || 'Failed to delete recipe.');
        console.error("Error deleting recipe - API response not OK:", responseData);
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while deleting the recipe.');
      console.error("Error in handleDeleteRecipeFromDisplay catch block:", err);
    }
  }, [refetchRecipes, refetchCategories, onRecipeDeleted]);

  const handleUpdateRecipeTitle = useCallback(async (recipeId: string, newTitle: string): Promise<boolean> => {
    if (!recipeId || !newTitle.trim()) return false;

    try {
      const response = await fetch(`/api/recipes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: recipeId, title: newTitle.trim() }),
      });
      const updatedRecipeFromServer = await response.json();

      if (response.ok) {
        toast.success('Recipe title updated successfully!');
        onRecipeUpdated?.(updatedRecipeFromServer);
        refetchRecipes?.();
        return true;
      } else {
        toast.error(updatedRecipeFromServer.error || 'Failed to update recipe title.');
        console.error("Error updating title - API response not OK:", updatedRecipeFromServer);
        return false;
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while updating the title.');
      console.error("Error in handleUpdateRecipeTitle catch block:", err);
      return false;
    }
  }, [refetchRecipes, onRecipeUpdated]);

  return {
    handleSaveRecipe,
    handleDeleteRecipeFromDisplay,
    handleUpdateRecipeTitle,
  };
} 