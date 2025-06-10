import { useState, useCallback, useEffect, useRef } from 'react';
import { ManualEntryPathwayProps, RecipeFormData } from '../utils/types';
import { FORM_STEPS } from '../data/constants';
import { RecipeData } from '../../first-recipe-flow/utils/types';

export function useManualEntryForm({
  onComplete,
  userCategories = [],
  onProgressUpdate
}: ManualEntryPathwayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    prepTime: '',
    servings: '',
    difficulty: '',
    cuisine: '',
    category: '',
    tags: [],
    image: null
  });
  
  const [formSteps, setFormSteps] = useState(FORM_STEPS);
  const [showIngredientSuggestions, setShowIngredientSuggestions] = useState(false);
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate progress based on completed steps and form completion
  const calculateProgress = useCallback(() => {
    const stepProgress = (currentStep / (FORM_STEPS.length - 1)) * 70; // 70% for step progression
    
    // Additional progress for form completion
    let completionProgress = 0;
    if (formData.title.trim()) completionProgress += 5;
    if (formData.ingredients.some(ing => ing.trim())) completionProgress += 10;
    if (formData.steps.some(step => step.trim())) completionProgress += 10;
    if (formData.description.trim()) completionProgress += 3;
    if (formData.prepTime.trim()) completionProgress += 2;
    
    return Math.min(stepProgress + completionProgress, 100);
  }, [currentStep, formData]);

  // Update progress when form changes
  useEffect(() => {
    const progress = calculateProgress();
    onProgressUpdate?.(progress);
  }, [calculateProgress, onProgressUpdate]);

  // Update form steps completion status
  useEffect(() => {
    setFormSteps(prev => prev.map((step, index) => ({
      ...step,
      completed: index < currentStep || (
        index === 0 && formData.title.trim() !== '' ||
        index === 1 && formData.ingredients.some(ing => ing.trim() !== '') ||
        index === 2 && formData.steps.some(s => s.trim() !== '') ||
        index === 3 && (formData.prepTime.trim() !== '' || formData.servings.trim() !== '')
      )
    })));
  }, [currentStep, formData]);

  // Handle ingredient changes with smart suggestions
  const handleIngredientChange = useCallback((index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    
    // Show suggestions if typing
    if (value.length > 2) {
      setActiveIngredientIndex(index);
      setShowIngredientSuggestions(true);
    } else {
      setShowIngredientSuggestions(false);
    }
  }, [formData.ingredients]);

  // Add new ingredient field
  const addIngredient = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  }, []);

  // Remove ingredient field
  const removeIngredient = useCallback((index: number) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, ingredients: newIngredients }));
    }
  }, [formData.ingredients]);

  // Add new instruction step
  const addStep = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }));
  }, []);

  // Remove instruction step
  const removeStep = useCallback((index: number) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, steps: newSteps }));
    }
  }, [formData.steps]);

  // Handle image upload
  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  }, []);

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    switch (currentStep) {
      case 0: // Basics
        return formData.title.trim() !== '';
      case 1: // Ingredients
        return formData.ingredients.some(ing => ing.trim() !== '');
      case 2: // Instructions
        return formData.steps.some(step => step.trim() !== '');
      case 3: // Details
        return true; // Optional step
      default:
        return true;
    }
  }, [currentStep, formData]);

  // Navigate to next step
  const nextStep = useCallback(() => {
    if (validateCurrentStep() && currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, validateCurrentStep]);

  // Navigate to previous step
  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  // Complete recipe creation
  const handleComplete = useCallback(() => {
    if (!validateCurrentStep()) return;

    const recipe: RecipeData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      ingredients: formData.ingredients.filter(ing => ing.trim() !== ''),
      steps: formData.steps.filter(step => step.trim() !== ''),
      prepTime: formData.prepTime.trim(),
      cuisine: formData.cuisine.trim(),
      category: formData.category.trim() || userCategories[0] || 'Uncategorized'
    };

    onComplete(recipe);
  }, [formData, validateCurrentStep, onComplete, userCategories]);

  return {
    // State
    currentStep,
    formData,
    formSteps,
    showIngredientSuggestions,
    activeIngredientIndex,
    fileInputRef,
    
    // Setters
    setFormData,
    setShowIngredientSuggestions,
    setActiveIngredientIndex,
    
    // Actions
    handleIngredientChange,
    addIngredient,
    removeIngredient,
    addStep,
    removeStep,
    handleImageUpload,
    nextStep,
    prevStep,
    handleComplete,
    
    // Validation
    validateCurrentStep,
    
    // Computed values
    currentStepData: FORM_STEPS[currentStep],
    isValid: validateCurrentStep(),
    isLastStep: currentStep === FORM_STEPS.length - 1
  };
} 