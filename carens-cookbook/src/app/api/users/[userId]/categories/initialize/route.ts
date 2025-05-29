import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { CategoryInitializationService } from '@/lib/services/category-initialization';
import { UserCategoryManager } from '@/lib/services/user-category-manager';
import { z } from 'zod';

const ManualInitializationSchema = z.object({
  selectedCategories: z.array(z.string()).optional(),
  forceReset: z.boolean().optional().default(false)
});

interface RouteParams {
  params: {
    userId: string;
  };
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { userId: authUserId } = await auth();
    const { userId } = params;
    
    if (!authUserId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Ensure user can only initialize their own categories or is admin
    if (authUserId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Cannot initialize categories for another user' },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Validate request body
    const validation = ManualInitializationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: validation.error.errors
        },
        { status: 400 }
      );
    }

    const { selectedCategories, forceReset } = validation.data;

    // Check if user already has categories and forceReset is not true
    const existingCategories = await UserCategoryManager.getUserCategories(userId);
    
    if (existingCategories.length > 0 && !forceReset) {
      return NextResponse.json(
        { 
          error: 'User already has categories initialized',
          message: 'Use forceReset: true to reinitialize categories',
          existingCategories
        },
        { status: 409 }
      );
    }

    let result;

    if (selectedCategories && selectedCategories.length > 0) {
      // Use provided categories
      result = await UserCategoryManager.bulkUpdateCategories(userId, selectedCategories);
    } else {
      // Use smart initialization based on user preferences
      const initResult = await CategoryInitializationService.getOnboardingRecommendations(userId);
      const recommendedCategories = initResult
        .filter(suggestion => suggestion.isRecommended)
        .map(suggestion => suggestion.name);
      
      if (recommendedCategories.length === 0) {
        // Fallback to default categories
        const defaultCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
        result = await UserCategoryManager.bulkUpdateCategories(userId, defaultCategories);
      } else {
        result = await UserCategoryManager.bulkUpdateCategories(userId, recommendedCategories);
      }
    }

    if (!result.success) {
      return NextResponse.json(
        { 
          error: 'Failed to initialize categories',
          details: result.error
        },
        { status: 500 }
      );
    }

    // Log successful initialization
    console.log(`Manual category initialization completed for user: ${userId}, categories: ${result.categories?.length}`);

    return NextResponse.json({
      success: true,
      message: result.message,
      categories: result.categories,
      initialized: true
    });

  } catch (error: unknown) {
    console.error('Error in manual category initialization API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize categories',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { userId: authUserId } = await auth();
    const { userId } = params;
    
    if (!authUserId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Ensure user can only check their own categories or is admin
    if (authUserId !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized: Cannot access another user\'s categories' },
        { status: 403 }
      );
    }

    // Get current categories and stats
    const categories = await UserCategoryManager.getUserCategories(userId);
    const stats = await UserCategoryManager.getCategoryStats(userId);

    return NextResponse.json({
      success: true,
      isInitialized: categories.length > 0,
      categories,
      stats
    });

  } catch (error: unknown) {
    console.error('Error checking category initialization status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to check initialization status',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 