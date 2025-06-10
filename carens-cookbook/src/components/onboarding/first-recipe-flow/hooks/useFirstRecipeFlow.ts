'use client';

import { useState, useCallback, useRef } from 'react';
import { 
  ProgressState, 
  Achievement, 
  FlowStep, 
  RecipePathway, 
  RecipeData,
  MOTIVATIONAL_MESSAGES,
  CELEBRATION_MESSAGES,
  ACHIEVEMENTS,
  CELEBRATION_DURATION
} from '../utils';

export function useFirstRecipeFlow() {
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
    const duration = CELEBRATION_DURATION[type];
    
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
    showCelebration(`Great choice! ${pathway} is perfect for getting started.`);
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

  const handleRecipeComplete = useCallback((recipe: RecipeData, onComplete: (recipe: RecipeData) => void) => {
    updateProgress({
      progress: 100,
      detailedProgress: {
        welcome: 100,
        pathwaySelection: 100,
        processing: 100
      }
    });
    
    addMilestone('recipe_completed');
    unlockAchievement('recipe_master');
    showCelebration("🎉 Amazing! You've successfully added your first recipe!", 'completion');
    
    setTimeout(() => {
      onComplete(recipe);
    }, 2000);
  }, [updateProgress, addMilestone, unlockAchievement, showCelebration]);

  return {
    // State
    progressState,
    showTips,
    setShowTips,
    completedMilestones,
    achievements,
    showHelp,
    setShowHelp,
    isAnimating,
    flowSteps,

    // Actions
    updateProgress,
    handlePathwaySelect,
    handleBack,
    handleRecipeComplete,
    trackInteraction,
    addMilestone,
    showCelebration,
    unlockAchievement
  };
} 