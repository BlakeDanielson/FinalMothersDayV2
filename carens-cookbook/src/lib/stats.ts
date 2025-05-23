import { RecipeData } from "@/components/RecipeDisplay";

export interface RecipeStats {
  totalRecipes: number;
  totalCategories: number;
  averagePrepTime: number;
  averageCookTime: number;
  categoryDistribution: { name: string; count: number; percentage: number }[];
  difficultyDistribution: { difficulty: string; count: number }[];
  recentRecipes: RecipeData[];
  topCategories: { name: string; count: number }[];
  collectionGrowth: { month: string; count: number }[];
  commonIngredients: { ingredient: string; count: number }[];
}

export function calculateRecipeStats(recipes: RecipeData[]): RecipeStats {
  if (recipes.length === 0) {
    return {
      totalRecipes: 0,
      totalCategories: 0,
      averagePrepTime: 0,
      averageCookTime: 0,
      categoryDistribution: [],
      difficultyDistribution: [],
      recentRecipes: [],
      topCategories: [],
      collectionGrowth: [],
      commonIngredients: []
    };
  }

  // Basic counts
  const totalRecipes = recipes.length;
  
  // Category analysis
  const categoryMap = new Map<string, number>();
  recipes.forEach(recipe => {
    if (recipe.category) {
      categoryMap.set(recipe.category, (categoryMap.get(recipe.category) || 0) + 1);
    }
  });
  
  const totalCategories = categoryMap.size;
  
  // Category distribution with percentages
  const categoryDistribution = Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalRecipes) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // Top categories (top 5)
  const topCategories = categoryDistribution.slice(0, 5);

  // Time calculations
  const prepTimes = recipes
    .map(r => parseTimeString(r.prepTime || ''))
    .filter(time => time > 0);
  
  const cookTimes = recipes
    .map(r => parseTimeString(r.cleanupTime || ''))
    .filter(time => time > 0);

  const averagePrepTime = prepTimes.length > 0 
    ? Math.round(prepTimes.reduce((a, b) => a + b, 0) / prepTimes.length)
    : 0;
    
  const averageCookTime = cookTimes.length > 0
    ? Math.round(cookTimes.reduce((a, b) => a + b, 0) / cookTimes.length)
    : 0;

  // Difficulty distribution (if available in recipe data)
  const difficultyMap = new Map<string, number>();
  recipes.forEach(recipe => {
    // For now, we'll estimate difficulty based on prep time
    let difficulty = 'Easy';
    const prepMinutes = parseTimeString(recipe.prepTime || '');
    if (prepMinutes > 60) difficulty = 'Hard';
    else if (prepMinutes > 30) difficulty = 'Medium';
    
    difficultyMap.set(difficulty, (difficultyMap.get(difficulty) || 0) + 1);
  });

  const difficultyDistribution = Array.from(difficultyMap.entries())
    .map(([difficulty, count]) => ({ difficulty, count }));

  // Recent recipes (last 10)
  const recentRecipes = recipes
    .slice(-10)
    .reverse();

  // Collection growth (mock data for now - would need creation dates)
  const collectionGrowth = generateMockGrowthData(totalRecipes);

  // Common ingredients analysis
  const ingredientMap = new Map<string, number>();
  recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      // Extract common ingredient names (simplified)
      const words = ingredient.toLowerCase()
        .replace(/[\d\s\-\/\\(),.]+/g, ' ')
        .split(' ')
        .filter(word => word.length > 3 && !isCommonWord(word));
      
      words.forEach(word => {
        ingredientMap.set(word, (ingredientMap.get(word) || 0) + 1);
      });
    });
  });

  const commonIngredients = Array.from(ingredientMap.entries())
    .map(([ingredient, count]) => ({ ingredient, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalRecipes,
    totalCategories,
    averagePrepTime,
    averageCookTime,
    categoryDistribution,
    difficultyDistribution,
    recentRecipes,
    topCategories,
    collectionGrowth,
    commonIngredients
  };
}

// Helper function to parse time strings like "20 min", "1 hour 30 min"
function parseTimeString(timeStr: string): number {
  if (!timeStr) return 0;
  
  const hourMatch = timeStr.match(/(\d+)\s*hour/i);
  const minMatch = timeStr.match(/(\d+)\s*min/i);
  
  let minutes = 0;
  if (hourMatch) minutes += parseInt(hourMatch[1]) * 60;
  if (minMatch) minutes += parseInt(minMatch[1]);
  
  return minutes;
}

// Helper function to generate mock growth data
function generateMockGrowthData(totalRecipes: number): { month: string; count: number }[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const baseCount = Math.max(1, Math.floor(totalRecipes / 6));
  
  return months.map((month, index) => ({
    month,
    count: baseCount + Math.floor(Math.random() * 5) + index
  }));
}

// Helper function to filter out common words
function isCommonWord(word: string): boolean {
  const commonWords = [
    'and', 'the', 'with', 'for', 'from', 'salt', 'pepper', 'water',
    'oil', 'olive', 'fresh', 'large', 'small', 'medium', 'cups',
    'tablespoons', 'teaspoons', 'ounces', 'pounds', 'inch', 'inches'
  ];
  return commonWords.includes(word.toLowerCase());
} 