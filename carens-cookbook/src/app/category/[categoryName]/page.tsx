"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Toaster, toast } from 'sonner';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/RecipeCard";
import { BentoGrid } from "@/components/BentoGrid";
import RecipeDisplay, { RecipeData as ImportedRecipeData } from "@/components/RecipeDisplay";

// Copied from page.tsx - can be refactored into shared files later
// REMOVE this local RecipeData definition, rely on RecipeDisplay's export
/*
export interface RecipeData extends ImportedRecipeData {
  // Ensure all fields from ImportedRecipeData are here or extend it properly
  // For now, let\'s assume ImportedRecipeData is sufficient or define explicitly if not
}
*/
// Use RecipeData directly from RecipeDisplay import
export type RecipeData = ImportedRecipeData;

// REMOVE this local RecipeCardProps definition, RecipeCard component has its own
/*
interface RecipeCardProps extends RecipeData {
  tags?: string[];
  onDeleteAttempt?: (recipeId: string) => void;
}
*/

// REMOVE local BentoGrid definition
/*
const BentoGrid = ({...}) => {...};
*/

// REMOVE local RecipeCard definition
/*
const RecipeCard = ({...}) => {...};
*/
// End of copied components

export default function CategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = params.categoryName ? decodeURIComponent(params.categoryName as string) : "Unknown Category";

  const [recipesForCategory, setRecipesForCategory] = useState<RecipeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentView, setCurrentView] = useState<'list' | 'recipe'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  const fetchRecipesByCategory = useCallback(async () => {
    if (!categoryName || categoryName === "Unknown Category") return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/recipes?category=${encodeURIComponent(categoryName)}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch recipes for category: ${categoryName}`);
      }
      const data: RecipeData[] = await response.json();
      setRecipesForCategory(data);
    } catch (err: unknown) {
      console.error(`Error fetching recipes for ${categoryName}:`, err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [categoryName]);

  useEffect(() => {
    fetchRecipesByCategory();
  }, [fetchRecipesByCategory]);

  const filteredRecipes = useMemo(() => {
    return recipesForCategory.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [recipesForCategory, searchTerm]);

  const handleViewRecipe = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  };
  
  const handleSaveRecipe = async (recipeToSave: RecipeData) => {
    console.log("Attempting to save recipe from category page:", recipeToSave.title);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeToSave),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success(`Recipe '${recipeToSave.title}' saved successfully!`);
        // Optionally, refetch recipes for the category if a new recipe might be added to it
        // or if save implies an update that should be reflected.
        // For now, just a toast message.
      } else {
        const errorMessage = responseData.error || 'Failed to save recipe. Please try again.';
        toast.error(`Error saving recipe: ${errorMessage}`);
        console.error("Error saving recipe - API response not OK:", responseData);
        // Throw an error so the UI can properly handle the failed save
        throw new Error(errorMessage);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred while saving. Please check your connection and try again.';
      toast.error(errorMessage);
      console.error("Error in handleSaveRecipe catch block:", err);
      // Re-throw the error so the UI can reset the save status
      throw err;
    }
  };

  const handleDeleteRecipeFromCard = async (recipeId: string) => {
    if (!recipeId) return;
    // Optional: Add a confirmation dialog here
    // if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const response = await fetch(`/api/recipes?id=${recipeId}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message || 'Recipe deleted successfully!');
        setRecipesForCategory(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
      } else {
        toast.error(responseData.error || 'Failed to delete recipe.');
        console.error("Error deleting recipe from card - API response not OK:", responseData);
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while deleting the recipe.');
      console.error("Error in handleDeleteRecipeFromCard catch block:", err);
    }
  };

  const handleDeleteRecipeFromDisplay = async (recipeId: string) => {
    if (!recipeId) return;
    // Optional: Add a confirmation dialog here
    // if (!confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const response = await fetch(`/api/recipes?id=${recipeId}`, {
        method: 'DELETE',
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success(responseData.message || 'Recipe deleted successfully!');
        setSelectedRecipe(null); // Close the recipe display view
        setCurrentView('list');
        // Refetch recipes for the current category to update the list
        fetchRecipesByCategory(); 
      } else {
        toast.error(responseData.error || 'Failed to delete recipe.');
        console.error("Error deleting recipe - API response not OK:", responseData);
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while deleting the recipe.');
      console.error("Error in handleDeleteRecipeFromDisplay catch block:", err);
    }
  };

  const handleUpdateRecipeTitle = async (recipeId: string, newTitle: string): Promise<boolean> => {
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
        // Update local state for the category page
        setRecipesForCategory(prevRecipes =>
          prevRecipes.map(r => r.id === recipeId ? { ...r, title: newTitle.trim() } : r)
        );
        if (selectedRecipe && selectedRecipe.id === recipeId) {
          setSelectedRecipe(prev => prev ? { ...prev, title: newTitle.trim() } : null);
        }
        return true;
      } else {
        toast.error(updatedRecipeFromServer.error || 'Failed to update recipe title.');
        console.error("Error updating title on category page - API response not OK:", updatedRecipeFromServer);
        return false;
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while updating the title.');
      console.error("Error in handleUpdateRecipeTitle on category page catch block:", err);
      return false;
    }
  };

  if (currentView === 'recipe' && selectedRecipe) {
    return (
      <>
        <RecipeDisplay 
          recipe={selectedRecipe} 
          onSave={handleSaveRecipe} // Pass the save handler
          onGoBack={() => setCurrentView('list')}
          onDeleteAttempt={handleDeleteRecipeFromDisplay} // Pass the delete handler
          onUpdateTitle={handleUpdateRecipeTitle} // Pass the title update handler
        />
        <Toaster richColors position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />
      <div className="container mx-auto px-4 py-12">
        <header className="mb-8">
          <Button 
            onClick={() => router.push('/')} 
            variant="outline" 
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Categories
          </Button>
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Recipes in: {categoryName}
          </motion.h1>
        </header>

        <div className="mb-8 p-4 border rounded-lg shadow-sm bg-card">
          <div className="flex items-center gap-2">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder={`Search within ${categoryName}...`} 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full"
            />
          </div>
        </div>
        
        {isLoading && (
          <div className="text-center py-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-muted-foreground">Loading recipes for {categoryName}...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <Button onClick={() => router.push('/')} variant="link" className="mt-4">Go Home</Button>
          </div>
        )}

        {!isLoading && !error && filteredRecipes.length === 0 && (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              {recipesForCategory.length > 0 ? `No recipes match your search term "${searchTerm}" in ${categoryName}.` : `No recipes found in the ${categoryName} category yet.`}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <BentoGrid>
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id || recipe.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                >
                  <RecipeCard 
                    {...recipe} 
                    onClick={() => handleViewRecipe(recipe)} 
                    onDeleteAttempt={handleDeleteRecipeFromCard}
                  />
                </motion.div>
              ))}
            </BentoGrid>
          </motion.div>
        )}
      </div>
    </div>
  );
} 