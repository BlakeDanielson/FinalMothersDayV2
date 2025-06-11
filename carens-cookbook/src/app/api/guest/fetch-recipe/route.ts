import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractRecipeOptimized } from '@/lib/services/recipe-extraction-orchestrator';

const fetchRecipeSchema = z.object({
  url: z.string().url('Please provide a valid URL')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = fetchRecipeSchema.parse(body);

    console.log(`[Guest Mode] Fetching recipe from URL: ${url}`);

    // Use the same extraction function as authenticated users
    const result = await extractRecipeOptimized(url, {
      openaiProvider: 'openai-main' // Default provider for guests
    });

    if (!result || !result.recipe) {
      return NextResponse.json({ 
        error: 'Could not extract recipe from URL',
        details: 'Please try with a different recipe URL'
      }, { status: 400 });
    }

    const extractedRecipe = result.recipe;

    // Return recipe data without saving to database
    // Frontend will store in localStorage for guest users
    return NextResponse.json({
      success: true,
      recipe: {
        id: `guest-url-${Date.now()}`, // Temporary guest ID
        title: extractedRecipe.title,
        description: extractedRecipe.description || '',
        ingredients: extractedRecipe.ingredients || [],
        steps: extractedRecipe.steps || [],
        image: extractedRecipe.image,
        prepTime: extractedRecipe.prepTime,
        cleanupTime: extractedRecipe.cleanupTime,
        cuisine: extractedRecipe.cuisine,
        category: extractedRecipe.category || 'Uncategorized',
        sourceUrl: url,
        isGuest: true,
        createdAt: new Date().toISOString()
      },
      message: 'Recipe extracted successfully! Sign up to save it permanently.',
      guestMode: true
    });

  } catch (error) {
    console.error('Guest recipe fetching error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid URL provided',
          details: error.errors[0]?.message || 'Please provide a valid recipe URL',
          guestMode: true
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to fetch recipe from URL',
        details: error instanceof Error ? error.message : 'Unknown error',
        guestMode: true
      },
      { status: 500 }
    );
  }
} 