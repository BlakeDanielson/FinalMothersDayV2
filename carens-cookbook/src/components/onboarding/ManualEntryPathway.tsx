'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ManualEntryPathwayProps } from './manual-entry-pathway/utils/types';
import { useManualEntryForm } from './manual-entry-pathway/hooks';
import {
  RecipeBasicsStep,
  IngredientsStep,
  InstructionsStep,
  RecipeDetailsStep,
  StepIndicator,
  NavigationBar
} from './manual-entry-pathway/components';
import { FORM_STEPS } from './manual-entry-pathway/data/constants';

export function ManualEntryPathway({ 
  onComplete, 
  onBack, 
  userCategories = [],
  onProgressUpdate 
}: ManualEntryPathwayProps) {
  const {
    currentStep,
    formData,
    formSteps,
    showIngredientSuggestions,
    activeIngredientIndex,
    fileInputRef,
    setFormData,
    setShowIngredientSuggestions,
    setActiveIngredientIndex,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    addStep,
    removeStep,
    handleImageUpload,
    nextStep,
    prevStep,
    handleComplete,
    currentStepData,
    isValid,
    isLastStep
  } = useManualEntryForm({
    onComplete,
    onBack,
    userCategories,
    onProgressUpdate
  });

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Recipe Basics
        return (
          <RecipeBasicsStep
            formData={formData}
            setFormData={setFormData}
            onImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
          />
        );

      case 1: // Ingredients
        return (
          <IngredientsStep
            formData={formData}
            handleIngredientChange={handleIngredientChange}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            activeIngredientIndex={activeIngredientIndex}
            setActiveIngredientIndex={setActiveIngredientIndex}
            showIngredientSuggestions={showIngredientSuggestions}
            setShowIngredientSuggestions={setShowIngredientSuggestions}
          />
        );

      case 2: // Instructions
        return (
          <InstructionsStep
            formData={formData}
            setFormData={setFormData}
            addStep={addStep}
            removeStep={removeStep}
          />
        );

      case 3: // Details
        return (
          <RecipeDetailsStep
            formData={formData}
            setFormData={setFormData}
            userCategories={userCategories}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Create Your Recipe</h2>
          <Badge variant="outline" className="text-sm">
            Step {currentStep + 1} of {FORM_STEPS.length}
          </Badge>
        </div>

        {/* Step indicators */}
        <StepIndicator formSteps={formSteps} currentStep={currentStep} />
      </div>

      {/* Main content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <NavigationBar
        currentStep={currentStep}
        currentStepData={currentStepData}
        isValid={isValid}
        isLastStep={isLastStep}
        onBack={onBack}
        onPrevStep={prevStep}
        onNextStep={nextStep}
        onComplete={handleComplete}
      />
    </div>
  );
} 