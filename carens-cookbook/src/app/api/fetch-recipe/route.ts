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
  title: z.string().default("Recipe"),
  ingredients: z.array(z.string()).default([]),
  steps: z.array(z.string()).default([]),
  image: z.string().nullable().default(null),
  description: z.string().default(""),
  cuisine: z.string().default(""),
  category: z.string().default(""),
  prepTime: z.string().default(""),
  cleanupTime: z.string().default("")
});

// Simple HTML cleaning function
function cleanHtml(html: string): string {
  // Very basic cleaning - remove scripts, styles, and excessive whitespace
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 100000); // Hard limit to 100K characters
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    console.log(`Processing URL: ${url}`);

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

    // Simple HTML cleaning
    const cleanedHtml = cleanHtml(htmlContent);
    console.log(`Cleaned HTML length: ${cleanedHtml.length}`);

    // Check for recipe keywords
    const hasRecipeKeywords = ['recipe', 'ingredient', 'instruction', 'direction'].some(keyword => 
      cleanedHtml.toLowerCase().includes(keyword)
    );
    console.log(`Contains recipe keywords: ${hasRecipeKeywords}`);

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Simple prompt
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
      model: "gpt-4o-mini",
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

    // Parse JSON response
    let parsedRecipe;
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      parsedRecipe = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.log('Raw response:', content);
      throw new Error('Invalid JSON response from OpenAI');
    }

    // Validate and fix the recipe
    const validatedRecipe = RecipeSchema.parse(parsedRecipe);

    // Fix image URL if present
    if (validatedRecipe.image) {
      validatedRecipe.image = fixImageUrl(validatedRecipe.image, url);
    }

    console.log('Recipe extraction successful');

    return NextResponse.json({
      success: true,
      recipe: validatedRecipe,
      processing_method: "openai",
      message: "Recipe extracted successfully using OpenAI"
    });

  } catch (error) {
    console.error('Recipe extraction error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        processing_method: "openai"
      },
      { status: 500 }
    );
  }
} 