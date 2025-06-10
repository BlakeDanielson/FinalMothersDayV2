'use client';

import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlowStep, ProgressState } from '../utils';

interface StepIndicatorsProps {
  flowSteps: FlowStep[];
  progressState: ProgressState;
}

export function StepIndicators({ flowSteps, progressState }: StepIndicatorsProps) {
  return (
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
  );
} 