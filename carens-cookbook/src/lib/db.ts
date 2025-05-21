import { PrismaClient } from '@/generated/prisma';

declare global {
  // eslint-disable-next-line no-var -- Allow var for global prisma instance for HMR
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma || // Use globalThis for accessing/setting the global instance
  new PrismaClient({
    // Optional: Add logging configuration if needed during development
    // log: ['query', 'info', 'warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma; // Use globalThis 