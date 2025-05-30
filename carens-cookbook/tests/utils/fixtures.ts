import { test as base, expect as baseExpect } from '@playwright/test';
import { 
  HomePage, 
  OnboardingPage, 
  RecipeScanPage, 
  CategoryPage, 
  SettingsPage 
} from './page-objects';
import { 
  TestHelpers, 
  AuthHelpers, 
  RecipeHelpers, 
  OnboardingHelpers 
} from './test-helpers';
import { 
  TestDataManager, 
  TestDataFactory, 
  TestDataUtils,
  TestUser 
} from './test-data';
import type { Route } from '@playwright/test';

/**
 * Extended test fixtures with page objects and utilities
 */
type TestFixtures = {
  // Page Objects
  homePage: HomePage;
  onboardingPage: OnboardingPage;
  recipeScanPage: RecipeScanPage;
  categoryPage: CategoryPage;
  settingsPage: SettingsPage;

  // Helper Classes
  testHelpers: TestHelpers;
  authHelpers: AuthHelpers;
  recipeHelpers: RecipeHelpers;
  onboardingHelpers: OnboardingHelpers;

  // Data Management
  testDataManager: TestDataManager;
  testUser: TestUser;

  // Common Setup Scenarios
  authenticatedUser: void;
  newUser: void;
  userWithRecipes: void;
  userWithCategories: void;
};

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  // Page Object Fixtures
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  onboardingPage: async ({ page }, use) => {
    const onboardingPage = new OnboardingPage(page);
    await use(onboardingPage);
  },

  recipeScanPage: async ({ page }, use) => {
    const recipeScanPage = new RecipeScanPage(page);
    await use(recipeScanPage);
  },

  categoryPage: async ({ page }, use) => {
    const categoryPage = new CategoryPage(page);
    await use(categoryPage);
  },

  settingsPage: async ({ page }, use) => {
    const settingsPage = new SettingsPage(page);
    await use(settingsPage);
  },

  // Helper Class Fixtures
  testHelpers: async ({ page }, use) => {
    const testHelpers = new TestHelpers(page);
    await use(testHelpers);
  },

  authHelpers: async ({ page }, use) => {
    const authHelpers = new AuthHelpers(page);
    await use(authHelpers);
  },

  recipeHelpers: async ({ page }, use) => {
    const recipeHelpers = new RecipeHelpers(page);
    await use(recipeHelpers);
  },

  onboardingHelpers: async ({ page }, use) => {
    const onboardingHelpers = new OnboardingHelpers(page);
    await use(onboardingHelpers);
  },

  // Data Management Fixtures
  testDataManager: async ({ page }, use) => {
    const testDataManager = new TestDataManager(page);
    await use(testDataManager);
    // Cleanup after test
    await testDataManager.cleanup();
  },

  testUser: async ({ testDataManager }, use) => {
    const user = await testDataManager.setupTestUser('completedUser');
    await use(user);
  },

  // Common Setup Scenarios
  authenticatedUser: async ({ page, testDataManager }, use) => {
    // Set up an authenticated user with completed onboarding
    const user = await testDataManager.setupTestUser('completedUser');
    
    // Mock authentication state
    await page.addInitScript(() => {
      // Mock Clerk authentication
      (window as any).__CLERK_FRONTEND_API__ = 'test-frontend-api';
      (window as any).__CLERK_PUBLISHABLE_KEY__ = 'test-publishable-key';
    });

    // Set up basic categories and recipes
    await testDataManager.setupTestCategories();
    await testDataManager.setupTestRecipes();

    await use();
  },

  newUser: async ({ page, testDataManager }, use) => {
    // Set up a new user who hasn't completed onboarding
    const user = await testDataManager.setupTestUser('newUser');
    
    // Mock onboarding API
    await testDataManager.mockOnboardingApi();

    await use();
  },

  userWithRecipes: async ({ page, testDataManager }, use) => {
    // Set up a user with a full set of test recipes
    const user = await testDataManager.setupTestUser('completedUser');
    await testDataManager.setupTestCategories();
    await testDataManager.setupTestRecipes();

    // Mock additional recipe data
    await page.route('**/api/recipes/user/**', async (route: Route) => {
      const recipes = TestDataFactory.createTestRecipes();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          recipes: Object.values(recipes),
          total: Object.keys(recipes).length
        })
      });
    });

    await use();
  },

  userWithCategories: async ({ page, testDataManager }, use) => {
    // Set up a user with custom categories
    const user = await testDataManager.setupTestUser('completedUser');
    const categories = await testDataManager.setupTestCategories();

    // Add some custom categories
    const customCategories = [
      {
        id: 'custom-1',
        name: 'Holiday Favorites',
        description: 'Special occasion recipes',
        isDefault: false,
        recipeCount: 8
      },
      {
        id: 'custom-2',
        name: 'Quick Weeknight',
        description: 'Fast meals for busy nights',
        isDefault: false,
        recipeCount: 12
      }
    ];

    await page.route('**/api/categories/user/**', async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          categories: [...categories, ...customCategories]
        })
      });
    });

    await use();
  }
});

/**
 * Custom expect extensions for recipe app testing
 */
export const expect = baseExpect.extend({
  /**
   * Check if a recipe card is properly displayed
   */
  async toBeValidRecipeCard(locator, expectedData?: { title?: string; category?: string }) {
    const assertionName = 'toBeValidRecipeCard';
    let pass: boolean;
    let matcherResult: any;

    try {
      // Check if the recipe card is visible
      await baseExpect(locator).toBeVisible();
      
      // Check for required elements
      const titleElement = locator.locator('[data-testid="recipe-title"]');
      const categoryElement = locator.locator('[data-testid="recipe-category"]');
      const imageElement = locator.locator('[data-testid="recipe-image"]');

      await baseExpect(titleElement).toBeVisible();
      await baseExpect(categoryElement).toBeVisible();
      
      // Optional checks if expected data is provided
      if (expectedData?.title) {
        await baseExpect(titleElement).toContainText(expectedData.title);
      }
      
      if (expectedData?.category) {
        await baseExpect(categoryElement).toContainText(expectedData.category);
      }

      pass = true;
      matcherResult = {
        message: () => `Recipe card is valid`,
        pass: true
      };
    } catch (error) {
      pass = false;
      matcherResult = {
        message: () => `Recipe card is not valid: ${error}`,
        pass: false
      };
    }

    return matcherResult;
  },

  /**
   * Check if a category grid is properly displayed
   */
  async toBeValidCategoryGrid(locator, expectedCount?: number) {
    const assertionName = 'toBeValidCategoryGrid';
    let pass: boolean;
    let matcherResult: any;

    try {
      // Check if the grid is visible
      await baseExpect(locator).toBeVisible();
      
      // Check for category cards
      const categoryCards = locator.locator('[data-testid="category-card"]');
      await baseExpect(categoryCards.first()).toBeVisible();
      
      // Check count if specified
      if (expectedCount !== undefined) {
        await baseExpect(categoryCards).toHaveCount(expectedCount);
      }

      // Verify each category card has required elements
      const count = await categoryCards.count();
      for (let i = 0; i < Math.min(count, 3); i++) { // Check first 3 cards
        const card = categoryCards.nth(i);
        await baseExpect(card.locator('[data-testid="category-name"]')).toBeVisible();
        await baseExpect(card.locator('[data-testid="category-count"]')).toBeVisible();
      }

      pass = true;
      matcherResult = {
        message: () => `Category grid is valid with ${count} categories`,
        pass: true
      };
    } catch (error) {
      pass = false;
      matcherResult = {
        message: () => `Category grid is not valid: ${error}`,
        pass: false
      };
    }

    return matcherResult;
  },

  /**
   * Check if onboarding progress is displayed correctly
   */
  async toShowOnboardingProgress(locator, expectedStep?: number, expectedTotal?: number) {
    const assertionName = 'toShowOnboardingProgress';
    let pass: boolean;
    let matcherResult: any;

    try {
      // Check if progress indicator is visible
      await baseExpect(locator).toBeVisible();
      
      // Check for progress elements
      const progressBar = locator.locator('[data-testid="progress-bar"]');
      const stepIndicator = locator.locator('[data-testid="step-indicator"]');
      
      await baseExpect(progressBar).toBeVisible();
      await baseExpect(stepIndicator).toBeVisible();

      // Check specific step if provided
      if (expectedStep !== undefined) {
        await baseExpect(stepIndicator).toContainText(`${expectedStep}`);
      }

      if (expectedTotal !== undefined) {
        await baseExpect(stepIndicator).toContainText(`${expectedTotal}`);
      }

      pass = true;
      matcherResult = {
        message: () => `Onboarding progress is displayed correctly`,
        pass: true
      };
    } catch (error) {
      pass = false;
      matcherResult = {
        message: () => `Onboarding progress is not displayed correctly: ${error}`,
        pass: false
      };
    }

    return matcherResult;
  }
});

/**
 * Test utilities for common operations
 */
export class TestUtils {
  /**
   * Wait for all network requests to complete
   */
  static async waitForNetworkIdle(page: any, timeout = 5000) {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Take a screenshot with timestamp
   */
  static async takeTimestampedScreenshot(page: any, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  /**
   * Mock slow network conditions
   */
  static async mockSlowNetwork(page: any) {
    await page.route('**/*', async (route: Route) => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
      await route.continue();
    });
  }

  /**
   * Mock offline conditions
   */
  static async mockOffline(page: any) {
    await page.route('**/*', async (route: Route) => {
      await route.abort('internetdisconnected');
    });
  }

  /**
   * Restore normal network conditions
   */
  static async restoreNetwork(page: any) {
    await page.unrouteAll();
  }
}

/**
 * Test data helpers for specific scenarios
 */
export class TestScenarios {
  /**
   * Set up a complete onboarding flow test scenario
   */
  static async setupOnboardingScenario(testDataManager: TestDataManager) {
    await testDataManager.setupTestUser('newUser');
    await testDataManager.mockOnboardingApi();
    await testDataManager.setupTestCategories(['breakfast', 'lunch', 'dinner']);
  }

  /**
   * Set up a recipe scanning test scenario
   */
  static async setupRecipeScanningScenario(testDataManager: TestDataManager) {
    await testDataManager.setupTestUser('completedUser');
    await testDataManager.setupTestCategories();
    await testDataManager.mockRecipeScanning('success');
  }

  /**
   * Set up a category management test scenario
   */
  static async setupCategoryManagementScenario(testDataManager: TestDataManager) {
    await testDataManager.setupTestUser('completedUser');
    await testDataManager.setupTestCategories();
    await testDataManager.setupTestRecipes();
  }
}

// Export everything for easy importing
export { TestDataFactory, TestDataUtils, TestDataManager } from './test-data';
export { 
  HomePage, 
  OnboardingPage, 
  RecipeScanPage, 
  CategoryPage, 
  SettingsPage 
} from './page-objects';
export { 
  TestHelpers, 
  AuthHelpers, 
  RecipeHelpers, 
  OnboardingHelpers 
} from './test-helpers'; 