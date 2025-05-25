import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';
import { CategoryValidator } from '@/lib/validation/CategoryValidator';
import { 
  withCategoryErrorHandling,
  CategoryValidationError,
  CategoryOperationError
} from '@/lib/middleware/errorHandler';
import { categoryLogger, withPerformanceLogging } from '@/lib/utils/logger';

const prisma = new PrismaClient();
const categoryValidator = new CategoryValidator(prisma);

async function handleDeleteCategory(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const body = await req.json();
  const { categoryName, moveToCategory, forceDelete } = body;

  if (!categoryName) {
    throw new CategoryValidationError(
      'Missing required fields',
      ['categoryName is required']
    );
  }

  // Validate the delete operation
  const validationResult = await withPerformanceLogging(
    () => categoryValidator.validateDelete(categoryName, moveToCategory, forceDelete || false, userId),
    { operation: 'validate', userId, categoryName },
    'delete_validation'
  );

  if (!validationResult.isValid) {
    throw new CategoryValidationError(
      'Delete validation failed',
      validationResult.errors,
      validationResult.suggestedAlternatives
    );
  }

  // Get recipe count for the category
  const recipesInCategory = await prisma.recipe.findMany({
    where: { userId, category: categoryName },
    select: { id: true, title: true }
  });

  if (recipesInCategory.length === 0) {
    // Category is empty, safe to "delete" (no action needed since it only exists in recipes)
    categoryLogger.logUserAction(
      { operation: 'delete', userId, categoryName },
      'Empty category deletion attempted',
      { categoryName, recipesCount: 0, action: 'no_action_needed' }
    );

    return {
      success: true,
      message: `Category "${categoryName}" was empty and has been removed`,
      categoryName,
      recipesAffected: 0,
      action: 'empty_category_removed'
    };
  }

  // Perform the delete operation
  const result = await withPerformanceLogging(
    async () => {
      if (forceDelete) {
        // Force delete: Remove all recipes in this category
        const deletedRecipes = await prisma.recipe.deleteMany({
          where: { userId, category: categoryName }
        });

        categoryLogger.logUserAction(
          { operation: 'delete', userId, categoryName },
          'Force delete performed',
          { 
            categoryName, 
            recipesDeleted: deletedRecipes.count,
            action: 'force_delete',
            warning: 'PERMANENT_DATA_LOSS'
          }
        );

        return {
          success: true,
          message: `⚠️ Force deleted category "${categoryName}" and ${deletedRecipes.count} recipes`,
          categoryName,
          recipesAffected: deletedRecipes.count,
          action: 'force_delete',
          warning: 'This action permanently removed recipes and cannot be undone'
        };

      } else if (moveToCategory) {
        // Move recipes to another category
        const updatedRecipes = await prisma.recipe.updateMany({
          where: { userId, category: categoryName },
          data: { 
            category: moveToCategory,
            categorySource: 'USER_CREATED',
            categoryConfidence: 1.0
          }
        });

        categoryLogger.logUserAction(
          { operation: 'delete', userId, categoryName },
          'Category deleted with recipe migration',
          { 
            categoryName, 
            moveToCategory,
            recipesMoved: updatedRecipes.count,
            action: 'delete_with_migration'
          }
        );

        return {
          success: true,
          message: `Successfully deleted category "${categoryName}" and moved ${updatedRecipes.count} recipes to "${moveToCategory}"`,
          categoryName,
          moveToCategory,
          recipesAffected: updatedRecipes.count,
          action: 'delete_with_migration'
        };

      } else {
        // This shouldn't happen due to validation, but handle gracefully
        throw new CategoryOperationError(
          `Cannot delete category "${categoryName}" with ${recipesInCategory.length} recipes without specifying migration target or force delete`,
          'delete',
          false
        );
      }
    },
    { operation: 'delete', userId, categoryName },
    'delete_operation'
  );

  return result;
}

export const DELETE = withCategoryErrorHandling(
  handleDeleteCategory,
  { operation: 'delete', userId: '' }
); 