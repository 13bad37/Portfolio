/**
 * Advanced caching strategies for performance optimization
 * Includes service worker registration, cache management, and prefetching
 */

interface CacheConfig {
  enableServiceWorker?: boolean;
  cacheVersion?: string;
  staticCacheName?: string;
  dynamicCacheName?: string;
  maxDynamicCacheSize?: number;
  prefetchRoutes?: string[];
  offlineStrategy?: 'cache-first' | 'network-first' | 'stale-while-revalidate';
}

class CacheManager {
  private config: Required<CacheConfig>;
  private isServiceWorkerSupported: boolean;
  private isOnline: boolean = navigator.onLine;

  constructor(config: CacheConfig = {}) {
    this.config = {
      enableServiceWorker: true,
      cacheVersion: '1.0.0',
      staticCacheName: 'portfolio-static-v1',
      dynamicCacheName: 'portfolio-dynamic-v1',
      maxDynamicCacheSize: 50,
      prefetchRoutes: ['/'],
      offlineStrategy: 'stale-while-revalidate',
      ...config
    };

    this.isServiceWorkerSupported = 'serviceWorker' in navigator;
    this.setupOnlineStatusListener();
  }

  public async initialize(): Promise<void> {
    if (!this.isServiceWorkerSupported || !this.config.enableServiceWorker) {
      console.warn('Service Worker not supported or disabled');
      return;
    }

    try {
      await this.registerServiceWorker();
      await this.setupCacheStrategies();
      await this.prefetchCriticalRoutes();
      this.setupCacheCleanup();
    } catch (error) {
      console.error('Failed to initialize cache manager:', error);
    }
  }

  private async registerServiceWorker(): Promise<void> {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              this.notifyUpdate();
            }
          });
        }
      });

      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      throw error;
    }
  }

  private async setupCacheStrategies(): Promise<void> {
    // Set up cache strategies via message to service worker
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_CONFIG',
        config: this.config
      });
    }
  }

  private async prefetchCriticalRoutes(): Promise<void> {
    const cache = await caches.open(this.config.staticCacheName);
    const prefetchPromises = this.config.prefetchRoutes.map(route => 
      this.prefetchRoute(cache, route)
    );
    await Promise.allSettled(prefetchPromises);
  }

  private async prefetchRoute(cache: Cache, route: string): Promise<void> {
    try {
      const response = await fetch(route);
      if (response.ok) {
        await cache.put(route, response);
      }
    } catch (error) {
      console.warn(`Failed to prefetch route ${route}:`, error);
    }
  }

  private setupCacheCleanup(): void {
    // Clean up old caches on page load
    this.cleanupOldCaches();
    
    // Set up periodic cache size monitoring
    setInterval(() => {
      this.monitorCacheSize();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  private async cleanupOldCaches(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      const deletePromises = cacheNames
        .filter(name => 
          (name.startsWith('portfolio-') && 
           name !== this.config.staticCacheName && 
           name !== this.config.dynamicCacheName)
        )
        .map(name => caches.delete(name));
      
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Cache cleanup failed:', error);
    }
  }

  private async monitorCacheSize(): Promise<void> {
    try {
      const dynamicCache = await caches.open(this.config.dynamicCacheName);
      const requests = await dynamicCache.keys();
      
      if (requests.length > this.config.maxDynamicCacheSize) {
        // Remove oldest entries
        const entriesToRemove = requests.slice(0, requests.length - this.config.maxDynamicCacheSize);
        await Promise.all(entriesToRemove.map(request => dynamicCache.delete(request)));
      }
    } catch (error) {
      console.error('Cache size monitoring failed:', error);
    }
  }

  private setupOnlineStatusListener(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingRequests();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  private async syncPendingRequests(): Promise<void> {
    // Sync any pending requests when coming back online
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SYNC_PENDING_REQUESTS'
      });
    }
  }

  private notifyUpdate(): void {
    // Notify user that an update is available
    const event = new CustomEvent('sw-update-available');
    window.dispatchEvent(event);
  }

  public async clearAllCaches(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('All caches cleared');
    } catch (error) {
      console.error('Failed to clear caches:', error);
    }
  }

  public async getCacheStats(): Promise<{
    staticCacheSize: number;
    dynamicCacheSize: number;
    totalCaches: number;
  }> {
    try {
      const [staticCache, dynamicCache, allCaches] = await Promise.all([
        caches.open(this.config.staticCacheName),
        caches.open(this.config.dynamicCacheName),
        caches.keys()
      ]);

      const [staticKeys, dynamicKeys] = await Promise.all([
        staticCache.keys(),
        dynamicCache.keys()
      ]);

      return {
        staticCacheSize: staticKeys.length,
        dynamicCacheSize: dynamicKeys.length,
        totalCaches: allCaches.length
      };
    } catch (error) {
      console.error('Failed to get cache stats:', error);
      return { staticCacheSize: 0, dynamicCacheSize: 0, totalCaches: 0 };
    }
  }

  public get isOnlineStatus(): boolean {
    return this.isOnline;
  }
}

// Resource prefetching utility
export class ResourcePrefetcher {
  private prefetchedResources: Set<string> = new Set();
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const prefetchUrl = element.dataset.prefetch;
            if (prefetchUrl && !this.prefetchedResources.has(prefetchUrl)) {
              this.prefetchResource(prefetchUrl);
            }
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );
  }

  public observeElement(element: HTMLElement, prefetchUrl: string): void {
    element.dataset.prefetch = prefetchUrl;
    this.observer?.observe(element);
  }

  public async prefetchResource(url: string, type: 'fetch' | 'link' = 'link'): Promise<void> {
    if (this.prefetchedResources.has(url)) return;

    this.prefetchedResources.add(url);

    try {
      if (type === 'link') {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
      } else {
        // Use fetch for immediate prefetching
        const response = await fetch(url, { mode: 'no-cors' });
        if (response.ok) {
          // Resource is now in the browser cache
        }
      }
    } catch (error) {
      console.warn(`Failed to prefetch resource ${url}:`, error);
      this.prefetchedResources.delete(url);
    }
  }

  public disconnect(): void {
    this.observer?.disconnect();
    this.prefetchedResources.clear();
  }
}

// Memory-based caching for API responses
export class MemoryCache {
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(private defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default
    this.startCleanupTimer();
  }

  public set(key: string, data: any, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL
    });
  }

  public get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  public has(key: string): boolean {
    return this.get(key) !== null;
  }

  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }

  private startCleanupTimer(): void {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, item] of this.cache.entries()) {
        if (now - item.timestamp > item.ttl) {
          this.cache.delete(key);
        }
      }
    }, 60 * 1000); // Cleanup every minute
  }

  public destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}

// Singleton instances
export const cacheManager = new CacheManager();
export const resourcePrefetcher = new ResourcePrefetcher();
export const memoryCache = new MemoryCache();