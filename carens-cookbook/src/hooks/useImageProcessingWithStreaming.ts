"use client";

import { useCallback } from 'react';
import { toast } from 'sonner';
import { type AIProvider } from '@/lib/config/ui-models';
import { processSingleImage, processMultipleImages } from '@/lib/api-client';
import { logError } from "@/lib/errors";
import { RecipeData } from "@/components/RecipeDisplay";
import { useImageProcessing } from "@/hooks/useRetryableRequest";
import { useMultipleImageProcessing } from "@/hooks/useMultipleImageProcessing";

interface UseImageProcessingWithStreamingOptions {
  onProgress?: (progress: number, message: string) => void;
  onSuccess?: (recipe: RecipeData) => void;
  onError?: (error: string) => void;
  onModalClose?: () => void;
  refetchRecipes?: () => void;
  refetchCategories?: () => void;
  sessionId?: string;
}

export function useImageProcessingWithStreaming({
  onProgress,
  onSuccess,
  onError,
  onModalClose,
  refetchRecipes,
  refetchCategories,
  sessionId
}: UseImageProcessingWithStreamingOptions) {
  
  // Enhanced image processing with retry capability
  const imageProcessing = useImageProcessing(
    async (file: File, provider?: string) => {
      return processSingleImage(file, (provider as AIProvider) || 'openai-main');
    },
    {
      onProgress,
      onError: (error) => {
        logError(error, { 
          context: 'homepage-image-processing',
          fileName: imageProcessing.selectedFile?.name 
        });
        toast.error(error.userMessage);
        onError?.(error.userMessage);
      },
      onSuccess: () => {
        toast.success('Recipe scanned successfully!');
        onModalClose?.();
        refetchRecipes?.();
        refetchCategories?.();
      }
    }
  );

  // Multiple image processing
  const multipleImageProcessing = useMultipleImageProcessing(
    async (files: File[], provider?: string) => {
      return processMultipleImages(files, (provider as AIProvider) || 'openai-main');
    },
    {
      onProgress,
      onError: (error) => {
        logError(error, { 
          context: 'homepage-multiple-image-processing',
          fileCount: multipleImageProcessing.selectedFiles?.length 
        });
        toast.error(error.userMessage);
        onError?.(error.userMessage);
      },
      onSuccess: () => {
        toast.success('Multiple recipe photos processed successfully!');
        onModalClose?.();
        refetchRecipes?.();
        refetchCategories?.();
      }
    }
  );

  // Enhanced streaming handler for image processing
  const handleImageStreamingSubmit = useCallback(async (file: File, provider: AIProvider) => {
    onProgress?.(0, "📷 Starting recipe scan...");

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('provider', provider);
      if (sessionId) {
        formData.append('sessionId', sessionId);
      }

      const response = await fetch(`/api/scan-recipe-stream`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to process recipe image');
      }

      if (!response.body) {
        throw new Error('No response body for streaming');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'progress') {
                onProgress?.(data.progress, data.message);
              } 
              else if (data.type === 'success') {
                const recipeData: RecipeData = data.recipe;
                onProgress?.(100, "✨ Recipe successfully extracted!");
                
                // Show efficiency info
                if (data.tokensUsed) {
                  toast.success(`Image analyzed successfully! (${data.tokensUsed} tokens used)`, { duration: 3000 });
                }
                
                onSuccess?.(recipeData);
                onModalClose?.();
                
                return; // Exit the function on success
              } 
              else if (data.type === 'error') {
                console.error("Error from streaming API:", data.error);
                onError?.(data.error);
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
      console.error("Error in streaming handleImageFileSelect:", err);
      onError?.(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  }, [onProgress, onSuccess, onError, onModalClose, sessionId]);

  const handleImageFileSelect = useCallback(async (file: File, provider: AIProvider) => {
    console.log("Image selected:", file.name, file.type, file.size, "Provider:", provider);
    
    if (!file) {
      toast.error('Please select an image file.');
      return;
    }
    
    try {
      onProgress?.(5, `Checking image format '${file.name}'... 🧐`);
      
      let fileToProcess = file;

      // HEIC conversion handling
      if (file.type === 'image/heic' || file.type === 'image/heif' || 
          file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        
        onProgress?.(10, `Converting '${file.name}' from HEIC to JPEG... ⏳`);
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
          onError?.(`Failed to convert HEIC image: ${errorMessage}`);
          return;
        }
      }

      // PNG to JPEG conversion for large files (>2MB threshold)
      const PNG_SIZE_THRESHOLD = 2 * 1024 * 1024; // 2MB
      if ((file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')) && 
          file.size > PNG_SIZE_THRESHOLD) {
        
        onProgress?.(10, `Converting large PNG '${file.name}' to JPEG for better performance... ⏳`);
        toast.info(`Converting large PNG image to JPEG...`);
        
        try {
          // Create canvas to convert PNG to JPEG
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
          });
          
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Fill with white background (important for transparency)
          ctx!.fillStyle = 'white';
          ctx!.fillRect(0, 0, canvas.width, canvas.height);
          ctx!.drawImage(img, 0, 0);
          
          // Convert to JPEG blob
          const jpegBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob(resolve, 'image/jpeg', 0.85);
          });
          
          if (jpegBlob) {
            const originalNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
            fileToProcess = new File([jpegBlob], `${originalNameWithoutExt}.jpeg`, { type: 'image/jpeg' });
            
            const compressionRatio = ((file.size - jpegBlob.size) / file.size * 100).toFixed(1);
            toast.success(`PNG converted to JPEG! ${compressionRatio}% size reduction`);
            console.log(`PNG compression: ${file.size} → ${jpegBlob.size} bytes (${compressionRatio}% reduction)`);
          }
          
          // Clean up
          URL.revokeObjectURL(img.src);
          
        } catch (conversionError: unknown) {
          console.error("Error converting PNG to JPEG:", conversionError);
          const errorMessage = conversionError instanceof Error ? conversionError.message : 'Unknown error';
          toast.error(`PNG conversion failed, using original file: ${errorMessage}`);
          // Continue with original PNG file instead of failing
        }
      }

      // Use streaming for enhanced progress feedback
      await handleImageStreamingSubmit(fileToProcess, provider);
      
    } catch (err: unknown) {
      console.error("Error in handleImageFileSelect:", err);
      onError?.(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  }, [onProgress, onError, handleImageStreamingSubmit]);

  const handleMultipleImageFileSelect = useCallback(async (files: File[], provider: AIProvider = 'openai-main') => {
    console.log("Multiple images selected:", files.map(f => ({ name: f.name, type: f.type, size: f.size })));
    
    onProgress?.(5, `Preparing to scan ${files.length} images...`);

    try {
      const result = await multipleImageProcessing.processFiles(files, provider);
      
      if (result && typeof result === 'object' && 'title' in result && 'ingredients' in result && 'steps' in result) {
        const recipeData: RecipeData = result as RecipeData;
        onSuccess?.(recipeData);
        onProgress?.(100, "✨ Multiple images processed successfully!");
      }
    } catch (err: unknown) {
      console.error("Error in handleMultipleImageFileSelect:", err);
      onError?.(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  }, [multipleImageProcessing, onSuccess, onProgress, onError]);

  const handleRetryImageProcessing = useCallback(() => {
    if (imageProcessing.canRetry) {
      return imageProcessing.retry();
    }
  }, [imageProcessing]);

  const handleRetryMultipleImageProcessing = useCallback(() => {
    if (multipleImageProcessing.canRetry) {
      return multipleImageProcessing.retry();
    }
  }, [multipleImageProcessing]);

  return {
    imageProcessing,
    multipleImageProcessing,
    handleImageFileSelect,
    handleMultipleImageFileSelect,
    handleRetryImageProcessing,
    handleRetryMultipleImageProcessing,
  };
} 