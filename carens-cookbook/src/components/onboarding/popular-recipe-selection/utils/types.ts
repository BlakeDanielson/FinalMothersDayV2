import { RecipeData } from '../../../onboarding/first-recipe-flow/utils/types';

export interface PopularRecipeSelectionProps {
  onComplete: (recipe: RecipeData) => void;
  onBack: () => void;
  userCategories?: string[];
  onProgressUpdate?: (progress: number) => void;
}

export interface PopularRecipe {
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

export interface RecipeCardProps {
  recipe: PopularRecipe;
  isSelected: boolean;
  onSelect: (recipe: PopularRecipe) => void;
}

export interface CustomizationFormProps {
  customizedRecipe: Partial<RecipeData>;
  setCustomizedRecipe: (recipe: Partial<RecipeData>) => void;
  userCategories: string[];
  onComplete: () => void;
  onCancel: () => void;
}

export interface RecipeDetailsViewProps {
  recipe: PopularRecipe;
  onBack: () => void;
  onCustomize: () => void;
  onComplete: () => void;
}

export interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (cuisine: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filteredCount: number;
} 