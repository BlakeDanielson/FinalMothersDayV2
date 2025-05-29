'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Clock,
  Users,
  ChefHat,
  Star,
  Search,
  Filter,
  CheckCircle,
  Edit3,
  Sparkles,
  TrendingUp,
  Award,
  Utensils,
  Timer,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecipeData } from './FirstRecipeFlow';

interface PopularRecipeSelectionProps {
  onComplete: (recipe: RecipeData) => void;
  onBack: () => void;
  userCategories?: string[];
  onProgressUpdate?: (progress: number) => void;
}

interface PopularRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  category: string;
  tags: string[];
  image: string;
  rating: number;
  popularity: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  calories?: string;
  tips?: string[];
}

// Curated collection of beginner-friendly recipes
const POPULAR_RECIPES: PopularRecipe[] = [
  {
    id: 'classic-chocolate-chip-cookies',
    title: 'Classic Chocolate Chip Cookies',
    description: 'Soft, chewy cookies that are perfect for beginners. A timeless favorite that everyone loves!',
    ingredients: [
      '2 1/4 cups all-purpose flour',
      '1 tsp baking soda',
      '1 tsp salt',
      '1 cup butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup brown sugar',
      '2 large eggs',
      '2 tsp vanilla extract',
      '2 cups chocolate chips'
    ],
    steps: [
      'Preheat oven to 375°F (190°C).',
      'Mix flour, baking soda, and salt in a bowl.',
      'Cream butter and both sugars until fluffy.',
      'Beat in eggs and vanilla.',
      'Gradually mix in flour mixture.',
      'Stir in chocolate chips.',
      'Drop rounded tablespoons onto ungreased baking sheets.',
      'Bake 9-11 minutes until golden brown.',
      'Cool on baking sheet for 2 minutes, then transfer to wire rack.'
    ],
    prepTime: '15 minutes',
    cookTime: '10 minutes',
    servings: '48 cookies',
    difficulty: 'Easy',
    cuisine: 'American',
    category: 'Desserts',
    tags: ['cookies', 'chocolate', 'baking', 'sweet'],
    image: '/api/placeholder/400/300',
    rating: 4.8,
    popularity: 95,
    calories: '150 per cookie'
  },
  {
    id: 'simple-spaghetti-marinara',
    title: 'Simple Spaghetti Marinara',
    description: 'A classic Italian pasta dish with a rich tomato sauce. Perfect for weeknight dinners!',
    ingredients: [
      '1 lb spaghetti',
      '2 tbsp olive oil',
      '4 cloves garlic, minced',
      '1 can (28 oz) crushed tomatoes',
      '1 tsp dried basil',
      '1 tsp dried oregano',
      '1/2 tsp salt',
      '1/4 tsp black pepper',
      '1/4 cup fresh basil, chopped',
      'Parmesan cheese for serving'
    ],
    steps: [
      'Cook spaghetti according to package directions.',
      'Heat olive oil in a large pan over medium heat.',
      'Add garlic and cook for 1 minute until fragrant.',
      'Add crushed tomatoes, dried basil, oregano, salt, and pepper.',
      'Simmer for 15-20 minutes, stirring occasionally.',
      'Drain pasta and add to sauce.',
      'Toss to combine and cook for 2 minutes.',
      'Garnish with fresh basil and serve with Parmesan.'
    ],
    prepTime: '10 minutes',
    cookTime: '25 minutes',
    servings: '4-6 people',
    difficulty: 'Easy',
    cuisine: 'Italian',
    category: 'Main Dishes',
    tags: ['pasta', 'italian', 'vegetarian', 'quick'],
    image: '/api/placeholder/400/300',
    rating: 4.6,
    popularity: 88,
    isVegetarian: true,
    calories: '320 per serving'
  },
  {
    id: 'fluffy-pancakes',
    title: 'Fluffy Buttermilk Pancakes',
    description: 'Light, fluffy pancakes perfect for weekend breakfast. Easy to make and absolutely delicious!',
    ingredients: [
      '2 cups all-purpose flour',
      '2 tbsp sugar',
      '2 tsp baking powder',
      '1 tsp salt',
      '2 cups buttermilk',
      '2 large eggs',
      '1/4 cup melted butter',
      '1 tsp vanilla extract',
      'Butter for cooking'
    ],
    steps: [
      'Mix flour, sugar, baking powder, and salt in a large bowl.',
      'Whisk buttermilk, eggs, melted butter, and vanilla in another bowl.',
      'Pour wet ingredients into dry ingredients and stir until just combined.',
      'Heat a griddle or large pan over medium heat.',
      'Brush with butter.',
      'Pour 1/4 cup batter for each pancake.',
      'Cook until bubbles form on surface, then flip.',
      'Cook until golden brown on both sides.',
      'Serve hot with syrup and butter.'
    ],
    prepTime: '10 minutes',
    cookTime: '15 minutes',
    servings: '4 people',
    difficulty: 'Easy',
    cuisine: 'American',
    category: 'Breakfast',
    tags: ['pancakes', 'breakfast', 'fluffy', 'weekend'],
    image: '/api/placeholder/400/300',
    rating: 4.7,
    popularity: 92,
    isVegetarian: true,
    calories: '280 per serving'
  },
  {
    id: 'chicken-stir-fry',
    title: 'Easy Chicken Stir Fry',
    description: 'Quick and healthy stir fry with tender chicken and crisp vegetables in a savory sauce.',
    ingredients: [
      '1 lb chicken breast, sliced thin',
      '2 tbsp vegetable oil',
      '2 cups mixed vegetables (bell peppers, broccoli, carrots)',
      '3 cloves garlic, minced',
      '1 tbsp fresh ginger, minced',
      '3 tbsp soy sauce',
      '2 tbsp oyster sauce',
      '1 tbsp cornstarch',
      '1 tsp sesame oil',
      'Green onions for garnish',
      'Cooked rice for serving'
    ],
    steps: [
      'Mix soy sauce, oyster sauce, cornstarch, and sesame oil in a bowl.',
      'Heat 1 tbsp oil in a large wok or pan over high heat.',
      'Add chicken and cook until golden, about 5 minutes.',
      'Remove chicken and set aside.',
      'Add remaining oil to pan.',
      'Add vegetables and stir-fry for 3-4 minutes.',
      'Add garlic and ginger, cook for 30 seconds.',
      'Return chicken to pan.',
      'Add sauce and toss everything together.',
      'Cook for 2 minutes until sauce thickens.',
      'Garnish with green onions and serve over rice.'
    ],
    prepTime: '15 minutes',
    cookTime: '12 minutes',
    servings: '4 people',
    difficulty: 'Easy',
    cuisine: 'Asian',
    category: 'Main Dishes',
    tags: ['chicken', 'stir-fry', 'healthy', 'quick'],
    image: '/api/placeholder/400/300',
    rating: 4.5,
    popularity: 85,
    calories: '290 per serving'
  },
  {
    id: 'banana-bread',
    title: 'Moist Banana Bread',
    description: 'The perfect way to use ripe bananas! This bread is incredibly moist and flavorful.',
    ingredients: [
      '3 ripe bananas, mashed',
      '1/3 cup melted butter',
      '3/4 cup sugar',
      '1 egg, beaten',
      '1 tsp vanilla extract',
      '1 tsp baking soda',
      '1/4 tsp salt',
      '1 1/2 cups all-purpose flour',
      '1/2 cup chopped walnuts (optional)'
    ],
    steps: [
      'Preheat oven to 350°F (175°C). Grease a 9x5 inch loaf pan.',
      'Mash bananas in a large bowl.',
      'Mix in melted butter.',
      'Add sugar, egg, and vanilla, mix well.',
      'Sprinkle baking soda and salt over mixture and mix.',
      'Add flour and mix until just combined.',
      'Fold in walnuts if using.',
      'Pour into prepared loaf pan.',
      'Bake for 60-65 minutes until toothpick comes out clean.',
      'Cool in pan for 10 minutes, then turn out onto wire rack.'
    ],
    prepTime: '15 minutes',
    cookTime: '65 minutes',
    servings: '8 slices',
    difficulty: 'Easy',
    cuisine: 'American',
    category: 'Desserts',
    tags: ['banana', 'bread', 'baking', 'moist'],
    image: '/api/placeholder/400/300',
    rating: 4.6,
    popularity: 89,
    isVegetarian: true,
    calories: '195 per slice'
  },
  {
    id: 'caesar-salad',
    title: 'Classic Caesar Salad',
    description: 'Crisp romaine lettuce with creamy Caesar dressing, croutons, and Parmesan cheese.',
    ingredients: [
      '2 heads romaine lettuce, chopped',
      '1/2 cup mayonnaise',
      '2 tbsp lemon juice',
      '2 cloves garlic, minced',
      '1 tsp Worcestershire sauce',
      '1/2 tsp Dijon mustard',
      '1/4 cup grated Parmesan cheese',
      '2 cups croutons',
      'Salt and pepper to taste',
      'Extra Parmesan for serving'
    ],
    steps: [
      'Wash and chop romaine lettuce, pat dry.',
      'Make dressing by whisking mayonnaise, lemon juice, garlic, Worcestershire, and Dijon.',
      'Add Parmesan cheese to dressing and mix.',
      'Season with salt and pepper.',
      'Place lettuce in a large bowl.',
      'Add dressing and toss to coat.',
      'Top with croutons and extra Parmesan.',
      'Serve immediately.'
    ],
    prepTime: '15 minutes',
    cookTime: '0 minutes',
    servings: '4 people',
    difficulty: 'Easy',
    cuisine: 'American',
    category: 'Salads',
    tags: ['salad', 'caesar', 'fresh', 'vegetarian'],
    image: '/api/placeholder/400/300',
    rating: 4.4,
    popularity: 78,
    isVegetarian: true,
    calories: '220 per serving'
  }
];

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800'
};

const CUISINE_FILTERS = ['All', 'American', 'Italian', 'Asian', 'Mexican', 'French'];
const CATEGORY_FILTERS = ['All', 'Main Dishes', 'Desserts', 'Breakfast', 'Salads', 'Appetizers'];

export function PopularRecipeSelection({ 
  onComplete, 
  onBack, 
  userCategories = [],
  onProgressUpdate 
}: PopularRecipeSelectionProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<PopularRecipe | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [customizedRecipe, setCustomizedRecipe] = useState<Partial<RecipeData>>({});

  // Filter recipes based on search and filters
  const filteredRecipes = React.useMemo(() => {
    return POPULAR_RECIPES.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      
      return matchesSearch && matchesCuisine && matchesCategory;
    }).sort((a, b) => b.popularity - a.popularity);
  }, [searchTerm, selectedCuisine, selectedCategory]);

  // Update progress based on selection
  useEffect(() => {
    const progress = selectedRecipe ? 80 : 40;
    onProgressUpdate?.(progress);
  }, [selectedRecipe, onProgressUpdate]);

  // Handle recipe selection
  const handleRecipeSelect = useCallback((recipe: PopularRecipe) => {
    setSelectedRecipe(recipe);
    setCustomizedRecipe({
      title: recipe.title,
      description: recipe.description,
      ingredients: [...recipe.ingredients],
      steps: [...recipe.steps],
      prepTime: recipe.prepTime,
      cuisine: recipe.cuisine,
      category: recipe.category
    });
  }, []);

  // Handle recipe customization
  const handleCustomize = useCallback(() => {
    setIsCustomizing(true);
  }, []);

  // Handle recipe completion
  const handleComplete = useCallback(() => {
    if (!selectedRecipe) return;

    const finalRecipe: RecipeData = {
      title: customizedRecipe.title || selectedRecipe.title,
      description: customizedRecipe.description || selectedRecipe.description,
      ingredients: customizedRecipe.ingredients || selectedRecipe.ingredients,
      steps: customizedRecipe.steps || selectedRecipe.steps,
      prepTime: customizedRecipe.prepTime || selectedRecipe.prepTime,
      cuisine: customizedRecipe.cuisine || selectedRecipe.cuisine,
      category: customizedRecipe.category || userCategories[0] || selectedRecipe.category
    };

    onComplete(finalRecipe);
  }, [selectedRecipe, customizedRecipe, onComplete, userCategories]);

  // Render recipe card
  const renderRecipeCard = (recipe: PopularRecipe) => (
    <Card 
      key={recipe.id}
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        "border-2 hover:border-blue-300",
        selectedRecipe?.id === recipe.id && "ring-2 ring-blue-500 border-blue-500"
      )}
      onClick={() => handleRecipeSelect(recipe)}
    >
      <div className="relative">
        <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
          <ChefHat className="h-12 w-12 text-gray-400" />
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <Badge className={cn("text-xs", DIFFICULTY_COLORS[recipe.difficulty])}>
            {recipe.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-xs bg-white/90">
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
            {recipe.rating}
          </Badge>
        </div>
        {recipe.popularity > 90 && (
          <div className="absolute top-2 left-2">
            <Badge className="text-xs bg-orange-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{recipe.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{recipe.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {recipe.prepTime}
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {recipe.servings}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {recipe.isVegetarian && (
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  Vegetarian
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render customization form
  const renderCustomizationForm = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Edit3 className="h-8 w-8 text-blue-600 mx-auto" />
        <h3 className="text-lg font-semibold text-gray-900">Customize Your Recipe</h3>
        <p className="text-gray-600">Make any changes you&apos;d like before adding to your collection</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Name
          </label>
          <Input
            value={customizedRecipe.title || ''}
            onChange={(e) => setCustomizedRecipe(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Recipe name..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            value={customizedRecipe.description || ''}
            onChange={(e) => setCustomizedRecipe(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Recipe description..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prep Time
          </label>
          <Input
            value={customizedRecipe.prepTime || ''}
            onChange={(e) => setCustomizedRecipe(prev => ({ ...prev, prepTime: e.target.value }))}
            placeholder="e.g., 15 minutes"
          />
        </div>

        {userCategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {userCategories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setCustomizedRecipe(prev => ({ ...prev, category }))}
                  className={cn(
                    "p-2 border rounded-lg text-sm transition-colors",
                    customizedRecipe.category === category
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isCustomizing && selectedRecipe) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            {renderCustomizationForm()}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setIsCustomizing(false)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Preview
          </Button>

          <Button
            onClick={handleComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Add Recipe
          </Button>
        </div>
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <div className="space-y-6">
        {/* Recipe preview */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl">{selectedRecipe.title}</CardTitle>
                <p className="text-gray-600">{selectedRecipe.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Prep: {selectedRecipe.prepTime}
                  </div>
                  <div className="flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    Cook: {selectedRecipe.cookTime}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedRecipe.servings}
                  </div>
                  <Badge className={cn("text-xs", DIFFICULTY_COLORS[selectedRecipe.difficulty])}>
                    {selectedRecipe.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-sm">
                  <Star className="h-3 w-3 mr-1 text-yellow-500" />
                  {selectedRecipe.rating}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {selectedRecipe.cuisine}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Ingredients */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Utensils className="h-4 w-4 mr-2" />
                Ingredients ({selectedRecipe.ingredients.length})
              </h4>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Instructions ({selectedRecipe.steps.length} steps)
              </h4>
              <ol className="space-y-3">
                {selectedRecipe.steps.map((step, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips */}
            {selectedRecipe.tips && selectedRecipe.tips.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Pro Tips
                </h4>
                <ul className="space-y-1">
                  {selectedRecipe.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-blue-700">• {tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setSelectedRecipe(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Recipes
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleCustomize}
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Customize
            </Button>
            <Button
              onClick={handleComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <Award className="h-8 w-8 text-purple-600 mx-auto" />
        <h2 className="text-xl font-semibold text-gray-900">Choose a Popular Recipe</h2>
        <p className="text-gray-600">
          Start with one of these tried-and-tested favorites, perfect for beginners
        </p>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <div className="text-sm text-gray-500">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {showFilters && (
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {CUISINE_FILTERS.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {CATEGORY_FILTERS.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Recipe grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecipes.map(renderRecipeCard)}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Methods
        </Button>

        <div className="text-sm text-gray-500">
          Select a recipe to continue
        </div>
      </div>

      <p className="text-gray-600">
        Don&apos;t worry, you can always add more recipes later!
      </p>
    </div>
  );
} 