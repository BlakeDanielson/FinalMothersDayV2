#!/usr/bin/env tsx

import { PrismaClient } from '../src/generated/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

interface BackupOptions {
  outputDir?: string;
  includeUsers?: boolean;
  includeCategories?: boolean;
  userId?: string;
}

export async function createRecipeBackup(options: BackupOptions = {}) {
  const {
    outputDir = './scripts/backups',
    includeUsers = false,
    includeCategories = true,
    userId
  } = options;

  const prisma = new PrismaClient();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  try {
    // Ensure backup directory exists
    await mkdir(outputDir, { recursive: true });

    console.log('🔄 Creating recipe backup...');

    // Build where clause
    const whereClause = userId ? { userId } : {};

    // Backup recipes
    const recipes = await prisma.recipe.findMany({
      where: whereClause,
      include: {
        user: includeUsers ? {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true
          }
        } : false
      }
    });

    const backupData = {
      timestamp: new Date().toISOString(),
      totalRecipes: recipes.length,
      userId: userId || 'all',
      recipes
    };

    // Save recipes backup
    const recipesFile = join(outputDir, `recipes-backup-${timestamp}.json`);
    await writeFile(recipesFile, JSON.stringify(backupData, null, 2));
    console.log(`✅ Recipes backup saved: ${recipesFile}`);

    // Note: Categories are stored as strings in recipes, not as separate entities
    console.log('ℹ️  Categories are stored as strings in recipe records');

    // Create summary
    const summary = {
      timestamp: new Date().toISOString(),
      backupFiles: [
        `recipes-backup-${timestamp}.json`
      ],
      stats: {
        totalRecipes: recipes.length,
        orphanedRecipes: recipes.filter(r => 
          !r.category || 
          r.category === '' || 
          r.category === 'undefined' || 
          r.category === 'null' ||
          r.category === 'Uncategorized'
        ).length,
        categorizedRecipes: recipes.filter(r => 
          r.category && 
          r.category !== '' && 
          r.category !== 'undefined' && 
          r.category !== 'null' &&
          r.category !== 'Uncategorized'
        ).length
      }
    };

    const summaryFile = join(outputDir, `backup-summary-${timestamp}.json`);
    await writeFile(summaryFile, JSON.stringify(summary, null, 2));
    console.log(`📊 Backup summary saved: ${summaryFile}`);

    console.log('\n📈 Backup Summary:');
    console.log(`Total Recipes: ${summary.stats.totalRecipes}`);
    console.log(`Orphaned Recipes: ${summary.stats.orphanedRecipes}`);
    console.log(`Categorized Recipes: ${summary.stats.categorizedRecipes}`);

    return summary;

  } catch (error) {
    console.error('💥 Backup failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const options: BackupOptions = {};

  // Parse arguments
  if (args.includes('--include-users')) {
    options.includeUsers = true;
  }
  
  if (args.includes('--no-categories')) {
    options.includeCategories = false;
  }
  
  const userIdIndex = args.indexOf('--user-id');
  if (userIdIndex !== -1 && args[userIdIndex + 1]) {
    options.userId = args[userIdIndex + 1];
  }
  
  const outputIndex = args.indexOf('--output');
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    options.outputDir = args[outputIndex + 1];
  }

  try {
    await createRecipeBackup(options);
    console.log('✅ Backup completed successfully!');
  } catch (error) {
    console.error('💥 Backup failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
} 