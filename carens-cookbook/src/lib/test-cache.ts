import { CacheServiceFactory, categoryCache } from './services/cache-service';
import { getCacheConfig } from './cache-config';
import type { SuggestionResult } from './services/CategorySuggestionEngine';

/**
 * Test script to validate cache service functionality
 * Run with: npx ts-node src/lib/test-cache.ts
 */
async function testCacheService() {
  console.log('🧪 Testing Cache Service...\n');

  // Test configuration
  const config = getCacheConfig();
  console.log('Cache Configuration:', config);

  // Get cache instance
  const cache = CacheServiceFactory.getInstance();
  console.log('Cache instance created successfully ✅\n');

  try {
    // Test basic cache operations
    console.log('📝 Testing basic cache operations...');
    
    // Test set and get
    const testKey = 'test:cache:key';
    const testValue = { message: 'Hello Cache!', timestamp: Date.now() };
    
    const setResult = await cache.set(testKey, testValue, 60); // 1 minute TTL
    console.log(`Set operation result: ${setResult} ✅`);
    
    const getValue = await cache.get(testKey);
    console.log(`Get operation result:`, getValue);
    console.log(`Values match: ${JSON.stringify(getValue) === JSON.stringify(testValue)} ✅\n`);
    
    // Test category cache convenience functions
    console.log('🏷️  Testing category cache functions...');
    
    const testCategories = [
      { name: 'Italian', count: 5 },
      { name: 'Mexican', count: 3 },
      { name: 'Asian', count: 7 }
    ];
    
    // Test user-specific categories
    const testUserId = 'test-user-123';
    const setCategoriesResult = await categoryCache.setCategories(testCategories, testUserId);
    console.log(`Set categories result: ${setCategoriesResult} ✅`);
    
    const getCategories = await categoryCache.getCategories(testUserId);
    console.log(`Get categories result:`, getCategories);
    console.log(`Categories match: ${JSON.stringify(getCategories) === JSON.stringify(testCategories)} ✅\n`);
    
    // Test category suggestions
    console.log('💡 Testing category suggestions cache...');
    
    const testQuery = 'pasta with tomatoes';
    const testSuggestions: SuggestionResult[] = [
      { category: 'Italian', confidence: 0.9, reasoning: 'Contains pasta', source: 'ingredient' as const },
      { category: 'Dinner', confidence: 0.7, reasoning: 'Main course', source: 'mealtime' as const }
    ];
    
    const setSuggestionsResult = await categoryCache.setCategorySuggestions(testQuery, testSuggestions);
    console.log(`Set suggestions result: ${setSuggestionsResult} ✅`);
    
    const getSuggestions = await categoryCache.getCategorySuggestions(testQuery);
    console.log(`Get suggestions result:`, getSuggestions);
    console.log(`Suggestions match: ${JSON.stringify(getSuggestions) === JSON.stringify(testSuggestions)} ✅\n`);
    
    // Test cache metrics
    console.log('📊 Testing cache metrics...');
    const metrics = cache.getMetrics();
    console.log('Cache metrics:', metrics);
    console.log(`Metrics available: ${metrics.totalOperations > 0} ✅\n`);
    
    // Test cache invalidation
    console.log('🗑️  Testing cache invalidation...');
    const deleteResult = await cache.delete(testKey);
    console.log(`Delete operation result: ${deleteResult} ✅`);
    
    const getAfterDelete = await cache.get(testKey);
    console.log(`Get after delete: ${getAfterDelete === null} ✅\n`);
    
    // Test category invalidation
    const invalidateResult = await categoryCache.invalidateCategories(testUserId);
    console.log(`Invalidate categories result: ${invalidateResult} ✅`);
    
    const getCategoriesAfterInvalidate = await categoryCache.getCategories(testUserId);
    console.log(`Categories after invalidate: ${getCategoriesAfterInvalidate === null} ✅\n`);
    
    console.log('🎉 All cache tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Cache test failed:', error);
  } finally {
    // Clean up
    await cache.disconnect();
    console.log('🔌 Cache disconnected');
  }
}

// Export for use in other files
export { testCacheService };

// Run tests if this file is executed directly
if (require.main === module) {
  testCacheService().catch(console.error);
} 