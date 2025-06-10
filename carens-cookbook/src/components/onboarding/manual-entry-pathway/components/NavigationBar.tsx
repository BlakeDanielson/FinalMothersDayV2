import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { NavigationBarProps } from '../utils/types';

export function NavigationBar({
  currentStep,
  currentStepData,
  isValid,
  isLastStep,
  onBack,
  onPrevStep,
  onNextStep,
  onComplete
}: NavigationBarProps) {
  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onBack : onPrevStep}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentStep === 0 ? 'Back to Methods' : 'Previous'}
        </Button>

        <div className="flex items-center space-x-2">
          {!isValid && currentStepData.required && (
            <div className="flex items-center text-sm text-amber-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              Required fields missing
            </div>
          )}
          
          {isLastStep ? (
            <Button
              onClick={onComplete}
              disabled={!isValid}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Recipe
            </Button>
          ) : (
            <Button
              onClick={onNextStep}
              disabled={!isValid && currentStepData.required}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Help text */}
      <div className="text-center text-sm text-gray-500">
        {isLastStep 
          ? "Review your recipe and click 'Create Recipe' when ready"
          : `Complete the ${currentStepData.required ? 'required' : 'optional'} fields to continue`
        }
      </div>
    </div>
  );
} 