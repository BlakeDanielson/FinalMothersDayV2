/*
  Warnings:

  - You are about to drop the `AIProviderCosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnonymousSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ConversionEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyRateLimit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DomainPerformanceMetrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InternalRecipeData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipeExtractionMetrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RecipeExtractionMetrics" DROP CONSTRAINT "RecipeExtractionMetrics_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeExtractionMetrics" DROP CONSTRAINT "RecipeExtractionMetrics_userId_fkey";

-- DropTable
DROP TABLE "AIProviderCosts";

-- DropTable
DROP TABLE "AnonymousSession";

-- DropTable
DROP TABLE "ConversionEvent";

-- DropTable
DROP TABLE "DailyRateLimit";

-- DropTable
DROP TABLE "DomainPerformanceMetrics";

-- DropTable
DROP TABLE "InternalRecipeData";

-- DropTable
DROP TABLE "RecipeExtractionMetrics";

-- DropEnum
DROP TYPE "ConversionEventType";
