"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, SearchIcon, HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RecipeDisplay, { RecipeData } from "@/components/RecipeDisplay";
import RecipeLoadingProgress from "@/components/ui/RecipeLoadingProgress";

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
    title: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    tags: ["Italian", "Pasta", "Quick"],
    prepTime: "10 min",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
  },
  {
    title: "Avocado Toast with Poached Eggs",
    description: "Creamy avocado spread on toasted sourdough bread topped with perfectly poached eggs.",
    tags: ["Breakfast", "Healthy", "Vegetarian"],
    prepTime: "5 min",
    cleanupTime: "10 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
  },
  {
    title: "Thai Green Curry",
    description: "A fragrant and spicy curry made with coconut milk, green curry paste, and fresh vegetables.",
    tags: ["Thai", "Spicy", "Dinner"],
    prepTime: "20 min",
    cleanupTime: "30 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    title: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with crispy edges and a soft, chewy center loaded with chocolate chips.",
    tags: ["Dessert", "Baking", "Family Favorite"],
    prepTime: "15 min",
    cleanupTime: "12 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    title: "Quinoa Salad with Roasted Vegetables",
    description: "A nutritious salad with fluffy quinoa, roasted seasonal vegetables, and a zesty lemon dressing.",
    tags: ["Salad", "Vegan", "Meal Prep"],
    prepTime: "15 min",
    cleanupTime: "25 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
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
  const [fetchedRecipes, setFetchedRecipes] = useState<RecipeData[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'recipe' | 'save'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);

  const handleViewRecipe = (recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setLoadingProgress(10);
    setLoadingStepMessage("Okay, let's go find that recipe! 🧑‍🍳"); 
    try {
      setLoadingProgress(30);
      setLoadingStepMessage("Visiting the recipe page for you... 📄");
      const response = await fetch('/api/fetch-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch recipe from API');
      }
      setLoadingProgress(60);
      setLoadingStepMessage("Reading through the recipe details now... 🧐");
      const recipeData: RecipeData = await response.json();
      
      setLoadingProgress(90);
      setLoadingStepMessage("Getting it all ready to show you... ✨");
      console.log("Recipe data fetched successfully:", recipeData);
      setFetchedRecipes(prevRecipes => [recipeData, ...prevRecipes.filter(r => r.title !== recipeData.title)]);
      setLoadingProgress(100);
      handleViewRecipe(recipeData);
      setUrl("");
    } catch (err: any) {
      console.error("Error fetching recipe:", err);
      setError(err.message || "An unexpected error occurred.");
      setLoadingProgress(0); // Reset progress on error
    } finally {
      setIsLoading(false);
      setLoadingStepMessage(""); 
      setLoadingProgress(0); 
    }
  };
  
  const handleSaveRecipe = (recipeToSave: RecipeData) => {
    console.log("Recipe saved (simulated):", recipeToSave.title);
    alert(`${recipeToSave.title} saved! (Simulated)`);
  };

  if (currentView === 'recipe' && selectedRecipe) {
    return (
      <>
        <div className="container mx-auto px-4 pt-6 text-left">
          <Button 
            onClick={() => setCurrentView('list')}
            variant="outline"
            className="mb-6 flex items-center gap-2 text-lg p-5 pr-6"
          >
            <HomeIcon className="h-5 w-5" />
            Back to Recipes
          </Button>
        </div>
        <RecipeDisplay 
          recipe={selectedRecipe} 
          onSave={handleSaveRecipe}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Caren's Cookbook
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
                    {isLoading ? (
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
                    Enter the web address of any recipe, and we'll import it for you!
                  </p>
                )}
              </form>
            </Card>
            {isLoading && (
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
              {fetchedRecipes.length > 0 ? 'Your Latest Recipes' : 'Recipe Ideas'}
            </h2>
          </div>

          <BentoGrid>
            {(fetchedRecipes.length > 0 ? fetchedRecipes : placeholderRecipes).map((recipe, index) => (
              <motion.div
                key={recipe.title + index}
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
