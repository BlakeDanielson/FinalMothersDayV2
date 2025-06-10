import { RecipeData } from '../../first-recipe-flow/utils/types';

export interface ManualEntryPathwayProps {
  onComplete: (recipe: RecipeData) => void;
  onBack: () => void;
  userCategories?: string[];
  onProgressUpdate?: (progress: number) => void;
}

export interface FormStep {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
}

export interface RecipeFormData {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | '';
  cuisine: string;
  category: string;
  tags: string[];
  image?: File | null;
}

export interface DifficultyOption {
  value: 'Easy' | 'Medium' | 'Hard';
  label: string;
  description: string;
}

export interface StepIndicatorProps {
  formSteps: FormStep[];
  currentStep: number;
}

export interface NavigationBarProps {
  currentStep: number;
  currentStepData: FormStep;
  isValid: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onPrevStep: () => void;
  onNextStep: () => void;
  onComplete: () => void;
}

export interface IngredientSuggestionsProps {
  isVisible: boolean;
  currentInput: string;
  onSelect: (ingredient: string) => void;
  onClose: () => void;
}

export interface RecipeBasicsStepProps {
  formData: RecipeFormData;
  setFormData: React.Dispatch<React.SetStateAction<RecipeFormData>>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export interface IngredientsStepProps {
  formData: RecipeFormData;
  handleIngredientChange: (index: number, value: string) => void;
  addIngredient: () => void;
  removeIngredient: (index: number) => void;
  activeIngredientIndex: number;
  setActiveIngredientIndex: (index: number) => void;
  showIngredientSuggestions: boolean;
  setShowIngredientSuggestions: (show: boolean) => void;
}

export interface InstructionsStepProps {
  formData: RecipeFormData;
  setFormData: React.Dispatch<React.SetStateAction<RecipeFormData>>;
  addStep: () => void;
  removeStep: (index: number) => void;
}

export interface RecipeDetailsStepProps {
  formData: RecipeFormData;
  setFormData: React.Dispatch<React.SetStateAction<RecipeFormData>>;
  userCategories: string[];
} 