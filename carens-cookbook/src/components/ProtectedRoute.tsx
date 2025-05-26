'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useOnboardingStatus } from '@/hooks/useOnboardingStatus';
import { RouteProtection } from '@/lib/constants/routes';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  requiresAuth?: boolean;
  requiresOnboarding?: boolean;
}

/**
 * ProtectedRoute wrapper component that handles authentication and onboarding redirects
 * Automatically redirects users based on route requirements and user state
 */
export function ProtectedRoute({
  children,
  fallback = <ProtectedRouteFallback />,
  requiresAuth,
  requiresOnboarding
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { isCompleted, isLoading: isStatusLoading, isAuthenticated } = useOnboardingStatus();

  // Determine route requirements (use props or infer from route config)
  const routeRequiresAuth = requiresAuth ?? RouteProtection.requiresAuth(pathname);
  const routeRequiresOnboarding = requiresOnboarding ?? RouteProtection.requiresOnboarding(pathname);

  useEffect(() => {
    // Wait for both user and onboarding status to load
    if (!isUserLoaded || isStatusLoading) return;

    const isUserAuthenticated = !!user && isAuthenticated;
    
    // Get redirect URL based on current state
    const redirectUrl = RouteProtection.getRedirectUrl(
      pathname,
      isUserAuthenticated,
      isCompleted,
      pathname
    );

    if (redirectUrl) {
      console.log(`Redirecting from ${pathname} to ${redirectUrl}`);
      router.push(redirectUrl);
    }
  }, [
    pathname,
    user,
    isUserLoaded,
    isAuthenticated,
    isCompleted,
    isStatusLoading,
    router
  ]);

  // Show loading state while checking authentication and onboarding status
  if (!isUserLoaded || isStatusLoading) {
    return <>{fallback}</>;
  }

  const isUserAuthenticated = !!user && isAuthenticated;

  // Check if user meets route requirements
  const hasAuthAccess = !routeRequiresAuth || isUserAuthenticated;
  const hasOnboardingAccess = !routeRequiresOnboarding || isCompleted;

  // If user doesn't meet requirements, show fallback while redirect happens
  if (!hasAuthAccess || !hasOnboardingAccess) {
    return <>{fallback}</>;
  }

  // User meets all requirements, render children
  return <>{children}</>;
}

/**
 * Default fallback component shown while checking permissions or during redirects
 */
function ProtectedRouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-lg font-medium text-gray-900 mb-2">Loading...</h2>
        <p className="text-gray-600">Checking your access permissions</p>
      </div>
    </div>
  );
}

/**
 * Higher-order component version of ProtectedRoute for easier wrapping
 */
export function withProtectedRoute<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiresAuth?: boolean;
    requiresOnboarding?: boolean;
    fallback?: ReactNode;
  }
) {
  const WrappedComponent = (props: P) => {
    return (
      <ProtectedRoute
        requiresAuth={options?.requiresAuth}
        requiresOnboarding={options?.requiresOnboarding}
        fallback={options?.fallback}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  WrappedComponent.displayName = `withProtectedRoute(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

/**
 * Hook to check if current route is accessible to user
 */
export function useRouteAccess() {
  const pathname = usePathname();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { isCompleted, isLoading: isStatusLoading, isAuthenticated } = useOnboardingStatus();

  const isLoading = !isUserLoaded || isStatusLoading;
  const isUserAuthenticated = !!user && isAuthenticated;

  const routeRequiresAuth = RouteProtection.requiresAuth(pathname);
  const routeRequiresOnboarding = RouteProtection.requiresOnboarding(pathname);

  const hasAuthAccess = !routeRequiresAuth || isUserAuthenticated;
  const hasOnboardingAccess = !routeRequiresOnboarding || isCompleted;
  const hasAccess = hasAuthAccess && hasOnboardingAccess;

  const redirectUrl = isLoading ? null : RouteProtection.getRedirectUrl(
    pathname,
    isUserAuthenticated,
    isCompleted,
    pathname
  );

  return {
    hasAccess,
    hasAuthAccess,
    hasOnboardingAccess,
    routeRequiresAuth,
    routeRequiresOnboarding,
    isLoading,
    redirectUrl,
    shouldRedirect: !!redirectUrl
  };
} 