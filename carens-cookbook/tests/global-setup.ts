import { chromium, FullConfig } from '@playwright/test';
import path from 'path';

async function waitForServer(url: string, maxAttempts = 10, delay = 2000): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✅ Server is ready at ${url}`);
        return;
      }
    } catch (error) {
      console.log(`⏳ Attempt ${attempt}/${maxAttempts}: Server not ready yet...`);
    }
    
    if (attempt < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Server at ${url} did not become available after ${maxAttempts} attempts`);
}

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');

  // Get the base URL from config
  const baseURL = config.projects?.[0]?.use?.baseURL || 'http://localhost:3000';
  
  // Wait for the server to be available before proceeding
  console.log(`📍 Waiting for application to be available at ${baseURL}`);
  await waitForServer(baseURL);

  // Create a browser instance for setup
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Set up test environment variables if needed
    if (process.env.NODE_ENV !== 'test') {
      Object.assign(process.env, { NODE_ENV: 'test' });
    }
    
    // Navigate to the application with a more reasonable timeout
    console.log(`📍 Navigating to application at ${baseURL}`);
    
    await page.goto(baseURL, { 
      waitUntil: 'domcontentloaded', // Less strict than 'networkidle'
      timeout: 15000 // 15 seconds instead of default 30
    });
    console.log('✅ Application is accessible');

    // Create test user authentication state if needed
    // This would be where you'd set up test users, clear test data, etc.
    
    // Save authentication state for tests that need it
    const authFile = path.join(__dirname, '../test-results/auth.json');
    
    // Ensure the test-results directory exists
    const fs = await import('fs');
    const testResultsDir = path.dirname(authFile);
    if (!fs.existsSync(testResultsDir)) {
      fs.mkdirSync(testResultsDir, { recursive: true });
    }
    
    // For now, we'll just ensure the auth directory exists
    await page.context().storageState({ path: authFile });
    console.log('💾 Authentication state saved');

  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }

  console.log('✅ Global test setup completed');
}

export default globalSetup; 