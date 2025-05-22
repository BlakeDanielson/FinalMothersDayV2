import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

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

interface OpenAIErrorResponseData {
  [key: string]: unknown;
}
interface OpenAIErrorResponse {
  data?: OpenAIErrorResponseData;
  status?: number;
}

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
`;

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set for image processing.');
    return NextResponse.json({ error: 'Server configuration error: Missing OpenAI API key.' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    // Convert image file to base64
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');
    const imageMimeType = imageFile.type || 'image/jpeg'; // Default to jpeg if type not present

    const schemaString = JSON.stringify(scanRecipeZodSchema.shape);
    const systemPrompt = getImageSystemPrompt(schemaString);

    const chatCompletion = await openaiClient.chat.completions.create({
      model: "gpt-4o", // or "gpt-4o-mini" if preferred for speed/cost
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: systemPrompt }, // System prompt included in user message for some vision models
            {
              type: "image_url",
              image_url: {
                url: `data:${imageMimeType};base64,${imageBase64}`,
                detail: "high", // Use high detail for better OCR-like results
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000, // Adjust as needed, might need more for combined extraction + generation
    });

    if (!chatCompletion.choices[0].message.content) {
      throw new Error('OpenAI did not return recipe content from image.');
    }

    const parsedJson = JSON.parse(chatCompletion.choices[0].message.content);
    const initialRecipeData = scanRecipeZodSchema.parse(parsedJson);

    return NextResponse.json(initialRecipeData, { status: 200 });

  } catch (error: unknown) {
    console.error('Error in /api/scan-recipe:', error instanceof Error ? error.message : String(error));
    let errorMessage = 'Failed to process recipe from image.';
    let errorDetails: string | object = error instanceof Error ? error.message : String(error);
    let statusCode = 500;

    if (error instanceof z.ZodError) {
      errorMessage = "Validation error: The recipe data from AI (image) is not in the expected format.";
      errorDetails = error.format();
      statusCode = 422;
    } else if (error instanceof Error && error.message) {
        // Keep generic message, use error.message for details
    } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const errResp = error.response as OpenAIErrorResponse; // Use defined interface
        if (errResp.data && typeof errResp.status === 'number'){
            errorDetails = JSON.stringify(errResp.data);
            statusCode = errResp.status;
        }
    }

    return NextResponse.json({ error: errorMessage, details: errorDetails }, { status: statusCode });
  }
} 