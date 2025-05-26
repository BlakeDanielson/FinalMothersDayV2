import { NextResponse } from 'next/server';
import { OnboardingService } from '@/lib/services/onboarding';

/**
 * GET /api/onboarding/steps
 * Retrieve all available onboarding steps with metadata
 */
export async function GET() {
  try {
    const steps = OnboardingService.getOnboardingSteps();
    
    return NextResponse.json({
      steps,
      totalSteps: steps.length,
      requiredSteps: steps.filter(s => s.isRequired).length,
      optionalSteps: steps.filter(s => s.isOptional).length
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching onboarding steps:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to fetch onboarding steps', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 