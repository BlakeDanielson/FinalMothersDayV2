import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  CheckCircle,
  Edit3,
  Sparkles,
  Utensils,
  Timer,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecipeDetailsViewProps } from '../utils/types';
import { DIFFICULTY_COLORS } from '../data/recipes';

export function RecipeDetailsView({ 
  recipe, 
  onBack, 
  onCustomize, 
  onComplete 
}: RecipeDetailsViewProps) {
  return (
    <div className="space-y-6">
      {/* Recipe Details */}
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
              <p className="text-gray-600 mt-2">{recipe.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-gray-500">Prep Time</p>
                <p className="font-medium">{recipe.prepTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-gray-500">Cook Time</p>
                <p className="font-medium">{recipe.cookTime}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-gray-500">Servings</p>
                <p className="font-medium">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4" />
              <div>
                <p className="text-gray-500">Difficulty</p>
                <Badge className={cn("text-xs", DIFFICULTY_COLORS[recipe.difficulty])}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-sm">
              <Star className="h-3 w-3 mr-1 text-yellow-500" />
              {recipe.rating}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {recipe.cuisine}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Ingredients */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Utensils className="h-4 w-4 mr-2" />
              Ingredients ({recipe.ingredients.length})
            </h4>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Instructions ({recipe.steps.length} steps)
            </h4>
            <ol className="space-y-3">
              {recipe.steps.map((step, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Pro Tips
              </h4>
              <ul className="space-y-1">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-blue-700">• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recipes
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={onCustomize}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Customize
          </Button>
          <Button
            onClick={onComplete}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Add Recipe
          </Button>
        </div>
      </div>
    </div>
  );
} 