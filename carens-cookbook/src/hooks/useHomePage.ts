"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AIProvider } from '@/lib/ai-providers';
import { processSingleImage, processMultipleImages } from '@/lib/api-client';
import { logError } from "@/lib/errors";
import { RecipeData } from "@/components/RecipeDisplay";
import { useImageProcessing } from "@/hooks/useRetryableRequest";
import { useMultipleImageProcessing } from "@/hooks/useMultipleImageProcessing";
import { useCategories } from "@/hooks/useCategories";
import { useUserRecipes } from "@/hooks/useRecipes";
import { placeholderRecipes, ALL_POSSIBLE_CATEGORIES } from "@/lib/constants/placeholderRecipes";

export type ViewType = 'list' | 'recipe' | 'save' | 'stats';

interface ProcessedCategory {
  name: string;
  count: number;
  imageUrl?: string | null;
}

export function useHomePage() {
  const router = useRouter();
  
  // Basic state
  const [url, setUrl] = useState("");
  const [urlProcessingMethod, setUrlProcessingMethod] = useState<'openai' | 'gemini'>('openai');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepMessage, setLoadingStepMessage] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [activeImportTab, setActiveImportTab] = useState<'url' | 'photo'>('url');
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
        refetchRecipes();
        refetchCategories();
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
        refetchRecipes();
        refetchCategories();
      }
    }
  );

  // Update processed categories when categories data changes
  useEffect(() => {
    if (categories.length > 0) {
      const processedCategoriesData = categories.map(categoryData => {
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
      
      setProcessedCategories(processedCategoriesData);
    }
  }, [categories, savedRecipes]);

  const handleViewRecipe = useCallback((recipe: RecipeData) => {
    setSelectedRecipe(recipe);
    setCurrentView('recipe');
  }, []);

  // Handle displaying a recipe if recipeId is in URL and recipes are loaded
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
  }, [savedRecipes, handleViewRecipe]);

  const handleDeleteRecipeFromDisplay = useCallback(async (recipeId: string) => {
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
        refetchRecipes();
        refetchCategories();
      } else {
        toast.error(responseData.error || 'Failed to delete recipe.');
        console.error("Error deleting recipe - API response not OK:", responseData);
      }
    } catch (err: unknown) {
      toast.error('An unexpected error occurred while deleting the recipe.');
      console.error("Error in handleDeleteRecipeFromDisplay catch block:", err);
    }
  }, [refetchRecipes, refetchCategories]);

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
        if (selectedRecipe && selectedRecipe.id === recipeId) {
          setSelectedRecipe(prev => prev ? { ...prev, title: newTitle.trim() } : null);
        }
        refetchRecipes();
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
  }, [selectedRecipe, refetchRecipes]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true); 
    setError(null); 
    setLoadingProgress(10);
    setLoadingStepMessage("Okay, let's go find that recipe! 🧑‍🍳");
    
    try {
      setLoadingProgress(25); 
      setLoadingStepMessage("Visiting the recipe page for you... 📄");
      const response = await fetch(`/api/fetch-recipe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, processing_method: urlProcessingMethod }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error fetching from API:", errorData);
        throw new Error(errorData.error || 'Failed to fetch recipe from API');
      }
      
      setLoadingProgress(75); 
      setLoadingStepMessage("Asking the chef (AI) to read the recipe... 🧐");
      const responseData = await response.json();
      const recipeData: RecipeData = responseData.recipe;
      setLoadingProgress(90); 
      setLoadingStepMessage("Getting it all plated up for you... ✨");
      handleViewRecipe(recipeData); 
      setUrl(""); 
      setLoadingProgress(100);
      setShowAddRecipeModal(false);
    } catch (err: unknown) {
      console.error("Error in handleSubmit:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setLoadingProgress(0);
    } finally { 
      setIsLoading(false);
      setLoadingStepMessage("");
      setLoadingProgress(0);
    }
  }, [url, urlProcessingMethod, handleViewRecipe]);
  
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
        refetchRecipes();
        refetchCategories();
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

  const handleImageFileSelect = useCallback(async (file: File, provider: AIProvider) => {
    console.log("Image selected:", file.name, file.type, file.size, "Provider:", provider);
    
    if (!file) {
      toast.error('Please select an image file.');
      return;
    }
    
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
      console.error("Error in handleImageFileSelect:", err);
      setLoadingProgress(0);
    } finally {
      setIsLoading(false);
      setLoadingStepMessage("");
      setLoadingProgress(0);
    }
  }, [imageProcessing, handleViewRecipe]);

  const handleRetryImageProcessing = useCallback(() => {
    if (imageProcessing.canRetry) {
      setIsLoading(true);
      imageProcessing.retry().finally(() => {
        setIsLoading(false);
      });
    }
  }, [imageProcessing]);

  const handleMultipleImageFileSelect = useCallback(async (files: File[], provider: AIProvider = 'openai') => {
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
  }, [multipleImageProcessing, handleViewRecipe]);

  const handleRetryMultipleImageProcessing = useCallback(() => {
    if (multipleImageProcessing.canRetry) {
      setIsLoading(true);
      multipleImageProcessing.retry().finally(() => {
        setIsLoading(false);
      });
    }
  }, [multipleImageProcessing]);

  const handleCategoryClick = useCallback((categoryName: string) => {
    router.push(`/category/${encodeURIComponent(categoryName)}`);
  }, [router]);

  const handleQuickImportURL = useCallback(() => {
    setActiveImportTab('url');
    setShowAddRecipeModal(true);
  }, []);

  const handleQuickScanPhoto = useCallback(() => {
    setActiveImportTab('photo');
    setShowAddRecipeModal(true);
  }, []);

  const handleShowStats = useCallback(() => {
    setCurrentView('stats');
  }, []);

  return {
    // State
    url,
    setUrl,
    urlProcessingMethod,
    setUrlProcessingMethod,
    isLoading: isLoading || imageProcessing.isLoading || multipleImageProcessing.isLoading,
    loadingStepMessage,
    loadingProgress,
    error,
    currentView,
    setCurrentView,
    selectedRecipe,
    showAddRecipeModal,
    setShowAddRecipeModal,
    activeImportTab,
    setActiveImportTab,
    processedCategories,
    
    // Data
    categories,
    categoriesLoading,
    categoriesError: categoriesError?.message || null,
    savedRecipes,
    
    // Image processing
    imageProcessing,
    multipleImageProcessing,
    
    // Handlers
    handleViewRecipe,
    handleDeleteRecipeFromDisplay,
    handleUpdateRecipeTitle,
    handleSubmit,
    handleSaveRecipe,
    handleImageFileSelect,
    handleRetryImageProcessing,
    handleMultipleImageFileSelect,
    handleRetryMultipleImageProcessing,
    handleCategoryClick,
    handleQuickImportURL,
    handleQuickScanPhoto,
    handleShowStats,
  };
} 