"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import RecipeDisplay, { RecipeData } from "@/components/RecipeDisplay";
import RecipeLoadingProgress from "@/components/ui/RecipeLoadingProgress";
import ScanPhotoButton from "@/components/ui/ScanPhotoButton";
import { BentoGrid } from "@/components/BentoGrid";

// Define a local type for placeholder recipes that includes tags, extending the imported RecipeData
interface PlaceholderRecipe extends RecipeData {
  tags?: string[];
}

const placeholderRecipes: PlaceholderRecipe[] = [
  {
    id: "placeholder-1",
    title: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    tags: ["Italian", "Pasta", "Quick"],
    category: "Pasta",
    prepTime: "10 min",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
  },
  {
    id: "placeholder-2",
    title: "Avocado Bruschetta Bites",
    description: "Creamy avocado spread on toasted baguette slices, topped with cherry tomatoes and basil.",
    tags: ["Appetizer", "Healthy", "Quick"],
    category: "Appetizer",
    prepTime: "10 min",
    cleanupTime: "5 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
  },
  {
    id: "placeholder-3",
    title: "Vegetable Green Curry",
    description: "A fragrant and spicy curry made with coconut milk, green curry paste, and a medley of fresh vegetables.",
    tags: ["Thai", "Spicy", "Vegetable"],
    category: "Vegetable",
    prepTime: "20 min",
    cleanupTime: "30 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-4",
    title: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with crispy edges and a soft, chewy center loaded with chocolate chips.",
    tags: ["Dessert", "Baking", "Family Favorite"],
    category: "Dessert",
    prepTime: "15 min",
    cleanupTime: "12 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-5",
    title: "Quinoa Salad with Roasted Vegetables",
    description: "A nutritious salad with fluffy quinoa, roasted seasonal vegetables, and a zesty lemon dressing.",
    tags: ["Salad", "Vegan", "Meal Prep"],
    category: "Salad",
    prepTime: "15 min",
    cleanupTime: "25 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-6",
    title: "Beef Stir Fry",
    description: "Tender strips of beef with colorful vegetables in a savory sauce, served over steamed rice.",
    tags: ["Asian", "Quick Dinner", "High Protein"],
    category: "Beef",
    prepTime: "15 min",
    cleanupTime: "10 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-7",
    title: "Grilled Lemon Herb Chicken",
    description: "Juicy grilled chicken breasts marinated in lemon, herbs, and garlic.",
    tags: ["Chicken", "Grill", "Healthy"],
    category: "Chicken",
    prepTime: "20 min (plus marinating)",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ecc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-8",
    title: "Pan-Seared Salmon with Asparagus",
    description: "Flaky salmon fillets pan-seared to perfection, served with tender asparagus.",
    tags: ["Seafood", "Quick", "Healthy"],
    category: "Seafood",
    prepTime: "10 min",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-9",
    title: "Roast Turkey with Cranberry Sauce",
    description: "A classic Thanksgiving centerpiece, a beautifully roasted turkey served with homemade cranberry sauce.",
    tags: ["Thanksgiving", "Holiday", "Poultry"],
    category: "Thanksgiving",
    prepTime: "30 min",
    cleanupTime: "4 hours (cooking)",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1574966771070-9639608a1173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
  },
  {
    id: "placeholder-10",
    title: "Rosemary Garlic Lamb Chops",
    description: "Tender lamb chops infused with rosemary and garlic, perfect for a special occasion.",
    tags: ["Lamb", "Elegant", "Dinner"],
    category: "Lamb",
    prepTime: "15 min",
    cleanupTime: "20 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1600891964091-bab6873a49dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-11",
    title: "BBQ Pulled Pork Sandwiches",
    description: "Slow-cooked pulled pork in a tangy BBQ sauce, served on fluffy buns.",
    tags: ["Pork", "Comfort Food", "Slow Cooker"],
    category: "Pork",
    prepTime: "20 min",
    cleanupTime: "8 hours (cooking)",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1561962364-85c5ac2089d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-12",
    title: "Creamy Tomato Soup",
    description: "A rich and creamy tomato soup, perfect with a grilled cheese sandwich.",
    tags: ["Soup", "Vegetarian", "Comfort Food"],
    category: "Soup",
    prepTime: "10 min",
    cleanupTime: "25 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1575252979730-6097024a8f0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-13",
    title: "Refreshing Iced Tea",
    description: "A tall glass of freshly brewed iced tea, perfect for a hot day.",
    tags: ["Drinks", "Summer", "Non-alcoholic"],
    category: "Drinks",
    prepTime: "5 min",
    cleanupTime: "5 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1556790300-b5b204890293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-14",
    title: "Garlic Aioli Sauce",
    description: "A creamy and flavorful garlic aioli, great as a dip or spread.",
    tags: ["Sauce", "Dip", "Garlic"],
    category: "Side Sauces",
    prepTime: "10 min",
    cleanupTime: "5 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1606847773799-297f8796d602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  }
];

const CategoryCard = ({
  categoryName,
  itemCount,
  imageUrl,
  onClick,
}: {
  categoryName: string;
  itemCount: number;
  imageUrl?: string | null;
  onClick: () => void;
}) => (
  <Card
    onClick={onClick}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl h-[250px] cursor-pointer",
      "bg-background border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
    )}
  >
    <div className="relative h-2/3 w-full overflow-hidden">
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <HomeIcon className="h-12 w-12 text-muted-foreground/50" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/70 to-transparent h-20" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h3 className="text-xl font-semibold text-foreground line-clamp-2">
        {categoryName}
      </h3>
      <p className="text-xs text-muted-foreground">{itemCount} {itemCount === 1 ? 'recipe' : 'recipes'}</p>
    </div>
  </Card>
);

function MainPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepMessage, setLoadingStepMessage] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<RecipeData[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'recipe' | 'save'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  const [gridTitle, setGridTitle] = useState("Recipe Categories");

  const [processedCategories, setProcessedCategories] = useState<{ name: string; count: number; imageUrl?: string | null }[]>([]);

  useEffect(() => {
    // Call fetchSavedRecipes on initial component mount
    fetchSavedRecipes();

    // The existing logic for handling recipeIdFromUrl can remain,
    // but it will now operate on potentially populated savedRecipes
    // or trigger a re-fetch if necessary, which is fine.
    const params = new URLSearchParams(window.location.search);
    const recipeIdFromUrl = params.get('recipeId');

    if (recipeIdFromUrl) {
      // This part might become redundant if fetchSavedRecipes always runs first
      // and the second useEffect [savedRecipes, router] handles displaying the recipe.
      // However, keeping it doesn't hurt and ensures the recipe is loaded if directly linked.
      const loadRecipeFromUrl = async () => {
        // await fetchSavedRecipes(); // Already called above, so this might be redundant or a second call
                                 // Let's rely on the initial call and the effect below.
      };
      // loadRecipeFromUrl(); // Call can be removed if fetch is guaranteed by first line
    }
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    // This effect will process savedRecipes once they are fetched.
    const recipesSource = savedRecipes.length > 0 ? savedRecipes : placeholderRecipes;
    const categoryMap: Record<string, { count: number; recipes: (RecipeData | PlaceholderRecipe)[] }> = {};

    recipesSource.forEach(recipe => {
      if (recipe.category) {
        if (!categoryMap[recipe.category]) {
          categoryMap[recipe.category] = { count: 0, recipes: [] };
        }
        categoryMap[recipe.category].count++;
        categoryMap[recipe.category].recipes.push(recipe);
      }
    });

    const uniqueCategoriesData = Object.entries(categoryMap)
      .map(([name, data]) => {
        const firstRecipeWithImage = data.recipes.find(r => r.image);
        return {
          name,
          count: data.count,
          imageUrl: firstRecipeWithImage ? firstRecipeWithImage.image : null,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    
    setProcessedCategories(uniqueCategoriesData);

    if (savedRecipes.length > 0) { // Check actual saved recipes for title
      if (uniqueCategoriesData.length === 0) {
        setGridTitle("No Categories Found in Saved Recipes");
      } else {
        setGridTitle("Recipe Categories");
      }
    } else { // Still on placeholders or no recipes at all
      if (uniqueCategoriesData.length === 0) { // This implies placeholderRecipes is also empty or has no categories
        setGridTitle("Add Recipes to See Categories");
      } else {
         setGridTitle("Recipe Categories"); // From placeholders
      }
    }

  }, [savedRecipes]);

  // New useEffect to handle displaying a recipe if recipeId is in URL and recipes are loaded
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipeIdFromUrl = params.get('recipeId');

    if (recipeIdFromUrl && savedRecipes.length > 0) {
      const recipeToDisplay = savedRecipes.find(r => r.id === recipeIdFromUrl);
      if (recipeToDisplay) {
        handleViewRecipe(recipeToDisplay);
      } else {
        toast.error("The shared recipe could not be found.");
      }
    }
  }, [savedRecipes, router]); // Rely on router being stable, or add it as a dependency if it can change and affect logic

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch saved recipes');
      }
      const data: RecipeData[] = await response.json();
      setSavedRecipes(data);
    } catch (err: unknown) {
      console.error("Error fetching saved recipes:", err);
      toast.error(`Could not load your saved recipes: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleViewRecipe = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  };

  const handleDeleteRecipeFromDisplay = async (recipeId: string) => {
    if (!recipeId) return;
    try {
      const response = await fetch(`/api/recipes?id=${recipeId}`, {
        method: 'DELETE',
      });
      const responseData = await response.json(); 

      if (response.ok) {
        toast.success(responseData.message || 'Recipe deleted successfully!');
        setSelectedRecipe(null);
        setCurrentView('list');
        fetchSavedRecipes();
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
        // Update local state
        setSavedRecipes(prevRecipes => 
          prevRecipes.map(r => r.id === recipeId ? { ...r, title: newTitle.trim() } : r)
        );
        if (selectedRecipe && selectedRecipe.id === recipeId) {
          setSelectedRecipe(prev => prev ? { ...prev, title: newTitle.trim() } : null);
        }
        // If categories are derived from titles or need re-evaluating, do it here
        // For now, assuming category structure doesn't change with title update for this page.
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true); setError(null); setLoadingProgress(10);
    setLoadingStepMessage("Okay, let&apos;s go find that recipe! 🧑‍🍳");
    try {
      setLoadingProgress(25); setLoadingStepMessage("Visiting the recipe page for you... 📄");
      const response = await fetch(`/api/fetch-recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error fetching from API:", errorData);
        throw new Error(errorData.error || 'Failed to fetch recipe from API');
      }
      setLoadingProgress(75); setLoadingStepMessage("Asking the chef (AI) to read the recipe... 🧐");
      const recipeData: RecipeData = await response.json();
      setLoadingProgress(90); setLoadingStepMessage("Getting it all plated up for you... ✨");
      handleViewRecipe(recipeData); 
      setUrl(""); setLoadingProgress(100);
    } catch (err: unknown) {
      console.error("Error in handleSubmit:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setLoadingProgress(0);
    }
    finally { 
      setIsLoading(false);
      setLoadingStepMessage("");
      setLoadingProgress(0);
    }
  };
  
  const handleSaveRecipe = async (recipeToSave: RecipeData) => {
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
        fetchSavedRecipes();
      } else {
        const errorMessage = responseData.error || 'Failed to save recipe. Please try again.';
        toast.error(`Error saving recipe: ${errorMessage}`);
        console.error("Error saving recipe - API response not OK:", responseData);
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while saving. Please check your connection and try again.');
      console.error("Error in handleSaveRecipe catch block:", err);
    }
  };

  const handleProcessImage = async (file: File) => {
    if (!file) return;
    setIsLoading(true); setError(null); setUrl(""); 
    setLoadingProgress(5); setLoadingStepMessage(`Checking image format '${file.name}'... 🧐`);
    let fileToProcess = file;

    if (file.type === 'image/heic' || file.type === 'image/heif' || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
      setLoadingStepMessage(`Converting '${file.name}' from HEIC to JPEG... ⏳`);
      toast.info(`It looks like you&apos;ve uploaded an HEIC image. We&apos;ll convert it to JPEG for you!`);
      try {
        const heic2any = (await import('heic2any')).default;

        const conversionResult = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
        const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
        const originalNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
        fileToProcess = new File([convertedBlob], `${originalNameWithoutExt}.jpeg`, { type: 'image/jpeg' });
        toast.success(`'${file.name}' converted to JPEG successfully!`);
        console.log("HEIC converted to JPEG:", fileToProcess.name);
      } catch (conversionError: unknown) {
        console.error("Error converting HEIC to JPEG:", conversionError);
        toast.error(`Failed to convert HEIC image: ${conversionError instanceof Error ? conversionError.message : 'Unknown error'}. Please try a different image or format.`);
        setIsLoading(false); setLoadingProgress(0); setLoadingStepMessage(""); return;
      }
    }
    setLoadingProgress(10); setLoadingStepMessage(`Preparing to scan '${fileToProcess.name}'... 🖼️`);
    const formData = new FormData(); formData.append('image', fileToProcess);
    try {
      setLoadingProgress(30); setLoadingStepMessage(`Sending '${fileToProcess.name}' for analysis... 🧠`);
      const response = await fetch('/api/scan-recipe', { method: 'POST', body: formData });
      const responseData = await response.json();
      if (!response.ok) {
        console.error("Error scanning recipe from image - API response not OK:", responseData);
        throw new Error(responseData.error || 'Failed to process recipe from image.');
      }
      setLoadingProgress(80); setLoadingStepMessage("Image processed! Getting recipe details... ✨");
      const recipeData: RecipeData = responseData;
      handleViewRecipe(recipeData);
      toast.success(`Successfully scanned recipe from '${fileToProcess.name}'!`); setLoadingProgress(100);
    } catch (err: unknown) {
      console.error("Error in handleProcessImage:", err);
      const errorMsg = err instanceof Error ? err.message : "An unexpected error occurred while processing the image.";
      setError(errorMsg);
      toast.error(errorMsg);
      setLoadingProgress(0); 
    }
    finally { 
      setIsLoading(false); 
      setLoadingStepMessage(""); 
      setLoadingProgress(0); 
    }
  };

  const handleImageFileSelect = (file: File) => { 
    console.log("Image selected:", file.name, file.type, file.size);
    handleProcessImage(file); 
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/category/${encodeURIComponent(categoryName)}`);
  };

  if (currentView === 'recipe' && selectedRecipe) {
    return (
      <>
        <RecipeDisplay 
          recipe={selectedRecipe} 
          onSave={handleSaveRecipe}
          onGoBack={() => setCurrentView('list')}
          onDeleteAttempt={handleDeleteRecipeFromDisplay}
          onUpdateTitle={handleUpdateRecipeTitle}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Caren&apos;s Cookbook
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Paste any recipe link below to get started. Your personal cookbook, simplified for you, Mom!
          </motion.p>
        </header>

        {currentView !== 'list' && (
          <Button 
            onClick={() => setCurrentView('list')}
            variant="outline"
            className="mb-8 flex items-center gap-2 text-lg p-6 mx-auto sm:mx-0"
          >
            <HomeIcon className="h-5 w-5" />
            Back to Recipe List
          </Button>
        )}

        {currentView === 'list' && (
          <motion.div
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 shadow-xl border-2 border-primary/20">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold mb-2 text-center text-primary">Add a New Recipe</h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="url"
                    placeholder="Paste your recipe URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 text-lg p-6 border-2 border-border focus:border-primary"
                    required
                    aria-label="Recipe URL Input"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading} size="lg" className="text-lg p-6">
                    {isLoading && !loadingStepMessage.toLowerCase().includes('scan') ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <SearchIcon className="h-5 w-5" />
                        Get Recipe
                      </span>
                    )}
                  </Button>
                </div>
                {error && !isLoading && (
                  <p className="text-sm text-red-600 text-center mt-2">{error}</p>
                )}
                {!isLoading && (
                  <p className="text-sm text-muted-foreground text-center">
                    Enter the web address of any recipe, and we&apos;ll import it for you!
                  </p>
                )}
                <div className="my-4 text-center text-muted-foreground">
                  <p>OR</p>
                </div>
                <ScanPhotoButton onFileSelect={handleImageFileSelect} />
              </form>
            </Card>
            {isLoading && loadingStepMessage && (
              <div className="mt-6">
                <RecipeLoadingProgress progress={loadingProgress} statusMessage={loadingStepMessage} />
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-primary">
              {gridTitle}
            </h2>
          </div>

          <BentoGrid>
            {processedCategories.map((category, index) => (
              <motion.div
                key={category.name + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <CategoryCard 
                  categoryName={category.name} 
                  itemCount={category.count}
                  imageUrl={category.imageUrl}
                  onClick={() => handleCategoryClick(category.name)} 
                />
              </motion.div>
            ))}
            {processedCategories.length === 0 && savedRecipes.length === 0 && placeholderRecipes.length > 0 && (
                placeholderRecipes.reduce((acc: {name: string, count: number, imageUrl?: string | null}[], recipe: PlaceholderRecipe) => {
                    if (recipe.category && !acc.find(c => c.name === recipe.category)) {
                        const count = placeholderRecipes.filter(r => r.category === recipe.category).length;
                        const firstPlaceholderRecipeWithImage = placeholderRecipes.find(r => r.category === recipe.category && r.image);
                        acc.push({name: recipe.category, count, imageUrl: firstPlaceholderRecipeWithImage ? firstPlaceholderRecipeWithImage.image : null });
                    }
                    return acc;
                }, [] as {name: string, count: number, imageUrl?: string | null}[])
                .sort((a: {name: string}, b: {name: string}) => a.name.localeCompare(b.name))
                .map((category: {name: string, count: number, imageUrl?: string | null}, index: number) => (
                    <motion.div
                        key={`placeholder-${category.name}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                        <CategoryCard
                            categoryName={category.name}
                            itemCount={category.count}
                            imageUrl={category.imageUrl}
                            onClick={() => handleCategoryClick(category.name)}
                        />
                    </motion.div>
                ))
            )}
          </BentoGrid>
        </motion.div>
      </div>
    </div>
  );
}

export default MainPage;
