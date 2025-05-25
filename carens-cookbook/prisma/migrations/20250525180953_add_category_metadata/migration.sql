-- CreateEnum
CREATE TYPE "CategorySource" AS ENUM ('PREDEFINED', 'AI_GENERATED', 'USER_CREATED');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "categoryConfidence" DOUBLE PRECISION,
ADD COLUMN     "categorySource" "CategorySource",
ADD COLUMN     "originalCategory" TEXT;

-- CreateTable
CREATE TABLE "RecipeImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "RecipeImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecipeImage_recipeId_idx" ON "RecipeImage"("recipeId");

-- CreateIndex
CREATE INDEX "RecipeImage_recipeId_order_idx" ON "RecipeImage"("recipeId", "order");

-- CreateIndex
CREATE INDEX "Recipe_userId_category_idx" ON "Recipe"("userId", "category");

-- CreateIndex
CREATE INDEX "Recipe_categorySource_idx" ON "Recipe"("categorySource");

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
