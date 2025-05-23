import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { RecipeProcessingError, ErrorType, logError } from '@/lib/errors';

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

// Initialize OpenAI client (ensure OPENAI_API_KEY is in .env)
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// File validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif'];

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

function validateFile(imageFile: File): void {
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

  // Check file size
  if (imageFile.size > MAX_FILE_SIZE) {
    throw new RecipeProcessingError({
      type: ErrorType.FILE_TOO_LARGE,
      message: `File size ${imageFile.size} exceeds maximum ${MAX_FILE_SIZE}`,
      userMessage: 'The image file is too large to process.',
      actionable: 'Please use an image smaller than 10MB.',
      retryable: false,
      statusCode: 413,
      details: { fileSize: imageFile.size, maxSize: MAX_FILE_SIZE }
    });
  }

  // Check file format
  const fileName = imageFile.name.toLowerCase();
  const mimeType = imageFile.type.toLowerCase();
  
  const isValidMimeType = SUPPORTED_MIME_TYPES.includes(mimeType);
  const isValidExtension = SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext));
  
  if (!isValidMimeType && !isValidExtension) {
    throw new RecipeProcessingError({
      type: ErrorType.FILE_FORMAT_UNSUPPORTED,
      message: `Unsupported file format: ${mimeType} (${fileName})`,
      userMessage: 'This image format is not supported.',
      actionable: 'Please use JPG, PNG, or HEIC format.',
      retryable: false,
      statusCode: 400,
      details: { fileName, mimeType, supportedFormats: SUPPORTED_MIME_TYPES }
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

export async function POST(req: NextRequest) {
  try {
    // Check OpenAI API key configuration
    if (!process.env.OPENAI_API_KEY) {
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
    
    // Validate the uploaded file
    validateFile(imageFile!);

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

    // Call OpenAI API with timeout
    let chatCompletion: OpenAI.Chat.Completions.ChatCompletion;
    
    try {
      chatCompletion = await openaiClient.chat.completions.create({
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
    } catch (error: unknown) {
      handleOpenAIError(error);
    }

    // Validate OpenAI response
    if (!chatCompletion.choices[0]?.message?.content) {
      throw new RecipeProcessingError({
        type: ErrorType.AI_PROCESSING_FAILED,
        message: 'OpenAI returned empty response',
        userMessage: 'The AI couldn\'t process your image.',
        actionable: 'Please try again with a clearer image.',
        retryable: true,
        statusCode: 502
      });
    }

    // Parse and validate the JSON response
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(chatCompletion.choices[0].message.content);
    } catch {
      throw new RecipeProcessingError({
        type: ErrorType.AI_PROCESSING_FAILED,
        message: 'OpenAI returned invalid JSON',
        userMessage: 'The AI response was malformed.',
        actionable: 'Please try again.',
        retryable: true,
        statusCode: 502,
        details: { responseContent: chatCompletion.choices[0].message.content }
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