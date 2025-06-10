// Simple test script to verify analytics are working
const baseUrl = 'http://localhost:3000';

async function testAnalytics() {
  try {
    console.log('🧪 Testing Analytics API...');
    
    // Test user analytics endpoint
    const response = await fetch(`${baseUrl}/api/analytics/extraction-metrics?days=30`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Analytics API working!');
      console.log('📊 Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Analytics API error:', response.status, response.statusText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Test after a delay to ensure server is ready
setTimeout(testAnalytics, 3000);

console.log('⏱️ Analytics test will run in 3 seconds...');
console.log('📝 Make sure the server is running with: npm run dev');
console.log('🔑 Make sure you are signed in to the app first!'); 