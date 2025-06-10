import { type AIProvider } from './config/ui-models';
import { RecipeProcessingError, ErrorType } from './errors';

export interface ProcessImageResponse {
  recipe: {
    title: string;
    ingredients: string[];
    steps: string[];
    description?: string;
    cuisine?: string;
    category?: string;
    prepTime?: string;
    cleanupTime?: string;
  };
}

export interface ProcessMultipleImagesResponse {
  recipes: Array<{
    title: string;
    ingredients: string[];
    steps: string[];
    description?: string;
    cuisine?: string;
    category?: string;
    prepTime?: string;
    cleanupTime?: string;
  }>;
}

export async function processSingleImage(
  file: File, 
  provider: AIProvider = 'openai-main'
): Promise<ProcessImageResponse> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('provider', provider);

  const response = await fetch('/api/scan-recipe', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new RecipeProcessingError({
      type: ErrorType.AI_PROCESSING_FAILED,
      message: `API request failed: ${response.status}`,
      userMessage: errorData.userMessage || 'Failed to process the image.',
      actionable: errorData.actionable || 'Please try again.',
      retryable: response.status >= 500,
      statusCode: response.status,
      details: errorData
    });
  }

  return response.json();
}

export async function processMultipleImages(
  files: File[], 
  provider: AIProvider = 'openai-main'
): Promise<ProcessMultipleImagesResponse> {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`image${index}`, file);
  });
  formData.append('provider', provider);

  const response = await fetch('/api/scan-recipe-multiple', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new RecipeProcessingError({
      type: ErrorType.AI_PROCESSING_FAILED,
      message: `API request failed: ${response.status}`,
      userMessage: errorData.userMessage || 'Failed to process the images.',
      actionable: errorData.actionable || 'Please try again.',
      retryable: response.status >= 500,
      statusCode: response.status,
      details: errorData
    });
  }

  return response.json();
} 