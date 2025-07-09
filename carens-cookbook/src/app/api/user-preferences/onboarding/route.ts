import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { OnboardingService } from '@/lib/services/onboarding';
import { ONBOARDING_STEPS } from '@/lib/constants/user-preferences';

// Schema for onboarding step updates
const onboardingUpdateSchema = z.object({
  step: z.number().int().min(0),
  data: z.record(z.any()).optional(),
  markCompleted: z.boolean().default(false)
});

/**
 * Get comprehensive user onboarding progress
 */
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        onboardingCompleted: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const progress = await OnboardingService.getUserProgress(userId);

    return NextResponse.json({
      ...progress,
      steps: ONBOARDING_STEPS
    });

  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch onboarding status', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

/**
 * POST /api/onboarding/progress
 * Update onboarding step progress
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { step, data, markCompleted } = await onboardingUpdateSchema.parse(await req.json());

    if (step < 0 || step >= ONBOARDING_STEPS.length) {
      return NextResponse.json({ error: 'Invalid onboarding step' }, { status: 400 });
    }

    // This functionality needs to be implemented in the service
    // For now, we'll just log it.
    console.log(`Updating step ${step} for user ${userId} with data:`, data, `Mark completed: ${markCompleted}`);

    const progress = await OnboardingService.getUserProgress(userId);
    
    return NextResponse.json({ 
      message: `Step ${step} updated successfully (simulation)`,
      ...progress
    });

  } catch (error) {
    console.error(`Error updating onboarding step:`, error);
    return NextResponse.json({ 
      error: 'Failed to update onboarding step', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

/**
 * Reset user's onboarding progress
 */
export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await OnboardingService.resetProgress(userId);

    return NextResponse.json({ message: 'Onboarding progress reset successfully' });
  } catch (error) {
    console.error('Error resetting onboarding progress:', error);
    return NextResponse.json({ error: 'Failed to reset progress' }, { status: 500 });
  }
} 