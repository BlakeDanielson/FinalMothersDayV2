import { Page, expect } from '@playwright/test';

/**
 * Test helper utilities for common operations
 */
export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Wait for the page to be fully loaded
   */
  async waitForPageLoad(timeout = 15000) {
    // Use domcontentloaded instead of networkidle for better reliability
    // networkidle can be too strict and cause timeouts in development
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    
    // Optional: wait a bit for any immediate JavaScript to execute
    await this.page.waitForTimeout(500);
  }

  /**
   * Take a screenshot with a descriptive name
   */
  async takeScreenshot(name: string) {
    try {
      // Ensure the screenshots directory exists
      const fs = await import('fs');
      const path = await import('path');
      const screenshotDir = 'test-results/screenshots';
      
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      
      await this.page.screenshot({ 
        path: `${screenshotDir}/${name}-${Date.now()}.png`,
        fullPage: true,
        timeout: 10000 // Add timeout for screenshot
      });
    } catch (error) {
      console.warn(`Failed to take screenshot ${name}:`, error);
      // Don't throw - screenshots are nice to have but not critical
    }
  }

  /**
   * Wait for an element to be visible and ready for interaction
   */
  async waitForElement(selector: string, timeout = 10000) {
    await this.page.waitForSelector(selector, { 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Fill a form field and verify it was filled correctly
   */
  async fillAndVerify(selector: string, value: string) {
    await this.page.fill(selector, value);
    await expect(this.page.locator(selector)).toHaveValue(value);
  }

  /**
   * Click an element and wait for navigation if expected
   */
  async clickAndWait(selector: string, waitForNavigation = false) {
    if (waitForNavigation) {
      await Promise.all([
        this.page.waitForNavigation(),
        this.page.click(selector)
      ]);
    } else {
      await this.page.click(selector);
    }
  }

  /**
   * Check if an element exists without throwing an error
   */
  async elementExists(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for a specific text to appear on the page
   */
  async waitForText(text: string, timeout = 10000) {
    await this.page.waitForFunction(
      (searchText) => document.body.innerText.includes(searchText),
      text,
      { timeout }
    );
  }

  /**
   * Scroll to an element
   */
  async scrollToElement(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Get the current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Check if we're on a specific page
   */
  async isOnPage(expectedPath: string): Promise<boolean> {
    const currentUrl = new URL(this.page.url());
    return currentUrl.pathname === expectedPath;
  }

  /**
   * Wait for API response
   */
  async waitForApiResponse(urlPattern: string | RegExp, timeout = 10000) {
    return await this.page.waitForResponse(urlPattern, { timeout });
  }

  /**
   * Mock an API response
   */
  async mockApiResponse(urlPattern: string | RegExp, response: any) {
    await this.page.route(urlPattern, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(response)
      });
    });
  }
}

/**
 * Authentication helpers
 */
export class AuthHelpers {
  constructor(private page: Page) {}

  /**
   * Navigate to sign in page
   */
  async goToSignIn() {
    await this.page.goto('/sign-in');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Navigate to sign up page
   */
  async goToSignUp() {
    await this.page.goto('/sign-up');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    // This would check for authentication indicators in your app
    // For example, presence of user menu, absence of sign-in button, etc.
    try {
      await this.page.waitForSelector('[data-testid="user-menu"]', { timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sign out if authenticated
   */
  async signOut() {
    if (await this.isAuthenticated()) {
      await this.page.click('[data-testid="user-menu"]');
      await this.page.click('[data-testid="sign-out-button"]');
      await this.page.waitForLoadState('networkidle');
    }
  }
}

/**
 * Recipe testing helpers
 */
export class RecipeHelpers {
  constructor(private page: Page) {}

  /**
   * Navigate to recipe scanning page
   */
  async goToRecipeScanning() {
    await this.page.goto('/scan-recipe');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Upload an image for recipe scanning
   */
  async uploadRecipeImage(imagePath: string) {
    const fileInput = this.page.locator('input[type="file"]');
    await fileInput.setInputFiles(imagePath);
  }

  /**
   * Wait for recipe processing to complete
   */
  async waitForRecipeProcessing() {
    // Wait for loading indicators to disappear
    await this.page.waitForSelector('[data-testid="processing-indicator"]', { 
      state: 'hidden', 
      timeout: 30000 
    });
  }

  /**
   * Verify recipe data was extracted correctly
   */
  async verifyRecipeExtraction(expectedTitle: string) {
    await expect(this.page.locator('[data-testid="recipe-title"]')).toContainText(expectedTitle);
  }
}

/**
 * Onboarding testing helpers
 */
export class OnboardingHelpers {
  constructor(private page: Page) {}

  /**
   * Start the onboarding process
   */
  async startOnboarding() {
    await this.page.goto('/onboarding');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Complete a specific onboarding step
   */
  async completeStep(stepNumber: number) {
    // This would be customized based on your onboarding flow
    await this.page.click(`[data-testid="step-${stepNumber}-complete"]`);
  }

  /**
   * Skip an onboarding step
   */
  async skipStep() {
    await this.page.click('[data-testid="skip-step"]');
  }

  /**
   * Verify onboarding completion
   */
  async verifyOnboardingComplete() {
    await expect(this.page.locator('[data-testid="onboarding-complete"]')).toBeVisible();
  }
} 