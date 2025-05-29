import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { CategoryInitializationService } from '@/lib/services/category-initialization';
import { z } from 'zod';

const CategoryInitializationSchema = z.object({
  selectedCategories: z.array(z.string()).min(1, 'At least one category must be selected')
});

async function handler(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (request.method === 'POST') {
      // Apply category selections from onboarding
      const body = await request.json();
      
      // Validate request body
      const validation = CategoryInitializationSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { 
            error: 'Invalid request data',
            details: validation.error.errors
          },
          { status: 400 }
        );
      }

      const { selectedCategories } = validation.data;

      // Apply category selections
      const result = await CategoryInitializationService.applyOnboardingSelections(
        userId,
        selectedCategories
      );
      
      return NextResponse.json({
        success: true,
        result
      });
    }

    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );

  } catch (error: unknown) {
    console.error('Error in category initialization API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize categories',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// Export the handler directly since this is an onboarding endpoint
export const POST = handler; 