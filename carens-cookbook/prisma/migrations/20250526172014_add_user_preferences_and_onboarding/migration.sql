-- CreateEnum
CREATE TYPE "CookingSkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "DietaryPreference" AS ENUM ('NONE', 'VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'DAIRY_FREE', 'KETO', 'PALEO', 'LOW_CARB', 'LOW_SODIUM', 'NUT_FREE', 'KOSHER', 'HALAL');

-- CreateEnum
CREATE TYPE "ProcessingMethod" AS ENUM ('OPENAI', 'GEMINI');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cookingSkillLevel" "CookingSkillLevel",
ADD COLUMN     "defaultProcessingMethod" "ProcessingMethod" NOT NULL DEFAULT 'OPENAI',
ADD COLUMN     "dietaryPreferences" "DietaryPreference"[],
ADD COLUMN     "favoriteCuisines" TEXT[],
ADD COLUMN     "householdSize" INTEGER,
ADD COLUMN     "measurementSystem" TEXT,
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingStep" INTEGER,
ADD COLUMN     "preferredCategories" TEXT[],
ADD COLUMN     "timezone" TEXT;
