import { useState, useCallback } from 'react';
import { RecipeProcessingError, ErrorType } from '@/lib/errors';

interface MultipleImageProcessingOptions {
  onProgress?: (progress: number, message: string) => void;
  onError?: (error: RecipeProcessingError) => void;
  onSuccess?: () => void;
  maxRetries?: number;
}

export function useMultipleImageProcessing(
  processFn: (files: File[], provider?: string) => Promise<unknown>,
  options: MultipleImageProcessingOptions = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>('openai');
  const [error, setError] = useState<RecipeProcessingError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = options.maxRetries ?? 2;

  const validateFiles = useCallback((files: File[]) => {
    if (!files || files.length === 0) {
      throw new RecipeProcessingError({
        type: ErrorType.INVALID_RECIPE_DATA,
        message: 'No files selected for processing',
        userMessage: 'Please select at least one image file.',
        actionable: 'Choose one or more image files to process.',
        retryable: false
      });
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
    const MAX_FILES = 5;
    const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];

    if (files.length > MAX_FILES) {
      throw new RecipeProcessingError({
        type: ErrorType.INVALID_RECIPE_DATA,
        message: `Too many files: ${files.length} (max: ${MAX_FILES})`,
        userMessage: `You can upload a maximum of ${MAX_FILES} images at once.`,
        actionable: `Please select up to ${MAX_FILES} images.`,
        retryable: false
      });
    }

    files.forEach((file) => {
      // File size validation
      if (file.size > MAX_FILE_SIZE) {
        throw new RecipeProcessingError({
          type: ErrorType.FILE_TOO_LARGE,
          message: `File "${file.name}" size ${file.size} exceeds maximum ${MAX_FILE_SIZE}`,
          userMessage: `The image "${file.name}" is too large.`,
          actionable: 'Please use images smaller than 10MB each.',
          retryable: false
        });
      }

      // File format validation
      const isValidFormat = supportedFormats.some(format => 
        file.type === format || file.name.toLowerCase().endsWith(format.split('/')[1])
      );
      
      if (!isValidFormat) {
        throw new RecipeProcessingError({
          type: ErrorType.FILE_FORMAT_UNSUPPORTED,
          message: `Unsupported file format: ${file.type} (${file.name})`,
          userMessage: `The image "${file.name}" format is not supported.`,
          actionable: 'Please use JPG, PNG, or HEIC format for all images.',
          retryable: false
        });
      }

      // Empty file check
      if (file.size === 0) {
        throw new RecipeProcessingError({
          type: ErrorType.FILE_CORRUPTED,
          message: `File "${file.name}" is empty`,
          userMessage: `The image "${file.name}" appears to be corrupted or empty.`,
          actionable: 'Please try uploading different images.',
          retryable: false
        });
      }
    });
  }, []);

  const processFiles = useCallback(async (files: File[], provider: string = 'openai') => {
    try {
      setIsLoading(true);
      setError(null);
      
      options.onProgress?.(5, `Validating ${files.length} images...`);
      
      // Validate files
      validateFiles(files);
      
      options.onProgress?.(15, `Preparing ${files.length} images for processing...`);
      
      // HEIC conversion handling for each file
      const processedFiles: File[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const progress = 15 + (i / files.length) * 30; // 15-45% for conversion
        let currentFile = file;
        
        // HEIC conversion
        if (file.type === 'image/heic' || file.type === 'image/heif' || 
            file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
          
          options.onProgress?.(progress, `Converting '${file.name}' from HEIC to JPEG...`);
          
          try {
            const heic2any = (await import('heic2any')).default;
            const conversionResult = await heic2any({ 
              blob: file, 
              toType: "image/jpeg", 
              quality: 0.8 
            });
            
            const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
            const originalNameWithoutExt = file.name.split('.').slice(0, -1).join('.');
            currentFile = new File([convertedBlob], `${originalNameWithoutExt}.jpeg`, { type: 'image/jpeg' });
            
          } catch (conversionError: unknown) {
            throw new RecipeProcessingError({
              type: ErrorType.FILE_CONVERSION_FAILED,
              message: `Failed to convert HEIC file: ${file.name}`,
              userMessage: `Failed to convert HEIC image: ${file.name}`,
              actionable: 'Please try converting the image to JPG or PNG format first.',
              retryable: false,
              details: { fileName: file.name, error: conversionError }
            });
          }
        }

        // PNG to JPEG conversion for large files (>2MB threshold)
        const PNG_SIZE_THRESHOLD = 2 * 1024 * 1024; // 2MB
        if ((currentFile.type === 'image/png' || currentFile.name.toLowerCase().endsWith('.png')) && 
            currentFile.size > PNG_SIZE_THRESHOLD) {
          
          options.onProgress?.(progress + 5, `Converting large PNG '${currentFile.name}' to JPEG...`);
          
          try {
            // Create canvas to convert PNG to JPEG
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = URL.createObjectURL(currentFile);
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
              const originalNameWithoutExt = currentFile.name.split('.').slice(0, -1).join('.');
              currentFile = new File([jpegBlob], `${originalNameWithoutExt}.jpeg`, { type: 'image/jpeg' });
              
              const compressionRatio = ((file.size - jpegBlob.size) / file.size * 100).toFixed(1);
              console.log(`PNG compression for ${file.name}: ${file.size} → ${jpegBlob.size} bytes (${compressionRatio}% reduction)`);
            }
            
            // Clean up
            URL.revokeObjectURL(img.src);
            
          } catch (conversionError: unknown) {
            console.error(`Error converting PNG to JPEG for ${currentFile.name}:`, conversionError);
            // Continue with original PNG file instead of failing
          }
        }
        
        processedFiles.push(currentFile);
      }
      
      options.onProgress?.(50, `Processing ${processedFiles.length} images with AI...`);
      
      // Store the files and provider for potential retry
      setSelectedFiles(processedFiles);
      setSelectedProvider(provider);
      
      // Call the processing function
      const result = await processFn(processedFiles, provider);
      
      options.onProgress?.(100, 'Successfully processed all images!');
      options.onSuccess?.();
      setRetryCount(0);
      
      return result;
      
    } catch (error) {
      let recipeError: RecipeProcessingError;
      
      if (error instanceof RecipeProcessingError) {
        recipeError = error;
      } else {
        recipeError = RecipeProcessingError.fromUnknown(error, 'multiple-image-processing');
      }
      
      setError(recipeError);
      options.onError?.(recipeError);
      throw recipeError;
    } finally {
      setIsLoading(false);
    }
  }, [processFn, options, validateFiles]);

  const retry = useCallback(async () => {
    if (!selectedFiles || retryCount >= maxRetries) {
      throw new RecipeProcessingError({
        type: ErrorType.UNKNOWN_ERROR,
        message: 'Cannot retry: no files selected or max retries exceeded',
        userMessage: 'Cannot retry at this time.',
        actionable: 'Please try uploading the images again.',
        retryable: false
      });
    }

    setRetryCount(prev => prev + 1);
    return processFiles(selectedFiles, selectedProvider);
  }, [selectedFiles, selectedProvider, retryCount, maxRetries, processFiles]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setSelectedFiles(null);
    setSelectedProvider('openai');
    setRetryCount(0);
  }, []);

  const canRetry = selectedFiles !== null && error?.retryable && retryCount < maxRetries;

  return {
    processFiles,
    retry,
    reset,
    isLoading,
    error,
    canRetry,
    retryCount,
    maxRetries,
    selectedFiles
  };
} 