import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { OnboardingService } from '@/lib/services/onboarding';

/**
 * GET /api/onboarding/progress
 * Get comprehensive user onboarding progress
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const progress = await OnboardingService.getUserProgress(userId);
    
    return NextResponse.json({
      progress,
      message: 'Onboarding progress retrieved successfully'
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching onboarding progress:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to fetch onboarding progress', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

/**
 * DELETE /api/onboarding/progress
 * Reset user's onboarding progress
 */
export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await OnboardingService.resetProgress(userId);
    
    return NextResponse.json({
      message: 'Onboarding progress reset successfully'
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error resetting onboarding progress:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to reset onboarding progress', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 