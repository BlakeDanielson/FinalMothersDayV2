import { PopularRecipe } from '../utils/types';

// Curated collection of beginner-friendly recipes
export const POPULAR_RECIPES: PopularRecipe[] = [
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
      'Return chicken to pan and add sauce.',
      'Stir-fry for 2 minutes until sauce thickens.',
      'Garnish with green onions and serve over rice.'
    ],
    prepTime: '15 minutes',
    cookTime: '10 minutes',
    servings: '4 people',
    difficulty: 'Easy',
    cuisine: 'Asian',
    category: 'Main Dishes',
    tags: ['stir-fry', 'chicken', 'healthy', 'quick'],
    image: '/api/placeholder/400/300',
    rating: 4.5,
    popularity: 85,
    calories: '250 per serving'
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
      '1/2 cup grated Parmesan cheese',
      '1/4 tsp salt',
      '1/4 tsp black pepper',
      '2 cups croutons',
      'Extra Parmesan for serving'
    ],
    steps: [
      'Wash and chop romaine lettuce.',
      'In a large bowl, whisk together mayonnaise, lemon juice, garlic, and Worcestershire sauce.',
      'Add salt and pepper to taste.',
      'Add lettuce to the bowl and toss with dressing.',
      'Sprinkle with Parmesan cheese and croutons.',
      'Toss gently to combine.',
      'Serve immediately with extra Parmesan on the side.'
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
    calories: '180 per serving'
  },
  {
    id: 'banana-bread',
    title: 'Moist Banana Bread',
    description: 'Sweet, moist banana bread that\'s perfect for using up ripe bananas. A family favorite!',
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
      'Add sugar, egg, and vanilla extract.',
      'Sprinkle baking soda and salt over mixture and mix.',
      'Add flour and stir until just combined.',
      'Fold in nuts if using.',
      'Pour into prepared loaf pan.',
      'Bake for 60-65 minutes until a toothpick comes out clean.',
      'Cool in pan for 10 minutes, then turn out onto wire rack.'
    ],
    prepTime: '15 minutes',
    cookTime: '65 minutes',
    servings: '12 slices',
    difficulty: 'Easy',
    cuisine: 'American',
    category: 'Desserts',
    tags: ['banana', 'bread', 'baking', 'sweet'],
    image: '/api/placeholder/400/300',
    rating: 4.6,
    popularity: 82,
    isVegetarian: true,
    calories: '200 per slice'
  }
];

export const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800'
};

export const CUISINE_FILTERS = ['All', 'American', 'Italian', 'Asian', 'Mexican', 'French'];
export const CATEGORY_FILTERS = ['All', 'Main Dishes', 'Desserts', 'Breakfast', 'Salads', 'Appetizers']; 