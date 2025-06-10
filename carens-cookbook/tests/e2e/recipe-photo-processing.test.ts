import { test, expect } from '@playwright/test';
import { PrismaClient } from '../../src/generated/prisma';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

// Test configuration
const RECIPE_PHOTOS_DIR = '../../../recipe_photos';
const TEST_USER_ID = 'test_photo_processing_playwright';
const MAX_TEST_PHOTOS = 2; // Limit for e2e testing

// AI Providers to test
const AI_PROVIDERS = [
  {
    name: 'OpenAI GPT-4o',
    id: 'openai',
    endpoint: '/api/scan-recipe'
  },
  {
    name: 'Google Gemini 2.5 Flash', 
    id: 'gemini',
    endpoint: '/api/scan-recipe'
  }
];

test.describe('Recipe Photo Processing E2E', () => {
  let baseURL: string;
  let testPhotoFiles: { filename: string; path: string; buffer: Buffer }[] = [];

  test.beforeAll(async () => {
    baseURL = process.env.BASE_URL || 'http://localhost:3000';
    
    // Load test photos
    try {
      const photoPath = path.resolve(__dirname, RECIPE_PHOTOS_DIR);
      const files = await fs.readdir(photoPath);
      
      const heicFiles = files
        .filter(file => file.toLowerCase().endsWith('.heic'))
        .slice(0, MAX_TEST_PHOTOS);
      
      for (const filename of heicFiles) {
        const filePath = path.join(photoPath, filename);
        const buffer = await fs.readFile(filePath);
        testPhotoFiles.push({ filename, path: filePath, buffer });
      }
      
      console.log(`📁 Loaded ${testPhotoFiles.length} test photos for e2e testing`);
    } catch (error) {
      console.warn(`⚠️  Could not load test photos: ${error}`);
    }
  });

  test.beforeEach(async () => {
    // Ensure test user exists
    await prisma.user.upsert({
      where: { id: TEST_USER_ID },
      create: {
        id: TEST_USER_ID,
        email: 'test-photo-processing-playwright@testing.local',
        firstName: 'Photo',
        lastName: 'Processing'
      },
      update: {
        firstName: 'Photo',
        lastName: 'Processing'
      }
    });
  });

  test.afterAll(async () => {
    // Cleanup: Remove test data
    await prisma.recipe.deleteMany({
      where: { userId: TEST_USER_ID }
    });
    
    await prisma.user.delete({
      where: { id: TEST_USER_ID }
    }).catch(() => {
      // User might not exist, ignore error
    });
    
    await prisma.$disconnect();
  });

  test('should process HEIC photos with both AI providers', async ({ request }) => {
    if (testPhotoFiles.length === 0) {
      test.skip();
      return;
    }

    for (const provider of AI_PROVIDERS) {
      for (const photoFile of testPhotoFiles) {
        console.log(`🔍 Testing ${photoFile.filename} with ${provider.name}`);
        
        const startTime = Date.now();
        
        // Create form data with the image
        const formData = new FormData();
        const imageBlob = new Blob([photoFile.buffer], { type: 'image/heic' });
        formData.append('image', imageBlob, photoFile.filename);
        formData.append('provider', provider.id);
        
        const response = await request.post(`${baseURL}${provider.endpoint}`, {
          multipart: {
            image: {
              name: photoFile.filename,
              mimeType: 'image/heic',
              buffer: photoFile.buffer
            },
            provider: provider.id
          }
        });
        
        const duration = Date.now() - startTime;
        console.log(`⏱️  Request completed in ${duration}ms`);
        
        // Verify response
        expect(response.ok()).toBe(true);
        
        const data = await response.json();
        
        // Verify extraction was successful
        expect(data.success).toBe(true);
        expect(data.recipe).toBeTruthy();
        
        // Log the results
        if (data.recipe.title && data.recipe.title !== "Recipe" && data.recipe.title !== "Unknown Recipe") {
          console.log(`✅ ${provider.name}: Successfully extracted "${data.recipe.title}"`);
          console.log(`📊 ${data.recipe.ingredients?.length || 0} ingredients, ${data.recipe.steps?.length || 0} steps`);
        } else {
          console.log(`⚠️  ${provider.name}: Got default/empty data - photo may not contain clear recipe`);
        }
        
        // Verify basic recipe structure
        expect(data.recipe).toHaveProperty('title');
        expect(data.recipe).toHaveProperty('ingredients');
        expect(data.recipe).toHaveProperty('steps');
        expect(data.recipe).toHaveProperty('category');
        expect(data.recipe).toHaveProperty('cuisine');
        
        // Small delay between requests to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  });

  test('should handle batch photo processing', async ({ request }) => {
    if (testPhotoFiles.length < 2) {
      test.skip();
      return;
    }

    const batchPhotos = testPhotoFiles.slice(0, 2);
    
    for (const provider of AI_PROVIDERS) {
      console.log(`🔍 Testing batch processing with ${provider.name}`);
      
      const startTime = Date.now();
      
      // Create multipart form data for batch processing
      const formData: Record<string, any> = {
        provider: provider.id
      };
      
      // Add multiple images
      batchPhotos.forEach((photoFile, index) => {
        formData[`images`] = {
          name: photoFile.filename,
          mimeType: 'image/heic',
          buffer: photoFile.buffer
        };
      });
      
      const response = await request.post(`${baseURL}/api/scan-recipe-multiple`, {
        multipart: formData
      });
      
      const duration = Date.now() - startTime;
      console.log(`⏱️  Batch request completed in ${duration}ms`);
      
      // Verify response
      expect(response.ok()).toBe(true);
      
      const data = await response.json();
      
      // Verify batch processing was successful
      expect(data.success).toBe(true);
      expect(data.recipe).toBeTruthy();
      
      // Log the results
      if (data.recipe.title && data.recipe.title !== "Recipe" && data.recipe.title !== "Unknown Recipe") {
        console.log(`✅ ${provider.name}: Batch extracted "${data.recipe.title}"`);
        console.log(`📊 ${data.recipe.ingredients?.length || 0} ingredients, ${data.recipe.steps?.length || 0} steps`);
        console.log(`🖼️  Processed ${batchPhotos.length} images`);
      } else {
        console.log(`⚠️  ${provider.name}: Batch got default/empty data`);
      }
      
      // Verify basic recipe structure
      expect(data.recipe).toHaveProperty('title');
      expect(data.recipe).toHaveProperty('ingredients');
      expect(data.recipe).toHaveProperty('steps');
      expect(data.recipe).toHaveProperty('category');
      expect(data.recipe).toHaveProperty('cuisine');
      
      // For batch processing, also check images array
      expect(data.recipe).toHaveProperty('images');
      if (data.recipe.images) {
        expect(Array.isArray(data.recipe.images)).toBe(true);
      }
      
      // Longer delay between batch requests
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  });

  test('should handle invalid photo uploads gracefully', async ({ request }) => {
    const invalidFormData = {
      provider: 'openai',
      image: {
        name: 'invalid.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from('This is not an image')
      }
    };
    
    const response = await request.post(`${baseURL}/api/scan-recipe`, {
      multipart: invalidFormData
    });
    
    // Should get an error response but not crash
    expect(response.status()).toBeGreaterThanOrEqual(400);
    
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error || data.userMessage).toBeTruthy();
    
    console.log(`✅ Properly handled invalid file: ${data.error || data.userMessage}`);
  });

  test('should handle missing images gracefully', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/scan-recipe`, {
      data: {
        provider: 'openai'
        // No image provided
      }
    });
    
    // Should get an error response
    expect(response.status()).toBeGreaterThanOrEqual(400);
    
    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error || data.userMessage).toBeTruthy();
    
    console.log(`✅ Properly handled missing image: ${data.error || data.userMessage}`);
  });

  test('should validate AI provider parameter', async ({ request }) => {
    if (testPhotoFiles.length === 0) {
      test.skip();
      return;
    }

    const photoFile = testPhotoFiles[0];
    
    const response = await request.post(`${baseURL}/api/scan-recipe`, {
      multipart: {
        image: {
          name: photoFile.filename,
          mimeType: 'image/heic',
          buffer: photoFile.buffer
        },
        provider: 'invalid_provider'
      }
    });
    
    // Should handle invalid provider gracefully
    const data = await response.json();
    
    // Either fallback to default provider or return error
    if (response.ok()) {
      expect(data.success).toBe(true);
      console.log(`✅ Fallback to default provider worked`);
    } else {
      expect(data.success).toBe(false);
      console.log(`✅ Properly rejected invalid provider: ${data.error || data.userMessage}`);
    }
  });

  test('should process photos with reasonable performance', async ({ request }) => {
    if (testPhotoFiles.length === 0) {
      test.skip();
      return;
    }

    const photoFile = testPhotoFiles[0];
    const maxAcceptableTime = 60000; // 60 seconds max
    
    const startTime = Date.now();
    
    const response = await request.post(`${baseURL}/api/scan-recipe`, {
      multipart: {
        image: {
          name: photoFile.filename,
          mimeType: 'image/heic',
          buffer: photoFile.buffer
        },
        provider: 'openai'
      }
    });
    
    const duration = Date.now() - startTime;
    
    // Verify response came back within reasonable time
    expect(duration).toBeLessThan(maxAcceptableTime);
    
    console.log(`⏱️  Photo processed in ${duration}ms (max allowed: ${maxAcceptableTime}ms)`);
    
    if (response.ok()) {
      const data = await response.json();
      if (data.success && data.recipe.title && data.recipe.title !== "Recipe") {
        console.log(`🚀 PERFORMANCE GOOD: Real data extracted in ${duration}ms`);
      } else {
        console.log(`⚠️  Performance OK but no real data extracted in ${duration}ms`);
      }
    }
  });
}); 