import { PrismaClient, CategorySource } from '../src/generated/prisma';
import { categoryService } from '../src/lib/categories';
import { PREDEFINED_CATEGORIES } from '../src/lib/constants/categories';

const prisma = new PrismaClient();

interface MigrationResult {
  totalRecipes: number;
  updated: number;
  errors: number;
  categoryBreakdown: {
    predefined: number;
    userCreated: number;
    aiGenerated: number;
  };
}

/**
 * Data migration script to populate category metadata for existing recipes
 */
async function migrateCategoryMetadata(): Promise<MigrationResult> {
  console.log('🚀 Starting category metadata migration...\n');
  
  const result: MigrationResult = {
    totalRecipes: 0,
    updated: 0,
    errors: 0,
    categoryBreakdown: {
      predefined: 0,
      userCreated: 0,
      aiGenerated: 0
    }
  };

  try {
    // Get all recipes that need metadata population
    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          { categorySource: null },
          { categoryConfidence: null },
          { originalCategory: null }
        ]
      },
      select: {
        id: true,
        category: true,
        userId: true,
        createdAt: true
      }
    });

    result.totalRecipes = recipes.length;
    console.log(`📊 Found ${recipes.length} recipes requiring metadata migration\n`);

    if (recipes.length === 0) {
      console.log('✅ No recipes need migration. All metadata is up to date!');
      return result;
    }

    // Process each recipe
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      console.log(`[${i + 1}/${recipes.length}] Processing recipe: ${recipe.id} (category: "${recipe.category}")`);

      try {
        // Determine category source and confidence
        let categorySource: CategorySource;
        let categoryConfidence: number;
        let originalCategory: string = recipe.category;

        // Check if it's a predefined category (exact match)
        if (PREDEFINED_CATEGORIES.includes(recipe.category as any)) {
          categorySource = CategorySource.PREDEFINED;
          categoryConfidence = 1.0;
          result.categoryBreakdown.predefined++;
          console.log(`  ✅ Predefined category: ${recipe.category}`);
        } else {
          // Use CategoryService to analyze the category
          try {
            const analysis = await categoryService.findBestCategory(
              recipe.category,
              recipe.userId,
              { allowNewCategories: true, preferUserCategories: true }
            );

            if (analysis.bestMatch && analysis.bestMatch.confidence >= 0.8) {
              // High confidence match to predefined category
              categorySource = CategorySource.PREDEFINED;
              categoryConfidence = analysis.bestMatch.confidence;
              
              // If the resolved category is different from current, keep original
              if (analysis.bestMatch.category !== recipe.category) {
                originalCategory = recipe.category;
              }
              
              result.categoryBreakdown.predefined++;
              console.log(`  🔄 Resolved to predefined: ${analysis.bestMatch.category} (confidence: ${analysis.bestMatch.confidence.toFixed(2)})`);
            } else {
              // User-created or AI-generated category
              categorySource = CategorySource.USER_CREATED;
              categoryConfidence = 0.9; // Assume good confidence for existing data
              result.categoryBreakdown.userCreated++;
              console.log(`  🆕 User-created category: ${recipe.category}`);
            }
          } catch (analysisError) {
            console.warn(`  ⚠️  Category analysis failed, assuming user-created: ${analysisError}`);
            categorySource = CategorySource.USER_CREATED;
            categoryConfidence = 0.8; // Lower confidence due to analysis failure
            result.categoryBreakdown.userCreated++;
          }
        }

        // Update the recipe with metadata
        await prisma.recipe.update({
          where: { id: recipe.id },
          data: {
            categorySource,
            categoryConfidence,
            originalCategory: originalCategory !== recipe.category ? originalCategory : null
          }
        });

        result.updated++;
        console.log(`  ✅ Updated metadata for recipe ${recipe.id}\n`);

      } catch (error) {
        console.error(`  ❌ Error updating recipe ${recipe.id}:`, error);
        result.errors++;
      }
    }

  } catch (error) {
    console.error('💥 Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  return result;
}

/**
 * Main execution function
 */
async function main() {
  console.log('📦 Category Metadata Migration Tool');
  console.log('=' .repeat(50));
  
  try {
    const result = await migrateCategoryMetadata();
    
    console.log('\n📈 Migration Summary:');
    console.log('─'.repeat(30));
    console.log(`Total recipes processed: ${result.totalRecipes}`);
    console.log(`Successfully updated: ${result.updated}`);
    console.log(`Errors encountered: ${result.errors}`);
    console.log('\n📊 Category breakdown:');
    console.log(`  Predefined categories: ${result.categoryBreakdown.predefined}`);
    console.log(`  User-created categories: ${result.categoryBreakdown.userCreated}`);
    console.log(`  AI-generated categories: ${result.categoryBreakdown.aiGenerated}`);
    
    if (result.errors === 0) {
      console.log('\n✅ Migration completed successfully!');
    } else {
      console.log(`\n⚠️  Migration completed with ${result.errors} errors`);
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { migrateCategoryMetadata }; 