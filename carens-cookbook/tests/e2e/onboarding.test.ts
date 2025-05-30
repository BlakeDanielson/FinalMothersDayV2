import { test, expect } from '../utils/fixtures';

test.describe('Onboarding Flow Tests', () => {
  test('should complete full onboarding flow for new user', async ({ 
    onboardingPage, 
    newUser 
  }) => {
    await onboardingPage.goto('/onboarding');
    await onboardingPage.verifyOnboardingStarted();
    
    // Navigate through onboarding steps
    await onboardingPage.clickNext();
    await onboardingPage.verifyStepNumber(2);
    
    // Select some categories
    await onboardingPage.selectCategories(['Breakfast', 'Lunch', 'Dinner']);
    await onboardingPage.clickNext();
    
    // Complete onboarding
    await onboardingPage.completeOnboarding();
    await onboardingPage.verifyOnboardingComplete();
  });

  test('should allow skipping onboarding steps', async ({ 
    onboardingPage, 
    newUser 
  }) => {
    await onboardingPage.goto('/onboarding');
    
    // Skip first step
    await onboardingPage.skipStep();
    
    // Verify we moved to next step
    await onboardingPage.verifyStepNumber(2);
  });

  test('should allow adding custom categories', async ({ 
    onboardingPage, 
    newUser 
  }) => {
    await onboardingPage.goto('/onboarding');
    
    // Navigate to category selection step
    await onboardingPage.clickNext();
    
    // Add a custom category
    await onboardingPage.addCustomCategory('My Special Recipes', 'Family favorites');
    
    // Verify custom category was added
    await expect(onboardingPage.categorySelectionGrid).toContainText('My Special Recipes');
  });

  test('should show progress indicator throughout flow', async ({ 
    onboardingPage, 
    newUser 
  }) => {
    await onboardingPage.goto('/onboarding');
    
    // Verify progress indicator is shown
    await expect(onboardingPage.progressIndicator).toShowOnboardingProgress(1);
    
    // Move to next step and verify progress updates
    await onboardingPage.clickNext();
    await expect(onboardingPage.progressIndicator).toShowOnboardingProgress(2);
  });
}); 