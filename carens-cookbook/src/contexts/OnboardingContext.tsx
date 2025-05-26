'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserPreferences } from '@/lib/types/user';
import { ONBOARDING_STEPS } from '@/lib/constants/user-preferences';
import { getDefaultUserPreferences } from '@/lib/utils/user-preferences';

export interface OnboardingStep {
  id: number;
  key: string;
  title: string;
  description: string;
  component: React.ComponentType<OnboardingStepProps>;
  isOptional?: boolean;
  validation?: (data: Record<string, unknown>) => Promise<boolean> | boolean;
}

export interface OnboardingStepProps {
  data?: Record<string, unknown>;
  onNext: (data?: Record<string, unknown>) => void;
  onPrevious: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
}

interface OnboardingContextType {
  // State
  currentStep: number;
  isCompleted: boolean;
  isLoading: boolean;
  userPreferences: UserPreferences | null;
  onboardingData: Record<number, Record<string, unknown>>;
  
  // Progress
  totalSteps: number;
  completedSteps: Set<number>;
  progressPercentage: number;
  progress: number; // Alias for progressPercentage
  
  // Data access
  stepData: Record<number, Record<string, unknown>>; // Alias for onboardingData
  
  // Navigation
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToStep: (step: number) => Promise<void>;
  nextStep: (data?: Record<string, unknown>) => Promise<void>;
  previousStep: () => void;
  skipStep: () => Promise<void>;
  skipOnboarding: () => Promise<void>; // Skip entire onboarding
  completeOnboarding: () => Promise<void>;
  
  // Data
  updateStepData: (step: number, data: Record<string, unknown>) => void;
  getStepData: (step: number) => Record<string, unknown>;
  
  // Utilities
  getStepInfo: (step: number) => OnboardingStep | undefined;
  isStepCompleted: (step: number) => boolean;
  isStepAccessible: (step: number) => boolean;
  
  // API
  saveProgress: () => Promise<void>;
  loadProgress: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();
  
  // Core state
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [onboardingData, setOnboardingData] = useState<Record<number, Record<string, unknown>>>({});
  const [completedSteps, setCompletedSteps] = useState(new Set<number>());

  // Constants
  const totalSteps = ONBOARDING_STEPS.length;
  
  // Computed values
  const progressPercentage = Math.round(((completedSteps.size + (isCompleted ? 1 : 0)) / totalSteps) * 100);
  const canGoNext = currentStep < totalSteps - 1;
  const canGoPrevious = currentStep > 0;



  // Persist data to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localData = {
        currentStep,
        onboardingData,
        completedSteps: Array.from(completedSteps),
        isCompleted
      };
      localStorage.setItem('onboarding_progress', JSON.stringify(localData));
    }
  }, [currentStep, onboardingData, completedSteps, isCompleted]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('onboarding_progress');
      if (stored) {
        try {
          const data = JSON.parse(stored);
          setCurrentStep(data.currentStep || 0);
          setOnboardingData(data.onboardingData || {});
          setCompletedSteps(new Set(data.completedSteps || []));
          setIsCompleted(data.isCompleted || false);
        } catch (error) {
          console.warn('Failed to parse stored onboarding progress:', error);
        }
      }
    }
  }, []);

  const loadProgress = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Use the new detailed progress API
      const response = await fetch('/api/onboarding/progress');
      if (response.ok) {
        const data = await response.json();
        const progress = data.progress;
        
        setCurrentStep(progress.currentStep || 0);
        setIsCompleted(progress.isCompleted || false);
        setCompletedSteps(new Set(progress.completedSteps || []));
        
        // Also load user preferences
        const prefsResponse = await fetch('/api/user-preferences');
        if (prefsResponse.ok) {
          const prefsData = await prefsResponse.json();
          setUserPreferences(prefsData.preferences || getDefaultUserPreferences());
        }
      } else {
        // Fallback to old API if new one fails
        const fallbackResponse = await fetch('/api/user-preferences/onboarding');
        if (fallbackResponse.ok) {
          const data = await fallbackResponse.json();
          
          setCurrentStep(data.onboarding.currentStep || 0);
          setIsCompleted(data.onboarding.completed || false);
          setUserPreferences(data.preferences || getDefaultUserPreferences());
          
          // Mark steps as completed based on current step
          const completed = new Set<number>();
          for (let i = 0; i < (data.onboarding.currentStep || 0); i++) {
            completed.add(i);
          }
          setCompletedSteps(completed);
        }
      }
    } catch (error) {
      console.error('Failed to load onboarding progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Load progress on mount and when user changes
  useEffect(() => {
    if (isLoaded && user) {
      loadProgress();
    }
  }, [isLoaded, user, loadProgress]);

  const saveProgress = useCallback(async () => {
    if (!user) return;
    
    try {
      // Use the new detailed step completion API
      if (currentStep >= 0 && currentStep < ONBOARDING_STEPS.length) {
        const response = await fetch(`/api/onboarding/steps/${currentStep}/complete`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: onboardingData[currentStep] || {}
          })
        });
        
        if (!response.ok) {
          // Fallback to old API
          await fetch('/api/user-preferences/onboarding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              step: currentStep,
              data: onboardingData[currentStep],
              markCompleted: isCompleted
            })
          });
        }
      }
    } catch (error) {
      console.error('Failed to save onboarding progress:', error);
    }
  }, [user, currentStep, onboardingData, isCompleted]);

  const updateStepData = useCallback((step: number, data: Record<string, unknown>) => {
    setOnboardingData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data }
    }));
  }, []);

  const getStepData = useCallback((step: number) => {
    return onboardingData[step] || {};
  }, [onboardingData]);

  const getStepInfo = useCallback((step: number): OnboardingStep | undefined => {
    const stepInfo = ONBOARDING_STEPS[step];
    if (!stepInfo) return undefined;
    
    return {
      id: step,
      key: stepInfo.key,
      title: stepInfo.title,
      description: stepInfo.description,
      component: () => null, // Will be provided by the actual step components
      isOptional: stepInfo.isOptional
    };
  }, []);

  const isStepCompleted = useCallback((step: number) => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const isStepAccessible = useCallback((step: number) => {
    // First step is always accessible
    if (step === 0) return true;
    
    // Can access if previous step is completed or if we're going backwards
    return isStepCompleted(step - 1) || step <= currentStep;
  }, [currentStep, isStepCompleted]);

  const goToStep = useCallback(async (step: number) => {
    if (step < 0 || step >= totalSteps) return;
    if (!isStepAccessible(step)) return;
    
    setCurrentStep(step);
    await saveProgress();
  }, [totalSteps, isStepAccessible, saveProgress]);

  const nextStep = useCallback(async (data?: Record<string, unknown>) => {
    if (!canGoNext) return;
    
    setIsLoading(true);
    try {
      // Save current step data if provided
      if (data) {
        updateStepData(currentStep, data);
      }
      
      // Mark current step as completed
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      
      // Move to next step
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      
      // Save progress
      await saveProgress();
    } catch (error) {
      console.error('Failed to proceed to next step:', error);
    } finally {
      setIsLoading(false);
    }
  }, [canGoNext, currentStep, updateStepData, saveProgress]);

  const previousStep = useCallback(() => {
    if (canGoPrevious) {
      setCurrentStep(prev => prev - 1);
    }
  }, [canGoPrevious]);

  const skipStep = useCallback(async () => {
    if (!canGoNext) return;
    
    const stepInfo = getStepInfo(currentStep);
    if (!stepInfo?.isOptional) return;
    
    await nextStep();
  }, [canGoNext, currentStep, getStepInfo, nextStep]);

  const completeOnboarding = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mark all steps as completed
      const allCompleted = new Set<number>();
      for (let i = 0; i < totalSteps; i++) {
        allCompleted.add(i);
      }
      setCompletedSteps(allCompleted);
      setIsCompleted(true);
      
      // Save final state
      await fetch('/api/user-preferences/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step: totalSteps - 1,
          data: onboardingData,
          markCompleted: true
        })
      });
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('onboarding_progress');
      }
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  }, [totalSteps, onboardingData]);

  const skipOnboarding = useCallback(async () => {
    await completeOnboarding();
  }, [completeOnboarding]);

  const value: OnboardingContextType = {
    // State
    currentStep,
    isCompleted,
    isLoading,
    userPreferences,
    onboardingData,
    
    // Progress
    totalSteps,
    completedSteps,
    progressPercentage,
    progress: progressPercentage, // Alias
    
    // Data access
    stepData: onboardingData, // Alias
    
    // Navigation
    canGoNext,
    canGoPrevious,
    goToStep,
    nextStep,
    previousStep,
    skipStep,
    skipOnboarding,
    completeOnboarding,
    
    // Data
    updateStepData,
    getStepData,
    
    // Utilities
    getStepInfo,
    isStepCompleted,
    isStepAccessible,
    
    // API
    saveProgress,
    loadProgress
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}; 