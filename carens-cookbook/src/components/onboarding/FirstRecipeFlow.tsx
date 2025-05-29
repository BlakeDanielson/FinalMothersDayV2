'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Camera, 
  PenTool, 
  Star, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  ChefHat,
  Sparkles,
  Trophy,
  Heart,
  Zap,
  Target,
  Info,
  HelpCircle,
  Lightbulb,
  TrendingUp,
  Award,
  Smile,
  ThumbsUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { URLScanningPathway } from './URLScanningPathway';
import { ImageScanningPathway } from './ImageScanningPathway';
import { ManualEntryPathway } from './ManualEntryPathway';
import { PopularRecipeSelection } from './PopularRecipeSelection';

// Types for the flow
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

interface FlowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  estimatedTime?: string;
}

interface ProgressState {
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  unlocked: boolean;
  timestamp?: Date;
}

const PATHWAY_OPTIONS = [
  {
    id: 'url' as RecipePathway,
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
    id: 'image' as RecipePathway,
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
    id: 'manual' as RecipePathway,
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
    id: 'popular' as RecipePathway,
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

const MOTIVATIONAL_MESSAGES = [
  "You're doing great! Let's add your first recipe together.",
  "Almost there! Your recipe collection is about to begin.",
  "Excellent choice! This method works perfectly for beginners.",
  "You're on the right track! Many users love this approach.",
  "Perfect! You're about to discover how easy recipe management can be.",
  "Fantastic progress! You're becoming a recipe organization pro.",
  "Amazing work! Your cooking journey is off to a great start."
];

const CELEBRATION_MESSAGES = [
  "🎉 Fantastic! You've taken the first step toward organized cooking!",
  "✨ Amazing! Your recipe collection journey has officially begun!",
  "🌟 Wonderful! You're already becoming a recipe organization pro!",
  "🎊 Excellent work! You've unlocked the power of digital recipe management!",
  "🏆 Incredible! You're well on your way to cooking mastery!",
  "🎯 Perfect! You've just made meal planning so much easier!"
];

const ACHIEVEMENTS: Achievement[] = [
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

export function FirstRecipeFlow({ 
  onComplete, 
  onSkip, 
  userCategories = [], 
  userSkillLevel = 'BEGINNER',
  className 
}: FirstRecipeFlowProps) {
  const [progressState, setProgressState] = useState<ProgressState>({
    currentStep: 'welcome',
    selectedPathway: null,
    progress: 0,
    detailedProgress: {
      welcome: 0,
      pathwaySelection: 0,
      processing: 0
    },
    showCelebration: false,
    motivationalMessage: MOTIVATIONAL_MESSAGES[0],
    timeSpent: 0,
    interactionCount: 0
  });

  const [showTips, setShowTips] = useState(false);
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [showHelp, setShowHelp] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const startTimeRef = useRef<Date>(new Date());
  const interactionCountRef = useRef(0);

  const flowSteps: FlowStep[] = [
    { 
      id: 'welcome', 
      title: 'Welcome', 
      description: 'Choose how to add your first recipe', 
      completed: progressState.currentStep !== 'welcome',
      estimatedTime: '30s'
    },
    { 
      id: 'pathway', 
      title: 'Add Recipe', 
      description: 'Follow the guided process', 
      completed: progressState.currentStep === 'processing' && progressState.progress > 50,
      estimatedTime: '1-3m'
    },
    { 
      id: 'complete', 
      title: 'Complete', 
      description: 'Recipe added successfully', 
      completed: progressState.progress === 100,
      estimatedTime: 'Done!'
    }
  ];

  // Unlock achievements with celebration
  const unlockAchievement = useCallback((achievementId: string) => {
    setAchievements(prev => prev.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, unlocked: true, timestamp: new Date() }
        : achievement
    ));
  }, []);

  // Track user interactions for analytics and achievements
  const trackInteraction = useCallback(() => {
    interactionCountRef.current += 1;
    setProgressState(prev => ({
      ...prev,
      interactionCount: interactionCountRef.current,
      timeSpent: Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000)
    }));

    // Check for achievements
    if (interactionCountRef.current === 1) {
      unlockAchievement('first_step');
    }
    if (interactionCountRef.current >= 3) {
      unlockAchievement('pathway_explorer');
    }
  }, [unlockAchievement]);

  // Enhanced progress calculation with more granular tracking
  const calculateProgress = useCallback((step: string, pathway: RecipePathway | null, detailedProgress: Record<string, number>) => {
    switch (step) {
      case 'welcome':
        return Math.min(detailedProgress.welcome, 15); // Max 15% for welcome
      case 'pathway':
        return 15 + Math.min(detailedProgress.pathwaySelection, 25); // 15-40%
      case 'processing':
        return 40 + Math.min(detailedProgress.processing, 60); // 40-100%
      default:
        return 0;
    }
  }, []);

  // Update progress with smooth transitions and interaction tracking
  const updateProgress = useCallback((updates: Partial<ProgressState>) => {
    setIsAnimating(true);
    setProgressState(prev => {
      const newState = { ...prev, ...updates };
      const newProgress = calculateProgress(
        newState.currentStep, 
        newState.selectedPathway, 
        newState.detailedProgress
      );
      return { ...newState, progress: newProgress };
    });
    
    setTimeout(() => setIsAnimating(false), 300);
    trackInteraction();
  }, [calculateProgress, trackInteraction]);

  // Add milestone tracking with enhanced feedback
  const addMilestone = useCallback((milestone: string) => {
    setCompletedMilestones(prev => {
      if (!prev.includes(milestone)) {
        // Add subtle haptic feedback for mobile devices
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
        return [...prev, milestone];
      }
      return prev;
    });
  }, []);

  // Enhanced celebration with multiple animation types
  const showCelebration = useCallback((message?: string, type: 'milestone' | 'achievement' | 'completion' = 'milestone') => {
    const celebrationMessage = message || CELEBRATION_MESSAGES[Math.floor(Math.random() * CELEBRATION_MESSAGES.length)];
    updateProgress({ 
      showCelebration: true, 
      motivationalMessage: celebrationMessage 
    });
    
    // Different celebration durations based on type
    const duration = type === 'completion' ? 4000 : type === 'achievement' ? 3000 : 2500;
    
    setTimeout(() => {
      updateProgress({ showCelebration: false });
    }, duration);
  }, [updateProgress]);

  const handlePathwaySelect = useCallback((pathway: RecipePathway) => {
    trackInteraction();
    updateProgress({
      selectedPathway: pathway,
      currentStep: 'processing',
      detailedProgress: {
        welcome: 100,
        pathwaySelection: 100,
        processing: 0
      },
      motivationalMessage: MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)]
    });
    
    addMilestone('pathway_selected');
    showCelebration(`Great choice! ${PATHWAY_OPTIONS.find(p => p.id === pathway)?.title} is perfect for getting started.`);
  }, [updateProgress, addMilestone, showCelebration, trackInteraction]);

  const handleBack = useCallback(() => {
    trackInteraction();
    if (progressState.currentStep === 'processing') {
      updateProgress({
        currentStep: 'pathway',
        selectedPathway: null,
        detailedProgress: {
          welcome: 100,
          pathwaySelection: 0,
          processing: 0
        }
      });
    } else if (progressState.currentStep === 'pathway') {
      updateProgress({
        currentStep: 'welcome',
        detailedProgress: {
          welcome: 0,
          pathwaySelection: 0,
          processing: 0
        }
      });
    }
  }, [progressState.currentStep, updateProgress, trackInteraction]);

  const handleRecipeComplete = useCallback((recipe: RecipeData) => {
    const timeSpent = Math.floor((new Date().getTime() - startTimeRef.current.getTime()) / 1000);
    
    updateProgress({ 
      progress: 100,
      detailedProgress: {
        welcome: 100,
        pathwaySelection: 100,
        processing: 100
      },
      timeSpent
    });
    
    // Check for quick learner achievement
    if (timeSpent < 120) {
      unlockAchievement('quick_learner');
    }
    
    unlockAchievement('recipe_master');
    addMilestone('recipe_completed');
    showCelebration("🎉 Congratulations! You've successfully added your first recipe!", 'completion');
    
    setTimeout(() => {
      onComplete(recipe);
    }, 3000);
  }, [updateProgress, addMilestone, showCelebration, onComplete, unlockAchievement]);

  // Progressive disclosure for welcome step with enhanced timing
  useEffect(() => {
    if (progressState.currentStep === 'welcome') {
      const timer1 = setTimeout(() => {
        updateProgress({
          detailedProgress: {
            ...progressState.detailedProgress,
            welcome: 30
          }
        });
      }, 500);
      
      const timer2 = setTimeout(() => {
        updateProgress({
          detailedProgress: {
            ...progressState.detailedProgress,
            welcome: 60
          }
        });
      }, 1500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [progressState.currentStep, progressState.detailedProgress, updateProgress]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showHelp) {
        setShowHelp(null);
      }
      if (event.key === '?' && !showHelp) {
        setShowHelp('general');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp]);

  // Enhanced smart pathway filtering with sophisticated logic
  const recommendedPathways = React.useMemo(() => {
    // For beginners, prioritize easiest pathways first
    if (userSkillLevel === 'BEGINNER') {
      return PATHWAY_OPTIONS
        .filter(pathway => pathway.id === 'url' || pathway.id === 'popular')
        .sort((a, b) => {
          // Prioritize popular recipes first for absolute beginners
          if (a.id === 'popular') return -1;
          if (b.id === 'popular') return 1;
          // Then URL scanning
          if (a.id === 'url') return -1;
          if (b.id === 'url') return 1;
          return 0;
        });
    }
    
    // For intermediate users, show all but prioritize easier ones
    if (userSkillLevel === 'INTERMEDIATE') {
      return PATHWAY_OPTIONS.sort((a, b) => {
        // Prioritize by success rate and ease
        const aScore = (a.popular ? 2 : 0) + (parseFloat(a.successRate) / 100);
        const bScore = (b.popular ? 2 : 0) + (parseFloat(b.successRate) / 100);
        return bScore - aScore;
      });
    }
    
    // For advanced users, show all options in original order
    return PATHWAY_OPTIONS;
  }, [userSkillLevel]);

  // Get pathway recommendations with reasoning
  const getPathwayRecommendation = React.useMemo(() => {
    if (userSkillLevel === 'BEGINNER') {
      return {
        primary: 'popular',
        secondary: 'url',
        reasoning: 'Start with tested recipes, then try URL scanning',
        hiddenOptions: ['image', 'manual'],
        showAllText: 'Show all options'
      };
    }
    
    if (userSkillLevel === 'INTERMEDIATE') {
      return {
        primary: 'url',
        secondary: 'popular',
        reasoning: 'URL scanning is quick and reliable',
        hiddenOptions: [],
        showAllText: null
      };
    }
    
    return {
      primary: null,
      secondary: null,
      reasoning: 'All options available',
      hiddenOptions: [],
      showAllText: null
    };
  }, [userSkillLevel]);

  // State for showing all options (for beginners)
  const [showAllPathways, setShowAllPathways] = useState(false);

  // Final pathways to display
  const displayedPathways = React.useMemo(() => {
    if (userSkillLevel === 'BEGINNER' && !showAllPathways) {
      return recommendedPathways;
    }
    return userSkillLevel === 'BEGINNER' && showAllPathways ? PATHWAY_OPTIONS : recommendedPathways;
  }, [userSkillLevel, showAllPathways, recommendedPathways]);

  // Enhanced help system
  const renderHelpTooltip = (pathwayId: string) => {
    const pathway = PATHWAY_OPTIONS.find(p => p.id === pathwayId);
    if (!pathway || showHelp !== pathwayId) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-in slide-in-from-top-2 duration-200">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-1">{pathway.helpText}</h4>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Tips for success:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {pathway.tips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderWelcomeStep = () => (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-900">Add Your First Recipe</h2>
          <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
        </div>
        <p className="text-gray-600 max-w-md mx-auto">
          Let&apos;s get you started by adding your first recipe. Choose the method that works best for you.
        </p>
      </div>

      {/* Enhanced Social Proof with animation */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 animate-in fade-in duration-1000 delay-500">
        <Users className="h-4 w-4" />
        <span>Over 10,000 users have added their first recipe this way</span>
        <ThumbsUp className="h-4 w-4 text-green-500" />
      </div>

      {/* Enhanced Motivational Message with better styling */}
      {progressState.motivationalMessage && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto animate-in slide-in-from-bottom-3 duration-500 delay-700">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-blue-600 animate-pulse" />
            <p className="text-sm text-blue-800 font-medium">{progressState.motivationalMessage}</p>
          </div>
        </div>
      )}

      {/* Enhanced Get Started Button */}
      <Button 
        onClick={() => {
          trackInteraction();
          updateProgress({
            currentStep: 'pathway',
            detailedProgress: {
              welcome: 100,
              pathwaySelection: 0,
              processing: 0
            }
          });
          addMilestone('welcome_completed');
        }}
        size="lg"
        className="px-8 relative overflow-hidden group transform transition-all duration-200 hover:scale-105 focus:scale-105"
        aria-label="Start adding your first recipe"
      >
        <span className="relative z-10 flex items-center">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>

      {/* Enhanced Skip Option */}
      {onSkip && (
        <div className="pt-4 animate-in fade-in duration-1000 delay-1000">
          <Button 
            variant="ghost" 
            onClick={() => {
              trackInteraction();
              onSkip();
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Skip recipe addition for now"
          >
            Skip for now
          </Button>
        </div>
      )}

      {/* Achievement Display */}
      {achievements.some(a => a.unlocked) && (
        <div className="mt-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
            <Award className="h-4 w-4" />
            <span>Achievement unlocked!</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderPathwaySelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">Choose Your Method</h2>
        <p className="text-gray-600">
          How would you like to add your first recipe?
        </p>
        {/* Time estimate for this step */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Clock className="h-3 w-3" />
          <span>This should take about 1-3 minutes</span>
        </div>
      </div>

      {/* Enhanced Smart Guidance based on skill level */}
      {getPathwayRecommendation.reasoning && (
        <div className={cn(
          "border rounded-lg p-4 animate-in slide-in-from-top-3 duration-500",
          userSkillLevel === 'BEGINNER' 
            ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
            : userSkillLevel === 'INTERMEDIATE'
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
            : "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200"
        )}>
          <div className="flex items-start space-x-3">
            <div className={cn(
              "p-1 rounded-full",
              userSkillLevel === 'BEGINNER' ? "bg-green-100" :
              userSkillLevel === 'INTERMEDIATE' ? "bg-blue-100" : "bg-purple-100"
            )}>
              <ChefHat className={cn(
                "h-4 w-4",
                userSkillLevel === 'BEGINNER' ? "text-green-600" :
                userSkillLevel === 'INTERMEDIATE' ? "text-blue-600" : "text-purple-600"
              )} />
            </div>
            <div className="flex-1">
              <h3 className={cn(
                "font-medium",
                userSkillLevel === 'BEGINNER' ? "text-green-900" :
                userSkillLevel === 'INTERMEDIATE' ? "text-blue-900" : "text-purple-900"
              )}>
                {userSkillLevel === 'BEGINNER' ? 'Perfect for Beginners' :
                 userSkillLevel === 'INTERMEDIATE' ? 'Recommended for You' : 'All Options Available'}
              </h3>
              <p className={cn(
                "text-sm mt-1",
                userSkillLevel === 'BEGINNER' ? "text-green-700" :
                userSkillLevel === 'INTERMEDIATE' ? "text-blue-700" : "text-purple-700"
              )}>
                {getPathwayRecommendation.reasoning}
              </p>
              
              {/* Show all options toggle for beginners */}
              {getPathwayRecommendation.showAllText && (
                <div className="mt-3 flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAllPathways(!showAllPathways);
                      trackInteraction();
                    }}
                    className="text-green-600 hover:text-green-800 p-0 h-auto transition-colors"
                    aria-label={showAllPathways ? 'Show recommended options only' : 'Show all pathway options'}
                  >
                    <Target className="h-3 w-3 mr-1" />
                    {showAllPathways ? 'Show recommended only' : getPathwayRecommendation.showAllText}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowTips(!showTips);
                      trackInteraction();
                    }}
                    className="text-green-600 hover:text-green-800 p-0 h-auto transition-colors"
                    aria-label={showTips ? 'Hide detailed tips' : 'Show detailed tips'}
                  >
                    <Info className="h-3 w-3 mr-1" />
                    {showTips ? 'Hide' : 'Show'} detailed tips
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Progressive disclosure of detailed tips */}
      {showTips && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
          <h4 className="font-medium text-yellow-900 flex items-center space-x-2">
            <Lightbulb className="h-4 w-4" />
            <span>Success Tips:</span>
          </h4>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li className="flex items-start space-x-2">
              <Globe className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>URL scanning works best with popular recipe websites like AllRecipes, Food Network, or BBC Good Food</span>
            </li>
            <li className="flex items-start space-x-2">
              <Camera className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Image scanning needs clear, well-lit photos with readable text</span>
            </li>
            <li className="flex items-start space-x-2">
              <Star className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Popular recipes are perfect for trying new cuisines with confidence</span>
            </li>
            <li className="flex items-start space-x-2">
              <PenTool className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span>Manual entry gives you complete control over formatting and personal notes</span>
            </li>
          </ul>
        </div>
      )}

      {/* Enhanced pathway cards with smart recommendations */}
      <div className="grid gap-4 md:grid-cols-2">
        {displayedPathways.map((pathway, index) => {
          const Icon = pathway.icon;
          const isPrimary = getPathwayRecommendation.primary === pathway.id;
          const isSecondary = getPathwayRecommendation.secondary === pathway.id;
          const isRecommended = isPrimary || isSecondary;
          
          return (
            <div key={pathway.id} className="relative">
              <Card 
                className={cn(
                  "cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus-within:scale-[1.02]",
                  "border-2 group relative",
                  // Enhanced recommendation styling
                  isPrimary && "ring-2 ring-green-500 ring-opacity-60 shadow-lg border-green-300 bg-green-50/30",
                  isSecondary && "ring-2 ring-blue-500 ring-opacity-50 shadow-md border-blue-300 bg-blue-50/20",
                  !isRecommended && "border-gray-200 hover:border-gray-300",
                  isRecommended && "hover:shadow-xl",
                  "animate-in slide-in-from-bottom-4 duration-500",
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handlePathwaySelect(pathway.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${pathway.title} method${isRecommended ? ' (Recommended)' : ''}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePathwaySelect(pathway.id);
                  }
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg transition-colors duration-200",
                        isPrimary ? "bg-green-100 group-hover:bg-green-200" :
                        isSecondary ? "bg-blue-100 group-hover:bg-blue-200" :
                        "bg-gray-100 group-hover:bg-gray-200"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          isPrimary ? "text-green-600" :
                          isSecondary ? "text-blue-600" :
                          "text-gray-600"
                        )} />
                      </div>
                      <div>
                        <CardTitle className={cn(
                          "text-lg transition-colors",
                          isPrimary ? "group-hover:text-green-700" :
                          isSecondary ? "group-hover:text-blue-700" :
                          "group-hover:text-gray-700"
                        )}>
                          {pathway.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {isPrimary && (
                            <Badge className="bg-green-100 text-green-800 border-green-300 animate-pulse">
                              <Trophy className="h-3 w-3 mr-1" />
                              Best Choice
                            </Badge>
                          )}
                          {isSecondary && (
                            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                              <Star className="h-3 w-3 mr-1" />
                              Great Option
                            </Badge>
                          )}
                          {pathway.popular && !isRecommended && (
                            <Badge variant="outline" className="text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{pathway.timeEstimate}</span>
                        </div>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">
                            {pathway.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHelp(showHelp === pathway.id ? null : pathway.id);
                          trackInteraction();
                        }}
                        aria-label={`Get help for ${pathway.title}`}
                      >
                        <HelpCircle className="h-4 w-4 text-gray-400 hover:text-blue-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-3 group-hover:text-gray-700 transition-colors">
                    {pathway.description}
                  </CardDescription>
                  
                  {/* Enhanced Social proof and success metrics */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{pathway.userCount} users</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Target className="h-3 w-3 text-green-500" />
                      <span>{pathway.successRate} success</span>
                    </span>
                  </div>
                  
                  {/* Enhanced benefits display */}
                  <div className="space-y-1">
                    {pathway.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress indicator for this pathway */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Difficulty</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={cn(
                              "w-2 h-2 rounded-full",
                              level <= (pathway.difficulty === 'Easy' ? 1 : pathway.difficulty === 'Medium' ? 2 : 3)
                                ? "bg-blue-500"
                                : "bg-gray-200"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Enhanced help tooltip */}
              {renderHelpTooltip(pathway.id)}
            </div>
          );
        }        )}
      </div>

      {/* Show additional pathways notice for beginners */}
      {userSkillLevel === 'BEGINNER' && showAllPathways && displayedPathways.length > recommendedPathways.length && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start space-x-3">
            <Info className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-yellow-900 text-sm">Additional Options</h4>
              <p className="text-xs text-yellow-700 mt-1">
                These options require more setup but give you more control. We recommend starting with the highlighted options above.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced navigation with progress indicator */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={handleBack}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Go back to welcome screen"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        {/* Subtle progress indicator */}
        <div className="text-xs text-gray-400">
          Step 2 of 3
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="text-center text-xs text-gray-400 animate-in fade-in duration-1000 delay-1000">
        Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-600">?</kbd> for help
      </div>
    </div>
  );

  const renderProcessingStep = () => {
    if (!progressState.selectedPathway) return null;

    const pathway = PATHWAY_OPTIONS.find(p => p.id === progressState.selectedPathway);
    if (!pathway) return null;

    // Enhanced pathway components with progress callbacks
    const pathwayProps = {
      onComplete: handleRecipeComplete,
      onBack: handleBack,
      userCategories,
      onProgressUpdate: (progress: number) => {
        updateProgress({
          detailedProgress: {
            ...progressState.detailedProgress,
            processing: progress
          }
        });
      }
    };

    // Render the appropriate pathway component
    switch (progressState.selectedPathway) {
      case 'url':
        return (
          <URLScanningPathway
            {...pathwayProps}
          />
        );
      
      case 'image':
        return (
          <ImageScanningPathway
            {...pathwayProps}
          />
        );
      
      case 'manual':
        return (
          <ManualEntryPathway
            {...pathwayProps}
          />
        );
      
      case 'popular':
        return (
          <PopularRecipeSelection
            {...pathwayProps}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={cn("max-w-4xl mx-auto p-6", className)}>
      {/* Enhanced Celebration Overlay with accessibility */}
      {progressState.showCelebration && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-in fade-in duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="celebration-title"
          aria-describedby="celebration-message"
        >
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center animate-in zoom-in duration-500 shadow-2xl border border-gray-100">
            {/* Celebration animation */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full animate-ping opacity-30" />
              </div>
              <div className="relative">
                <Trophy className="h-16 w-16 text-yellow-500 animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
                </div>
              </div>
            </div>
            
            <h3 id="celebration-title" className="text-xl font-bold text-gray-900 mb-3">
              Milestone Achieved!
            </h3>
            
            <p id="celebration-message" className="text-lg font-medium text-gray-700 mb-4 leading-relaxed">
              {progressState.motivationalMessage}
            </p>
            
            {/* Animated sparkles */}
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(7)].map((_, i) => (
                <Sparkles 
                  key={i} 
                  className="h-4 w-4 text-yellow-400 animate-pulse" 
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '1.5s'
                  }} 
                />
              ))}
            </div>
            
            {/* Achievement badges if any were unlocked */}
            {achievements.filter(a => a.unlocked && a.timestamp && 
              new Date().getTime() - a.timestamp.getTime() < 5000).length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
                <div className="text-sm font-medium text-blue-900 mb-2">New Achievement!</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {achievements.filter(a => a.unlocked && a.timestamp && 
                    new Date().getTime() - a.timestamp.getTime() < 5000).map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={achievement.id} className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 border border-blue-200">
                        <Icon className="h-3 w-3 text-blue-600" />
                        <span className="text-xs text-blue-800 font-medium">{achievement.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Confetti effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-70"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Progress Bar with micro-interactions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 font-mono">{Math.round(progressState.progress)}%</span>
            {isAnimating && (
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
            {completedMilestones.length > 0 && (
              <Badge variant="secondary" className="text-xs animate-in zoom-in duration-300">
                <Zap className="h-3 w-3 mr-1" />
                {completedMilestones.length} milestone{completedMilestones.length !== 1 ? 's' : ''}
              </Badge>
            )}
          </div>
        </div>
        <div className="relative">
          <Progress value={progressState.progress} className="h-3 transition-all duration-500 ease-out" />
          {/* Animated progress glow effect */}
          {progressState.progress > 0 && (
            <div 
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30 animate-pulse"
              style={{ width: `${progressState.progress}%` }}
            />
          )}
          {/* Progress milestones indicators */}
          <div className="absolute top-0 left-0 w-full h-3 flex items-center">
            {[25, 50, 75].map((milestone) => (
              <div
                key={milestone}
                className={cn(
                  "w-1 h-5 bg-white border border-gray-300 rounded-full transition-all duration-300",
                  progressState.progress >= milestone && "bg-green-500 border-green-500 shadow-sm"
                )}
                style={{ marginLeft: `${milestone - 1}%` }}
              />
            ))}
          </div>
        </div>
        {/* Time and interaction stats */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{Math.floor(progressState.timeSpent / 60)}:{(progressState.timeSpent % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-3 w-3" />
              <span>{progressState.interactionCount} interactions</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {flowSteps.find(step => progressState.currentStep === step.id)?.estimatedTime}
          </div>
        </div>
      </div>

      {/* Enhanced Step Indicators with accessibility */}
      <div className="flex items-center justify-center mb-8" role="progressbar" aria-label="Recipe addition progress">
        {flowSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center group">
              <div 
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 relative",
                  step.completed 
                    ? "bg-green-500 text-white shadow-lg scale-110 hover:scale-115" 
                    : progressState.currentStep === step.id
                    ? "bg-blue-500 text-white shadow-md animate-pulse hover:animate-none hover:scale-105"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:scale-105"
                )}
                role="button"
                tabIndex={0}
                aria-label={`Step ${index + 1}: ${step.title} - ${step.completed ? 'Completed' : progressState.currentStep === step.id ? 'Current' : 'Pending'}`}
                aria-current={progressState.currentStep === step.id ? 'step' : undefined}
              >
                {step.completed ? (
                  <CheckCircle className="h-6 w-6 animate-in zoom-in duration-300" />
                ) : progressState.currentStep === step.id ? (
                  <div className="w-4 h-4 bg-white rounded-full animate-ping" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
                
                {/* Completion celebration effect */}
                {step.completed && (
                  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
                )}
              </div>
              
              <div className="mt-3 text-center max-w-24">
                <div className={cn(
                  "text-sm font-medium transition-colors group-hover:text-blue-600",
                  step.completed ? "text-green-700" : 
                  progressState.currentStep === step.id ? "text-blue-700" : "text-gray-900"
                )}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500 mt-1 leading-tight">
                  {step.description}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {step.estimatedTime}
                </div>
              </div>
            </div>
            
            {index < flowSteps.length - 1 && (
              <div className="flex flex-col items-center mx-4 mt-6">
                <div className={cn(
                  "w-16 h-1 transition-all duration-500 rounded-full relative overflow-hidden",
                  step.completed ? "bg-green-500 shadow-sm" : "bg-gray-200"
                )}>
                  {/* Animated progress line */}
                  {step.completed && (
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 animate-pulse opacity-50" />
                  )}
                </div>
                <ArrowRight className={cn(
                  "h-3 w-3 mt-1 transition-colors",
                  step.completed ? "text-green-500" : "text-gray-300"
                )} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Content */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          {progressState.currentStep === 'welcome' && renderWelcomeStep()}
          {progressState.currentStep === 'pathway' && renderPathwaySelection()}
          {progressState.currentStep === 'processing' && renderProcessingStep()}
        </CardContent>
      </Card>
    </div>
  );
} 