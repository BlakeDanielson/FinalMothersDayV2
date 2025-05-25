import { PrismaClient } from '../carens-cookbook/src/generated/prisma';

// Predefined categories from the current UI (extracted from page.tsx)
const PREDEFINED_UI_CATEGORIES = [
  "Appetizer", "Beef", "Beverage", "Breakfast", "Chicken", "Dessert",
  "Drinks", "Lamb", "Pasta", "Pork", "Salad", "Sauce", "Seafood", 
  "Side Dish", "Sauces & Seasoning", "Soup", "Thanksgiving", "Vegetable"
];

// Categories mentioned in AI prompt (from scan-recipe route)
const AI_PROMPT_CATEGORIES = [
  "Chicken", "Beef", "Vegetables", "Salad", "Appetizer", "Seafood", 
  "Thanksgiving", "Lamb", "Pork", "Soup", "Pasta", "Dessert", 
  "Drinks", "Sauces & Seasoning"
];

interface CategoryAuditResult {
  totalRecipes: number;
  totalUsers: number;
  categoryDistribution: {
    category: string;
    count: number;
    users: number;
    isOrphaned: boolean;
    inAIPrompt: boolean;
    inUI: boolean;
  }[];
  orphanedRecipes: {
    count: number;
    categories: string[];
    affectedUsers: number;
  };
  mismatches: {
    aiPromptOnly: string[];
    uiOnly: string[];
  };
  recommendations: string[];
}

async function auditRecipeCategories(): Promise<CategoryAuditResult> {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Starting recipe category audit...\n');

    // Get total counts
    const totalRecipes = await prisma.recipe.count();
    const totalUsers = await prisma.user.count();
    
    console.log(`📊 Database Overview:`);
    console.log(`   Total recipes: ${totalRecipes}`);
    console.log(`   Total users: ${totalUsers}\n`);

    // Get category distribution with user counts
    const categoryStats = await prisma.recipe.groupBy({
      by: ['category'],
      _count: {
        category: true,
        userId: true
      },
      orderBy: {
        _count: {
          category: 'desc'
        }
      }
    });

    // Get unique users per category
    const categoryUserCounts = await Promise.all(
      categoryStats.map(async (stat) => {
        const uniqueUsers = await prisma.recipe.findMany({
          where: { category: stat.category },
          select: { userId: true },
          distinct: ['userId']
        });
        return {
          category: stat.category,
          recipeCount: stat._count.category,
          userCount: uniqueUsers.length
        };
      })
    );

    // Analyze each category
    const categoryDistribution = categoryUserCounts.map(({ category, recipeCount, userCount }) => {
      const isInUI = PREDEFINED_UI_CATEGORIES.includes(category);
      const isInAIPrompt = AI_PROMPT_CATEGORIES.includes(category);
      const isOrphaned = !isInUI;

      return {
        category,
        count: recipeCount,
        users: userCount,
        isOrphaned,
        inAIPrompt: isInAIPrompt,
        inUI: isInUI
      };
    });

    // Calculate orphaned recipe statistics
    const orphanedCategories = categoryDistribution.filter(cat => cat.isOrphaned);
    const orphanedRecipeCount = orphanedCategories.reduce((sum, cat) => sum + cat.count, 0);
    const orphanedUserCount = new Set(orphanedCategories.flatMap(cat => 
      // This is an approximation - actual count would need separate query
      Array(cat.users).fill(0)
    )).size;

    // Find mismatches between AI prompt and UI
    const aiPromptOnly = AI_PROMPT_CATEGORIES.filter(cat => !PREDEFINED_UI_CATEGORIES.includes(cat));
    const uiOnly = PREDEFINED_UI_CATEGORIES.filter(cat => !AI_PROMPT_CATEGORIES.includes(cat));

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (orphanedRecipeCount > 0) {
      recommendations.push(`🚨 ${orphanedRecipeCount} recipes (${(orphanedRecipeCount/totalRecipes*100).toFixed(1)}%) are orphaned and may not be visible in the UI`);
    }
    
    if (aiPromptOnly.length > 0) {
      recommendations.push(`⚠️  AI prompt includes categories not in UI: ${aiPromptOnly.join(', ')}`);
    }
    
    if (uiOnly.length > 0) {
      recommendations.push(`⚠️  UI includes categories not in AI prompt: ${uiOnly.join(', ')}`);
    }

    const duplicateCategories = findPotentialDuplicates(categoryDistribution.map(c => c.category));
    if (duplicateCategories.length > 0) {
      recommendations.push(`🔄 Potential duplicate categories detected: ${duplicateCategories.join(', ')}`);
    }

    return {
      totalRecipes,
      totalUsers,
      categoryDistribution,
      orphanedRecipes: {
        count: orphanedRecipeCount,
        categories: orphanedCategories.map(c => c.category),
        affectedUsers: orphanedUserCount
      },
      mismatches: {
        aiPromptOnly,
        uiOnly
      },
      recommendations
    };

  } finally {
    await prisma.$disconnect();
  }
}

function findPotentialDuplicates(categories: string[]): string[] {
  const duplicates: string[] = [];
  const seen = new Set<string>();
  
  for (const category of categories) {
    const normalized = category.toLowerCase().replace(/s$/, ''); // Simple pluralization check
    if (seen.has(normalized)) {
      duplicates.push(category);
    }
    seen.add(normalized);
  }
  
  return duplicates;
}

function printAuditReport(result: CategoryAuditResult): void {
  console.log('\n📋 CATEGORY AUDIT REPORT');
  console.log('========================\n');

  // Overview
  console.log('📊 Overview:');
  console.log(`   Total Recipes: ${result.totalRecipes}`);
  console.log(`   Total Users: ${result.totalUsers}`);
  console.log(`   Unique Categories: ${result.categoryDistribution.length}\n`);

  // Orphaned recipes summary
  console.log('🔍 Orphaned Recipe Analysis:');
  console.log(`   Orphaned Recipes: ${result.orphanedRecipes.count} (${(result.orphanedRecipes.count/result.totalRecipes*100).toFixed(1)}%)`);
  console.log(`   Orphaned Categories: ${result.orphanedRecipes.categories.length}`);
  console.log(`   Affected Users: ~${result.orphanedRecipes.affectedUsers}\n`);

  // Category breakdown
  console.log('📋 Category Distribution:');
  console.log('----------------------------------------');
  console.log('Category                | Recipes | Users | Status');
  console.log('----------------------------------------');
  
  result.categoryDistribution.forEach(cat => {
    const status = cat.isOrphaned ? '❌ ORPHANED' : '✅ VISIBLE';
    const categoryName = cat.category.padEnd(20);
    const count = cat.count.toString().padEnd(6);
    const users = cat.users.toString().padEnd(4);
    console.log(`${categoryName} | ${count} | ${users} | ${status}`);
  });

  // Mismatches
  if (result.mismatches.aiPromptOnly.length > 0 || result.mismatches.uiOnly.length > 0) {
    console.log('\n⚠️  Category Mismatches:');
    if (result.mismatches.aiPromptOnly.length > 0) {
      console.log(`   AI Prompt Only: ${result.mismatches.aiPromptOnly.join(', ')}`);
    }
    if (result.mismatches.uiOnly.length > 0) {
      console.log(`   UI Only: ${result.mismatches.uiOnly.join(', ')}`);
    }
  }

  // Recommendations
  if (result.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    result.recommendations.forEach(rec => console.log(`   ${rec}`));
  }

  console.log('\n✅ Audit complete!\n');
}

// Main execution
async function main() {
  try {
    const auditResult = await auditRecipeCategories();
    printAuditReport(auditResult);
    
    // Save detailed results to file
    const fs = await import('fs/promises');
    await fs.writeFile(
      'scripts/category-audit-results.json', 
      JSON.stringify(auditResult, null, 2)
    );
    console.log('📁 Detailed results saved to scripts/category-audit-results.json');
    
  } catch (error) {
    console.error('❌ Audit failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { auditRecipeCategories, type CategoryAuditResult }; 