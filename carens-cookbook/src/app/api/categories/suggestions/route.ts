import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';
import { CategorySuggestionEngine } from '@/lib/services/CategorySuggestionEngine';
import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';
import { z } from 'zod';

const prisma = new PrismaClient();

const SuggestionRequestSchema = z.object({
  title: z.string().min(1, 'Recipe title is required'),
  ingredients: z.array(z.string()).optional(),
  instructions: z.array(z.string()).optional(),
  description: z.string().optional(),
  maxSuggestions: z.number().min(1).max(10).optional(),
  minConfidence: z.number().min(0).max(1).optional(),
  includeUserCategories: z.boolean().optional()
});

export const POST = withOnboardingGuard(async (request: NextRequest) => {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = SuggestionRequestSchema.parse(body);

    const suggestionEngine = new CategorySuggestionEngine(prisma);
    
    const suggestions = await suggestionEngine.suggestCategories(
      {
        title: validatedData.title,
        ingredients: validatedData.ingredients,
        instructions: validatedData.instructions,
        description: validatedData.description
      },
      {
        maxSuggestions: validatedData.maxSuggestions || 5,
        minConfidence: validatedData.minConfidence || 0.3,
        includeUserCategories: validatedData.includeUserCategories ?? true,
        userId
      }
    );

    return NextResponse.json({
      success: true,
      suggestions,
      metadata: {
        totalSuggestions: suggestions.length,
        cacheStats: suggestionEngine.getCacheStats(),
        userId
      }
    });

  } catch (error) {
    console.error('Category suggestion error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors 
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
});

// GET endpoint for testing with query parameters
export const GET = withOnboardingGuard(async (request: NextRequest) => {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    
    if (!title) {
      return NextResponse.json({ error: 'Title parameter is required' }, { status: 400 });
    }

    const suggestionEngine = new CategorySuggestionEngine(prisma);
    
    const suggestions = await suggestionEngine.suggestCategories(
      { title },
      { userId, maxSuggestions: 3 }
    );

    return NextResponse.json({
      success: true,
      suggestions,
      metadata: {
        totalSuggestions: suggestions.length,
        cacheStats: suggestionEngine.getCacheStats()
      }
    });

  } catch (error) {
    console.error('Category suggestion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}); 