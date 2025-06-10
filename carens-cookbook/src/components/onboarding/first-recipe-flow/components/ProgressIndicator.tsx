'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProgressState, FlowStep, PROGRESS_MILESTONES } from '../utils';

interface ProgressIndicatorProps {
  progressState: ProgressState;
  flowSteps: FlowStep[];
  isAnimating: boolean;
  completedMilestones: string[];
}

export function ProgressIndicator({
  progressState,
  flowSteps,
  isAnimating,
  completedMilestones
}: ProgressIndicatorProps) {
  return (
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
          {PROGRESS_MILESTONES.map((milestone) => (
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
  );
} 