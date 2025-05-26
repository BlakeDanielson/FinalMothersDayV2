import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { OnboardingService } from '@/lib/services/onboarding';

/**
 * GET /api/onboarding/next
 * Get the next incomplete onboarding step for the user
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const nextStep = await OnboardingService.getNextStep(userId);
    const userProgress = await OnboardingService.getUserProgress(userId);

    if (!nextStep) {
      return NextResponse.json({
        message: 'Onboarding completed - no next step',
        nextStep: null,
        userProgress: {
          currentStep: userProgress.currentStep,
          progressPercentage: userProgress.progressPercentage,
          isCompleted: userProgress.isCompleted
        }
      }, { status: 200 });
    }

    return NextResponse.json({
      message: 'Next step retrieved successfully',
      nextStep,
      userProgress: {
        currentStep: userProgress.currentStep,
        progressPercentage: userProgress.progressPercentage,
        isCompleted: userProgress.isCompleted
      }
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching next onboarding step:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to fetch next onboarding step', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 