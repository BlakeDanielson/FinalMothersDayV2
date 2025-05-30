import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';
import { CategoryValidator } from '@/lib/validation/CategoryValidator';
import { 
  withCategoryErrorHandling,
  CategoryValidationError,
  CategoryNotFoundError 
} from '@/lib/middleware/errorHandler';
import { categoryLogger, withPerformanceLogging } from '@/lib/utils/logger';
import { withOnboardingGuard } from '@/lib/middleware/onboarding-guard';

const prisma = new PrismaClient();
const categoryValidator = new CategoryValidator(prisma);

async function handleMergeCategories(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const body = await req.json();
  const { sourceCategories, targetCategory } = body;

  if (!sourceCategories || !Array.isArray(sourceCategories) || sourceCategories.length === 0) {
    throw new CategoryValidationError(
      'Missing required fields',
      ['sourceCategories must be a non-empty array']
    );
  }

  if (!targetCategory) {
    throw new CategoryValidationError(
      'Missing required fields',
      ['targetCategory is required']
    );
  }

  // Validate the merge operation
  const validationResult = await withPerformanceLogging(
    () => categoryValidator.validateMerge(sourceCategories, targetCategory, userId),
    { operation: 'validate', userId, sourceCategories, targetCategory },
    'merge_validation'
  );

  if (!validationResult.isValid) {
    throw new CategoryValidationError(
      'Merge validation failed',
      validationResult.errors,
      validationResult.suggestedAlternatives
    );
  }

  // Check that all source categories exist and have recipes
  const categoryStats = await Promise.all(
    sourceCategories.map(async (category: string) => {
      const count = await prisma.recipe.count({
        where: { userId, category }
      });
      return { category, count };
    })
  );

  const emptyCategories = categoryStats.filter(stat => stat.count === 0);
  if (emptyCategories.length > 0) {
    throw new CategoryNotFoundError(
      `Source categories have no recipes: ${emptyCategories.map(c => c.category).join(', ')}`
    );
  }

  // Perform the merge operation
  const result = await withPerformanceLogging(
    async () => {
      // Update all recipes from source categories to target category
      const updatedRecipes = await prisma.recipe.updateMany({
        where: { 
          userId, 
          category: { in: sourceCategories }
        },
        data: { 
          category: targetCategory,
          categorySource: 'USER_CREATED',
          categoryConfidence: 1.0
        }
      });

      categoryLogger.logUserAction(
        { operation: 'merge', userId, sourceCategories, targetCategory },
        'Categories merged',
        { 
          sourceCategories, 
          targetCategory, 
          recipesCount: updatedRecipes.count,
          categoriesStats: categoryStats
        }
      );

      return {
        success: true,
        message: `Successfully merged ${sourceCategories.length} categories into "${targetCategory}"`,
        sourceCategories,
        targetCategory,
        recipesUpdated: updatedRecipes.count,
        categoriesMerged: sourceCategories.length
      };
    },
    { operation: 'merge', userId, sourceCategories, targetCategory },
    'merge_operation'
  );

  return result;
}

export const PUT = withOnboardingGuard(
  withCategoryErrorHandling(
    handleMergeCategories,
    { operation: 'merge', userId: '' }
  )
); 