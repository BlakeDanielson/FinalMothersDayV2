import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { RecipeExtractionAnalytics } from '@/lib/services/recipe-extraction-analytics';

// GET /api/analytics/extraction-metrics
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const scope = searchParams.get('scope') || 'user'; // 'user' or 'system'

    if (scope === 'system') {
      // System-wide analytics (for admin users potentially)
      const systemAnalytics = await RecipeExtractionAnalytics.getSystemAnalytics(days);
      return NextResponse.json(systemAnalytics);
    } else {
      // User-specific analytics
      const userAnalytics = await RecipeExtractionAnalytics.getUserAnalytics(userId, days);
      return NextResponse.json(userAnalytics);
    }

  } catch (error) {
    console.error('Error fetching extraction metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch extraction metrics' },
      { status: 500 }
    );
  }
} 