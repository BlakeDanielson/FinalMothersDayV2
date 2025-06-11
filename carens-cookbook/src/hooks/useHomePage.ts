"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { type AIProvider } from '@/lib/config/ui-models';
import { RecipeData } from "@/components/RecipeDisplay";
import { useCategoryProcessing } from "@/hooks/useCategoryProcessing";
import { useImageProcessingWithStreaming } from "@/hooks/useImageProcessingWithStreaming";
import { useRecipeOperations } from "@/hooks/useRecipeOperations";
import { useSessionId } from "@/hooks/useSessionId";

export type ViewType = 'list' | 'recipe' | 'save' | 'stats';

export function useHomePage() {
  const router = useRouter();
  const sessionId = useSessionId();
  
  // Basic state
  const [url, setUrl] = useState("");
  const [urlProcessingMethod, setUrlProcessingMethod] = useState<AIProvider>('openai-main');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepMessage, setLoadingStepMessage] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [activeImportTab, setActiveImportTab] = useState<'url' | 'photo'>('url');

  // Use extracted hooks
  const {
    categories,
    categoriesLoading,
    categoriesError,
    savedRecipes,
    processedCategories,
    refetchCategories,
    refetchRecipes,
  } = useCategoryProcessing();

  const {
    handleSaveRecipe,
    handleDeleteRecipeFromDisplay,
    handleUpdateRecipeTitle,
  } = useRecipeOperations({
    refetchRecipes,
    refetchCategories,
    onRecipeDeleted: () => {
      setSelectedRecipe(null);
      setCurrentView('list');
    },
    onRecipeUpdated: (updatedRecipe) => {
      if (selectedRecipe && selectedRecipe.id === updatedRecipe.id) {
        setSelectedRecipe(updatedRecipe);
      }
    },
  });

  const {
    imageProcessing,
    multipleImageProcessing,
    handleImageFileSelect,
    handleMultipleImageFileSelect,
    handleRetryImageProcessing,
    handleRetryMultipleImageProcessing,
  } = useImageProcessingWithStreaming({
    onProgress: (progress, message) => {
      setLoadingProgress(progress);
      setLoadingStepMessage(message);
    },
    onSuccess: (recipe) => {
      handleViewRecipe(recipe);
    },
    onError: (error) => {
      setError(error);
    },
    onModalClose: () => {
      setShowAddRecipeModal(false);
    },
    refetchRecipes,
    refetchCategories,
    sessionId,
  });

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

  const handleUrlSubmit = useCallback(async (
    urlToProcess: string, 
    geminiProvider: AIProvider, 
    openaiProvider: AIProvider, 
    forceStrategy?: 'url-direct' | 'html-fallback'
  ) => {
    if (!urlToProcess) return;
    setIsLoading(true); 
    setError(null); 
    setLoadingProgress(0);
    setLoadingStepMessage("Starting...");
    
    try {
      // Create a fetch request for streaming with POST body
      const response = await fetch('/api/fetch-recipe-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url: urlToProcess, 
          forceStrategy,
          geminiProvider,
          openaiProvider
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start recipe extraction');
      }

      // Read the streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Unable to read streaming response');
      }

      // Process the streaming response
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6)); // Remove 'data: ' prefix
              
              if (data.type === 'progress') {
                setLoadingProgress(data.progress);
                setLoadingStepMessage(data.message);
                console.log(`📊 Real-time progress: ${data.progress}% - ${data.message}`);
              } 
              else if (data.type === 'success') {
                const recipeData: RecipeData = data.recipe;
                
                // Show optimization results
                if (data.optimization) {
                  const { strategy, efficiencyGain } = data.optimization;
                  console.log("🎯 Optimization results:", data.optimization);
                  
                  // Show a toast with efficiency info
                  if (strategy === 'gemini-url-direct') {
                    toast.success(`Ultra-efficient extraction! ${efficiencyGain}`, { duration: 4000 });
                  } else {
                    toast.info(`Extracted via fallback: ${strategy}`, { duration: 3000 });
                  }
                }
                
                handleViewRecipe(recipeData);
                setShowAddRecipeModal(false);
                
                // Reset loading state
                setIsLoading(false);
                setLoadingProgress(0);
                setLoadingStepMessage("");
                
                return; // Exit the function on success
              } 
              else if (data.type === 'error') {
                console.error("Error from streaming API:", data.error);
                setError(data.error);
                
                // Reset loading state
                setIsLoading(false);
                setLoadingProgress(0);
                setLoadingStepMessage("");
                
                return; // Exit the function on error
              }
            } catch (parseError) {
              console.error("Error parsing streaming data:", parseError);
              // Continue to next line on parse error
            }
          }
        }
      }

    } catch (err: unknown) {
      console.error("Error in streaming handleUrlSubmit:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally { 
      // Note: Don't reset loading state here since SSE will handle completion
      // The loading state will be reset when we receive success/error events
    }
  }, [handleViewRecipe]);
  
  // Enhanced streaming image handlers with loading state management  
  const handleImageFileSelectWithStreaming = useCallback(async (file: File, provider: AIProvider) => {
    setIsLoading(true);
    setError(null);
    setUrl("");
    await handleImageFileSelect(file, provider);
    setIsLoading(false);
  }, [handleImageFileSelect]);

  const handleMultipleImageFileSelectWithStreaming = useCallback(async (files: File[], provider: AIProvider = 'openai-main') => {
    setIsLoading(true);
    setError(null);
    setUrl("");
    await handleMultipleImageFileSelect(files, provider);
    setIsLoading(false);
  }, [handleMultipleImageFileSelect]);

  const handleRetryImageProcessingWithState = useCallback(async () => {
    setIsLoading(true);
    await handleRetryImageProcessing();
    setIsLoading(false);
  }, [handleRetryImageProcessing]);

  const handleRetryMultipleImageProcessingWithState = useCallback(async () => {
    setIsLoading(true);
    await handleRetryMultipleImageProcessing();
    setIsLoading(false);
  }, [handleRetryMultipleImageProcessing]);

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
    categoriesError,
    savedRecipes,
    
    // Image processing
    imageProcessing,
    multipleImageProcessing,
    
    // Handlers
    handleViewRecipe,
    handleDeleteRecipeFromDisplay,
    handleUpdateRecipeTitle,
    handleSubmit,
    handleUrlSubmit,
    handleSaveRecipe,
    handleImageFileSelect: handleImageFileSelectWithStreaming,
    handleRetryImageProcessing: handleRetryImageProcessingWithState,
    handleMultipleImageFileSelect: handleMultipleImageFileSelectWithStreaming,
    handleRetryMultipleImageProcessing: handleRetryMultipleImageProcessingWithState,
    handleCategoryClick,
    handleQuickImportURL,
    handleQuickScanPhoto,
    handleShowStats,
  };
} 