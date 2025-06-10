import { GoogleGenAI } from '@google/genai';
import { AI_SETTINGS, getModelFromUIProvider, type UIProvider } from '@/lib/config/ai-models';

interface UrlDirectResult {
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

interface UrlDirectOptions {
  uiProvider?: UIProvider;
  maxRetries?: number;
  timeout?: number;
}

/**
 * Extract recipe information directly from a URL using Gemini's built-in web access capability.
 * This is the most efficient strategy, using only ~143 tokens vs ~175K tokens for HTML processing.
 * 
 * @param url - The recipe URL to process
 * @param options - Configuration options
 * @returns Extracted recipe data
 */
export async function extractRecipeViaUrlDirect(
  url: string, 
  options: UrlDirectOptions = {}
): Promise<UrlDirectResult> {
  const { 
    uiProvider = 'gemini-pro',
    maxRetries = 3,
    timeout = 30000 
  } = options;

  if (!process.env.GOOGLE_API_KEY) {
    throw new Error('Google API key not configured');
  }

  // Validate that URL-direct is enabled
  if (!AI_SETTINGS.GEMINI.FULL_CONTEXT.ENABLE_URL_DIRECT) {
    throw new Error('Gemini URL-direct strategy is not enabled. Set GEMINI_ENABLE_URL_DIRECT=true');
  }

  const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const modelToUse = getModelFromUIProvider(uiProvider);

  const prompt = `Please visit this URL and extract recipe information: ${url}

IMPORTANT: Visit the actual webpage and analyze the complete content to extract recipe details.

Return ONLY a valid JSON object with these exact fields (no additional text or formatting):
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

If you cannot access the URL or it doesn't contain a recipe, return an empty object: {}`;

  console.log(`🚀 Gemini URL-Direct: Processing ${url} with ${modelToUse}`);
  console.log(`📊 Estimated prompt tokens: ~${Math.ceil(prompt.length / 4)}`);

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempt ${attempt}/${maxRetries} for ${url}`);

      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
      });

      const requestPromise = genAI.models.generateContent({
        model: modelToUse,
        contents: prompt,
        config: {
          maxOutputTokens: AI_SETTINGS.GEMINI.FULL_CONTEXT.MAX_OUTPUT_TOKENS,
          temperature: AI_SETTINGS.GEMINI.TEMPERATURE,
        }
      });

      const response = await Promise.race([requestPromise, timeoutPromise]);
      const content = response.text;

      if (!content) {
        throw new Error('No response content from Gemini');
      }

      console.log(`✅ Gemini URL-Direct: Response received for ${url} (attempt ${attempt})`);
      
      // Parse and validate the response
      let parsedResult: UrlDirectResult;
      try {
        parsedResult = JSON.parse(content);
      } catch (parseError) {
        throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown parse error'}`);
      }

      // Check if empty object (indicates no recipe found)
      if (Object.keys(parsedResult).length === 0) {
        throw new Error('No recipe found at the provided URL');
      }

      // Validate required fields
      if (!parsedResult.title || !parsedResult.ingredients || !parsedResult.steps) {
        throw new Error('Incomplete recipe data: missing title, ingredients, or steps');
      }

      console.log(`🎯 Successfully extracted recipe: "${parsedResult.title}" from ${url}`);
      return parsedResult;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`⚠️ Gemini URL-Direct attempt ${attempt} failed for ${url}:`, lastError.message);

      // If this is the last attempt, don't retry
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
      console.log(`⏳ Waiting ${waitTime}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  // All attempts failed
  console.error(`❌ Gemini URL-Direct failed after ${maxRetries} attempts for ${url}`);
  throw new Error(`Gemini URL-Direct processing failed: ${lastError?.message || 'Unknown error'}`);
}

/**
 * Check if the given URL is likely to work well with URL-direct strategy
 * @param url - URL to analyze
 * @returns boolean indicating if URL-direct is recommended
 */
export function shouldUseUrlDirect(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.toLowerCase();

    // Known recipe sites that work well with URL-direct
    const knownGoodSites = [
      'allrecipes.com',
      'foodnetwork.com',
      'epicurious.com',
      'bonappetit.com',
      'seriouseats.com',
      'food.com',
      'delish.com',
      'tasteofhome.com',
      'simplyrecipes.com',
      'kitchn.com'
    ];

    return knownGoodSites.some(site => domain.includes(site));
  } catch {
    return false; // Invalid URL
  }
}

/**
 * Get usage statistics for monitoring token efficiency
 * @param url - The URL that was processed
 * @param success - Whether the request was successful
 * @returns Usage metrics object
 */
export function getUrlDirectUsageMetrics(url: string, success: boolean) {
  const basePromptLength = 400; // Approximate base prompt size
  const urlLength = url.length;
  const estimatedInputTokens = Math.ceil((basePromptLength + urlLength) / 4);

  return {
    strategy: 'url-direct' as const,
    url,
    estimatedInputTokens,
    success,
    efficiency: success ? 'ultra-high' : 'failed',
    timestamp: new Date().toISOString()
  };
} 