import { NextRequest, NextResponse } from 'next/server';
import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';
import { extractRecipeOptimized, checkOptimizationReadiness } from '@/lib/services/recipe-extraction-orchestrator';
import { ConversionAnalytics } from '@/lib/services/conversionAnalytics';
import { ConversionEventType, ExtractionStrategy, AIProvider } from '@/generated/prisma';
import { auth } from '@clerk/nextjs/server';
import { InternalRecipeAnalytics } from '@/lib/services/internal-recipe-analytics';

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

// Helper function to validate image URL
async function validateImageUrl(url: string | null): Promise<string | null> {
  if (!url) return null;
  
  try {
    console.log(`🔍 Validating image URL: ${url}`);
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, { 
      method: 'HEAD', // Only get headers, not the full image
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok && response.headers.get('content-type')?.startsWith('image/')) {
      console.log(`✅ Image URL valid: ${url}`);
      return url;
    } else {
      console.warn(`❌ Image URL invalid (${response.status}): ${url}`);
      return null;
    }
  } catch (error) {
    console.warn(`❌ Image URL validation failed: ${url}`, error);
    return null;
  }
}

// Progress event helper
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

export const POST = withOnboardingGuard(async (request: NextRequest) => {
  const { url, forceStrategy, geminiProvider = 'gemini-pro', openaiProvider = 'openai-main', sessionId } = await request.json();

  if (!url) {
    return NextResponse.json(
      { success: false, error: 'URL is required' },
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
    // Continue without analytics rather than failing the request
    sessionContext = null;
  }

  // Check rate limits for anonymous users
  if (!userId && sessionContext) {
    const rateLimitResult = await ConversionAnalytics.checkRateLimit(sessionContext.sessionId);
    if (!rateLimitResult.allowed) {
      // Track rate limit hit
      await ConversionAnalytics.trackRateLimitHit(sessionContext.sessionId, {
        recipeUrl: url,
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
        console.log(`🎯 STREAMING EXTRACTION: Processing ${url}`);
        console.log(`📊 System readiness:`, checkOptimizationReadiness());

        // Initial connection message
        controller.enqueue(encoder.encode(createProgressEvent(0, "🔗 Connecting to the recipe...", { strategy: 'initializing' })));

        // Create a custom progress callback for the orchestrator
        const progressCallback = (progress: number, message: string, data?: Record<string, unknown>) => {
          console.log(`📊 Progress: ${progress}% - ${message}`);
          controller.enqueue(encoder.encode(createProgressEvent(progress, message, data)));
        };

        // Use the optimized orchestrator with progress tracking
        const { recipe, metrics } = await extractRecipeOptimizedWithProgress(url, {
          forceStrategy,
          geminiProvider,
          openaiProvider,
          timeoutMs: 45000,
          progressCallback
        });

        // Fix and validate image URL if present
        if (recipe.image) {
          const fixedImageUrl = fixImageUrl(recipe.image, url);
          recipe.image = await validateImageUrl(fixedImageUrl);
        }

        const efficiencySummary = {
          efficiency: metrics.primarySuccess ? 'Ultra-Efficient' : 'Traditional',
          tokensUsed: metrics.totalTokensEstimated,
          processingTime: metrics.processingTime
        };

        // 📊 SAVE INTERNAL RECIPE DATA FOR BUSINESS INTELLIGENCE (Both authenticated & anonymous)
        try {
          const extractionStrategy = metrics.primarySuccess ? ExtractionStrategy.URL_DIRECT : ExtractionStrategy.HTML_FALLBACK;
          const aiProvider = metrics.primarySuccess ? AIProvider.GEMINI_FLASH : AIProvider.OPENAI_MAIN;
          
          await InternalRecipeAnalytics.saveRecipeData({
            // Basic recipe info
            title: recipe.title,
            
            // Source context
            sourceUrl: url,
            
            // Processing method
            extractionStrategy,
            aiProvider,
            
            // Performance metrics
            totalProcessingTimeMs: metrics.processingTime,
            fetchTimeMs: Math.floor(metrics.processingTime * 0.2), // Estimate 20% for fetch
            parseTimeMs: Math.floor(metrics.processingTime * 0.3), // Estimate 30% for parsing
            aiTimeMs: Math.floor(metrics.processingTime * 0.5)     // Estimate 50% for AI processing
          });
          
          console.log(`📊 Internal recipe data saved for analysis: ${recipe.title}`);
        } catch (internalDataError) {
          console.error('Failed to save internal recipe data (non-blocking):', internalDataError);
          // Don't fail the request for internal analytics errors
        }

        // Track successful extraction
        if (sessionContext) {
          try {
            // Increment rate limit counter
            await ConversionAnalytics.incrementRateLimit(sessionContext.sessionId, userId || undefined);
            
            // Track extraction event
            await ConversionAnalytics.trackEvent(
              sessionContext.sessionId,
              ConversionEventType.RECIPE_EXTRACTED,
              {
                recipeUrl: url,
                strategy: metrics.primarySuccess ? 'gemini-url-direct' : 'openai-html-fallback',
                tokensUsed: metrics.totalTokensEstimated,
                processingTime: metrics.processingTime,
                fallbackUsed: metrics.fallbackUsed
              },
              userId || undefined
            );

            // Check if user should see signup prompt (anonymous users who have extracted recipes)
            if (!userId) {
              const rateLimitResult = await ConversionAnalytics.checkRateLimit(sessionContext.sessionId);
              if (rateLimitResult.remainingRequests <= 5) {
                // Show signup prompt when getting close to limit
                await ConversionAnalytics.trackSignupPromptShown(sessionContext.sessionId, {
                  recipeUrl: url,
                  remainingRequests: rateLimitResult.remainingRequests,
                  trigger: 'approaching_limit'
                });
              }
            }
          } catch (analyticsError) {
            console.error('Analytics tracking failed:', analyticsError);
            // Don't fail the request for analytics errors
          }
        }

        // Send success event
        controller.enqueue(encoder.encode(createSuccessEvent(recipe, {
          strategy: metrics.primarySuccess ? 'gemini-url-direct' : 'openai-html-fallback',
          efficiency: efficiencySummary.efficiency,
          tokensUsed: metrics.totalTokensEstimated,
          processingTime: metrics.processingTime,
          fallbackUsed: metrics.fallbackUsed,
          efficiencyGain: metrics.efficiencyGain,
          recommendation: efficiencySummary.efficiency === 'Ultra-Efficient' ? 
            'Perfect! Used our fastest method' : 
            'Successfully extracted using our reliable backup method',
          // Include rate limit info for anonymous users
          rateLimitInfo: !userId && sessionContext ? await ConversionAnalytics.checkRateLimit(sessionContext.sessionId) : undefined
        })));

        console.log(`✅ STREAMING SUCCESS: Strategy=${metrics.primarySuccess ? 'Gemini URL-Direct' : 'OpenAI HTML Fallback'}`);

      } catch (error) {
        console.error('🚨 STREAMING EXTRACTION ERROR:', error);
        controller.enqueue(encoder.encode(createErrorEvent(
          error instanceof Error ? error.message : 'Unknown error occurred'
        )));
      } finally {
        controller.close();
      }
    }
  });

  return new NextResponse(stream, { headers: responseHeaders });
});

// Enhanced orchestrator with progress tracking
async function extractRecipeOptimizedWithProgress(
  url: string, 
  options: {
    forceStrategy?: 'url-direct' | 'html-fallback';
    geminiProvider?: string;
    openaiProvider?: string;
    timeoutMs?: number;
    progressCallback: (progress: number, message: string, data?: Record<string, unknown>) => void;
  }
) {
  const { forceStrategy, geminiProvider = 'gemini-pro', openaiProvider = 'openai-main', timeoutMs = 15000, progressCallback } = options;

  const metrics = {
    primaryStrategy: 'gemini-url-direct' as const,
    primarySuccess: false,
    fallbackUsed: false,
    totalTokensEstimated: 0,
    processingTime: 0,
    url
  };

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
      
      // Don't wait after the last message
      if (i < messages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    }
  };

  // Strategy 1: Gemini URL-Direct (PRIMARY)
  if (forceStrategy !== 'html-fallback') {
    const shouldTryUrlDirect = forceStrategy === 'url-direct' || true; // Simplified for now

    if (shouldTryUrlDirect) {
      try {
        // Rotating messages for the longest Gemini processing stage
        const geminiProcessingMessages = [
          "🤖 Our AI chef is reading the recipe...",
          "👀 Scanning for the perfect ingredients...",
          "📖 Understanding the cooking steps...",
          "🧠 Memorizing all the delicious details...",
          "⚡ Almost got it figured out...",
          "✨ Just putting the finishing touches..."
        ];

        // Start the rotating messages (25% to 70%)
        const messagePromise = showRotatingMessages(
          geminiProcessingMessages, 
          25, 
          45, // 70% - 25% = 45% progress range
          2000, // 2 seconds between messages
          { strategy: 'url-direct' }
        );

        // Start the actual processing
        const processingPromise = extractRecipeOptimized(url, {
          forceStrategy: 'url-direct',
          geminiProvider: geminiProvider as never,
          openaiProvider: openaiProvider as never,
          timeoutMs
        });

        // Wait for both to complete (processing might finish before all messages)
        const [result] = await Promise.all([processingPromise, messagePromise]);

        progressCallback(75, "📝 Organizing ingredients and steps...", { strategy: 'url-direct' });
        
        // Small delay to show the progress
        await new Promise(resolve => setTimeout(resolve, 500));
        
        progressCallback(100, "✨ Recipe ready!", { strategy: 'url-direct' });

        return result;

      } catch (error) {
        console.warn(`⚠️ Gemini URL-direct failed:`, error instanceof Error ? error.message : 'Unknown error');
        
        // Fallback message
        progressCallback(30, "This recipe is extra tricky, but don't worry - we've got this! 💪", { 
          strategy: 'fallback-starting' 
        });
        
        metrics.fallbackUsed = true;
        // Continue to fallback
      }
    }
  }

  // Strategy 2: OpenAI HTML Fallback
  try {
    progressCallback(15, "🌐 Fetching the full recipe page...", { strategy: 'html-fallback' });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    progressCallback(30, "🧹 Cleaning up the webpage...", { strategy: 'html-fallback' });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    progressCallback(45, "🔍 Looking for the good stuff...", { strategy: 'html-fallback' });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Rotating messages for the longest OpenAI processing stage
    const openaiProcessingMessages = [
      "🤖 Our backup AI chef is stepping in...",
      "🔬 Analyzing the recipe structure...",
      "🍯 Extracting the sweet details...",
      "👨‍🍳 Carefully reading every ingredient...",
      "📝 Writing down all the steps...",
      "🎯 Almost there, perfecting the recipe..."
    ];

    // Start the rotating messages (45% to 80%)
    const messagePromise = showRotatingMessages(
      openaiProcessingMessages, 
      45, 
      35, // 80% - 45% = 35% progress range
      2000, // 2 seconds between messages
      { strategy: 'html-fallback' }
    );

    // Start the actual processing
    const processingPromise = extractRecipeOptimized(url, {
      forceStrategy: 'html-fallback',
      geminiProvider: geminiProvider as never,
      openaiProvider: openaiProvider as never,
      timeoutMs
    });

    // Wait for both to complete
    const [result] = await Promise.all([processingPromise, messagePromise]);

    progressCallback(85, "👨‍🍳 Extracting all the delicious details...", { strategy: 'html-fallback' });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    progressCallback(100, "✨ Putting the finishing touches...", { strategy: 'html-fallback' });

    return result;

  } catch (error) {
    throw new Error(`Recipe extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 