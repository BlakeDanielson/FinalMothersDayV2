'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight,
  Plus,
  Minus,
  GripVertical,
  Upload,
  Camera,
  ChefHat,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BookOpen,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecipeData } from './FirstRecipeFlow';

interface ManualEntryPathwayProps {
  onComplete: (recipe: RecipeData) => void;
  onBack: () => void;
  userCategories?: string[];
  onProgressUpdate?: (progress: number) => void;
}

interface FormStep {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
}

interface RecipeFormData {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | '';
  cuisine: string;
  category: string;
  tags: string[];
  image?: File | null;
}

const FORM_STEPS: FormStep[] = [
  {
    id: 'basics',
    title: 'Recipe Basics',
    description: 'Name and description',
    required: true,
    completed: false
  },
  {
    id: 'ingredients',
    title: 'Ingredients',
    description: 'What you need',
    required: true,
    completed: false
  },
  {
    id: 'instructions',
    title: 'Instructions',
    description: 'How to make it',
    required: true,
    completed: false
  },
  {
    id: 'details',
    title: 'Details',
    description: 'Time, servings, etc.',
    required: false,
    completed: false
  }
];

const DIFFICULTY_OPTIONS = [
  { value: 'Easy', label: 'Easy', description: 'Simple ingredients, basic techniques' },
  { value: 'Medium', label: 'Medium', description: 'Some cooking experience helpful' },
  { value: 'Hard', label: 'Hard', description: 'Advanced techniques required' }
];

const CUISINE_SUGGESTIONS = [
  'American', 'Italian', 'Mexican', 'Chinese', 'Indian', 'French', 'Japanese', 
  'Thai', 'Mediterranean', 'Greek', 'Spanish', 'Korean', 'Vietnamese', 'Other'
];

const COMMON_INGREDIENTS = [
  'salt', 'pepper', 'olive oil', 'butter', 'garlic', 'onion', 'flour', 'sugar',
  'eggs', 'milk', 'cheese', 'chicken', 'beef', 'tomatoes', 'lemon', 'herbs'
];

export function ManualEntryPathway({ 
  onComplete, 
  onBack, 
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

  // Render ingredient suggestions
  const renderIngredientSuggestions = () => {
    if (!showIngredientSuggestions || activeIngredientIndex === -1) return null;

    const currentInput = formData.ingredients[activeIngredientIndex]?.toLowerCase() || '';
    const suggestions = COMMON_INGREDIENTS.filter(ing => 
      ing.toLowerCase().includes(currentInput) && 
      ing.toLowerCase() !== currentInput
    ).slice(0, 5);

    if (suggestions.length === 0) return null;

    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0"
            onClick={() => {
              handleIngredientChange(activeIngredientIndex, suggestion);
              setShowIngredientSuggestions(false);
            }}
          >
            {suggestion}
          </button>
        ))}
      </div>
    );
  };

  // Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Recipe Basics
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <ChefHat className="h-8 w-8 text-blue-600 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">Let&apos;s start with the basics</h3>
              <p className="text-gray-600">Give your recipe a name and description</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Name *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Mom's Famous Chocolate Chip Cookies"
                  className="text-lg"
                  autoFocus
                />
                {formData.title.trim() && (
                  <div className="mt-1 flex items-center text-sm text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Great title!
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optional)
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="A brief description of your recipe..."
                  rows={3}
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Photo (optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {formData.image ? (
                    <div className="space-y-2">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                      <p className="text-sm text-gray-600">Image uploaded: {formData.image.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">Click to upload a photo</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Choose Photo
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Ingredients
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <BookOpen className="h-8 w-8 text-green-600 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">What ingredients do you need?</h3>
              <p className="text-gray-600">List all the ingredients with amounts</p>
            </div>

            <div className="space-y-3">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder={index === 0 ? "e.g., 2 cups all-purpose flour" : "Add another ingredient..."}
                        onFocus={() => setActiveIngredientIndex(index)}
                        onBlur={() => {
                          setTimeout(() => setShowIngredientSuggestions(false), 200);
                        }}
                      />
                      {index === activeIngredientIndex && renderIngredientSuggestions()}
                    </div>
                    {formData.ingredients.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={addIngredient}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </div>

            {/* Tips for ingredients */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Pro Tips</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Include amounts (2 cups, 1 tbsp, etc.)</li>
                    <li>• Be specific (all-purpose flour vs. flour)</li>
                    <li>• List ingredients in order of use</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Instructions
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Target className="h-8 w-8 text-purple-600 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">How do you make it?</h3>
              <p className="text-gray-600">Break down the cooking process into clear steps</p>
            </div>

            <div className="space-y-3">
              {formData.steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-600 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Textarea
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...formData.steps];
                          newSteps[index] = e.target.value;
                          setFormData(prev => ({ ...prev, steps: newSteps }));
                        }}
                        placeholder={index === 0 ? "e.g., Preheat oven to 350°F and line baking sheet with parchment paper" : "Describe the next step..."}
                        rows={2}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      {formData.steps.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-move text-gray-400 hover:text-gray-600"
                      >
                        <GripVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button
                variant="outline"
                onClick={addStep}
                className="w-full border-dashed"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>

            {/* Tips for instructions */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">Writing Great Instructions</h4>
                  <ul className="text-sm text-purple-700 mt-1 space-y-1">
                    <li>• Start each step with an action word</li>
                    <li>• Include temperatures and times</li>
                    <li>• Mention visual cues (golden brown, bubbling, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Details
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Sparkles className="h-8 w-8 text-orange-600 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-900">Final details</h3>
              <p className="text-gray-600">Add helpful information for cooking</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prep Time
                </label>
                <Input
                  value={formData.prepTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, prepTime: e.target.value }))}
                  placeholder="e.g., 15 minutes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servings
                </label>
                <Input
                  value={formData.servings}
                  onChange={(e) => setFormData(prev => ({ ...prev, servings: e.target.value }))}
                  placeholder="e.g., 4 people"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData(prev => ({ ...prev, difficulty: option.value as 'Easy' | 'Medium' | 'Hard' }))}
                    className={cn(
                      "p-3 border rounded-lg text-center transition-colors",
                      formData.difficulty === option.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuisine Type
              </label>
              <div className="relative">
                <Input
                  value={formData.cuisine}
                  onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
                  placeholder="e.g., Italian, Mexican, American..."
                  list="cuisine-suggestions"
                />
                <datalist id="cuisine-suggestions">
                  {CUISINE_SUGGESTIONS.map((cuisine) => (
                    <option key={cuisine} value={cuisine} />
                  ))}
                </datalist>
              </div>
            </div>

            {userCategories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {userCategories.slice(0, 6).map((category) => (
                    <button
                      key={category}
                      onClick={() => setFormData(prev => ({ ...prev, category }))}
                      className={cn(
                        "p-2 border rounded-lg text-sm transition-colors",
                        formData.category === category
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const currentStepData = FORM_STEPS[currentStep];
  const isValid = validateCurrentStep();
  const isLastStep = currentStep === FORM_STEPS.length - 1;

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
      </div>

      {/* Main content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={currentStep === 0 ? onBack : prevStep}
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
              onClick={handleComplete}
              disabled={!isValid}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Create Recipe
            </Button>
          ) : (
            <Button
              onClick={nextStep}
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