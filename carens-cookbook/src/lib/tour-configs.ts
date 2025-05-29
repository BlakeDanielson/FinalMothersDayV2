import { TourConfig } from '@/contexts/FeatureTourContext';

export const TOUR_CONFIGS: Record<string, TourConfig> = {
  'recipe-basics': {
    id: 'recipe-basics',
    name: 'Recipe Basics Tour',
    description: 'Learn the fundamentals of managing your recipe collection',
    autoStart: false,
    showOnce: true,
    steps: [
      {
        id: 'welcome',
        title: 'Welcome to Caren\'s Cookbook! 👋',
        content: 'Let\'s take a quick tour to help you get the most out of your personal recipe collection. This tour will show you the key features and how to use them effectively.',
        target: 'body',
        position: 'center'
      },
      {
        id: 'recipe-pathways',
        title: 'Multiple Ways to Add Recipes 🍳',
        content: 'You have three convenient ways to add recipes to your collection: Import from any recipe URL, scan photos of recipe cards or cookbooks, or view your collection statistics.',
        target: '[data-tour="recipe-pathways"]',
        position: 'bottom'
      },
      {
        id: 'add-recipe-url',
        title: 'Import from URL 🔗',
        content: 'The fastest way to add recipes! Just paste any recipe URL from popular cooking websites, and we\'ll automatically extract all the details for you.',
        target: '[data-tour="add-recipe-button"]',
        position: 'bottom',
        action: 'hover'
      },
      {
        id: 'scan-recipe',
        title: 'Scan Recipe Photos 📸',
        content: 'Got a recipe card or cookbook? Take a photo and our AI will extract the ingredients and instructions automatically. Perfect for digitizing family recipes!',
        target: '[data-tour="scan-recipe-button"]',
        position: 'bottom',
        action: 'hover'
      },
      {
        id: 'recipe-categories',
        title: 'Organized by Categories 📚',
        content: 'Your recipes are automatically organized into categories like Appetizers, Main Dishes, Desserts, and more. Click any category to browse those specific recipes.',
        target: '[data-tour="recipe-categories"]',
        position: 'top',
        condition: () => document.querySelector('[data-tour="recipe-categories"]') !== null
      },
      {
        id: 'search-features',
        title: 'Search & Filter 🔍',
        content: 'Use the search bar to quickly find recipes by name, ingredient, or cooking method. You can also filter by dietary restrictions and cooking time.',
        target: '[data-tour="search-bar"]',
        position: 'bottom',
        condition: () => document.querySelector('[data-tour="search-bar"]') !== null,
        optional: true
      },
      {
        id: 'completion',
        title: 'You\'re All Set! 🎉',
        content: 'That\'s the basics! Start by adding your first recipe using one of the methods above. You can always access this tour again from the help menu.',
        target: 'body',
        position: 'center'
      }
    ]
  },

  'search-features': {
    id: 'search-features',
    name: 'Search & Discovery Tour',
    description: 'Master the search and filtering capabilities',
    autoStart: false,
    showOnce: false,
    steps: [
      {
        id: 'search-intro',
        title: 'Advanced Search Features 🔍',
        content: 'Let\'s explore the powerful search and filtering options that help you find exactly what you\'re looking for in your recipe collection.',
        target: 'body',
        position: 'center'
      },
      {
        id: 'search-bar',
        title: 'Smart Search Bar',
        content: 'Search by recipe name, ingredients, cooking method, or even dietary restrictions. Try searching for "chicken" or "vegetarian" to see it in action.',
        target: '[data-tour="search-bar"]',
        position: 'bottom'
      },
      {
        id: 'category-filters',
        title: 'Category Browsing',
        content: 'Browse recipes by category to discover new dishes. Each category shows the number of recipes you have saved.',
        target: '[data-tour="recipe-categories"]',
        position: 'top'
      },
      {
        id: 'recipe-tags',
        title: 'Recipe Tags & Labels',
        content: 'Recipes are automatically tagged with cooking methods, dietary info, and cuisine types to make searching even easier.',
        target: '[data-tour="recipe-tags"]',
        position: 'bottom',
        condition: () => document.querySelector('[data-tour="recipe-tags"]') !== null,
        optional: true
      }
    ]
  },

  'profile-settings': {
    id: 'profile-settings',
    name: 'Profile & Settings Tour',
    description: 'Customize your cookbook experience',
    autoStart: false,
    showOnce: false,
    steps: [
      {
        id: 'profile-intro',
        title: 'Personalize Your Experience ⚙️',
        content: 'Let\'s explore how to customize your cookbook settings and manage your profile to get the best experience.',
        target: 'body',
        position: 'center'
      },
      {
        id: 'profile-menu',
        title: 'Profile Menu',
        content: 'Access your profile settings, preferences, and account information from the profile menu in the navigation.',
        target: '[data-tour="profile-menu"]',
        position: 'bottom',
        condition: () => document.querySelector('[data-tour="profile-menu"]') !== null
      },
      {
        id: 'settings-button',
        title: 'Settings Panel',
        content: 'The floating settings button gives you quick access to display preferences, theme options, and other customization features.',
        target: '[data-tour="settings-button"]',
        position: 'left',
        condition: () => document.querySelector('[data-tour="settings-button"]') !== null
      },
      {
        id: 'dietary-preferences',
        title: 'Dietary Preferences',
        content: 'Set your dietary preferences and restrictions to get personalized recipe recommendations and better search results.',
        target: '[data-tour="dietary-preferences"]',
        position: 'bottom',
        condition: () => document.querySelector('[data-tour="dietary-preferences"]') !== null,
        optional: true
      }
    ]
  }
};

export const getTourConfig = (tourId: string): TourConfig | null => {
  return TOUR_CONFIGS[tourId] || null;
};

export const getAllTourConfigs = (): TourConfig[] => {
  return Object.values(TOUR_CONFIGS);
}; 