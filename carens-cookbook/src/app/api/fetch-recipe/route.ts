import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import { z } from "zod";
import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';
import { AI_SETTINGS, getBackendProviderFromUI, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';

// NEW: Import the optimized orchestrator
import { extractRecipeOptimized, getExtractionEfficiencySummary, checkOptimizationReadiness } from '@/lib/services/recipe-extraction-orchestrator';

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

async function extractWithOpenAI(cleanedHtml: string, uiProvider: UIProvider): Promise<unknown> {
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

  console.log(`Sending to OpenAI (${uiProvider}), prompt length: ${prompt.length}`);

  // Get the specific model for this UI provider
  const modelToUse = getModelFromUIProvider(uiProvider);

  const completion = await openai.chat.completions.create({
    model: modelToUse,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS, 32768), // Ensure we don't exceed model limits
    temperature: AI_SETTINGS.OPENAI.TEMPERATURE,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  console.log(`OpenAI (${uiProvider}) response received`);
  return content;
}

async function extractWithGemini(url: string, rawHtml: string, uiProvider: UIProvider): Promise<unknown> {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('Google API key not configured');
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  
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

  // Get the specific model for this UI provider
  const modelToUse = getModelFromUIProvider(uiProvider);

  console.log(`Sending optimized content to Gemini (${uiProvider}), length: ${recipeContent.length}`);

  const response = await genAI.models.generateContent({
    model: modelToUse,
    contents: prompt,
    config: {
      maxOutputTokens: AI_SETTINGS.GEMINI.MAX_TOKENS,
      temperature: AI_SETTINGS.GEMINI.TEMPERATURE,
    }
  });

  const content = response.text;
  if (!content) {
    throw new Error('No response from Gemini');
  }

  console.log(`Gemini (${uiProvider}) response received`);
  return content;
}

// NEW: Optimized POST handler using the orchestrator (Gemini URL-direct primary, OpenAI fallback)
export const PUT = withOnboardingGuard(async (request: NextRequest) => {
  try {
    const { url, forceStrategy, geminiProvider = 'gemini-pro', openaiProvider = 'openai-main' } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    console.log(`🎯 OPTIMIZED EXTRACTION: Processing ${url}`);
    console.log(`📊 System readiness:`, checkOptimizationReadiness());

    // Use the new optimized orchestrator
    const { recipe, metrics } = await extractRecipeOptimized(url, {
      forceStrategy, // 'url-direct', 'html-fallback', or undefined for auto-detect
      geminiProvider,
      openaiProvider,
      timeoutMs: 45000
    });

    // Fix image URL if present
    if (recipe.image) {
      recipe.image = fixImageUrl(recipe.image, url);
    }

    const efficiencySummary = getExtractionEfficiencySummary(metrics);

    console.log(`✅ OPTIMIZED SUCCESS: Strategy=${metrics.primarySuccess ? 'Gemini URL-Direct' : 'OpenAI HTML Fallback'}`);
    console.log(`📊 Efficiency: ${efficiencySummary.efficiency}, Tokens: ${efficiencySummary.tokensUsed}, Time: ${efficiencySummary.processingTime}ms`);

    return NextResponse.json({
      success: true,
      recipe,
      optimization: {
        strategy: metrics.primarySuccess ? 'gemini-url-direct' : 'openai-html-fallback',
        efficiency: efficiencySummary.efficiency,
        tokensUsed: metrics.totalTokensEstimated,
        processingTime: metrics.processingTime,
        fallbackUsed: metrics.fallbackUsed,
        efficiencyGain: metrics.efficiencyGain,
        recommendation: efficiencySummary.recommendation
      },
      message: `Recipe extracted using ${metrics.primarySuccess ? 'ultra-efficient Gemini URL-direct' : 'OpenAI HTML fallback'} strategy`
    });

  } catch (error) {
    console.error('🚨 OPTIMIZED EXTRACTION ERROR:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        optimization: {
          strategy: 'failed',
          recommendation: 'Check API keys and network connectivity'
        }
      },
      { status: 500 }
    );
  }
});

// EXISTING: Legacy POST handler (maintained for compatibility)
export const POST = withOnboardingGuard(async (request: NextRequest) => {
  try {
    const { url, processing_method = 'openai-main' } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Convert UI provider to backend processing method
    let backendProcessingMethod: string;
    let uiProvider: UIProvider;
    
    // Support both old format (openai/gemini) and new format (openai-main/gemini-main/etc)
    if (processing_method === 'openai' || processing_method === 'gemini') {
      // Legacy format - convert to new format
      backendProcessingMethod = processing_method;
      uiProvider = processing_method === 'openai' ? 'openai-main' : 'gemini-main';
    } else {
      // New format - convert UI provider to backend
      uiProvider = processing_method as UIProvider;
      backendProcessingMethod = getBackendProviderFromUI(uiProvider);
    }

    // Validate processing method
    if (!['openai', 'gemini'].includes(backendProcessingMethod)) {
      return NextResponse.json(
        { success: false, error: 'Invalid processing method. Must be "openai" or "gemini"' },
        { status: 400 }
      );
    }

    console.log(`Processing URL: ${url} with ${uiProvider} (backend: ${backendProcessingMethod})`);

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
    const isGemini = backendProcessingMethod === 'gemini';
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
      if (backendProcessingMethod === 'gemini') {
        content = await extractWithGemini(url, htmlContent, uiProvider);
      } else {
        content = await extractWithOpenAI(cleanedHtml, uiProvider);
      }
    } catch (apiError) {
      console.error(`${uiProvider} (${backendProcessingMethod}) extraction failed:`, apiError);
      throw new Error(`${uiProvider} extraction failed: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`);
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
      console.error(`Failed to parse ${uiProvider} (${backendProcessingMethod}) response as JSON:`, parseError);
      console.log('Raw response:', content);
      throw new Error(`Invalid JSON response from ${uiProvider}`);
    }

    // Validate and fix the recipe
    const validatedRecipe = RecipeSchema.parse(parsedRecipe);

    // Fix image URL if present
    if (validatedRecipe.image) {
      validatedRecipe.image = fixImageUrl(validatedRecipe.image, url);
    }

    console.log(`Recipe extraction successful using ${uiProvider} (${backendProcessingMethod})`);

    return NextResponse.json({
      success: true,
      recipe: validatedRecipe,
      processing_method: uiProvider,
      message: `Recipe extracted successfully using ${uiProvider}`
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
}); 