import NodeCache from 'node-cache';
import Redis from 'ioredis';

// Cache TTL configurations (in seconds)
export const CACHE_TTL = {
  CATEGORIES: 300, // 5 minutes for general categories
  USER_CATEGORIES: 3600, // 1 hour for user-specific categories
  CATEGORY_SUGGESTIONS: 1800, // 30 minutes for suggestions
  RECIPE_CATEGORIES: 600, // 10 minutes for recipe category mappings
} as const;

// Cache key prefixes
export const CACHE_KEYS = {
  CATEGORIES: 'categories',
  USER_CATEGORIES: 'user_categories',
  CATEGORY_SUGGESTIONS: 'category_suggestions',
  RECIPE_CATEGORIES: 'recipe_categories',
  CATEGORY_STATS: 'category_stats',
} as const;

// In-memory cache configuration
export const createInMemoryCache = () => {
  return new NodeCache({
    stdTTL: CACHE_TTL.CATEGORIES,
    checkperiod: 120, // Check for expired keys every 2 minutes
    useClones: false, // Better performance, but be careful with object mutations
    deleteOnExpire: true,
    enableLegacyCallbacks: false,
    maxKeys: 1000, // Limit memory usage
  });
};

// Redis configuration
export const createRedisClient = () => {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  
  const redis = new Redis(redisUrl);

  // Error handling
  redis.on('error', (error) => {
    console.error('Redis connection error:', error);
  });

  redis.on('connect', () => {
    console.log('Redis connected successfully');
  });

  redis.on('ready', () => {
    console.log('Redis ready for operations');
  });

  return redis;
};

// Cache key generators
export const generateCacheKey = (prefix: string, ...parts: (string | number)[]): string => {
  return `${prefix}:${parts.join(':')}`;
};

// Environment-based cache configuration
export const getCacheConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    useRedis: isProduction || process.env.USE_REDIS === 'true',
    useInMemory: isDevelopment || process.env.USE_IN_MEMORY_CACHE === 'true',
    enableCaching: process.env.DISABLE_CACHING !== 'true',
  };
};

// Cache metrics interface
export interface CacheMetrics {
  hits: number;
  misses: number;
  sets: number;
  deletes: number;
  errors: number;
  totalOperations: number;
  hitRate: number;
}

// Initialize metrics
export const createCacheMetrics = (): CacheMetrics => ({
  hits: 0,
  misses: 0,
  sets: 0,
  deletes: 0,
  errors: 0,
  totalOperations: 0,
  hitRate: 0,
}); 