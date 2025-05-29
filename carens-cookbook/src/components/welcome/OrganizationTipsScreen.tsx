'use client';

import React, { useState } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FolderOpen, 
  Tag, 
  Search, 
  Clock,
  ChefHat,
  Users,
  Heart,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrganizationTip {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'structure' | 'naming' | 'tagging' | 'search';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  examples: {
    before: string;
    after: string;
    explanation: string;
  };
  benefits: string[];
}

const ORGANIZATION_TIPS: OrganizationTip[] = [
  {
    id: 'folder-structure',
    title: 'Smart Folder Structure',
    description: 'Organize recipes into logical categories that match your cooking habits',
    icon: FolderOpen,
    category: 'structure',
    difficulty: 'beginner',
    examples: {
      before: 'All recipes in one big list',
      after: 'Breakfast → Quick Weekday → Pancakes & Waffles',
      explanation: 'Create a hierarchy that reflects how you actually cook and plan meals'
    },
    benefits: [
      'Find recipes faster',
      'Better meal planning',
      'Reduced decision fatigue'
    ]
  },
  {
    id: 'naming-conventions',
    title: 'Consistent Naming',
    description: 'Use clear, searchable names that include key information',
    icon: Tag,
    category: 'naming',
    difficulty: 'beginner',
    examples: {
      before: 'Mom\'s Chicken',
      after: 'Mom\'s Honey Garlic Chicken (30min, Family Favorite)',
      explanation: 'Include cooking time, difficulty, and special notes in the title'
    },
    benefits: [
      'Easier searching',
      'Quick identification',
      'Better organization'
    ]
  },
  {
    id: 'smart-tagging',
    title: 'Strategic Tagging',
    description: 'Use tags for cross-cutting concerns like dietary restrictions and occasions',
    icon: Tag,
    category: 'tagging',
    difficulty: 'intermediate',
    examples: {
      before: 'No tags or random tags',
      after: '#vegetarian #quick #date-night #gluten-free',
      explanation: 'Tags help you find recipes across different categories'
    },
    benefits: [
      'Cross-category searching',
      'Dietary filtering',
      'Occasion-based planning'
    ]
  },
  {
    id: 'search-optimization',
    title: 'Search-Friendly Content',
    description: 'Structure your recipes to be easily discoverable',
    icon: Search,
    category: 'search',
    difficulty: 'advanced',
    examples: {
      before: 'Vague ingredient lists',
      after: 'Detailed ingredients with alternatives and substitutions',
      explanation: 'Include ingredient alternatives and cooking notes for better searchability'
    },
    benefits: [
      'Find recipes by ingredients',
      'Discover substitutions',
      'Better recipe matching'
    ]
  }
];

const CATEGORY_COLORS = {
  structure: 'blue',
  naming: 'green',
  tagging: 'purple',
  search: 'orange'
};

const DIFFICULTY_BADGES = {
  beginner: { label: 'Beginner', color: 'bg-green-100 text-green-800' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-100 text-yellow-800' },
  advanced: { label: 'Advanced', color: 'bg-red-100 text-red-800' }
};

export function OrganizationTipsScreen() {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleTip = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const filteredTips = selectedCategory === 'all' 
    ? ORGANIZATION_TIPS 
    : ORGANIZATION_TIPS.filter(tip => tip.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Tips', icon: Lightbulb },
    { id: 'structure', label: 'Structure', icon: FolderOpen },
    { id: 'naming', label: 'Naming', icon: Tag },
    { id: 'tagging', label: 'Tagging', icon: Tag },
    { id: 'search', label: 'Search', icon: Search }
  ];

  return (
    <WelcomeScreen
      screenId="organization"
      title="Organization Tips"
      subtitle="Learn best practices for organizing your recipes to save time and reduce kitchen stress."
    >
      <div className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Tips Grid */}
        <div className="space-y-4">
          {filteredTips.map((tip) => {
            const Icon = tip.icon;
            const isExpanded = expandedTip === tip.id;
            const categoryColor = CATEGORY_COLORS[tip.category];
            const difficultyBadge = DIFFICULTY_BADGES[tip.difficulty];

            return (
              <Card key={tip.id} className="border-2 hover:border-blue-200 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        categoryColor === 'blue' && "bg-blue-100",
                        categoryColor === 'green' && "bg-green-100",
                        categoryColor === 'purple' && "bg-purple-100",
                        categoryColor === 'orange' && "bg-orange-100"
                      )}>
                        <Icon className={cn(
                          "h-5 w-5",
                          categoryColor === 'blue' && "text-blue-600",
                          categoryColor === 'green' && "text-green-600",
                          categoryColor === 'purple' && "text-purple-600",
                          categoryColor === 'orange' && "text-orange-600"
                        )} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={difficultyBadge.color}>
                        {difficultyBadge.label}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleTip(tip.id)}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Before/After Example */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-red-700 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>Before</span>
                          </h4>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">{tip.examples.before}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-green-700 flex items-center space-x-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>After</span>
                          </h4>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-800">{tip.examples.after}</p>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center space-x-2">
                          <Lightbulb className="h-4 w-4" />
                          <span>Why This Works</span>
                        </h4>
                        <p className="text-sm text-blue-800">{tip.examples.explanation}</p>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {tip.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Quick Start Checklist */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              <CheckCircle className="h-5 w-5" />
              <span>Quick Start Checklist</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 border-2 border-blue-400 rounded"></div>
                <span className="text-blue-800">Create 3-5 main categories that match your cooking style</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 border-2 border-blue-400 rounded"></div>
                <span className="text-blue-800">Add cooking time and difficulty to recipe titles</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 border-2 border-blue-400 rounded"></div>
                <span className="text-blue-800">Create tags for dietary restrictions and occasions</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-4 h-4 border-2 border-blue-400 rounded"></div>
                <span className="text-blue-800">Include ingredient alternatives in recipe notes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center space-y-3">
          <p className="text-gray-600">
            Ready to learn about our smart categorization system?
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
            <span>Next: Categorization Guide</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </WelcomeScreen>
  );
} 