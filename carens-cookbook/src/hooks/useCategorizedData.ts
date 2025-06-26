import { useState, useEffect } from 'react';
import { Recipe } from './useRecipes';

// Extended recipe interface to include fields that may exist in the database but not in the base Recipe interface
interface ExtendedRecipe extends Recipe {
  mealType?: string;
}

interface CategoryWithCount {
  name: string;
  count: number;
  imageUrl?: string | null;
}

interface CategorizedData {
  recipeCategories: CategoryWithCount[];
  mealTypes: CategoryWithCount[];
  cuisines: CategoryWithCount[];
  totalRecipes: number;
}

interface UseCategorizedDataReturn {
  data: CategorizedData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

// Helper function to validate if an image URL looks valid
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  const trimmedUrl = url.trim();
  if (!trimmedUrl) return false;
  
  // Check if it's a valid URL format
  try {
    new URL(trimmedUrl);
  } catch {
    return false;
  }
  
  // Check if it looks like an image URL
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  const lowerUrl = trimmedUrl.toLowerCase();
  
  // Allow URLs that end with image extensions OR contain image-related paths
  const hasImageExtension = imageExtensions.some(ext => lowerUrl.includes(ext));
  const hasImagePath = lowerUrl.includes('/image') || lowerUrl.includes('photo') || lowerUrl.includes('img') || lowerUrl.includes('/thmb/');
  const isDataUrl = lowerUrl.startsWith('data:image/');
  const isUnsplashOrCloudinary = lowerUrl.includes('unsplash.com') || lowerUrl.includes('cloudinary.com');
  
  return hasImageExtension || hasImagePath || isDataUrl || isUnsplashOrCloudinary;
};

// Helper function to test if an image URL actually loads
const testImageUrl = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    // Set a timeout to avoid hanging on slow/broken URLs
    const timeout = setTimeout(() => {
      resolve(false);
    }, 3000); // 3 second timeout
    
    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };
    
    img.src = url;
  });
};

// Helper function to select the best recipe image (async version)
const selectBestRecipeImage = async (recipes: Recipe[], categoryName?: string): Promise<string | null> => {
  if (!recipes || recipes.length === 0) return null;
  
  // Filter recipes that have valid-looking images
  const recipesWithValidImages = recipes.filter(recipe => {
    const hasValidImage = recipe.image && isValidImageUrl(recipe.image);
    if (categoryName && !hasValidImage && recipe.image) {
      console.log(`[${categoryName}] Skipping invalid image URL for recipe "${recipe.title}":`, recipe.image);
    }
    return hasValidImage;
  });
  
  if (recipesWithValidImages.length === 0) {
    if (categoryName && recipes.some(r => r.image)) {
      console.log(`[${categoryName}] No valid images found among ${recipes.length} recipes, but some have image URLs`);
    }
    return null;
  }
  
  // Sort by most recent first
  const sortedRecipes = recipesWithValidImages.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt).getTime();
    return dateB - dateA; // Most recent first
  });
  
  // Test images one by one until we find one that loads (limit to first 3 for performance)
  const maxImagesToTest = 3;
  for (let i = 0; i < Math.min(sortedRecipes.length, maxImagesToTest); i++) {
    const recipe = sortedRecipes[i];
    const imageUrl = recipe.image;
    
    const imageLoads = await testImageUrl(imageUrl);
    if (imageLoads) {
      if (categoryName) {
        console.log(`[${categoryName}] ✅ Using image from "${recipe.title}"`);
      }
      return imageUrl;
    } else {
      if (categoryName) {
        console.log(`[${categoryName}] ❌ Skipped broken image from "${recipe.title}"`);
      }
    }
  }
  
  if (categoryName) {
    console.log(`[${categoryName}] No working images found among ${recipesWithValidImages.length} candidates`);
  }
  
  return null;
};

export function useCategorizedData(): UseCategorizedDataReturn {
  const [data, setData] = useState<CategorizedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For now, use the existing categories API and recipes API to build the data
      const [categoriesResponse, recipesResponse] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/recipes')
      ]);
      
      if (!categoriesResponse.ok) {
        throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText}`);
      }
      
      const categories = await categoriesResponse.json();
      let recipes = [];
      
      // Only fetch recipes if the response is ok (user might not be authenticated)
      if (recipesResponse.ok) {
        recipes = await recipesResponse.json();
      } else if (recipesResponse.status === 401) {
        // User is not authenticated, recipes will remain empty array
        console.log('User not authenticated, showing categories with 0 counts');
      }

      // Process the data to create our categorized structure with recipe photos
      const recipeCategories = await Promise.all(categories.map(async (cat: CategoryWithCount) => {
        // Find the best recipe image for this category
        const recipesInCategory = recipes.filter((recipe: Recipe) => recipe.category === cat.name);
        const bestImageUrl = await selectBestRecipeImage(recipesInCategory, cat.name);
        
        return {
          name: cat.name,
          count: cat.count,
          imageUrl: bestImageUrl
        };
      }));

      // Create meal types from recipes
      const mealTypeCounts: Record<string, number> = {};
      const cuisineCounts: Record<string, number> = {};

      recipes.forEach((recipe: ExtendedRecipe) => {
        if (recipe.mealType) {
          mealTypeCounts[recipe.mealType] = (mealTypeCounts[recipe.mealType] || 0) + 1;
        }
        if (recipe.cuisine) {
          cuisineCounts[recipe.cuisine] = (cuisineCounts[recipe.cuisine] || 0) + 1;
        }
      });

      // Default meal types
      const defaultMealTypes = [
        "Appetizer", "Main Course", "Side Dish", "Soup", "Salad", 
        "Dessert", "Breakfast", "Drinks", "Snacks", "Sauce"
      ];

      const mealTypes = await Promise.all(defaultMealTypes.map(async mealType => {
        // Find the best recipe image for this meal type
        const recipesInMealType = recipes.filter((recipe: ExtendedRecipe) => recipe.mealType === mealType);
        const bestImageUrl = await selectBestRecipeImage(recipesInMealType, `MealType: ${mealType}`);
        
        return {
          name: mealType,
          count: mealTypeCounts[mealType] || 0,
          imageUrl: bestImageUrl
        };
      }));  // Show all default meal types, even with 0 counts

      // Cuisines - show popular cuisines, prioritizing those with recipes
      const defaultCuisines = [
        "Italian", "Mexican", "Chinese", "Indian", "American", "French",
        "Japanese", "Thai", "Greek", "Spanish", "Mediterranean", "Korean"
      ];
      
      // Get cuisines with recipes and their images
      const cuisinesWithRecipes = await Promise.all(
        Object.entries(cuisineCounts).map(async ([name, count]) => {
          // Find the best recipe image for this cuisine
          const recipesInCuisine = recipes.filter((recipe: ExtendedRecipe) => recipe.cuisine === name);
          const bestImageUrl = await selectBestRecipeImage(recipesInCuisine, `Cuisine: ${name}`);
          
          return { 
            name, 
            count, 
            imageUrl: bestImageUrl 
          };
        })
      );
      cuisinesWithRecipes.sort((a, b) => b.count - a.count);
      
      // Add default cuisines that don't have recipes yet
      const cuisinesWithoutRecipes = defaultCuisines
        .filter(cuisine => !cuisineCounts[cuisine])
        .map(name => ({ name, count: 0, imageUrl: null }));
      
      const cuisines = [...cuisinesWithRecipes, ...cuisinesWithoutRecipes];

      const result: CategorizedData = {
        recipeCategories,
        mealTypes,
        cuisines,
        totalRecipes: recipes.length
      };

      setData(result);
    } catch (err) {
      console.error('Error fetching categorized data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch
  };
} 