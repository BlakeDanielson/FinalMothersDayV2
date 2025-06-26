import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { RouteProtection } from '@/lib/constants/routes';
import { OnboardingService } from '@/lib/services/onboarding';

// Define route matchers for different types of routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)'
]);

const isOnboardingRoute = createRouteMatcher([
  '/onboarding(.*)'
]);

const isApiRoute = createRouteMatcher([
  '/api(.*)'
]);

const ALL_PROTECTED_ROUTES = () => true; // Protect all routes by default

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // If the route is not public, it is protected
  if (!isPublicRoute(req)) {
    // For authenticated users, check onboarding status for protected routes
    if (userId) {
      try {
        // Direct service call instead of fetch
        const onboardingProgress = await OnboardingService.getUserProgress(userId);
        const isOnboardingComplete = onboardingProgress.isCompleted;

        // If onboarding is not complete, redirect to onboarding
        if (!isOnboardingComplete && !isOnboardingRoute(req)) {
          const onboardingUrl = new URL('/onboarding', req.url);
          
          // Store intended destination
          const response = NextResponse.redirect(onboardingUrl);
          response.cookies.set('intended_destination', pathname, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 // 1 hour
          });
          
          return response;
        }

        // If onboarding is complete and user is on onboarding route, redirect to intended destination or home
        if (isOnboardingComplete && isOnboardingRoute(req)) {
          const intendedDestination = req.cookies.get('intended_destination')?.value;
          const redirectUrl = new URL(intendedDestination || '/', req.url);
          
          const response = NextResponse.redirect(redirectUrl);
          
          // Clear the intended destination cookie
          if (intendedDestination) {
            response.cookies.delete('intended_destination');
          }
          
          return response;
        }
      } catch (error) {
        // FAIL-CLOSED: If we can't check status, log the error and redirect to sign-in.
        console.error(`CRITICAL: Failed to check onboarding status for user ${userId} on ${pathname}.`, error);
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', pathname);
        return NextResponse.redirect(signInUrl);
      }
    } else {
      // For unauthenticated users, redirect to sign-in for protected routes
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow public routes to pass through
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}; 