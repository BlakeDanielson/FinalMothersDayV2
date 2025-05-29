'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  X, 
  CheckCircle,
  SkipForward
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWelcomeFlow, type WelcomeScreen as WelcomeScreenType } from '@/contexts/WelcomeFlowContext';

export interface WelcomeScreenProps {
  screenId: WelcomeScreenType;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  showProgress?: boolean;
  showNavigation?: boolean;
  showSkip?: boolean;
  onComplete?: () => void;
  customActions?: React.ReactNode;
}

const SCREEN_TITLES: Record<WelcomeScreenType, string> = {
  overview: 'Welcome to Caren\'s Cookbook',
  organization: 'Organization Tips',
  categorization: 'Categorization Guide',
  quickstart: 'Quick Start Guide'
};

export function WelcomeScreen({
  screenId,
  title,
  subtitle,
  children,
  className,
  showProgress = true,
  showNavigation = true,
  showSkip = true,
  onComplete,
  customActions
}: WelcomeScreenProps) {
  const {
    state,
    nextScreen,
    previousScreen,
    skipWelcomeFlow,
    markScreenCompleted,
    completeWelcomeFlow,
    canGoNext,
    canGoPrevious,
    currentScreenIndex,
    totalScreens,
    progressPercentage
  } = useWelcomeFlow();

  const isCurrentScreen = state.currentScreen === screenId;
  const isCompleted = state.completedScreens.has(screenId);
  const isLastScreen = currentScreenIndex === totalScreens - 1;

  const handleNext = () => {
    // Mark current screen as completed
    markScreenCompleted(screenId);
    
    // Call onComplete callback if provided
    if (onComplete) {
      onComplete();
    }

    // Navigate to next screen or complete flow
    if (isLastScreen) {
      completeWelcomeFlow();
    } else {
      nextScreen();
    }
  };

  const handlePrevious = () => {
    previousScreen();
  };

  const handleSkip = () => {
    skipWelcomeFlow();
  };

  if (!isCurrentScreen) {
    return null;
  }

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4", className)}>
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentScreenIndex + 1} of {totalScreens}
              </span>
              <span className="text-sm text-gray-500">{progressPercentage}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        {/* Screen Indicators */}
        <div className="flex items-center justify-center mb-8">
          {Array.from({ length: totalScreens }, (_, index) => {
            const screenName = ['overview', 'organization', 'categorization', 'quickstart'][index] as WelcomeScreenType;
            const isActive = index === currentScreenIndex;
            const isCompleted = state.completedScreens.has(screenName);
            
            return (
              <React.Fragment key={screenName}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    isCompleted 
                      ? "bg-green-500 text-white" 
                      : isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-xs font-medium text-gray-900">
                      {SCREEN_TITLES[screenName].split(' ')[0]}
                    </div>
                  </div>
                </div>
                {index < totalScreens - 1 && (
                  <div className={cn(
                    "w-16 h-0.5 mx-4 mt-4 transition-colors",
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Main Content Card */}
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                {isCompleted && (
                  <Badge variant="secondary" className="ml-3">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              {subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Screen Content */}
            <div className="mb-8">
              {children}
            </div>

            {/* Navigation */}
            {showNavigation && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {canGoPrevious ? (
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      className="flex items-center"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  ) : (
                    <div /> // Spacer
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  {showSkip && (
                    <Button 
                      variant="ghost" 
                      onClick={handleSkip}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <SkipForward className="mr-2 h-4 w-4" />
                      Skip Tour
                    </Button>
                  )}

                  {customActions}

                  <Button 
                    onClick={handleNext}
                    className="flex items-center px-6"
                  >
                    {isLastScreen ? 'Get Started' : 'Next'}
                    {!isLastScreen && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Skip Button (Alternative Position) */}
        {showSkip && (
          <div className="absolute top-4 right-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 