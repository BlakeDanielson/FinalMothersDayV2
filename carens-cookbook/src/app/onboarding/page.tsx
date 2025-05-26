'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import { OnboardingWizard } from '@/components/OnboardingWizard';
import { RouteProtection } from '@/lib/constants/routes';

/**
 * Main onboarding page - entry point for the onboarding flow
 * Automatically redirects completed users to their intended destination
 */
export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { isCompleted, isLoading, isAuthenticated } = useOnboardingStatus();

  // Handle redirects for completed users
  useEffect(() => {
    if (!isLoaded || isLoading) return;

    // Redirect unauthenticated users to sign in
    if (!user || !isAuthenticated) {
      router.push('/sign-in');
      return;
    }

    // Redirect completed users to their intended destination or home
    if (isCompleted) {
      const intendedDestination = RouteProtection.getAndClearIntendedDestination();
      router.push(intendedDestination || '/');
      return;
    }
  }, [user, isAuthenticated, isCompleted, isLoaded, isLoading, router]);

  // Show loading state while checking status
  if (!isLoaded || isLoading) {
    return <OnboardingLoadingState />;
  }

  // Show error state if user is not authenticated
  if (!user || !isAuthenticated) {
    return <OnboardingErrorState message="Please sign in to continue with onboarding." />;
  }

  // Show completed state (shouldn't normally be seen due to redirect)
  if (isCompleted) {
    return <OnboardingCompletedState />;
  }

  // Render the onboarding wizard
  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingProvider>
        <OnboardingWizard
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
          className="container mx-auto px-4 py-8"
        />
      </OnboardingProvider>
    </div>
  );
}

/**
 * Handle onboarding completion
 */
function handleOnboardingComplete() {
  // Dispatch custom event to notify other components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('onboarding:completed'));
  }

  // Get intended destination and redirect
  const intendedDestination = RouteProtection.getAndClearIntendedDestination();
  window.location.href = intendedDestination || '/';
}

/**
 * Handle onboarding skip
 */
function handleOnboardingSkip() {
  // Same as completion - user chose to skip
  handleOnboardingComplete();
}

/**
 * Loading state component
 */
function OnboardingLoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Preparing Your Onboarding</h2>
        <p className="text-gray-600">We&apos;re setting up your personalized experience...</p>
      </div>
    </div>
  );
}

/**
 * Error state component
 */
function OnboardingErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={() => window.location.href = '/sign-in'}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
}

/**
 * Completed state component (fallback)
 */
function OnboardingCompletedState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Onboarding Complete!</h2>
        <p className="text-gray-600 mb-6">You&apos;ve successfully completed your onboarding. Redirecting you now...</p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue to App
        </button>
      </div>
    </div>
  );
} 