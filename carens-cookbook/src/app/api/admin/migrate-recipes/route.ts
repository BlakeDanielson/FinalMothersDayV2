import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';
import { z } from 'zod';

const prisma = new PrismaClient();

const MigrationRequestSchema = z.object({
  recipeIds: z.array(z.string()),
  targetCategory: z.string(),
  dryRun: z.boolean().default(true)
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { recipeIds, targetCategory, dryRun } = MigrationRequestSchema.parse(body);

    const result = {
      totalProcessed: 0,
      successful: 0,
      failed: 0,
      errors: [] as string[]
    };

    // Validate that recipes exist
    const recipes = await prisma.recipe.findMany({
      where: { id: { in: recipeIds } },
      select: { id: true, title: true, category: true }
    });

    if (recipes.length !== recipeIds.length) {
      const foundIds = recipes.map(r => r.id);
      const missingIds = recipeIds.filter(id => !foundIds.includes(id));
      return NextResponse.json(
        { error: `Recipes not found: ${missingIds.join(', ')}` },
        { status: 400 }
      );
    }

    result.totalProcessed = recipes.length;

    if (dryRun) {
      // For dry run, just return what would happen
      result.successful = recipes.length;
      return NextResponse.json({
        ...result,
        message: `Dry run: Would update ${recipes.length} recipes to category "${targetCategory}"`
      });
    }

    // Perform actual migration
    for (const recipe of recipes) {
      try {
        await prisma.recipe.update({
          where: { id: recipe.id },
          data: { category: targetCategory }
        });
        result.successful++;
      } catch (error) {
        result.failed++;
        result.errors.push(`Failed to update recipe "${recipe.title}": ${error}`);
      }
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Migration failed:', error);
    return NextResponse.json(
      { error: 'Migration failed' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 