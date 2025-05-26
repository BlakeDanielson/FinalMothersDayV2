import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { RouteProtection } from '@/lib/constants/routes';

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

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Allow public routes without any checks
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Handle API routes separately (they have their own guards)
  if (isApiRoute(req)) {
    // API routes are protected by their own middleware
    // Just ensure authentication for protected API routes
    if (RouteProtection.requiresAuth(pathname) && !userId) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to sign-in for protected routes
  if (!userId && RouteProtection.requiresAuth(pathname)) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // For authenticated users, check onboarding status for protected routes
  if (userId && RouteProtection.requiresOnboarding(pathname)) {
    try {
      // Check onboarding status from our API
      const baseUrl = req.nextUrl.origin;
      const onboardingResponse = await fetch(`${baseUrl}/api/onboarding/progress`, {
        headers: {
          'Authorization': `Bearer ${userId}`, // Pass user ID for server-side auth
          'Cookie': req.headers.get('cookie') || ''
        }
      });

      if (onboardingResponse.ok) {
        const data = await onboardingResponse.json();
        const isOnboardingComplete = data.progress?.isCompleted || false;

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
      } else {
        // If we can't check onboarding status, allow access but log the issue
        console.warn(`Failed to check onboarding status for user ${userId} on ${pathname}`);
      }
    } catch (error) {
      // If there's an error checking onboarding status, allow access but log the issue
      console.error('Error checking onboarding status in middleware:', error);
    }
  }

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