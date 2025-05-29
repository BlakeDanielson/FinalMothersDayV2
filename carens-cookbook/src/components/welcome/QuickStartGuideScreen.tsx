'use client';

import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './WelcomeScreen';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle,
  Circle,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Camera,
  Search,
  Settings,
  Star,
  Users,
  Zap,
  Target,
  Trophy
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStartTask {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  category: 'setup' | 'content' | 'explore';
  actionUrl?: string;
  actionLabel?: string;
  tips: string[];
  completed: boolean;
}

const QUICK_START_TASKS: QuickStartTask[] = [
  {
    id: 'add-first-recipe',
    title: 'Add Your First Recipe',
    description: 'Start building your collection by adding a recipe you love',
    icon: BookOpen,
    estimatedTime: '2-3 minutes',
    difficulty: 'easy',
    category: 'content',
    actionUrl: '/onboarding',
    actionLabel: 'Add Recipe',
    tips: [
      'Try scanning a recipe from a website URL first',
      'Use the image scanner for cookbook recipes',
      'Don\'t worry about perfection - you can edit later'
    ],
    completed: false
  },
  {
    id: 'organize-categories',
    title: 'Set Up Your Categories',
    description: 'Create categories that match your cooking style',
    icon: Settings,
    estimatedTime: '3-5 minutes',
    difficulty: 'easy',
    category: 'setup',
    actionUrl: '/categories',
    actionLabel: 'Manage Categories',
    tips: [
      'Start with 3-5 main categories',
      'Think about how you plan meals',
      'You can always add more later'
    ],
    completed: false
  },
  {
    id: 'explore-search',
    title: 'Try the Search Features',
    description: 'Learn how to quickly find recipes in your collection',
    icon: Search,
    estimatedTime: '2 minutes',
    difficulty: 'easy',
    category: 'explore',
    actionUrl: '/recipes',
    actionLabel: 'Search Recipes',
    tips: [
      'Search by ingredient, cuisine, or recipe name',
      'Use filters to narrow down results',
      'Save frequently used searches'
    ],
    completed: false
  },
  {
    id: 'scan-multiple-recipes',
    title: 'Add 3-5 More Recipes',
    description: 'Build a solid foundation for your recipe collection',
    icon: Camera,
    estimatedTime: '10-15 minutes',
    difficulty: 'medium',
    category: 'content',
    actionUrl: '/recipes/add',
    actionLabel: 'Add More Recipes',
    tips: [
      'Mix different types: breakfast, lunch, dinner',
      'Include some quick weeknight meals',
      'Add a few special occasion recipes'
    ],
    completed: false
  },
  {
    id: 'mark-favorites',
    title: 'Mark Your Favorites',
    description: 'Highlight recipes you cook most often',
    icon: Star,
    estimatedTime: '1-2 minutes',
    difficulty: 'easy',
    category: 'explore',
    tips: [
      'Star recipes you make regularly',
      'Favorites appear at the top of searches',
      'Great for quick meal planning'
    ],
    completed: false
  },
  {
    id: 'invite-family',
    title: 'Share with Family (Optional)',
    description: 'Invite family members to view and contribute recipes',
    icon: Users,
    estimatedTime: '3-5 minutes',
    difficulty: 'medium',
    category: 'explore',
    actionUrl: '/settings/sharing',
    actionLabel: 'Sharing Settings',
    tips: [
      'Family members can view your recipes',
      'They can also add their own favorites',
      'Perfect for collaborative meal planning'
    ],
    completed: false
  }
];

const CATEGORY_COLORS = {
  setup: 'blue',
  content: 'green',
  explore: 'purple'
};

const DIFFICULTY_COLORS = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
};

export function QuickStartGuideScreen() {
  const [tasks, setTasks] = useState<QuickStartTask[]>(QUICK_START_TASKS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load completed tasks from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('carens-cookbook-quickstart-progress');
    if (savedProgress) {
      try {
        const completedTaskIds = JSON.parse(savedProgress);
        setTasks(prevTasks => 
          prevTasks.map(task => ({
            ...task,
            completed: completedTaskIds.includes(task.id)
          }))
        );
      } catch (error) {
        console.warn('Failed to load quick start progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (updatedTasks: QuickStartTask[]) => {
    const completedTaskIds = updatedTasks.filter(task => task.completed).map(task => task.id);
    localStorage.setItem('carens-cookbook-quickstart-progress', JSON.stringify(completedTaskIds));
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveProgress(updatedTasks);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Tasks', count: totalTasks },
    { id: 'setup', label: 'Setup', count: tasks.filter(t => t.category === 'setup').length },
    { id: 'content', label: 'Content', count: tasks.filter(t => t.category === 'content').length },
    { id: 'explore', label: 'Explore', count: tasks.filter(t => t.category === 'explore').length }
  ];

  return (
    <WelcomeScreen
      screenId="quickstart"
      title="Quick Start Guide"
      subtitle="Complete these essential tasks to get the most out of Caren's Cookbook."
    >
      <div className="space-y-6">
        {/* Progress Overview */}
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-blue-900">Your Progress</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {completedTasks} of {totalTasks} completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-800">Overall Progress</span>
                <span className="text-blue-600 font-medium">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              
              {progressPercentage === 100 && (
                <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-100 rounded-lg p-3 mt-4">
                  <Trophy className="h-4 w-4" />
                  <span className="font-medium">Congratulations! You've completed the quick start guide!</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;
            
            return (
              <Button
                key={category.id}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const Icon = task.icon;
            const categoryColor = CATEGORY_COLORS[task.category];
            const difficultyColor = DIFFICULTY_COLORS[task.difficulty];

            return (
              <Card 
                key={task.id} 
                className={cn(
                  "border-2 transition-all duration-200",
                  task.completed 
                    ? "border-green-200 bg-green-50" 
                    : "border-gray-200 hover:border-blue-200"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className="mt-1 transition-colors"
                      >
                        {task.completed ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400 hover:text-blue-500" />
                        )}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={cn(
                            "p-2 rounded-lg",
                            categoryColor === 'blue' && "bg-blue-100",
                            categoryColor === 'green' && "bg-green-100",
                            categoryColor === 'purple' && "bg-purple-100"
                          )}>
                            <Icon className={cn(
                              "h-4 w-4",
                              categoryColor === 'blue' && "text-blue-600",
                              categoryColor === 'green' && "text-green-600",
                              categoryColor === 'purple' && "text-purple-600"
                            )} />
                          </div>
                          <CardTitle className={cn(
                            "text-lg",
                            task.completed && "line-through text-gray-500"
                          )}>
                            {task.title}
                          </CardTitle>
                        </div>
                        
                        <p className={cn(
                          "text-gray-600 mb-3",
                          task.completed && "text-gray-400"
                        )}>
                          {task.description}
                        </p>

                        <div className="flex items-center space-x-3 text-sm">
                          <Badge className={difficultyColor}>
                            {task.difficulty}
                          </Badge>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Zap className="h-3 w-3" />
                            <span>{task.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {task.actionUrl && (
                      <Button
                        variant={task.completed ? "outline" : "default"}
                        size="sm"
                        className="ml-4"
                        asChild
                      >
                        <a href={task.actionUrl} target="_blank" rel="noopener noreferrer">
                          {task.actionLabel || 'Go'}
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>

                {!task.completed && task.tips.length > 0 && (
                  <CardContent className="pt-0">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <h4 className="font-medium text-yellow-900 mb-2 text-sm">💡 Tips for Success</h4>
                      <ul className="space-y-1">
                        {task.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-yellow-800 flex items-start space-x-2">
                            <span className="text-yellow-600 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Completion Celebration */}
        {progressPercentage === 100 && (
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-6 text-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Trophy className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    🎉 You're All Set!
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You've completed the quick start guide and you're ready to make the most of Caren's Cookbook!
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="font-medium text-gray-900">What's Next?</div>
                    <div className="text-gray-600">Keep adding recipes and exploring features</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="font-medium text-gray-900">Need Help?</div>
                    <div className="text-gray-600">Check out our help center or contact support</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="font-medium text-gray-900">Share the Love</div>
                    <div className="text-gray-600">Invite family and friends to join</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <div className="text-center space-y-3">
          <p className="text-gray-600">
            Ready to start cooking with confidence?
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
            <span>Let's get started!</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </WelcomeScreen>
  );
} 