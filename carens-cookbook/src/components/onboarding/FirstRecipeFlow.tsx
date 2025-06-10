'use client';

import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Info,
  HelpCircle,
  Lightbulb,
  ThumbsUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { URLScanningPathway } from './URLScanningPathway';
import { ImageScanningPathway } from './ImageScanningPathway';
import { ManualEntryPathway } from './ManualEntryPathway';
import { PopularRecipeSelection } from './PopularRecipeSelection';

// Import our extracted modules
import { 
  FirstRecipeFlowProps,
  PATHWAY_OPTIONS,
  PathwayComponentProps
} from './first-recipe-flow/utils';
import { 
  ProgressIndicator, 
  CelebrationOverlay, 
  StepIndicators 
} from './first-recipe-flow/components';
import { useFirstRecipeFlow } from './first-recipe-flow/hooks';

export function FirstRecipeFlow({ 
  onComplete, 
  // onSkip, 
  userCategories = [], 
  // userSkillLevel = 'BEGINNER',
  className 
}: FirstRecipeFlowProps) {
  const {
    progressState,
    showTips,
    setShowTips,
    completedMilestones,
    achievements,
    showHelp,
    setShowHelp,
    isAnimating,
    flowSteps,
    updateProgress,
    handlePathwaySelect,
    handleBack,
    handleRecipeComplete,
    // trackInteraction
  } = useFirstRecipeFlow();

  // Keyboard shortcuts and accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '?') {
        setShowTips(prev => !prev);
      }
      if (event.key === 'Escape') {
        setShowTips(false);
        setShowHelp(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setShowTips, setShowHelp]);

  const renderHelpTooltip = (pathwayId: string) => {
    const pathway = PATHWAY_OPTIONS.find(p => p.id === pathwayId);
    if (!pathway || showHelp !== pathwayId) return null;

    return (
      <div className="absolute z-20 top-full left-0 right-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700 mb-2">{pathway.helpText}</p>
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600">Tips:</div>
              {pathway.tips.map((tip, index) => (
                <div key={index} className="text-xs text-gray-600 flex items-start space-x-1">
                  <span className="text-blue-500">•</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWelcomeStep = () => (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Add Your First Recipe! 🍳</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Let&apos;s get you started with your recipe collection. Choose the method that works best for you:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PATHWAY_OPTIONS.map((pathway) => {
          const Icon = pathway.icon;
          return (
            <div key={pathway.id} className="relative group">
              <Card 
                className={cn(
                  "h-full transition-all duration-300 cursor-pointer border-2",
                  "hover:border-blue-500 hover:shadow-lg hover:scale-105",
                  "group-hover:shadow-xl"
                )}
                onClick={() => handlePathwaySelect(pathway.id)}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{pathway.title}</h3>
                        {pathway.popular && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHelp(showHelp === pathway.id ? null : pathway.id);
                      }}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </div>

                  <p className="text-gray-600 mb-4 flex-grow">{pathway.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Difficulty:</span>
                      <Badge variant="outline" className="text-xs">{pathway.difficulty}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Time:</span>
                      <span className="text-gray-700 font-medium">{pathway.timeEstimate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="text-green-600 font-medium">{pathway.successRate}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      {pathway.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {renderHelpTooltip(pathway.id)}
            </div>
          );
        })}
      </div>

      {showTips && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl mx-auto">
          <div className="flex items-start space-x-3">
            <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-left">
              <h4 className="font-medium text-blue-900 mb-2">Pro Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• URL scanning works best with popular recipe websites</li>
                <li>• Photo scanning can read both printed and handwritten recipes</li>
                <li>• Manual entry gives you complete control over formatting</li>
                <li>• Popular recipes are perfect for beginners</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="text-center text-xs text-gray-400 animate-in fade-in duration-1000 delay-1000">
        Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-600">?</kbd> for tips
      </div>
    </div>
  );

  const renderPathwaySelection = () => (
    <div className="text-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Method</h2>
        <p className="text-gray-600">How would you like to add your first recipe?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {PATHWAY_OPTIONS.map((pathway) => {
          const Icon = pathway.icon;
          return (
            <Card 
              key={pathway.id}
              className="transition-all duration-200 cursor-pointer hover:border-blue-500 hover:shadow-md"
              onClick={() => handlePathwaySelect(pathway.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{pathway.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{pathway.timeEstimate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

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
        
        <div className="text-xs text-gray-400">
          Step 2 of 3
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 animate-in fade-in duration-1000 delay-1000">
        Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-600">?</kbd> for help
      </div>
    </div>
  );

  const renderProcessingStep = () => {
    if (!progressState.selectedPathway) return null;

    const pathway = PATHWAY_OPTIONS.find(p => p.id === progressState.selectedPathway);
    if (!pathway) return null;

    const pathwayProps: PathwayComponentProps = {
      onComplete: (recipe) => handleRecipeComplete(recipe, onComplete),
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

    switch (progressState.selectedPathway) {
      case 'url':
        return <URLScanningPathway {...pathwayProps} />;
      case 'image':
        return <ImageScanningPathway {...pathwayProps} />;
      case 'manual':
        return <ManualEntryPathway {...pathwayProps} />;
      case 'popular':
        return <PopularRecipeSelection {...pathwayProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn("max-w-4xl mx-auto p-6", className)}>
      <CelebrationOverlay 
        progressState={progressState} 
        achievements={achievements} 
      />

      <ProgressIndicator
        progressState={progressState}
        flowSteps={flowSteps}
        isAnimating={isAnimating}
        completedMilestones={completedMilestones}
      />

      <StepIndicators 
        flowSteps={flowSteps} 
        progressState={progressState} 
      />

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