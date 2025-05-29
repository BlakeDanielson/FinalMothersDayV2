#!/usr/bin/env tsx

import { PrismaClient } from '../src/generated/prisma';
import { CategoryService } from '../src/lib/categories';

interface MigrationOptions {
  dryRun?: boolean;
  userId?: string;
  targetCategory?: string;
}

interface MigrationResult {
  totalProcessed: number;
  successful: number;
  failed: number;
  errors: string[];
}

export async function migrateOrphanedRecipes(options: MigrationOptions = {}): Promise<MigrationResult> {
  const { dryRun = true, userId, targetCategory = 'Uncategorized' } = options;
  const prisma = new PrismaClient();
  const categoryService = new CategoryService(prisma);
  
  const result: MigrationResult = {
    totalProcessed: 0,
    successful: 0,
    failed: 0,
    errors: []
  };

  try {
    console.log('🔍 Finding orphaned recipes...');
    
    // Find orphaned recipes
    const whereClause = userId ? { userId } : {};
    const orphanedRecipes = await prisma.recipe.findMany({
      where: {
        ...whereClause,
        OR: [
          { category: '' },
          { category: 'undefined' },
          { category: 'null' },
          { category: 'Uncategorized' }
        ]
      },
      select: {
        id: true,
        title: true,
        category: true,
        userId: true
      }
    });

    console.log(`📊 Found ${orphanedRecipes.length} orphaned recipes`);
    
    if (orphanedRecipes.length === 0) {
      console.log('✅ No orphaned recipes found!');
      return result;
    }

    if (dryRun) {
      console.log('🧪 DRY RUN MODE - No actual changes will be made');
    }

    // Process each recipe
    for (const recipe of orphanedRecipes) {
      result.totalProcessed++;
      
      try {
        let newCategory = targetCategory;
        
        // Try to find a better category based on recipe title
        if (targetCategory === 'Uncategorized') {
          const analysis = await categoryService.findBestCategory(
            recipe.title,
            recipe.userId,
            { allowNewCategories: false }
          );
          
          if (analysis.bestMatch && analysis.bestMatch.confidence > 0.6) {
            newCategory = analysis.bestMatch.category;
          }
        }

        console.log(`📝 Recipe "${recipe.title}" → "${newCategory}"`);

        // Update the recipe (unless dry run)
        if (!dryRun) {
          await prisma.recipe.update({
            where: { id: recipe.id },
            data: { category: newCategory }
          });
        }

        result.successful++;
        
      } catch (error) {
        result.failed++;
        const errorMsg = `Failed to process recipe ${recipe.id}: ${error}`;
        result.errors.push(errorMsg);
        console.error(`❌ ${errorMsg}`);
      }
    }

    console.log('\n📈 Migration Summary:');
    console.log(`Total Processed: ${result.totalProcessed}`);
    console.log(`Successful: ${result.successful}`);
    console.log(`Failed: ${result.failed}`);
    
    if (result.errors.length > 0) {
      console.log('\n❌ Errors:');
      result.errors.forEach(error => console.log(`  - ${error}`));
    }

    return result;

  } catch (error) {
    console.error('💥 Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const options: MigrationOptions = {};

  // Parse simple arguments
  if (args.includes('--live')) {
    options.dryRun = false;
  }
  
  const userIdIndex = args.indexOf('--user-id');
  if (userIdIndex !== -1 && args[userIdIndex + 1]) {
    options.userId = args[userIdIndex + 1];
  }
  
  const categoryIndex = args.indexOf('--category');
  if (categoryIndex !== -1 && args[categoryIndex + 1]) {
    options.targetCategory = args[categoryIndex + 1];
  }

  try {
    await migrateOrphanedRecipes(options);
    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
} 