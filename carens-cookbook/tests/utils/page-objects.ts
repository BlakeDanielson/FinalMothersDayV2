import { Page, Locator, expect } from '@playwright/test';

/**
 * Base Page Object Model with common functionality
 */
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '') {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  get url(): string {
    return this.page.url();
  }
}

/**
 * Homepage Page Object Model
 */
export class HomePage extends BasePage {
  // Locators
  get welcomeMessage(): Locator {
    return this.page.locator('[data-testid="welcome-message"]');
  }

  get categoryGrid(): Locator {
    return this.page.locator('[data-testid="category-grid"]');
  }

  get categoryCards(): Locator {
    return this.page.locator('[data-testid="category-card"]');
  }

  get addRecipeButton(): Locator {
    return this.page.locator('[data-testid="add-recipe-button"]');
  }

  get searchInput(): Locator {
    return this.page.locator('[data-testid="search-input"]');
  }

  get userMenu(): Locator {
    return this.page.locator('[data-testid="user-menu"]');
  }

  get signInButton(): Locator {
    return this.page.locator('[href="/sign-in"]');
  }

  // Actions
  async clickCategory(categoryName: string) {
    await this.page.click(`[data-testid="category-card"][data-category="${categoryName}"]`);
    await this.waitForPageLoad();
  }

  async searchRecipes(query: string) {
    await this.searchInput.fill(query);
    await this.page.keyboard.press('Enter');
    await this.waitForPageLoad();
  }

  async clickAddRecipe() {
    await this.addRecipeButton.click();
    await this.waitForPageLoad();
  }

  async openUserMenu() {
    await this.userMenu.click();
  }

  async goToSignIn() {
    await this.signInButton.click();
    await this.waitForPageLoad();
  }

  // Assertions
  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle(/Caren's Cookbook/);
    await expect(this.categoryGrid).toBeVisible();
  }

  async verifyCategoriesDisplayed() {
    await expect(this.categoryCards.first()).toBeVisible();
    const count = await this.categoryCards.count();
    expect(count).toBeGreaterThan(0);
  }
}

/**
 * Onboarding Page Object Model
 */
export class OnboardingPage extends BasePage {
  // Locators
  get progressIndicator(): Locator {
    return this.page.locator('[data-testid="onboarding-progress"]');
  }

  get stepTitle(): Locator {
    return this.page.locator('[data-testid="step-title"]');
  }

  get nextButton(): Locator {
    return this.page.locator('[data-testid="next-button"]');
  }

  get backButton(): Locator {
    return this.page.locator('[data-testid="back-button"]');
  }

  get skipButton(): Locator {
    return this.page.locator('[data-testid="skip-button"]');
  }

  get completeButton(): Locator {
    return this.page.locator('[data-testid="complete-button"]');
  }

  // Welcome Flow specific
  get welcomeScreen(): Locator {
    return this.page.locator('[data-testid="welcome-screen"]');
  }

  get appOverviewScreen(): Locator {
    return this.page.locator('[data-testid="app-overview-screen"]');
  }

  // Category Selection specific
  get categorySelectionGrid(): Locator {
    return this.page.locator('[data-testid="category-selection-grid"]');
  }

  get categoryCheckboxes(): Locator {
    return this.page.locator('[data-testid="category-checkbox"]');
  }

  get addCustomCategoryButton(): Locator {
    return this.page.locator('[data-testid="add-custom-category"]');
  }

  // First Recipe Flow specific
  get recipeMethodSelector(): Locator {
    return this.page.locator('[data-testid="recipe-method-selector"]');
  }

  get urlInputMethod(): Locator {
    return this.page.locator('[data-testid="url-input-method"]');
  }

  get imageUploadMethod(): Locator {
    return this.page.locator('[data-testid="image-upload-method"]');
  }

  get manualEntryMethod(): Locator {
    return this.page.locator('[data-testid="manual-entry-method"]');
  }

  // Actions
  async clickNext() {
    await this.nextButton.click();
    await this.waitForPageLoad();
  }

  async clickBack() {
    await this.backButton.click();
    await this.waitForPageLoad();
  }

  async skipStep() {
    await this.skipButton.click();
    await this.waitForPageLoad();
  }

  async completeOnboarding() {
    await this.completeButton.click();
    await this.waitForPageLoad();
  }

  async selectCategories(categoryNames: string[]) {
    for (const categoryName of categoryNames) {
      await this.page.click(`[data-testid="category-checkbox"][data-category="${categoryName}"]`);
    }
  }

  async addCustomCategory(name: string, description?: string) {
    await this.addCustomCategoryButton.click();
    await this.page.fill('[data-testid="custom-category-name"]', name);
    if (description) {
      await this.page.fill('[data-testid="custom-category-description"]', description);
    }
    await this.page.click('[data-testid="save-custom-category"]');
  }

  async selectRecipeMethod(method: 'url' | 'image' | 'manual') {
    const methodMap = {
      url: this.urlInputMethod,
      image: this.imageUploadMethod,
      manual: this.manualEntryMethod
    };
    await methodMap[method].click();
    await this.waitForPageLoad();
  }

  // Assertions
  async verifyOnboardingStarted() {
    await expect(this.progressIndicator).toBeVisible();
    await expect(this.stepTitle).toBeVisible();
  }

  async verifyStepNumber(stepNumber: number) {
    await expect(this.progressIndicator).toContainText(`${stepNumber}`);
  }

  async verifyOnboardingComplete() {
    await expect(this.page.locator('[data-testid="onboarding-complete"]')).toBeVisible();
  }
}

/**
 * Recipe Scanning Page Object Model
 */
export class RecipeScanPage extends BasePage {
  // Locators
  get fileInput(): Locator {
    return this.page.locator('input[type="file"]');
  }

  get urlInput(): Locator {
    return this.page.locator('[data-testid="recipe-url-input"]');
  }

  get scanButton(): Locator {
    return this.page.locator('[data-testid="scan-button"]');
  }

  get processingIndicator(): Locator {
    return this.page.locator('[data-testid="processing-indicator"]');
  }

  get recipePreview(): Locator {
    return this.page.locator('[data-testid="recipe-preview"]');
  }

  get recipeTitle(): Locator {
    return this.page.locator('[data-testid="recipe-title"]');
  }

  get recipeIngredients(): Locator {
    return this.page.locator('[data-testid="recipe-ingredients"]');
  }

  get recipeInstructions(): Locator {
    return this.page.locator('[data-testid="recipe-instructions"]');
  }

  get categorySelector(): Locator {
    return this.page.locator('[data-testid="category-selector"]');
  }

  get saveRecipeButton(): Locator {
    return this.page.locator('[data-testid="save-recipe-button"]');
  }

  get editRecipeButton(): Locator {
    return this.page.locator('[data-testid="edit-recipe-button"]');
  }

  // Actions
  async uploadImage(imagePath: string) {
    await this.fileInput.setInputFiles(imagePath);
    await this.scanButton.click();
  }

  async scanFromUrl(url: string) {
    await this.urlInput.fill(url);
    await this.scanButton.click();
  }

  async waitForProcessing() {
    await expect(this.processingIndicator).toBeVisible();
    await expect(this.processingIndicator).toBeHidden({ timeout: 30000 });
  }

  async selectCategory(categoryName: string) {
    await this.categorySelector.click();
    await this.page.click(`[data-testid="category-option"][data-value="${categoryName}"]`);
  }

  async saveRecipe() {
    await this.saveRecipeButton.click();
    await this.waitForPageLoad();
  }

  async editRecipe() {
    await this.editRecipeButton.click();
    await this.waitForPageLoad();
  }

  // Assertions
  async verifyRecipeExtracted(expectedTitle?: string) {
    await expect(this.recipePreview).toBeVisible();
    await expect(this.recipeTitle).toBeVisible();
    await expect(this.recipeIngredients).toBeVisible();
    await expect(this.recipeInstructions).toBeVisible();
    
    if (expectedTitle) {
      await expect(this.recipeTitle).toContainText(expectedTitle);
    }
  }

  async verifyRecipeSaved() {
    await expect(this.page.locator('[data-testid="recipe-saved-message"]')).toBeVisible();
  }
}

/**
 * Category Page Object Model
 */
export class CategoryPage extends BasePage {
  // Locators
  get categoryTitle(): Locator {
    return this.page.locator('[data-testid="category-title"]');
  }

  get recipeGrid(): Locator {
    return this.page.locator('[data-testid="recipe-grid"]');
  }

  get recipeCards(): Locator {
    return this.page.locator('[data-testid="recipe-card"]');
  }

  get sortSelector(): Locator {
    return this.page.locator('[data-testid="sort-selector"]');
  }

  get filterButton(): Locator {
    return this.page.locator('[data-testid="filter-button"]');
  }

  get backToCategoriesButton(): Locator {
    return this.page.locator('[data-testid="back-to-categories"]');
  }

  // Actions
  async clickRecipe(recipeTitle: string) {
    await this.page.click(`[data-testid="recipe-card"][data-title="${recipeTitle}"]`);
    await this.waitForPageLoad();
  }

  async sortBy(sortOption: string) {
    await this.sortSelector.click();
    await this.page.click(`[data-testid="sort-option"][data-value="${sortOption}"]`);
    await this.waitForPageLoad();
  }

  async goBackToCategories() {
    await this.backToCategoriesButton.click();
    await this.waitForPageLoad();
  }

  // Assertions
  async verifyCategoryLoaded(categoryName: string) {
    await expect(this.categoryTitle).toContainText(categoryName);
    await expect(this.recipeGrid).toBeVisible();
  }

  async verifyRecipesDisplayed() {
    await expect(this.recipeCards.first()).toBeVisible();
    const count = await this.recipeCards.count();
    expect(count).toBeGreaterThan(0);
  }
}

/**
 * Settings Page Object Model
 */
export class SettingsPage extends BasePage {
  // Locators
  get profileSection(): Locator {
    return this.page.locator('[data-testid="profile-section"]');
  }

  get preferencesSection(): Locator {
    return this.page.locator('[data-testid="preferences-section"]');
  }

  get categoryManagementSection(): Locator {
    return this.page.locator('[data-testid="category-management-section"]');
  }

  get saveButton(): Locator {
    return this.page.locator('[data-testid="save-settings-button"]');
  }

  get resetOnboardingButton(): Locator {
    return this.page.locator('[data-testid="reset-onboarding-button"]');
  }

  // Actions
  async updateProfile(data: { name?: string; email?: string }) {
    if (data.name) {
      await this.page.fill('[data-testid="profile-name"]', data.name);
    }
    if (data.email) {
      await this.page.fill('[data-testid="profile-email"]', data.email);
    }
  }

  async saveSettings() {
    await this.saveButton.click();
    await this.waitForPageLoad();
  }

  async resetOnboarding() {
    await this.resetOnboardingButton.click();
    await this.page.click('[data-testid="confirm-reset"]');
    await this.waitForPageLoad();
  }

  // Assertions
  async verifySettingsLoaded() {
    await expect(this.profileSection).toBeVisible();
    await expect(this.preferencesSection).toBeVisible();
  }

  async verifySettingsSaved() {
    await expect(this.page.locator('[data-testid="settings-saved-message"]')).toBeVisible();
  }
} 