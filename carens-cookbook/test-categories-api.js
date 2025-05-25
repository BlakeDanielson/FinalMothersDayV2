// Test script to verify categories API works for non-authenticated users
async function testCategoriesAPI() {
  console.log('Testing /api/categories endpoint...');
  
  try {
    const response = await fetch('http://localhost:3000/api/categories');
    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return;
    }
    
    const data = await response.json();
    console.log('Success! Received categories:', JSON.stringify(data, null, 2));
    console.log(`Total categories returned: ${data.length}`);
    
    // Verify it's the expected default categories
    const expectedCategories = [
      "Appetizer", "Beef", "Breakfast", "Chicken", "Dessert", 
      "Drinks", "Lamb", "Pasta", "Pork", "Salad", "Seafood", 
      "Soup", "Vegetable"
    ];
    
    const returnedNames = data.map(cat => cat.name).sort();
    const hasExpectedCategories = expectedCategories.every(name => 
      returnedNames.includes(name)
    );
    
    console.log('Contains expected predefined categories:', hasExpectedCategories);
    console.log('All categories have count of 0:', data.every(cat => cat.count === 0));
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testCategoriesAPI(); 