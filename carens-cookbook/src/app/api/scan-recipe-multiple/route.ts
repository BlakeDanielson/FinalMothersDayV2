import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { ChatCompletionContentPart } from 'openai/resources/chat/completions';
import { z } from 'zod';
import { RecipeProcessingError, ErrorType, logError } from '@/lib/errors';
import { AIProvider, getProviderConfig } from '@/lib/ai-providers';
import { AI_MODELS, AI_SETTINGS, getBackendProviderFromUI, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';
import { validateFileSize, getFileSizeErrorMessage } from '@/lib/utils/file-size-validation';

// Zod schema for recipe data parsed from multiple images
const scanMultipleRecipeZodSchema = z.object({
  title: z.string().min(1, "Title is required and must be extracted from the images."),
  ingredients: z.array(z.string()).min(1, "Ingredients are required and must be extracted from the images."),
  steps: z.array(z.string()).min(1, "Steps are required and must be extracted from the images."),
  images: z.array(z.string().url("Image URL must be valid")).min(1, "At least one image is required."),
  description: z.string().min(1, "Description is required and should be AI-generated based on image content."),
  cuisine: z.string().min(1, "Cuisine is required and should be AI-generated based on image content."),
  category: z.string().min(1, "Category is required and should be AI-generated based on image content."),
  prepTime: z.string().min(1, "Prep time is required and should be AI-generated based on image content."),
  cleanupTime: z.string().min(1, "Cleanup time is required and should be AI-generated based on image content."),
});

// Initialize AI clients
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



// File validation constants
const MAX_FILES = 5; // Maximum 5 images per recipe
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'];

const getMultipleImageSystemPrompt = (schemaString: string) => `You are an expert recipe analysis assistant specializing in interpreting multiple images of recipes. You will receive several photos that together show a complete recipe (e.g., photos of different pages of a cookbook, recipe cards, or handwritten notes). Your task is to extract detailed recipe information from ALL provided images and consolidate them into a single comprehensive recipe.

**Stage 1: Content Extraction from All Images**
Carefully analyze ALL provided images. From the visual content across all images, you are REQUIRED to extract:
*   \`title\`: The main title of the recipe as visible in any of the images. If multiple titles appear, choose the most prominent or complete one.
*   \`ingredients\`: A comprehensive array of strings, where each string is a single ingredient (e.g., "1 cup flour", "2 tbsp olive oil"). Capture ALL ingredients visible across ALL images, avoiding duplicates.
*   \`steps\`: An array of strings, where each string is a distinct preparation or cooking step. Capture ALL steps in logical order as visible across ALL images.
*   \`images\`: This field should always contain the URLs of the processed images in the order they were provided.

These fields (\`title\`, \`ingredients\`, \`steps\`, and \`images\`) MUST be derived from the visual information across all images. Do not invent or infer them if they are not visually present.

**Stage 2: AI-Powered Content Generation**
Once you have successfully extracted the \`title\`, \`ingredients\`, and \`steps\` from the images, you will then use THIS EXTRACTED INFORMATION to intelligently generate and provide plausible values for the following fields. These generated fields should be contextually relevant to the extracted recipe content:
*   \`description\`: Based on the extracted \`title\`, \`ingredients\`, and \`steps\`, write a concise and appealing summary of the recipe (typically 1-3 sentences).
*   \`cuisine\`: Based on the extracted \`ingredients\` and cooking \`steps\`, determine and state the most appropriate primary cuisine type (e.g., "Italian", "Mexican", "Indian", "American Comfort Food", "Mediterranean").
*   \`category\`: Based on the overall nature of the recipe from the extracted content, determine and state a suitable meal category from this list: Chicken, Beef, Vegetables, Salad, Appetizer, Seafood, Thanksgiving, Lamb, Pork, Soup, Pasta, Dessert, Drinks, Sauces & Seasoning.
*   \`prepTime\`: Based on the extracted \`ingredients\` (e.g., amount of chopping) and \`steps\`, estimate the active preparation time required before cooking begins. Provide a string like "Approx. X minutes" or "X hours Y minutes".
*   \`cleanupTime\`: Based on the extracted \`ingredients\` and cooking \`steps\` (e.g., number of bowls/pans used), estimate the time needed for cleanup after cooking. Provide a string like "Approx. X minutes".

**Multi-Image Processing Guidelines:**
- If images show different parts of the same recipe (e.g., ingredients list on one page, steps on another), combine them logically
- If images contain overlapping information, consolidate and avoid duplicates
- Maintain the order of steps as they appear across the images
- If images seem to show different recipes, focus on the most complete or prominent one

**Output Requirements:**
You MUST return a single JSON object. This object must contain all fields: \`title\`, \`ingredients\`, \`steps\`, \`images\`, \`description\`, \`cuisine\`, \`category\`, \`prepTime\`, and \`cleanupTime\`.
Adherence to the following JSON schema structure is MANDATORY:
${schemaString}

**Important:** If the images do not contain a clear, readable recipe with visible ingredients and steps, you must return an empty object {} to indicate that no recipe was detected.
`;

function validateFiles(imageFiles: File[], provider: AIProvider = 'openai'): void {
  // Check if files exist
  if (!imageFiles || imageFiles.length === 0) {
    throw new RecipeProcessingError({
      type: ErrorType.INVALID_RECIPE_DATA,
      message: 'No image files provided in request',
      userMessage: 'No image files were uploaded.',
      actionable: 'Please select at least one image file to scan.',
      retryable: false,
      statusCode: 400
    });
  }

  // Check number of files
  if (imageFiles.length > MAX_FILES) {
    throw new RecipeProcessingError({
      type: ErrorType.INVALID_RECIPE_DATA,
      message: `Too many files: ${imageFiles.length} (max: ${MAX_FILES})`,
      userMessage: `You can upload a maximum of ${MAX_FILES} images at once.`,
      actionable: `Please select up to ${MAX_FILES} images.`,
      retryable: false,
      statusCode: 400,
      details: { fileCount: imageFiles.length, maxFiles: MAX_FILES }
    });
  }

  // Get provider-specific configuration
  const config = getProviderConfig(provider);

  // Validate each file
  imageFiles.forEach((file, index) => {
    if (!file) {
      throw new RecipeProcessingError({
        type: ErrorType.INVALID_RECIPE_DATA,
        message: `File at index ${index} is null or undefined`,
        userMessage: 'One of the uploaded files is invalid.',
        actionable: 'Please try uploading the images again.',
        retryable: false,
        statusCode: 400
      });
    }

    // Check file size with conversion awareness
    const sizeValidation = validateFileSize(file, config.maxFileSize);
    if (!sizeValidation.isValid) {
      throw new RecipeProcessingError({
        type: ErrorType.FILE_TOO_LARGE,
        message: `File "${file.name}" size ${file.size} exceeds maximum ${sizeValidation.effectiveLimit}`,
        userMessage: getFileSizeErrorMessage(file, config.maxFileSize),
        actionable: sizeValidation.willBeConverted 
          ? `Large ${sizeValidation.conversionType?.split(' to ')[0]} files are allowed (up to ${Math.round(sizeValidation.effectiveLimit / (1024 * 1024))}MB) and will be auto-converted.`
          : `Please use images smaller than ${Math.round(config.maxFileSize / (1024 * 1024))}MB each.`,
        retryable: false,
        statusCode: 413,
        details: { fileName: file.name, fileSize: file.size, maxSize: sizeValidation.effectiveLimit, provider }
      });
    }

    // Check file format
    const fileName = file.name.toLowerCase();
    const mimeType = file.type.toLowerCase();
    
    const isValidMimeType = (config.supportedFormats as readonly string[]).includes(mimeType);
    const isValidExtension = SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext));
    
    if (!isValidMimeType && !isValidExtension) {
      const formatList = config.supportedFormats.map(fmt => fmt.replace('image/', '')).join(', ').toUpperCase();
      throw new RecipeProcessingError({
        type: ErrorType.FILE_FORMAT_UNSUPPORTED,
        message: `Unsupported file format: ${mimeType} (${fileName}) for ${config.name}`,
        userMessage: `The image "${file.name}" format is not supported by ${config.name}.`,
        actionable: `Please use ${formatList} format for all images.`,
        retryable: false,
        statusCode: 400,
        details: { fileName, mimeType, supportedFormats: config.supportedFormats, provider }
      });
    }

    // Check for empty file
    if (file.size === 0) {
      throw new RecipeProcessingError({
        type: ErrorType.FILE_CORRUPTED,
        message: `Image file "${file.name}" is empty`,
        userMessage: `The image "${file.name}" appears to be corrupted or empty.`,
        actionable: 'Please try uploading different images.',
        retryable: false,
        statusCode: 400
      });
    }
  });
}

function handleOpenAIError(error: unknown): never {
  console.error('OpenAI API Error:', error);

  const errorObj = error as { status?: number; code?: string; message?: string };

  // Rate limiting
  if (errorObj.status === 429 || errorObj.code === 'rate_limit_exceeded') {
    throw new RecipeProcessingError({
      type: ErrorType.AI_QUOTA_EXCEEDED,
      message: `OpenAI rate limit exceeded: ${errorObj.message}`,
      userMessage: 'We\'ve reached our processing limit for now.',
      actionable: 'Please try again in a few minutes.',
      retryable: true,
      statusCode: 429,
      details: { openaiError: error }
    });
  }

  // Content policy violations
  if (errorObj.code === 'content_policy_violation') {
    throw new RecipeProcessingError({
      type: ErrorType.AI_CONTENT_POLICY,
      message: `Content policy violation: ${errorObj.message}`,
      userMessage: 'The image content violates our processing policies.',
      actionable: 'Please try different images.',
      retryable: false,
      statusCode: 400,
      details: { openaiError: error }
    });
  }

  // Authentication errors
  if (errorObj.status === 401 || errorObj.code === 'invalid_api_key') {
    throw new RecipeProcessingError({
      type: ErrorType.SERVER_ERROR,
      message: `OpenAI authentication error: ${errorObj.message}`,
      userMessage: 'Our AI service is temporarily unavailable.',
      actionable: 'Please try again later.',
      retryable: true,
      statusCode: 503,
      details: { openaiError: error }
    });
  }

  // Timeout errors
  if (errorObj.code === 'timeout' || errorObj.message?.includes('timeout')) {
    throw new RecipeProcessingError({
      type: ErrorType.REQUEST_TIMEOUT,
      message: `OpenAI request timeout: ${errorObj.message}`,
      userMessage: 'The image processing took too long.',
      actionable: 'Please try again with clearer or smaller images.',
      retryable: true,
      statusCode: 408,
      details: { openaiError: error }
    });
  }

  // Generic OpenAI errors
  throw new RecipeProcessingError({
    type: ErrorType.AI_PROCESSING_FAILED,
    message: `OpenAI processing failed: ${errorObj.message || 'Unknown error'}`,
    userMessage: 'Our recipe analysis system encountered an issue.',
    actionable: 'Please try again in a moment.',
    retryable: true,
    statusCode: errorObj.status || 500,
    details: { openaiError: error }
  });
}



async function processMultipleImagesWithOpenAI(
  imageData: Array<{ base64: string; mimeType: string; fileName: string }>, 
  systemPrompt: string,
  model: string = AI_MODELS.OPENAI_MAIN
) {
  // Prepare content array for OpenAI with proper typing
  const content: ChatCompletionContentPart[] = [
    { type: "text", text: systemPrompt }
  ];

  // Add all images to the content
  imageData.forEach((img) => {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:${img.mimeType};base64,${img.base64}`,
        detail: "high",
      },
    });
  });

  const chatCompletion = await openaiClient.chat.completions.create({
    model: model,
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS * 3, 16000), // Triple for multiple images, but cap at model limit
  });

  return chatCompletion.choices[0]?.message?.content;
}

async function processMultipleImagesWithGPTMini(
  imageData: Array<{ base64: string; mimeType: string; fileName: string }>, 
  systemPrompt: string
) {
  // Prepare content array for OpenAI with proper typing
  const content: ChatCompletionContentPart[] = [
    { type: "text", text: systemPrompt }
  ];

  // Add all images to the content
  imageData.forEach((img) => {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:${img.mimeType};base64,${img.base64}`,
        detail: "high",
      },
    });
  });

  const chatCompletion = await openaiClient.chat.completions.create({
    model: AI_MODELS.OPENAI_MINI,
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS * 3, 16000), // Triple for multiple images, but cap at model limit
  });

  return chatCompletion.choices[0]?.message?.content;
}

export async function POST(req: NextRequest) {
  try {
    // Parse form data
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (error) {
      throw new RecipeProcessingError({
        type: ErrorType.INVALID_RECIPE_DATA,
        message: 'Failed to parse form data',
        userMessage: 'There was an issue with the uploaded data.',
        actionable: 'Please try uploading the images again.',
        retryable: true,
        statusCode: 400,
        details: { parseError: error }
      });
    }

    // Extract provider selection and image files from form data
    const providerParam = formData.get('provider') as string | null;
    
    // Handle new UI provider system - fallback to old system for backward compatibility
    let provider: AIProvider;
    let selectedModel: string;
    
    if (providerParam && ['openai-main', 'openai-mini', 'gemini-main', 'gemini-pro'].includes(providerParam)) {
      // New UI provider system
      const uiProvider = providerParam as UIProvider;
      const backendProvider = getBackendProviderFromUI(uiProvider);
      provider = backendProvider as AIProvider;
      selectedModel = getModelFromUIProvider(uiProvider);
    } else {
      // Fallback to old system
      provider = (providerParam === 'gemini') ? 'gemini' : 'openai';
      selectedModel = provider === 'gemini' ? AI_MODELS.GEMINI_MAIN : AI_MODELS.OPENAI_MAIN;
    }
    
    const imageFiles: File[] = [];
    const entries = Array.from(formData.entries());
    
    for (const [key, value] of entries) {
      if (key.startsWith('image') && value instanceof File) {
        imageFiles.push(value);
      }
    }

    // Check API key configuration for selected provider
    if (provider === 'openai' && !process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not set for image processing.');
      throw new RecipeProcessingError({
        type: ErrorType.SERVER_ERROR,
        message: 'OpenAI API key not configured',
        userMessage: 'Our AI service is not properly configured.',
        actionable: 'Please contact support.',
        retryable: false,
        statusCode: 500
      });
    }

    if (provider === 'gemini' && !process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY is not set for image processing.');
      throw new RecipeProcessingError({
        type: ErrorType.SERVER_ERROR,
        message: 'Google API key not configured',
        userMessage: 'Our AI service is not properly configured.',
        actionable: 'Please contact support.',
        retryable: false,
        statusCode: 500
      });
    }
    
    // Validate the uploaded files with provider-specific rules
    validateFiles(imageFiles, provider);

    // Convert all image files to base64
    const imageData: Array<{ base64: string; mimeType: string; fileName: string }> = [];
    
    for (const file of imageFiles) {
      try {
        const imageBuffer = await file.arrayBuffer();
        const imageBase64 = Buffer.from(imageBuffer).toString('base64');
        const imageMimeType = file.type || 'image/jpeg';
        
        imageData.push({
          base64: imageBase64,
          mimeType: imageMimeType,
          fileName: file.name
        });
      } catch (error) {
        throw new RecipeProcessingError({
          type: ErrorType.FILE_CORRUPTED,
          message: `Failed to process image file "${file.name}"`,
          userMessage: `The image "${file.name}" appears to be corrupted.`,
          actionable: 'Please try uploading different images.',
          retryable: false,
          statusCode: 400,
          details: { processingError: error, fileName: file.name }
        });
      }
    }

    const schemaString = JSON.stringify(scanMultipleRecipeZodSchema.shape);
    const systemPrompt = getMultipleImageSystemPrompt(schemaString);

    // Process images with selected AI provider
    let responseContent: string | null = null;
    
    try {
      if (provider === 'openai') {
        responseContent = await processMultipleImagesWithOpenAI(imageData, systemPrompt, selectedModel);
      } else if (provider === 'gemini') {
        responseContent = await processMultipleImagesWithGPTMini(imageData, systemPrompt);
      }
    } catch (error: unknown) {
              if (provider === 'openai') {
          handleOpenAIError(error);
        } else if (provider === 'gemini') {
          handleOpenAIError(error);
        } else {
        throw error;
      }
    }

    // Validate AI response
    if (!responseContent) {
      const providerName = getProviderConfig(provider).name;
      throw new RecipeProcessingError({
        type: ErrorType.AI_PROCESSING_FAILED,
        message: `${providerName} returned empty response`,
        userMessage: 'The AI couldn\'t process your images.',
        actionable: 'Please try again with clearer images.',
        retryable: true,
        statusCode: 502
      });
    }

    // Parse and validate the JSON response
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(responseContent);
    } catch {
      const providerName = getProviderConfig(provider).name;
      throw new RecipeProcessingError({
        type: ErrorType.AI_PROCESSING_FAILED,
        message: `${providerName} returned invalid JSON`,
        userMessage: 'The AI response was malformed.',
        actionable: 'Please try again.',
        retryable: true,
        statusCode: 502,
        details: { responseContent, provider }
      });
    }

    // Check if AI detected no recipe (empty object response)
    if (typeof parsedJson === 'object' && parsedJson !== null && Object.keys(parsedJson).length === 0) {
      throw new RecipeProcessingError({
        type: ErrorType.RECIPE_NOT_DETECTED,
        message: 'No recipe detected in images',
        userMessage: 'We couldn\'t find a clear recipe in these images.',
        actionable: 'Make sure the recipe text is clearly visible and well-lit in all images.',
        retryable: true,
        statusCode: 422,
        details: { aiResponse: parsedJson }
      });
    }

    // Add image URLs to the response (we'll use placeholder URLs for now)
    if (typeof parsedJson === 'object' && parsedJson !== null) {
      (parsedJson as Record<string, unknown>).images = imageFiles.map((file, index) => 
        `data:${imageData[index].mimeType};base64,${imageData[index].base64}`
      );
    }

    // Validate against our schema
    let validatedRecipeData: z.infer<typeof scanMultipleRecipeZodSchema>;
    try {
      validatedRecipeData = scanMultipleRecipeZodSchema.parse(parsedJson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new RecipeProcessingError({
          type: ErrorType.MISSING_REQUIRED_FIELDS,
          message: 'Recipe validation failed',
          userMessage: 'The extracted recipe is incomplete.',
          actionable: 'Try taking clearer photos that show all recipe details.',
          retryable: true,
          statusCode: 422,
          details: { 
            validationErrors: error.format(),
            aiResponse: parsedJson 
          }
        });
      }
      throw error;
    }

    return NextResponse.json(validatedRecipeData, { status: 200 });

  } catch (error: unknown) {
    let recipeError: RecipeProcessingError;
    
    if (error instanceof RecipeProcessingError) {
      recipeError = error;
    } else {
      recipeError = RecipeProcessingError.fromUnknown(error, 'scan-recipe-multiple-api');
    }

    // Log the error for debugging
    logError(recipeError, {
      endpoint: '/api/scan-recipe-multiple',
      userAgent: req.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        error: recipeError.userMessage,
        details: recipeError.actionable,
        type: recipeError.type,
        retryable: recipeError.retryable
      }, 
      { status: recipeError.statusCode || 500 }
    );
  }
} 