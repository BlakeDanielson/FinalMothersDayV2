import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { OnboardingService } from '@/lib/services/onboarding';

/**
 * POST /api/onboarding/steps/[stepId]/skip
 * Mark a specific onboarding step as skipped
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ stepId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const stepId = parseInt(resolvedParams.stepId);
    if (isNaN(stepId)) {
      return NextResponse.json({ 
        error: 'Invalid step ID', 
        details: 'Step ID must be a valid number' 
      }, { status: 400 });
    }

    // Mark step as skipped
    const stepProgress = await OnboardingService.markStepSkipped(userId, stepId);

    // Get updated progress
    const userProgress = await OnboardingService.getUserProgress(userId);

    return NextResponse.json({
      message: `Step ${stepId} marked as skipped`,
      stepProgress: {
        stepId: stepProgress.stepId,
        stepKey: stepProgress.stepKey,
        skippedAt: stepProgress.skippedAt
      },
      userProgress: {
        currentStep: userProgress.currentStep,
        nextStep: userProgress.nextStep,
        progressPercentage: userProgress.progressPercentage,
        isCompleted: userProgress.isCompleted
      }
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error skipping onboarding step:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to skip onboarding step', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 