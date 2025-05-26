import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { OnboardingService } from '@/lib/services/onboarding';

// Schema for step completion data
const stepCompletionSchema = z.object({
  data: z.record(z.unknown()).optional()
});

/**
 * POST /api/onboarding/steps/[stepId]/complete
 * Mark a specific onboarding step as completed
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

    // Parse request body
    let body = {};
    try {
      body = await req.json();
    } catch {
      // Empty body is fine for step completion
    }

    const validatedData = stepCompletionSchema.parse(body);

    // Mark step as completed
    const stepProgress = await OnboardingService.markStepCompleted(
      userId, 
      stepId, 
      validatedData.data
    );

    // Get updated progress
    const userProgress = await OnboardingService.getUserProgress(userId);

    return NextResponse.json({
      message: `Step ${stepId} marked as completed`,
      stepProgress: {
        stepId: stepProgress.stepId,
        stepKey: stepProgress.stepKey,
        completedAt: stepProgress.completedAt,
        hasData: !!stepProgress.data
      },
      userProgress: {
        currentStep: userProgress.currentStep,
        nextStep: userProgress.nextStep,
        progressPercentage: userProgress.progressPercentage,
        isCompleted: userProgress.isCompleted
      }
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid step completion data', 
        details: error.format() 
      }, { status: 400 });
    }

    console.error('Error completing onboarding step:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to complete onboarding step', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 