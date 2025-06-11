"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Users, Utensils, ChefHat, Heart, Printer, Share2, ImageOff, CheckSquare, Square, HomeIcon, Trash2, CheckCircle, XCircle, Edit3, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useSettings } from '@/contexts/SettingsContext';
import Image from 'next/image';

// Define the structure of a recipe
export interface RecipeData {
  id?: string; // Add optional ID from database
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
  onSave?: (recipeData: RecipeData) => Promise<void>;
  onPrint?: () => void;
  onGoBack?: () => void;
  onDeleteAttempt?: (recipeId: string) => void;
  onUpdateTitle?: (recipeId: string, newTitle: string) => Promise<boolean>;
}

interface DisplayIngredient {
  id: string;
  text: string;
  checked: boolean;
}

// Helper function to parse a fraction string (e.g., "1/2") to a number
const parseFraction = (fraction: string): number | null => {
  const parts = fraction.split('/');
  if (parts.length === 2) {
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      return num / den;
    }
  }
  return null;
};

// Helper function to parse an ingredient string
const parseIngredient = (ingredientString: string): { quantity: number | null; unitAndName: string; originalNumericString: string | null } => {
  ingredientString = ingredientString.trim();
  // Regex to find leading numbers, decimals, or simple fractions (e.g., 1, 0.5, 1/2, 1 1/2)
  // It also tries to capture mixed numbers like "1 1/2" by looking for number, space, then fraction.
  const quantityRegex = /^(\d+\s+\d+\/\d+)|(^\d*\.\d+)|(^\d+\/\d+)|(^\d+)/;
  const match = ingredientString.match(quantityRegex);

  let quantity: number | null = null;
  let unitAndName = ingredientString;
  let originalNumericString: string | null = null;

  if (match && match[0]) {
    originalNumericString = match[0].trim();
    unitAndName = ingredientString.substring(match[0].length).trim();

    if (match[1]) { // Mixed number like "1 1/2"
      const parts = originalNumericString.split(/\s+/);
      const whole = parseFloat(parts[0]);
      const frac = parseFraction(parts[1]);
      if (!isNaN(whole) && frac !== null) {
        quantity = whole + frac;
      }
    } else if (match[3]) { // Fraction like "1/2"
      quantity = parseFraction(originalNumericString);
    } else { // Decimal or whole number
      quantity = parseFloat(originalNumericString);
      if (isNaN(quantity)) quantity = null; // Should not happen if regex matches number
    }
  }
  return { quantity, unitAndName, originalNumericString };
};

// Helper function to scale and format quantity
const scaleAndFormatQuantity = (originalQuantity: number | null, factor: number, originalNumericString: string | null ): string => {
  if (originalQuantity === null) {
    // If no numeric quantity, and it's not a 1x scale, prefix the original string if it exists, or return empty
    // This part can be improved to handle non-scalable items better.
    return originalNumericString ? `${originalNumericString}` : ""; // Or consider: factor !== 1 ? `${factor}x ` : ""
  }
  const scaled = originalQuantity * factor;
  
  // Basic formatting: show up to 2 decimal places if not a whole number
  // More complex fraction formatting can be added here if desired (e.g. 0.75 -> 3/4)
  if (scaled % 1 === 0) {
    return scaled.toString();
  } else {
    // Attempt to represent as a common fraction if it's simple, otherwise decimal
    // This is a very basic fraction conversion, can be expanded
    if (scaled === 0.25) return "1/4";
    if (scaled === 0.5) return "1/2";
    if (scaled === 0.75) return "3/4";
    if (scaled === 1/3) return "1/3";
    if (scaled === 2/3) return "2/3";
    // For mixed numbers like 1.5, 2.5 etc.
    const wholePart = Math.floor(scaled);
    const decimalPart = scaled - wholePart;
    if (wholePart > 0) {
        if (decimalPart === 0.25) return `${wholePart} 1/4`;
        if (decimalPart === 0.5) return `${wholePart} 1/2`;
        if (decimalPart === 0.75) return `${wholePart} 3/4`;
    }
    return parseFloat(scaled.toFixed(2)).toString(); // Show decimal up to 2 places
  }
};

// Helper function to highlight ingredients in a step
const highlightIngredientsInStep = (step: string, ingredients: string[]): (string | React.ReactNode)[] => {
  let parts: (string | React.ReactNode)[] = [step];

  ingredients.forEach((ingredient, ingredientIndex) => {
    if (!ingredient || ingredient.trim() === "") return; // Skip empty ingredients

    const newParts: (string | React.ReactNode)[] = [];
    const escapedIngredient = ingredient.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'); // Escape regex special chars
    const regex = new RegExp(`\\b(${escapedIngredient})\\b`, 'gi'); // Case-insensitive, whole word

    parts.forEach(part => {
      if (typeof part === 'string') {
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(part)) !== null) {
          if (match.index > lastIndex) {
            newParts.push(part.substring(lastIndex, match.index));
          }
          newParts.push(<strong key={`ing-${ingredientIndex}-${match.index}`}>{match[0]}</strong>);
          lastIndex = regex.lastIndex;
        }
        if (lastIndex < part.length) {
          newParts.push(part.substring(lastIndex));
        }
      } else {
        newParts.push(part); // Pass through existing ReactNode elements
      }
    });
    parts = newParts;
  });
  return parts;
};

const RecipeDisplay = ({
  recipe,
  onSave,
  onPrint,
  onGoBack,
  onDeleteAttempt,
  onUpdateTitle,
}: RecipeDisplayProps) => {
  const { showImages } = useSettings();
  const [displayIngredients, setDisplayIngredients] = useState<DisplayIngredient[]>([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentEditableTitle, setCurrentEditableTitle] = useState(recipe.title);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [showShareOptionsModal, setShowShareOptionsModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayIngredients(
      (recipe.ingredients || []).map((ing, index) => {
        const parsed = parseIngredient(ing);
        const scaledQuantityStr = scaleAndFormatQuantity(parsed.quantity, scaleFactor, parsed.originalNumericString);
        return {
          id: `ing-${index}-${Date.now()}`,
          text: (scaledQuantityStr ? scaledQuantityStr + " " : "") + parsed.unitAndName,
          checked: false,
        };
      })
    );
  }, [recipe.ingredients, scaleFactor]);

  useEffect(() => {
    setCurrentEditableTitle(recipe.title);
    setIsEditingTitle(false);
    setSaveStatus('idle');
    setImageError(false); // Reset image error when recipe changes
    // Clear any pending save timeout when recipe changes
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
  }, [recipe.title, recipe.image]);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleTitleEditToggle = () => {
    if (isEditingTitle) {
      handleTitleSave();
    } else {
      setCurrentEditableTitle(recipe.title);
      setIsEditingTitle(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEditableTitle(event.target.value);
  };

  const handleTitleSave = async () => {
    if (!onUpdateTitle || !recipe.id || currentEditableTitle.trim() === recipe.title.trim()) {
      setIsEditingTitle(false);
      setCurrentEditableTitle(recipe.title);
      return;
    }
    const success = await onUpdateTitle(recipe.id, currentEditableTitle.trim());
    if (success) {
      setIsEditingTitle(false);
    } else {
      toast.error("Failed to update title. Reverting.");
      setCurrentEditableTitle(recipe.title);
      setIsEditingTitle(false);
    }
  };

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleTitleSave();
    if (event.key === 'Escape') {
      setCurrentEditableTitle(recipe.title);
      setIsEditingTitle(false);
    }
  };

  const handleShareRecipe = async () => {
    if (!recipe.id) {
      toast.error("Cannot share recipe without an ID.");
      return;
    }
    const shareUrl = `${window.location.origin}/?recipeId=${recipe.id}`; 
    const titleToShare = recipe.title;
    const textToShare = `Check out this delicious recipe I found: ${recipe.title}! ${recipe.description || ''}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: titleToShare, text: textToShare, url: shareUrl });
        toast.success("Recipe shared successfully!");
      } catch (error) {
        if ((error as DOMException).name !== 'AbortError') {
          console.error("Error sharing via Web Share API:", error);
          toast.error("Could not share recipe at this time.");
        }
      }
    } else {
      setShowShareOptionsModal(true);
    }
  };

  const toggleIngredient = (id: string) => {
    setDisplayIngredients(
      displayIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, checked: !ingredient.checked } : ingredient
      )
    );
  };
  
  const allIngredientsChecked = displayIngredients.length > 0 && displayIngredients.every(ing => ing.checked);

  const renderTitleAndControls = (isOverlay: boolean) => (
    <div className={`flex items-center gap-3 ${isOverlay ? '' : 'w-full'}`}>
      {isEditingTitle ? (
        <Input 
          ref={titleInputRef}
          type="text"
          value={currentEditableTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleSave} // Save on blur
          onKeyDown={handleTitleKeyDown}
          className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight w-full 
            ${isOverlay 
              ? 'text-white bg-transparent border-b-2 border-white/50 focus:outline-none focus:border-white' 
              : 'text-gray-800 dark:text-gray-100 bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary-dark focus:outline-none'}`}
        />
      ) : (
        <h1 className={`text-4xl md:text-5xl font-bold tracking-tight leading-tight ${isOverlay ? 'text-white' : 'text-gray-800 dark:text-gray-100'}`}>
          {recipe.title || "Untitled Recipe"}
        </h1>
      )}
      {onUpdateTitle && recipe.id && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleTitleEditToggle} 
          className={`p-2 shrink-0 flex items-center justify-center 
            ${isOverlay 
              ? 'text-white/70 hover:text-white' 
              : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark'}`}
          aria-label={isEditingTitle ? "Save title" : "Edit title"}
        >
          {isEditingTitle ? <CheckCircle size={70} /> : <Edit3 size={70} />} 
        </Button>
      )}
        {isEditingTitle && (
          <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => { setCurrentEditableTitle(recipe.title); setIsEditingTitle(false); }} 
          className={`p-2 shrink-0 flex items-center justify-center 
            ${isOverlay 
              ? 'text-white/70 hover:text-white' 
              : 'text-gray-500 dark:text-gray-400 hover:text-destructive dark:hover:text-destructive-dark'}`}
          aria-label="Cancel editing title"
        >
          <XCircle size={40} />
        </Button>
      )}
    </div>
  );

  const handleSave = async () => {
    if (onSave) {
      setSaveStatus('saving');
      // Clear any existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      try {
        await onSave(recipe);
        setSaveStatus('saved');
        // Reset save status back to idle after 2 seconds to allow saving again
        saveTimeoutRef.current = setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
      } catch (error) {
        console.error("Error saving recipe:", error);
        toast.error("Failed to save recipe."); // Fallback error toast
        setSaveStatus('idle'); // Reset to idle on error
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 text-gray-800 font-sans">
      <Card className="overflow-hidden border-2 border-gray-200 shadow-xl rounded-2xl">
        <div className="px-6 md:px-8 pt-6 flex justify-between items-center">
          {onGoBack && (
            <Button onClick={onGoBack} variant="outline" className="flex items-center gap-2 text-lg p-3 pr-4">
              <HomeIcon className="h-5 w-5" /> Back to Recipes
            </Button>
          )}
          <div className="flex gap-2">
            {onPrint && (
              <Button variant="outline" size="icon" onClick={onPrint} className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600">
                <Printer className="h-5 w-5" />
                <span className="sr-only">Print</span>
              </Button>
            )}
            <Button variant="outline" onClick={handleShareRecipe} className="border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </Button>
            {onSave && (
              <Button 
                variant="default" 
                onClick={handleSave}
                className={`text-white flex items-center gap-2 ${saveStatus === 'saved' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={saveStatus === 'saving'}
              >
                {saveStatus === 'saving' ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <Heart className="h-5 w-5 fill-white" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5" />
                    <span>Save</span>
                  </>
                )}
              </Button>
            )}
            {onDeleteAttempt && recipe.id && (
              <Button variant="destructive" onClick={() => onDeleteAttempt(recipe.id!)} className="flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                <span>Delete</span>
              </Button>
            )}
          </div>
        </div>

        {showImages ? (
          <CardHeader className="p-0">
            <div className="relative h-72 md:h-96 w-full bg-gray-100">
              {recipe.image && !imageError ? (
                <Image 
                  src={recipe.image} 
                  alt={recipe.title} 
                  layout="fill" 
                  objectFit="cover" 
                  priority
                  unoptimized={false} // Let Next.js optimize the image
                  onError={(e) => {
                    console.warn('Failed to load image:', recipe.image);
                    console.warn('Image error details:', e);
                    setImageError(true);
                  }}
                  onLoad={() => setImageError(false)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                  <ImageOff size={64} />
                  <p className="mt-2 text-lg">
                    {imageError ? "Failed to load image" : "No Image Available"}
                  </p>
                  {imageError && recipe.image && (
                    <p className="mt-1 text-sm text-gray-500 max-w-xs text-center break-all">
                      Image URL: {recipe.image.length > 50 ? `${recipe.image.substring(0, 50)}...` : recipe.image}
                    </p>
                  )}
                </div>
              )}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                {renderTitleAndControls(true)}
              </div>
            </div>
          </CardHeader>
        ) : (
          // New header for when images are OFF
          <div className="p-6 md:p-8 border-b border-gray-200 dark:border-gray-700">
            {renderTitleAndControls(false)}
          </div>
        )}

        <CardContent className="p-6 md:p-8 text-xl">
          {recipe.description && (
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-3 text-gray-700">Description</h2>
              <p className="text-lg leading-relaxed text-gray-600">{recipe.description}</p>
              <Separator className="my-6" />
            </div>
          )}

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">Servings Scale</h3>
            <div className="flex flex-wrap gap-2 items-center">
              {[0.5, 1, 2, 3].map((factor) => (
                <Button key={factor} variant={scaleFactor === factor ? "default" : "outline"} size="sm" onClick={() => setScaleFactor(factor)} className={`text-md px-3 py-1 ${scaleFactor === factor ? 'bg-blue-600 text-white' : 'border-gray-400 text-gray-700'}`}>
                  {factor}x
                </Button>
              ))}
            </div>
            <Separator className="my-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
            <div className="lg:col-span-1 space-y-8">
              {(recipe.prepTime || recipe.cleanupTime || recipe.cuisine || recipe.category) && (
                <div className="bg-slate-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-3xl font-semibold mb-4 flex items-center text-gray-700">
                    <ChefHat className="mr-3 h-8 w-8 text-blue-500" /> Recipe Info
                  </h2>
                  <div className="space-y-3 text-lg">
                    {recipe.prepTime && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center"><Clock className="h-6 w-6 mr-3 text-gray-500" /> <span className="font-medium">Prep Time:</span></div>
                        <span className="text-gray-600">{recipe.prepTime}</span>
                      </div>
                    )}
                    {recipe.cleanupTime && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center"><Clock className="h-6 w-6 mr-3 text-gray-500" /> <span className="font-medium">Cook Time:</span></div>
                        <span className="text-gray-600">{recipe.cleanupTime}</span>
                      </div>
                    )}
                    {recipe.cuisine && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center"><Utensils className="h-6 w-6 mr-3 text-gray-500" /> <span className="font-medium">Cuisine:</span></div>
                        <span className="text-gray-600">
                          {recipe.cuisine.split(' ').length === 2 ? (
                            <>
                              {recipe.cuisine.split(' ')[0]}
                              <br />
                              {recipe.cuisine.split(' ')[1]}
                            </>
                          ) : (
                            recipe.cuisine
                          )}
                        </span>
                      </div>
                    )}
                     {recipe.category && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center"><Users className="h-6 w-6 mr-3 text-gray-500" /> <span className="font-medium">Category:</span></div>
                        <Badge variant="secondary" className="text-md px-3 py-1">{recipe.category}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div>
                <h2 className="text-3xl font-semibold mb-4 text-gray-700">Ingredients</h2>
                <p className="text-md text-gray-500 mb-4">Check off items as you go. {allIngredientsChecked && "All done!"}</p>
                <ul className="space-y-4 pr-3 border border-gray-200 rounded-lg p-4 bg-slate-50">
                  {displayIngredients.map((ingredient) => (
                    <li key={ingredient.id} className="flex items-start space-x-4 text-lg" onClick={() => toggleIngredient(ingredient.id)}>
                      <div className="mt-1 cursor-pointer">{ingredient.checked ? <CheckSquare size={28} className="text-blue-500" /> : <Square size={28} className="text-gray-400" />}</div>
                      <label htmlFor={ingredient.id} className={`flex-1 cursor-pointer ${ingredient.checked ? "line-through text-gray-400" : "text-gray-700"}`}>{ingredient.text}</label>
                      <Checkbox id={ingredient.id} checked={ingredient.checked} onCheckedChange={() => toggleIngredient(ingredient.id)} className="sr-only" />
                    </li>
                  ))}
                  {displayIngredients.length === 0 && <p className="text-gray-500 text-center py-10">No ingredients listed.</p>}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-semibold mb-4 text-gray-700">Instructions</h2>
              <div className="space-y-6">
                {(recipe.steps || []).map((step, index) => (
                  <div key={`step-${index}-${Date.now()}`} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-10 w-10 flex items-center justify-center text-xl font-semibold mt-1">{index + 1}</div>
                    <p className="text-lg leading-relaxed text-gray-700 pt-1">
                      {highlightIngredientsInStep(step, recipe.ingredients || [])}
                    </p>
                  </div>
                ))}
                {(!recipe.steps || recipe.steps.length === 0) && <p className="text-gray-500 text-center py-10">No instructions provided.</p>}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 md:p-8 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-4 justify-center md:justify-end">
          {/* Buttons moved to the top */}
        </CardFooter>
      </Card>
      {showShareOptionsModal && recipe.id && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowShareOptionsModal(false)}>
          <Card className="bg-background p-6 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Share this Recipe</h3>
            <Input type="text" value={`${window.location.origin}/?recipeId=${recipe.id}`} readOnly className="mb-3 w-full border-gray-300 rounded p-2 text-sm" onFocus={(e) => e.target.select()} />
            <Button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/?recipeId=${recipe.id}`).then(() => toast.success("Link copied to clipboard!")).catch(() => toast.error("Failed to copy link.")); setShowShareOptionsModal(false); }} className="w-full mb-3 text-lg">Copy Link</Button>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="text-lg" onClick={() => setShowShareOptionsModal(false)}><a href={`mailto:?subject=${encodeURIComponent(`Recipe: ${recipe.title}`)}&body=${encodeURIComponent(`Check out this recipe: ${recipe.title}\n\n${window.location.origin}/?recipeId=${recipe.id}`)}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">Email</a></Button>
              <Button asChild variant="outline" className="text-lg" onClick={() => setShowShareOptionsModal(false)}><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/?recipeId=${recipe.id}`)}&text=${encodeURIComponent(`Check out this recipe: ${recipe.title}`)}`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center">Twitter</a></Button>
            </div>
            <Button variant="ghost" onClick={() => setShowShareOptionsModal(false)} className="w-full mt-4 text-gray-600 hover:text-gray-800">Close</Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay; 