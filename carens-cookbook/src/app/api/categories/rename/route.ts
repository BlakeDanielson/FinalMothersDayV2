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

async function handleRenameCategory(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const body = await req.json();
  const { oldName, newName } = body;

  if (!oldName || !newName) {
    throw new CategoryValidationError(
      'Missing required fields',
      ['oldName and newName are required']
    );
  }

  // Validate the rename operation
  const validationResult = await withPerformanceLogging(
    () => categoryValidator.validateRename(oldName, newName, userId),
    { operation: 'validate', userId, categoryName: oldName },
    'rename_validation'
  );

  if (!validationResult.isValid) {
    throw new CategoryValidationError(
      'Rename validation failed',
      validationResult.errors,
      validationResult.suggestedAlternatives
    );
  }

  // Check if old category exists and has recipes
  const recipesInOldCategory = await prisma.recipe.findMany({
    where: { userId, category: oldName },
    select: { id: true, title: true }
  });

  if (recipesInOldCategory.length === 0) {
    throw new CategoryNotFoundError(oldName);
  }

  // Check if new category already exists
  const existingNewCategory = await prisma.recipe.findFirst({
    where: { userId, category: newName }
  });

  if (existingNewCategory) {
    throw new CategoryValidationError(
      'Target category already exists',
      [`Category "${newName}" already exists`],
      [`Merge "${oldName}" into "${newName}" instead`, `Use "${newName} (2)" as name`]
    );
  }

  // Perform the rename operation
  const result = await withPerformanceLogging(
    async () => {
      const updatedRecipes = await prisma.recipe.updateMany({
        where: { userId, category: oldName },
        data: { 
          category: validationResult.sanitizedValue || newName,
          categorySource: 'USER_CREATED',
          categoryConfidence: 1.0
        }
      });

      categoryLogger.logUserAction(
        { operation: 'rename', userId, categoryName: oldName },
        'Category renamed',
        { oldName, newName: validationResult.sanitizedValue || newName, recipesCount: updatedRecipes.count }
      );

      return {
        success: true,
        message: `Successfully renamed "${oldName}" to "${validationResult.sanitizedValue || newName}"`,
        oldName,
        newName: validationResult.sanitizedValue || newName,
        recipesUpdated: updatedRecipes.count
      };
    },
    { operation: 'rename', userId, categoryName: oldName },
    'rename_operation'
  );

  return result;
}

export const PUT = withOnboardingGuard(
  withCategoryErrorHandling(
    handleRenameCategory,
    { operation: 'rename', userId: '' }
  )
); 