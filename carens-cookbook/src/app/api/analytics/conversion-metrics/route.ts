import { NextRequest, NextResponse } from 'next/server';
import { ConversionAnalytics } from '@/lib/services/conversionAnalytics';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    // For now, allow access (in production you'd check admin permissions)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const metrics = await ConversionAnalytics.getConversionMetrics(days);

    if (!metrics) {
      return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: metrics,
      metadata: {
        period: `${days} days`,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Conversion metrics API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 