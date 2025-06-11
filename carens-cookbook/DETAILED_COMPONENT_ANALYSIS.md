# Detailed Component Usage Analysis

## 📁 DIRECTORY STRUCTURE ANALYSIS

### `/src/app` - Pages & Routes

#### ✅ ACTIVELY USED
- `page.tsx` (273 lines) - **CRITICAL** - Main home page
- `layout.tsx` (67 lines) - **CRITICAL** - Root layout with providers
- `onboarding/page.tsx` - **CRITICAL** - Onboarding entry point
- `settings/page.tsx` - **ACTIVE** - User settings page
- `category/[categoryName]/page.tsx` - **ACTIVE** - Category browsing
- `sign-in/[[...sign-in]]/page.tsx` - **CRITICAL** - Authentication
- `sign-up/[[...sign-up]]/page.tsx` - **CRITICAL** - Authentication

#### ❓ QUESTIONABLE USAGE
- `admin/` directory - **REVIEW NEEDED** - Admin functionality
  - `analytics/page.tsx`
  - `data-recovery/page.tsx` 
  - `performance/page.tsx`
- `profile/page.tsx` - **UNCLEAR** - Profile management

### `/src/components` - UI Components

#### ✅ HIGH USAGE (Core Components)
- `RecipeDisplay.tsx` (578 lines) - **CRITICAL** - Recipe viewing/editing
- `OnboardingWizard.tsx` (345 lines) - **CRITICAL** - User onboarding
- `ProtectedRoute.tsx` (160 lines) - **CRITICAL** - Route protection

#### ✅ MEDIUM USAGE (Feature Components)
- `StatsDashboard.tsx` (255 lines) - **ACTIVE** - Recipe statistics
- `CategoryManager.tsx` (263 lines) - **ACTIVE** - Category management
- `RecipeCard.tsx` (131 lines) - **ACTIVE** - Recipe preview cards

#### ❓ LOW USAGE (Questionable)
- `GreetingScreen.tsx` (391 lines) - **REVIEW** - May overlap with onboarding
- `Navbar.tsx` (158 lines) - **UNCLEAR** - Navigation (not visible in main flow)
- `BentoGrid.tsx` (23 lines) - **SIMPLE** - Basic grid layout
- `StatsCard.tsx` (52 lines) - **SIMPLE** - Individual stat display
- `FloatingSettingsButton.tsx` (33 lines) - **MINIMAL** - Settings access

### `/src/components/onboarding/` - Onboarding Flow

#### ✅ ACTIVELY USED
- `FirstRecipeFlow.tsx` - **CRITICAL** - First recipe import
- `URLScanningPathway.tsx` - **ACTIVE** - URL-based recipe import
- `ImageScanningPathway.tsx` - **ACTIVE** - Photo scanning
- `ManualEntryPathway.tsx` - **ACTIVE** - Manual recipe entry
- `PopularRecipeSelection.tsx` - **ACTIVE** - Popular recipe selection
- `ProfileSetupStep.tsx` - **ACTIVE** - User profile setup
- `DietaryPreferencesStep.tsx` - **ACTIVE** - Dietary preferences
- `CookingPreferencesStep.tsx` - **ACTIVE** - Cooking preferences
- `CategorySelectionStep.tsx` - **ACTIVE** - Category selection

### `/src/components/recipe-import/` - Recipe Import System

#### ✅ ACTIVELY USED
- `RecipeImportModal.tsx` - **CRITICAL** - Main import modal
- `SmartRecipeInput.tsx` - **ACTIVE** - Smart input handling
- `EnhancedPhotoUpload.tsx` - **ACTIVE** - Photo upload functionality

#### ✅ STEP COMPONENTS (All Active)
- `URLConfigurationStep.tsx` - URL import configuration
- `SinglePhotoConfigurationStep.tsx` - Single photo processing
- `MultiPhotoConfigurationStep.tsx` - Multiple photo processing
- `PhotoConfigurationStep.tsx` - General photo configuration
- `ProcessingStep.tsx` - Processing feedback

### `/src/components/welcome/` - Welcome Flow

#### ❓ QUESTIONABLE USAGE (Potential Redundancy)
- `WelcomeScreen.tsx` - **REVIEW** - May overlap with onboarding
- `QuickStartGuideScreen.tsx` - **REVIEW** - Quick start guide
- `OrganizationTipsScreen.tsx` - **REVIEW** - Organization tips
- `CategorizationGuideScreen.tsx` - **REVIEW** - Categorization guide
- `AppOverviewScreen.tsx` - **REVIEW** - App overview

**Analysis**: These welcome screens may be redundant with the onboarding flow. Consider consolidating.

### `/src/components/tour/` - Interactive Tours

#### ❓ UNCLEAR USAGE
- `TourTrigger.tsx` - **REVIEW** - Tour initiation
- `TourOverlay.tsx` - **REVIEW** - Tour overlay display

**Analysis**: Tour system is implemented but unclear if actively used in the main flow.

### `/src/components/admin/` - Admin Components

#### ❓ QUESTIONABLE USAGE
- Admin components exist but unclear if needed for current use case
- May be over-engineered for a personal recipe app

### `/src/hooks` - Custom Hooks

#### ✅ HIGH USAGE (Critical)
- `useHomePage.ts` (360 lines) - **CRITICAL** - Main page logic
- `useImageProcessingWithStreaming.ts` (300 lines) - **CRITICAL** - Image processing
- `useOnboardingStatus.ts` (205 lines) - **CRITICAL** - Onboarding state
- `useCategories.ts` (205 lines) - **CRITICAL** - Category management

#### ✅ MEDIUM USAGE (Active)
- `useMultipleImageProcessing.ts` (261 lines) - **ACTIVE** - Batch processing
- `useRetryableRequest.ts` (272 lines) - **ACTIVE** - Request retry logic
- `useRecipes.ts` (226 lines) - **ACTIVE** - Recipe data management
- `useCategoryInitialization.ts` (130 lines) - **ACTIVE** - Category setup
- `useCategorySuggestions.ts` (121 lines) - **ACTIVE** - Category suggestions
- `useRecipeOperations.ts` (104 lines) - **ACTIVE** - Recipe CRUD
- `useCategoryProcessing.ts` (102 lines) - **ACTIVE** - Category processing

#### ✅ LOW USAGE (Simple)
- `useSessionId.ts` (15 lines) - **SIMPLE** - Session management

### `/src/app/api` - API Routes

#### ✅ ACTIVELY USED (Core Functionality)
- `fetch-recipe/` - **CRITICAL** - URL recipe extraction
- `fetch-recipe-stream/` - **CRITICAL** - Streaming URL processing
- `scan-recipe/` - **CRITICAL** - Image recipe scanning
- `scan-recipe-stream/` - **CRITICAL** - Streaming image processing
- `scan-recipe-multiple/` - **ACTIVE** - Batch image processing
- `guest/scan-recipe/` - **ACTIVE** - Guest image scanning
- `guest/fetch-recipe/` - **ACTIVE** - Guest URL processing
- `categories/` - **CRITICAL** - Category management
- `recipes/` - **CRITICAL** - Recipe CRUD operations
- `onboarding/` - **CRITICAL** - Onboarding endpoints
- `user-preferences/` - **ACTIVE** - User preference management

#### ❓ QUESTIONABLE USAGE
- `admin/` - **REVIEW** - Admin functionality
  - `internal-analytics/`
  - `performance/`
  - `migrate-recipes/`
  - `orphaned-recipes/`
  - `auto-assign-categories/`
- `analytics/` - **REVIEW** - Analytics endpoints
  - `conversion-metrics/`
  - `extraction-metrics/`
- `migrate-guest-recipes/` - **UNCLEAR** - Guest migration
- `webhooks/clerk/` - **UNCLEAR** - Webhook handling

## 🎯 CLEANUP RECOMMENDATIONS

### High Priority (Remove/Consolidate)
1. **Welcome vs Onboarding** - Consolidate redundant welcome screens
2. **Admin Functionality** - Remove if not needed for personal use
3. **Complex Analytics** - Simplify analytics system
4. **Tour System** - Remove if not actively used

### Medium Priority (Review)
1. **Navbar Component** - Verify if navigation is needed
2. **Profile Page** - Consolidate with settings if redundant
3. **Greeting Screen** - Merge with onboarding
4. **Migration APIs** - Remove if one-time use completed

### Low Priority (Optimize)
1. **Large Components** - Split components over 400 lines
2. **Unused Imports** - Clean up import statements
3. **Simple Components** - Consider inlining very simple components

## 📊 SIZE ANALYSIS

### Largest Components (Potential Split Candidates)
1. `RecipeDisplay.tsx` - 578 lines
2. `GreetingScreen.tsx` - 391 lines  
3. `useHomePage.ts` - 360 lines
4. `OnboardingWizard.tsx` - 345 lines
5. `useImageProcessingWithStreaming.ts` - 300 lines

### Smallest Components (Potential Consolidation)
1. `useSessionId.ts` - 15 lines
2. `BentoGrid.tsx` - 23 lines
3. `FloatingSettingsButton.tsx` - 33 lines
4. `StatsCard.tsx` - 52 lines

## 🔍 USAGE CONFIDENCE LEVELS

### 🟢 HIGH CONFIDENCE (Definitely Used)
- Core recipe functionality
- Onboarding flow
- Authentication
- Category management
- Recipe import/scanning

### 🟡 MEDIUM CONFIDENCE (Likely Used)
- Settings page
- Statistics dashboard
- Recipe sharing
- User preferences

### 🔴 LOW CONFIDENCE (Questionable)
- Admin functionality
- Welcome screens (separate from onboarding)
- Tour system
- Complex analytics
- Migration endpoints

---

*Detailed analysis completed for codebase version: 100dee7* 