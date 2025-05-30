// Simple debugging script to test categories API
const testCategoriesAPI = async () => {
  try {
    console.log('Testing categories API...');
    
    // Test the categories endpoint
    const response = await fetch('http://localhost:3000/api/categories');
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Categories data:', data);
    } else {
      const errorData = await response.text();
      console.log('Error response:', errorData);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// Test the defaults endpoint
const testDefaultsAPI = async () => {
  try {
    console.log('Testing defaults API...');
    
    const response = await fetch('http://localhost:3000/api/categories/defaults');
    console.log('Defaults response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Defaults data:', data);
    } else {
      const errorData = await response.text();
      console.log('Defaults error response:', errorData);
    }
  } catch (error) {
    console.error('Defaults fetch error:', error);
  }
};

// Run tests
testDefaultsAPI();
setTimeout(() => testCategoriesAPI(), 1000); 