import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

// Performance monitoring endpoint for admin users
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin (you might want to implement proper admin check)
    // For now, we'll allow any authenticated user to access performance data
    
    const startTime = Date.now();
    
    // Get database performance metrics
    const [
      totalRecipes,
      totalUsers,
      categoriesCount,
      recentRecipes
    ] = await Promise.all([
      prisma.recipe.count(),
      prisma.user.count(),
      prisma.recipe.groupBy({
        by: ['category'],
        _count: { id: true }
      }),
      prisma.recipe.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          category: true,
          createdAt: true,
          userId: true
        }
      })
    ]);

    const queryTime = Date.now() - startTime;

    // Calculate category distribution
    const categoryDistribution = categoriesCount.map(cat => ({
      category: cat.category,
      count: cat._count.id
    }));

    // Get memory usage (Node.js specific)
    const memoryUsage = process.memoryUsage();

    const performanceData = {
      timestamp: new Date().toISOString(),
      database: {
        totalRecipes,
        totalUsers,
        categoriesCount: categoriesCount.length,
        queryTime: `${queryTime}ms`
      },
      categories: {
        distribution: categoryDistribution,
        totalCategories: categoriesCount.length
      },
      recentActivity: {
        recentRecipes: recentRecipes.map(recipe => ({
          id: recipe.id,
          title: recipe.title,
          category: recipe.category,
          createdAt: recipe.createdAt,
          userId: recipe.userId
        }))
      },
      system: {
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
        },
        uptime: `${Math.round(process.uptime())}s`
      }
    };

    return NextResponse.json(performanceData);

  } catch (error: unknown) {
    console.error('Performance monitoring error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch performance data',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 