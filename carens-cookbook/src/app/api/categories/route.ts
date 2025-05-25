import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';
// import { categoryResolver } from '@/lib/categories'; // Currently unused
import { PREDEFINED_CATEGORIES } from '@/lib/constants/categories';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's categories with recipe counts
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