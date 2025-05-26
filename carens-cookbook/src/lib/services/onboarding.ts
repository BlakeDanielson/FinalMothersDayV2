// Onboarding Progress Tracking Service
// Implements comprehensive step-by-step onboarding progress management

import { prisma } from '@/lib/db';
import { ONBOARDING_STEPS } from '@/lib/constants/user-preferences';
import { getDefaultUserPreferences } from '@/lib/utils/user-preferences';
import type { UserOnboardingProgress, User } from '@/generated/prisma';

export interface OnboardingStepInfo {
  id: number;
  key: string;
  title: string;
  description: string;
  isOptional: boolean;
  isRequired: boolean;
}

export interface UserProgressSummary {
  userId: string;
  currentStep: number;
  nextStep: number | null;
  completedSteps: number[];
  skippedSteps: number[];
  totalSteps: number;
  completedCount: number;
  progressPercentage: number;
  isCompleted: boolean;
  canProceed: boolean;
}

export interface StepCompletionData {
  stepId: number;
  stepKey: string;
  data?: Record<string, unknown>;
  isSkipped?: boolean;
}

export class OnboardingService {
  /**
   * Get all available onboarding steps with metadata
   */
  static getOnboardingSteps(): OnboardingStepInfo[] {
    return ONBOARDING_STEPS.map((step, index) => ({
      id: index,
      key: step.key,
      title: step.title,
      description: step.description,
      isOptional: step.isOptional || false,
      isRequired: !step.isOptional
    }));
  }

  /**
   * Get comprehensive user onboarding progress
   */
  static async getUserProgress(userId: string): Promise<UserProgressSummary> {
    // Get user's basic onboarding status
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        onboardingCompleted: true,
        onboardingStep: true,
        onboardingProgress: {
          orderBy: { stepId: 'asc' }
        }
      }
    });

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const totalSteps = ONBOARDING_STEPS.length;
    const completedSteps = user.onboardingProgress
      .filter(p => p.completedAt !== null)
      .map(p => p.stepId);
    
    const skippedSteps = user.onboardingProgress
      .filter(p => p.skippedAt !== null)
      .map(p => p.stepId);

    const completedCount = completedSteps.length;
    const progressPercentage = Math.round((completedCount / totalSteps) * 100);
    
    // Determine current step (first incomplete step)
    let currentStep = 0;
    for (let i = 0; i < totalSteps; i++) {
      const stepProgress = user.onboardingProgress.find(p => p.stepId === i);
      if (!stepProgress || (!stepProgress.completedAt && !stepProgress.skippedAt)) {
        currentStep = i;
        break;
      }
      if (i === totalSteps - 1) {
        currentStep = totalSteps - 1; // All steps completed
      }
    }

    // Determine next step
    let nextStep: number | null = null;
    if (currentStep < totalSteps - 1 && !user.onboardingCompleted) {
      nextStep = currentStep + 1;
    }

    const isCompleted = user.onboardingCompleted || completedCount === totalSteps;
    const canProceed = currentStep < totalSteps - 1;

    return {
      userId,
      currentStep,
      nextStep,
      completedSteps,
      skippedSteps,
      totalSteps,
      completedCount,
      progressPercentage,
      isCompleted,
      canProceed
    };
  }

  /**
   * Mark a step as completed with optional data
   */
  static async markStepCompleted(
    userId: string, 
    stepId: number, 
    data?: Record<string, unknown>
  ): Promise<UserOnboardingProgress> {
    // Validate step ID
    if (stepId < 0 || stepId >= ONBOARDING_STEPS.length) {
      throw new Error(`Invalid step ID: ${stepId}. Must be between 0 and ${ONBOARDING_STEPS.length - 1}`);
    }

    const stepInfo = ONBOARDING_STEPS[stepId];
    
    // Ensure user exists
    await this.ensureUserExists(userId);

    // Create or update step progress
    const stepProgress = await prisma.userOnboardingProgress.upsert({
      where: {
        userId_stepId: {
          userId,
          stepId
        }
      },
      update: {
        completedAt: new Date(),
        skippedAt: null, // Clear skip if previously skipped
        data: data ? JSON.parse(JSON.stringify(data)) : null,
        stepKey: stepInfo.key,
        updatedAt: new Date()
      },
      create: {
        userId,
        stepId,
        stepKey: stepInfo.key,
        completedAt: new Date(),
        data: data ? JSON.parse(JSON.stringify(data)) : null,
        isRequired: !stepInfo.isOptional
      }
    });

    // Update user's current step if this is the furthest step
    await this.updateUserCurrentStep(userId);

    // Check if onboarding should be marked as completed
    await this.checkAndMarkOnboardingComplete(userId);

    return stepProgress;
  }

  /**
   * Mark a step as skipped
   */
  static async markStepSkipped(userId: string, stepId: number): Promise<UserOnboardingProgress> {
    // Validate step ID
    if (stepId < 0 || stepId >= ONBOARDING_STEPS.length) {
      throw new Error(`Invalid step ID: ${stepId}. Must be between 0 and ${ONBOARDING_STEPS.length - 1}`);
    }

    const stepInfo = ONBOARDING_STEPS[stepId];

    // Check if step can be skipped
    if (!stepInfo.isOptional) {
      throw new Error(`Step ${stepId} (${stepInfo.key}) is required and cannot be skipped`);
    }

    // Ensure user exists
    await this.ensureUserExists(userId);

    // Create or update step progress
    const stepProgress = await prisma.userOnboardingProgress.upsert({
      where: {
        userId_stepId: {
          userId,
          stepId
        }
      },
      update: {
        skippedAt: new Date(),
        completedAt: null, // Clear completion if previously completed
        stepKey: stepInfo.key,
        updatedAt: new Date()
      },
      create: {
        userId,
        stepId,
        stepKey: stepInfo.key,
        skippedAt: new Date(),
        isRequired: false
      }
    });

    // Update user's current step
    await this.updateUserCurrentStep(userId);

    return stepProgress;
  }

  /**
   * Get the next incomplete step for a user
   */
  static async getNextStep(userId: string): Promise<OnboardingStepInfo | null> {
    const progress = await this.getUserProgress(userId);
    
    if (progress.nextStep === null) {
      return null;
    }

    const stepInfo = ONBOARDING_STEPS[progress.nextStep];
    return {
      id: progress.nextStep,
      key: stepInfo.key,
      title: stepInfo.title,
      description: stepInfo.description,
      isOptional: stepInfo.isOptional || false,
      isRequired: !stepInfo.isOptional
    };
  }

  /**
   * Calculate progress percentage for a user
   */
  static async calculateProgressPercentage(userId: string): Promise<number> {
    const progress = await this.getUserProgress(userId);
    return progress.progressPercentage;
  }

  /**
   * Reset user's onboarding progress
   */
  static async resetProgress(userId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      // Delete all progress records
      await tx.userOnboardingProgress.deleteMany({
        where: { userId }
      });

      // Reset user's onboarding status
      await tx.user.update({
        where: { id: userId },
        data: {
          onboardingCompleted: false,
          onboardingStep: 0
        }
      });
    });
  }

  /**
   * Get detailed step data for a specific step
   */
  static async getStepData(userId: string, stepId: number): Promise<Record<string, unknown> | null> {
    const stepProgress = await prisma.userOnboardingProgress.findUnique({
      where: {
        userId_stepId: {
          userId,
          stepId
        }
      }
    });

    if (!stepProgress || !stepProgress.data) {
      return null;
    }

    return stepProgress.data as Record<string, unknown>;
  }

  /**
   * Bulk update multiple steps (useful for importing progress)
   */
  static async bulkUpdateSteps(
    userId: string, 
    steps: StepCompletionData[]
  ): Promise<UserOnboardingProgress[]> {
    const results: UserOnboardingProgress[] = [];

    for (const step of steps) {
      if (step.isSkipped) {
        const result = await this.markStepSkipped(userId, step.stepId);
        results.push(result);
      } else {
        const result = await this.markStepCompleted(userId, step.stepId, step.data);
        results.push(result);
      }
    }

    return results;
  }

  /**
   * Get onboarding analytics for a user
   */
  static async getOnboardingAnalytics(userId: string) {
    const progress = await this.getUserProgress(userId);
    const stepProgress = await prisma.userOnboardingProgress.findMany({
      where: { userId },
      orderBy: { stepId: 'asc' }
    });

    const analytics = {
      ...progress,
      stepDetails: stepProgress.map(sp => ({
        stepId: sp.stepId,
        stepKey: sp.stepKey,
        isCompleted: !!sp.completedAt,
        isSkipped: !!sp.skippedAt,
        completedAt: sp.completedAt,
        skippedAt: sp.skippedAt,
        hasData: !!sp.data,
        createdAt: sp.createdAt,
        updatedAt: sp.updatedAt
      })),
      timeToComplete: this.calculateTimeToComplete(stepProgress),
      mostRecentActivity: stepProgress
        .filter(sp => sp.completedAt || sp.skippedAt)
        .sort((a, b) => {
          const aTime = a.completedAt || a.skippedAt || new Date(0);
          const bTime = b.completedAt || b.skippedAt || new Date(0);
          return bTime.getTime() - aTime.getTime();
        })[0]
    };

    return analytics;
  }

  // Private helper methods

  private static async ensureUserExists(userId: string): Promise<User> {
    return await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: '',
        ...getDefaultUserPreferences()
      }
    });
  }

  private static async updateUserCurrentStep(userId: string): Promise<void> {
    const progress = await this.getUserProgress(userId);
    
    await prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStep: progress.currentStep
      }
    });
  }

  private static async checkAndMarkOnboardingComplete(userId: string): Promise<void> {
    const progress = await this.getUserProgress(userId);
    
    // Check if all required steps are completed
    const requiredSteps = ONBOARDING_STEPS
      .map((step, index) => ({ ...step, id: index }))
      .filter(step => !step.isOptional);
    
    const completedRequiredSteps = requiredSteps.filter(step => 
      progress.completedSteps.includes(step.id)
    );

    const isOnboardingComplete = completedRequiredSteps.length === requiredSteps.length;

    if (isOnboardingComplete && !progress.isCompleted) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          onboardingCompleted: true,
          onboardingStep: ONBOARDING_STEPS.length - 1
        }
      });
    }
  }

  private static calculateTimeToComplete(stepProgress: UserOnboardingProgress[]): number | null {
    const completedSteps = stepProgress.filter(sp => sp.completedAt);
    
    if (completedSteps.length === 0) return null;

    const firstStep = completedSteps.sort((a, b) => 
      a.createdAt.getTime() - b.createdAt.getTime()
    )[0];
    
    const lastStep = completedSteps.sort((a, b) => 
      (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0)
    )[0];

    if (!lastStep.completedAt) return null;

    return lastStep.completedAt.getTime() - firstStep.createdAt.getTime();
  }
} 