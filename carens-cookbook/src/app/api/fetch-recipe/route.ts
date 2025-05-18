import { NextResponse } from 'next/server';
import { Hyperbrowser } from "@hyperbrowser/sdk";

// Initialize Hyperbrowser client
// Ensure your HYPERBROWSER_API_KEY is set in your environment variables
const hyperbrowserClient = new Hyperbrowser({
  apiKey: process.env.HYPERBROWSER_API_KEY,
});

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const recipeSchema = {
      type: "object",
      properties: {
        title: { type: "string" },
        ingredients: { type: "array", items: { type: "string" } },
        steps: { type: "array", items: { type: "string" } },
        image: { type: ["string", "null"] },
        cuisine: { type: "string" },
        category: { type: "string" },
        prepTime: { type: "string" },
        cleanupTime: { type: "string" }
      },
      // Making all fields required ensures the AI tries to populate them,
      // even if with empty values as per the prompt.
      required: ["title", "ingredients", "steps", "image", "cuisine", "category", "prepTime", "cleanupTime"]
    };

    const systemPrompt = "You are an expert recipe parsing assistant. Your task is to extract detailed recipe information from the provided HTML content. Focus on finding elements that typically contain recipe details. Ingredients are often found in <ul> or <ol> lists, possibly with class names like 'ingredients', 'recipe-ingredients', or similar. Cooking steps are usually in <ol> lists or structured paragraphs, often under headings like 'Instructions' or 'Directions'. Scrutinize the HTML carefully to capture ALL ingredients and ALL steps, even if they are separated by other text or elements. Ignore non-recipe content like ads, user comments, navigation menus, and unrelated sidebars. Return a JSON object adhering to the provided schema. If a field is not present or cannot be reasonably inferred, use an empty string for string types, an empty array for array types, and null for the image URL. Ensure all ingredients and steps are accurately captured as arrays of strings.";

    if (!process.env.HYPERBROWSER_API_KEY) {
      console.error('HYPERBROWSER_API_KEY is not set.');
      return NextResponse.json({ error: 'Server configuration error: Missing Hyperbrowser API key.' }, { status: 500 });
    }

    // Call Hyperbrowser to extract structured data
    const extractionResult = await hyperbrowserClient.extract.startAndWait({
        urls: [url],
        prompt: systemPrompt,
        schema: recipeSchema,
        // We can add sessionOptions here if needed, e.g.,
        // sessionOptions: {
        //   solveCaptchas: true, // Requires a paid plan
        //   useStealth: true,    // May improve reliability
        // }
    });
    
    // According to Hyperbrowser SDK docs for client.extract.startAndWait,
    // the result directly contains the data. (e.g. client.scrape.startAndWait example)
    // The raw API for GET /extract/{jobId} nests it under a "data" key.
    // The SDK's startAndWait for extract seems to return the data directly.
    // If the job fails, an error should be thrown by startAndWait and caught by the catch block.

    if (!extractionResult) { 
        // This case might be redundant if startAndWait throws on failure, but good for safety.
        return NextResponse.json({ error: 'Hyperbrowser did not return recipe content or the job result was empty.' }, { status: 500 });
    }

    // Assuming extractionResult is the recipe data object directly.
    // It could also be an array if multiple URLs were passed, but we pass one.
    const recipeData = Array.isArray(extractionResult) && extractionResult.length > 0 
                         ? extractionResult[0] 
                         : extractionResult;
    
    // Final check if recipeData is a valid object
    if (typeof recipeData !== 'object' || recipeData === null || Array.isArray(recipeData)) {
        console.error('Unexpected data structure from Hyperbrowser after processing result:', recipeData);
        return NextResponse.json({ error: 'Unexpected data structure received from Hyperbrowser.' }, { status: 500 });
    }

    return NextResponse.json(recipeData, { status: 200 });

  } catch (error: any) {
    console.error('Error in /api/fetch-recipe with Hyperbrowser:', error);
    let errorMessage = 'Failed to fetch and parse recipe via Hyperbrowser.';
    let errorDetails = error.message;

    // Hyperbrowser SDK might throw errors with specific structures
    if (error.status && error.message) { // Check for Hyperbrowser error structure
        errorMessage = `Hyperbrowser API error (${error.status}): ${error.message}`;
        if (error.data) { // If more details are in error.data
            errorDetails = error.data;
        }
    } else if (error.response && error.response.data) { // For generic HTTP-like errors
        errorDetails = error.response.data;
    }
    
    console.error('Hyperbrowser Error Details:', errorDetails);
    return NextResponse.json({ error: errorMessage, details: errorDetails }, { status: (error.status || 500) as number });
  }
} 