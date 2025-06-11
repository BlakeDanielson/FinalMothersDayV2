/*
  Warnings:

  - You are about to drop the column `category` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `categoryConfidence` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `cleanupTime` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `completenessScore` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `cuisine` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedCookTime` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedCost` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `fallbackUsed` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `hasStructuredData` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientCount` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `prepTime` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `processingTimeMs` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `recipeComplexity` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `stepCount` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `tokenCount` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `InternalRecipeData` table. All the data in the column will be lost.
  - You are about to drop the column `validationErrors` on the `InternalRecipeData` table. All the data in the column will be lost.
  - Added the required column `totalProcessingTimeMs` to the `InternalRecipeData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "InternalRecipeData_category_idx";

-- DropIndex
DROP INDEX "InternalRecipeData_cuisine_idx";

-- DropIndex
DROP INDEX "InternalRecipeData_domain_extractedAt_idx";

-- DropIndex
DROP INDEX "InternalRecipeData_expiresAt_idx";

-- DropIndex
DROP INDEX "InternalRecipeData_sessionId_idx";

-- DropIndex
DROP INDEX "InternalRecipeData_userId_idx";

-- AlterTable
ALTER TABLE "AnonymousSession" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '90 days';

-- AlterTable
ALTER TABLE "ConversionEvent" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '90 days';

-- AlterTable
ALTER TABLE "InternalRecipeData" DROP COLUMN "category",
DROP COLUMN "categoryConfidence",
DROP COLUMN "cleanupTime",
DROP COLUMN "completenessScore",
DROP COLUMN "cuisine",
DROP COLUMN "description",
DROP COLUMN "estimatedCookTime",
DROP COLUMN "estimatedCost",
DROP COLUMN "expiresAt",
DROP COLUMN "fallbackUsed",
DROP COLUMN "hasStructuredData",
DROP COLUMN "image",
DROP COLUMN "ingredientCount",
DROP COLUMN "ingredients",
DROP COLUMN "prepTime",
DROP COLUMN "processingTimeMs",
DROP COLUMN "recipeComplexity",
DROP COLUMN "sessionId",
DROP COLUMN "stepCount",
DROP COLUMN "steps",
DROP COLUMN "tokenCount",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "validationErrors",
ADD COLUMN     "aiTimeMs" INTEGER,
ADD COLUMN     "fetchTimeMs" INTEGER,
ADD COLUMN     "parseTimeMs" INTEGER,
ADD COLUMN     "totalProcessingTimeMs" INTEGER NOT NULL;
