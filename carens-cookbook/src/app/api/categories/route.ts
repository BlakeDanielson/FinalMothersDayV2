import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '../../../generated/prisma';
// import { categoryResolver } from '../../../lib/categories'; // Currently unused
import { PREDEFINED_CATEGORIES } from '../../../lib/constants/categories';
import { categoryCache } from '../../../lib/services/cache-service';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();
    
    // If user is not logged in, return predefined categories with zero counts
    if (!userId) {
      // Check cache for default categories
      const cachedDefaultCategories = await categoryCache.getCategories();
      if (cachedDefaultCategories) {
        return NextResponse.json(cachedDefaultCategories);
      }

      const defaultCategories = PREDEFINED_CATEGORIES.map(category => ({
        name: category,
        count: 0
      }));

      // Cache default categories for 5 minutes
      await categoryCache.setCategories(defaultCategories);
      return NextResponse.json(defaultCategories);
    }

    // Check cache for user-specific categories
    const cachedUserCategories = await categoryCache.getCategories(userId);
    if (cachedUserCategories) {
      return NextResponse.json(cachedUserCategories);
    }

    // Get user's categories with recipe counts from database
    const userCategoriesWithCounts = await prisma.recipe.groupBy({
      by: ['category'],
      where: { userId },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } } // Order by most recipes first
    });

    // Transform to more readable format
    const categoriesWithCounts = userCategoriesWithCounts.map(item => ({
      name: item.category,
      count: item._count.id
    }));

    // If user has no recipes, return predefined categories with zero counts
    if (categoriesWithCounts.length === 0) {
      const defaultCategories = PREDEFINED_CATEGORIES.map(category => ({
        name: category,
        count: 0
      }));

      // Cache user's default categories for 1 hour
      await categoryCache.setCategories(defaultCategories, userId);
      return NextResponse.json(defaultCategories);
    }

    // For users with recipes, get unique categories from both user data and predefined
    const allCategoryNames = new Set([
      ...categoriesWithCounts.map(c => c.name),
      ...PREDEFINED_CATEGORIES
    ]);

    // Create final list with counts
    const finalCategories = Array.from(allCategoryNames).map(categoryName => {
      const existing = categoriesWithCounts.find(c => c.name === categoryName);
      return {
        name: categoryName,
        count: existing ? existing.count : 0
      };
    });

    // Sort by count (descending) then by name
    finalCategories.sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count; // Higher counts first
      }
      return a.name.localeCompare(b.name); // Alphabetical for same count
    });

    // Cache user's categories for 1 hour
    await categoryCache.setCategories(finalCategories, userId);

    return NextResponse.json(finalCategories);

  } catch (error: unknown) {
    console.error('Error fetching categories:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Failed to fetch categories.', details: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 