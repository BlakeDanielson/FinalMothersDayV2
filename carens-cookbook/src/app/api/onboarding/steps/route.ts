import { NextResponse } from 'next/server';

/**
 * GET /api/onboarding/steps
 * Retrieve all available onboarding steps with metadata
 */
export async function GET() {
  try {
    return NextResponse.json({
      message: 'Onboarding steps endpoint is working',
      steps: [],
      totalSteps: 0
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching onboarding steps:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to fetch onboarding steps', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 