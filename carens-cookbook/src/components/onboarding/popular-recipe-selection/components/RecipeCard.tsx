import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock,
  Users,
  ChefHat,
  Star,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RecipeCardProps } from '../utils/types';
import { DIFFICULTY_COLORS } from '../data/recipes';

export function RecipeCard({ recipe, isSelected, onSelect }: RecipeCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        "border-2 hover:border-blue-300",
        isSelected && "ring-2 ring-blue-500 border-blue-500"
      )}
      onClick={() => onSelect(recipe)}
    >
      <div className="relative">
        <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
          <ChefHat className="h-12 w-12 text-gray-400" />
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <Badge className={cn("text-xs", DIFFICULTY_COLORS[recipe.difficulty])}>
            {recipe.difficulty}
          </Badge>
          <Badge variant="secondary" className="text-xs bg-white/90">
            <Star className="h-3 w-3 mr-1 text-yellow-500" />
            {recipe.rating}
          </Badge>
        </div>
        {recipe.popularity > 90 && (
          <div className="absolute top-2 left-2">
            <Badge className="text-xs bg-orange-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-1">{recipe.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{recipe.description}</p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {recipe.prepTime}
              </div>
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {recipe.servings}
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {recipe.isVegetarian && (
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  Vegetarian
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 