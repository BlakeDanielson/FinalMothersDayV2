import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from "zod";

// Helper function to fix relative URLs
function fixImageUrl(url: string | null, baseUrl: string): string | null {
  if (!url) return null;
  
  try {
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Handle protocol-relative URLs
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    
    // Handle relative URLs
    if (url.startsWith('/')) {
      const base = new URL(baseUrl);
      return `${base.protocol}//${base.host}${url}`;
    }
    
    // For other cases, try to create absolute URL
    return new URL(url, baseUrl).href;
  } catch (error) {
    console.warn('Failed to fix image URL:', url, error);
    return null;
  }
}

// Zod schema for recipe validation (forgiving version)
const RecipeSchema = z.object({
  title: z.string().nullable().default("Recipe"),
  ingredients: z.array(z.string()).default([]),
  steps: z.array(z.string()).default([]),
  image: z.string().nullable().default(null),
  description: z.string().nullable().default(""),
  cuisine: z.string().nullable().default(""),
  category: z.string().nullable().default(""),
  prepTime: z.string().nullable().default(""),
  cleanupTime: z.string().nullable().default("")
}).transform(data => ({
  ...data,
  title: data.title || "Recipe",
  description: data.description || "",
  cuisine: data.cuisine || "",
  category: data.category || "",
  prepTime: data.prepTime || "",
  cleanupTime: data.cleanupTime || ""
}));

// Extract recipe-specific content for Gemini
function extractRecipeContent(html: string): string {
  // Look for JSON-LD structured data first (most reliable)
  const jsonLdMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gi);
  if (jsonLdMatches) {
    for (const match of jsonLdMatches) {
      const jsonContent = match.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
      if (jsonContent.includes('Recipe') || jsonContent.includes('recipe')) {
        return `JSON-LD Recipe Data: ${jsonContent}`;
      }
    }
  }

  // Look for recipe-specific sections
  const recipeKeywords = ['recipe-card', 'recipe-content', 'recipe-instructions', 'ingredients', 'directions', 'recipe-summary'];
  let recipeContent = '';
  
  for (const keyword of recipeKeywords) {
    const regex = new RegExp(`<[^>]*class=[^>]*${keyword}[^>]*>([\\s\\S]*?)<\/[^>]+>`, 'gi');
    const matches = html.match(regex);
    if (matches) {
      recipeContent += matches.join(' ');
    }
  }

  // If we found recipe-specific content, use it
  if (recipeContent.length > 1000) {
    return recipeContent.substring(0, 25000);
  }

  // Fallback to general cleaning
  return cleanHtml(html, true);
}

// Simple HTML cleaning function with more aggressive cleaning for Gemini
function cleanHtml(html: string, forGemini: boolean = false): string {
  const cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '') // Remove navigation
    .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '') // Remove footer
    .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, '') // Remove header
    .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
    .replace(/\s+/g, ' ')
    .trim();
  
  // More aggressive trimming for Gemini to improve performance
  const maxLength = forGemini ? 50000 : 100000;
  return cleaned.substring(0, maxLength);
}

async function extractWithOpenAI(cleanedHtml: string): Promise<unknown> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const prompt = `Extract recipe information from this HTML and return ONLY a JSON object with these exact fields:
{
  "title": "recipe name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "image": "image_url_or_null",
  "description": "brief description",
  "cuisine": "cuisine type",
  "category": "recipe category", 
  "prepTime": "prep time",
  "cleanupTime": "cleanup time"
}

HTML content:
${cleanedHtml}`;

  console.log(`Sending to OpenAI, prompt length: ${prompt.length}`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini-2025-04-14",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 1000,
    temperature: 0.1,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  console.log('OpenAI response received');
  return content;
}

async function extractWithGPTMini(url: string, rawHtml: string): Promise<unknown> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Extract recipe-specific content to reduce payload size
  const recipeContent = extractRecipeContent(rawHtml);
  
  const prompt = `Extract recipe information from this content and return ONLY a JSON object with these exact fields:
{
  "title": "recipe name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "steps": ["step 1", "step 2"],
  "image": "image_url_or_null",
  "description": "brief description",
  "cuisine": "cuisine type",
  "category": "recipe category", 
  "prepTime": "prep time",
  "cleanupTime": "cleanup time"
}

Recipe content from ${url}:
${recipeContent}`;

  console.log(`Sending optimized content to GPT-4o-mini, length: ${recipeContent.length}`);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 1000,
    temperature: 0.1,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from GPT-4o-mini');
  }

  console.log('GPT-4o-mini response received');
  return content;
}

export async function POST(request: NextRequest) {
  try {
    const { url, processing_method = 'openai' } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate processing method
    if (!['openai', 'gemini'].includes(processing_method)) {
      return NextResponse.json(
        { success: false, error: 'Invalid processing method. Must be "openai" or "gemini"' },
        { status: 400 }
      );
    }

    console.log(`Processing URL: ${url} with ${processing_method}`);

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch webpage: ${response.status} ${response.statusText}`);
    }

    const htmlContent = await response.text();
    console.log(`Raw HTML length: ${htmlContent.length}`);

    // Simple HTML cleaning (more aggressive for Gemini)
    const isGemini = processing_method === 'gemini';
    const cleanedHtml = cleanHtml(htmlContent, isGemini);
    console.log(`Cleaned HTML length: ${cleanedHtml.length}`);

    // Check for recipe keywords
    const hasRecipeKeywords = ['recipe', 'ingredient', 'instruction', 'direction'].some(keyword => 
      cleanedHtml.toLowerCase().includes(keyword)
    );
    console.log(`Contains recipe keywords: ${hasRecipeKeywords}`);

    // Extract with chosen method
    let content;
    try {
      if (processing_method === 'gemini') {
        content = await extractWithGPTMini(url, htmlContent);
      } else {
        content = await extractWithOpenAI(cleanedHtml);
      }
    } catch (apiError) {
      console.error(`${processing_method} extraction failed:`, apiError);
      throw new Error(`${processing_method} extraction failed: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`);
    }

    // Parse JSON response
    let parsedRecipe;
    try {
      // Extract JSON from response (handle markdown code blocks and extra text)
      let jsonString = typeof content === 'string' ? content : String(content);
      
      // Remove markdown code blocks if present (common with Gemini)
      jsonString = jsonString.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
      
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
      jsonString = jsonMatch ? jsonMatch[0] : jsonString;
      
      parsedRecipe = JSON.parse(jsonString);
    } catch (parseError) {
      console.error(`Failed to parse ${processing_method} response as JSON:`, parseError);
      console.log('Raw response:', content);
      throw new Error(`Invalid JSON response from ${processing_method}`);
    }

    // Validate and fix the recipe
    const validatedRecipe = RecipeSchema.parse(parsedRecipe);

    // Fix image URL if present
    if (validatedRecipe.image) {
      validatedRecipe.image = fixImageUrl(validatedRecipe.image, url);
    }

    console.log(`Recipe extraction successful using ${processing_method}`);

    return NextResponse.json({
      success: true,
      recipe: validatedRecipe,
      processing_method: processing_method,
      message: `Recipe extracted successfully using ${processing_method === 'gemini' ? 'GPT-4o-mini' : 'GPT-4.1-mini'}`
    });

  } catch (error) {
    console.error('Recipe extraction error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        processing_method: "unknown"
      },
      { status: 500 }
    );
  }
} 