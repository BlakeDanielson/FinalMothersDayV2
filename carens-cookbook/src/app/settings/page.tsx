'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSettings } from '@/contexts/SettingsContext';
import { Home, FolderOpen, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

import CategoryManager from '@/components/CategoryManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface CategoryData {
  name: string;
  count: number;
  source?: 'PREDEFINED' | 'AI_GENERATED' | 'USER_CREATED';
}

const SettingsPage = () => {
  const { showImages, toggleShowImages } = useSettings();
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Simple heuristic to detect category source
  const detectCategorySource = useCallback((categoryName: string): string => {
    const predefinedCategories = [
      'Appetizer', 'Beef', 'Breakfast', 'Chicken', 'Dessert', 'Drinks', 
      'Lamb', 'Pasta', 'Pork', 'Salad', 'Seafood', 'Soup', 'Vegetable'
    ];
    
    if (predefinedCategories.includes(categoryName)) {
      return 'PREDEFINED';
    }
    
    // Categories like "Main Courses", "Main Course" might be AI-generated
    if (categoryName.includes('Main') || categoryName.includes('Course') || categoryName.includes('Bread')) {
      return 'AI_GENERATED';
    }
    
    return 'USER_CREATED';
  }, []);

  const fetchCategoriesWithMetadata = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch categories');
      }
      
      const categoriesData: { name: string; count: number }[] = await response.json();
      
      // For settings, we'll fetch additional metadata if available
      // For now, we'll simulate source detection based on category names
      const categoriesWithMetadata = categoriesData.map(cat => ({
        ...cat,
        source: detectCategorySource(cat.name) as 'PREDEFINED' | 'AI_GENERATED' | 'USER_CREATED'
      }));
      
      setCategories(categoriesWithMetadata);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setCategoriesLoading(false);
    }
  }, [detectCategorySource]);

  useEffect(() => {
    fetchCategoriesWithMetadata();
  }, [fetchCategoriesWithMetadata]);

  const handleCategoriesChange = useCallback(() => {
    fetchCategoriesWithMetadata();
  }, [fetchCategoriesWithMetadata]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <motion.h1
            className="text-3xl font-bold text-foreground mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Settings
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Manage your cookbook preferences and categories
          </motion.p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Categories
              </TabsTrigger>
            </TabsList>

            {/* General Settings Tab */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="showImagesToggle" className="text-base font-medium">
                        Show Recipe Images
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Display images in recipe cards and lists
                      </p>
                    </div>
                    <Button
                      id="showImagesToggle"
                      onClick={toggleShowImages}
                      variant={showImages ? "default" : "outline"}
                      className={`min-w-[60px] ${
                        showImages ? 'bg-green-500 hover:bg-green-600' : ''
                      }`}
                    >
                      {showImages ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Future general settings can be added here */}
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Total Categories</p>
                        <p className="text-2xl font-bold text-primary">{categories.length}</p>
                      </div>
                      <div>
                        <p className="font-medium">Total Recipes</p>
                        <p className="text-2xl font-bold text-primary">
                          {categories.reduce((sum, cat) => sum + cat.count, 0)}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Manage your categories in the Categories tab to organize your collection.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Category Management Tab */}
            <TabsContent value="categories" className="space-y-6">
              {categoriesLoading ? (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-muted-foreground">Loading categories...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <CategoryManager 
                  categories={categories} 
                  onCategoriesChange={handleCategoriesChange} 
                />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-12 pt-6 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage; 