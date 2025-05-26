# Recipe App Onboarding Flow

## Overview
A comprehensive onboarding process designed to help users get maximum value from the recipe app quickly while setting up their preferences and understanding core functionality.

## Proposed Onboarding Flow

### 1. **Welcome & App Overview**
- Brief intro to what the app does
- Key benefits (organize recipes, scan from URLs, categorize, etc.)
- Quick preview of main features

### 2. **Profile Setup**
- Display name/username
- Dietary preferences/restrictions (vegetarian, vegan, gluten-free, etc.)
- Cooking skill level (beginner, intermediate, advanced)
- Favorite cuisines
- Household size (affects serving size preferences)

### 3. **Category Management** ⭐ (Priority Feature)
- Show all default categories with descriptions
- Allow users to:
  - ✅ Accept default categories
  - ✏️ Edit category names
  - ➕ Add custom categories
  - 🗑️ Remove unwanted categories
- Maybe group by type (Meal Type, Cuisine, Dietary, Occasion, etc.)

### 4. **Recipe Import Preferences**
- Default processing method (OpenAI vs Gemini)
- Auto-categorization preferences
- Image handling preferences
- What to do with duplicate recipes

### 5. **Feature Tour**
- Interactive walkthrough of key features:
  - Adding recipes manually
  - Scanning from URLs
  - Using categories
  - Search functionality
  - Profile settings

### 6. **First Recipe Addition**
- Guided flow to add their first recipe
- Options:
  - Scan from a favorite recipe website
  - Enter a family recipe manually
  - Choose from suggested popular recipes
- This gives immediate value and familiarizes them with the core workflow

### 7. **Notification & Sharing Preferences**
- Email notifications for new features
- Privacy settings
- Sharing preferences (if you plan social features)

### 8. **Quick Start Tips**
- Best practices for organizing recipes
- Tips for effective categorization
- Keyboard shortcuts or power user features

## Implementation Considerations

### **Progressive Onboarding**
- Don't overwhelm users - maybe do core setup first, then introduce advanced features over time
- Save progress so users can complete in multiple sessions

### **Skip Options**
- Allow users to skip non-essential steps
- "Set up later" options for advanced features

### **Onboarding Analytics**
- Track where users drop off
- A/B test different flows

### **Sample Data**
- Maybe include a few sample recipes they can explore
- Show the app populated with data so it doesn't feel empty

## Technical Analysis: What Exists vs What Needs Building

### ✅ **Already Built & Ready to Use:**
1. **Authentication System** - Clerk integration is fully set up
2. **Categories Infrastructure**:
   - Predefined categories defined in `PREDEFINED_CATEGORIES` (18 categories)
   - Category metadata with descriptions and aliases
   - API endpoint for getting categories (`/api/categories`)
   - Category management APIs (delete, merge, rename)
3. **Recipe System**:
   - Full recipe CRUD operations
   - Recipe scanning from URLs (`/api/fetch-recipe`)
   - Multiple processing methods (OpenAI/Gemini)
   - Image handling
4. **Database Schema**:
   - User table with Clerk integration
   - Recipe table with category tracking
   - Category source tracking (predefined, AI, user-created)
   - Recipe favorites system
5. **Basic Profile Page** - Shows user info and stats

### ⚠️ **Partially Built - Needs Extension:**
1. **User Preferences** - Basic user model exists, but needs fields for:
   - Dietary preferences
   - Cooking skill level
   - Favorite cuisines
   - Household size
   - Default processing method
   - Onboarding completion status

### ❌ **Needs to be Built:**
1. **Onboarding Flow Components**:
   - Welcome wizard component
   - Step-by-step progress indicator
   - Category selection/customization interface
   - Preferences setup forms
   - Interactive feature tour
   - First recipe addition flow

2. **Database Extensions**:
   - User preferences table/fields
   - Onboarding progress tracking
   - User-specific category preferences

3. **API Endpoints**:
   - User preferences management (`/api/user/preferences`)
   - Onboarding progress tracking (`/api/user/onboarding`)
   - Category initialization for new users

4. **UI Components**:
   - Onboarding wizard wrapper
   - Category management interface
   - Progress indicators
   - Tour overlay components
   - Guided recipe addition flow

## Priority Build Order

### Phase 1: Core Onboarding Infrastructure
1. Extend User model with preference fields
2. Create user preferences API endpoints
3. Build basic onboarding wizard wrapper
4. Create onboarding progress tracking

### Phase 2: Category Management During Onboarding
1. Build category selection interface
2. Implement category customization (edit/add/remove)
3. Create category initialization flow for new users

### Phase 3: Guided First Experience
1. Build interactive feature tour
2. Create guided first recipe addition
3. Implement welcome flow and tips

### Phase 4: Enhanced Features
1. Add preference-based recommendations
2. Implement onboarding analytics
3. Add progressive onboarding features

## Development Estimates

- **Phase 1**: ~2-3 days (database + API foundation)
- **Phase 2**: ~3-4 days (category management UI)
- **Phase 3**: ~3-5 days (guided flows + tour)
- **Phase 4**: ~2-3 days (enhancements)

**Total**: ~10-15 days of development

## User Experience Goals
- Reduce time to first value
- Increase feature adoption
- Improve user retention
- Set up proper categorization from the start 