export type RecipePathway = 'url' | 'image' | 'manual' | 'popular';

export interface RecipeData {
  title: string;
  ingredients: string[];
  steps: string[];
  image?: string | null;
  description?: string;
  cuisine?: string;
  category?: string;
  prepTime?: string;
  cleanupTime?: string;
}

export interface FirstRecipeFlowProps {
  onComplete: (recipe: RecipeData) => void;
  onSkip?: () => void;
  userCategories?: string[];
  userSkillLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  className?: string;
}

export interface FlowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedTime?: string;
}

export interface ProgressState {
  currentStep: 'welcome' | 'pathway' | 'processing';
  selectedPathway: RecipePathway | null;
  progress: number;
  detailedProgress: {
    welcome: number;
    pathwaySelection: number;
    processing: number;
  };
  showCelebration: boolean;
  motivationalMessage: string;
  timeSpent: number;
  interactionCount: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  timestamp?: Date;
}

export interface PathwayOption {
  id: RecipePathway;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  difficulty: string;
  timeEstimate: string;
  popular: boolean;
  benefits: string[];
  successRate: string;
  userCount: string;
  helpText: string;
  tips: string[];
}

export interface PathwayComponentProps {
  onComplete: (recipe: RecipeData) => void;
  onBack: () => void;
  userCategories?: string[];
  onProgressUpdate?: (progress: number) => void;
} 