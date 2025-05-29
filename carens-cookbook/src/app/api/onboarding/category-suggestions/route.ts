import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { CategoryInitializationService } from '@/lib/services/category-initialization';

async function handler(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (request.method === 'GET') {
      // Get category suggestions for onboarding
      const suggestions = await CategoryInitializationService.getOnboardingRecommendations(userId);
      
      return NextResponse.json({
        success: true,
        suggestions
      });
    }

    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );

  } catch (error: unknown) {
    console.error('Error in category suggestions API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get category suggestions',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Export the handler directly since this is an onboarding endpoint
export const GET = handler; 