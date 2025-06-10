import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

test.describe('Clerk & Neon Integration', () => {
  let testUserId: string;
  
  test.beforeAll(async () => {
    // Clean up any existing test data
    await prisma.user.deleteMany({
      where: {
        email: { contains: '@test-integration.local' }
      }
    });
  });

  test.afterAll(async () => {
    // Clean up test data
    if (testUserId) {
      await prisma.user.delete({
        where: { clerkId: testUserId }
      }).catch(() => {
        // User might not exist in our DB
      });
    }
    await prisma.$disconnect();
  });

  test('User sync between Clerk and Neon database', async () => {
    // 1. Simulate Clerk webhook creating a user
    const clerkUser = {
      id: 'test_user_clerk_neon_integration',
      email: 'integration-test@test-integration.local',
      first_name: 'Integration',
      last_name: 'Test',
      created_at: Date.now()
    };

    testUserId = clerkUser.id;

    // 2. Create user in our Neon database (simulating webhook handler)
    const dbUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.email,
        firstName: clerkUser.first_name,
        lastName: clerkUser.last_name,
        isTestUser: true,
        categories: {
          create: [
            {
              name: 'Test Category',
              userId: clerkUser.id,
              // Add required fields based on your schema
            }
          ]
        }
      },
      include: {
        categories: true
      }
    });

    // 3. Verify the user was created correctly
    expect(dbUser.clerkId).toBe(clerkUser.id);
    expect(dbUser.email).toBe(clerkUser.email);
    expect(dbUser.firstName).toBe(clerkUser.first_name);
    expect(dbUser.lastName).toBe(clerkUser.last_name);
    expect(dbUser.categories).toHaveLength(1);

    // 4. Test user data retrieval by Clerk ID
    const retrievedUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: {
        categories: true,
        recipes: true,
        extractionMetrics: true
      }
    });

    expect(retrievedUser).toBeTruthy();
    expect(retrievedUser?.clerkId).toBe(clerkUser.id);
    expect(retrievedUser?.categories).toHaveLength(1);

    // 5. Test creating application data for the user
    const recipe = await prisma.recipe.create({
      data: {
        title: 'Test Recipe for Integration',
        userId: clerkUser.id,
        ingredients: ['Test ingredient 1', 'Test ingredient 2'],
        steps: ['Test step 1', 'Test step 2'],
        description: 'Integration test recipe',
        categoryId: dbUser.categories[0].id,
        user: {
          connect: { clerkId: clerkUser.id }
        }
      }
    });

    expect(recipe.userId).toBe(clerkUser.id);
    expect(recipe.title).toBe('Test Recipe for Integration');

    // 6. Test analytics data creation
    const analyticsEntry = await prisma.recipeExtractionMetrics.create({
      data: {
        userId: clerkUser.id,
        recipeUrl: 'https://test.example.com/recipe',
        domain: 'test.example.com',
        primaryStrategy: 'URL_DIRECT',
        aiProvider: 'GEMINI_MAIN',
        totalDuration: 5000,
        aiProcessingDuration: 4000,
        extractionSuccess: true,
        wasOptimal: true,
        user: {
          connect: { clerkId: clerkUser.id }
        }
      }
    });

    expect(analyticsEntry.userId).toBe(clerkUser.id);
    expect(analyticsEntry.extractionSuccess).toBe(true);

    // 7. Test complex query combining user data
    const userWithAllData = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: {
        recipes: true,
        categories: true,
        extractionMetrics: {
          where: { extractionSuccess: true }
        },
        conversionTracking: true
      }
    });

    expect(userWithAllData).toBeTruthy();
    expect(userWithAllData?.recipes).toHaveLength(1);
    expect(userWithAllData?.extractionMetrics).toHaveLength(1);
    expect(userWithAllData?.categories).toHaveLength(1);

    // Clean up the recipe
    await prisma.recipe.delete({ where: { id: recipe.id } });
    await prisma.recipeExtractionMetrics.delete({ where: { id: analyticsEntry.id } });
  });

  test('User deletion cascade behavior', async () => {
    // Create a test user with associated data
    const testUser = await prisma.user.create({
      data: {
        clerkId: 'test_deletion_cascade',
        email: 'deletion-test@test-integration.local',
        firstName: 'Deletion',
        lastName: 'Test',
        isTestUser: true
      }
    });

    // Create associated data
    const category = await prisma.category.create({
      data: {
        name: 'Test Deletion Category',
        userId: testUser.clerkId,
        user: {
          connect: { clerkId: testUser.clerkId }
        }
      }
    });

    const recipe = await prisma.recipe.create({
      data: {
        title: 'Test Deletion Recipe',
        userId: testUser.clerkId,
        ingredients: ['Test ingredient'],
        steps: ['Test step'],
        categoryId: category.id,
        user: {
          connect: { clerkId: testUser.clerkId }
        }
      }
    });

    // Delete the user (should cascade delete associated data)
    await prisma.user.delete({
      where: { clerkId: testUser.clerkId }
    });

    // Verify cascade deletion worked
    const deletedUser = await prisma.user.findUnique({
      where: { clerkId: testUser.clerkId }
    });
    expect(deletedUser).toBeNull();

    const orphanedCategory = await prisma.category.findUnique({
      where: { id: category.id }
    });
    expect(orphanedCategory).toBeNull();

    const orphanedRecipe = await prisma.recipe.findUnique({
      where: { id: recipe.id }
    });
    expect(orphanedRecipe).toBeNull();
  });

  test('Analytics aggregation queries', async () => {
    // Create test users and analytics data
    const users = [];
    for (let i = 0; i < 3; i++) {
      const user = await prisma.user.create({
        data: {
          clerkId: `test_analytics_user_${i}`,
          email: `analytics-test-${i}@test-integration.local`,
          firstName: `Analytics${i}`,
          lastName: 'Test',
          isTestUser: true
        }
      });
      users.push(user);

      // Create extraction metrics for each user
      for (let j = 0; j < 5; j++) {
        await prisma.recipeExtractionMetrics.create({
          data: {
            userId: user.clerkId,
            recipeUrl: `https://test${i}.example.com/recipe${j}`,
            domain: `test${i}.example.com`,
            primaryStrategy: j % 2 === 0 ? 'URL_DIRECT' : 'HTML_FALLBACK',
            aiProvider: j % 2 === 0 ? 'GEMINI_MAIN' : 'OPENAI_MAIN',
            totalDuration: 3000 + (j * 1000),
            aiProcessingDuration: 2500 + (j * 800),
            extractionSuccess: j !== 4, // Last one fails
            wasOptimal: j % 2 === 0,
            totalTokens: 100 + (j * 50),
            estimatedCost: (100 + (j * 50)) * 0.001,
            user: {
              connect: { clerkId: user.clerkId }
            }
          }
        });
      }
    }

    // Test aggregation queries
    const totalExtractions = await prisma.recipeExtractionMetrics.count({
      where: {
        user: { isTestUser: true }
      }
    });
    expect(totalExtractions).toBe(15); // 3 users * 5 extractions each

    const successfulExtractions = await prisma.recipeExtractionMetrics.count({
      where: {
        user: { isTestUser: true },
        extractionSuccess: true
      }
    });
    expect(successfulExtractions).toBe(12); // 3 users * 4 successful each

    const strategyBreakdown = await prisma.recipeExtractionMetrics.groupBy({
      by: ['primaryStrategy'],
      where: {
        user: { isTestUser: true }
      },
      _count: { id: true },
      _avg: { totalDuration: true }
    });

    expect(strategyBreakdown).toHaveLength(2);
    expect(strategyBreakdown.some((s: any) => s.primaryStrategy === 'URL_DIRECT')).toBe(true);
    expect(strategyBreakdown.some((s: any) => s.primaryStrategy === 'HTML_FALLBACK')).toBe(true);

    // Clean up test data
    await prisma.recipeExtractionMetrics.deleteMany({
      where: {
        user: { isTestUser: true }
      }
    });

    for (const user of users) {
      await prisma.user.delete({
        where: { clerkId: user.clerkId }
      });
    }
  });
}); 