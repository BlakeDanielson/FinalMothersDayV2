import { 
  Globe, 
  Camera, 
  PenTool, 
  Star,
  Smile,
  TrendingUp,
  Zap,
  Award
} from 'lucide-react';
import { PathwayOption, Achievement } from './types';

export const PATHWAY_OPTIONS: PathwayOption[] = [
  {
    id: 'url',
    title: 'Scan from URL',
    description: 'Enter a recipe URL and we\'ll extract all the details for you',
    icon: Globe,
    difficulty: 'Easy',
    timeEstimate: '30 seconds',
    popular: true,
    benefits: ['Automatic extraction', 'No typing required', 'Preserves original formatting'],
    successRate: '95%',
    userCount: '8,500+',
    helpText: 'Perfect for recipes from popular cooking websites like AllRecipes, Food Network, or BBC Good Food.',
    tips: [
      'Works best with well-structured recipe websites',
      'Look for the recipe URL, not the homepage',
      'Most popular cooking sites are supported'
    ]
  },
  {
    id: 'image',
    title: 'Scan from Image',
    description: 'Upload a photo of a recipe and our AI will read it for you',
    icon: Camera,
    difficulty: 'Easy',
    timeEstimate: '1 minute',
    popular: false,
    benefits: ['Works with cookbook photos', 'Handwritten recipes', 'Recipe cards'],
    successRate: '88%',
    userCount: '6,200+',
    helpText: 'Great for digitizing family recipes, cookbook pages, or handwritten recipe cards.',
    tips: [
      'Ensure good lighting and clear text',
      'Hold camera steady for sharp focus',
      'Works with both printed and handwritten recipes'
    ]
  },
  {
    id: 'manual',
    title: 'Enter Manually',
    description: 'Type in your recipe details with our guided form',
    icon: PenTool,
    difficulty: 'Medium',
    timeEstimate: '3-5 minutes',
    popular: false,
    benefits: ['Full control', 'Custom formatting', 'Add personal notes'],
    successRate: '100%',
    userCount: '4,800+',
    helpText: 'Best for creating original recipes or when you want complete control over formatting.',
    tips: [
      'Start with just the basics - you can add details later',
      'Use our smart ingredient parser for measurements',
      'Add personal notes and modifications'
    ]
  },
  {
    id: 'popular',
    title: 'Choose Popular Recipe',
    description: 'Start with a tried-and-tested recipe from our collection',
    icon: Star,
    difficulty: 'Easy',
    timeEstimate: '1 minute',
    popular: true,
    benefits: ['Beginner-friendly', 'Tested recipes', 'Quick start'],
    successRate: '100%',
    userCount: '12,000+',
    helpText: 'Perfect for beginners or when you want to try something new with confidence.',
    tips: [
      'All recipes are tested and rated by our community',
      'Great for exploring new cuisines',
      'You can customize before adding to your collection'
    ]
  }
];

export const MOTIVATIONAL_MESSAGES = [
  "You're doing great! Let's add your first recipe together.",
  "Almost there! Your recipe collection is about to begin.",
  "Excellent choice! This method works perfectly for beginners.",
  "You're on the right track! Many users love this approach.",
  "Perfect! You're about to discover how easy recipe management can be.",
  "Fantastic progress! You're becoming a recipe organization pro.",
  "Amazing work! Your cooking journey is off to a great start."
];

export const CELEBRATION_MESSAGES = [
  "🎉 Fantastic! You've taken the first step toward organized cooking!",
  "✨ Amazing! Your recipe collection journey has officially begun!",
  "🌟 Wonderful! You're already becoming a recipe organization pro!",
  "🎊 Excellent work! You've unlocked the power of digital recipe management!",
  "🏆 Incredible! You're well on your way to cooking mastery!",
  "🎯 Perfect! You've just made meal planning so much easier!"
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Steps',
    description: 'Started your recipe journey',
    icon: Smile,
    unlocked: false
  },
  {
    id: 'pathway_explorer',
    title: 'Pathway Explorer',
    description: 'Explored different recipe addition methods',
    icon: TrendingUp,
    unlocked: false
  },
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    description: 'Completed setup in under 2 minutes',
    icon: Zap,
    unlocked: false
  },
  {
    id: 'recipe_master',
    title: 'Recipe Master',
    description: 'Successfully added your first recipe',
    icon: Award,
    unlocked: false
  }
];

export const PROGRESS_MILESTONES = [25, 50, 75];

export const CELEBRATION_DURATION = {
  milestone: 2500,
  achievement: 3000,
  completion: 4000
} as const; 