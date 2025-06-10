import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StepIndicatorProps } from '../utils/types';

export function StepIndicator({ formSteps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center space-x-2">
      {formSteps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
              index < currentStep || step.completed
                ? "bg-green-500 text-white"
                : index === currentStep
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            )}>
              {index < currentStep || step.completed ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <div className="mt-1 text-xs text-center max-w-16">
              <div className={cn(
                "font-medium",
                index <= currentStep ? "text-gray-900" : "text-gray-500"
              )}>
                {step.title}
              </div>
            </div>
          </div>
          {index < formSteps.length - 1 && (
            <div className={cn(
              "flex-1 h-1 rounded-full transition-colors",
              index < currentStep ? "bg-green-500" : "bg-gray-200"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
} 