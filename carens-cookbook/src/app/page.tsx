"use client"

import React from "react";
import { motion } from "framer-motion";
import { HomeIcon, Camera } from "lucide-react";
import { Toaster } from 'sonner';

import { Button } from "@/components/ui/button";
import RecipeDisplay from "@/components/RecipeDisplay";
import { BentoGrid } from "@/components/BentoGrid";
import StatsDashboard from "@/components/StatsDashboard";
import { CategoryCard } from "@/components/category/CategoryCard";
import { QuickActionsSection } from "@/components/home/QuickActionsSection";
import { RecipeImportModal } from "@/components/recipe-import/RecipeImportModal";
import { useHomePage } from "@/hooks/useHomePage";

function MainPage() {
  const {
    // State
    url,
    setUrl,
    urlProcessingMethod,
    setUrlProcessingMethod,
    isLoading,
    loadingStepMessage,
    loadingProgress,
    error,
    currentView,
    setCurrentView,
    selectedRecipe,
    showAddRecipeModal,
    setShowAddRecipeModal,
    activeImportTab,
    setActiveImportTab,
    processedCategories,
    
    // Data
    categoriesLoading,
    categoriesError,
    savedRecipes,
    
    // Image processing
    imageProcessing,
    multipleImageProcessing,
    
    // Handlers
    handleDeleteRecipeFromDisplay,
    handleUpdateRecipeTitle,
    handleSubmit,
    handleSaveRecipe,
    handleImageFileSelect,
    handleRetryImageProcessing,
    handleMultipleImageFileSelect,
    handleRetryMultipleImageProcessing,
    handleCategoryClick,
    handleQuickImportURL,
    handleQuickScanPhoto,
    handleShowStats,
  } = useHomePage();

  if (currentView === 'recipe' && selectedRecipe) {
    return (
      <>
        <RecipeDisplay 
          recipe={selectedRecipe} 
          onSave={handleSaveRecipe}
          onGoBack={() => setCurrentView('list')}
          onDeleteAttempt={handleDeleteRecipeFromDisplay}
          onUpdateTitle={handleUpdateRecipeTitle}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-black tracking-tight mb-3 text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Caren&apos;s Cookbook
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your personal recipe collection
          </motion.p>
        </header>

        {/* Quick Actions Section */}
        <QuickActionsSection
          onImportURL={handleQuickImportURL}
          onScanPhoto={handleQuickScanPhoto}
          onShowStats={handleShowStats}
        />

        {currentView !== 'list' && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={() => setCurrentView('list')}
              variant="outline"
              className="flex items-center gap-3 text-lg p-6 mx-auto sm:mx-0 font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-primary/30 hover:border-primary"
            >
              <HomeIcon className="h-5 w-5" />
              Back to Recipe List
            </Button>
          </motion.div>
        )}

        {currentView === 'list' && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-medium text-foreground mb-3">
                Recipe Categories
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Browse recipes by category • {savedRecipes.length} total recipes
              </p>
            </div>

            {/* Loading State */}
            {categoriesLoading && (
              <div className="text-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-lg text-muted-foreground font-light">Loading your recipe categories...</p>
              </div>
            )}

            {/* Error State */}
            {categoriesError && !categoriesLoading && (
              <div className="text-center py-16">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800 font-medium mb-2">Unable to load categories</p>
                  <p className="text-red-600 text-sm mb-4">{categoriesError}</p>
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Categories Grid */}
            {!categoriesLoading && !categoriesError && (
              <BentoGrid className="gap-8" data-tour="recipe-categories">
                {processedCategories.map((category, index) => (
                  <motion.div
                    key={category.name + index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="h-full min-h-[350px]"
                  >
                    <CategoryCard 
                      categoryName={category.name} 
                      itemCount={category.count}
                      imageUrl={category.imageUrl}
                      onClick={() => handleCategoryClick(category.name)} 
                    />
                  </motion.div>
                ))}
              </BentoGrid>
            )}

            {/* Empty State for when no categories are loaded */}
            {!categoriesLoading && !categoriesError && processedCategories.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-muted/30 border border-muted rounded-lg p-8 max-w-md mx-auto">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">No categories yet</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Start by importing your first recipe to see categories here
                  </p>
                  <Button onClick={handleQuickImportURL} className="mr-2">
                    Import Recipe
                  </Button>
                  <Button onClick={handleQuickScanPhoto} variant="outline">
                    Scan Photo
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {currentView === 'save' && (
          <motion.div
            key="save-recipe"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center py-16">
              <p className="text-muted-foreground font-light text-lg">Save functionality not implemented yet</p>
            </div>
          </motion.div>
        )}

        {currentView === 'stats' && (
          <motion.div
            key="stats-dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-light text-foreground mb-3">Collection Insights</h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Discover patterns and trends in your recipe collection
              </p>
            </div>
            <StatsDashboard recipes={savedRecipes} />
          </motion.div>
        )}
      </div>

      {/* Recipe Import Modal */}
      <RecipeImportModal
        isOpen={showAddRecipeModal}
        onClose={() => setShowAddRecipeModal(false)}
        activeTab={activeImportTab}
        onTabChange={setActiveImportTab}
        url={url}
        onUrlChange={setUrl}
        urlProcessingMethod={urlProcessingMethod}
        onUrlProcessingMethodChange={setUrlProcessingMethod}
        onUrlSubmit={handleSubmit}
        urlError={error}
        onSingleFileSelect={handleImageFileSelect}
        onMultipleFilesSelect={handleMultipleImageFileSelect}
        singleImageError={imageProcessing.error}
        multipleImageError={multipleImageProcessing.error}
        onRetrySingleImage={handleRetryImageProcessing}
        onRetryMultipleImages={handleRetryMultipleImageProcessing}
        onDismissSingleError={() => imageProcessing.reset()}
        onDismissMultipleError={() => multipleImageProcessing.reset()}
        isLoading={isLoading}
        loadingProgress={loadingProgress}
        loadingStepMessage={loadingStepMessage}
      />
    </div>
  );
}

export default MainPage;
