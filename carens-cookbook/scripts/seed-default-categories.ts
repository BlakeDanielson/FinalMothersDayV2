#!/usr/bin/env tsx

/**
 * Database seeder for default categories
 * This script ensures that all predefined categories are properly initialized
 * and can be used to repair or update category metadata
 */

import { PrismaClient } from '../src/generated/prisma';
import { PREDEFINED_CATEGORIES, CATEGORY_METADATA } from '../src/lib/constants/categories';

const prisma = new PrismaClient();

interface SeedOptions {
  force?: boolean;
  verbose?: boolean;
  dryRun?: boolean;
}

async function seedDefaultCategories(options: SeedOptions = {}) {
  const { force = false, verbose = false, dryRun = false } = options;

  console.log('🌱 Starting default categories seeding...');
  
  if (dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made');
  }

  try {
    // Check if we need to create any system-wide category records
    // For now, categories are stored in user preferences, but this could be extended
    // to create a separate CategoryDefinition table for system-wide metadata

    console.log(`📊 Found ${PREDEFINED_CATEGORIES.length} predefined categories`);
    
    if (verbose) {
      console.log('\n📋 Predefined categories:');
      PREDEFINED_CATEGORIES.forEach((category, index) => {
        const metadata = CATEGORY_METADATA[category];
        console.log(`  ${index + 1}. ${category}`);
        if (metadata?.description) {
          console.log(`     Description: ${metadata.description}`);
        }
        if (metadata?.aliases?.length) {
          console.log(`     Aliases: ${metadata.aliases.join(', ')}`);
        }
      });
    }

    // Check users without any categories and initialize them
    const usersWithoutCategories = await prisma.user.findMany({
      where: {
        OR: [
          { preferredCategories: { equals: [] } },
          { preferredCategories: { equals: null } }
        ]
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    });

    console.log(`\n👥 Found ${usersWithoutCategories.length} users without categories`);

    if (usersWithoutCategories.length > 0 && !dryRun) {
      const defaultCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
      
      console.log(`🔧 Initializing categories for ${usersWithoutCategories.length} users...`);
      
      for (const user of usersWithoutCategories) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: { preferredCategories: defaultCategories }
          });
          
          if (verbose) {
            console.log(`  ✅ Initialized categories for user: ${user.email || user.id}`);
          }
        } catch (error) {
          console.error(`  ❌ Failed to initialize categories for user ${user.id}:`, error);
        }
      }
    }

    // Validate category consistency across recipes
    console.log('\n🔍 Validating recipe categories...');
    
    const recipeCategoryCounts = await prisma.recipe.groupBy({
      by: ['category'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } }
    });

    const unknownCategories = recipeCategoryCounts.filter(
      item => !PREDEFINED_CATEGORIES.includes(item.category as any)
    );

    if (unknownCategories.length > 0) {
      console.log(`\n⚠️  Found ${unknownCategories.length} unknown categories in recipes:`);
      unknownCategories.forEach(item => {
        console.log(`  - "${item.category}" (${item._count.id} recipes)`);
      });
      
      if (force && !dryRun) {
        console.log('\n🔧 Force mode: Attempting to normalize unknown categories...');
        
        for (const item of unknownCategories) {
          // Try to find a matching predefined category
          const normalized = item.category.toLowerCase().trim();
          let matchedCategory: string | null = null;
          
          // Check for exact matches (case insensitive)
          for (const predefined of PREDEFINED_CATEGORIES) {
            if (predefined.toLowerCase() === normalized) {
              matchedCategory = predefined;
              break;
            }
          }
          
          // Check for alias matches
          if (!matchedCategory) {
            for (const [category, metadata] of Object.entries(CATEGORY_METADATA)) {
              if (metadata.aliases?.some(alias => alias.toLowerCase() === normalized)) {
                matchedCategory = category;
                break;
              }
            }
          }
          
          if (matchedCategory) {
            console.log(`  🔄 Normalizing "${item.category}" → "${matchedCategory}"`);
            
            await prisma.recipe.updateMany({
              where: { category: item.category },
              data: { category: matchedCategory }
            });
          } else {
            console.log(`  ⚠️  No match found for "${item.category}" - keeping as custom category`);
          }
        }
      }
    } else {
      console.log('  ✅ All recipe categories are valid');
    }

    // Generate summary statistics
    const totalUsers = await prisma.user.count();
    const allUsers = await prisma.user.findMany({
      select: { preferredCategories: true }
    });
    const usersWithCategories = allUsers.filter(
      user => user.preferredCategories && user.preferredCategories.length > 0
    ).length;
    
    const totalRecipes = await prisma.recipe.count();
    
    console.log('\n📈 Summary Statistics:');
    console.log(`  Total users: ${totalUsers}`);
    console.log(`  Users with categories: ${usersWithCategories}`);
    console.log(`  Users without categories: ${totalUsers - usersWithCategories}`);
    console.log(`  Total recipes: ${totalRecipes}`);
    console.log(`  Predefined categories: ${PREDEFINED_CATEGORIES.length}`);
    console.log(`  Categories with metadata: ${Object.keys(CATEGORY_METADATA).length}`);

    console.log('\n✅ Default categories seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const options: SeedOptions = {
    force: args.includes('--force'),
    verbose: args.includes('--verbose'),
    dryRun: args.includes('--dry-run')
  };

  try {
    await seedDefaultCategories(options);
  } catch (error) {
    console.error('Failed to seed default categories:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { seedDefaultCategories }; 