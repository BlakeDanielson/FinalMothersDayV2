'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ONBOARDING_STEPS } from '@/lib/constants/user-preferences';
import { FirstRecipeFlow, RecipeData } from '@/components/onboarding/FirstRecipeFlow';
import { ProfileSetupStep } from '@/components/onboarding/ProfileSetupStep';
import { DietaryPreferencesStep } from '@/components/onboarding/DietaryPreferencesStep';
import { CookingPreferencesStep } from '@/components/onboarding/CookingPreferencesStep';
import { CategorySelectionStep } from '@/components/onboarding/CategorySelectionStep';
import { RecipeBasicsTourTrigger } from '@/components/tour/TourTrigger';

interface OnboardingWizardProps {
  onComplete?: () => void;
  onSkip?: () => void;
  className?: string;
}

// Simple component for the final success screen
const OnboardingSuccessScreen = ({ onContinue }: { onContinue: () => void }) => (
  <Card className="w-full max-w-lg mx-auto">
    <CardHeader>
      <CardTitle className="text-2xl text-center">🎉 Onboarding Complete!</CardTitle>
      <CardDescription className="text-center">
        You're all set up. Welcome to your personalized cookbook experience.
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col items-center gap-4">
      <p>You can now start adding, organizing, and discovering recipes.</p>
      <Button onClick={onContinue} className="w-full">
        Continue to Dashboard
      </Button>
    </CardContent>
  </Card>
);

export function OnboardingWizard({ onComplete, onSkip, className }: OnboardingWizardProps) {
  const {
    currentStep,
    isLoading,
    progress,
    nextStep,
    previousStep,
    updateStepData,
    completeOnboarding,
    skipOnboarding
  } = useOnboarding();

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  const currentStepInfo = ONBOARDING_STEPS[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  const handleNext = async (data?: Record<string, unknown>) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (data) {
        updateStepData(currentStep, data);
      }
      
      if (isLastStep) {
        await completeOnboarding();
        if (onComplete) {
          onComplete();
        } else {
          // If no onComplete handler is provided, show the success screen as a fallback.
          setShowSuccessScreen(true);
        }
      } else {
        await nextStep();
      }
    } catch (error) {
      console.error('Error proceeding to next step:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrevious = async () => {
    if (isProcessing || isFirstStep) return;
    
    setIsProcessing(true);
    try {
      await previousStep();
    } catch (error) {
      console.error('Error going to previous step:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSkip = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      await skipOnboarding();
      if (onSkip) {
        onSkip();
      } else {
        // Fallback for skip, maybe redirect or show success
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentStepInfo) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Setup Complete!</h3>
          <p className="text-sm text-gray-600 mt-1">Welcome to Caren&apos;s Cookbook</p>
        </div>
      </div>
    );
  }

  if (showSuccessScreen) {
    return (
      <OnboardingSuccessScreen 
        onContinue={() => window.location.href = '/'} 
      />
    );
  }

  const renderStepContent = () => {
    
    switch (currentStepInfo.key) {
      case 'WELCOME':
        return (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">Welcome to Caren&apos;s Cookbook!</h3>
            <p className="text-gray-600">
              Let&apos;s set up your profile and preferences to personalize your cooking experience.
            </p>
          </div>
        );
      
      case 'PROFILE_SETUP':
        return (
          <ProfileSetupStep
            onComplete={(data) => {
              console.log('Profile setup data:', data);
              handleNext({ profileData: data });
            }}
            onSkip={() => handleNext({ profileSkipped: true })}
            isLoading={isProcessing}
          />
        );
      
      case 'DIETARY_PREFERENCES':
        return (
          <DietaryPreferencesStep
            onComplete={(data) => {
              console.log('Dietary preferences data:', data);
              handleNext({ dietaryData: data });
            }}
            onSkip={() => handleNext({ dietarySkipped: true })}
            isLoading={isProcessing}
          />
        );
      
      case 'COOKING_PREFERENCES':
        return (
          <CookingPreferencesStep
            onComplete={(data) => {
              console.log('Cooking preferences data:', data);
              handleNext({ cookingData: data });
            }}
            onSkip={() => handleNext({ cookingSkipped: true })}
            isLoading={isProcessing}
          />
        );
      
      case 'CATEGORY_SETUP':
        return (
          <CategorySelectionStep
            onNext={(data) => {
              console.log('Category setup data:', data);
              handleNext({ categoryData: data });
            }}
            onBack={handlePrevious}
            isLoading={isProcessing}
          />
        );
      
      case 'FIRST_RECIPE':
        return (
          <FirstRecipeFlow
            onComplete={(recipe: RecipeData) => {
              console.log('Recipe added:', recipe);
              // Automatically proceed to next step when recipe is added
              handleNext({ recipeAdded: true, recipe });
            }}
            onSkip={() => {
              // Allow users to skip adding their first recipe
              handleNext({ recipeAdded: false, skipped: true });
            }}
            userSkillLevel="BEGINNER"
            className="min-h-[600px]"
          />
        );
      
      case 'COMPLETION':
        return (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Setup Complete!</h3>
            <p className="text-gray-600">
              You&apos;re all set! Welcome to Caren&apos;s Cookbook. Let&apos;s start cooking!
            </p>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-3">
                Want to learn how to make the most of your new cookbook?
              </p>
              <RecipeBasicsTourTrigger 
                size="sm"
                className="w-full"
              >
                Take the Recipe Basics Tour
              </RecipeBasicsTourTrigger>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">{currentStepInfo.title}</h3>
            <p className="text-gray-600">{currentStepInfo.description}</p>
          </div>
        );
    }
  };

  return (
    <div className={`max-w-2xl mx-auto space-y-6 ${className}`}>
      {/* Header with Progress */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Setup</h1>
          <Badge variant="outline" className="text-xs">
            Step {currentStep + 1} of {ONBOARDING_STEPS.length}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>

      {/* Main Content - Different layout for embedded forms vs simple content */}
      {['PROFILE_SETUP', 'DIETARY_PREFERENCES', 'COOKING_PREFERENCES', 'CATEGORY_SETUP', 'FIRST_RECIPE'].includes(currentStepInfo.key) ? (
        <div className="space-y-6">
          {renderStepContent()}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStepInfo.title}
              {currentStepInfo.isOptional && (
                <Badge variant="secondary" className="text-xs">Optional</Badge>
              )}
            </CardTitle>
            {currentStepInfo.description && (
              <CardDescription>{currentStepInfo.description}</CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step Content */}
            <div className="min-h-[200px]">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex gap-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isProcessing}
                  size="sm"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {currentStepInfo.isOptional && (
                <Button
                  variant="ghost"
                  onClick={() => handleNext()}
                  disabled={isProcessing}
                  size="sm"
                >
                  Skip
                </Button>
              )}
              
              <Button
                variant="ghost"
                onClick={handleSkip}
                disabled={isProcessing}
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-1" />
                Skip Setup
              </Button>

              <Button
                onClick={() => handleNext()}
                disabled={isProcessing}
                size="sm"
              >
                {isProcessing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : isLastStep ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1" />
                )}
                {isLastStep ? 'Complete Setup' : 'Continue'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Step Indicators */}
      <div className="flex justify-center">
        <div className="flex gap-2">
          {ONBOARDING_STEPS.map((step, index) => (
            <div
              key={step.key}
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentStep
                  ? 'bg-green-500'
                  : index === currentStep
                  ? 'bg-primary'
                  : 'bg-gray-200'
              }`}
              title={step.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 