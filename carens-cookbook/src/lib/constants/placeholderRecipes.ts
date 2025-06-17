import { RecipeData } from "@/components/RecipeDisplay";

// Define a local type for placeholder recipes that includes tags, extending the imported RecipeData
export interface PlaceholderRecipe extends RecipeData {
  tags?: string[];
}

export const placeholderRecipes: PlaceholderRecipe[] = [
  {
    id: "placeholder-1",
    title: "Classic Spaghetti Carbonara",
    description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
    tags: ["Italian", "Pasta", "Quick"],
    category: "Pasta",
    prepTime: "10 min",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-2",
    title: "Avocado Bruschetta Bites",
    description: "Creamy avocado spread on toasted baguette slices, topped with cherry tomatoes and basil.",
    tags: ["Appetizer", "Healthy", "Quick"],
    category: "Appetizer",
    prepTime: "10 min",
    cleanupTime: "5 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-3",
    title: "Vegetable Green Curry",
    description: "A fragrant and spicy curry made with coconut milk, green curry paste, and a medley of fresh vegetables.",
    tags: ["Thai", "Spicy", "Vegetable"],
    category: "Vegetable",
    prepTime: "20 min",
    cleanupTime: "30 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-4",
    title: "Chocolate Chip Cookies",
    description: "Classic homemade cookies with crispy edges and a soft, chewy center loaded with chocolate chips.",
    tags: ["Dessert", "Baking", "Family Favorite"],
    category: "Dessert",
    prepTime: "15 min",
    cleanupTime: "12 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1551024601-bec78d8d590d?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-5",
    title: "Quinoa Salad with Roasted Vegetables",
    description: "A nutritious salad with fluffy quinoa, roasted seasonal vegetables, and a zesty lemon dressing.",
    tags: ["Salad", "Vegan", "Meal Prep"],
    category: "Salad",
    prepTime: "15 min",
    cleanupTime: "25 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-6",
    title: "Beef Stir Fry",
    description: "Tender strips of beef with colorful vegetables in a savory sauce, served over steamed rice.",
    tags: ["Asian", "Quick Dinner", "High Protein"],
    category: "Beef",
    prepTime: "15 min",
    cleanupTime: "10 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1608039819226-e6ea12c05aa2?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-7",
    title: "Grilled Lemon Herb Chicken",
    description: "Juicy grilled chicken breasts marinated in lemon, herbs, and garlic.",
    tags: ["Chicken", "Grill", "Healthy"],
    category: "Chicken",
    prepTime: "20 min (plus marinating)",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-8",
    title: "Pan-Seared Salmon with Asparagus",
    description: "Flaky salmon fillets pan-seared to perfection, served with tender asparagus.",
    tags: ["Seafood", "Quick", "Healthy"],
    category: "Seafood",
    prepTime: "10 min",
    cleanupTime: "15 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-9",
    title: "Roast Turkey with Cranberry Sauce",
    description: "A classic Thanksgiving centerpiece, a beautifully roasted turkey served with homemade cranberry sauce.",
    tags: ["Thanksgiving", "Holiday", "Poultry"],
    category: "Thanksgiving",
    prepTime: "30 min",
    cleanupTime: "4 hours (cooking)",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1574966771070-9639608a1173?auto=format&fit=crop&w=1771&q=80"
  },
  {
    id: "placeholder-10",
    title: "Rosemary Garlic Lamb Chops",
    description: "Tender lamb chops infused with rosemary and garlic, perfect for a special occasion.",
    tags: ["Lamb", "Elegant", "Dinner"],
    category: "Lamb",
    prepTime: "15 min",
    cleanupTime: "20 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1600891964091-bab6873a49dc?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-11",
    title: "BBQ Pulled Pork Sandwiches",
    description: "Slow-cooked pulled pork in a tangy BBQ sauce, served on fluffy buns.",
    tags: ["Pork", "Comfort Food", "Slow Cooker"],
    category: "Pork",
    prepTime: "20 min",
    cleanupTime: "8 hours (cooking)",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1628268900122-c0a3a9ade820?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-12",
    title: "Creamy Tomato Soup",
    description: "A rich and creamy tomato soup, perfect with a grilled cheese sandwich.",
    tags: ["Soup", "Vegetarian", "Comfort Food"],
    category: "Soup",
    prepTime: "10 min",
    cleanupTime: "25 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-13",
    title: "Refreshing Iced Tea",
    description: "A tall glass of freshly brewed iced tea, perfect for a hot day.",
    tags: ["Drinks", "Summer", "Non-alcoholic"],
    category: "Drinks",
    prepTime: "5 min",
    cleanupTime: "5 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1551030173-1b2ff3648450?auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: "placeholder-14",
    title: "Garlic Aioli Sauce",
    description: "A creamy and flavorful garlic aioli, great as a dip or spread.",
    tags: ["Sauce", "Dip", "Garlic"],
    category: "Sauces & Seasoning",
    prepTime: "10 min",
    cleanupTime: "5 min",
    ingredients: [], steps: [],
    image: "https://images.unsplash.com/photo-1562504648-5b7a96109ba3?auto=format&fit=crop&w=1770&q=80"
  }
];

export const ALL_POSSIBLE_CATEGORIES: { name: string; defaultImageUrl?: string | null }[] = [
  { name: "Appetizer", defaultImageUrl: "https://images.unsplash.com/photo-1572441713132-51c75654db73?auto=format&fit=crop&w=1770&q=80" },
  { name: "Beef", defaultImageUrl: "https://images.unsplash.com/photo-1608039819226-e6ea12c05aa2?auto=format&fit=crop&w=1770&q=80" },
  { name: "Beverage", defaultImageUrl: "https://images.unsplash.com/photo-1551030173-1b2ff3648450?auto=format&fit=crop&w=1770&q=80" },
  { name: "Breakfast", defaultImageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1770&q=80" },
  { name: "Chicken", defaultImageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1770&q=80" },
  { name: "Dessert", defaultImageUrl: "https://images.unsplash.com/photo-1551024601-bec78d8d590d?auto=format&fit=crop&w=1770&q=80" },
  { name: "Drinks", defaultImageUrl: "https://images.unsplash.com/photo-1551030173-1b2ff3648450?auto=format&fit=crop&w=1770&q=80" },
  { name: "Lamb", defaultImageUrl: "https://images.unsplash.com/photo-1600891964091-bab6873a49dc?auto=format&fit=crop&w=1770&q=80" },
  { name: "Pasta", defaultImageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1770&q=80" },
  { name: "Pork", defaultImageUrl: "https://images.unsplash.com/photo-1628268900122-c0a3a9ade820?auto=format&fit=crop&w=1770&q=80" },
  { name: "Salad", defaultImageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1770&q=80" },
  { name: "Sauce", defaultImageUrl: "https://images.unsplash.com/photo-1562504648-5b7a96109ba3?auto=format&fit=crop&w=1770&q=80" },
  { name: "Seafood", defaultImageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1770&q=80" },
  { name: "Side Dish", defaultImageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1770&q=80" },
  { name: "Sauces & Seasoning", defaultImageUrl: "https://images.unsplash.com/photo-1562504648-5b7a96109ba3?auto=format&fit=crop&w=1770&q=80" },
  { name: "Soup", defaultImageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1770&q=80" },
  { name: "Thanksgiving", defaultImageUrl: "https://images.unsplash.com/photo-1574966771070-9639608a1173?auto=format&fit=crop&w=1771&q=80" },
  { name: "Vegetable", defaultImageUrl: "https://images.unsplash.com/photo-1597362925123-77861d3fbac8?auto=format&fit=crop&w=1770&q=80" },
].sort((a, b) => a.name.localeCompare(b.name)); 