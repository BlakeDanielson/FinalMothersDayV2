# Refactoring Plan - Code Size Optimization Project

## Executive Summary
**Objective**: Refactor 9 files that exceed the 500-line coding standard limit to improve maintainability, readability, and testability.

**Total Lines to Refactor**: ~6,236 lines across 9 files  
**Target**: Break down each file to ≤500 lines through modular design patterns

## Files Requiring Refactoring (Priority Order)

### 🔴 **Critical Priority - Largest Files**

#### 1. **FirstRecipeFlow.tsx** - 1,202 lines ⚠️ CRITICAL
- **Location**: `src/components/onboarding/FirstRecipeFlow.tsx`
- **Complexity**: Extremely High - 140% over limit
- **Impact**: Core onboarding experience
- **Dependencies**: Recipe import system, onboarding workflow

#### 2. **CategorySelectionStep.tsx** - 890 lines  
- **Location**: `src/components/onboarding/CategorySelectionStep.tsx`
- **Complexity**: High - 78% over limit
- **Impact**: Critical onboarding step
- **Dependencies**: Category management, user preferences

#### 3. **PopularRecipeSelection.tsx** - 739 lines
- **Location**: `src/components/onboarding/PopularRecipeSelection.tsx` 
- **Complexity**: High - 48% over limit
- **Impact**: User engagement, recipe discovery
- **Dependencies**: Recipe data, AI services

### 🟡 **High Priority - Medium-Large Files**

#### 4. **ManualEntryPathway.tsx** - 693 lines
- **Location**: `src/components/onboarding/ManualEntryPathway.tsx`
- **Complexity**: Medium-High - 39% over limit
- **Impact**: Alternative recipe entry method
- **Dependencies**: Recipe validation, form handling

#### 5. **useHomePage.ts** - 561 lines
- **Location**: `src/hooks/useHomePage.ts`
- **Complexity**: Medium-High - 12% over limit
- **Impact**: Core home page functionality
- **Dependencies**: Recipe management, state management

#### 6. **scan-recipe/route.ts** - 560 lines
- **Location**: `src/app/api/scan-recipe/route.ts`
- **Complexity**: Medium-High - 12% over limit  
- **Impact**: Photo-based recipe extraction API
- **Dependencies**: AI services, image processing

### 🟢 **Medium Priority - Slightly Over Limit**

#### 7. **RecipeDisplay.tsx** - 542 lines
- **Location**: `src/components/RecipeDisplay.tsx`
- **Complexity**: Medium - 8% over limit
- **Impact**: Recipe viewing experience
- **Dependencies**: Recipe data display, formatting

#### 8. **CategoryManager.tsx** - 527 lines
- **Location**: `src/components/CategoryManager.tsx`
- **Complexity**: Medium - 5% over limit
- **Impact**: Category organization features
- **Dependencies**: Category CRUD operations

#### 9. **EnhancedPhotoUpload.tsx** - 522 lines
- **Location**: `src/components/recipe-import/EnhancedPhotoUpload.tsx`
- **Complexity**: Medium - 4% over limit
- **Impact**: Photo upload functionality
- **Dependencies**: Image processing, file handling

## Refactoring Strategy Framework

### 🎯 **Decomposition Patterns**

#### **Component Splitting Strategy**
1. **Feature-Based Decomposition**: Split by functional responsibility
2. **UI Layer Separation**: Extract display logic from business logic
3. **Hook Extraction**: Move complex state logic to custom hooks
4. **Utility Functions**: Create shared utility modules
5. **Sub-Component Creation**: Break down large components into composable parts

#### **API Route Optimization**
1. **Service Layer Extraction**: Move business logic to service modules
2. **Validation Splitting**: Separate schema validation into modules
3. **Error Handling Centralization**: Create shared error handling utilities
4. **Response Formatting**: Extract response formatting logic

### 📋 **Phase-by-Phase Execution Plan**

## **Phase 1: Critical Components (Weeks 1-2)**
*Target: FirstRecipeFlow.tsx and CategorySelectionStep.tsx*

### **1.1 FirstRecipeFlow.tsx Breakdown**
**Target Structure**:
```
FirstRecipeFlow.tsx (≤150 lines) - Main orchestrator
├── components/
│   ├── RecipeImportSection.tsx (≤200 lines)
│   ├── PreviewSection.tsx (≤150 lines)
│   ├── CategoryAssignmentStep.tsx (≤200 lines)
│   └── CompletionSection.tsx (≤100 lines)
├── hooks/
│   ├── useFirstRecipeFlow.ts (≤150 lines)
│   ├── useRecipeImport.ts (≤100 lines)
│   └── useCategoryAssignment.ts (≤100 lines)
└── utils/
    ├── recipeValidation.ts (≤100 lines)
    └── flowNavigation.ts (≤80 lines)
```

**Decomposition Steps**:
1. Extract recipe import logic → `RecipeImportSection.tsx`
2. Move preview functionality → `PreviewSection.tsx`  
3. Split category assignment → `CategoryAssignmentStep.tsx`
4. Create completion flow → `CompletionSection.tsx`
5. Extract state management → `useFirstRecipeFlow.ts`
6. Create specialized hooks → `useRecipeImport.ts`, `useCategoryAssignment.ts`
7. Move utility functions → `recipeValidation.ts`, `flowNavigation.ts`

### **1.2 CategorySelectionStep.tsx Breakdown**
**Target Structure**:
```
CategorySelectionStep.tsx (≤150 lines) - Main container
├── components/
│   ├── CategoryGrid.tsx (≤200 lines)
│   ├── CategoryCard.tsx (≤100 lines)
│   ├── CategorySearch.tsx (≤150 lines)
│   └── CustomCategoryForm.tsx (≤150 lines)
├── hooks/
│   ├── useCategorySelection.ts (≤150 lines)
│   └── useCategorySearch.ts (≤100 lines)
└── utils/
    └── categoryUtils.ts (≤100 lines)
```

## **Phase 2: Medium-Large Components (Weeks 3-4)**
*Target: PopularRecipeSelection.tsx and ManualEntryPathway.tsx*

### **2.1 PopularRecipeSelection.tsx Breakdown**
**Target Structure**:
```
PopularRecipeSelection.tsx (≤150 lines)
├── components/
│   ├── RecipeGrid.tsx (≤200 lines)
│   ├── RecipeCard.tsx (≤150 lines)
│   └── FilterSection.tsx (≤100 lines)
├── hooks/
│   ├── usePopularRecipes.ts (≤150 lines)
│   └── useRecipeFiltering.ts (≤100 lines)
└── utils/
    └── recipeFiltering.ts (≤80 lines)
```

### **2.2 ManualEntryPathway.tsx Breakdown**
**Target Structure**:
```
ManualEntryPathway.tsx (≤150 lines)
├── components/
│   ├── RecipeForm.tsx (≤200 lines)
│   ├── IngredientsList.tsx (≤150 lines)
│   └── StepsList.tsx (≤150 lines)
├── hooks/
│   └── useManualRecipeEntry.ts (≤150 lines)
└── utils/
    └── formValidation.ts (≤100 lines)
```

## **Phase 3: Core Logic & API (Week 5)**
*Target: useHomePage.ts and scan-recipe/route.ts*

### **3.1 useHomePage.ts Breakdown**
**Target Structure**:
```
useHomePage.ts (≤150 lines) - Main hook orchestrator
├── hooks/
│   ├── useRecipeManagement.ts (≤150 lines)
│   ├── useCategoryManagement.ts (≤100 lines)
│   ├── useImportHandlers.ts (≤100 lines)
│   └── useHomePageState.ts (≤100 lines)
└── services/
    └── homePageService.ts (≤100 lines)
```

### **3.2 scan-recipe/route.ts Breakdown**
**Target Structure**:
```
route.ts (≤150 lines) - API endpoint handler
├── services/
│   ├── imageProcessingService.ts (≤150 lines)
│   ├── recipeExtractionService.ts (≤150 lines)
│   └── validationService.ts (≤100 lines)
└── utils/
    ├── imageUtils.ts (≤100 lines)
    └── responseUtils.ts (≤80 lines)
```

## **Phase 4: Display Components (Week 6)**
*Target: RecipeDisplay.tsx, CategoryManager.tsx, EnhancedPhotoUpload.tsx*

### **4.1 RecipeDisplay.tsx Breakdown**
**Target Structure**:
```
RecipeDisplay.tsx (≤150 lines)
├── components/
│   ├── RecipeHeader.tsx (≤100 lines)
│   ├── RecipeIngredients.tsx (≤100 lines)
│   ├── RecipeInstructions.tsx (≤100 lines)
│   └── RecipeActions.tsx (≤100 lines)
└── hooks/
    └── useRecipeDisplay.ts (≤100 lines)
```

### **4.2 CategoryManager.tsx Breakdown**
**Target Structure**:
```
CategoryManager.tsx (≤150 lines)
├── components/
│   ├── CategoryList.tsx (≤150 lines)
│   ├── CategoryForm.tsx (≤100 lines)
│   └── CategoryActions.tsx (≤100 lines)
└── hooks/
    └── useCategoryManager.ts (≤100 lines)
```

### **4.3 EnhancedPhotoUpload.tsx Breakdown**
**Target Structure**:
```
EnhancedPhotoUpload.tsx (≤150 lines)
├── components/
│   ├── DropZone.tsx (≤100 lines)
│   ├── ImagePreview.tsx (≤100 lines)
│   └── UploadProgress.tsx (≤100 lines)
├── hooks/
│   └── usePhotoUpload.ts (≤100 lines)
└── utils/
    └── imageProcessing.ts (≤100 lines)
```

## **Implementation Guidelines**

### 🔧 **Technical Standards**
1. **File Size Limit**: Maximum 500 lines per file
2. **Function Complexity**: Maximum 50 lines per function
3. **Component Props**: Maximum 10 props per component
4. **Hook Dependencies**: Maximum 5 dependencies per useEffect
5. **Import Statements**: Group and organize by source (external, internal, relative)

### 📁 **Folder Structure Conventions**
```
src/
├── components/
│   ├── [feature]/
│   │   ├── index.ts (barrel exports)
│   │   ├── [MainComponent].tsx
│   │   ├── components/
│   │   │   ├── [SubComponent1].tsx
│   │   │   └── [SubComponent2].tsx
│   │   ├── hooks/
│   │   │   └── use[Feature].ts
│   │   └── utils/
│   │       └── [feature]Utils.ts
```

### 🧪 **Testing Strategy**
1. **Unit Tests**: Test extracted utilities and hooks independently
2. **Component Tests**: Test components in isolation with mock data
3. **Integration Tests**: Test feature workflows end-to-end
4. **Regression Tests**: Ensure refactoring doesn't break existing functionality

### 📊 **Success Metrics**
- ✅ All files ≤500 lines
- ✅ Improved test coverage (target: >80%)
- ✅ Reduced cyclomatic complexity
- ✅ Better separation of concerns
- ✅ Improved reusability of components
- ✅ No functional regressions
- ✅ Maintained or improved performance

## **Quality Assurance Checklist**

### **Before Each Refactoring**
- [ ] Create feature branch: `refactor/[component-name]`
- [ ] Document current behavior and dependencies
- [ ] Identify reusable logic for extraction
- [ ] Plan component hierarchy and data flow

### **During Refactoring**
- [ ] Maintain TypeScript strict mode compliance
- [ ] Preserve all existing functionality
- [ ] Add JSDoc comments for complex logic
- [ ] Ensure proper error handling
- [ ] Test extracted components independently

### **After Each Refactoring**
- [ ] Verify file size compliance (≤500 lines)
- [ ] Run full test suite
- [ ] Check for any regressions
- [ ] Update documentation
- [ ] Create pull request for review

## **Risk Mitigation**

### **Technical Risks**
1. **Breaking Changes**: Maintain interface compatibility during refactoring
2. **Performance Impact**: Monitor bundle size and runtime performance  
3. **State Management**: Ensure proper state flow in extracted components
4. **Type Safety**: Maintain strict TypeScript compliance

### **Process Risks**
1. **Scope Creep**: Focus only on size reduction, not feature changes
2. **Over-Engineering**: Keep solutions simple and focused
3. **Testing Gaps**: Ensure comprehensive test coverage throughout
4. **Integration Issues**: Test component integration thoroughly

## **Timeline Summary**
- **Week 1-2**: Critical components (FirstRecipeFlow, CategorySelectionStep)
- **Week 3-4**: Medium-large components (PopularRecipeSelection, ManualEntryPathway)  
- **Week 5**: Core logic & API (useHomePage, scan-recipe/route)
- **Week 6**: Display components (RecipeDisplay, CategoryManager, EnhancedPhotoUpload)
- **Week 7**: Final testing, documentation, and cleanup

**Total Estimated Effort**: 7 weeks
**Target Completion**: All 9 files refactored to ≤500 lines with maintained functionality

---

*This plan serves as the living document for our refactoring project. Update progress and adjust timeline as needed during implementation.* 