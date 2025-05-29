'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { getAllTourConfigs } from '@/lib/tour-configs';

export interface TourStep {
  id: string;
  title: string;
  content: string;
  target: string; // CSS selector for the element to highlight
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: 'click' | 'hover' | 'none';
  optional?: boolean;
  condition?: () => boolean; // Conditional logic for showing this step
}

export interface TourConfig {
  id: string;
  name: string;
  description: string;
  steps: TourStep[];
  autoStart?: boolean;
  showOnce?: boolean;
}

interface TourState {
  activeTour: string | null;
  currentStepIndex: number;
  isActive: boolean;
  completedTours: string[];
  skippedTours: string[];
}

interface FeatureTourContextType {
  // State
  tourState: TourState;
  currentStep: TourStep | null;
  currentTour: TourConfig | null;
  
  // Actions
  startTour: (tourId: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  skipStep: () => void;
  skipTour: () => void;
  completeTour: () => void;
  exitTour: () => void;
  
  // Configuration
  registerTour: (tour: TourConfig) => void;
  unregisterTour: (tourId: string) => void;
  
  // Utilities
  isTourCompleted: (tourId: string) => boolean;
  isTourSkipped: (tourId: string) => boolean;
  shouldShowTour: (tourId: string) => boolean;
}

const FeatureTourContext = createContext<FeatureTourContextType | undefined>(undefined);

// Import tour configurations from external file
const TOUR_CONFIGS: Record<string, TourConfig> = getAllTourConfigs().reduce((acc, tour) => {
  acc[tour.id] = tour;
  return acc;
}, {} as Record<string, TourConfig>);

const STORAGE_KEY = 'feature-tour-state';

interface FeatureTourProviderProps {
  children: ReactNode;
}

export function FeatureTourProvider({ children }: FeatureTourProviderProps) {
  const [tours, setTours] = useState<Record<string, TourConfig>>(TOUR_CONFIGS);
  const [tourState, setTourState] = useState<TourState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.warn('Failed to parse saved tour state:', error);
        }
      }
    }
    return {
      activeTour: null,
      currentStepIndex: 0,
      isActive: false,
      completedTours: [],
      skippedTours: []
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tourState));
    }
  }, [tourState]);

  const currentTour = tourState.activeTour ? tours[tourState.activeTour] : null;
  const currentStep = currentTour?.steps[tourState.currentStepIndex] || null;

  const startTour = useCallback((tourId: string) => {
    const tour = tours[tourId];
    if (!tour) {
      console.warn(`Tour "${tourId}" not found`);
      return;
    }

    // Check if tour should be shown
    if (tour.showOnce && tourState.completedTours.includes(tourId)) {
      console.log(`Tour "${tourId}" already completed and set to show once`);
      return;
    }

    setTourState(prev => ({
      ...prev,
      activeTour: tourId,
      currentStepIndex: 0,
      isActive: true
    }));
  }, [tours, tourState.completedTours]);

  const nextStep = useCallback(() => {
    if (!currentTour) return;

    const nextIndex = tourState.currentStepIndex + 1;
    if (nextIndex >= currentTour.steps.length) {
      // Complete tour inline to avoid dependency issues
      setTourState(prev => ({
        ...prev,
        activeTour: null,
        currentStepIndex: 0,
        isActive: false,
        completedTours: [...prev.completedTours, prev.activeTour!]
      }));
    } else {
      setTourState(prev => ({
        ...prev,
        currentStepIndex: nextIndex
      }));
    }
  }, [currentTour, tourState.currentStepIndex]);

  const previousStep = useCallback(() => {
    if (tourState.currentStepIndex > 0) {
      setTourState(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex - 1
      }));
    }
  }, [tourState.currentStepIndex]);

  const skipStep = useCallback(() => {
    nextStep();
  }, [nextStep]);

  const skipTour = useCallback(() => {
    if (!tourState.activeTour) return;

    setTourState(prev => ({
      ...prev,
      activeTour: null,
      currentStepIndex: 0,
      isActive: false,
      skippedTours: [...prev.skippedTours, prev.activeTour!]
    }));
  }, [tourState.activeTour]);

  const completeTour = useCallback(() => {
    if (!tourState.activeTour) return;

    setTourState(prev => ({
      ...prev,
      activeTour: null,
      currentStepIndex: 0,
      isActive: false,
      completedTours: [...prev.completedTours, prev.activeTour!]
    }));
  }, [tourState.activeTour]);

  const exitTour = useCallback(() => {
    setTourState(prev => ({
      ...prev,
      activeTour: null,
      currentStepIndex: 0,
      isActive: false
    }));
  }, []);

  const registerTour = useCallback((tour: TourConfig) => {
    setTours(prev => ({
      ...prev,
      [tour.id]: tour
    }));
  }, []);

  const unregisterTour = useCallback((tourId: string) => {
    setTours(prev => {
      const newTours = { ...prev };
      delete newTours[tourId];
      return newTours;
    });
  }, []);

  const isTourCompleted = useCallback((tourId: string) => {
    return tourState.completedTours.includes(tourId);
  }, [tourState.completedTours]);

  const isTourSkipped = useCallback((tourId: string) => {
    return tourState.skippedTours.includes(tourId);
  }, [tourState.skippedTours]);

  const shouldShowTour = useCallback((tourId: string) => {
    const tour = tours[tourId];
    if (!tour) return false;
    
    if (tour.showOnce && isTourCompleted(tourId)) return false;
    if (isTourSkipped(tourId)) return false;
    
    return true;
  }, [tours, isTourCompleted, isTourSkipped]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!tourState.isActive) return;

      switch (event.key) {
        case 'Escape':
          exitTour();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          event.preventDefault();
          nextStep();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          previousStep();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [tourState.isActive, nextStep, previousStep, exitTour]);

  const value: FeatureTourContextType = {
    tourState,
    currentStep,
    currentTour,
    startTour,
    nextStep,
    previousStep,
    skipStep,
    skipTour,
    completeTour,
    exitTour,
    registerTour,
    unregisterTour,
    isTourCompleted,
    isTourSkipped,
    shouldShowTour
  };

  return (
    <FeatureTourContext.Provider value={value}>
      {children}
    </FeatureTourContext.Provider>
  );
}

export function useFeatureTour() {
  const context = useContext(FeatureTourContext);
  if (context === undefined) {
    throw new Error('useFeatureTour must be used within a FeatureTourProvider');
  }
  return context;
} 