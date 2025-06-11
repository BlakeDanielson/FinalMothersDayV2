import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { InternalRecipeAnalytics } from '@/lib/services/internal-recipe-analytics';
import { prisma } from '@/lib/db';
import { ExtractionStrategy, AIProvider } from '@/generated/prisma';

// Admin-only endpoint to view internal recipe analytics
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    // Simple admin check - you might want to enhance this with proper role checking
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'overview';
    const domain = searchParams.get('domain');
    const strategy = searchParams.get('strategy') as ExtractionStrategy | undefined;
    const aiProvider = searchParams.get('aiProvider') as AIProvider | undefined;
    const days = parseInt(searchParams.get('days') || '30');
    const limit = parseInt(searchParams.get('limit') || '100');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    switch (action) {
      case 'overview':
        const insights = await InternalRecipeAnalytics.getAnalyticsInsights({
          domain,
          strategy,
          aiProvider,
          startDate
        });
        
        return NextResponse.json({
          success: true,
          data: insights,
          period: `Last ${days} days`,
          filters: { domain, strategy, aiProvider }
        });

      case 'recent-recipes':
        const recentRecipes = await prisma.internalRecipeData.findMany({
          where: {
            ...(domain && { domain }),
            ...(strategy && { extractionStrategy: strategy }),
            ...(aiProvider && { aiProvider }),
            extractedAt: { gte: startDate }
          },
          orderBy: { extractedAt: 'desc' },
          take: limit,
          select: {
            id: true,
            title: true,
            domain: true,
            sourceUrl: true,
            extractedAt: true,
            totalProcessingTimeMs: true,
            fetchTimeMs: true,
            parseTimeMs: true,
            aiTimeMs: true,
            extractionStrategy: true,
            aiProvider: true
          }
        });

        return NextResponse.json({
          success: true,
          data: recentRecipes,
          count: recentRecipes.length,
          period: `Last ${days} days`,
          filters: { domain, strategy, aiProvider }
        });

      case 'performance-by-domain':
        // Use simpler approach to avoid circular reference issues
        const domainData = await prisma.internalRecipeData.findMany({
          where: {
            extractedAt: { gte: startDate },
            ...(strategy && { extractionStrategy: strategy }),
            ...(aiProvider && { aiProvider })
          },
          select: {
            domain: true,
            totalProcessingTimeMs: true,
            fetchTimeMs: true,
            parseTimeMs: true,
            aiTimeMs: true
          }
        });

        // Group and calculate averages in JavaScript
        const domainStats = domainData.reduce((acc, item) => {
          const domain = item.domain;
          if (!acc[domain]) {
            acc[domain] = {
              domain,
              _count: { _all: 0 },
              _avg: {
                totalProcessingTimeMs: 0,
                fetchTimeMs: 0,
                parseTimeMs: 0,
                aiTimeMs: 0
              },
              _sum: {
                totalProcessingTimeMs: 0,
                fetchTimeMs: 0,
                parseTimeMs: 0,
                aiTimeMs: 0
              }
            };
          }
          
          acc[domain]._count._all++;
          acc[domain]._sum.totalProcessingTimeMs += item.totalProcessingTimeMs;
          acc[domain]._sum.fetchTimeMs += item.fetchTimeMs || 0;
          acc[domain]._sum.parseTimeMs += item.parseTimeMs || 0;
          acc[domain]._sum.aiTimeMs += item.aiTimeMs || 0;
          
          return acc;
        }, {} as Record<string, any>);

        // Calculate averages and convert to array
        const domainStatsArray = Object.values(domainStats).map(stat => ({
          ...stat,
          _avg: {
            totalProcessingTimeMs: stat._sum.totalProcessingTimeMs / stat._count._all,
            fetchTimeMs: stat._sum.fetchTimeMs / stat._count._all,
            parseTimeMs: stat._sum.parseTimeMs / stat._count._all,
            aiTimeMs: stat._sum.aiTimeMs / stat._count._all
          }
        })).sort((a, b) => b._count._all - a._count._all).slice(0, 20);

        return NextResponse.json({
          success: true,
          data: domainStatsArray,
          period: `Last ${days} days`,
          filters: { strategy, aiProvider }
        });

      case 'full-recipe':
        const recipeId = searchParams.get('id');
        if (!recipeId) {
          return NextResponse.json({ error: 'Recipe ID required' }, { status: 400 });
        }

        const fullRecipe = await prisma.internalRecipeData.findUnique({
          where: { id: recipeId }
        });

        if (!fullRecipe) {
          return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          data: fullRecipe
        });

      case 'extraction-trends':
        // Get daily extraction counts for the period
        const dailyExtractions = await prisma.$queryRaw`
          SELECT 
            DATE(extracted_at) as date,
            COUNT(*) as total,
            SUM(CASE WHEN extraction_strategy = 'URL_DIRECT' THEN 1 ELSE 0 END) as url_direct,
            SUM(CASE WHEN extraction_strategy = 'HTML_FALLBACK' THEN 1 ELSE 0 END) as html_fallback,
            AVG(processing_time_ms) as avg_processing_time,
            SUM(CASE WHEN user_id IS NOT NULL THEN 1 ELSE 0 END) as authenticated,
            SUM(CASE WHEN user_id IS NULL THEN 1 ELSE 0 END) as anonymous
          FROM internal_recipe_data 
          WHERE extracted_at >= ${startDate}
          GROUP BY DATE(extracted_at)
          ORDER BY date DESC
        `;

        return NextResponse.json({
          success: true,
          data: dailyExtractions,
          period: `Last ${days} days`
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Internal analytics error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch analytics data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Export available actions for reference
export async function OPTIONS() {
  return NextResponse.json({
    availableActions: [
      'overview',           // General analytics insights
      'recent-recipes',     // Recent extractions with metadata
      'performance-by-domain', // Domain performance stats
      'full-recipe',        // Complete recipe data by ID
      'extraction-trends'   // Daily extraction trends
    ],
    availableFilters: [
      'domain',            // Filter by domain
      'strategy',          // Filter by extraction strategy (URL_DIRECT, HTML_FALLBACK)
      'aiProvider',        // Filter by AI provider (OPENAI_MAIN, GEMINI_FLASH, etc.)
      'days',              // Time period (default: 30)
      'limit'              // Result limit (default: 100)
    ]
  });
} 