import { useState, useCallback, useRef } from 'react';
import { RecipeProcessingError, ErrorType, getErrorDetails } from '@/lib/errors';
import { validateFileSize, getFileSizeErrorMessage } from '@/lib/utils/file-size-validation';

interface RetryableRequestOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  onProgress?: (progress: number, message: string) => void;
  onError?: (error: RecipeProcessingError) => void;
  onSuccess?: () => void;
}

interface RetryableRequestState {
  isLoading: boolean;
  error: RecipeProcessingError | null;
  retryCount: number;
  canRetry: boolean;
}

export function useRetryableRequest<T>(
  requestFn: () => Promise<T>,
  options: RetryableRequestOptions = {}
) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    onProgress,
    onError,
    onSuccess
  } = options;

  const [state, setState] = useState<RetryableRequestState>({
    isLoading: false,
    error: null,
    retryCount: 0,
    canRetry: false
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const calculateDelay = useCallback((attempt: number, suggestedDelay?: number): number => {
    if (suggestedDelay) {
      return Math.min(suggestedDelay, maxDelay);
    }
    
    // Exponential backoff with jitter
    const exponentialDelay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
    const jitter = Math.random() * 0.1 * exponentialDelay;
    return exponentialDelay + jitter;
  }, [baseDelay, maxDelay]);

  const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const executeRequest = useCallback(async (isRetry = false): Promise<T | null> => {
    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const currentAttempt = isRetry ? state.retryCount + 1 : 0;

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      retryCount: currentAttempt,
      canRetry: false
    }));

    try {
      onProgress?.(10, isRetry ? `Retrying request (attempt ${currentAttempt + 1})...` : 'Starting request...');
      
      const result = await requestFn();
      
      onProgress?.(100, 'Request completed successfully!');
      onSuccess?.();
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: null,
        canRetry: false
      }));

      return result;

    } catch (error: unknown) {
      const recipeError = RecipeProcessingError.fromUnknown(error, 'retryable-request');
      const { recovery } = getErrorDetails(recipeError.type);
      const shouldRetry = recovery.canRetry && currentAttempt < maxRetries;

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: recipeError,
        canRetry: shouldRetry
      }));

      onError?.(recipeError);

      // If we can retry and haven't exceeded max retries, schedule a retry
      if (shouldRetry) {
        const delay = calculateDelay(currentAttempt, recovery.suggestedDelay);
        
        onProgress?.(0, `Will retry in ${Math.round(delay / 1000)} seconds...`);
        
        // Wait for the delay unless aborted
        try {
          await sleep(delay);
          
          // Check if we were aborted during the delay
          if (abortControllerRef.current?.signal.aborted) {
            return null;
          }
          
          // Recursively retry
          return executeRequest(true);
        } catch {
          // Request was aborted
          return null;
        }
      }

      return null;
    }
  }, [requestFn, state.retryCount, maxRetries, onProgress, onError, onSuccess, calculateDelay]);

  const retry = useCallback(async (): Promise<T | null> => {
    if (!state.canRetry) {
      return null;
    }
    return executeRequest(true);
  }, [executeRequest, state.canRetry]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setState(prev => ({
      ...prev,
      isLoading: false,
      canRetry: false
    }));
  }, []);

  const reset = useCallback(() => {
    cancel();
    setState({
      isLoading: false,
      error: null,
      retryCount: 0,
      canRetry: false
    });
  }, [cancel]);

  return {
    ...state,
    execute: executeRequest,
    retry,
    cancel,
    reset
  };
}

// Specialized hook for image processing with specific defaults
export function useImageProcessing(
  processFn: (file: File, provider?: string) => Promise<unknown>,
  options: Omit<RetryableRequestOptions, 'maxRetries'> & { maxRetries?: number } = {}
) {
  const [lastProcessedFile, setLastProcessedFile] = useState<File | null>(null);
  const [lastUsedProvider, setLastUsedProvider] = useState<string>('openai');

  // Create a function that validates and processes the file
  const validateAndProcessFile = useCallback(async (file: File, provider: string) => {
    // File size validation with conversion awareness
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const sizeValidation = validateFileSize(file, MAX_FILE_SIZE);
    if (!sizeValidation.isValid) {
      throw new RecipeProcessingError({
        type: ErrorType.FILE_TOO_LARGE,
        message: `File size ${file.size} exceeds maximum ${sizeValidation.effectiveLimit}`,
        userMessage: getFileSizeErrorMessage(file, MAX_FILE_SIZE),
        actionable: sizeValidation.willBeConverted 
          ? `Large ${sizeValidation.conversionType?.split(' to ')[0]} files are allowed (up to ${Math.round(sizeValidation.effectiveLimit / (1024 * 1024))}MB) and will be auto-converted.`
          : 'Please use a smaller image file.',
        retryable: false
      });
    }

    // File format validation
    const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];
    const isValidFormat = supportedFormats.some(format => 
      file.type === format || file.name.toLowerCase().endsWith(format.split('/')[1])
    );
    
    if (!isValidFormat) {
      throw new RecipeProcessingError({
        type: ErrorType.FILE_FORMAT_UNSUPPORTED,
        message: `Unsupported file format: ${file.type}`,
        userMessage: 'This image format is not supported.',
        actionable: 'Please use JPG, PNG, or HEIC format.',
        retryable: false
      });
    }

    return processFn(file, provider);
  }, [processFn]);

  // Create a retry function that reuses the last file and provider
  const retryFn = useCallback(async () => {
    if (!lastProcessedFile) {
      throw new RecipeProcessingError({
        type: ErrorType.INVALID_RECIPE_DATA,
        message: 'No file available for retry',
        userMessage: 'Please select an image file.',
        actionable: 'Choose an image file to process.',
        retryable: false
      });
    }
    return validateAndProcessFile(lastProcessedFile, lastUsedProvider);
  }, [validateAndProcessFile, lastProcessedFile, lastUsedProvider]);

  const retryableRequest = useRetryableRequest(retryFn, {
    maxRetries: 2, // Lower retry count for image processing
    baseDelay: 2000, // Longer base delay for AI processing
    ...options
  });

  const processFile = useCallback(async (file: File, provider: string = 'openai') => {
    // Store the file and provider for potential retries
    setLastProcessedFile(file);
    setLastUsedProvider(provider);
    
    // Process directly to avoid state dependency timing issues
    try {
      return await validateAndProcessFile(file, provider);
    } catch (error) {
      // Store for retry and rethrow
      throw error;
    }
  }, [validateAndProcessFile]);

  const retry = useCallback(async () => {
    if (!lastProcessedFile) {
      throw new RecipeProcessingError({
        type: ErrorType.INVALID_RECIPE_DATA,
        message: 'No file available for retry',
        userMessage: 'Please select an image file.',
        actionable: 'Choose an image file to process.',
        retryable: false
      });
    }
    return retryableRequest.execute();
  }, [retryableRequest, lastProcessedFile]);

  return {
    isLoading: retryableRequest.isLoading,
    error: retryableRequest.error,
    retryCount: retryableRequest.retryCount,
    canRetry: retryableRequest.canRetry && !!lastProcessedFile,
    processFile,
    retry,
    cancel: retryableRequest.cancel,
    reset: retryableRequest.reset,
    selectedFile: lastProcessedFile
  };
} 