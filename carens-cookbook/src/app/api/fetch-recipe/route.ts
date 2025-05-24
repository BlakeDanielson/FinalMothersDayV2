import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from "zod";
import { getSanitizedHtml } from '@/lib/html-processor';
import { Hyperbrowser } from "@hyperbrowser/sdk";

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

// Processing method enum
const ProcessingMethod = z.enum(["openai", "hyperbrowser"]);

// Request schema with processing method selection
const requestSchema = z.object({
  url: z.string().url(),
  processing_method: ProcessingMethod.optional().default("openai")
});

// Initialize OpenAI client
// Ensure your OPENAI_API_KEY is set in your environment variables
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Hyperbrowser client (will be checked when needed)
let hyperbrowserClient: Hyperbrowser | null = null;

function getHyperbrowserClient() {
  if (!hyperbrowserClient) {
    if (!process.env.HYPERBROWSER_API_KEY) {
      throw new Error('HYPERBROWSER_API_KEY is not set.');
    }
    hyperbrowserClient = new Hyperbrowser({
      apiKey: process.env.HYPERBROWSER_API_KEY,
    });
  }
  return hyperbrowserClient;
}

export async function POST(request: NextRequest) {

  try {
    const body = await request.json();
    const { url, processing_method } = requestSchema.parse(body);

    console.log(`Processing recipe from URL: ${url} using method: ${processing_method}`);

    // Validate API keys based on processing method
    if (processing_method === "hyperbrowser" && !process.env.HYPERBROWSER_API_KEY) {
      return NextResponse.json({ 
        success: false,
        error: 'Server configuration error: Missing Hyperbrowser API key.' 
      }, { status: 500 });
    }

    if (processing_method === "openai" && !process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        success: false,
        error: 'Server configuration error: Missing OpenAI API key.' 
      }, { status: 500 });
    }

    let recipeData;

    if (processing_method === "hyperbrowser") {
      // Use Hyperbrowser for faster, more accurate extraction
      recipeData = await extractRecipeWithHyperbrowser(url);
    } else {
      // Use OpenAI for traditional LLM-based extraction
      recipeData = await extractRecipeWithOpenAI(url);
    }

    return NextResponse.json({
      success: true,
      recipe: recipeData,
      processing_method,
      message: `Recipe extracted successfully using ${processing_method}`
    });

  } catch (error: unknown) {
    console.error(`Error in /api/fetch-recipe:`, error instanceof Error ? error.message : String(error));
    
    let errorMessage = 'Failed to fetch and parse recipe.';
    let errorDetails: string | object = error instanceof Error ? error.message : String(error); 
    let statusCode = 500;

    if (error instanceof z.ZodError) {
      errorMessage = "Validation error: The recipe data is not in the expected format.";
      errorDetails = error.format(); 
      statusCode = 422; 
    } else if (error instanceof Error) {
      if (error.message.includes("Failed to fetch URL")) {
        const statusMatch = error.message.match(/Status: (\d+)/);
        if (statusMatch && statusMatch[1]) {
          statusCode = parseInt(statusMatch[1], 10);
        }
        errorMessage = `Failed to fetch the recipe URL: ${error.message}`;
      } else if (error.message.includes("API key")) {
        errorMessage = "API configuration error. Please check your API keys.";
        statusCode = 401;
      } else if (error.message.includes("rate limit") || error.message.includes("quota")) {
        errorMessage = "API rate limit exceeded. Please try again later.";
        statusCode = 429;
      }
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: errorDetails
    }, { status: statusCode });
  }
}

async function extractRecipeWithHyperbrowser(url: string) {
  console.log(`Extracting recipe using Hyperbrowser from: ${url}`);
  
  try {
    const client = getHyperbrowserClient();
    
    // Define the recipe schema for Hyperbrowser
    const recipeSchema = {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The recipe title"
        },
        ingredients: {
          type: "array",
          items: { type: "string" },
          description: "List of ingredients with quantities"
        },
        steps: {
          type: "array", 
          items: { type: "string" },
          description: "Step-by-step cooking instructions"
        },
        image: {
          type: "string",
          description: "URL of the main recipe image"
        },
        description: {
          type: "string",
          description: "Brief description of the recipe"
        },
        cuisine: {
          type: "string",
          description: "Type of cuisine"
        },
        category: {
          type: "string",
          description: "Recipe category (e.g., Main Course, Dessert)"
        },
        prepTime: {
          type: "string",
          description: "Preparation time"
        },
        cleanupTime: {
          type: "string",
          description: "Cleanup time estimate"
        }
      }
    };

    // Use Hyperbrowser's extract API with structured schema
    const result = await client.extract.startAndWait({
      urls: [url],
      prompt: "Extract complete recipe information including title, ingredients with quantities, step-by-step instructions, prep time, and any recipe images.",
      schema: recipeSchema,
      sessionOptions: {
        useStealth: true, // Bypass anti-bot measures
      }
    });

    if (!result.data) {
      throw new Error('Hyperbrowser did not return recipe data');
    }

    console.log('Hyperbrowser extraction successful');
    return zodRecipeSchema.parse(result.data);

  } catch (error) {
    console.error('Hyperbrowser extraction failed:', error);
    throw new Error(`Hyperbrowser extraction failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function extractRecipeWithOpenAI(url: string) {
  console.log(`Extracting recipe using OpenAI from: ${url}`);
  
  try {
    // Fetch and sanitize HTML
    let fetchResponse;
    try {
      fetchResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; RecipeBot/1.0)',
        },
      });
    } catch (fetchError) {
      console.error('Failed to fetch URL:', fetchError);
      throw new Error(`Failed to fetch URL: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
    }
    
    if (!fetchResponse.ok) {
      throw new Error(`Failed to fetch URL: ${fetchResponse.statusText} (Status: ${fetchResponse.status})`);
    }
    
    const htmlContent = await fetchResponse.text();
    console.log(`Original HTML length: ${htmlContent.length}`);
    
    const sanitizedHtml = getSanitizedHtml(htmlContent);
    console.log(`Sanitized HTML length: ${sanitizedHtml.length}`);

    // Improved prompt for better JSON generation
    const systemPrompt = `You are a recipe extraction and processing assistant. Your ONLY job is to return a complete JSON object with exactly 9 fields.

**CRITICAL: YOU MUST RETURN VALID JSON ONLY - NO OTHER TEXT**

Required JSON format:
{
  "title": "Recipe Name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "image": "image_url_or_null",
  "description": "Brief description",
  "cuisine": "Cuisine type",
  "category": "Recipe category",
  "prepTime": "Time estimate",
  "cleanupTime": "Cleanup estimate"
}

Extract the recipe information from the HTML and return ONLY the JSON object above. No explanations, no markdown, no code blocks - just the raw JSON.`;

    const chatCompletion = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Here is the HTML content of the recipe page: <html_content>${sanitizedHtml}</html_content>` }
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 2000,
    });

    if (!chatCompletion.choices[0].message.content) {
      throw new Error('OpenAI did not return recipe content.');
    }

    // Check if the response was truncated
    if (chatCompletion.choices[0].finish_reason === 'length') {
      console.warn('Warning: OpenAI response was truncated due to length limits');
    } else if (chatCompletion.choices[0].finish_reason === 'content_filter') {
      console.warn('Warning: OpenAI response was truncated due to content filtering - will attempt to fix JSON');
    }

    console.log('Raw OpenAI response:', chatCompletion.choices[0].message.content);
    console.log('Response finish reason:', chatCompletion.choices[0].finish_reason);
    
    let parsedJson;
    const rawContent = chatCompletion.choices[0].message.content;
    
    try {
      parsedJson = JSON.parse(rawContent);
    } catch (jsonError) {
      console.error('JSON parsing failed:', jsonError);
      console.error('Raw response that failed to parse:', rawContent);
      
      // Try to fix common JSON issues
      let fixedContent = rawContent;
      
      // Fix common issues with unescaped quotes in strings
      fixedContent = fixedContent.replace(/([^\\])"/g, '$1\\"');
      fixedContent = fixedContent.replace(/^"/, '\\"');
      
      try {
         // Try to extract JSON if it's wrapped in markdown code blocks
         const jsonMatch = fixedContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
         if (jsonMatch) {
           fixedContent = jsonMatch[1];
           console.log('Extracted JSON from code block');
         }
         
         // Try to fix truncated JSON by adding missing closing braces/brackets
         if (!fixedContent.trim().endsWith('}')) {
           console.log('Attempting to fix truncated JSON');
           const attempts = [
             fixedContent + '}',
             fixedContent + '"}',
             fixedContent + '"]',
             fixedContent + '"]}',
             fixedContent + '"}]}'
           ];
           
           for (const attempt of attempts) {
             try {
               parsedJson = JSON.parse(attempt);
               console.log('Successfully fixed truncated JSON');
               break;
             } catch {
               // Continue to next attempt
             }
           }
           
           if (!parsedJson) {
             throw new Error('Could not fix truncated JSON');
           }
         } else {
           // Try parsing the fixed content
           parsedJson = JSON.parse(fixedContent);
           console.log('Successfully parsed JSON after fixing');
         }
      } catch {
        throw new Error(`OpenAI returned invalid JSON: ${jsonError instanceof Error ? jsonError.message : String(jsonError)}`);
      }
    }

    // Add missing fields with sensible defaults if they're not present
    const recipeDataWithDefaults = {
      title: parsedJson.title || 'Recipe',
      ingredients: parsedJson.ingredients || [],
      steps: parsedJson.steps || [],
      image: parsedJson.image || null,
      description: parsedJson.description || 'A delicious recipe.',
      cuisine: parsedJson.cuisine || 'International',
      category: parsedJson.category || 'Main Course',
      prepTime: parsedJson.prepTime || 'Approx. 30 minutes',
      cleanupTime: parsedJson.cleanupTime || 'Approx. 15 minutes'
    };
    
    console.log('OpenAI extraction successful');
    return zodRecipeSchema.parse(recipeDataWithDefaults);

  } catch (error) {
    console.error('OpenAI extraction failed:', error);
    throw new Error(`OpenAI extraction failed: ${error instanceof Error ? error.message : String(error)}`);
  }
} 