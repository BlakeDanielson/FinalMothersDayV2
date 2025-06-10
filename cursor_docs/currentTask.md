# Current Task - Code Size Refactoring Project

## Current Status: 🚀 **READY TO START PHASE 1**

### **Objective**: Code Size Optimization Refactoring
**Goal**: Refactor 9 files that exceed the 500-line coding standard to improve maintainability, readability, and testability.

**Reference Document**: [refactoringPlan.md](refactoringPlan.md) - Complete project roadmap and execution strategy

### **Files Requiring Immediate Attention** (Priority Order)
1. **🔴 FirstRecipeFlow.tsx** - 1,202 lines (140% over limit) ⚠️ CRITICAL
2. **🔴 CategorySelectionStep.tsx** - 890 lines (78% over limit)  
3. **🔴 PopularRecipeSelection.tsx** - 739 lines (48% over limit)
4. **🟡 ManualEntryPathway.tsx** - 693 lines (39% over limit)
5. **🟡 useHomePage.ts** - 561 lines (12% over limit)
6. **🟡 scan-recipe/route.ts** - 560 lines (12% over limit)
7. **🟢 RecipeDisplay.tsx** - 542 lines (8% over limit)
8. **🟢 CategoryManager.tsx** - 527 lines (5% over limit)
9. **🟢 EnhancedPhotoUpload.tsx** - 522 lines (4% over limit)

### **Next Immediate Actions**
1. **Start with FirstRecipeFlow.tsx** - Most critical file (1,202 lines)
2. **Create feature branch**: `refactor/first-recipe-flow`
3. **Analyze current structure** and identify decomposition points
4. **Begin extraction** of sub-components and hooks

## **Phase 1 Focus: Critical Components (Current Sprint)**
*Target: FirstRecipeFlow.tsx and CategorySelectionStep.tsx*

### **1.1 FirstRecipeFlow.tsx Refactoring** 
**Current Status**: Ready to begin
**Target**: Break down 1,202 lines into 7-8 smaller files (≤200 lines each)

**Planned Structure**:
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

## Context: Recent Completed Work

### ✅ **COMPLETED: Redesign Recipe Import Experience**
**Problem Solved:** Test users were confused by the modal interface with tabs for URL and photo import.

**Solution Implemented:** Created new SmartRecipeInput component with unified interface that auto-detects input type and eliminates decision fatigue.

### ✅ **COMPLETED: Fix Default Categories Loading Issue**
**Problem Solved:** Default categories didn't load for non-authenticated users.

**Solution Implemented:** Fixed the `useCategories` hook to use the correct API endpoint.

### ✅ **COMPLETED: Gemini API Optimization Implementation**
**Achievement:** Implemented Gemini URL-direct optimization with OpenAI fallback, achieving 99%+ efficiency gain in recipe extraction.

### Files Created/Modified Recently
- **New**: `SmartRecipeInput.tsx` (348 lines) - Unified recipe import interface
- **Modified**: `useCategories.ts` - Fixed default categories loading
- **New**: Recipe extraction orchestrator with performance optimizations
- **Enhanced**: API endpoints with comprehensive analytics

## Project Context from projectRoadmap.md

### **Current Project Status**: Mature & Stable
- ✅ All core features completed (AI recipe extraction, categorization, user management)
- ✅ Major UX improvements completed (SmartRecipeInput redesign)
- ✅ Performance optimizations implemented (Gemini API optimization)
- 🎯 **Next Focus**: Code quality and maintainability improvements

### **Refactoring Alignment with Project Goals**
- **Scalability**: Modular components support easier feature additions
- **Maintenance**: Smaller files are easier to debug and modify
- **Testing**: Extracted components can be tested independently
- **Team Development**: Smaller files reduce merge conflicts

## Technical Requirements

### **Refactoring Standards**
- **File Size Limit**: Maximum 500 lines per file
- **Function Complexity**: Maximum 50 lines per function  
- **Component Props**: Maximum 10 props per component
- **Hook Dependencies**: Maximum 5 dependencies per useEffect
- **Type Safety**: Maintain strict TypeScript compliance

### **Folder Structure** (to be implemented)
```
src/components/onboarding/
├── first-recipe-flow/
│   ├── index.ts (barrel exports)
│   ├── FirstRecipeFlow.tsx (main component)
│   ├── components/
│   │   ├── RecipeImportSection.tsx
│   │   ├── PreviewSection.tsx
│   │   ├── CategoryAssignmentStep.tsx
│   │   └── CompletionSection.tsx
│   ├── hooks/
│   │   ├── useFirstRecipeFlow.ts
│   │   ├── useRecipeImport.ts
│   │   └── useCategoryAssignment.ts
│   └── utils/
│       ├── recipeValidation.ts
│       └── flowNavigation.ts
```

## Success Criteria

### **Technical Metrics**
- ✅ All 9 files reduced to ≤500 lines
- ✅ No functional regressions  
- ✅ Maintained TypeScript strict compliance
- ✅ Improved test coverage (target: >80%)
- ✅ Better separation of concerns

### **Quality Improvements**
- ✅ Enhanced maintainability and readability
- ✅ Improved component reusability
- ✅ Reduced cyclomatic complexity
- ✅ Better error handling patterns

## Risk Management

### **Mitigation Strategies**
1. **Functional Preservation**: Maintain exact existing behavior during refactoring
2. **Incremental Approach**: Refactor one file at a time with full testing
3. **Interface Compatibility**: Preserve all existing component interfaces
4. **Comprehensive Testing**: Test extracted components independently and in integration

### **Monitoring Points**
- Bundle size impact
- Runtime performance
- Type checking compilation
- Test suite execution time

---

**Next Action**: Begin Phase 1 with FirstRecipeFlow.tsx analysis and decomposition planning.

*Reference the complete [refactoringPlan.md](refactoringPlan.md) for detailed breakdown strategies and timeline.* 