"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SearchIcon, HomeIcon, Camera, BarChart3, Link } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { AIProvider } from '@/lib/ai-providers';
import { processSingleImage, processMultipleImages } from '@/lib/api-client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RecipeDisplay, { RecipeData } from "@/components/RecipeDisplay";
import RecipeLoadingProgress from "@/components/ui/RecipeLoadingProgress";
import ScanPhotoButton from "@/components/ui/ScanPhotoButton";
import ScanMultiplePhotoButton from "@/components/ui/ScanMultiplePhotoButton";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import { BentoGrid } from "@/components/BentoGrid";
import { Badge } from "@/components/ui/badge";
import StatsDashboard from "@/components/StatsDashboard";
import { useImageProcessing } from "@/hooks/useRetryableRequest";
import { useMultipleImageProcessing } from "@/hooks/useMultipleImageProcessing";
import { logError } from "@/lib/errors";

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
    category: "Sauces & Seasoning",
    prepTime: "10 min",
    cleanupTime: "5 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1606847773799-297f8796d602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  }
];

const ALL_POSSIBLE_CATEGORIES: { name: string; defaultImageUrl?: string | null }[] = [
  { name: "Appetizer", defaultImageUrl: "https://images.unsplash.com/photo-1572448061886-3DS_Store7e038d674c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Beef", defaultImageUrl: "https://images.unsplash.com/photo-1608039819226-e6ea12c05aa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Beverage", defaultImageUrl: "https://images.unsplash.com/photo-1551030173-1b2ff3648450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Breakfast", defaultImageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Chicken", defaultImageUrl: "https://images.unsplash.com/photo-1598515214211-89d3c73ecc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Dessert", defaultImageUrl: "https://images.unsplash.com/photo-1551024601-bec78d8d590d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Drinks", defaultImageUrl: "https://images.unsplash.com/photo-1551030173-1b2ff3648450?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Lamb", defaultImageUrl: "https://images.unsplash.com/photo-1600891964091-bab6873a49dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Pasta", defaultImageUrl: "https://images.unsplash.com/photo-1589227365533-5f8bbd3ef59d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Pork", defaultImageUrl: "https://images.unsplash.com/photo-1628268900122-c0a3a9ade820?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Salad", defaultImageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Sauce", defaultImageUrl: "https://images.unsplash.com/photo-1562504648-5b7a96109ba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Seafood", defaultImageUrl: "https://images.unsplash.com/photo-1599056000530-de9d18a6983b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Side Dish", defaultImageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Sauces & Seasoning", defaultImageUrl: "https://images.unsplash.com/photo-1562504648-5b7a96109ba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Soup", defaultImageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
  { name: "Thanksgiving", defaultImageUrl: "https://images.unsplash.com/photo-1574966771070-9639608a1173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80" },
  { name: "Vegetable", defaultImageUrl: "https://images.unsplash.com/photo-1597362925123-77861d3fbac8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
].sort((a, b) => a.name.localeCompare(b.name));

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
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group block w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Card className="h-full overflow-hidden border border-border bg-background transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {imageUrl ? (
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <HomeIcon className="h-20 w-20 text-primary/40" />
            </div>
          )}
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Recipe count badge with better prominence */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Badge 
              className={cn(
                "bg-white/95 text-gray-900 border-0 font-medium backdrop-blur-sm px-3 py-1 text-sm",
                "transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:font-semibold"
              )}
            >
              {itemCount} {itemCount === 1 ? 'recipe' : 'recipes'}
            </Badge>
          </motion.div>
          
          {/* Category name overlay with enhanced typography */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.h3 
              className="text-2xl font-medium text-white mb-2 transition-all duration-300 tracking-wide"
              initial={{ y: 10, opacity: 0.9 }}
              animate={{ 
                y: isHovered ? -8 : 0, 
                opacity: 1,
                letterSpacing: isHovered ? "0.025em" : "0"
              }}
              transition={{ duration: 0.3 }}
            >
              {categoryName}
            </motion.h3>
            <motion.div
              className="h-1 bg-primary rounded-full transition-all duration-500"
              initial={{ width: "24px" }}
              animate={{ width: isHovered ? "80px" : "24px" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
        
        {/* Progressive disclosure - additional info that appears on hover */}
        <motion.div 
          className="bg-background border-t border-border/50"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? "auto" : 0, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ overflow: 'hidden' }}
        >
          <div className="p-4">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              {itemCount === 0 
                ? `No ${categoryName.toLowerCase()} recipes yet. Start building your collection!`
                : `Explore ${itemCount} delicious ${categoryName.toLowerCase()} ${itemCount === 1 ? 'recipe' : 'recipes'}`
              }
            </p>
            {itemCount > 0 && (
              <motion.div 
                className="mt-3 flex items-center text-xs text-primary font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Click to explore →
              </motion.div>
            )}
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

function MainPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [processingMethod, setProcessingMethod] = useState<'openai' | 'hyperbrowser'>('hyperbrowser'); // Default to Hyperbrowser
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepMessage, setLoadingStepMessage] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<RecipeData[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'recipe' | 'save' | 'stats'>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [activeImportTab, setActiveImportTab] = useState<'url' | 'photo'>('url');

  const [gridTitle, setGridTitle] = useState("Recipe Categories");
  const [processedCategories, setProcessedCategories] = useState<{ name: string; count: number; imageUrl?: string | null }[]>([]);

  // Enhanced image processing with retry capability
  const imageProcessing = useImageProcessing(
    async (file: File, provider?: string) => {
      return processSingleImage(file, (provider as AIProvider) || 'openai');
    },
    {
      onProgress: (progress, message) => {
        setLoadingProgress(progress);
        setLoadingStepMessage(message);
      },
      onError: (error) => {
        logError(error, { 
          context: 'homepage-image-processing',
          fileName: imageProcessing.selectedFile?.name 
        });
        toast.error(error.userMessage);
      },
      onSuccess: () => {
        toast.success('Recipe scanned successfully!');
        setShowAddRecipeModal(false);
      }
    }
  );

  // Multiple image processing
  const multipleImageProcessing = useMultipleImageProcessing(
    async (files: File[], provider?: string) => {
      return processMultipleImages(files, (provider as AIProvider) || 'openai');
    },
    {
      onProgress: (progress, message) => {
        setLoadingProgress(progress);
        setLoadingStepMessage(message);
      },
      onError: (error) => {
        logError(error, { 
          context: 'homepage-multiple-image-processing',
          fileCount: multipleImageProcessing.selectedFiles?.length 
        });
        toast.error(error.userMessage);
      },
      onSuccess: () => {
        toast.success('Multiple recipe photos processed successfully!');
        setShowAddRecipeModal(false);
      }
    }
  );

  useEffect(() => {
    fetchSavedRecipes();

    const params = new URLSearchParams(window.location.search);
    const recipeIdFromUrl = params.get('recipeId');

    if (recipeIdFromUrl) {
      // const loadRecipeFromUrl = async () => { // Remove this declaration
      // };
      // loadRecipeFromUrl();
    }
  }, []);

  useEffect(() => {
    const categoryData = ALL_POSSIBLE_CATEGORIES.map(masterCategory => {
      const recipesInThisCategory = savedRecipes.filter(r => r.category === masterCategory.name);
      const count = recipesInThisCategory.length;

      let imageUrl = null;
      if (count > 0) {
        const recipeWithImage = recipesInThisCategory.find(r => r.image);
        if (recipeWithImage) {
          imageUrl = recipeWithImage.image;
        }
      }
      
      if (!imageUrl) { // If no saved recipe image, try placeholder
        const placeholder = placeholderRecipes.find(p => p.category === masterCategory.name);
        if (placeholder && placeholder.image) {
          imageUrl = placeholder.image;
        }
      }

      if (!imageUrl) { // If still no image, use default from master list
        imageUrl = masterCategory.defaultImageUrl;
      }

      return {
        name: masterCategory.name,
        count: count,
        imageUrl: imageUrl,
      };
    });
    
    setProcessedCategories(categoryData);
    setGridTitle("Recipe Categories"); // Always show this title

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
        body: JSON.stringify({ url, processing_method: processingMethod }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error fetching from API:", errorData);
        throw new Error(errorData.error || 'Failed to fetch recipe from API');
      }
      setLoadingProgress(75); setLoadingStepMessage("Asking the chef (AI) to read the recipe... 🧐");
      const responseData = await response.json();
      const recipeData: RecipeData = responseData.recipe;
      setLoadingProgress(90); setLoadingStepMessage("Getting it all plated up for you... ✨");
      handleViewRecipe(recipeData); 
      setUrl(""); setLoadingProgress(100);
      setShowAddRecipeModal(false);
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



  const handleImageFileSelect = async (file: File, provider: AIProvider) => {
    console.log("Image selected:", file.name, file.type, file.size, "Provider:", provider);
    
    if (!file) {
      toast.error('Please select an image file.');
      return;
    }
    
    // Use the imageProcessing hook directly instead of handleProcessImage
    try {
      setIsLoading(true);
      setError(null);
      setUrl("");
      setLoadingProgress(5);
      setLoadingStepMessage(`Checking image format '${file.name}'... 🧐`);
      
      let fileToProcess = file;

      // HEIC conversion handling
      if (file.type === 'image/heic' || file.type === 'image/heif' || 
          file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        
        setLoadingStepMessage(`Converting '${file.name}' from HEIC to JPEG... ⏳`);
        toast.info(`Converting HEIC image to JPEG...`);
        
        try {
          const heic2any = (await import('heic2any')).default;
          const conversionResult = await heic2any({ 
            blob: file, 
            toType: "image/jpeg", 
            quality: 0.8 
          });
          
          const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
          const originalNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
          fileToProcess = new File([convertedBlob], `${originalNameWithoutExt}.jpeg`, { type: 'image/jpeg' });
          
          toast.success(`Image converted successfully!`);
        } catch (conversionError: unknown) {
          console.error("Error converting HEIC to JPEG:", conversionError);
          const errorMessage = conversionError instanceof Error ? conversionError.message : 'Unknown error';
          toast.error(`Failed to convert HEIC image: ${errorMessage}`);
          setIsLoading(false);
          setLoadingProgress(0);
          setLoadingStepMessage("");
          return;
        }
      }

      setLoadingProgress(10);
      setLoadingStepMessage(`Preparing to scan '${fileToProcess.name}'... 🖼️`);
      
      const result = await imageProcessing.processFile(fileToProcess, provider);
      
      if (result && typeof result === 'object' && 'title' in result && 'ingredients' in result && 'steps' in result) {
        const recipeData: RecipeData = result as RecipeData;
        handleViewRecipe(recipeData);
        setLoadingProgress(100);
      }
    } catch (err: unknown) {
      // Error handling is managed by the imageProcessing hook
      console.error("Error in handleImageFileSelect:", err);
      setLoadingProgress(0);
    } finally {
      setIsLoading(false);
      setLoadingStepMessage("");
      setLoadingProgress(0);
    }
  };

  const handleRetryImageProcessing = () => {
    if (imageProcessing.canRetry) {
      setIsLoading(true);
      imageProcessing.retry().finally(() => {
        setIsLoading(false);
      });
    }
  };

  const handleMultipleImageFileSelect = async (files: File[], provider: AIProvider = 'openai') => {
    console.log("Multiple images selected:", files.map(f => ({ name: f.name, type: f.type, size: f.size })));
    
    setIsLoading(true);
    setError(null);
    setUrl("");
    setLoadingProgress(5);
    setLoadingStepMessage(`Preparing to scan ${files.length} images...`);

    try {
      const result = await multipleImageProcessing.processFiles(files, provider);
      
      if (result && typeof result === 'object' && 'title' in result && 'ingredients' in result && 'steps' in result) {
        const recipeData: RecipeData = result as RecipeData;
        handleViewRecipe(recipeData);
        setLoadingProgress(100);
      }
    } catch (err: unknown) {
      console.error("Error in handleMultipleImageFileSelect:", err);
      setLoadingProgress(0);
    } finally {
      setIsLoading(false);
      setLoadingStepMessage("");
      setLoadingProgress(0);
    }
  };

  const handleRetryMultipleImageProcessing = () => {
    if (multipleImageProcessing.canRetry) {
      setIsLoading(true);
      multipleImageProcessing.retry().finally(() => {
        setIsLoading(false);
      });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/category/${encodeURIComponent(categoryName)}`);
  };

  const handleQuickImportURL = () => {
    setActiveImportTab('url');
    setShowAddRecipeModal(true);
  };

  const handleQuickScanPhoto = () => {
    setActiveImportTab('photo');
    setShowAddRecipeModal(true);
  };

  const handleShowStats = () => {
    setCurrentView('stats');
  };

  // Removed unused functions: handleRandomRecipe and handleShoppingList

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
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-black tracking-tight mb-3 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Caren&apos;s Cookbook
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your personal recipe collection
          </motion.p>
        </header>

        {/* Quick Actions Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-foreground mb-2">Quick Actions</h2>
            <p className="text-muted-foreground font-light">Start your cooking journey</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card 
              className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary hover:bg-primary/5"
              onClick={handleQuickImportURL}
            >
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <SearchIcon className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-primary">Import from URL</h3>
                <p className="text-muted-foreground text-base font-light">Paste any recipe link to import</p>
              </div>
            </Card>
            
            <Card 
              className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-emerald-500 hover:bg-emerald-50/50"
              onClick={handleQuickScanPhoto}
            >
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-emerald-700">Scan Recipe</h3>
                <p className="text-muted-foreground text-base font-light">Upload a photo to extract recipe</p>
              </div>
            </Card>
            
            <Card 
              className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 group border-2 hover:border-purple-500 hover:bg-purple-50/50"
              onClick={handleShowStats}
            >
              <div className="text-center">
                <div className="mx-auto w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-medium mb-3 text-purple-700">Collection Stats</h3>
                <p className="text-muted-foreground text-base font-light">View insights about your recipes</p>
              </div>
            </Card>
          </div>
        </motion.section>

        {currentView !== 'list' && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={() => setCurrentView('list')}
              variant="outline"
              className="flex items-center gap-3 text-lg p-6 mx-auto sm:mx-0 font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-primary/30 hover:border-primary"
            >
              <HomeIcon className="h-5 w-5" />
              Back to Recipe List
            </Button>
          </motion.div>
        )}

        {currentView === 'list' && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-medium text-foreground mb-3">
                {gridTitle}
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Browse recipes by category • {savedRecipes.length} total recipes
              </p>
            </div>

            <BentoGrid className="gap-8">
              {processedCategories.map((category, index) => (
                <motion.div
                  key={category.name + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="h-full min-h-[350px]"
                >
                  <CategoryCard 
                    categoryName={category.name} 
                    itemCount={category.count}
                    imageUrl={category.imageUrl}
                    onClick={() => handleCategoryClick(category.name)} 
                  />
                </motion.div>
              ))}
            </BentoGrid>
          </motion.div>
        )}

        {currentView === 'save' && (
          <motion.div
            key="save-recipe"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center py-16">
              <p className="text-muted-foreground font-light text-lg">Save functionality not implemented yet</p>
            </div>
          </motion.div>
        )}

        {currentView === 'stats' && (
          <motion.div
            key="stats-dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light text-foreground mb-3">Collection Insights</h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Discover patterns and trends in your recipe collection
              </p>
            </div>
            <StatsDashboard recipes={savedRecipes} />
          </motion.div>
        )}
      </div>

      {/* Recipe Import Modal */}
      <Dialog open={showAddRecipeModal} onOpenChange={setShowAddRecipeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary">
              Recipe Import
            </DialogTitle>
            <DialogDescription>
              Choose a method to import a new recipe
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <Tabs value={activeImportTab} onValueChange={(value) => setActiveImportTab(value as 'url' | 'photo')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="url" className="flex items-center gap-2 text-sm font-medium">
                  <Link className="h-4 w-4" />
                  Import from URL
                </TabsTrigger>
                <TabsTrigger value="photo" className="flex items-center gap-2 text-sm font-medium">
                  <Camera className="h-4 w-4" />
                  Scan Photo
                </TabsTrigger>
              </TabsList>
              
              {/* URL Import Tab */}
              <TabsContent value="url" className="mt-6">
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <SearchIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Import from URL</h3>
                    <p className="text-sm text-muted-foreground">
                      Paste a recipe URL and we&apos;ll extract all the details
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <Input
                        type="url"
                        placeholder="https://example.com/recipe"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isLoading}
                        className="text-lg p-6"
                      />
                      
                      {/* Processing Method Selector */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Processing Method
                        </label>
                        <Select
                          value={processingMethod}
                          onValueChange={(value: 'openai' | 'hyperbrowser') => setProcessingMethod(value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger className="text-lg p-6">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hyperbrowser">
                              <div className="flex flex-col items-start">
                                <span className="font-semibold">🚀 Hyperbrowser (Recommended)</span>
                                <span className="text-xs text-muted-foreground">Faster, more accurate extraction</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="openai">
                              <div className="flex flex-col items-start">
                                <span className="font-semibold">🤖 OpenAI</span>
                                <span className="text-xs text-muted-foreground">AI-powered traditional extraction</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* Info about selected method */}
                        <div className="text-xs text-muted-foreground p-2 rounded-md bg-muted/50">
                          {processingMethod === 'hyperbrowser' ? (
                            <>⚡ <strong>Hyperbrowser:</strong> Professional web scraping with 95%+ accuracy, faster processing</>
                          ) : (
                            <>🧠 <strong>OpenAI:</strong> AI interpretation of web content, may have occasional parsing issues</>
                          )}
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={isLoading} size="lg" className="text-lg px-6">
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
                            Import Recipe
                          </span>
                        )}
                      </Button>
                    </div>
                    {error && !isLoading && (
                      <p className="text-sm text-red-600 mt-2">{error}</p>
                    )}
                  </form>
                </div>
              </TabsContent>
              
              {/* Photo Scan Tab */}
              <TabsContent value="photo" className="mt-6">
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Camera className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Scan Recipe Photo(s)</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload one or multiple photos of a recipe and we&apos;ll extract the details
                    </p>
                  </div>
                  
                  {/* Enhanced Error Display for Image Processing */}
                  {imageProcessing.error && (
                    <ErrorDisplay 
                      error={imageProcessing.error}
                      onRetry={handleRetryImageProcessing}
                      onDismiss={() => imageProcessing.reset()}
                      compact={true}
                      className="mb-4"
                    />
                  )}

                  {/* Enhanced Error Display for Multiple Image Processing */}
                  {multipleImageProcessing.error && (
                    <ErrorDisplay 
                      error={multipleImageProcessing.error}
                      onRetry={handleRetryMultipleImageProcessing}
                      onDismiss={() => multipleImageProcessing.reset()}
                      compact={true}
                      className="mb-4"
                    />
                  )}
                  
                  {/* Single Image Upload */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <h4 className="font-medium text-sm">Single Photo Scan</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Perfect for simple recipes or single-page cookbook photos
                    </p>
                    <ScanPhotoButton 
                      onFileSelect={handleImageFileSelect}
                      disabled={imageProcessing.isLoading || multipleImageProcessing.isLoading}
                      buttonText="Scan Single Photo"
                      size="default"
                    />
                  </div>

                  {/* Multiple Image Upload */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <h4 className="font-medium text-sm">Multiple Photos Scan</h4>
                      <Badge variant="secondary" className="text-xs">Recommended</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Upload multiple photos showing different parts of your recipe (ingredients, steps, etc.)
                    </p>
                    <ScanMultiplePhotoButton 
                      onFilesSelect={handleMultipleImageFileSelect}
                      disabled={imageProcessing.isLoading || multipleImageProcessing.isLoading}
                      buttonText="Scan Multiple Photos"
                      variant="secondary"
                      size="default"
                      maxFiles={5}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Loading Progress */}
            {(isLoading || imageProcessing.isLoading || multipleImageProcessing.isLoading) && loadingStepMessage && (
              <div className="mt-6">
                <RecipeLoadingProgress 
                  progress={loadingProgress} 
                  statusMessage={loadingStepMessage} 
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default MainPage;
