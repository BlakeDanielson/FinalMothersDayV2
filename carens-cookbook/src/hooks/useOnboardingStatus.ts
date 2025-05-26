'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';

export interface OnboardingStatus {
  isCompleted: boolean;
  currentStep: number;
  nextStep: number | null;
  progressPercentage: number;
  isLoading: boolean;
  error: string | null;
}

interface OnboardingStatusCache {
  data: OnboardingStatus | null;
  timestamp: number;
  userId: string | null;
}

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;
const CACHE_KEY = 'onboarding_status_cache';

/**
 * Custom hook to fetch and cache user onboarding status
 * Integrates with the new detailed progress tracking API
 */
export function useOnboardingStatus() {
  const { user, isLoaded } = useUser();
  const [status, setStatus] = useState<OnboardingStatus>({
    isCompleted: false,
    currentStep: 0,
    nextStep: null,
    progressPercentage: 0,
    isLoading: true,
    error: null
  });

  // Get cached data from localStorage
  const getCachedStatus = useCallback((): OnboardingStatus | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const parsedCache: OnboardingStatusCache = JSON.parse(cached);
      
      // Check if cache is valid (same user and not expired)
      const isExpired = Date.now() - parsedCache.timestamp > CACHE_DURATION;
      const isDifferentUser = parsedCache.userId !== user?.id;
      
      if (isExpired || isDifferentUser || !parsedCache.data) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }

      return parsedCache.data;
    } catch (error) {
      console.warn('Failed to parse cached onboarding status:', error);
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
  }, [user?.id]);

  // Cache status data
  const setCachedStatus = useCallback((statusData: OnboardingStatus) => {
    if (typeof window === 'undefined' || !user?.id) return;

    try {
      const cacheData: OnboardingStatusCache = {
        data: statusData,
        timestamp: Date.now(),
        userId: user.id
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache onboarding status:', error);
    }
  }, [user?.id]);

  // Fetch onboarding status from API
  const fetchOnboardingStatus = useCallback(async (useCache = true): Promise<OnboardingStatus> => {
    if (!user?.id) {
      return {
        isCompleted: false,
        currentStep: 0,
        nextStep: null,
        progressPercentage: 0,
        isLoading: false,
        error: 'User not authenticated'
      };
    }

    // Try cache first if enabled
    if (useCache) {
      const cached = getCachedStatus();
      if (cached) {
        return { ...cached, isLoading: false };
      }
    }

    try {
      const response = await fetch('/api/onboarding/progress');
      
      if (!response.ok) {
        // Fallback to old API if new one fails
        const fallbackResponse = await fetch('/api/user-preferences/onboarding');
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          const fallbackStatus: OnboardingStatus = {
            isCompleted: fallbackData.onboarding?.completed || false,
            currentStep: fallbackData.onboarding?.currentStep || 0,
            nextStep: fallbackData.onboarding?.nextStep || null,
            progressPercentage: Math.round(((fallbackData.onboarding?.currentStep || 0) / 7) * 100),
            isLoading: false,
            error: null
          };
          setCachedStatus(fallbackStatus);
          return fallbackStatus;
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const progress = data.progress;

      const statusData: OnboardingStatus = {
        isCompleted: progress.isCompleted || false,
        currentStep: progress.currentStep || 0,
        nextStep: progress.nextStep || null,
        progressPercentage: progress.progressPercentage || 0,
        isLoading: false,
        error: null
      };

      setCachedStatus(statusData);
      return statusData;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch onboarding status';
      console.error('Error fetching onboarding status:', errorMessage);
      
      return {
        isCompleted: false,
        currentStep: 0,
        nextStep: null,
        progressPercentage: 0,
        isLoading: false,
        error: errorMessage
      };
    }
  }, [user?.id, getCachedStatus, setCachedStatus]);

  // Refresh status (bypass cache)
  const refreshStatus = useCallback(async () => {
    setStatus(prev => ({ ...prev, isLoading: true, error: null }));
    const newStatus = await fetchOnboardingStatus(false);
    setStatus(newStatus);
  }, [fetchOnboardingStatus]);

  // Clear cache (useful when onboarding is completed)
  const clearCache = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CACHE_KEY);
    }
  }, []);

  // Load status on mount and when user changes
  useEffect(() => {
    if (!isLoaded) return;

    const loadStatus = async () => {
      setStatus(prev => ({ ...prev, isLoading: true, error: null }));
      const statusData = await fetchOnboardingStatus(true);
      setStatus(statusData);
    };

    loadStatus();
  }, [isLoaded, user?.id, fetchOnboardingStatus]);

  // Listen for onboarding completion events
  useEffect(() => {
    const handleOnboardingComplete = () => {
      clearCache();
      refreshStatus();
    };

    // Listen for custom events (can be dispatched when onboarding is completed)
    window.addEventListener('onboarding:completed', handleOnboardingComplete);
    
    return () => {
      window.removeEventListener('onboarding:completed', handleOnboardingComplete);
    };
  }, [clearCache, refreshStatus]);

  return {
    ...status,
    refreshStatus,
    clearCache,
    isAuthenticated: !!user && isLoaded
  };
} 