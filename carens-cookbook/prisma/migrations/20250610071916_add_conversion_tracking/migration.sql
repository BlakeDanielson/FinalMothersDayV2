-- CreateEnum
CREATE TYPE "ConversionEventType" AS ENUM ('SESSION_STARTED', 'RECIPE_EXTRACTED', 'RATE_LIMIT_HIT', 'SIGNUP_PROMPT_SHOWN', 'SIGNUP_CLICKED', 'SIGNUP_COMPLETED', 'RECIPE_SAVE_ATTEMPTED', 'FEATURE_INTERACTION');

-- CreateTable
CREATE TABLE "AnonymousSession" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "deviceType" TEXT,
    "operatingSystem" TEXT,
    "browser" TEXT,
    "screenResolution" TEXT,
    "timezone" TEXT,
    "language" TEXT,
    "firstSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalRecipeAttempts" INTEGER NOT NULL DEFAULT 0,
    "totalSuccessfulExtractions" INTEGER NOT NULL DEFAULT 0,
    "hitRateLimit" BOOLEAN NOT NULL DEFAULT false,
    "rateLimitHitAt" TIMESTAMP(3),
    "showedSignupPrompt" BOOLEAN NOT NULL DEFAULT false,
    "signupPromptShownAt" TIMESTAMP(3),
    "convertedToUser" BOOLEAN NOT NULL DEFAULT false,
    "convertedUserId" TEXT,
    "convertedAt" TIMESTAMP(3),
    "referrerDomain" TEXT,
    "countryCode" TEXT,
    "cityName" TEXT,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '90 days',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnonymousSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversionEvent" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "eventType" "ConversionEventType" NOT NULL,
    "eventData" JSONB,
    "recipeUrl" TEXT,
    "pageUrl" TEXT,
    "sessionDuration" INTEGER,
    "expiresAt" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '90 days',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversionEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyRateLimit" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "identifierType" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "requestCount" INTEGER NOT NULL DEFAULT 0,
    "lastRequestAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyRateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnonymousSession_sessionId_key" ON "AnonymousSession"("sessionId");

-- CreateIndex
CREATE INDEX "AnonymousSession_sessionId_idx" ON "AnonymousSession"("sessionId");

-- CreateIndex
CREATE INDEX "AnonymousSession_ipAddress_idx" ON "AnonymousSession"("ipAddress");

-- CreateIndex
CREATE INDEX "AnonymousSession_firstSeenAt_idx" ON "AnonymousSession"("firstSeenAt");

-- CreateIndex
CREATE INDEX "AnonymousSession_convertedToUser_idx" ON "AnonymousSession"("convertedToUser");

-- CreateIndex
CREATE INDEX "AnonymousSession_expiresAt_idx" ON "AnonymousSession"("expiresAt");

-- CreateIndex
CREATE INDEX "AnonymousSession_hitRateLimit_idx" ON "AnonymousSession"("hitRateLimit");

-- CreateIndex
CREATE INDEX "ConversionEvent_sessionId_idx" ON "ConversionEvent"("sessionId");

-- CreateIndex
CREATE INDEX "ConversionEvent_eventType_idx" ON "ConversionEvent"("eventType");

-- CreateIndex
CREATE INDEX "ConversionEvent_userId_idx" ON "ConversionEvent"("userId");

-- CreateIndex
CREATE INDEX "ConversionEvent_createdAt_idx" ON "ConversionEvent"("createdAt");

-- CreateIndex
CREATE INDEX "ConversionEvent_expiresAt_idx" ON "ConversionEvent"("expiresAt");

-- CreateIndex
CREATE INDEX "DailyRateLimit_date_idx" ON "DailyRateLimit"("date");

-- CreateIndex
CREATE INDEX "DailyRateLimit_identifier_identifierType_idx" ON "DailyRateLimit"("identifier", "identifierType");

-- CreateIndex
CREATE UNIQUE INDEX "DailyRateLimit_identifier_identifierType_date_key" ON "DailyRateLimit"("identifier", "identifierType", "date");
