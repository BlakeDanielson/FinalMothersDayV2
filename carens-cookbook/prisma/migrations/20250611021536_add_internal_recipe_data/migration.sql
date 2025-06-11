-- AlterTable
ALTER TABLE "AnonymousSession" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '90 days';

-- AlterTable
ALTER TABLE "ConversionEvent" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '90 days';

-- AlterTable
ALTER TABLE "RecipeExtractionMetrics" ADD COLUMN     "sessionId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "InternalRecipeData" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "steps" TEXT[],
    "image" TEXT,
    "cuisine" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "prepTime" TEXT NOT NULL,
    "cleanupTime" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "extractedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "sessionId" TEXT,
    "extractionStrategy" "ExtractionStrategy" NOT NULL,
    "aiProvider" "AIProvider" NOT NULL,
    "fallbackUsed" BOOLEAN NOT NULL DEFAULT false,
    "processingTimeMs" INTEGER NOT NULL,
    "tokenCount" INTEGER,
    "estimatedCost" DOUBLE PRECISION,
    "categoryConfidence" DOUBLE PRECISION,
    "completenessScore" DOUBLE PRECISION,
    "hasStructuredData" BOOLEAN,
    "validationErrors" JSONB,
    "recipeComplexity" TEXT,
    "estimatedCookTime" INTEGER,
    "ingredientCount" INTEGER,
    "stepCount" INTEGER,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '365 days',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternalRecipeData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InternalRecipeData_domain_idx" ON "InternalRecipeData"("domain");

-- CreateIndex
CREATE INDEX "InternalRecipeData_extractedAt_idx" ON "InternalRecipeData"("extractedAt");

-- CreateIndex
CREATE INDEX "InternalRecipeData_userId_idx" ON "InternalRecipeData"("userId");

-- CreateIndex
CREATE INDEX "InternalRecipeData_sessionId_idx" ON "InternalRecipeData"("sessionId");

-- CreateIndex
CREATE INDEX "InternalRecipeData_aiProvider_idx" ON "InternalRecipeData"("aiProvider");

-- CreateIndex
CREATE INDEX "InternalRecipeData_extractionStrategy_idx" ON "InternalRecipeData"("extractionStrategy");

-- CreateIndex
CREATE INDEX "InternalRecipeData_category_idx" ON "InternalRecipeData"("category");

-- CreateIndex
CREATE INDEX "InternalRecipeData_cuisine_idx" ON "InternalRecipeData"("cuisine");

-- CreateIndex
CREATE INDEX "InternalRecipeData_domain_extractedAt_idx" ON "InternalRecipeData"("domain", "extractedAt");

-- CreateIndex
CREATE INDEX "InternalRecipeData_expiresAt_idx" ON "InternalRecipeData"("expiresAt");
