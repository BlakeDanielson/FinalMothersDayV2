-- Add performance indexes for category-related queries

-- Index for category groupBy queries (most common operation)
CREATE INDEX IF NOT EXISTS "Recipe_userId_category_id_idx" ON "Recipe"("userId", "category", "id");

-- Index for category confidence queries
CREATE INDEX IF NOT EXISTS "Recipe_categoryConfidence_idx" ON "Recipe"("categoryConfidence") WHERE "categoryConfidence" IS NOT NULL;

-- Composite index for category analytics
CREATE INDEX IF NOT EXISTS "Recipe_categorySource_category_idx" ON "Recipe"("categorySource", "category") WHERE "categorySource" IS NOT NULL;

-- Index for user recipe counts (used in category stats)
CREATE INDEX IF NOT EXISTS "Recipe_userId_createdAt_idx" ON "Recipe"("userId", "createdAt");

-- Index for recipe favorites with user
CREATE INDEX IF NOT EXISTS "RecipeFavorite_userId_createdAt_idx" ON "RecipeFavorite"("userId", "createdAt");

-- Partial index for recipes with images
CREATE INDEX IF NOT EXISTS "Recipe_userId_image_idx" ON "Recipe"("userId") WHERE "image" IS NOT NULL;

-- Index for onboarding progress queries
CREATE INDEX IF NOT EXISTS "UserOnboardingProgress_userId_stepKey_idx" ON "UserOnboardingProgress"("userId", "stepKey");

-- Index for recipe search by title (for future search functionality)
CREATE INDEX IF NOT EXISTS "Recipe_title_gin_idx" ON "Recipe" USING gin(to_tsvector('english', "title"));

-- Index for recipe search by ingredients (for future search functionality)  
CREATE INDEX IF NOT EXISTS "Recipe_ingredients_gin_idx" ON "Recipe" USING gin("ingredients");

-- Update statistics after index creation
ANALYZE "Recipe";
ANALYZE "RecipeFavorite";
ANALYZE "UserOnboardingProgress"; 