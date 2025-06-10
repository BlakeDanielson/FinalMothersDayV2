-- CreateEnum
CREATE TYPE "ExtractionStrategy" AS ENUM ('URL_DIRECT', 'HTML_FALLBACK');

-- CreateEnum
CREATE TYPE "AIProvider" AS ENUM ('OPENAI_MINI', 'OPENAI_MAIN', 'GEMINI_MAIN', 'GEMINI_FLASH');

-- DropIndex
DROP INDEX "Recipe_ingredients_gin_idx";

-- DropIndex
DROP INDEX "Recipe_userId_category_id_idx";

-- DropIndex
DROP INDEX "Recipe_userId_createdAt_idx";

-- DropIndex
DROP INDEX "RecipeFavorite_userId_createdAt_idx";

-- DropIndex
DROP INDEX "UserOnboardingProgress_userId_stepKey_idx";

-- CreateTable
CREATE TABLE "RecipeExtractionMetrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeUrl" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "requestTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "primaryStrategy" "ExtractionStrategy" NOT NULL,
    "aiProvider" "AIProvider" NOT NULL,
    "fallbackUsed" BOOLEAN NOT NULL DEFAULT false,
    "fallbackReason" TEXT,
    "totalDuration" INTEGER NOT NULL,
    "htmlFetchDuration" INTEGER,
    "aiProcessingDuration" INTEGER NOT NULL,
    "validationDuration" INTEGER,
    "databaseSaveDuration" INTEGER,
    "htmlContentSize" INTEGER,
    "cleanedContentSize" INTEGER,
    "promptTokens" INTEGER,
    "responseTokens" INTEGER,
    "totalTokens" INTEGER,
    "extractionSuccess" BOOLEAN NOT NULL,
    "validationErrors" JSONB,
    "missingFields" TEXT[],
    "completenessScore" DOUBLE PRECISION,
    "categoryConfidence" DOUBLE PRECISION,
    "hasStructuredData" BOOLEAN,
    "estimatedCost" DOUBLE PRECISION,
    "recipeId" TEXT,
    "wasOptimal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipeExtractionMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainPerformanceMetrics" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "totalExtractions" INTEGER NOT NULL DEFAULT 0,
    "successfulExtractions" INTEGER NOT NULL DEFAULT 0,
    "averageExtractTime" INTEGER,
    "averageTokens" INTEGER,
    "averageCost" DOUBLE PRECISION,
    "optimalStrategy" "ExtractionStrategy",
    "optimalProvider" "AIProvider",
    "averageCompleteness" DOUBLE PRECISION,
    "hasStructuredDataPct" DOUBLE PRECISION,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DomainPerformanceMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIProviderCosts" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "inputTokenCost" DOUBLE PRECISION NOT NULL,
    "outputTokenCost" DOUBLE PRECISION NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIProviderCosts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_userId_idx" ON "RecipeExtractionMetrics"("userId");

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_domain_idx" ON "RecipeExtractionMetrics"("domain");

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_aiProvider_idx" ON "RecipeExtractionMetrics"("aiProvider");

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_primaryStrategy_idx" ON "RecipeExtractionMetrics"("primaryStrategy");

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_extractionSuccess_idx" ON "RecipeExtractionMetrics"("extractionSuccess");

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_requestTimestamp_idx" ON "RecipeExtractionMetrics"("requestTimestamp");

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_userId_requestTimestamp_idx" ON "RecipeExtractionMetrics"("userId", "requestTimestamp");

-- CreateIndex
CREATE INDEX "RecipeExtractionMetrics_domain_extractionSuccess_idx" ON "RecipeExtractionMetrics"("domain", "extractionSuccess");

-- CreateIndex
CREATE UNIQUE INDEX "DomainPerformanceMetrics_domain_key" ON "DomainPerformanceMetrics"("domain");

-- CreateIndex
CREATE INDEX "DomainPerformanceMetrics_domain_idx" ON "DomainPerformanceMetrics"("domain");

-- CreateIndex
CREATE INDEX "DomainPerformanceMetrics_totalExtractions_idx" ON "DomainPerformanceMetrics"("totalExtractions");

-- CreateIndex
CREATE INDEX "DomainPerformanceMetrics_lastUpdated_idx" ON "DomainPerformanceMetrics"("lastUpdated");

-- CreateIndex
CREATE INDEX "AIProviderCosts_provider_model_idx" ON "AIProviderCosts"("provider", "model");

-- CreateIndex
CREATE INDEX "AIProviderCosts_effectiveDate_idx" ON "AIProviderCosts"("effectiveDate");

-- AddForeignKey
ALTER TABLE "RecipeExtractionMetrics" ADD CONSTRAINT "RecipeExtractionMetrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeExtractionMetrics" ADD CONSTRAINT "RecipeExtractionMetrics_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
