import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, we'll assume any authenticated user can access this
    // In production, you'd want to check for admin role
    
    const orphanedRecipes = await prisma.recipe.findMany({
      where: {
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
        userId: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ 
      recipes: orphanedRecipes,
      count: orphanedRecipes.length 
    });

  } catch (error) {
    console.error('Failed to fetch orphaned recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orphaned recipes' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 