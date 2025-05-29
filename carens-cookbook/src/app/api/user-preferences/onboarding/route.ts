import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { 
  profileSetupSchema,
  categorySetupSchema,
  preferencesSchema
} from '@/lib/validation/user-preferences';
import { 
  getDefaultUserPreferences,
  getNextOnboardingStep,
  isValidOnboardingStep,
  getOnboardingStepByIndex
} from '@/lib/utils/user-preferences';
import { ONBOARDING_STEPS } from '@/lib/constants/user-preferences';

// Schema for onboarding step updates
const onboardingUpdateSchema = z.object({
  step: z.number().int().min(0),
  data: z.record(z.any()).optional(),
  markCompleted: z.boolean().default(false)
});

// Schema for completing onboarding
const completeOnboardingSchema = z.object({
  completed: z.literal(true)
});

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current onboarding state
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
        onboardingStep: true,
        cookingSkillLevel: true,
        dietaryPreferences: true,
        favoriteCuisines: true,
        householdSize: true,
        defaultProcessingMethod: true,
        preferredCategories: true,
        timezone: true,
        measurementSystem: true
      }
    });

    if (!user) {
      // User doesn't exist yet, return initial state
      return NextResponse.json({
        onboarding: {
          completed: false,
          currentStep: 0,
          nextStep: 1
        },
        preferences: getDefaultUserPreferences()
      }, { status: 200 });
    }

    const currentStep = user.onboardingStep ?? 0;
    const nextStep = getNextOnboardingStep(currentStep);
    
    return NextResponse.json({
      onboarding: {
        completed: user.onboardingCompleted ?? false,
        currentStep,
        nextStep
      },
      preferences: {
        cookingSkillLevel: user.cookingSkillLevel,
        dietaryPreferences: user.dietaryPreferences || [],
        favoriteCuisines: user.favoriteCuisines || [],
        householdSize: user.householdSize,
        defaultProcessingMethod: user.defaultProcessingMethod,
        preferredCategories: user.preferredCategories || [],
        timezone: user.timezone,
        measurementSystem: user.measurementSystem
      }
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching onboarding state:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to fetch onboarding state', 
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
    
    // Check if this is a completion request
    const isCompletion = 'completed' in body && body.completed === true;
    
    if (isCompletion) {
      // Handle onboarding completion
      completeOnboardingSchema.parse(body);
      
      const existingUser = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      let completedUser;
      if (existingUser) {
        completedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            onboardingCompleted: true,
            onboardingStep: ONBOARDING_STEPS.length - 1
          },
          select: {
            onboardingCompleted: true,
            onboardingStep: true,
            updatedAt: true
          }
        });
      } else {
        completedUser = await prisma.user.create({
          data: {
            id: userId,
            email: `temp-${userId}@placeholder.local`, // Temporary unique email
            onboardingCompleted: true,
            onboardingStep: ONBOARDING_STEPS.length - 1,
            ...getDefaultUserPreferences()
          },
          select: {
            onboardingCompleted: true,
            onboardingStep: true,
            updatedAt: true
          }
        });
      }

      return NextResponse.json({
        message: 'Onboarding completed successfully',
        onboarding: {
          completed: completedUser.onboardingCompleted ?? false,
          currentStep: completedUser.onboardingStep ?? ONBOARDING_STEPS.length - 1,
          nextStep: null
        }
      }, { status: 200 });
    }

    // Handle step progression
    const validatedData = onboardingUpdateSchema.parse(body);
    
    // Validate the step
    if (!isValidOnboardingStep(validatedData.step)) {
      return NextResponse.json({ 
        error: 'Invalid onboarding step', 
        validSteps: `Must be between 0 and ${ONBOARDING_STEPS.length - 1}`,
        availableSteps: ONBOARDING_STEPS.map((step, index) => ({ id: index, key: step.key, title: step.title }))
      }, { status: 400 });
    }

    // Validate step-specific data if provided
    let stepData = {};
    if (validatedData.data) {
      try {
        // Use numeric step IDs: 1=profile-setup, 2=category-setup, 3=preferences-setup
        switch (validatedData.step) {
          case 1: // profile-setup
            stepData = profileSetupSchema.parse(validatedData.data);
            break;
          case 2: // category-setup
            stepData = categorySetupSchema.parse(validatedData.data);
            break;
          case 3: // preferences-setup
            stepData = preferencesSchema.parse(validatedData.data);
            break;
          default:
            // For other steps, store data as-is (tutorial progress, etc.)
            stepData = validatedData.data;
        }
      } catch (validationError) {
        return NextResponse.json({ 
          error: `Invalid data for step '${validatedData.step}'`, 
          details: validationError instanceof z.ZodError ? validationError.format() : String(validationError)
        }, { status: 400 });
      }
    }

    // Determine if onboarding should be marked as completed
    // Step 6 is the completion step in ONBOARDING_STEPS
    const shouldComplete = validatedData.markCompleted || validatedData.step === 6;
    const nextStep = shouldComplete ? null : getNextOnboardingStep(validatedData.step);

    // Update user with new step and data
    const updateData = {
      onboardingStep: validatedData.step,
      ...(shouldComplete && { onboardingCompleted: true }),
      ...stepData
    };

    const existingUserForStep = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    let stepUpdatedUser;
    if (existingUserForStep) {
      stepUpdatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          onboardingCompleted: true,
          onboardingStep: true,
          updatedAt: true
        }
      });
    } else {
      stepUpdatedUser = await prisma.user.create({
        data: {
          id: userId,
          email: `temp-${userId}@placeholder.local`, // Temporary unique email
          ...getDefaultUserPreferences(),
          ...updateData
        },
        select: {
          onboardingCompleted: true,
          onboardingStep: true,
          updatedAt: true
        }
      });
    }

    const stepInfo = getOnboardingStepByIndex(validatedData.step);
    return NextResponse.json({
      message: `Onboarding step '${stepInfo?.key || validatedData.step}' updated successfully`,
      onboarding: {
        completed: stepUpdatedUser.onboardingCompleted ?? false,
        currentStep: stepUpdatedUser.onboardingStep ?? validatedData.step,
        nextStep
      }
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid onboarding data provided', 
        details: error.format() 
      }, { status: 400 });
    }
    console.error('Error updating onboarding state:', error instanceof Error ? error.message : String(error));
    return NextResponse.json({ 
      error: 'Failed to update onboarding state', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
} 