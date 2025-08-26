/**
 * Service Worker for Portfolio Performance Optimization
 * Implements advanced caching strategies and offline functionality
 */

const CACHE_VERSION = '1.0.0';
const STATIC_CACHE_NAME = `portfolio-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE_NAME = `portfolio-dynamic-v${CACHE_VERSION}`;
const MAX_DYNAMIC_CACHE_SIZE = 50;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html', // Fallback page
  // Add other critical assets here
];

// Routes that should use network-first strategy
const NETWORK_FIRST_ROUTES = [
  '/api/',
  '.json'
];

// Routes that should use cache-first strategy  
const CACHE_FIRST_ROUTES = [
  '.js',
  '.css',
  '.woff2',
  '.woff',
  '.ttf',
  '.eot'
];

let cacheConfig = {
  offlineStrategy: 'stale-while-revalidate',
  maxDynamicCacheSize: MAX_DYNAMIC_CACHE_SIZE
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(error => console.error('Failed to cache static assets:', error))
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => 
              name.startsWith('portfolio-') && 
              name !== STATIC_CACHE_NAME && 
              name !== DYNAMIC_CACHE_NAME
            )
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
      .catch(error => console.error('Failed to cleanup old caches:', error))
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Choose caching strategy based on request
  if (shouldUseNetworkFirst(url)) {
    event.respondWith(networkFirstStrategy(request));
  } else if (shouldUseCacheFirst(url)) {
    event.respondWith(cacheFirstStrategy(request));
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Message event - handle configuration updates
self.addEventListener('message', (event) => {
  const { data } = event;
  
  switch (data.type) {
    case 'CACHE_CONFIG':
      cacheConfig = { ...cacheConfig, ...data.config };
      console.log('Cache config updated:', cacheConfig);
      break;
      
    case 'SYNC_PENDING_REQUESTS':
      // Handle sync of pending requests when back online
      syncPendingRequests();
      break;
      
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    default:
      console.log('Unknown message type:', data.type);
  }
});

// Caching strategy implementations
function shouldUseNetworkFirst(url) {
  return NETWORK_FIRST_ROUTES.some(route => url.pathname.includes(route));
}

function shouldUseCacheFirst(url) {
  return CACHE_FIRST_ROUTES.some(route => url.pathname.endsWith(route));
}

async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      await limitCacheSize(DYNAMIC_CACHE_NAME, cacheConfig.maxDynamicCacheSize);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
      await limitCacheSize(DYNAMIC_CACHE_NAME, cacheConfig.maxDynamicCacheSize);
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Both cache and network failed:', error);
    return new Response('Resource not available', { status: 404 });
  }
}

async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
        limitCacheSize(DYNAMIC_CACHE_NAME, cacheConfig.maxDynamicCacheSize);
      }
      return networkResponse;
    })
    .catch(error => {
      console.log('Network request failed:', error);
      return cachedResponse || new Response('Offline', { status: 503 });
    });
  
  return cachedResponse || fetchPromise;
}

// Utility function to limit cache size
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  
  if (requests.length > maxSize) {
    // Remove oldest entries (FIFO)
    const entriesToDelete = requests.slice(0, requests.length - maxSize);
    await Promise.all(entriesToDelete.map(request => cache.delete(request)));
  }
}

// Sync pending requests when back online
async function syncPendingRequests() {
  // Implementation for syncing offline requests
  console.log('Syncing pending requests...');
  // This would typically involve checking IndexedDB for stored offline requests
  // and attempting to send them when back online
}

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncPendingRequests());
  }
});

// Push notification handling (if needed)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

console.log('Service Worker loaded successfully');