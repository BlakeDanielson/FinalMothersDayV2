import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const GuestRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  image: z.string().nullable(),
  prepTime: z.string(),
  cleanupTime: z.string(),
  cuisine: z.string(), 
  category: z.string(),
  sourceUrl: z.string().optional()
});

const MigrateGuestRecipesSchema = z.object({
  userId: z.string(),
  guestRecipes: z.array(GuestRecipeSchema)
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId: providedUserId, guestRecipes } = MigrateGuestRecipesSchema.parse(body);

    // Ensure the authenticated user matches the provided user ID
    if (userId !== providedUserId) {
      return NextResponse.json({ error: 'User ID mismatch' }, { status: 403 });
    }

    if (guestRecipes.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No guest recipes to migrate',
        migratedCount: 0
      });
    }

    console.log(`Migrating ${guestRecipes.length} guest recipes for user ${userId}`);

    // Convert guest recipes to database format and create them
    const recipeCreatePromises = guestRecipes.map(guestRecipe => 
      prisma.recipe.create({
        data: {
          title: guestRecipe.title,
          description: guestRecipe.description,
          ingredients: guestRecipe.ingredients,
          steps: guestRecipe.steps,
          image: guestRecipe.image,
          prepTime: guestRecipe.prepTime,
          cleanupTime: guestRecipe.cleanupTime,
          cuisine: guestRecipe.cuisine,
          category: guestRecipe.category,
          // Note: sourceUrl is not stored in Recipe model, only used for guest tracking
          userId
        }
      })
    );

    const savedRecipes = await Promise.allSettled(recipeCreatePromises);
    
    const successCount = savedRecipes.filter(result => result.status === 'fulfilled').length;
    const failedCount = savedRecipes.length - successCount;

    if (failedCount > 0) {
      console.error(`Failed to migrate ${failedCount} out of ${guestRecipes.length} guest recipes`);
      savedRecipes.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Failed to migrate recipe ${index}:`, result.reason);
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully migrated ${successCount} recipe${successCount !== 1 ? 's' : ''}${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
      migratedCount: successCount,
      failedCount
    });

  } catch (error) {
    console.error('Guest recipe migration error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid request data',
        details: error.errors
      }, { status: 400 });
    }

    return NextResponse.json({
      error: 'Failed to migrate guest recipes',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 