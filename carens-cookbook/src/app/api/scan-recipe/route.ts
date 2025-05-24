import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { RecipeProcessingError, ErrorType, logError } from '@/lib/errors';
import { AIProvider, getProviderConfig } from '@/lib/ai-providers';

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
let googleAI: GoogleGenerativeAI | null = null;
function getGoogleAI() {
  if (!googleAI) {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not set.');
    }
    googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }
  return googleAI;
}

// File validation constants
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'];

const getImageSystemPrompt = (schemaString: string) => `You are an expert recipe analysis assistant specializing in interpreting images of recipes (e.g., photos of cookbook pages, recipe cards, or handwritten notes). Your task is to extract detailed recipe information directly from the provided image and then generate supplementary details.

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
*   \`category\`: Based on the overall nature of the recipe from the extracted content, determine and state a suitable meal category from this list: Chicken, Beef, Vegetables, Salad, Appetizer, Seafood, Thanksgiving, Lamb, Pork, Soup, Pasta, Dessert, Drinks, Sauces & Seasoning.
*   \`prepTime\`: Based on the extracted \`ingredients\` (e.g., amount of chopping) and \`steps\`, estimate the active preparation time required before cooking begins. Provide a string like "Approx. X minutes" or "X hours Y minutes".
*   \`cleanupTime\`: Based on the extracted \`ingredients\` and cooking \`steps\` (e.g., number of bowls/pans used), estimate the time needed for cleanup after cooking. Provide a string like "Approx. X minutes".

**Output Requirements:**
You MUST return a single JSON object. This object must contain all nine fields: \`title\`, \`ingredients\`, \`steps\`, \`image\` (as null), \`description\`, \`cuisine\`, \`category\`, \`prepTime\`, and \`cleanupTime\`.
Adherence to the following JSON schema structure is MANDATORY. All fields (except for \`image\`, which must be \`null\`) must be present and populated:
${schemaString}

**Important:** If the image does not contain a clear, readable recipe with visible ingredients and steps, you must return an empty object {} to indicate that no recipe was detected.
`;

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
  
  // Check file size
  if (imageFile.size > config.maxFileSize) {
    throw new RecipeProcessingError({
      type: ErrorType.FILE_TOO_LARGE,
      message: `File size ${imageFile.size} exceeds maximum ${config.maxFileSize}`,
      userMessage: `The image file is too large for ${config.name}.`,
      actionable: `Please use an image smaller than ${Math.round(config.maxFileSize / (1024 * 1024))}MB.`,
      retryable: false,
      statusCode: 413,
      details: { fileSize: imageFile.size, maxSize: config.maxFileSize, provider }
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

function handleGeminiError(error: unknown): never {
  console.error('Gemini API Error:', error);

  // Type guard for error objects with common properties
  const errorObj = error as { status?: number; code?: string; message?: string; name?: string };

  // Rate limiting
  if (errorObj.status === 429 || errorObj.code === 'RATE_LIMIT_EXCEEDED' || errorObj.message?.includes('quota exceeded')) {
    throw new RecipeProcessingError({
      type: ErrorType.AI_QUOTA_EXCEEDED,
      message: `Gemini rate limit exceeded: ${errorObj.message}`,
      userMessage: 'We\'ve reached our processing limit for now.',
      actionable: 'Please try again in a few minutes.',
      retryable: true,
      statusCode: 429,
      details: { geminiError: error }
    });
  }

  // Content policy violations
  if (errorObj.code === 'SAFETY' || errorObj.message?.includes('safety') || errorObj.message?.includes('policy')) {
    throw new RecipeProcessingError({
      type: ErrorType.AI_CONTENT_POLICY,
      message: `Content policy violation: ${errorObj.message}`,
      userMessage: 'The image content violates our processing policies.',
      actionable: 'Please try a different image.',
      retryable: false,
      statusCode: 400,
      details: { geminiError: error }
    });
  }

  // Authentication errors
  if (errorObj.status === 401 || errorObj.status === 403 || errorObj.code === 'UNAUTHENTICATED' || errorObj.code === 'PERMISSION_DENIED') {
    throw new RecipeProcessingError({
      type: ErrorType.SERVER_ERROR,
      message: `Gemini authentication error: ${errorObj.message}`,
      userMessage: 'Our AI service is temporarily unavailable.',
      actionable: 'Please try again later.',
      retryable: true,
      statusCode: 503,
      details: { geminiError: error }
    });
  }

  // Timeout errors
  if (errorObj.code === 'DEADLINE_EXCEEDED' || errorObj.message?.includes('timeout') || errorObj.message?.includes('deadline')) {
    throw new RecipeProcessingError({
      type: ErrorType.REQUEST_TIMEOUT,
      message: `Gemini request timeout: ${errorObj.message}`,
      userMessage: 'The image processing took too long.',
      actionable: 'Please try again with a clearer or smaller image.',
      retryable: true,
      statusCode: 408,
      details: { geminiError: error }
    });
  }

  // Invalid argument errors (usually file format or size issues)
  if (errorObj.code === 'INVALID_ARGUMENT' || errorObj.status === 400) {
    throw new RecipeProcessingError({
      type: ErrorType.INVALID_RECIPE_DATA,
      message: `Gemini invalid argument: ${errorObj.message}`,
      userMessage: 'There was an issue with the image format or content.',
      actionable: 'Please try a different image format or smaller file size.',
      retryable: false,
      statusCode: 400,
      details: { geminiError: error }
    });
  }

  // Generic Gemini errors
  throw new RecipeProcessingError({
    type: ErrorType.AI_PROCESSING_FAILED,
    message: `Gemini processing failed: ${errorObj.message || 'Unknown error'}`,
    userMessage: 'Our recipe analysis system encountered an issue.',
    actionable: 'Please try again in a moment.',
    retryable: true,
    statusCode: errorObj.status || 500,
    details: { geminiError: error }
  });
}

async function processImageWithOpenAI(imageBase64: string, imageMimeType: string, systemPrompt: string) {
  const chatCompletion = await openaiClient.chat.completions.create({
    model: "gpt-4o",
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
    max_tokens: 2000,
  });

  return chatCompletion.choices[0]?.message?.content;
}

async function processImageWithGemini(imageBase64: string, imageMimeType: string, systemPrompt: string) {
  const googleAI = getGoogleAI();
  const model = googleAI.getGenerativeModel({ 
    model: "gemini-2.0-flash-exp",
    generationConfig: {
      maxOutputTokens: 2000,
      temperature: 0.1,
      responseMimeType: "application/json"
    }
  });

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType: imageMimeType,
    },
  };

  const result = await model.generateContent([systemPrompt, imagePart]);
  const response = await result.response;
  return response.text();
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
        actionable: 'Please try uploading the image again.',
        retryable: true,
        statusCode: 400,
        details: { parseError: error }
      });
    }

    const imageFile = formData.get('image') as File | null;
    const providerParam = formData.get('provider') as string | null;
    const provider: AIProvider = (providerParam === 'gemini') ? 'gemini' : 'openai';

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
    validateFile(imageFile!, provider);

    // Convert image file to base64
    let imageBuffer: ArrayBuffer;
    let imageBase64: string;
    
    try {
      imageBuffer = await imageFile!.arrayBuffer();
      imageBase64 = Buffer.from(imageBuffer).toString('base64');
    } catch (error) {
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
    const systemPrompt = getImageSystemPrompt(schemaString);

    // Process image with selected AI provider
    let responseContent: string | null = null;
    
    try {
      if (provider === 'openai') {
        responseContent = await processImageWithOpenAI(imageBase64, imageMimeType, systemPrompt);
      } else {
        responseContent = await processImageWithGemini(imageBase64, imageMimeType, systemPrompt);
      }
    } catch (error: unknown) {
      if (provider === 'openai') {
        handleOpenAIError(error);
      } else {
        handleGeminiError(error);
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

    return NextResponse.json(validatedRecipeData, { status: 200 });

  } catch (error: unknown) {
    let recipeError: RecipeProcessingError;
    
    if (error instanceof RecipeProcessingError) {
      recipeError = error;
    } else {
      recipeError = RecipeProcessingError.fromUnknown(error, 'scan-recipe-api');
    }

    // Log the error for debugging
    logError(recipeError, {
      endpoint: '/api/scan-recipe',
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