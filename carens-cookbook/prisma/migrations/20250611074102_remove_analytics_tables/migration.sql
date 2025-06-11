-- AlterTable
ALTER TABLE "AnonymousSession" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '90 days';

-- AlterTable
ALTER TABLE "ConversionEvent" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '90 days';
