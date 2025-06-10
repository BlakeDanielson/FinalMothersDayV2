# Test info

- Name: Real Analytics Generation >> Extract real analytics data from allrecipes
- Location: C:\Users\blake\OneDrive\Desktop\NewProjects\FinalMothersDayV2\carens-cookbook\tests\e2e\real-analytics-generation.test.ts:72:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: null
    at C:\Users\blake\OneDrive\Desktop\NewProjects\FinalMothersDayV2\carens-cookbook\tests\e2e\real-analytics-generation.test.ts:114:27
```

# Test source

```ts
   14 |   {
   15 |     url: 'https://www.kingarthurbaking.com/recipes/chocolate-chip-cookies-recipe',
   16 |     source: 'kingarthur',
   17 |     expectedStrategy: 'url-direct', 
   18 |     difficulty: 'low'
   19 |   },
   20 |   {
   21 |     url: 'https://www.tasteofhome.com/recipes/makeover-creamy-macaroni-and-cheese/',
   22 |     source: 'tasteofhome',
   23 |     expectedStrategy: 'url-direct',
   24 |     difficulty: 'medium'
   25 |   }
   26 | ];
   27 |
   28 | const TEST_USER_ID = 'test_real_analytics_playwright';
   29 |
   30 | test.describe('Real Analytics Generation', () => {
   31 |   let baseURL: string;
   32 |
   33 |   test.beforeAll(async () => {
   34 |     baseURL = process.env.BASE_URL || 'http://localhost:3000';
   35 |     
   36 |     // Setup test user
   37 |     await prisma.user.upsert({
   38 |       where: { id: TEST_USER_ID },
   39 |       create: {
   40 |         id: TEST_USER_ID,
   41 |         email: 'test-real-analytics-playwright@testing.local',
   42 |         firstName: 'Real',
   43 |         lastName: 'Analytics'
   44 |       },
   45 |       update: {
   46 |         firstName: 'Real',
   47 |         lastName: 'Analytics'
   48 |       }
   49 |     });
   50 |   });
   51 |
   52 |   test.afterAll(async () => {
   53 |     // Cleanup: Remove test data
   54 |     await prisma.recipeExtractionMetrics.deleteMany({
   55 |       where: { userId: TEST_USER_ID }
   56 |     });
   57 |     
   58 |     await prisma.recipe.deleteMany({
   59 |       where: { userId: TEST_USER_ID }
   60 |     });
   61 |     
   62 |     await prisma.user.delete({
   63 |       where: { id: TEST_USER_ID }
   64 |     }).catch(() => {
   65 |       // User might not exist, ignore error
   66 |     });
   67 |     
   68 |     await prisma.$disconnect();
   69 |   });
   70 |
   71 |   for (const testRecipe of TEST_RECIPES) {
   72 |     test(`Extract real analytics data from ${testRecipe.source}`, async ({ request }) => {
   73 |       console.log(`🔍 Testing extraction from: ${testRecipe.url}`);
   74 |       
   75 |       const startTime = Date.now();
   76 |       
   77 |       // Make actual API call to extraction endpoint
   78 |       const response = await request.post(`${baseURL}/api/fetch-recipe-stream`, {
   79 |         data: {
   80 |           url: testRecipe.url,
   81 |           userId: TEST_USER_ID
   82 |         }
   83 |       });
   84 |       
   85 |       const duration = Date.now() - startTime;
   86 |       console.log(`⏱️  Request completed in ${duration}ms`);
   87 |       
   88 |       // Verify response
   89 |       expect(response.ok()).toBe(true);
   90 |       
   91 |       // Parse streaming response
   92 |       const body = await response.text();
   93 |       const lines = body.split('\n');
   94 |       
   95 |       let finalResult: any = null;
   96 |       let strategy: string = 'unknown';
   97 |       
   98 |       for (const line of lines) {
   99 |         if (line.startsWith('data: ')) {
  100 |           try {
  101 |             const data = JSON.parse(line.slice(6));
  102 |             if (data.type === 'complete') {
  103 |               finalResult = data;
  104 |               strategy = data.strategy || 'unknown';
  105 |               break;
  106 |             }
  107 |           } catch (e) {
  108 |             // Skip invalid JSON
  109 |           }
  110 |         }
  111 |       }
  112 |       
  113 |       // Verify extraction was successful
> 114 |       expect(finalResult).toBeTruthy();
      |                           ^ Error: expect(received).toBeTruthy()
  115 |       expect(finalResult.recipe).toBeTruthy();
  116 |       expect(finalResult.recipe.title).toBeTruthy();
  117 |       expect(finalResult.recipe.ingredients).toBeTruthy();
  118 |       expect(finalResult.recipe.steps).toBeTruthy();
  119 |       
  120 |       console.log(`✅ Successfully extracted: "${finalResult.recipe.title}"`);
  121 |       console.log(`🔧 Strategy used: ${strategy}`);
  122 |       console.log(`📊 ${finalResult.recipe.ingredients.length} ingredients, ${finalResult.recipe.steps.length} steps`);
  123 |       
  124 |       // Wait a moment for database to be populated
  125 |       await new Promise(resolve => setTimeout(resolve, 1000));
  126 |       
  127 |       // Verify analytics data was recorded
  128 |       const extractionMetrics = await prisma.recipeExtractionMetrics.findMany({
  129 |         where: {
  130 |           userId: TEST_USER_ID,
  131 |           recipeUrl: testRecipe.url
  132 |         },
  133 |         orderBy: { createdAt: 'desc' },
  134 |         take: 1
  135 |       });
  136 |       
  137 |       expect(extractionMetrics.length).toBeGreaterThan(0);
  138 |       
  139 |       const metric = extractionMetrics[0];
  140 |       expect(metric.extractionSuccess).toBe(true);
  141 |       expect(metric.primaryStrategy).toBeTruthy();
  142 |       expect(metric.totalDuration).toBeGreaterThan(0);
  143 |       expect(metric.domain).toBe(testRecipe.source);
  144 |       
  145 |       console.log(`📈 Analytics recorded - Strategy: ${metric.primaryStrategy}, Duration: ${metric.totalDuration}ms`);
  146 |       
  147 |       // Verify recipe was saved
  148 |       const savedRecipes = await prisma.recipe.findMany({
  149 |         where: {
  150 |           userId: TEST_USER_ID,
  151 |           title: finalResult.recipe.title
  152 |         }
  153 |       });
  154 |       
  155 |       expect(savedRecipes.length).toBeGreaterThan(0);
  156 |       
  157 |       const savedRecipe = savedRecipes[0];
  158 |       expect(savedRecipe.ingredients.length).toBeGreaterThan(0);
  159 |       expect(savedRecipe.steps.length).toBeGreaterThan(0);
  160 |       
  161 |       console.log(`🍳 Recipe saved to database with ID: ${savedRecipe.id}`);
  162 |     });
  163 |   }
  164 |
  165 |   test('Verify analytics dashboard can display real data', async ({ page }) => {
  166 |     // Navigate to analytics dashboard (assumes admin route exists)
  167 |     await page.goto(`${baseURL}/admin/analytics`);
  168 |     
  169 |     // Wait for data to load
  170 |     await page.waitForTimeout(2000);
  171 |     
  172 |     // Check for analytics components (these may vary based on your dashboard implementation)
  173 |     const pageContent = await page.textContent('body');
  174 |     
  175 |     // Verify dashboard loads successfully
  176 |     expect(pageContent).toBeTruthy();
  177 |     
  178 |     // Look for analytics-related content
  179 |     const hasAnalyticsContent = 
  180 |       pageContent!.includes('extraction') ||
  181 |       pageContent!.includes('success') ||
  182 |       pageContent!.includes('strategy') ||
  183 |       pageContent!.includes('token') ||
  184 |       pageContent!.includes('metrics');
  185 |     
  186 |     expect(hasAnalyticsContent).toBe(true);
  187 |     
  188 |     console.log('✅ Analytics dashboard loaded successfully with real data');
  189 |   });
  190 |
  191 |   test('Verify analytics aggregation functions work with real data', async () => {
  192 |     // Test analytics aggregation with real data
  193 |     const totalExtractions = await prisma.recipeExtractionMetrics.count({
  194 |       where: { userId: TEST_USER_ID }
  195 |     });
  196 |     
  197 |     expect(totalExtractions).toBeGreaterThan(0);
  198 |     
  199 |     const successfulExtractions = await prisma.recipeExtractionMetrics.count({
  200 |       where: {
  201 |         userId: TEST_USER_ID,
  202 |         extractionSuccess: true
  203 |       }
  204 |     });
  205 |     
  206 |     expect(successfulExtractions).toBeGreaterThan(0);
  207 |     
  208 |     // Calculate success rate
  209 |     const successRate = (successfulExtractions / totalExtractions) * 100;
  210 |     console.log(`📊 Success rate: ${successRate.toFixed(1)}% (${successfulExtractions}/${totalExtractions})`);
  211 |     
  212 |     // Test strategy distribution
  213 |     const strategyStats = await prisma.recipeExtractionMetrics.groupBy({
  214 |       by: ['primaryStrategy'],
```