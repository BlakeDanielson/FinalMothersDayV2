"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster, toast } from 'sonner';
import heic2any from 'heic2any';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RecipeDisplay, { RecipeData } from "@/components/RecipeDisplay";
import RecipeLoadingProgress from "@/components/ui/RecipeLoadingProgress";
import ScanPhotoButton from "@/components/ui/ScanPhotoButton";

interface RecipeCardProps extends RecipeData {
  tags?: string[];
}

const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const RecipeCard = ({
  title,
  description,
  image,
  tags,
  prepTime,
  cleanupTime,
  onClick,
}: RecipeCardProps & { onClick: () => void }) => (
  <Card
    onClick={onClick}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl h-[350px] cursor-pointer",
      "bg-background border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
    )}
  >
    <div className="relative h-1/2 w-full overflow-hidden">
      {image ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">No image</span>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-16" />
    </div>

    <div className="flex flex-col gap-2 p-4">
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs px-1.5 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground line-clamp-2">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-3">{description}</p>

      {(prepTime || cleanupTime) && (
        <div className="flex justify-between mt-auto pt-2 text-xs text-muted-foreground border-t border-border/50">
          {prepTime && <span>Prep: {prepTime}</span>}
          {cleanupTime && <span>Cook: {cleanupTime}</span>}
        </div>
      )}
    </div>
  </Card>
);

const placeholderRecipes: RecipeCardProps[] = [
  {
    id: "placeholder-1",
    title: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    tags: ["Italian", "Pasta", "Quick"],
    prepTime: "10 min",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
  },
  {
    id: "placeholder-2",
    title: "Avocado Toast with Poached Eggs",
    description: "Creamy avocado spread on toasted sourdough bread topped with perfectly poached eggs.",
    tags: ["Breakfast", "Healthy", "Vegetarian"],
    prepTime: "5 min",
    cleanupTime: "10 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
  },
  {
    id: "placeholder-3",
    title: "Thai Green Curry",
    description: "A fragrant and spicy curry made with coconut milk, green curry paste, and fresh vegetables.",
    tags: ["Thai", "Spicy", "Dinner"],
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
    prepTime: "15 min",
    cleanupTime: "10 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
];

function MainPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepMessage, setLoadingStepMessage] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<RecipeData[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'recipe' | 'save'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("date_desc");
  const [filteredAndSortedRecipes, setFilteredAndSortedRecipes] = useState<RecipeData[]>([]);
  const [gridTitle, setGridTitle] = useState("Recipe Ideas");

  const [availableCuisines, setAvailableCuisines] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    const cuisines = new Set(savedRecipes.map(r => r.cuisine).filter(Boolean) as string[]);
    const categories = new Set(savedRecipes.map(r => r.category).filter(Boolean) as string[]);
    setAvailableCuisines(Array.from(cuisines).sort());
    setAvailableCategories(Array.from(categories).sort());
  }, [savedRecipes]);

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

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const handleViewRecipe = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
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
        alert(`Recipe '${recipeToSave.title}' saved successfully!`);
        fetchSavedRecipes();
      } else {
        const errorMessage = responseData.error || 'Failed to save recipe. Please try again.';
        toast.error(`Error: ${errorMessage}`);
        alert(`Error saving recipe: ${errorMessage}`);
        console.error("Error saving recipe - API response not OK:", responseData);
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while saving. Please check your connection and try again.');
      alert('An unexpected error occurred while saving. Please check your connection and try again.');
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

  useEffect(() => {
    const recipesSource = savedRecipes.length > 0 ? [...savedRecipes] : [...placeholderRecipes];
    let currentFilteredRecipes = [...recipesSource];

    if (searchTerm) {
      currentFilteredRecipes = currentFilteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (recipe.description && recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCuisines.length > 0) {
      // currentFilteredRecipes = currentFilteredRecipes.filter(recipe => recipe.cuisine && selectedCuisines.includes(recipe.cuisine));
    }
    if (selectedCategories.length > 0) {
      // currentFilteredRecipes = currentFilteredRecipes.filter(recipe => recipe.category && selectedCategories.includes(recipe.category));
    }

    setFilteredAndSortedRecipes(currentFilteredRecipes);

    if (currentFilteredRecipes.length === 0) {
      if (searchTerm || selectedCuisines.length > 0 || selectedCategories.length > 0) {
        setGridTitle("No Recipes Match Your Filters");
      } else if (savedRecipes.length === 0) {
        setGridTitle("No Recipes Yet! Add some or scan a photo.");
      } else {
         setGridTitle("Your Saved Recipes");
      }
    } else if (savedRecipes.length > 0 && currentFilteredRecipes.some(r => savedRecipes.find(sr => sr.id === r.id))) {
      setGridTitle("Your Recipes");
    } else {
      setGridTitle("Recipe Ideas");
    }
  }, [savedRecipes, searchTerm, selectedCuisines, selectedCategories, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCuisines([]);
    setSelectedCategories([]);
    setSortBy("date_desc");
  };

  if (currentView === 'recipe' && selectedRecipe) {
    return (
      <>
        <RecipeDisplay 
          recipe={selectedRecipe} 
          onSave={handleSaveRecipe}
          onGoBack={() => setCurrentView('list')}
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

        {currentView === 'list' && (
          <div className="mb-8 p-4 border rounded-lg shadow-sm bg-card">
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Filter & Sort Recipes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="col-span-1 md:col-span-2 lg:col-span-4">
                <label htmlFor="searchRecipes" className="block text-sm font-medium text-muted-foreground mb-1">Search by Keyword</label>
                <Input 
                  id="searchRecipes"
                  type="text" 
                  placeholder="Search by title or description..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full"
                />
              </div>
              <div><label className="block text-sm font-medium text-muted-foreground mb-1">Cuisine</label><p className="text-sm text-muted-foreground">(Cuisine Select Here - {availableCuisines.join(', ')})</p></div>
              <div><label className="block text-sm font-medium text-muted-foreground mb-1">Category</label><p className="text-sm text-muted-foreground">(Category Select Here - {availableCategories.join(', ')})</p></div>
              <div><label className="block text-sm font-medium text-muted-foreground mb-1">Sort By</label><p className="text-sm text-muted-foreground">(Sort Select Here - Current: {sortBy})</p></div>
              <Button variant="outline" onClick={handleClearFilters} className="w-full lg:w-auto">Clear Filters</Button>
            </div>
          </div>
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
            {filteredAndSortedRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id || recipe.title + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <RecipeCard {...recipe} onClick={() => handleViewRecipe(recipe)} />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </div>
  );
}

export default MainPage;
