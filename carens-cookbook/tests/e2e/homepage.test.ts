import { test, expect } from '../utils/fixtures';

test.describe('Homepage Tests', () => {
  test('should display category grid for authenticated user', async ({ 
    homePage, 
    authenticatedUser 
  }) => {
    await homePage.goto('/');
    await homePage.verifyPageLoaded();
    await homePage.verifyCategoriesDisplayed();
    
    // Use custom expect matcher
    await expect(homePage.categoryGrid).toBeValidCategoryGrid();
  });

  test('should allow searching for recipes', async ({ 
    homePage, 
    userWithRecipes,
    page
  }) => {
    await homePage.goto('/');
    await homePage.searchRecipes('chicken');
    
    // Verify search results are displayed
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
  });

  test('should navigate to recipe scanning page', async ({ 
    homePage, 
    authenticatedUser 
  }) => {
    await homePage.goto('/');
    await homePage.clickAddRecipe();
    
    // Verify navigation to recipe scanning
    expect(homePage.url).toContain('/scan-recipe');
  });

  test('should display sign-in option for unauthenticated users', async ({ 
    homePage 
  }) => {
    await homePage.goto('/');
    
    // Check if sign-in button is visible
    await expect(homePage.signInButton).toBeVisible();
  });
}); 