"use client"

import React from "react";
import { motion } from "framer-motion";
import { HomeIcon, Camera, SearchIcon, Images } from "lucide-react";
import { Toaster } from 'sonner';

import { Button } from "@/components/ui/button";
import RecipeDisplay from "@/components/RecipeDisplay";
import StatsDashboard from "@/components/StatsDashboard";
import { CategorizedRecipeBrowser } from "@/components/home/CategorizedRecipeBrowser";
import { RecipeImportModal } from "@/components/recipe-import/RecipeImportModal";
import { useHomePage } from "@/hooks/useHomePage";
import { useCategorizedData } from "@/hooks/useCategorizedData";

export default function HomePage() {
  const {
    // State
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
    url,
    setUrl,
    urlProcessingMethod,
    setUrlProcessingMethod,
    // Data
    savedRecipes,
    
    // Handlers
    handleDeleteRecipeFromDisplay,
    handleUpdateRecipeTitle,
    handleUrlSubmit,
    handleSaveRecipe,
    handleImageFileSelect,
    handleMultipleImageFileSelect,
    handleCategoryClick,
    handleQuickImportURL,
    handleQuickScanPhoto,
    handleQuickScanMultiPhoto,
  } = useHomePage();

  // New categorized data hook
  const {
    data: categorizedData,
    isLoading: categorizedLoading,
    error: categorizedError,
  } = useCategorizedData();

  // Enhanced category click handler to support different types
  const handleCategorizedClick = (categoryName: string) => {
    // For now, we'll use the existing category click handler
    // In the future, you might want to navigate to filtered views based on type
    handleCategoryClick(categoryName);
  };

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
      
      {/* Full-Screen Hero Section with Crossfading Background */}
      <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
        {/* Full-background auto-crossfading photo carousel */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            {/* Background images that crossfade - now in pairs side by side */}
            {[
              // Pair 1
              {
                left: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80",
                right: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1920&q=80"
              },
              // Pair 2
              {
                left: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1920&q=80",
                right: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1920&q=80"
              },
              // Pair 3
              {
                left: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=1920&q=80",
                right: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80"
              },
              // Pair 4
              {
                left: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1920&q=80",
                right: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1920&q=80"
              }
            ].map((pair, idx) => (
              <div
                key={idx}
                className="absolute inset-0 w-full h-full flex heroFade"
                style={{
                  animationDelay: `${idx * 5}s`,
                  animationDuration: '20s',
                  animationIterationCount: 'infinite'
                }}
              >
                {/* Left image */}
                <div className="w-full h-full">
                  <img
                    src={pair.left}
                    alt={`Recipe background left ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>
                {/* Subtle divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 transform -translate-x-1/2 z-10"></div>
                {/* Right image */}
                <div className="w-full h-full">
                  <img
                    src={pair.right}
                    alt={`Recipe background right ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Content Container - Centered in available viewport */}
        <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 py-8">
          <div className="container mx-auto text-center">
            {/* Main Header */}
            <header className="mb-16">
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-white"
                style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 8px 40px rgba(0,0,0,0.4)'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Caren&apos;s Cookbook
              </motion.h1>
              <motion.div
                className="backdrop-blur-md bg-white/10 rounded-2xl px-8 py-4 inline-block border border-white/20 shadow-2xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white font-light">
                  Your personal recipe collection
                </p>
              </motion.div>
            </header>

            {/* Enhanced Action Cards Section */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" data-tour="recipe-pathways">
                <motion.div
                  className="backdrop-blur-lg bg-white/15 hover:bg-white/25 rounded-3xl p-8 cursor-pointer transition-all duration-300 group border border-white/30 hover:border-white/50 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-105"
                  onClick={handleQuickImportURL}
                  data-tour="add-recipe-button"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-indigo-500 hover:bg-indigo-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <SearchIcon className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white" style={{textShadow: '0 2px 10px rgba(0,0,0,0.6)'}}>
                      Import from URL
                    </h3>
                    <p className="text-white/80 text-base font-medium" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
                      Paste any recipe link to import
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="backdrop-blur-lg bg-white/15 hover:bg-white/25 rounded-3xl p-8 cursor-pointer transition-all duration-300 group border border-white/30 hover:border-white/50 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-105"
                  onClick={handleQuickScanPhoto}
                  data-tour="scan-recipe-button"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-emerald-500 hover:bg-emerald-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Camera className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white" style={{textShadow: '0 2px 10px rgba(0,0,0,0.6)'}}>
                      Scan Recipe Photo
                    </h3>
                    <p className="text-white/80 text-base font-medium" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
                      Upload a photo to extract recipe
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  className="backdrop-blur-lg bg-white/15 hover:bg-white/25 rounded-3xl p-8 cursor-pointer transition-all duration-300 group border border-white/30 hover:border-white/50 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:scale-105"
                  onClick={handleQuickScanMultiPhoto}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-purple-500 hover:bg-purple-400 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Images className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white" style={{textShadow: '0 2px 10px rgba(0,0,0,0.6)'}}>
                      Multi-Recipe Scan
                    </h3>
                    <p className="text-white/80 text-base font-medium" style={{textShadow: '0 1px 5px rgba(0,0,0,0.5)'}}>
                      Upload multiple photos of one recipe
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div className="flex flex-col items-center text-white/80">
              <p className="text-sm font-medium mb-2" style={{textShadow: '0 2px 10px rgba(0,0,0,0.8)'}}>
                Scroll to browse recipes
              </p>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-white/80 rounded-full mt-2"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Recipe Categories Section with Enhanced Background */}
      <div className="relative bg-gradient-to-b from-white/95 via-white to-gray-50/80 backdrop-blur-sm">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), 
                              radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-16">
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
                className="flex items-center gap-3 text-lg p-6 mx-auto sm:mx-0 font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 border-primary/30 hover:border-primary backdrop-blur-sm bg-white/80"
              >
                <HomeIcon className="h-5 w-5" />
                Back to Recipe List
              </Button>
            </motion.div>
          )}

          {currentView === 'list' && (
            <CategorizedRecipeBrowser
              recipeCategories={categorizedData?.recipeCategories || []}
              mealTypes={categorizedData?.mealTypes || []}
              cuisines={categorizedData?.cuisines || []}
              isLoading={categorizedLoading}
              error={categorizedError}
              onCategoryClick={handleCategorizedClick}
              totalRecipes={categorizedData?.totalRecipes || savedRecipes.length}
            />
          )}

          {/* Stats Dashboard */}
          {currentView === 'stats' && (
            <StatsDashboard 
              recipes={savedRecipes}
            />
          )}
        </div>
      </div>

      {/* Recipe Import Modal */}
      <RecipeImportModal
        isOpen={showAddRecipeModal}
        onClose={() => setShowAddRecipeModal(false)}
        activeTab={activeImportTab}
        
        // URL import props
        url={url}
        onUrlChange={setUrl}
        urlProcessingMethod={urlProcessingMethod}
        onUrlProcessingMethodChange={setUrlProcessingMethod}
        onUrlSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const urlValue = formData.get('url') as string || url;
          handleUrlSubmit(urlValue, 'gemini-main', urlProcessingMethod);
        }}
        urlError={error}
        
        // Photo upload props
        onSingleFileSelect={(file, provider) => handleImageFileSelect(file, provider)}
        onMultipleFilesSelect={(files, provider) => handleMultipleImageFileSelect(files, provider)}
        
        // Loading state
        isLoading={isLoading}
        loadingProgress={loadingProgress}
        loadingStepMessage={loadingStepMessage}
      />
    </div>
  );
} 