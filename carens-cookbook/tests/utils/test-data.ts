import { Page } from '@playwright/test';

/**
 * Test data interfaces
 */
export interface TestUser {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
  onboardingComplete?: boolean;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced';
  favoriteCuisines: string[];
  cookingTime: 'quick' | 'medium' | 'long' | 'any';
}

export interface TestRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  category: string;
  imageUrl?: string;
  cookingTime?: number;
  servings?: number;
}

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  recipeCount?: number;
}

/**
 * Test data factory for creating consistent test data
 */
export class TestDataFactory {
  /**
   * Create test users with various configurations
   */
  static createTestUsers(): Record<string, TestUser> {
    return {
      newUser: {
        id: 'test-user-new',
        email: 'newuser@test.com',
        name: 'New User',
        onboardingComplete: false
      },
      
      completedUser: {
        id: 'test-user-completed',
        email: 'completed@test.com',
        name: 'Completed User',
        onboardingComplete: true,
        preferences: {
          dietaryRestrictions: ['vegetarian'],
          cookingSkillLevel: 'intermediate',
          favoriteCuisines: ['italian', 'mexican'],
          cookingTime: 'medium'
        }
      },

      beginnerUser: {
        id: 'test-user-beginner',
        email: 'beginner@test.com',
        name: 'Beginner Cook',
        onboardingComplete: true,
        preferences: {
          dietaryRestrictions: [],
          cookingSkillLevel: 'beginner',
          favoriteCuisines: ['american'],
          cookingTime: 'quick'
        }
      },

      advancedUser: {
        id: 'test-user-advanced',
        email: 'advanced@test.com',
        name: 'Advanced Cook',
        onboardingComplete: true,
        preferences: {
          dietaryRestrictions: ['gluten-free', 'dairy-free'],
          cookingSkillLevel: 'advanced',
          favoriteCuisines: ['french', 'japanese', 'indian'],
          cookingTime: 'any'
        }
      }
    };
  }

  /**
   * Create test recipes for various scenarios
   */
  static createTestRecipes(): Record<string, TestRecipe> {
    return {
      simpleBreakfast: {
        id: 'recipe-simple-breakfast',
        title: 'Simple Scrambled Eggs',
        description: 'Quick and easy scrambled eggs for breakfast',
        ingredients: [
          '3 large eggs',
          '2 tablespoons butter',
          'Salt and pepper to taste',
          '2 tablespoons milk'
        ],
        instructions: [
          'Crack eggs into a bowl and whisk with milk',
          'Heat butter in a non-stick pan over medium heat',
          'Pour in eggs and gently stir until set',
          'Season with salt and pepper'
        ],
        category: 'Breakfast',
        cookingTime: 10,
        servings: 2
      },

      complexDinner: {
        id: 'recipe-complex-dinner',
        title: 'Beef Wellington',
        description: 'Classic beef wellington with mushroom duxelles',
        ingredients: [
          '2 lb beef tenderloin',
          '1 lb puff pastry',
          '8 oz mushrooms',
          '4 oz pâté',
          '8 slices prosciutto',
          '2 egg yolks',
          'Fresh thyme',
          'Salt and pepper'
        ],
        instructions: [
          'Sear the beef tenderloin on all sides',
          'Prepare mushroom duxelles',
          'Wrap beef with pâté and prosciutto',
          'Encase in puff pastry',
          'Brush with egg wash',
          'Bake at 400°F for 25-30 minutes'
        ],
        category: 'Main Course',
        cookingTime: 120,
        servings: 6
      },

      vegetarianLunch: {
        id: 'recipe-vegetarian-lunch',
        title: 'Mediterranean Quinoa Bowl',
        description: 'Healthy quinoa bowl with Mediterranean flavors',
        ingredients: [
          '1 cup quinoa',
          '1 cucumber, diced',
          '2 tomatoes, chopped',
          '1/2 red onion, sliced',
          '1/4 cup olives',
          '4 oz feta cheese',
          '2 tbsp olive oil',
          '1 lemon, juiced',
          'Fresh herbs'
        ],
        instructions: [
          'Cook quinoa according to package directions',
          'Chop all vegetables',
          'Combine quinoa with vegetables',
          'Whisk olive oil and lemon juice',
          'Toss with dressing and top with feta'
        ],
        category: 'Lunch',
        cookingTime: 25,
        servings: 4
      },

      quickSnack: {
        id: 'recipe-quick-snack',
        title: 'Avocado Toast',
        description: 'Simple avocado toast with toppings',
        ingredients: [
          '2 slices whole grain bread',
          '1 ripe avocado',
          '1 tomato, sliced',
          'Salt and pepper',
          'Red pepper flakes',
          'Lemon juice'
        ],
        instructions: [
          'Toast bread until golden',
          'Mash avocado with lemon juice',
          'Spread avocado on toast',
          'Top with tomato slices',
          'Season with salt, pepper, and red pepper flakes'
        ],
        category: 'Snacks',
        cookingTime: 5,
        servings: 2
      }
    };
  }

  /**
   * Create test categories
   */
  static createTestCategories(): Record<string, TestCategory> {
    return {
      breakfast: {
        id: 'cat-breakfast',
        name: 'Breakfast',
        description: 'Morning meals and breakfast dishes',
        isDefault: true,
        recipeCount: 15
      },

      lunch: {
        id: 'cat-lunch',
        name: 'Lunch',
        description: 'Midday meals and light dishes',
        isDefault: true,
        recipeCount: 23
      },

      dinner: {
        id: 'cat-dinner',
        name: 'Main Course',
        description: 'Main dishes and dinner recipes',
        isDefault: true,
        recipeCount: 45
      },

      snacks: {
        id: 'cat-snacks',
        name: 'Snacks',
        description: 'Quick bites and appetizers',
        isDefault: true,
        recipeCount: 12
      },

      desserts: {
        id: 'cat-desserts',
        name: 'Desserts',
        description: 'Sweet treats and desserts',
        isDefault: true,
        recipeCount: 18
      },

      custom: {
        id: 'cat-custom',
        name: 'My Custom Category',
        description: 'User-created custom category',
        isDefault: false,
        recipeCount: 3
      }
    };
  }

  /**
   * Create test URLs for recipe scanning
   */
  static getTestRecipeUrls(): Record<string, string> {
    return {
      allRecipes: 'https://www.allrecipes.com/recipe/213742/cheesy-chicken-broccoli-casserole/',
      foodNetwork: 'https://www.foodnetwork.com/recipes/alton-brown/baked-macaroni-and-cheese-recipe-1939524',
      simplyRecipes: 'https://www.simplyrecipes.com/recipes/basic_pancakes/',
      invalid: 'https://example.com/not-a-recipe',
      timeout: 'https://httpstat.us/200?sleep=30000' // Simulates slow response
    };
  }
}

/**
 * Test data manager for setting up and cleaning test data
 */
export class TestDataManager {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Set up test user authentication state
   */
  async setupTestUser(userType: keyof ReturnType<typeof TestDataFactory.createTestUsers>) {
    const users = TestDataFactory.createTestUsers();
    const user = users[userType];

    // Mock authentication state
    await this.page.addInitScript((userData) => {
      // Set up mock user data in localStorage/sessionStorage
      window.localStorage.setItem('test-user', JSON.stringify(userData));
      
      // Mock Clerk user object
      (window as any).__CLERK_TEST_USER__ = userData;
    }, user);

    return user;
  }

  /**
   * Set up test recipes in the database
   */
  async setupTestRecipes(recipeKeys?: string[]) {
    const recipes = TestDataFactory.createTestRecipes();
    const recipesToSetup = recipeKeys 
      ? recipeKeys.map(key => recipes[key]).filter(Boolean)
      : Object.values(recipes);

    // Mock API responses for recipes
    await this.page.route('**/api/recipes**', async route => {
      const url = route.request().url();
      
      if (url.includes('/api/recipes') && route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ recipes: recipesToSetup })
        });
      } else {
        await route.continue();
      }
    });

    return recipesToSetup;
  }

  /**
   * Set up test categories
   */
  async setupTestCategories(categoryKeys?: string[]) {
    const categories = TestDataFactory.createTestCategories();
    const categoriesToSetup = categoryKeys
      ? categoryKeys.map(key => categories[key]).filter(Boolean)
      : Object.values(categories);

    // Mock API responses for categories
    await this.page.route('**/api/categories**', async route => {
      const url = route.request().url();
      
      if (url.includes('/api/categories') && route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ categories: categoriesToSetup })
        });
      } else {
        await route.continue();
      }
    });

    return categoriesToSetup;
  }

  /**
   * Mock recipe scanning API responses
   */
  async mockRecipeScanning(scenario: 'success' | 'failure' | 'timeout' = 'success') {
    await this.page.route('**/api/scan-recipe**', async route => {
      const delay = scenario === 'timeout' ? 30000 : 1000;
      
      await new Promise(resolve => setTimeout(resolve, delay));

      if (scenario === 'failure') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to scan recipe' })
        });
      } else if (scenario === 'timeout') {
        await route.abort();
      } else {
        const mockRecipe = TestDataFactory.createTestRecipes().simpleBreakfast;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ recipe: mockRecipe })
        });
      }
    });
  }

  /**
   * Mock onboarding API responses
   */
  async mockOnboardingApi() {
    // Mock onboarding progress
    await this.page.route('**/api/onboarding/progress**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          currentStep: 'WELCOME',
          completedSteps: [],
          isComplete: false
        })
      });
    });

    // Mock step completion
    await this.page.route('**/api/onboarding/steps/**/complete**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true })
      });
    });
  }

  /**
   * Clean up test data
   */
  async cleanup() {
    // Clear all routes
    await this.page.unrouteAll();
    
    // Clear local storage
    await this.page.evaluate(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
  }
}

/**
 * Utility functions for test data
 */
export class TestDataUtils {
  /**
   * Generate random test data
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {
    return `test-${this.generateRandomString()}@example.com`;
  }

  /**
   * Generate random recipe title
   */
  static generateRandomRecipeTitle(): string {
    const adjectives = ['Delicious', 'Quick', 'Easy', 'Healthy', 'Spicy', 'Sweet'];
    const foods = ['Pasta', 'Chicken', 'Salad', 'Soup', 'Sandwich', 'Curry'];
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const food = foods[Math.floor(Math.random() * foods.length)];
    
    return `${adjective} ${food}`;
  }

  /**
   * Wait for a specific amount of time
   */
  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry an operation with exponential backoff
   */
  static async retry<T>(
    operation: () => Promise<T>,
    maxAttempts: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxAttempts) {
          throw lastError;
        }
        
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await this.wait(delay);
      }
    }
    
    throw lastError!;
  }
} 