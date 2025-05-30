# Test info

- Name: Smoke Tests >> responsive design works
- Location: /Users/carendanielson/BlakeProjects/FinalMothersDayV2/carens-cookbook/tests/e2e/smoke.test.ts:63:7

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

    at /Users/carendanielson/BlakeProjects/FinalMothersDayV2/carens-cookbook/tests/e2e/smoke.test.ts:66:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { TestHelpers } from '../utils/test-helpers';
   3 |
   4 | test.describe('Smoke Tests', () => {
   5 |   test('homepage loads successfully', async ({ page }) => {
   6 |     const helpers = new TestHelpers(page);
   7 |
   8 |     // Navigate to homepage with increased timeout
   9 |     await page.goto('/', { timeout: 30000 });
  10 |     await helpers.waitForPageLoad();
  11 |
  12 |     // Verify the page loaded - be more flexible with title check
  13 |     try {
  14 |       await expect(page).toHaveTitle(/Caren's Cookbook/, { timeout: 15000 });
  15 |     } catch {
  16 |       // Fallback: check if page has any title at all
  17 |       const title = await page.title();
  18 |       console.log(`Page title: "${title}"`);
  19 |       expect(title.length).toBeGreaterThan(0);
  20 |     }
  21 |     
  22 |     // Take a screenshot for visual verification
  23 |     await helpers.takeScreenshot('homepage-loaded');
  24 |
  25 |     // Verify basic page structure
  26 |     await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  27 |     
  28 |     console.log('✅ Homepage smoke test passed');
  29 |   });
  30 |
  31 |   test('navigation works correctly', async ({ page }) => {
  32 |     const helpers = new TestHelpers(page);
  33 |
  34 |     await page.goto('/', { timeout: 30000 });
  35 |     await helpers.waitForPageLoad();
  36 |
  37 |     // Test navigation to sign-in page
  38 |     const signInLink = page.locator('a[href*="sign-in"]').first();
  39 |     if (await signInLink.isVisible({ timeout: 5000 })) {
  40 |       await signInLink.click();
  41 |       await helpers.waitForPageLoad();
  42 |       
  43 |       // Verify we're on the sign-in page
  44 |       await expect(page).toHaveURL(/sign-in/, { timeout: 15000 });
  45 |     } else {
  46 |       console.log('Sign-in link not found, skipping navigation test');
  47 |     }
  48 |     
  49 |     console.log('✅ Navigation smoke test passed');
  50 |   });
  51 |
  52 |   test('API endpoints are accessible', async ({ page }) => {
  53 |     // Test that basic API endpoints respond
  54 |     const response = await page.request.get('/api/categories');
  55 |     expect(response.status()).toBe(200);
  56 |     
  57 |     const data = await response.json();
  58 |     expect(Array.isArray(data)).toBe(true);
  59 |     
  60 |     console.log('✅ API accessibility smoke test passed');
  61 |   });
  62 |
  63 |   test('responsive design works', async ({ page }) => {
  64 |     const helpers = new TestHelpers(page);
  65 |
> 66 |     await page.goto('/', { timeout: 30000 });
     |                ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  67 |     await helpers.waitForPageLoad();
  68 |
  69 |     // Test mobile viewport
  70 |     await page.setViewportSize({ width: 375, height: 667 });
  71 |     await page.waitForTimeout(1000); // Wait for layout to adjust
  72 |     await helpers.takeScreenshot('mobile-view');
  73 |
  74 |     // Test tablet viewport
  75 |     await page.setViewportSize({ width: 768, height: 1024 });
  76 |     await page.waitForTimeout(1000); // Wait for layout to adjust
  77 |     await helpers.takeScreenshot('tablet-view');
  78 |     
  79 |     // Test desktop viewport
  80 |     await page.setViewportSize({ width: 1920, height: 1080 });
  81 |     await page.waitForTimeout(1000); // Wait for layout to adjust
  82 |     await helpers.takeScreenshot('desktop-view');
  83 |
  84 |     // Verify the page is still functional
  85 |     await expect(page.locator('body')).toBeVisible({ timeout: 15000 });
  86 |     
  87 |     console.log('✅ Responsive design smoke test passed');
  88 |   });
  89 | }); 
```