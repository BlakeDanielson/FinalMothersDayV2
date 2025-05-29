import { TfIdf, WordTokenizer, PorterStemmer, stopwords } from 'natural';
import { CategoryService } from '../categories';
import { PrismaClient } from '@/generated/prisma';
import { categoryCache } from './cache-service';

export interface SuggestionResult {
  category: string;
  confidence: number;
  reasoning: string;
  source: 'ingredient' | 'method' | 'mealtime' | 'keyword' | 'similarity';
}

export interface RecipeContent {
  title: string;
  ingredients?: string[];
  instructions?: string[];
  description?: string;
}

export interface SuggestionOptions {
  maxSuggestions?: number;
  minConfidence?: number;
  includeUserCategories?: boolean;
  userId?: string;
}

export class CategorySuggestionEngine {
  private tfidf: TfIdf;
  private tokenizer: WordTokenizer;
  private categoryService: CategoryService;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;
  private ingredientPatterns!: Map<string, string[]>;
  private methodPatterns!: Map<string, string[]>;
  private mealtimePatterns!: Map<string, string[]>;

  constructor(prisma: PrismaClient) {
    this.tfidf = new TfIdf();
    this.tokenizer = new WordTokenizer();
    this.categoryService = new CategoryService(prisma);
    
    this.initializePatterns();
  }

  /**
   * Initialize pattern matching dictionaries for different suggestion strategies
   */
  private initializePatterns(): void {
    // Ingredient-based category patterns
    this.ingredientPatterns = new Map([
      ['Italian', ['pasta', 'spaghetti', 'linguine', 'penne', 'fettuccine', 'lasagna', 'ravioli', 'gnocchi', 'parmesan', 'mozzarella', 'basil', 'oregano', 'marinara', 'pesto', 'prosciutto', 'pancetta']],
      ['Asian', ['soy sauce', 'sesame oil', 'ginger', 'garlic', 'rice vinegar', 'miso', 'wasabi', 'nori', 'tofu', 'bok choy', 'shiitake', 'teriyaki', 'sriracha', 'fish sauce', 'coconut milk', 'lemongrass']],
      ['Mexican', ['cumin', 'chili powder', 'paprika', 'cilantro', 'lime', 'jalapeño', 'chipotle', 'avocado', 'black beans', 'corn', 'tortilla', 'salsa', 'queso', 'chorizo', 'poblano']],
      ['Indian', ['curry', 'turmeric', 'cardamom', 'coriander', 'cumin', 'garam masala', 'ghee', 'basmati', 'naan', 'paneer', 'lentils', 'chickpeas', 'coconut', 'tamarind']],
      ['Desserts', ['sugar', 'flour', 'butter', 'eggs', 'vanilla', 'chocolate', 'cocoa', 'cream', 'milk', 'honey', 'cinnamon', 'nutmeg', 'frosting', 'icing', 'caramel', 'strawberry', 'blueberry']],
      ['Salads', ['lettuce', 'spinach', 'arugula', 'kale', 'cucumber', 'tomato', 'carrot', 'bell pepper', 'onion', 'vinaigrette', 'dressing', 'olive oil', 'lemon juice', 'feta', 'croutons']],
      ['Soups', ['broth', 'stock', 'water', 'onion', 'celery', 'carrot', 'potato', 'cream', 'milk', 'herbs', 'bay leaf', 'thyme', 'parsley', 'salt', 'pepper']],
      ['Seafood', ['fish', 'salmon', 'tuna', 'cod', 'shrimp', 'crab', 'lobster', 'scallops', 'mussels', 'clams', 'oysters', 'calamari', 'anchovy', 'sea bass', 'halibut']],
      ['Vegetarian', ['vegetables', 'beans', 'lentils', 'quinoa', 'tofu', 'tempeh', 'nuts', 'seeds', 'mushrooms', 'eggplant', 'zucchini', 'bell pepper', 'broccoli', 'cauliflower']],
      ['Breakfast', ['eggs', 'bacon', 'sausage', 'pancakes', 'waffles', 'toast', 'cereal', 'oatmeal', 'yogurt', 'fruit', 'coffee', 'orange juice', 'syrup', 'jam']]
    ]);

    // Cooking method patterns
    this.methodPatterns = new Map([
      ['Baked', ['bake', 'baked', 'baking', 'oven', 'roast', 'roasted', 'roasting', 'broil', 'broiled']],
      ['Grilled', ['grill', 'grilled', 'grilling', 'barbecue', 'bbq', 'charcoal', 'gas grill']],
      ['Fried', ['fry', 'fried', 'frying', 'deep fry', 'pan fry', 'sauté', 'sautéed', 'stir fry', 'stir-fry']],
      ['Slow Cooked', ['slow cook', 'slow cooker', 'crockpot', 'braised', 'braising', 'simmer', 'simmered']],
      ['No-Cook', ['no cook', 'no-cook', 'raw', 'fresh', 'uncooked', 'cold', 'refrigerate', 'chill']],
      ['One-Pot', ['one pot', 'one-pot', 'single pot', 'skillet', 'casserole', 'dutch oven']]
    ]);

    // Meal time patterns
    this.mealtimePatterns = new Map([
      ['Breakfast', ['breakfast', 'morning', 'brunch', 'cereal', 'pancake', 'waffle', 'toast', 'coffee', 'juice']],
      ['Lunch', ['lunch', 'midday', 'sandwich', 'wrap', 'salad', 'soup', 'light meal']],
      ['Dinner', ['dinner', 'evening', 'main course', 'entree', 'supper', 'family meal']],
      ['Snacks', ['snack', 'appetizer', 'finger food', 'party food', 'quick bite', 'nibble']],
      ['Dessert', ['dessert', 'sweet', 'cake', 'pie', 'cookie', 'ice cream', 'pudding', 'treat']]
    ]);
  }

  /**
   * Generate category suggestions for a recipe
   */
  async suggestCategories(
    content: RecipeContent, 
    options: SuggestionOptions = {}
  ): Promise<SuggestionResult[]> {
    const {
      maxSuggestions = 5,
      minConfidence = 0.3,
      includeUserCategories = true,
      userId
    } = options;

    // Create cache key
    const cacheKey = this.createCacheKey(content, options);
    
    // Check cache first
    const cachedSuggestions = await categoryCache.getCategorySuggestions(cacheKey);
    if (cachedSuggestions) {
      this.cacheHits++;
      return cachedSuggestions;
    }

    this.cacheMisses++;
    const suggestions: SuggestionResult[] = [];

    // Strategy 1: Ingredient-based matching
    const ingredientSuggestions = this.analyzeIngredients(content);
    suggestions.push(...ingredientSuggestions);

    // Strategy 2: Cooking method detection
    const methodSuggestions = this.analyzeCookingMethods(content);
    suggestions.push(...methodSuggestions);

    // Strategy 3: Meal time inference
    const mealtimeSuggestions = this.analyzeMealTime(content);
    suggestions.push(...mealtimeSuggestions);

    // Strategy 4: Keyword extraction and TF-IDF
    const keywordSuggestions = await this.analyzeKeywords(content);
    suggestions.push(...keywordSuggestions);

    // Strategy 5: Content similarity (if user categories available)
    if (includeUserCategories && userId) {
      const similaritySuggestions = await this.analyzeSimilarity(content, userId);
      suggestions.push(...similaritySuggestions);
    }

    // Merge and rank suggestions
    const rankedSuggestions = this.rankSuggestions(suggestions, minConfidence);
    const finalSuggestions = rankedSuggestions.slice(0, maxSuggestions);

    // Cache results for 30 minutes
    await categoryCache.setCategorySuggestions(cacheKey, finalSuggestions);

    return finalSuggestions;
  }

  /**
   * Analyze ingredients to suggest categories
   */
  private analyzeIngredients(content: RecipeContent): SuggestionResult[] {
    const suggestions: SuggestionResult[] = [];
    const ingredients = content.ingredients || [];
    const allIngredients = ingredients.join(' ').toLowerCase();

    for (const [category, patterns] of this.ingredientPatterns) {
      let matchCount = 0;
      const matchedIngredients: string[] = [];

      for (const pattern of patterns) {
        if (allIngredients.includes(pattern.toLowerCase())) {
          matchCount++;
          matchedIngredients.push(pattern);
        }
      }

      if (matchCount > 0) {
        const confidence = Math.min(0.9, (matchCount / patterns.length) * 2);
        suggestions.push({
          category,
          confidence,
          reasoning: `Contains ${matchCount} ${category.toLowerCase()} ingredients: ${matchedIngredients.slice(0, 3).join(', ')}`,
          source: 'ingredient'
        });
      }
    }

    return suggestions;
  }

  /**
   * Analyze cooking methods to suggest categories
   */
  private analyzeCookingMethods(content: RecipeContent): SuggestionResult[] {
    const suggestions: SuggestionResult[] = [];
    const instructions = content.instructions || [];
    const title = content.title || '';
    const allText = [title, ...instructions].join(' ').toLowerCase();

    for (const [category, patterns] of this.methodPatterns) {
      let matchCount = 0;
      const matchedMethods: string[] = [];

      for (const pattern of patterns) {
        if (allText.includes(pattern.toLowerCase())) {
          matchCount++;
          matchedMethods.push(pattern);
        }
      }

      if (matchCount > 0) {
        const confidence = Math.min(0.8, (matchCount / patterns.length) * 1.5);
        suggestions.push({
          category,
          confidence,
          reasoning: `Uses ${category.toLowerCase()} cooking method: ${matchedMethods.slice(0, 2).join(', ')}`,
          source: 'method'
        });
      }
    }

    return suggestions;
  }

  /**
   * Analyze meal time patterns
   */
  private analyzeMealTime(content: RecipeContent): SuggestionResult[] {
    const suggestions: SuggestionResult[] = [];
    const title = content.title || '';
    const description = content.description || '';
    const allText = [title, description].join(' ').toLowerCase();

    for (const [category, patterns] of this.mealtimePatterns) {
      let matchCount = 0;
      const matchedPatterns: string[] = [];

      for (const pattern of patterns) {
        if (allText.includes(pattern.toLowerCase())) {
          matchCount++;
          matchedPatterns.push(pattern);
        }
      }

      if (matchCount > 0) {
        const confidence = Math.min(0.7, (matchCount / patterns.length) * 1.2);
        suggestions.push({
          category,
          confidence,
          reasoning: `Indicates ${category.toLowerCase()} meal: ${matchedPatterns.slice(0, 2).join(', ')}`,
          source: 'mealtime'
        });
      }
    }

    return suggestions;
  }

  /**
   * Use TF-IDF for keyword-based suggestions
   */
  private async analyzeKeywords(content: RecipeContent): Promise<SuggestionResult[]> {
    const suggestions: SuggestionResult[] = [];
    
    // Combine all text content
    const allText = [
      content.title || '',
      content.description || '',
      ...(content.ingredients || []),
      ...(content.instructions || [])
    ].join(' ');

    // Tokenize and clean
    const tokens = this.tokenizer.tokenize(allText.toLowerCase()) || [];
    const cleanTokens = tokens
      .filter(token => token.length > 2)
      .filter(token => !stopwords.includes(token))
      .map(token => PorterStemmer.stem(token));

    // Get common categories for comparison
    const commonCategories = [
      'Italian', 'Asian', 'Mexican', 'Indian', 'American', 'French',
      'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Appetizers',
      'Vegetarian', 'Vegan', 'Seafood', 'Chicken', 'Beef', 'Pork',
      'Salads', 'Soups', 'Pasta', 'Rice', 'Bread', 'Healthy'
    ];

    // Simple keyword matching with stemming
    for (const category of commonCategories) {
      const categoryTokens = this.tokenizer.tokenize(category.toLowerCase()) || [];
      const stemmedCategory = categoryTokens.map(token => PorterStemmer.stem(token));
      
      let matchScore = 0;
      for (const categoryToken of stemmedCategory) {
        if (cleanTokens.includes(categoryToken)) {
          matchScore += 0.3;
        }
      }

      // Check for partial matches in original text
      if (allText.toLowerCase().includes(category.toLowerCase())) {
        matchScore += 0.4;
      }

      if (matchScore > 0.2) {
        suggestions.push({
          category,
          confidence: Math.min(0.8, matchScore),
          reasoning: `Keyword analysis suggests ${category} based on content`,
          source: 'keyword'
        });
      }
    }

    return suggestions;
  }

  /**
   * Analyze similarity to existing user recipes
   */
  private async analyzeSimilarity(content: RecipeContent, userId: string): Promise<SuggestionResult[]> {
    const suggestions: SuggestionResult[] = [];

    try {
      // Get user's existing categories
      const userCategories = await this.categoryService.getUserCategories(userId);
      
      if (userCategories.length === 0) {
        return suggestions;
      }

      // For each user category, calculate similarity
      for (const categoryName of userCategories) {
        // Simple similarity based on category name matching
        const similarity = this.calculateCategorySimilarity(content, categoryName);
        
        if (similarity > 0.3) {
          suggestions.push({
            category: categoryName,
            confidence: similarity,
            reasoning: `Similar to your existing ${categoryName} recipes`,
            source: 'similarity'
          });
        }
      }
    } catch (error) {
      console.error('Error analyzing similarity:', error);
    }

    return suggestions;
  }

  /**
   * Calculate similarity between recipe content and category name
   */
  private calculateCategorySimilarity(content: RecipeContent, categoryName: string): number {
    const allText = [
      content.title || '',
      content.description || '',
      ...(content.ingredients || []),
      ...(content.instructions || [])
    ].join(' ').toLowerCase();

    const categoryWords = categoryName.toLowerCase().split(' ');
    let matchCount = 0;

    for (const word of categoryWords) {
      if (allText.includes(word)) {
        matchCount++;
      }
    }

    return matchCount / categoryWords.length;
  }

  /**
   * Rank and merge suggestions
   */
  private rankSuggestions(suggestions: SuggestionResult[], minConfidence: number): SuggestionResult[] {
    // Group by category and take highest confidence
    const categoryMap = new Map<string, SuggestionResult>();

    for (const suggestion of suggestions) {
      if (suggestion.confidence >= minConfidence) {
        const existing = categoryMap.get(suggestion.category);
        if (!existing || suggestion.confidence > existing.confidence) {
          categoryMap.set(suggestion.category, suggestion);
        }
      }
    }

    // Sort by confidence descending
    return Array.from(categoryMap.values())
      .sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Create cache key for suggestions
   */
  private createCacheKey(content: RecipeContent, options: SuggestionOptions): string {
    const contentHash = JSON.stringify({
      title: content.title,
      ingredients: content.ingredients?.slice(0, 5), // Limit for cache efficiency
      instructions: content.instructions?.slice(0, 3)
    });
    
    const optionsHash = JSON.stringify({
      maxSuggestions: options.maxSuggestions,
      minConfidence: options.minConfidence,
      userId: options.userId
    });

    return `${contentHash}-${optionsHash}`;
  }

  /**
   * Clear the suggestion cache
   */
  clearCache(): void {
    // Reset local cache stats
    this.cacheHits = 0;
    this.cacheMisses = 0;
    // Note: We don't clear the persistent cache here as it's shared
    // If needed, implement a specific method to clear suggestion cache
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { hits: number; misses: number; hitRate: number } {
    const total = this.cacheHits + this.cacheMisses;
    return {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRate: total > 0 ? this.cacheHits / total : 0
    };
  }
} 