import { NextRequest, NextResponse } from 'next/server';
import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';
import { extractRecipeOptimized, checkOptimizationReadiness } from '@/lib/services/recipe-extraction-orchestrator';

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
  const { url, forceStrategy, geminiProvider = 'gemini-pro', openaiProvider = 'openai-main' } = await request.json();

  if (!url) {
    return NextResponse.json(
      { success: false, error: 'URL is required' },
      { status: 400 }
    );
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

        // Fix image URL if present
        if (recipe.image) {
          recipe.image = fixImageUrl(recipe.image, url);
        }

        const efficiencySummary = {
          efficiency: metrics.primarySuccess ? 'Ultra-Efficient' : 'Traditional',
          tokensUsed: metrics.totalTokensEstimated,
          processingTime: metrics.processingTime
        };

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
            'Successfully extracted using our reliable backup method'
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
  const { forceStrategy, geminiProvider = 'gemini-pro', openaiProvider = 'openai-main', timeoutMs = 45000, progressCallback } = options;

  const metrics = {
    primaryStrategy: 'gemini-url-direct' as const,
    primarySuccess: false,
    fallbackUsed: false,
    totalTokensEstimated: 0,
    processingTime: 0,
    url
  };

  // Strategy 1: Gemini URL-Direct (PRIMARY)
  if (forceStrategy !== 'html-fallback') {
    const shouldTryUrlDirect = forceStrategy === 'url-direct' || true; // Simplified for now

    if (shouldTryUrlDirect) {
      try {
        progressCallback(25, "🤖 Our AI chef is reading the recipe...", { strategy: 'url-direct' });
        
        // Use the existing orchestrator but intercept its calls
        const result = await extractRecipeOptimized(url, {
          forceStrategy: 'url-direct',
          geminiProvider: geminiProvider as never,
          openaiProvider: openaiProvider as never,
          timeoutMs
        });

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
    
    progressCallback(65, "🤖 Our backup AI chef is stepping in...", { strategy: 'html-fallback' });
    
    // Use the existing orchestrator for fallback
    const result = await extractRecipeOptimized(url, {
      forceStrategy: 'html-fallback',
      geminiProvider: geminiProvider as never,
      openaiProvider: openaiProvider as never,
      timeoutMs
    });

    progressCallback(85, "👨‍🍳 Extracting all the delicious details...", { strategy: 'html-fallback' });
    await new Promise(resolve => setTimeout(resolve, 300));
    
    progressCallback(100, "✨ Putting the finishing touches...", { strategy: 'html-fallback' });

    return result;

  } catch (error) {
    throw new Error(`Recipe extraction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 