import NodeCache from 'node-cache';
import { 
  createInMemoryCache, 
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

// Simple cache factory - always returns in-memory cache
export class CacheServiceFactory {
  private static instance: ICacheService | null = null;

  static getInstance(): ICacheService {
    if (!this.instance) {
      const config = getCacheConfig();
      
      if (config.enableCaching) {
        this.instance = new InMemoryCacheService();
      } else {
        // Return a no-op cache if caching is disabled
        this.instance = new NoOpCacheService();
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

// No-op cache service for when caching is disabled
class NoOpCacheService implements ICacheService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async get<T>(key: string): Promise<T | null> { 
    return null; 
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> { 
    return true; 
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(key: string): Promise<boolean> { 
    return true; 
  }
  
  async clear(): Promise<boolean> { 
    return true; 
  }
  
  getMetrics(): CacheMetrics { 
    return createCacheMetrics(); 
  }
  
  async disconnect(): Promise<void> { 
    // No-op
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