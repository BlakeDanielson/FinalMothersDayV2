'use client';

import React, { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Utensils,
  Coffee,
  Cake,
  Apple
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryExample {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  examples: string[];
  tips: string[];
  whenToUse: string;
}

interface DecisionNode {
  id: string;
  question?: string;
  type: 'question' | 'result';
  options?: {
    label: string;
    nextId: string;
  }[];
  result?: {
    category: string;
    explanation: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  };
}

const CATEGORY_EXAMPLES: CategoryExample[] = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    description: 'Morning meals and early day recipes',
    icon: Coffee,
    color: 'orange',
    examples: ['Pancakes', 'Smoothie Bowls', 'Overnight Oats', 'Breakfast Burritos'],
    tips: ['Include prep time for busy mornings', 'Tag make-ahead options', 'Note serving sizes'],
    whenToUse: 'For any recipe typically eaten in the morning or as a first meal'
  },
  {
    id: 'dinner',
    name: 'Dinner',
    description: 'Main evening meals and hearty dishes',
    icon: Utensils,
    color: 'blue',
    examples: ['Pasta Dishes', 'Roasted Chicken', 'Stir-fries', 'Casseroles'],
    tips: ['Include total cook time', 'Note if it feeds a family', 'Tag one-pot meals'],
    whenToUse: 'For substantial meals typically served in the evening'
  },
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Quick bites and light refreshments',
    icon: Apple,
    color: 'green',
    examples: ['Energy Balls', 'Veggie Chips', 'Dips', 'Trail Mix'],
    tips: ['Perfect for portion control', 'Great for meal prep', 'Tag healthy options'],
    whenToUse: 'For small portions eaten between meals or as light refreshments'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Sweet treats and special occasion sweets',
    icon: Cake,
    color: 'pink',
    examples: ['Chocolate Cake', 'Ice Cream', 'Cookies', 'Fruit Tarts'],
    tips: ['Note special occasions', 'Include difficulty level', 'Tag dietary alternatives'],
    whenToUse: 'For sweet dishes typically served after meals or for celebrations'
  }
];

const DECISION_TREE: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    type: 'question',
    question: 'When do you typically eat this recipe?',
    options: [
      { label: 'Morning/Early Day', nextId: 'morning' },
      { label: 'Midday', nextId: 'midday' },
      { label: 'Evening', nextId: 'evening' },
      { label: 'Anytime/Snacking', nextId: 'anytime' }
    ]
  },
  morning: {
    id: 'morning',
    type: 'question',
    question: 'Is this a substantial meal or something light?',
    options: [
      { label: 'Substantial meal', nextId: 'breakfast' },
      { label: 'Light/Quick', nextId: 'snacks' }
    ]
  },
  midday: {
    id: 'midday',
    type: 'question',
    question: 'How filling is this recipe?',
    options: [
      { label: 'Full meal', nextId: 'lunch' },
      { label: 'Light bite', nextId: 'snacks' }
    ]
  },
  evening: {
    id: 'evening',
    type: 'question',
    question: 'Is this the main course or something sweet?',
    options: [
      { label: 'Main course', nextId: 'dinner' },
      { label: 'Sweet/Dessert', nextId: 'desserts' }
    ]
  },
  anytime: {
    id: 'anytime',
    type: 'question',
    question: 'What&apos;s the primary purpose?',
    options: [
      { label: 'Quick energy/snack', nextId: 'snacks' },
      { label: 'Sweet treat', nextId: 'desserts' }
    ]
  },
  breakfast: {
    id: 'breakfast',
    type: 'result',
    result: {
      category: 'Breakfast',
      explanation: 'Perfect for morning meals that provide energy to start the day',
      icon: Coffee,
      color: 'orange'
    }
  },
  lunch: {
    id: 'lunch',
    type: 'result',
    result: {
      category: 'Lunch',
      explanation: 'Great for midday meals that are satisfying but not too heavy',
      icon: Utensils,
      color: 'green'
    }
  },
  dinner: {
    id: 'dinner',
    type: 'result',
    result: {
      category: 'Dinner',
      explanation: 'Ideal for hearty evening meals that bring people together',
      icon: Utensils,
      color: 'blue'
    }
  },
  snacks: {
    id: 'snacks',
    type: 'result',
    result: {
      category: 'Snacks',
      explanation: 'Perfect for quick bites, energy boosts, or light refreshments',
      icon: Apple,
      color: 'green'
    }
  },
  desserts: {
    id: 'desserts',
    type: 'result',
    result: {
      category: 'Desserts',
      explanation: 'Great for sweet treats, celebrations, or ending meals on a high note',
      icon: Cake,
      color: 'pink'
    }
  }
};

export function CategorizationGuideScreen() {
  const [selectedExample, setSelectedExample] = useState<string>('breakfast');
  const [currentDecisionNode, setCurrentDecisionNode] = useState<string>('start');

  const handleDecisionChoice = (nextId: string) => {
    setCurrentDecisionNode(nextId);
  };

  const resetDecisionTree = () => {
    setCurrentDecisionNode('start');
  };

  const currentNode = DECISION_TREE[currentDecisionNode];
  const selectedExampleData = CATEGORY_EXAMPLES.find(ex => ex.id === selectedExample);

  return (
    <WelcomeScreen
      screenId="categorization"
      title="Categorization Guide"
      subtitle="Learn how our smart categorization system works and discover the best ways to organize your recipes."
    >
      <div className="space-y-8">
        {/* Category Examples */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Popular Recipe Categories
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {CATEGORY_EXAMPLES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedExample === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "h-auto p-4 flex flex-col items-center space-y-2",
                    isSelected && "ring-2 ring-blue-500 ring-opacity-50"
                  )}
                  onClick={() => setSelectedExample(category.id)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{category.name}</span>
                </Button>
              );
            })}
          </div>

          {selectedExampleData && (
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedExampleData.color === 'orange' && "bg-orange-100",
                    selectedExampleData.color === 'blue' && "bg-blue-100",
                    selectedExampleData.color === 'green' && "bg-green-100",
                    selectedExampleData.color === 'pink' && "bg-pink-100"
                  )}>
                    <selectedExampleData.icon className={cn(
                      "h-5 w-5",
                      selectedExampleData.color === 'orange' && "text-orange-600",
                      selectedExampleData.color === 'blue' && "text-blue-600",
                      selectedExampleData.color === 'green' && "text-green-600",
                      selectedExampleData.color === 'pink' && "text-pink-600"
                    )} />
                  </div>
                  <span>{selectedExampleData.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{selectedExampleData.description}</p>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Example Recipes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExampleData.examples.map((example, index) => (
                      <Badge key={index} variant="secondary">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Organization Tips</h4>
                  <ul className="space-y-1">
                    {selectedExampleData.tips.map((tip, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="font-medium text-blue-900 mb-1 flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4" />
                    <span>When to Use</span>
                  </h4>
                  <p className="text-sm text-blue-800">{selectedExampleData.whenToUse}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Decision Tree */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Category Decision Helper
          </h3>
          
          <Card className="border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Find the Right Category</span>
                <Button variant="outline" size="sm" onClick={resetDecisionTree}>
                  Start Over
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentNode.type === 'question' ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      {currentNode.question}
                    </h4>
                  </div>
                  
                  <div className="grid gap-3">
                    {currentNode.options?.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="p-4 h-auto justify-between hover:bg-purple-50"
                        onClick={() => handleDecisionChoice(option.nextId)}
                      >
                        <span>{option.label}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <div className={cn(
                      "p-4 rounded-full",
                      currentNode.result?.color === 'orange' && "bg-orange-100",
                      currentNode.result?.color === 'blue' && "bg-blue-100",
                      currentNode.result?.color === 'green' && "bg-green-100",
                      currentNode.result?.color === 'pink' && "bg-pink-100"
                    )}>
                      {currentNode.result?.icon && (
                        <currentNode.result.icon className={cn(
                          "h-8 w-8",
                          currentNode.result.color === 'orange' && "text-orange-600",
                          currentNode.result.color === 'blue' && "text-blue-600",
                          currentNode.result.color === 'green' && "text-green-600",
                          currentNode.result.color === 'pink' && "text-pink-600"
                        )} />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {currentNode.result?.category}
                    </h4>
                    <p className="text-gray-600">
                      {currentNode.result?.explanation}
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-green-700 font-medium">
                      Perfect match found!
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Best Practices */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-900">
              <Lightbulb className="h-5 w-5" />
              <span>Categorization Best Practices</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-green-900">Do:</h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Use categories that match your cooking habits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Keep category names simple and clear</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Use tags for dietary restrictions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>Create subcategories for large collections</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-green-900">Avoid:</h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Too many similar categories</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Overly specific category names</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Categories you&apos;ll rarely use</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Inconsistent naming patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-3">
          <p className="text-gray-600">
            Ready to put these tips into practice?
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
            <span>Next: Quick Start Guide</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </WelcomeScreen>
  );
} 