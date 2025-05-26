// Server-side middleware for API route protection
// Validates onboarding completion status before allowing access to protected endpoints

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { RouteProtection } from '@/lib/constants/routes';
import { OnboardingService } from '@/lib/services/onboarding';

export interface OnboardingGuardOptions {
  requiresAuth?: boolean;
  requiresOnboarding?: boolean;
  bypassForAdmin?: boolean;
  customErrorMessage?: string;
}

/**
 * Middleware function to guard API routes based on onboarding completion
 */
export async function onboardingGuard(
  request: NextRequest,
  options: OnboardingGuardOptions = {}
): Promise<NextResponse | null> {
  const pathname = request.nextUrl.pathname;
  
  // Determine requirements (use options or infer from route config)
  const requiresAuth = options.requiresAuth ?? RouteProtection.requiresAuth(pathname);
  const requiresOnboarding = options.requiresOnboarding ?? RouteProtection.requiresOnboarding(pathname);

  // If route doesn't require protection, allow access
  if (!requiresAuth && !requiresOnboarding) {
    return null; // Continue to next middleware/handler
  }

  try {
    // Check authentication
    const { userId } = await auth();
    
    if (requiresAuth && !userId) {
      return NextResponse.json(
        { 
          error: 'Unauthorized', 
          message: 'Authentication required to access this resource',
          code: 'AUTH_REQUIRED'
        },
        { status: 401 }
      );
    }

    // If onboarding is required, check completion status
    if (requiresOnboarding && userId) {
      try {
        const progress = await OnboardingService.getUserProgress(userId);
        
        if (!progress.isCompleted) {
          return NextResponse.json(
            {
              error: 'Onboarding Incomplete',
              message: options.customErrorMessage || 'Please complete your onboarding to access this feature',
              code: 'ONBOARDING_REQUIRED',
              onboardingStatus: {
                currentStep: progress.currentStep,
                progressPercentage: progress.progressPercentage,
                nextStep: progress.nextStep
              }
            },
            { status: 403 }
          );
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        
        // In case of error, allow access but log the issue
        // This prevents breaking the app if onboarding service is down
        console.warn(`Onboarding check failed for user ${userId} on ${pathname}, allowing access`);
      }
    }

    return null; // All checks passed, continue to handler
    
  } catch (error) {
    console.error('Error in onboarding guard:', error);
    
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to validate access permissions',
        code: 'GUARD_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * Higher-order function to wrap API route handlers with onboarding protection
 */
export function withOnboardingGuard<T extends unknown[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  options: OnboardingGuardOptions = {}
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    // Run the guard
    const guardResponse = await onboardingGuard(request, options);
    
    // If guard returns a response, return it (access denied)
    if (guardResponse) {
      return guardResponse;
    }
    
    // Otherwise, continue to the original handler
    return handler(request, ...args);
  };
}

/**
 * Utility function to check if a user has completed onboarding (for use in API routes)
 */
export async function checkOnboardingStatus(userId: string): Promise<{
  isCompleted: boolean;
  currentStep: number;
  progressPercentage: number;
  nextStep: number | null;
}> {
  try {
    const progress = await OnboardingService.getUserProgress(userId);
    return {
      isCompleted: progress.isCompleted,
      currentStep: progress.currentStep,
      progressPercentage: progress.progressPercentage,
      nextStep: progress.nextStep
    };
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    // Return safe defaults if check fails
    return {
      isCompleted: false,
      currentStep: 0,
      progressPercentage: 0,
      nextStep: 1
    };
  }
}

/**
 * Middleware for development environment that can bypass onboarding checks
 */
export function createDevBypassMiddleware(isDevelopment: boolean = process.env.NODE_ENV === 'development') {
  return async (request: NextRequest, options: OnboardingGuardOptions = {}): Promise<NextResponse | null> => {
    // In development, check for bypass header
    if (isDevelopment && request.headers.get('x-bypass-onboarding') === 'true') {
      console.log(`[DEV] Bypassing onboarding check for ${request.nextUrl.pathname}`);
      return null; // Allow access
    }
    
    // Otherwise, run normal guard
    return onboardingGuard(request, options);
  };
}

/**
 * Create a standardized error response for onboarding-related issues
 */
export function createOnboardingErrorResponse(
  type: 'AUTH_REQUIRED' | 'ONBOARDING_REQUIRED' | 'GUARD_ERROR',
  customMessage?: string,
  additionalData?: Record<string, unknown>
): NextResponse {
  const responses = {
    AUTH_REQUIRED: {
      status: 401,
      error: 'Unauthorized',
      message: 'Authentication required to access this resource',
      code: 'AUTH_REQUIRED'
    },
    ONBOARDING_REQUIRED: {
      status: 403,
      error: 'Onboarding Incomplete',
      message: 'Please complete your onboarding to access this feature',
      code: 'ONBOARDING_REQUIRED'
    },
    GUARD_ERROR: {
      status: 500,
      error: 'Internal Server Error',
      message: 'Failed to validate access permissions',
      code: 'GUARD_ERROR'
    }
  };

  const response = responses[type];
  
  return NextResponse.json(
    {
      ...response,
      ...(customMessage && { message: customMessage }),
      ...additionalData
    },
    { status: response.status }
  );
} 