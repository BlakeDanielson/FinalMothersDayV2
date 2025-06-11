import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { RecipeProcessingError, ErrorType, logError } from '@/lib/errors';
import { AIProvider, getProviderConfig } from '@/lib/ai-providers';
import { categoryService, categoryResolver } from '@/lib/categories';
import { auth } from '@clerk/nextjs/server';
import { CategorySource } from '@/generated/prisma';
import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';
import { AI_MODELS, AI_SETTINGS, getBackendProviderFromUI, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';
import { validateFileSize, getFileSizeErrorMessage } from '@/lib/utils/file-size-validation';

// Zod schema for recipe data parsed from an image
const scanRecipeZodSchema = z.object({
  title: z.string().min(1, "Title is required and must be extracted from the image."),
  ingredients: z.array(z.string()).min(1, "Ingredients are required and must be extracted from the image."),
  steps: z.array(z.string()).min(1, "Steps are required and must be extracted from the image."),
  image: z.string().url("Image URL must be valid if present").nullable(),
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

// Initialize Google AI client


// File validation constants
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'];

const getImageSystemPrompt = (schemaString: string, userCategories: string[] = []) => {
  const categoryGuidance = userCategories.length > 0 
    ? `Based on the overall nature of the recipe from the extracted content, determine and state a suitable meal category. The user has these existing categories: [${userCategories.join(', ')}]. Please assign to one of these if appropriate, or suggest a new category that best fits the recipe. If none of the existing categories are suitable, choose from these standard categories: Chicken, Beef, Vegetable, Salad, Appetizer, Seafood, Thanksgiving, Lamb, Pork, Soup, Pasta, Dessert, Drinks, Sauces & Seasoning, Breakfast, Side Dish.`
    : `Based on the overall nature of the recipe from the extracted content, determine and state a suitable meal category from this list: Chicken, Beef, Vegetable, Salad, Appetizer, Seafood, Thanksgiving, Lamb, Pork, Soup, Pasta, Dessert, Drinks, Sauces & Seasoning, Breakfast, Side Dish.`;

  return `You are an expert recipe analysis assistant specializing in interpreting images of recipes (e.g., photos of cookbook pages, recipe cards, or handwritten notes). Your task is to extract detailed recipe information directly from the provided image and then generate supplementary details.

**Stage 1: Content Extraction from Image**
Carefully analyze the provided image. From the visual content of the image, you are REQUIRED to extract:
*   \`title\`: The main title of the recipe as visible in the image.
*   \`ingredients\`: A comprehensive array of strings, where each string is a single ingredient (e.g., "1 cup flour", "2 tbsp olive oil"). Capture all listed ingredients visible in the image.
*   \`steps\`: An array of strings, where each string is a distinct preparation or cooking step. Capture all listed steps in order as visible in the image.
*   \`image\`: This field should always be \`null\` for recipes parsed from an image input, as you are processing the image itself.

These fields (\`title\`, \`ingredients\`, \`steps\`, and setting \`image\` to \`null\`) MUST be derived from the visual information in the image. Do not invent or infer them if they are not visually present.

**Stage 2: AI-Powered Content Generation**
Once you have successfully extracted the \`title\`, \`ingredients\`, and \`steps\` from the image, you will then use THIS EXTRACTED INFORMATION to intelligently generate and provide plausible values for the following fields. These generated fields should be contextually relevant to the extracted recipe content:
*   \`description\`: Based on the extracted \`title\`, \`ingredients\`, and \`steps\`, write a concise and appealing summary of the recipe (typically 1-3 sentences).
*   \`cuisine\`: Based on the extracted \`ingredients\` and cooking \`steps\`, determine and state the most appropriate primary cuisine type (e.g., "Italian", "Mexican", "Indian", "American Comfort Food", "Mediterranean").
*   \`category\`: ${categoryGuidance}
*   \`prepTime\`: Based on the extracted \`ingredients\` (e.g., amount of chopping) and \`steps\`, estimate the active preparation time required before cooking begins. Provide a string like "Approx. X minutes" or "X hours Y minutes".
*   \`cleanupTime\`: Based on the extracted \`ingredients\` and cooking \`steps\` (e.g., number of bowls/pans used), estimate the time needed for cleanup after cooking. Provide a string like "Approx. X minutes".

**Output Requirements:**
You MUST return a single JSON object. This object must contain all nine fields: \`title\`, \`ingredients\`, \`steps\`, \`image\` (as null), \`description\`, \`cuisine\`, \`category\`, \`prepTime\`, and \`cleanupTime\`.
Adherence to the following JSON schema structure is MANDATORY. All fields (except for \`image\`, which must be \`null\`) must be present and populated:
${schemaString}

**Important:** If the image does not contain a clear, readable recipe with visible ingredients and steps, you must return an empty object {} to indicate that no recipe was detected.
`;
};

// Provider-specific validation function
function validateFile(imageFile: File, provider: AIProvider = 'openai'): void {
  // Check if file exists
  if (!imageFile) {
    throw new RecipeProcessingError({
      type: ErrorType.INVALID_RECIPE_DATA,
      message: 'No image file provided in request',
      userMessage: 'No image file was uploaded.',
      actionable: 'Please select an image file to scan.',
      retryable: false,
      statusCode: 400
    });
  }

  // Use provider-specific validation
  const config = getProviderConfig(provider);
  
  // Check file size with conversion awareness
  const sizeValidation = validateFileSize(imageFile, config.maxFileSize);
  if (!sizeValidation.isValid) {
    throw new RecipeProcessingError({
      type: ErrorType.FILE_TOO_LARGE,
      message: `File size ${imageFile.size} exceeds maximum ${sizeValidation.effectiveLimit}`,
      userMessage: getFileSizeErrorMessage(imageFile, config.maxFileSize),
      actionable: sizeValidation.willBeConverted 
        ? `Large ${sizeValidation.conversionType?.split(' to ')[0]} files are allowed (up to ${Math.round(sizeValidation.effectiveLimit / (1024 * 1024))}MB) and will be auto-converted.`
        : `Please use an image smaller than ${Math.round(config.maxFileSize / (1024 * 1024))}MB.`,
      retryable: false,
      statusCode: 413,
      details: { fileSize: imageFile.size, maxSize: sizeValidation.effectiveLimit, provider }
    });
  }

  // Check file format
  const fileName = imageFile.name.toLowerCase();
  const mimeType = imageFile.type.toLowerCase();
  
  const isValidMimeType = (config.supportedFormats as readonly string[]).includes(mimeType);
  const isValidExtension = SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext));
  
  if (!isValidMimeType && !isValidExtension) {
    const formatList = config.supportedFormats.map(fmt => fmt.replace('image/', '')).join(', ').toUpperCase();
    throw new RecipeProcessingError({
      type: ErrorType.FILE_FORMAT_UNSUPPORTED,
      message: `Unsupported file format: ${mimeType} (${fileName}) for ${config.name}`,
      userMessage: `This image format is not supported by ${config.name}.`,
      actionable: `Please use ${formatList} format.`,
      retryable: false,
      statusCode: 400,
      details: { fileName, mimeType, supportedFormats: config.supportedFormats, provider }
    });
  }

  // Check for empty file
  if (imageFile.size === 0) {
    throw new RecipeProcessingError({
      type: ErrorType.FILE_CORRUPTED,
      message: 'Image file is empty',
      userMessage: 'The image file appears to be corrupted or empty.',
      actionable: 'Please try uploading a different image.',
      retryable: false,
      statusCode: 400
    });
  }
}

function handleOpenAIError(error: unknown): never {
  console.error('OpenAI API Error:', error);

  // Type guard for error objects with common properties
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
      actionable: 'Please try a different image.',
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
      actionable: 'Please try again with a clearer or smaller image.',
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



async function processImageWithOpenAI(imageBase64: string, imageMimeType: string, systemPrompt: string, model: string = AI_MODELS.OPENAI_MAIN) {
  const chatCompletion = await openaiClient.chat.completions.create({
    model: model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: `data:${imageMimeType};base64,${imageBase64}`,
              detail: "high",
            },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS * 2, 16000), // Double for image processing, but cap at model limit
  });

  return chatCompletion.choices[0]?.message?.content;
}

async function processImageWithGPTMini(imageBase64: string, imageMimeType: string, systemPrompt: string) {
  const chatCompletion = await openaiClient.chat.completions.create({
    model: AI_MODELS.OPENAI_MINI,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: systemPrompt },
          {
            type: "image_url",
            image_url: {
              url: `data:${imageMimeType};base64,${imageBase64}`,
              detail: "high",
            },
          },
        ],
      },
    ],
    response_format: { type: "json_object" },
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS * 2, 16000), // Double for image processing, but cap at model limit
  });

  return chatCompletion.choices[0]?.message?.content;
}

export const POST = withOnboardingGuard(async (req: NextRequest) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  const startTime = Date.now();
  
  // Enhanced debugging - capture request details
  console.log(`[${requestId}] 🚀 START: Recipe scan request initiated`);
  console.log(`[${requestId}] 📱 User-Agent: ${req.headers.get('user-agent')}`);
  console.log(`[${requestId}] 🌐 Origin: ${req.headers.get('origin')}`);
  console.log(`[${requestId}] 📊 Content-Length: ${req.headers.get('content-length')}`);
  console.log(`[${requestId}] 🔧 Content-Type: ${req.headers.get('content-type')}`);
  
  try {
    // Get user context for category suggestions
    let userId: string | null = null;
    let userCategories: string[] = [];
    
    try {
      const { userId: authUserId } = await auth();
      userId = authUserId;
      console.log(`[${requestId}] 👤 User ID: ${userId || 'anonymous'}`);
      
      if (userId) {
        // Get user's existing categories for AI prompt
        userCategories = await categoryResolver.getAIPromptCategories(userId);
        console.log(`[${requestId}] 📂 User categories count: ${userCategories.length}`);
      }
    } catch (error) {
      console.warn(`[${requestId}] ⚠️ Could not get user context:`, error);
      // Continue without user context - will use default categories
    }

    // Parse form data
    let formData: FormData;
    try {
      console.log(`[${requestId}] 📦 Parsing form data...`);
      formData = await req.formData();
      console.log(`[${requestId}] ✅ Form data parsed successfully`);
    } catch (error) {
      console.error(`[${requestId}] ❌ Failed to parse form data:`, error);
      throw new RecipeProcessingError({
        type: ErrorType.INVALID_RECIPE_DATA,
        message: 'Failed to parse form data',
        userMessage: 'There was an issue with the uploaded data.',
        actionable: 'Please try uploading the image again.',
        retryable: true,
        statusCode: 400,
        details: { parseError: error }
      });
    }

    const imageFile = formData.get('image') as File | null;
    const providerParam = formData.get('provider') as string | null;
    
    // Handle new UI provider system - fallback to old system for backward compatibility
    let provider: AIProvider;
    let selectedModel: string;
    
    if (providerParam && ['openai-main', 'openai-mini', 'gemini-main', 'gemini-pro'].includes(providerParam)) {
      // New UI provider system
      const uiProvider = providerParam as UIProvider;
      const backendProvider = getBackendProviderFromUI(uiProvider);
      provider = backendProvider as AIProvider; // Cast since we know it's either 'openai' or 'gemini'
      selectedModel = getModelFromUIProvider(uiProvider);
    } else {
      // Fallback to old system
      provider = (providerParam === 'gemini') ? 'gemini' : 'openai';
      selectedModel = provider === 'gemini' ? AI_MODELS.GEMINI_MAIN : AI_MODELS.OPENAI_MAIN;
    }
    
    // Enhanced file debugging
    if (imageFile) {
      console.log(`[${requestId}] 🖼️ File received:`);
      console.log(`[${requestId}]   📝 Name: ${imageFile.name}`);
      console.log(`[${requestId}]   📏 Size: ${imageFile.size} bytes (${(imageFile.size / 1024 / 1024).toFixed(2)} MB)`);
      console.log(`[${requestId}]   🎭 Type: ${imageFile.type}`);
      console.log(`[${requestId}]   ⏰ Last Modified: ${new Date(imageFile.lastModified).toISOString()}`);
      console.log(`[${requestId}] 🤖 Provider: ${provider}`);
    } else {
      console.error(`[${requestId}] ❌ No image file found in form data`);
    }

    // Check API key configuration for the selected provider
    if (provider === 'openai' && !process.env.OPENAI_API_KEY) {
      throw new RecipeProcessingError({
        type: ErrorType.SERVER_ERROR,
        message: 'OpenAI API key not configured',
        userMessage: 'OpenAI service is not properly configured.',
        actionable: 'Please try using Gemini or contact support.',
        retryable: false,
        statusCode: 500
      });
    }

    if (provider === 'gemini' && !process.env.GOOGLE_API_KEY) {
      throw new RecipeProcessingError({
        type: ErrorType.SERVER_ERROR,
        message: 'Google API key not configured',
        userMessage: 'Gemini service is not properly configured.',
        actionable: 'Please try using OpenAI or contact support.',
        retryable: false,
        statusCode: 500
      });
    }
    
    // Validate the uploaded file with provider-specific limits
    console.log(`[${requestId}] 🔍 Validating file for ${provider}...`);
    try {
      validateFile(imageFile!, provider);
      console.log(`[${requestId}] ✅ File validation passed`);
    } catch (error) {
      console.error(`[${requestId}] ❌ File validation failed:`, error);
      throw error;
    }

    // Convert image file to base64
    let imageBuffer: ArrayBuffer;
    let imageBase64: string;
    
    try {
      console.log(`[${requestId}] 🔄 Converting to ArrayBuffer...`);
      const bufferStart = Date.now();
      imageBuffer = await imageFile!.arrayBuffer();
      const bufferTime = Date.now() - bufferStart;
      console.log(`[${requestId}] ✅ ArrayBuffer conversion completed in ${bufferTime}ms`);
      
      console.log(`[${requestId}] 🔄 Converting to base64...`);
      const base64Start = Date.now();
      imageBase64 = Buffer.from(imageBuffer).toString('base64');
      const base64Time = Date.now() - base64Start;
      console.log(`[${requestId}] ✅ Base64 conversion completed in ${base64Time}ms (${Math.round(imageBase64.length / 1024)}KB)`);
    } catch (error) {
      console.error(`[${requestId}] ❌ Failed to process image file:`, error);
      throw new RecipeProcessingError({
        type: ErrorType.FILE_CORRUPTED,
        message: 'Failed to process image file',
        userMessage: 'The image file appears to be corrupted.',
        actionable: 'Please try uploading a different image.',
        retryable: false,
        statusCode: 400,
        details: { processingError: error }
      });
    }

    const imageMimeType = imageFile!.type || 'image/jpeg';
    const schemaString = JSON.stringify(scanRecipeZodSchema.shape);
    const systemPrompt = getImageSystemPrompt(schemaString, userCategories);

    console.log(`[${requestId}] 🎯 Preparing AI processing...`);
    console.log(`[${requestId}]   🎭 MIME Type: ${imageMimeType}`);
    console.log(`[${requestId}]   📏 System prompt length: ${systemPrompt.length} chars`);

    // Process image with selected AI provider
    let responseContent: string | null = null;
    
    try {
      console.log(`[${requestId}] 🤖 Starting ${provider.toUpperCase()} processing...`);
      const aiStart = Date.now();
      
      if (provider === 'openai') {
        responseContent = await processImageWithOpenAI(imageBase64, imageMimeType, systemPrompt, selectedModel);
      } else {
        // For Gemini, we'll need to implement the Gemini processing with the specific model
        responseContent = await processImageWithGPTMini(imageBase64, imageMimeType, systemPrompt);
      }
      
      const aiTime = Date.now() - aiStart;
      console.log(`[${requestId}] ✅ ${provider.toUpperCase()} processing completed in ${aiTime}ms`);
      console.log(`[${requestId}] 📤 Response length: ${responseContent?.length || 0} chars`);
    } catch (error: unknown) {
      console.error(`[${requestId}] ❌ ${provider.toUpperCase()} processing failed:`, error);
      if (provider === 'openai') {
        handleOpenAIError(error);
      } else {
        handleOpenAIError(error);
      }
    }

    // Validate AI response
    if (!responseContent) {
      const providerName = getProviderConfig(provider).name;
      throw new RecipeProcessingError({
        type: ErrorType.AI_PROCESSING_FAILED,
        message: `${providerName} returned empty response`,
        userMessage: 'The AI couldn\'t process your image.',
        actionable: 'Please try again with a clearer image.',
        retryable: true,
        statusCode: 502
      });
    }

    // Parse and validate the JSON response
    let parsedJson: unknown;
    try {
      console.log(`[${requestId}] 🔍 Parsing JSON response...`);
      parsedJson = JSON.parse(responseContent);
      console.log(`[${requestId}] ✅ JSON parsed successfully`);
      console.log(`[${requestId}] 📋 Response keys: ${Object.keys(parsedJson || {}).join(', ')}`);
    } catch (parseError) {
      console.error(`[${requestId}] ❌ JSON parse failed:`, parseError);
      console.error(`[${requestId}] 📄 Raw response content:`, responseContent?.substring(0, 500));
      const providerName = getProviderConfig(provider).name;
      throw new RecipeProcessingError({
        type: ErrorType.AI_PROCESSING_FAILED,
        message: `${providerName} returned invalid JSON`,
        userMessage: 'The AI response was malformed.',
        actionable: 'Please try again.',
        retryable: true,
        statusCode: 502,
        details: { responseContent }
      });
    }

    // Check if AI detected no recipe (empty object response)
    if (typeof parsedJson === 'object' && parsedJson !== null && Object.keys(parsedJson).length === 0) {
      throw new RecipeProcessingError({
        type: ErrorType.RECIPE_NOT_DETECTED,
        message: 'No recipe detected in image',
        userMessage: 'We couldn\'t find a clear recipe in this image.',
        actionable: 'Make sure the recipe text is clearly visible and well-lit.',
        retryable: true,
        statusCode: 422,
        details: { aiResponse: parsedJson }
      });
    }

    // Validate against our schema
    let validatedRecipeData: z.infer<typeof scanRecipeZodSchema>;
    try {
      validatedRecipeData = scanRecipeZodSchema.parse(parsedJson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new RecipeProcessingError({
          type: ErrorType.MISSING_REQUIRED_FIELDS,
          message: 'Recipe validation failed',
          userMessage: 'The extracted recipe is incomplete.',
          actionable: 'Try taking a clearer photo that shows all recipe details.',
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

    // Apply intelligent category resolution and track metadata
    const categoryMetadata: {
      categorySource: CategorySource;
      categoryConfidence: number;
      originalCategory: string | null;
    } = {
      categorySource: CategorySource.AI_GENERATED,
      categoryConfidence: 0.8, // Default confidence for AI suggestions
      originalCategory: null
    };

    try {
      const originalCategory = validatedRecipeData.category;
      const categoryAnalysis = await categoryService.findBestCategory(
        validatedRecipeData.category,
        userId || undefined,
        { allowNewCategories: true, preferUserCategories: true }
      );
      
      // Use the resolved category with highest confidence
      if (categoryAnalysis.bestMatch) {
        const previousCategory = validatedRecipeData.category;
        validatedRecipeData.category = categoryAnalysis.bestMatch.category;
        
        // Update metadata based on resolution
        categoryMetadata.categorySource = CategorySource.PREDEFINED;
        categoryMetadata.categoryConfidence = categoryAnalysis.bestMatch.confidence;
        categoryMetadata.originalCategory = previousCategory !== categoryAnalysis.bestMatch.category ? previousCategory : null;
        
        // Log category resolution for debugging
        const matchType = categoryAnalysis.bestMatch.isExact ? 'exact' : 
                         categoryAnalysis.bestMatch.isFuzzy ? 'fuzzy' : 
                         categoryAnalysis.bestMatch.isSemantic ? 'semantic' : 'unknown';
        console.log(`Category resolved: "${originalCategory}" -> "${categoryAnalysis.bestMatch.category}" (${categoryAnalysis.bestMatch.confidence.toFixed(2)} confidence, ${matchType} match)`);
      } else if (categoryAnalysis.shouldCreateNew) {
        // Keep the original category if we should create a new one
        categoryMetadata.categorySource = CategorySource.USER_CREATED;
        categoryMetadata.categoryConfidence = 0.9; // High confidence for new categories
        categoryMetadata.originalCategory = null; // No resolution needed
        console.log(`Creating new category: "${originalCategory}"`);
      } else {
        // Fallback to 'Uncategorized' if no good match found and shouldn't create new
        console.warn(`No good category match found for "${originalCategory}", using fallback`);
        categoryMetadata.originalCategory = originalCategory;
        validatedRecipeData.category = 'Uncategorized';
        categoryMetadata.categorySource = CategorySource.PREDEFINED;
        categoryMetadata.categoryConfidence = 0.5; // Low confidence for fallback
      }
    } catch (error) {
      console.error('Category resolution failed:', error);
      // Continue with original category if resolution fails
      categoryMetadata.categorySource = CategorySource.AI_GENERATED;
      categoryMetadata.categoryConfidence = 0.7; // Lower confidence due to resolution failure
      categoryMetadata.originalCategory = null;
      console.log(`Using original AI-suggested category: "${validatedRecipeData.category}"`);
    }

    // Add metadata to response for potential database storage
    const responseData = {
      ...validatedRecipeData,
      // Include metadata for client-side database operations
      _categoryMetadata: categoryMetadata
    };

    const totalTime = Date.now() - startTime;
    console.log(`[${requestId}] 🎉 SUCCESS: Recipe scan completed in ${totalTime}ms`);
    console.log(`[${requestId}] 📋 Final recipe title: "${validatedRecipeData.title}"`);
    console.log(`[${requestId}] 📂 Final category: "${validatedRecipeData.category}"`);
    console.log(`[${requestId}] 🥗 Ingredients count: ${validatedRecipeData.ingredients.length}`);
    console.log(`[${requestId}] 👩‍🍳 Steps count: ${validatedRecipeData.steps.length}`);

    return NextResponse.json(responseData, { status: 200 });

  } catch (error: unknown) {
    const totalTime = Date.now() - startTime;
    console.error(`[${requestId}] 💥 FAILED: Recipe scan failed after ${totalTime}ms`);
    console.error(`[${requestId}] ❌ Error details:`, error);
    
    let recipeError: RecipeProcessingError;
    
    if (error instanceof RecipeProcessingError) {
      recipeError = error;
      console.error(`[${requestId}] 🏷️ Error type: ${recipeError.type}`);
      console.error(`[${requestId}] 💬 User message: ${recipeError.userMessage}`);
      console.error(`[${requestId}] 🔧 Actionable: ${recipeError.actionable}`);
    } else {
      recipeError = RecipeProcessingError.fromUnknown(error, 'scan-recipe-api');
      console.error(`[${requestId}] 🔄 Converted unknown error to RecipeProcessingError`);
    }

    // Log the error for debugging
    logError(recipeError, {
      endpoint: '/api/scan-recipe',
      userAgent: req.headers.get('user-agent'),
      timestamp: new Date().toISOString(),
      requestId
    });

    console.log(`[${requestId}] 📤 Returning error response with status ${recipeError.statusCode}`);

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
}); 