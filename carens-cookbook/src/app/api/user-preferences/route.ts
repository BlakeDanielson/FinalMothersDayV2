import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import {
  userPreferencesSchema
} from '@/lib/validation/user-preferences';
import { getDefaultUserPreferences } from '@/lib/utils/user-preferences';

// Schema for updating onboarding progress
const updateOnboardingSchema = z.object({
  step: z.string().optional(),
  completed: z.boolean().optional(),
  data: z.record(z.unknown()).optional() // Flexible data for each step
});

// Schema for partial preference updates
const partialPreferencesSchema = userPreferencesSchema.partial();

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Find user with preferences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        onboardingCompleted: true,
        onboardingStep: true,
        cookingSkillLevel: true,
        dietaryPreferences: true,
        favoriteCuisines: true,
        householdSize: true,
        defaultProcessingMethod: true,
        preferredCategories: true,
        timezone: true,
        measurementSystem: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If user doesn't have preferences set, return defaults
    const preferences = {
      onboardingCompleted: user.onboardingCompleted ?? false,
      onboardingStep: user.onboardingStep ?? 'welcome',
      cookingSkillLevel: user.cookingSkillLevel,
      dietaryPreferences: user.dietaryPreferences || [],
      favoriteCuisines: user.favoriteCuisines || [],
      householdSize: user.householdSize,
      defaultProcessingMethod: user.defaultProcessingMethod,
      preferredCategories: user.preferredCategories || [],
      timezone: user.timezone,
      measurementSystem: user.measurementSystem
    };

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      preferences
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching user preferences:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to fetch user preferences', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    // Validate the request body using partial schema to allow partial updates
    const validatedData = partialPreferencesSchema.parse(body);

    // Ensure user exists in database
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { 
        id: userId, 
        email: '', // Email will be updated by webhook
        ...getDefaultUserPreferences()
      }
    });

    // Update user preferences
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: validatedData,
      select: {
        id: true,
        email: true,
        onboardingCompleted: true,
        onboardingStep: true,
        cookingSkillLevel: true,
        dietaryPreferences: true,
        favoriteCuisines: true,
        householdSize: true,
        defaultProcessingMethod: true,
        preferredCategories: true,
        timezone: true,
        measurementSystem: true,
        updatedAt: true
      }
    });

    return NextResponse.json({
      message: 'User preferences updated successfully',
      preferences: {
        onboardingCompleted: updatedUser.onboardingCompleted ?? false,
        onboardingStep: updatedUser.onboardingStep ?? 'welcome',
        cookingSkillLevel: updatedUser.cookingSkillLevel,
        dietaryPreferences: updatedUser.dietaryPreferences || [],
        favoriteCuisines: updatedUser.favoriteCuisines || [],
        householdSize: updatedUser.householdSize,
        defaultProcessingMethod: updatedUser.defaultProcessingMethod,
        preferredCategories: updatedUser.preferredCategories || [],
        timezone: updatedUser.timezone,
        measurementSystem: updatedUser.measurementSystem
      }
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid preference data provided', 
        details: error.format() 
      }, { status: 400 });
    }
    console.error('Error updating user preferences:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to update user preferences', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    // Check if this is an onboarding update or full initialization
    const isOnboardingUpdate = 'step' in body || 'completed' in body;
    
    if (isOnboardingUpdate) {
      // Handle onboarding progress updates
      const validatedData = updateOnboardingSchema.parse(body);
      
      // Ensure user exists
      await prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: { 
          id: userId, 
          email: '',
          ...getDefaultUserPreferences()
        }
      });

      // Update onboarding progress
      const updateData: Record<string, unknown> = {};
      if (validatedData.step !== undefined) {
        updateData.onboardingStep = validatedData.step;
      }
      if (validatedData.completed !== undefined) {
        updateData.onboardingCompleted = validatedData.completed;
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          onboardingCompleted: true,
          onboardingStep: true,
          updatedAt: true
        }
      });

      return NextResponse.json({
        message: 'Onboarding progress updated successfully',
        onboarding: {
          completed: updatedUser.onboardingCompleted ?? false,
          step: updatedUser.onboardingStep ?? 'welcome'
        }
      }, { status: 200 });

    } else {
      // Handle full preference initialization
      const validatedData = userPreferencesSchema.parse(body);

      // Initialize user with full preferences
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: validatedData,
        create: { 
          id: userId, 
          email: '',
          ...validatedData
        },
        select: {
          id: true,
          email: true,
          onboardingCompleted: true,
          onboardingStep: true,
          cookingSkillLevel: true,
          dietaryPreferences: true,
          favoriteCuisines: true,
          householdSize: true,
          defaultProcessingMethod: true,
          preferredCategories: true,
          timezone: true,
          measurementSystem: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return NextResponse.json({
        message: 'User preferences initialized successfully',
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        preferences: {
          onboardingCompleted: user.onboardingCompleted ?? false,
          onboardingStep: user.onboardingStep ?? 'welcome',
          cookingSkillLevel: user.cookingSkillLevel,
          dietaryPreferences: user.dietaryPreferences || [],
          favoriteCuisines: user.favoriteCuisines || [],
          householdSize: user.householdSize,
          defaultProcessingMethod: user.defaultProcessingMethod,
          preferredCategories: user.preferredCategories || [],
          timezone: user.timezone,
          measurementSystem: user.measurementSystem
        }
      }, { status: 201 });
    }

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid data provided', 
        details: error.format() 
      }, { status: 400 });
    }
    console.error('Error initializing user preferences:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to initialize user preferences', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 