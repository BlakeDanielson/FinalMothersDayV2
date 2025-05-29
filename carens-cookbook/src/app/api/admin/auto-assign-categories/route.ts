import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';
import { CategoryService } from '@/lib/categories';
import { z } from 'zod';

const prisma = new PrismaClient();

const AutoAssignRequestSchema = z.object({
  recipeIds: z.array(z.string()).optional(),
  dryRun: z.boolean().default(true)
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { recipeIds, dryRun } = AutoAssignRequestSchema.parse(body);

    const categoryService = new CategoryService(prisma);
    
    const result = {
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Get recipes to process
    const whereClause = recipeIds 
      ? { id: { in: recipeIds } }
      : {
          OR: [
            { category: '' },
            { category: 'undefined' },
            { category: 'null' },
            { category: 'Uncategorized' }
          ]
        };

    const recipes = await prisma.recipe.findMany({
      where: whereClause,
      select: { 
        id: true, 
        title: true, 
        category: true, 
        userId: true,
        description: true,
        ingredients: true
      }
    });

    result.totalProcessed = recipes.length;

    if (recipes.length === 0) {
      return NextResponse.json({
        ...result,
        message: 'No recipes found to process'
      });
    }

    // Process each recipe
    for (const recipe of recipes) {
      try {
        // Use AI to find the best category
        const analysis = await categoryService.findBestCategory(
          recipe.title,
          recipe.userId,
          { 
            allowNewCategories: false,
            preferUserCategories: true
          }
        );

        let newCategory = 'Uncategorized';
        
        if (analysis.bestMatch && analysis.bestMatch.confidence > 0.6) {
          newCategory = analysis.bestMatch.category;
        } else if (analysis.suggestions.length > 0) {
          // Use the first suggestion if confidence is reasonable
          const topSuggestion = analysis.suggestions[0];
          if (topSuggestion.confidence > 0.4) {
            newCategory = topSuggestion.category;
          }
        }

        if (dryRun) {
          // For dry run, just count as successful
          result.successful++;
        } else {
          // Actually update the recipe
          await prisma.recipe.update({
            where: { id: recipe.id },
            data: { 
              category: newCategory,
              categorySource: 'AI_GENERATED',
              categoryConfidence: analysis.bestMatch?.confidence || 0
            }
          });
          result.successful++;
        }

      } catch (error) {
        result.failed++;
        result.errors.push(`Failed to process recipe "${recipe.title}": ${error}`);
      }
    }

    const message = dryRun 
      ? `Dry run: Would auto-assign categories for ${result.successful} recipes`
      : `Successfully auto-assigned categories for ${result.successful} recipes`;

    return NextResponse.json({
      ...result,
      message
    });

  } catch (error) {
    console.error('Auto-assignment failed:', error);
    return NextResponse.json(
      { error: 'Auto-assignment failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 