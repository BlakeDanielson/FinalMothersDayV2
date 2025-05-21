import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from "zod";
import { getSanitizedHtml } from '@/lib/html-processor';
import { saveImageLocally } from '@/lib/image-utils';

// Define Zod schema for recipe data
const zodRecipeSchema = z.object({
  title: z.string().min(1, "Title is required and must be extracted from HTML."),
  ingredients: z.array(z.string()).min(1, "Ingredients are required and must be extracted from HTML."),
  steps: z.array(z.string()).min(1, "Steps are required and must be extracted from HTML."),
  image: z.string().url("Image must be a valid URL if present.").nullable(), // Image can be null if not found in HTML
  description: z.string().min(1, "Description is required and should be AI-generated."),
  cuisine: z.string().min(1, "Cuisine is required and should be AI-generated."),
  category: z.string().min(1, "Category is required and should be AI-generated."),
  prepTime: z.string().min(1, "Prep time is required and should be AI-generated."),
  cleanupTime: z.string().min(1, "Cleanup time is required and should be AI-generated."),
});

// Initialize OpenAI client
// Ensure your OPENAI_API_KEY is set in your environment variables
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set.');
    return NextResponse.json({ error: 'Server configuration error: Missing OpenAI API key.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    console.log(`Fetching recipe for URL: ${url} using OpenAI direct mode`);
    const fetchResponse = await fetch(url); // Renamed to avoid conflict
    if (!fetchResponse.ok) {
      throw new Error(`Failed to fetch URL: ${fetchResponse.statusText} (Status: ${fetchResponse.status})`);
    }
    const htmlContent = await fetchResponse.text();
    console.log(`Original HTML length: ${htmlContent.length}`);
    const sanitizedHtml = getSanitizedHtml(htmlContent);
    console.log(`Sanitized HTML length: ${sanitizedHtml.length}`);

    const schemaString = JSON.stringify(zodRecipeSchema.shape);
    const systemPrompt = `You are an advanced two-stage recipe processing assistant. Your primary goal is to return a complete and structured JSON object for a given recipe based on its HTML content.\n\n**Stage 1: Content Extraction from HTML**\nFirst, you MUST meticulously analyze the provided HTML content. From this HTML, you are REQUIRED to extract the following specific pieces of information:\n*   \`title\`: The main title of the recipe as it appears on the page.\n*   \`ingredients\`: A comprehensive array of strings, where each string is a single ingredient (e.g., \"1 cup flour\", \"2 tbsp olive oil\"). Capture all listed ingredients.\n*   \`steps\`: An array of strings, where each string is a distinct preparation or cooking step. Capture all listed steps in order.\n*   \`image\`: The direct URL to the main, most representative image of the finished recipe. If no suitable image URL is found within the HTML, this field MUST be \`null\`.\n\nThese four fields (\`title\`, \`ingredients\`, \`steps\`, \`image\`) MUST be sourced directly from the provided HTML. Do not invent or infer them if they are not present in the HTML.\n\n**Stage 2: AI-Powered Content Generation**\nOnce you have successfully extracted the \`title\`, \`ingredients\`, and \`steps\` from the HTML, you will then use THIS EXTRACTED INFORMATION to intelligently generate and provide plausible values for the following fields. These generated fields should be contextually relevant to the extracted recipe content:\n*   \`description\`: Based on the extracted \`title\`, \`ingredients\`, and \`steps\`, write a concise and appealing summary of the recipe (typically 1-3 sentences).\n*   \`cuisine\`: Based on the extracted \`ingredients\` and cooking \`steps\`, determine and state the most appropriate primary cuisine type (e.g., \"Italian\", \"Mexican\", \"Indian\", \"American Comfort Food\", \"Mediterranean\").\n*   \`category\`: Based on the overall nature of the recipe from the extracted content, determine and state a suitable meal category (e.g., \"Main Course\", \"Dessert\", \"Appetizer\", \"Side Dish\", \"Breakfast\", \"Beverage\").\n*   \`prepTime\`: Based on the extracted \`ingredients\` (e.g., amount of chopping) and \`steps\`, estimate the active preparation time required before cooking begins. Provide a string like \"Approx. X minutes\" or \"X hours Y minutes\".\n*   \`cleanupTime\`: Based on the extracted \`ingredients\` and cooking \`steps\` (e.g., number of bowls/pans used), estimate the time needed for cleanup after cooking. Provide a string like \"Approx. X minutes\".\n\n**Output Requirements:**\nYou MUST return a single JSON object. This object must contain all nine fields: \`title\`, \`ingredients\`, \`steps\`, \`image\`, \`description\`, \`cuisine\`, \`category\`, \`prepTime\`, and \`cleanupTime\`.\nAdherence to the following JSON schema structure is MANDATORY:\n${schemaString}\n`;

    const chatCompletion = await openaiClient.chat.completions.create({
      model: "o4-mini-2025-04-16",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the HTML content of the recipe page: <html_content>${sanitizedHtml}</html_content>` }
      ],
      response_format: { type: "json_object" },
    });
    
    if (!chatCompletion.choices[0].message.content) {
      throw new Error('OpenAI did not return recipe content.');
    }
    const parsedJson = JSON.parse(chatCompletion.choices[0].message.content);
    const initialRecipeData = zodRecipeSchema.parse(parsedJson);
    let finalRecipeData = { ...initialRecipeData }; // Start with a copy

    if (!initialRecipeData.image) { 
      console.log(`No image found for recipe: ${initialRecipeData.title}. Attempting to generate one.`);
      const dallePrompt = `Photorealistic, appetizing, high-quality image of ${initialRecipeData.title}. This dish is a ${initialRecipeData.category} (${initialRecipeData.cuisine}). Show the dish as if it's freshly prepared and ready to eat. Bright, natural lighting. Food photography style. If the title suggests a component (like a sauce or dough), depict the complete dish it's typically part of.`;
      console.log("GPT Prompt for fetch-recipe:", dallePrompt);
      
      try {
        const imageGenResponse = await openaiClient.images.generate({
          model: "gpt-image-1",
          prompt: dallePrompt,
          n: 1,
          size: "1024x1024",
          response_format: "url",
        });

        const temporaryImageUrl = imageGenResponse.data?.[0]?.url;
        if (temporaryImageUrl) {
          console.log(`GPT temporary URL for ${initialRecipeData.title}: ${temporaryImageUrl}`);
          const permanentLocalUrl = await saveImageLocally(temporaryImageUrl, initialRecipeData.title);
          if (permanentLocalUrl) {
            finalRecipeData = { ...finalRecipeData, image: permanentLocalUrl }; // Create new object with updated image
            console.log(`Recipe image for ${initialRecipeData.title} updated to local URL: ${permanentLocalUrl}`);
          } else {
            console.warn(`Failed to save GPT image locally for ${initialRecipeData.title}, recipe will have no image.`);
          }
        } else {
          console.warn(`GPT did not return an image URL for ${initialRecipeData.title}.`);
        }
      } catch (imageGenError: unknown) { // Typed imageGenError
        console.error(`Error generating image with GPT for ${initialRecipeData.title}:`, imageGenError instanceof Error ? imageGenError.message : String(imageGenError));
      }
    }

    return NextResponse.json(finalRecipeData, { status: 200 }); // Return the final data

  } catch (error: unknown) { // Typed error
    console.error(`Error in /api/fetch-recipe (OpenAI mode):`, error instanceof Error ? error.message : String(error));
    let errorMessage = 'Failed to fetch and parse recipe via OpenAI.';
    let errorDetails: string | object = error instanceof Error ? error.message : String(error); 
    let statusCode = 500;

    if (error instanceof z.ZodError) {
      errorMessage = "Validation error: The recipe data received from OpenAI is not in the expected format.";
      errorDetails = error.format(); 
      statusCode = 422; 
    } else if (error instanceof Error && error.message && error.message.includes("Failed to fetch URL")) {
      const statusMatch = error.message.match(/Status: (\d+)/);
      if (statusMatch && statusMatch[1]) {
        statusCode = parseInt(statusMatch[1], 10);
      }
      errorMessage = `Failed to fetch the recipe URL: ${error.message}`;
    } 
    // Consider if more specific error.response checks are needed from original code
    
    console.error('Error Details:', errorDetails);
    return NextResponse.json({ error: errorMessage, details: errorDetails }, { status: statusCode });
  }
} 