import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Target, Lightbulb, Plus, Minus, GripVertical } from 'lucide-react';
import { InstructionsStepProps } from '../utils/types';

export function InstructionsStep({
  formData,
  setFormData,
  addStep,
  removeStep
}: InstructionsStepProps) {
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
} 