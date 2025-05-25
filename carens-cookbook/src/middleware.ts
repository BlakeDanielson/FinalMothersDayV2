import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be public (accessible without authentication)
const isPublicRoute = createRouteMatcher([
  '/', // Homepage
  '/sign-in(.*)', // Sign-in pages
  '/sign-up(.*)', // Sign-up pages
  '/api/fetch-recipe(.*)', // Public API for fetching recipes
  '/api/recipes(.*)', // Public API for recipes (if some parts are public)
  '/api/scan-recipe(.*)', // Public API for scanning recipes
  '/api/categories', // Public API for categories (returns default for non-authenticated users)
  '/category/(.*)', // Category pages
  // Add any other specific public routes or patterns here
  // For example, if you have public recipe view pages: '/recipe/:id'
]);

// Define routes that should be ignored by Clerk
// This is usually for static assets or specific API routes that handle their own auth
// const ignoredRoutes = createRouteMatcher([
//   '/static/(.*)', // Ignore static assets
//   '/_next/(.*)', // Ignore Next.js internal routes
//   '/favicon.ico',
//   // Add any other routes that Clerk should completely ignore
// ]);

// Make the middleware callback async and use auth.protect() directly
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // According to Clerk docs, auth.protect() should be available here and is async
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match all routes except Next.js internals, static files, and common image/font types.
    '/((?!.+\\.[\\w]+$|_next|static|fonts|assets).)*',
    '/', // Also match the root route explicitly.
    '/(api|trpc)(.*)', // Always run for API routes for potential protection.
  ],
}; 