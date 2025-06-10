import { extractRecipeViaUrlDirect, shouldUseUrlDirect, getUrlDirectUsageMetrics } from './gemini-url-direct';
import { AI_SETTINGS, type UIProvider } from '@/lib/config/ai-models';
import OpenAI from 'openai';
import { getModelFromUIProvider } from '@/lib/config/ai-models';

// Helper functions (extracted from existing route for consistency)
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

async function cleanContentFromUrl(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch webpage: ${response.status} ${response.statusText}`);
  }

  const htmlContent = await response.text();
  return cleanHtml(htmlContent, false); // Use OpenAI-friendly cleaning
}

async function processRecipeWithAI(cleanedHtml: string, uiProvider: UIProvider): Promise<ExtractedRecipe> {
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

  const modelToUse = getModelFromUIProvider(uiProvider);

  const completion = await openai.chat.completions.create({
    model: modelToUse,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: Math.min(AI_SETTINGS.OPENAI.MAX_TOKENS, 32768),
    temperature: AI_SETTINGS.OPENAI.TEMPERATURE,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  // Parse JSON response
  let jsonString = content;
  
  // Remove markdown code blocks if present
  jsonString = jsonString.replace(/```json\s*/g, '').replace(/```\s*$/g, '');
  
  // Extract JSON from response (in case there's extra text)
  const jsonMatch = jsonString.match(/\{[\s\S]*\}/);
  jsonString = jsonMatch ? jsonMatch[0] : jsonString;
  
  const parsedRecipe = JSON.parse(jsonString);

  // Return formatted recipe
  return {
    title: parsedRecipe.title || "Recipe",
    ingredients: parsedRecipe.ingredients || [],
    steps: parsedRecipe.steps || [],
    image: parsedRecipe.image || null,
    description: parsedRecipe.description || "",
    cuisine: parsedRecipe.cuisine || "",
    category: parsedRecipe.category || "",
    prepTime: parsedRecipe.prepTime || "",
    cleanupTime: parsedRecipe.cleanupTime || ""
  };
}

interface ExtractedRecipe {
  title: string;
  ingredients: string[];
  steps: string[];
  image: string | null;
  description: string;
  cuisine: string;
  category: string;
  prepTime: string;
  cleanupTime: string;
}

interface ExtractionMetrics {
  primaryStrategy: 'gemini-url-direct' | 'openai-html-fallback';
  primarySuccess: boolean;
  fallbackUsed: boolean;
  totalTokensEstimated: number;
  efficiencyGain?: string;
  processingTime: number;
  url: string;
}

interface OrchestrationOptions {
  forceStrategy?: 'url-direct' | 'html-fallback';
  geminiProvider?: UIProvider;
  openaiProvider?: UIProvider;
  timeoutMs?: number;
}

/**
 * Master orchestrator for recipe extraction using the optimal strategy:
 * 1. Primary: Gemini URL-direct (99%+ token efficiency)
 * 2. Fallback: OpenAI HTML processing (traditional method)
 * 
 * Based on test findings showing Gemini can use ~143 tokens vs OpenAI's ~175K tokens
 */
export async function extractRecipeOptimized(
  url: string, 
  options: OrchestrationOptions = {}
): Promise<{ recipe: ExtractedRecipe; metrics: ExtractionMetrics }> {
  const startTime = Date.now();
  const {
    forceStrategy,
    geminiProvider = 'gemini-pro',
    openaiProvider = 'openai-main',
    timeoutMs = 45000
  } = options;

  console.log(`\n🎯 Recipe Extraction Orchestrator: Starting optimization for ${url}`);
  console.log(`📊 Strategy: ${forceStrategy || 'auto-detect'}`);

  const metrics: ExtractionMetrics = {
    primaryStrategy: 'gemini-url-direct',
    primarySuccess: false,
    fallbackUsed: false,
    totalTokensEstimated: 0,
    processingTime: 0,
    url
  };

  // Strategy 1: Gemini URL-Direct (PRIMARY)
  if (forceStrategy !== 'html-fallback') {
    const shouldTryUrlDirect = forceStrategy === 'url-direct' || 
                               (AI_SETTINGS.GEMINI.FULL_CONTEXT.ENABLE_URL_DIRECT && shouldUseUrlDirect(url));

    if (shouldTryUrlDirect) {
      console.log(`🚀 PRIMARY: Attempting Gemini URL-direct strategy`);
      
      try {
        const geminiResult = await extractRecipeViaUrlDirect(url, {
          uiProvider: geminiProvider,
          timeout: timeoutMs
        });

        const urlDirectMetrics = getUrlDirectUsageMetrics(url, true);
        metrics.primarySuccess = true;
        metrics.totalTokensEstimated = urlDirectMetrics.estimatedInputTokens;
        metrics.efficiencyGain = "99%+ token reduction vs traditional HTML processing";
        metrics.processingTime = Date.now() - startTime;

        console.log(`✅ SUCCESS: Gemini URL-direct completed in ${metrics.processingTime}ms`);
        console.log(`📊 Token efficiency: ~${metrics.totalTokensEstimated} tokens (ultra-efficient)`);

        return {
          recipe: geminiResult,
          metrics
        };

      } catch (error) {
        console.warn(`⚠️ Gemini URL-direct failed:`, error instanceof Error ? error.message : 'Unknown error');
        
        // Update metrics for failed primary attempt
        const failedMetrics = getUrlDirectUsageMetrics(url, false);
        metrics.totalTokensEstimated = failedMetrics.estimatedInputTokens;
        
        // Don't throw here - continue to fallback
      }
    } else {
      console.log(`ℹ️ Skipping URL-direct: Domain not optimized or disabled`);
    }
  }

  // Strategy 2: OpenAI HTML Processing (FALLBACK)
  console.log(`🔄 FALLBACK: Using OpenAI HTML processing strategy`);
  metrics.fallbackUsed = true;
  metrics.primaryStrategy = 'openai-html-fallback';

  try {
    // Step 1: Fetch and clean HTML content
    console.log(`📄 Fetching HTML content from ${url}`);
    const htmlContent = await cleanContentFromUrl(url);
    
    if (!htmlContent || htmlContent.length < 100) {
      throw new Error('No meaningful content found after HTML processing');
    }

    // Estimate tokens for the HTML approach
    const htmlTokenEstimate = Math.ceil(htmlContent.length / 4);
    console.log(`📊 HTML content size: ${htmlContent.length} chars (~${htmlTokenEstimate} tokens)`);

    // Step 2: Process with OpenAI
    console.log(`🤖 Processing with OpenAI using ${openaiProvider}`);
    const openaiResult = await processRecipeWithAI(htmlContent, openaiProvider);

    // Calculate final metrics
    metrics.primarySuccess = false; // Primary (Gemini URL-direct) failed
    metrics.totalTokensEstimated += htmlTokenEstimate; // Add HTML processing tokens
    metrics.processingTime = Date.now() - startTime;

    // Calculate efficiency comparison
    const urlDirectTokens = 143; // From test results
    const efficiencyRatio = Math.round((htmlTokenEstimate / urlDirectTokens) * 100) / 100;
    metrics.efficiencyGain = `HTML fallback used ${efficiencyRatio}x more tokens than URL-direct would have`;

    console.log(`✅ SUCCESS: OpenAI HTML fallback completed in ${metrics.processingTime}ms`);
    console.log(`📊 Total tokens: ~${metrics.totalTokensEstimated} (HTML processing)`);

    return {
      recipe: {
        title: openaiResult.title,
        ingredients: openaiResult.ingredients,
        steps: openaiResult.steps,
        image: openaiResult.image,
        description: openaiResult.description,
        cuisine: openaiResult.cuisine,
        category: openaiResult.category,
        prepTime: openaiResult.prepTime,
        cleanupTime: openaiResult.cleanupTime
      },
      metrics
    };

  } catch (fallbackError) {
    metrics.processingTime = Date.now() - startTime;
    console.error(`❌ COMPLETE FAILURE: Both strategies failed for ${url}`);
    console.error(`Primary (Gemini URL-direct): ${metrics.primarySuccess ? 'Success' : 'Failed'}`);
    console.error(`Fallback (OpenAI HTML): Failed - ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`);

    throw new Error(`Recipe extraction failed completely. URL: ${url}. Primary strategy success: ${metrics.primarySuccess}. Fallback error: ${fallbackError instanceof Error ? fallbackError.message : 'Unknown error'}`);
  }
}

/**
 * Get a summary of extraction efficiency for monitoring
 */
export function getExtractionEfficiencySummary(metrics: ExtractionMetrics) {
  const strategy = metrics.primarySuccess ? 'Gemini URL-Direct' : 'OpenAI HTML Fallback';
  const efficiency = metrics.primarySuccess ? 'Ultra-High (99%+ token reduction)' : 'Standard (HTML processing)';
  
  return {
    strategy,
    efficiency,
    tokensUsed: metrics.totalTokensEstimated,
    processingTime: metrics.processingTime,
    fallbackRequired: metrics.fallbackUsed,
    recommendation: metrics.primarySuccess 
      ? 'Optimal performance achieved' 
      : 'Consider upgrading Gemini API plan for better efficiency'
  };
}

/**
 * Check system readiness for optimal extraction
 */
export function checkOptimizationReadiness() {
  const checks = {
    geminiUrlDirectEnabled: AI_SETTINGS.GEMINI.FULL_CONTEXT.ENABLE_URL_DIRECT,
    geminiApiKey: !!process.env.GOOGLE_API_KEY,
    openaiApiKey: !!process.env.OPENAI_API_KEY,
    fullContextEnabled: AI_SETTINGS.GEMINI.FULL_CONTEXT.ENABLE_FULL_HTML
  };

  const isOptimal = checks.geminiUrlDirectEnabled && checks.geminiApiKey;
  const hasFallback = checks.openaiApiKey;

  return {
    ...checks,
    isOptimal,
    hasFallback,
    recommendation: !isOptimal && hasFallback 
      ? 'Enable Gemini URL-direct for 99%+ efficiency gains'
      : !hasFallback 
      ? 'Configure OpenAI API key for fallback support'
      : 'System optimally configured'
  };
} 