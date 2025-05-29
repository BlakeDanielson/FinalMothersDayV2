'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type WelcomeScreen = 'overview' | 'organization' | 'categorization' | 'quickstart';

export interface WelcomeFlowState {
  currentScreen: WelcomeScreen;
  completedScreens: Set<WelcomeScreen>;
  isWelcomeFlowActive: boolean;
  showWelcomeFlow: boolean;
}

export interface WelcomeFlowContextValue {
  state: WelcomeFlowState;
  navigateToScreen: (screen: WelcomeScreen) => void;
  markScreenCompleted: (screen: WelcomeScreen) => void;
  nextScreen: () => void;
  previousScreen: () => void;
  skipWelcomeFlow: () => void;
  restartWelcomeFlow: () => void;
  completeWelcomeFlow: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentScreenIndex: number;
  totalScreens: number;
  progressPercentage: number;
}

const WelcomeFlowContext = createContext<WelcomeFlowContextValue | undefined>(undefined);

const WELCOME_SCREENS: WelcomeScreen[] = ['overview', 'organization', 'categorization', 'quickstart'];

const WELCOME_FLOW_STORAGE_KEY = 'carens-cookbook-welcome-flow';

interface StoredWelcomeFlowData {
  completedScreens: string[];
  hasCompletedWelcomeFlow: boolean;
  lastViewedScreen?: WelcomeScreen;
}

export interface WelcomeFlowProviderProps {
  children: React.ReactNode;
  autoStart?: boolean;
  initialScreen?: WelcomeScreen;
}

export function WelcomeFlowProvider({ 
  children, 
  autoStart = false,
  initialScreen = 'overview' 
}: WelcomeFlowProviderProps) {
  const [state, setState] = useState<WelcomeFlowState>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(WELCOME_FLOW_STORAGE_KEY);
        if (stored) {
          const data: StoredWelcomeFlowData = JSON.parse(stored);
          return {
            currentScreen: data.lastViewedScreen || initialScreen,
            completedScreens: new Set(data.completedScreens as WelcomeScreen[]),
            isWelcomeFlowActive: autoStart && !data.hasCompletedWelcomeFlow,
            showWelcomeFlow: autoStart && !data.hasCompletedWelcomeFlow
          };
        }
      } catch (error) {
        console.warn('Failed to load welcome flow state from localStorage:', error);
      }
    }

    return {
      currentScreen: initialScreen,
      completedScreens: new Set<WelcomeScreen>(),
      isWelcomeFlowActive: autoStart,
      showWelcomeFlow: autoStart
    };
  });

  // Persist state to localStorage
  const persistState = useCallback((newState: WelcomeFlowState) => {
    if (typeof window !== 'undefined') {
      try {
        const dataToStore: StoredWelcomeFlowData = {
          completedScreens: Array.from(newState.completedScreens),
          hasCompletedWelcomeFlow: !newState.isWelcomeFlowActive && newState.completedScreens.size === WELCOME_SCREENS.length,
          lastViewedScreen: newState.currentScreen
        };
        localStorage.setItem(WELCOME_FLOW_STORAGE_KEY, JSON.stringify(dataToStore));
      } catch (error) {
        console.warn('Failed to save welcome flow state to localStorage:', error);
      }
    }
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    persistState(state);
  }, [state, persistState]);

  const navigateToScreen = useCallback((screen: WelcomeScreen) => {
    setState(prev => ({
      ...prev,
      currentScreen: screen
    }));
  }, []);

  const markScreenCompleted = useCallback((screen: WelcomeScreen) => {
    setState(prev => {
      const newCompletedScreens = new Set(prev.completedScreens);
      newCompletedScreens.add(screen);
      return {
        ...prev,
        completedScreens: newCompletedScreens
      };
    });
  }, []);

  const currentScreenIndex = WELCOME_SCREENS.indexOf(state.currentScreen);
  const canGoNext = currentScreenIndex < WELCOME_SCREENS.length - 1;
  const canGoPrevious = currentScreenIndex > 0;

  const nextScreen = useCallback(() => {
    if (canGoNext) {
      const nextIndex = currentScreenIndex + 1;
      const nextScreenName = WELCOME_SCREENS[nextIndex];
      navigateToScreen(nextScreenName);
    }
  }, [canGoNext, currentScreenIndex, navigateToScreen]);

  const previousScreen = useCallback(() => {
    if (canGoPrevious) {
      const prevIndex = currentScreenIndex - 1;
      const prevScreenName = WELCOME_SCREENS[prevIndex];
      navigateToScreen(prevScreenName);
    }
  }, [canGoPrevious, currentScreenIndex, navigateToScreen]);

  const skipWelcomeFlow = useCallback(() => {
    setState(prev => ({
      ...prev,
      isWelcomeFlowActive: false,
      showWelcomeFlow: false
    }));
  }, []);

  const restartWelcomeFlow = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentScreen: 'overview',
      isWelcomeFlowActive: true,
      showWelcomeFlow: true,
      completedScreens: new Set<WelcomeScreen>()
    }));
  }, []);

  const completeWelcomeFlow = useCallback(() => {
    setState(prev => {
      const allScreensCompleted = new Set(WELCOME_SCREENS);
      return {
        ...prev,
        completedScreens: allScreensCompleted,
        isWelcomeFlowActive: false,
        showWelcomeFlow: false
      };
    });
  }, []);

  const progressPercentage = Math.round((state.completedScreens.size / WELCOME_SCREENS.length) * 100);

  const contextValue: WelcomeFlowContextValue = {
    state,
    navigateToScreen,
    markScreenCompleted,
    nextScreen,
    previousScreen,
    skipWelcomeFlow,
    restartWelcomeFlow,
    completeWelcomeFlow,
    canGoNext,
    canGoPrevious,
    currentScreenIndex,
    totalScreens: WELCOME_SCREENS.length,
    progressPercentage
  };

  return (
    <WelcomeFlowContext.Provider value={contextValue}>
      {children}
    </WelcomeFlowContext.Provider>
  );
}

export function useWelcomeFlow() {
  const context = useContext(WelcomeFlowContext);
  if (context === undefined) {
    throw new Error('useWelcomeFlow must be used within a WelcomeFlowProvider');
  }
  return context;
}

// Utility function to check if user has completed welcome flow
export function hasCompletedWelcomeFlow(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const stored = localStorage.getItem(WELCOME_FLOW_STORAGE_KEY);
    if (stored) {
      const data: StoredWelcomeFlowData = JSON.parse(stored);
      return data.hasCompletedWelcomeFlow || false;
    }
  } catch (error) {
    console.warn('Failed to check welcome flow completion status:', error);
  }
  
  return false;
}

// Utility function to reset welcome flow (for testing or admin purposes)
export function resetWelcomeFlow(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(WELCOME_FLOW_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to reset welcome flow:', error);
    }
  }
} 