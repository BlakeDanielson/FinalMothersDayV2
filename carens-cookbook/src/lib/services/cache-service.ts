import NodeCache from 'node-cache';
import Redis from 'ioredis';
import { 
  createInMemoryCache, 
  createRedisClient, 
  getCacheConfig, 
  CACHE_TTL, 
  CACHE_KEYS, 
  generateCacheKey,
  type CacheMetrics,
  createCacheMetrics
} from '../cache-config';
import { SuggestionResult } from './CategorySuggestionEngine';

// Cache service interface
export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<boolean>;
  delete(key: string): Promise<boolean>;
  clear(): Promise<boolean>;
  getMetrics(): CacheMetrics;
  disconnect(): Promise<void>;
}

// In-memory cache implementation
export class InMemoryCacheService implements ICacheService {
  private cache: NodeCache;
  private metrics: CacheMetrics;

  constructor() {
    this.cache = createInMemoryCache();
    this.metrics = createCacheMetrics();
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = this.cache.get<T>(key);
      this.metrics.totalOperations++;
      
      if (value !== undefined) {
        this.metrics.hits++;
      } else {
        this.metrics.misses++;
      }
      
      this.updateHitRate();
      return value || null;
    } catch (error) {
      this.metrics.errors++;
      console.error('InMemoryCache get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      const success = this.cache.set(key, value, ttl || CACHE_TTL.CATEGORIES);
      this.metrics.sets++;
      this.metrics.totalOperations++;
      this.updateHitRate();
      return success;
    } catch (error) {
      this.metrics.errors++;
      console.error('InMemoryCache set error:', error);
      return false;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const deleted = this.cache.del(key);
      this.metrics.deletes++;
      this.metrics.totalOperations++;
      this.updateHitRate();
      return deleted > 0;
    } catch (error) {
      this.metrics.errors++;
      console.error('InMemoryCache delete error:', error);
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      this.cache.flushAll();
      return true;
    } catch (error) {
      console.error('InMemoryCache clear error:', error);
      return false;
    }
  }

  getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  async disconnect(): Promise<void> {
    this.cache.close();
  }

  private updateHitRate(): void {
    const total = this.metrics.hits + this.metrics.misses;
    this.metrics.hitRate = total > 0 ? this.metrics.hits / total : 0;
  }
}

// Redis cache implementation
export class RedisCacheService implements ICacheService {
  private redis: Redis;
  private metrics: CacheMetrics;

  constructor() {
    this.redis = createRedisClient();
    this.metrics = createCacheMetrics();
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      this.metrics.totalOperations++;
      
      if (value !== null) {
        this.metrics.hits++;
        return JSON.parse(value) as T;
      } else {
        this.metrics.misses++;
        return null;
      }
    } catch (error) {
      this.metrics.errors++;
      console.error('Redis get error:', error);
      return null;
    } finally {
      this.updateHitRate();
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      const serializedValue = JSON.stringify(value);
      const result = ttl 
        ? await this.redis.setex(key, ttl, serializedValue)
        : await this.redis.set(key, serializedValue);
      
      this.metrics.sets++;
      this.metrics.totalOperations++;
      this.updateHitRate();
      return result === 'OK';
    } catch (error) {
      this.metrics.errors++;
      console.error('Redis set error:', error);
      return false;
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      const deleted = await this.redis.del(key);
      this.metrics.deletes++;
      this.metrics.totalOperations++;
      this.updateHitRate();
      return deleted > 0;
    } catch (error) {
      this.metrics.errors++;
      console.error('Redis delete error:', error);
      return false;
    }
  }

  async clear(): Promise<boolean> {
    try {
      await this.redis.flushdb();
      return true;
    } catch (error) {
      console.error('Redis clear error:', error);
      return false;
    }
  }

  getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  async disconnect(): Promise<void> {
    await this.redis.disconnect();
  }

  private updateHitRate(): void {
    const total = this.metrics.hits + this.metrics.misses;
    this.metrics.hitRate = total > 0 ? this.metrics.hits / total : 0;
  }
}

// Multi-tier cache service (L1: In-memory, L2: Redis)
export class MultiTierCacheService implements ICacheService {
  private l1Cache: InMemoryCacheService;
  private l2Cache: RedisCacheService;
  private metrics: CacheMetrics;

  constructor() {
    this.l1Cache = new InMemoryCacheService();
    this.l2Cache = new RedisCacheService();
    this.metrics = createCacheMetrics();
  }

  async get<T>(key: string): Promise<T | null> {
    this.metrics.totalOperations++;

    // Try L1 cache first
    const l1Value = await this.l1Cache.get<T>(key);
    if (l1Value !== null) {
      this.metrics.hits++;
      this.updateHitRate();
      return l1Value;
    }

    // Try L2 cache
    const l2Value = await this.l2Cache.get<T>(key);
    if (l2Value !== null) {
      // Populate L1 cache with L2 value
      await this.l1Cache.set(key, l2Value, CACHE_TTL.CATEGORIES);
      this.metrics.hits++;
      this.updateHitRate();
      return l2Value;
    }

    this.metrics.misses++;
    this.updateHitRate();
    return null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    this.metrics.sets++;
    this.metrics.totalOperations++;

    // Set in both caches
    const [l1Success, l2Success] = await Promise.all([
      this.l1Cache.set(key, value, ttl),
      this.l2Cache.set(key, value, ttl)
    ]);

    this.updateHitRate();
    return l1Success && l2Success;
  }

  async delete(key: string): Promise<boolean> {
    this.metrics.deletes++;
    this.metrics.totalOperations++;

    // Delete from both caches
    const [l1Success, l2Success] = await Promise.all([
      this.l1Cache.delete(key),
      this.l2Cache.delete(key)
    ]);

    this.updateHitRate();
    return l1Success || l2Success;
  }

  async clear(): Promise<boolean> {
    const [l1Success, l2Success] = await Promise.all([
      this.l1Cache.clear(),
      this.l2Cache.clear()
    ]);

    return l1Success && l2Success;
  }

  getMetrics(): CacheMetrics {
    const l1Metrics = this.l1Cache.getMetrics();
    const l2Metrics = this.l2Cache.getMetrics();

    return {
      hits: this.metrics.hits,
      misses: this.metrics.misses,
      sets: this.metrics.sets,
      deletes: this.metrics.deletes,
      errors: this.metrics.errors + l1Metrics.errors + l2Metrics.errors,
      totalOperations: this.metrics.totalOperations,
      hitRate: this.metrics.hitRate,
    };
  }

  async disconnect(): Promise<void> {
    await Promise.all([
      this.l1Cache.disconnect(),
      this.l2Cache.disconnect()
    ]);
  }

  private updateHitRate(): void {
    const total = this.metrics.hits + this.metrics.misses;
    this.metrics.hitRate = total > 0 ? this.metrics.hits / total : 0;
  }
}

// Cache factory
export class CacheServiceFactory {
  private static instance: ICacheService | null = null;

  static getInstance(): ICacheService {
    if (!this.instance) {
      const config = getCacheConfig();
      
      if (config.useRedis && config.useInMemory) {
        this.instance = new MultiTierCacheService();
      } else if (config.useRedis) {
        this.instance = new RedisCacheService();
      } else {
        this.instance = new InMemoryCacheService();
      }
    }

    return this.instance;
  }

  static reset(): void {
    if (this.instance) {
      this.instance.disconnect();
      this.instance = null;
    }
  }
}

// Convenience functions for specific cache operations
export const categoryCache = {
  async getCategories(userId?: string): Promise<Array<{ name: string; count: number }> | null> {
    const cache = CacheServiceFactory.getInstance();
    const key = userId 
      ? generateCacheKey(CACHE_KEYS.USER_CATEGORIES, userId)
      : generateCacheKey(CACHE_KEYS.CATEGORIES, 'all');
    
    return cache.get(key);
  },

  async setCategories(categories: Array<{ name: string; count: number }>, userId?: string, ttl?: number): Promise<boolean> {
    const cache = CacheServiceFactory.getInstance();
    const key = userId 
      ? generateCacheKey(CACHE_KEYS.USER_CATEGORIES, userId)
      : generateCacheKey(CACHE_KEYS.CATEGORIES, 'all');
    
    const cacheTtl = userId ? CACHE_TTL.USER_CATEGORIES : CACHE_TTL.CATEGORIES;
    return cache.set(key, categories, ttl || cacheTtl);
  },

  async invalidateCategories(userId?: string): Promise<boolean> {
    const cache = CacheServiceFactory.getInstance();
    const key = userId 
      ? generateCacheKey(CACHE_KEYS.USER_CATEGORIES, userId)
      : generateCacheKey(CACHE_KEYS.CATEGORIES, 'all');
    
    return cache.delete(key);
  },

  async getCategorySuggestions(query: string): Promise<SuggestionResult[] | null> {
    const cache = CacheServiceFactory.getInstance();
    const key = generateCacheKey(CACHE_KEYS.CATEGORY_SUGGESTIONS, query);
    return cache.get(key);
  },

  async setCategorySuggestions(query: string, suggestions: SuggestionResult[]): Promise<boolean> {
    const cache = CacheServiceFactory.getInstance();
    const key = generateCacheKey(CACHE_KEYS.CATEGORY_SUGGESTIONS, query);
    return cache.set(key, suggestions, CACHE_TTL.CATEGORY_SUGGESTIONS);
  }
};

export default CacheServiceFactory; 