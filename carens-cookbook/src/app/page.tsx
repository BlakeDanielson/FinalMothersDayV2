"use client"

import React from "react";
import { motion } from "framer-motion";
import { HomeIcon, Camera, SearchIcon, Images } from "lucide-react";
import { Toaster } from 'sonner';

import { Button } from "@/components/ui/button";
import RecipeDisplay from "@/components/RecipeDisplay";
import { BentoGrid } from "@/components/BentoGrid";
import StatsDashboard from "@/components/StatsDashboard";
import { CategoryCard } from "@/components/category/CategoryCard";
import { RecipeImportModal } from "@/components/recipe-import/RecipeImportModal";
import { useHomePage } from "@/hooks/useHomePage";

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
    processedCategories,
    
    // Data
    categoriesLoading,
    categoriesError,
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
      
      {/* Hero Section with Photo Background */}
      <div className="relative overflow-hidden bg-background">
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
                className="absolute inset-0 w-full h-full grid grid-cols-2"
                style={{
                  animation: `heroFade 20s infinite ${idx * 5}s`,
                  opacity: 0
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
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Hero Content overlay */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-12">
            <header className="mb-16 text-center">
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

            {/* Enhanced Quick Actions Section */}
            <motion.section
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center mb-12">
                <div className="backdrop-blur-md bg-white/10 rounded-2xl px-6 py-3 inline-block border border-white/20 shadow-xl mb-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Quick Actions</h2>
                </div>
                <p className="text-lg md:text-xl text-white/90 font-medium" style={{textShadow: '0 2px 10px rgba(0,0,0,0.6)'}}>
                  Start your cooking journey
                </p>
              </div>
              
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
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="backdrop-blur-sm bg-white/60 rounded-3xl p-8 max-w-2xl mx-auto border border-white/40 shadow-xl"
                >
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-4">
                    Recipe Categories
                  </h2>
                  <p className="text-xl text-gray-600 font-light">
                    Browse your culinary collection • <span className="font-semibold text-primary">{savedRecipes.length}</span> total recipes
                  </p>
                </motion.div>
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
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <BentoGrid className="gap-8" data-tour="recipe-categories">
                    {processedCategories.map((category, index) => (
                      <motion.div
                        key={category.name + index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: 0.1 * index,
                          ease: "easeOut"
                        }}
                        className="h-full min-h-[450px]"
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
                </motion.div>
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