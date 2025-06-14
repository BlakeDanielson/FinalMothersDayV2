// Route Configuration for Onboarding Protection
// Defines which routes require onboarding completion and routing rules

export interface RouteConfig {
  path: string;
  requiresOnboarding: boolean;
  requiresAuth: boolean;
  description: string;
  allowedRoles?: string[];
}

// Routes that are completely public (no auth required)
export const PUBLIC_ROUTES: RouteConfig[] = [
  {
    path: '/',
    requiresOnboarding: false,
    requiresAuth: false,
    description: 'Landing page - accessible to all users'
  },
  {
    path: '/sign-in',
    requiresOnboarding: false,
    requiresAuth: false,
    description: 'Sign in page'
  },
  {
    path: '/sign-up',
    requiresOnboarding: false,
    requiresAuth: false,
    description: 'Sign up page'
  }
];

// API routes that are completely public (no auth required)
export const PUBLIC_API_ROUTES: RouteConfig[] = [
  {
    path: '/api/scan-recipe-stream',
    requiresOnboarding: false,
    requiresAuth: false,
    description: 'Recipe scanning streaming API - accessible to guest users'
  },
  {
    path: '/api/fetch-recipe-stream',
    requiresOnboarding: false,
    requiresAuth: false,
    description: 'Recipe fetching streaming API - accessible to guest users'
  },
  {
    path: '/api/guest',
    requiresOnboarding: false,
    requiresAuth: false,
    description: 'Guest API routes - accessible to all users'
  }
];

// Routes that require authentication but NOT onboarding completion
export const AUTH_ONLY_ROUTES: RouteConfig[] = [
  {
    path: '/onboarding',
    requiresOnboarding: false,
    requiresAuth: true,
    description: 'Onboarding flow - authenticated users only'
  },
  {
    path: '/onboarding/step',
    requiresOnboarding: false,
    requiresAuth: true,
    description: 'Individual onboarding steps'
  }
];

// Routes that require both authentication AND onboarding completion
export const PROTECTED_ROUTES: RouteConfig[] = [
  {
    path: '/profile',
    requiresOnboarding: true,
    requiresAuth: true,
    description: 'User profile page'
  },
  {
    path: '/settings',
    requiresOnboarding: true,
    requiresAuth: true,
    description: 'User settings page'
  },
  {
    path: '/category',
    requiresOnboarding: true,
    requiresAuth: true,
    description: 'Recipe categories - requires completed onboarding'
  }
];

// API routes that require onboarding completion
export const PROTECTED_API_ROUTES: RouteConfig[] = [
  {
    path: '/api/recipes',
    requiresOnboarding: true,
    requiresAuth: true,
    description: 'Recipe management API'
  },
  {
    path: '/api/categories',
    requiresOnboarding: true,
    requiresAuth: true,
    description: 'Category management API'
  },
  {
    path: '/api/scan-recipe',
    requiresOnboarding: true,
    requiresAuth: true,
    description: 'Recipe scanning API'
  },
  {
    path: '/api/fetch-recipe',
    requiresOnboarding: true,
    requiresAuth: true,
    description: 'Recipe fetching API'
  }
];

// API routes that require auth but not onboarding
export const AUTH_API_ROUTES: RouteConfig[] = [
  {
    path: '/api/user-preferences',
    requiresOnboarding: false,
    requiresAuth: true,
    description: 'User preferences API - available during onboarding'
  },
  {
    path: '/api/onboarding',
    requiresOnboarding: false,
    requiresAuth: true,
    description: 'Onboarding progress API'
  }
];

// Combine all route configurations
export const ALL_ROUTES = [
  ...PUBLIC_ROUTES,
  ...PUBLIC_API_ROUTES,
  ...AUTH_ONLY_ROUTES,
  ...PROTECTED_ROUTES,
  ...PROTECTED_API_ROUTES,
  ...AUTH_API_ROUTES
];

// Default redirect paths
export const DEFAULT_REDIRECTS = {
  AFTER_SIGN_IN: '/onboarding',
  AFTER_ONBOARDING: '/',
  UNAUTHORIZED: '/sign-in',
  ONBOARDING_INCOMPLETE: '/onboarding'
} as const;

// Route matching utilities
export class RouteProtection {
  /**
   * Check if a route requires authentication
   */
  static requiresAuth(pathname: string): boolean {
    return this.findRouteConfig(pathname)?.requiresAuth ?? true; // Default to requiring auth
  }

  /**
   * Check if a route requires onboarding completion
   */
  static requiresOnboarding(pathname: string): boolean {
    return this.findRouteConfig(pathname)?.requiresOnboarding ?? false;
  }

  /**
   * Check if a route is completely public
   */
  static isPublicRoute(pathname: string): boolean {
    return PUBLIC_ROUTES.some(route => this.matchesRoute(pathname, route.path));
  }

  /**
   * Check if a route is onboarding-related
   */
  static isOnboardingRoute(pathname: string): boolean {
    return pathname.startsWith('/onboarding');
  }

  /**
   * Check if a route is an API route
   */
  static isApiRoute(pathname: string): boolean {
    return pathname.startsWith('/api');
  }

  /**
   * Find the route configuration for a given pathname
   */
  static findRouteConfig(pathname: string): RouteConfig | undefined {
    return ALL_ROUTES.find(route => this.matchesRoute(pathname, route.path));
  }

  /**
   * Check if a pathname matches a route pattern
   * Supports exact matches and prefix matches
   */
  static matchesRoute(pathname: string, routePattern: string): boolean {
    // Exact match
    if (pathname === routePattern) return true;
    
    // Prefix match for dynamic routes
    if (routePattern.endsWith('/') || pathname.startsWith(routePattern + '/')) {
      return pathname.startsWith(routePattern);
    }
    
    return false;
  }

  /**
   * Get the appropriate redirect URL based on user state and intended destination
   */
  static getRedirectUrl(
    pathname: string,
    isAuthenticated: boolean,
    isOnboardingComplete: boolean,
    intendedDestination?: string
  ): string | null {
    // If user is not authenticated and route requires auth
    if (!isAuthenticated && this.requiresAuth(pathname)) {
      return DEFAULT_REDIRECTS.UNAUTHORIZED;
    }

    // If user is authenticated but onboarding incomplete and route requires onboarding
    if (isAuthenticated && !isOnboardingComplete && this.requiresOnboarding(pathname)) {
      // Store intended destination for after onboarding
      if (typeof window !== 'undefined' && intendedDestination) {
        sessionStorage.setItem('intended_destination', intendedDestination);
      }
      return DEFAULT_REDIRECTS.ONBOARDING_INCOMPLETE;
    }

    // If user completed onboarding and is on onboarding route, redirect to intended destination or home
    if (isAuthenticated && isOnboardingComplete && this.isOnboardingRoute(pathname)) {
      if (typeof window !== 'undefined') {
        const intended = sessionStorage.getItem('intended_destination');
        if (intended) {
          sessionStorage.removeItem('intended_destination');
          return intended;
        }
      }
      return DEFAULT_REDIRECTS.AFTER_ONBOARDING;
    }

    return null; // No redirect needed
  }

  /**
   * Get stored intended destination and clear it
   */
  static getAndClearIntendedDestination(): string | null {
    if (typeof window === 'undefined') return null;
    
    const intended = sessionStorage.getItem('intended_destination');
    if (intended) {
      sessionStorage.removeItem('intended_destination');
      return intended;
    }
    return null;
  }
} 