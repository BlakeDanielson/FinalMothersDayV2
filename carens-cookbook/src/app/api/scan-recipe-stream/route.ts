import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import { RecipeProcessingError, ErrorType, logError } from '@/lib/errors';
import { AIProvider, getProviderConfig } from '@/lib/ai-providers';
import { categoryService } from '@/lib/categories';
import { auth } from '@clerk/nextjs/server';

import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';
import { AI_SETTINGS, getBackendProviderFromUI, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';
import { ConversionAnalytics } from '@/lib/services/conversionAnalytics';
import { ConversionEventType } from '@/generated/prisma';
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

// File validation constants
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp'];

// Progress event helpers
function createProgressEvent(progress: number, message: string, data?: Record<string, unknown>) {
  return `data: ${JSON.stringify({ 
    type: 'progress', 
    progress, 
    message, 
    ...data 
  })}\n\n`;
}

function createSuccessEvent(recipe: unknown, optimization: Record<string, unknown>) {
  return `data: ${JSON.stringify({ 
    type: 'success', 
    recipe, 
    optimization 
  })}\n\n`;
}

function createErrorEvent(error: string) {
  return `data: ${JSON.stringify({ 
    type: 'error', 
    error 
  })}\n\n`;
}

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

async function processImageWithProgress(
  imageBase64: string, 
  imageMimeType: string, 
  systemPrompt: string, 
  model: string,
  progressCallback: (progress: number, message: string, data?: Record<string, unknown>) => void
) {
  const startTime = Date.now();

  // Helper function for rotating messages during long operations
  const showRotatingMessages = async (
    messages: string[], 
    baseProgress: number, 
    progressIncrement: number, 
    intervalMs: number = 2000,
    data?: Record<string, unknown>
  ) => {
    for (let i = 0; i < messages.length; i++) {
      const currentProgress = baseProgress + (progressIncrement * (i / messages.length));
      progressCallback(Math.round(currentProgress), messages[i], data);
      
      if (i < messages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    }
  };

  try {
    // Start AI processing with rotating messages
    const processingMessages = [
      "🤖 Our AI chef is examining your recipe photo...",
      "👀 Scanning for ingredients and cooking steps...",
      "📖 Reading through all the delicious details...",
      "🧠 Understanding the recipe structure...",
      "⚡ Almost done analyzing your recipe...",
      "✨ Putting the finishing touches on extraction..."
    ];

    // Start the rotating messages (30% to 80%)
    const messagePromise = showRotatingMessages(
      processingMessages, 
      30, 
      50, // 80% - 30% = 50% progress range
      2500, // 2.5 seconds between messages
      { stage: 'ai-processing' }
    );

    // Start the actual AI processing
    const processingPromise = openaiClient.chat.completions.create({
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
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: AI_SETTINGS.MAX_TOKENS,
      temperature: AI_SETTINGS.TEMPERATURE,
    });

    // Wait for both to complete
    const [completion] = await Promise.all([processingPromise, messagePromise]);

    progressCallback(85, "📝 Organizing ingredients and cooking steps...", { stage: 'finalizing' });
    await new Promise(resolve => setTimeout(resolve, 500));

    const processingTime = Date.now() - startTime;
    progressCallback(100, "✨ Recipe successfully extracted!", { stage: 'complete', processingTime });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error('No response content from OpenAI');
    }

    return {
      content: responseContent,
      processingTime,
      tokensUsed: completion.usage?.total_tokens || 0
    };

  } catch (error) {
    handleOpenAIError(error);
  }
}

// Enhanced orchestrator with progress tracking
async function extractRecipeFromImageWithProgress(
  imageFile: File,
  provider: UIProvider = 'openai-main',
  userCategories: string[] = [],
  progressCallback: (progress: number, message: string, data?: Record<string, unknown>) => void
) {
  const requestId = `IMG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  console.log(`[${requestId}] 🚀 Starting enhanced image processing...`);

  let imageBuffer: ArrayBuffer;
  let imageBase64: string;

  progressCallback(5, "📷 Processing your recipe image...", { stage: 'upload' });

  // Validate the file
  const backendProvider = getBackendProviderFromUI(provider);
  validateFile(imageFile, backendProvider as AIProvider); // Cast since we know it's either 'openai' or 'gemini'

  progressCallback(10, "🔍 Validating image format and size...", { stage: 'validation' });
  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    progressCallback(15, "🔄 Converting image for AI processing...", { stage: 'conversion' });
    
    imageBuffer = await imageFile.arrayBuffer();
    imageBase64 = Buffer.from(imageBuffer).toString('base64');
    
    progressCallback(25, "✅ Image ready for analysis!", { stage: 'ready' });
    await new Promise(resolve => setTimeout(resolve, 300));

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

  const imageMimeType = imageFile.type || 'image/jpeg';
  const schemaString = JSON.stringify(scanRecipeZodSchema.shape);
  const systemPrompt = getImageSystemPrompt(schemaString, userCategories);
  const model = getModelFromUIProvider(provider);

  console.log(`[${requestId}] 🎯 Processing with ${provider} (${model})`);
  console.log(`[${requestId}]   📏 Image size: ${Math.round(imageBase64.length / 1024)}KB`);

  // Process with progress tracking
  const result = await processImageWithProgress(
    imageBase64,
    imageMimeType,
    systemPrompt,
    model,
    progressCallback
  );

  // Parse and validate the response
  let parsedRecipe;
  try {
    const cleanContent = result.content.replace(/```json\n?|\n?```/g, '').trim();
    parsedRecipe = JSON.parse(cleanContent);
  } catch (parseError) {
    console.error(`[${requestId}] ❌ JSON parsing failed:`, parseError);
    throw new RecipeProcessingError({
      type: ErrorType.AI_PROCESSING_FAILED,
      message: 'AI returned invalid JSON response',
      userMessage: 'The AI had trouble reading your recipe image.',
      actionable: 'Please try a clearer image or different photo.',
      retryable: true,
      statusCode: 422,
      details: { parseError, rawContent: result.content }
    });
  }

  // Check if AI detected no recipe
  if (!parsedRecipe || Object.keys(parsedRecipe).length === 0) {
    throw new RecipeProcessingError({
      type: ErrorType.RECIPE_NOT_DETECTED,
      message: 'No recipe detected in image',
      userMessage: 'We couldn\'t find a recipe in this image.',
      actionable: 'Please try an image that clearly shows a recipe with ingredients and steps.',
      retryable: false,
      statusCode: 422
    });
  }

  // Validate against schema
  const validationResult = scanRecipeZodSchema.safeParse(parsedRecipe);
  if (!validationResult.success) {
    console.error(`[${requestId}] ❌ Schema validation failed:`, validationResult.error);
    throw new RecipeProcessingError({
      type: ErrorType.AI_PROCESSING_FAILED,
      message: 'Recipe data validation failed',
      userMessage: 'The extracted recipe data is incomplete.',
      actionable: 'Please try a clearer image showing all recipe details.',
      retryable: true,
      statusCode: 422,
      details: { validationErrors: validationResult.error.errors }
    });
  }

  console.log(`[${requestId}] ✅ Recipe extracted successfully: "${parsedRecipe.title}"`);

  return {
    recipe: validationResult.data,
    metrics: {
      processingTime: result.processingTime,
      tokensUsed: result.tokensUsed,
      provider: provider,
      imageSize: Math.round(imageBase64.length / 1024)
    }
  };
}

export const POST = withOnboardingGuard(async (request: NextRequest) => {
  const formData = await request.formData();
  const imageFile = formData.get('image') as File;
  const provider = (formData.get('provider') as UIProvider) || 'openai-main';
  const sessionId = formData.get('sessionId') as string;

  if (!imageFile) {
    return NextResponse.json(
      { success: false, error: 'No image file provided' },
      { status: 400 }
    );
  }

  // Get user info and session context
  const { userId } = await auth();
  let sessionContext;
  
  try {
    sessionContext = await ConversionAnalytics.getOrCreateSession(sessionId || undefined, { userId: userId || undefined });
  } catch (error) {
    console.error('Failed to get session context:', error);
    sessionContext = null;
  }

  // Check rate limits for anonymous users
  if (!userId && sessionContext) {
    const rateLimitResult = await ConversionAnalytics.checkRateLimit(sessionContext.sessionId);
    if (!rateLimitResult.allowed) {
      await ConversionAnalytics.trackRateLimitHit(sessionContext.sessionId, {
        imageFile: imageFile.name,
        remainingRequests: rateLimitResult.remainingRequests
      });
      
      return NextResponse.json({
        success: false,
        error: 'Daily limit reached',
        rateLimitInfo: {
          limit: 20,
          remaining: rateLimitResult.remainingRequests,
          resetTime: rateLimitResult.resetTime,
          message: 'Sign up to save unlimited recipes!'
        }
      }, { status: 429 });
    }
  }

  // Get user categories
  let userCategories: string[] = [];
  try {
    if (userId) {
      userCategories = await categoryService.getUserCategories(userId);
    }
  } catch (error) {
    console.error('Failed to fetch user categories:', error);
  }

  // Set up SSE response headers
  const responseHeaders = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  };

  // Create a readable stream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      
      try {
        console.log(`🎯 STREAMING IMAGE EXTRACTION: Processing ${imageFile.name}`);

        // Initial connection message
        controller.enqueue(encoder.encode(createProgressEvent(0, "📷 Starting recipe scan...", { stage: 'initializing' })));

        // Create a custom progress callback
        const progressCallback = (progress: number, message: string, data?: Record<string, unknown>) => {
          console.log(`📊 Progress: ${progress}% - ${message}`);
          controller.enqueue(encoder.encode(createProgressEvent(progress, message, data)));
        };

        // Extract recipe with progress tracking
        const { recipe, metrics } = await extractRecipeFromImageWithProgress(
          imageFile,
          provider,
          userCategories,
          progressCallback
        );

        // Track successful extraction
        if (sessionContext) {
          try {
            await ConversionAnalytics.incrementRateLimit(sessionContext.sessionId, userId || undefined);
            
            await ConversionAnalytics.trackEvent(
              sessionContext.sessionId,
              ConversionEventType.RECIPE_EXTRACTED,
              {
                imageFile: imageFile.name,
                provider: provider,
                tokensUsed: metrics.tokensUsed,
                processingTime: metrics.processingTime,
                imageSize: metrics.imageSize
              },
              userId || undefined
            );

            if (!userId) {
              const rateLimitResult = await ConversionAnalytics.checkRateLimit(sessionContext.sessionId);
              if (rateLimitResult.remainingRequests <= 5) {
                await ConversionAnalytics.trackSignupPromptShown(sessionContext.sessionId, {
                  imageFile: imageFile.name,
                  remainingRequests: rateLimitResult.remainingRequests,
                  trigger: 'approaching_limit'
                });
              }
            }
          } catch (analyticsError) {
            console.error('Analytics tracking failed:', analyticsError);
          }
        }

        // Send success event
        controller.enqueue(encoder.encode(createSuccessEvent(recipe, {
          provider: provider,
          tokensUsed: metrics.tokensUsed,
          processingTime: metrics.processingTime,
          imageSize: metrics.imageSize,
          efficiency: 'Photo Analysis Complete'
        })));

      } catch (error) {
        console.error('🚨 STREAMING ERROR:', error);
        
        const errorMessage = error instanceof RecipeProcessingError 
          ? error.userMessage 
          : 'An unexpected error occurred while processing your recipe image.';

        controller.enqueue(encoder.encode(createErrorEvent(errorMessage)));

        // Note: Could add extraction failure analytics tracking here if needed

        if (error instanceof RecipeProcessingError) {
          logError(error, { imageFile: imageFile.name, provider });
        }
      } finally {
        controller.close();
      }
    }
  });

  return new NextResponse(stream, { headers: responseHeaders });
}); 