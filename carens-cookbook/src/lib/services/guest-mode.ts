import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

export interface GuestRecipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string | null;
  prepTime: string;
  cleanupTime: string;
  cuisine: string;
  category: string;
  sourceUrl?: string;
  isGuest: true;
  createdAt: string;
}

export class GuestModeService {
  private static readonly GUEST_RECIPES_KEY = 'guest_recipes';
  private static readonly GUEST_SESSION_KEY = 'guest_session_id';

  /**
   * Get guest session ID (create one if it doesn't exist)
   */
  static getGuestSessionId(): string {
    if (typeof window === 'undefined') return '';
    
    let sessionId = localStorage.getItem(this.GUEST_SESSION_KEY);
    if (!sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(this.GUEST_SESSION_KEY, sessionId);
    }
    return sessionId;
  }

  /**
   * Save a recipe to guest storage (localStorage)
   */
  static saveGuestRecipe(recipe: GuestRecipe): void {
    if (typeof window === 'undefined') return;
    
    const existingRecipes = this.getGuestRecipes();
    const updatedRecipes = [...existingRecipes, recipe];
    
    localStorage.setItem(this.GUEST_RECIPES_KEY, JSON.stringify(updatedRecipes));
    
    toast.success(`Recipe '${recipe.title}' saved locally!`, {
      description: 'Sign up to save it permanently to your account.',
      action: {
        label: 'Sign Up',
        onClick: () => this.promptSignup()
      }
    });
  }

  /**
   * Get all guest recipes from localStorage
   */
  static getGuestRecipes(): GuestRecipe[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.GUEST_RECIPES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading guest recipes:', error);
      return [];
    }
  }

  /**
   * Delete a guest recipe from localStorage
   */
  static deleteGuestRecipe(recipeId: string): void {
    if (typeof window === 'undefined') return;
    
    const recipes = this.getGuestRecipes();
    const updated = recipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem(this.GUEST_RECIPES_KEY, JSON.stringify(updated));
  }

  /**
   * Clear all guest data (called after successful signup/migration)
   */
  static clearGuestData(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(this.GUEST_RECIPES_KEY);
    localStorage.removeItem(this.GUEST_SESSION_KEY);
  }

  /**
   * Get count of guest recipes
   */
  static getGuestRecipeCount(): number {
    return this.getGuestRecipes().length;
  }

  /**
   * Scan recipe image (guest mode)
   */
  static async scanRecipeImage(imageFile: File, provider: string = 'openai-main'): Promise<GuestRecipe> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('provider', provider);

    const response = await fetch('/api/guest/scan-recipe', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to scan recipe image');
    }

    const guestRecipe = data.recipe as GuestRecipe;
    this.saveGuestRecipe(guestRecipe);
    
    return guestRecipe;
  }

  /**
   * Fetch recipe from URL (guest mode)
   */
  static async fetchRecipeFromUrl(url: string): Promise<GuestRecipe> {
    const response = await fetch('/api/guest/fetch-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch recipe from URL');
    }

    const guestRecipe = data.recipe as GuestRecipe;
    this.saveGuestRecipe(guestRecipe);
    
    return guestRecipe;
  }

  /**
   * Show signup prompt
   */
  static promptSignup(message?: string): void {
    const count = this.getGuestRecipeCount();
    const defaultMessage = count > 0 
      ? `You have ${count} recipe${count > 1 ? 's' : ''} saved locally. Sign up to save them permanently!`
      : 'Sign up to save your recipes permanently and access all features!';

    toast.info(message || defaultMessage, {
      duration: 8000,
      action: {
        label: 'Sign Up',
        onClick: () => {
          window.location.href = '/sign-up';
        }
      }
    });
  }

  /**
   * Check if user should see guest mode prompts
   */
  static shouldShowGuestPrompts(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Show prompts if user has guest recipes but isn't signed in
    return this.getGuestRecipeCount() > 0;
  }

  /**
   * Migrate guest recipes to user account (called after signup/onboarding)
   */
  static async migrateGuestRecipes(userId: string): Promise<void> {
    const guestRecipes = this.getGuestRecipes();
    if (guestRecipes.length === 0) return;

    try {
      const response = await fetch('/api/migrate-guest-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId,
          guestRecipes: guestRecipes.map(recipe => ({
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            image: recipe.image,
            prepTime: recipe.prepTime,
            cleanupTime: recipe.cleanupTime,
            cuisine: recipe.cuisine,
            category: recipe.category,
            sourceUrl: recipe.sourceUrl
          }))
        }),
      });

      if (response.ok) {
        this.clearGuestData();
        toast.success(`Successfully migrated ${guestRecipes.length} recipe${guestRecipes.length > 1 ? 's' : ''} to your account!`);
      } else {
        console.error('Failed to migrate guest recipes:', await response.text());
        toast.error('Failed to migrate some recipes. You can manually re-import them.');
      }
    } catch (error) {
      console.error('Error migrating guest recipes:', error);
      toast.error('Failed to migrate recipes. You can manually re-import them.');
    }
  }
}

/**
 * Hook to determine if user is in guest mode and get guest functionality
 */
export function useGuestMode() {
  const { user, isLoaded } = useUser();
  const isGuest = isLoaded && !user;
  const guestRecipeCount = isGuest ? GuestModeService.getGuestRecipeCount() : 0;

  return {
    isGuest,
    isLoaded,
    guestRecipeCount,
    saveGuestRecipe: GuestModeService.saveGuestRecipe,
    getGuestRecipes: GuestModeService.getGuestRecipes,
    deleteGuestRecipe: GuestModeService.deleteGuestRecipe,
    scanRecipeImage: GuestModeService.scanRecipeImage,
    fetchRecipeFromUrl: GuestModeService.fetchRecipeFromUrl,
    promptSignup: GuestModeService.promptSignup,
    shouldShowGuestPrompts: GuestModeService.shouldShowGuestPrompts,
    migrateGuestRecipes: GuestModeService.migrateGuestRecipes
  };
} 