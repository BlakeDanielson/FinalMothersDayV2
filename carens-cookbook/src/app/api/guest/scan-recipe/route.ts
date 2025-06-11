import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { RecipeProcessingError, ErrorType, logError } from '@/lib/errors';
import { AIProvider, getProviderConfig } from '@/lib/ai-providers';
import { AI_MODELS, AI_SETTINGS, getBackendProviderFromUI, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';
import { validateFileSize, getFileSizeErrorMessage } from '@/lib/utils/file-size-validation';

export const maxDuration = 60; // 60 seconds timeout

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

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'];

const getImageSystemPrompt = (schemaString: string) => {
    const categoryGuidance = `Based on the overall nature of the recipe from the extracted content, determine and state a suitable meal category from this list: Chicken, Beef, Vegetable, Salad, Appetizer, Seafood, Thanksgiving, Lamb, Pork, Soup, Pasta, Dessert, Drinks, Sauces & Seasoning, Breakfast, Side Dish.`;

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

function validateFile(imageFile: File, provider: AIProvider = 'openai'): void {
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

  const config = getProviderConfig(provider);
  
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

  const errorObj = error as { status?: number; code?: string; message?: string };

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
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS * 2, 16000),
  });

  return chatCompletion.choices[0]?.message?.content;
}

// Fallback for Gemini, etc. - currently uses a compatible OpenAI model
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
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS * 2, 16000),
  });

  return chatCompletion.choices[0]?.message?.content;
}


export async function POST(req: NextRequest) {
  const requestId = Math.random().toString(36).substr(2, 9);
  const startTime = Date.now();
  
  console.log(`[${requestId}] 🚀 GUEST START: Recipe scan request initiated`);
  
  try {
    let formData: FormData;
    try {
      formData = await req.formData();
    } catch (error) {
      console.error(`[${requestId}] ❌ GUEST Failed to parse form data:`, error);
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
    
    let provider: AIProvider;
    let selectedModel: string;
    
    if (providerParam && ['openai-main', 'openai-mini', 'gemini-main', 'gemini-pro'].includes(providerParam)) {
      const uiProvider = providerParam as UIProvider;
      const backendProvider = getBackendProviderFromUI(uiProvider);
      provider = backendProvider as AIProvider;
      selectedModel = getModelFromUIProvider(uiProvider);
    } else {
      provider = (providerParam === 'gemini') ? 'gemini' : 'openai';
      selectedModel = provider === 'gemini' ? AI_MODELS.GEMINI_MAIN : AI_MODELS.OPENAI_MAIN;
    }
    
    validateFile(imageFile!, provider);

    const imageBuffer = await imageFile!.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');
    const imageMimeType = imageFile!.type || 'image/jpeg';
    const schemaString = JSON.stringify(scanRecipeZodSchema.shape);
    const systemPrompt = getImageSystemPrompt(schemaString);

    let responseContent: string | null = null;
    
    try {
      if (provider === 'openai') {
        responseContent = await processImageWithOpenAI(imageBase64, imageMimeType, systemPrompt, selectedModel);
      } else {
        responseContent = await processImageWithGPTMini(imageBase64, imageMimeType, systemPrompt);
      }
    } catch (error: unknown) {
        if (provider === 'openai') {
            handleOpenAIError(error);
        } else {
            handleOpenAIError(error); // Using same handler for now
        }
    }

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
        details: { responseContent }
      });
    }

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
      throw error; // Re-throw other errors
    }
    
    const endTime = Date.now();
    console.log(`[${requestId}] ✅ GUEST SUCCESS: Recipe "${validatedRecipeData.title}" scanned in ${(endTime - startTime) / 1000}s`);

    return NextResponse.json(validatedRecipeData, { status: 200 });

  } catch (error: unknown) {
    const recipeError = error instanceof RecipeProcessingError 
      ? error 
      : RecipeProcessingError.fromUnknown(error, 'guest-scan-recipe');

    logError(recipeError, {
        requestId: requestId,
        context: 'guest-scan-recipe'
    });
    
    return NextResponse.json(
      { 
        error: {
            message: recipeError.userMessage || 'An unexpected error occurred.',
            type: recipeError.type,
            actionable: recipeError.actionable
        } 
      }, 
      { status: recipeError.statusCode || 500 }
    );
  }
}
