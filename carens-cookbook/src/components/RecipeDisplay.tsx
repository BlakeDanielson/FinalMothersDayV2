"use client";

import React, { useState, useEffect } from "react";
import { Clock, Users, Utensils, ChefHat, Heart, Printer, Share2, ImageOff, CheckSquare, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Simplified props to match our API structure
export interface RecipeData {
  title: string;
  ingredients: string[];
  steps: string[];
  image?: string | null;
  cuisine?: string;
  category?: string;
  prepTime?: string;
  cleanupTime?: string; // We can call this Cook Time or similar
  description?: string; // Optional description from AI
}

interface RecipeDisplayProps {
  recipe: RecipeData;
  onSave?: (recipeData: RecipeData) => void;
  onPrint?: () => void;
  onShare?: () => void;
}

interface DisplayIngredient {
  id: string;
  text: string;
  checked: boolean;
}

const RecipeDisplay = ({
  recipe,
  onSave,
  onPrint,
  onShare,
}: RecipeDisplayProps) => {
  const [displayIngredients, setDisplayIngredients] = useState<DisplayIngredient[]>([]);

  useEffect(() => {
    setDisplayIngredients(
      (recipe.ingredients || []).map((ing, index) => ({
        id: `ing-${index}-${Date.now()}`, // Ensure unique key for re-renders if recipe changes
        text: ing,
        checked: false,
      }))
    );
  }, [recipe.ingredients]);

  const toggleIngredient = (id: string) => {
    setDisplayIngredients(
      displayIngredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, checked: !ingredient.checked }
          : ingredient
      )
    );
  };
  
  const allIngredientsChecked = displayIngredients.length > 0 && displayIngredients.every(ing => ing.checked);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 text-gray-800 font-sans"> {/* Increased base text size candidate */}
      <Card className="overflow-hidden border-2 border-gray-200 shadow-xl rounded-2xl">
        <CardHeader className="p-0">
          <div className="relative h-72 md:h-96 w-full bg-gray-100">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <ImageOff size={64} />
                <p className="mt-2 text-lg">No Image Available</p>
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                {recipe.title || "Untitled Recipe"}
              </h1>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 text-xl"> {/* Base text size for content */}
          {recipe.description && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-3 text-gray-700">Description</h2>
              <p className="text-lg leading-relaxed text-gray-600">{recipe.description}</p>
              <Separator className="my-6" />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
            {/* Left column - Metadata and Ingredients */}
            <div className="lg:col-span-1 space-y-8">
              {(recipe.prepTime || recipe.cleanupTime || recipe.cuisine || recipe.category) && (
                <div className="bg-slate-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-3xl font-semibold mb-4 flex items-center text-gray-700">
                    <ChefHat className="mr-3 h-8 w-8 text-blue-500" />
                    Recipe Info
                  </h2>
                  <div className="space-y-3 text-lg"> {/* Text size for metadata items */}
                    {recipe.prepTime && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Clock className="h-6 w-6 mr-3 text-gray-500" />
                          <span className="font-medium">Prep Time:</span>
                        </div>
                        <span className="text-gray-600">{recipe.prepTime}</span>
                      </div>
                    )}
                    {recipe.cleanupTime && ( // Using cleanupTime as Cook Time
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                           <Clock className="h-6 w-6 mr-3 text-gray-500" />
                          <span className="font-medium">Cook Time:</span>
                        </div>
                        <span className="text-gray-600">{recipe.cleanupTime}</span>
                      </div>
                    )}
                    {recipe.cuisine && (
                      <div className="flex items-center justify-between">
                         <div className="flex items-center">
                          <Utensils className="h-6 w-6 mr-3 text-gray-500" />
                          <span className="font-medium">Cuisine:</span>
                        </div>
                        <span className="text-gray-600">{recipe.cuisine}</span>
                      </div>
                    )}
                     {recipe.category && (
                      <div className="flex items-center justify-between">
                         <div className="flex items-center">
                           {/* Consider a different icon for category if available, or use a generic one */}
                          <Users className="h-6 w-6 mr-3 text-gray-500" /> 
                          <span className="font-medium">Category:</span>
                        </div>
                        <Badge variant="secondary" className="text-md px-3 py-1">{recipe.category}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Ingredients</h2>
                <p className="text-md text-gray-500 mb-4">
                  Check off items as you go. {allIngredientsChecked && "All done!"}
                </p>
                <ScrollArea className="h-[350px] md:h-[450px] pr-3 border border-gray-200 rounded-lg p-4 bg-slate-50">
                  <ul className="space-y-4"> {/* Changed from div to ul for semantic HTML */}
                    {displayIngredients.map((ingredient) => (
                      <li // Changed from div to li
                        key={ingredient.id}
                        className="flex items-start space-x-4 text-lg" // Text size for ingredients
                        onClick={() => toggleIngredient(ingredient.id)} // Make whole item clickable
                      >
                        {/* Custom Checkbox Visual */}
                        <div className="mt-1 cursor-pointer">
                          {ingredient.checked ? <CheckSquare size={28} className="text-blue-500" /> : <Square size={28} className="text-gray-400" />}
                        </div>
                        <label
                          htmlFor={ingredient.id} // Keep for accessibility, though actual checkbox is hidden
                          className={`flex-1 cursor-pointer ${
                            ingredient.checked
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {ingredient.text}
                        </label>
                         {/* Hidden actual checkbox for form semantics if needed, but we handle state manually */}
                        <Checkbox
                          id={ingredient.id}
                          checked={ingredient.checked}
                          onCheckedChange={() => toggleIngredient(ingredient.id)}
                          className="sr-only" 
                        />
                      </li>
                    ))}
                    {displayIngredients.length === 0 && (
                        <p className="text-gray-500 text-center py-10">No ingredients listed.</p>
                    )}
                  </ul>
                </ScrollArea>
              </div>
            </div>

            {/* Right column - Description and Steps */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold mb-4 text-gray-700">Instructions</h2>
              <div className="space-y-6">
                {(recipe.steps || []).map((step, index) => (
                  <div key={`step-${index}-${Date.now()}`} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-semibold mt-1">
                      {index + 1}
                    </div>
                    <p className="text-lg leading-relaxed text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
                {(!recipe.steps || recipe.steps.length === 0) && (
                    <p className="text-gray-500 text-center py-10">No instructions provided.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 md:p-8 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-4 justify-center md:justify-end">
          {onPrint && (
            <Button variant="outline" size="lg" onClick={onPrint} className="text-lg px-6 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600">
              <Printer className="mr-2 h-6 w-6" />
              Print
            </Button>
          )}
          {onShare && (
          <Button variant="outline" size="lg" onClick={onShare} className="text-lg px-6 py-3 border-2 border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600">
            <Share2 className="mr-2 h-6 w-6" />
            Share
          </Button>
          )}
          {onSave && (
            <Button variant="default" size="lg" onClick={() => onSave(recipe)} className="text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white">
              <Heart className="mr-2 h-6 w-6" />
              Save Recipe
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecipeDisplay; 