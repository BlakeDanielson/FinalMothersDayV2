import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global test teardown...');

  try {
    // Clean up test data if needed
    // This is where you'd clean up test users, reset database state, etc.
    
    // Clean up any temporary files
    console.log('🗑️ Cleaning up temporary test files...');
    
    // Reset environment variables if needed
    if (process.env.NODE_ENV === 'test') {
      Object.assign(process.env, { NODE_ENV: 'development' });
    }

    console.log('✅ Global test teardown completed');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw here as it might mask test failures
  }
}

export default globalTeardown; 