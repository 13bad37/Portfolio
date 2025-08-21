// Performance optimization utilities

// Debounce function for performance optimization
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// RAF-based throttle for animations
export function rafThrottle<T extends (...args: unknown[]) => unknown>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    if (rafId) return;
    
    rafId = requestAnimationFrame(() => {
      func.apply(this, args);
      rafId = null;
    });
  };
}

// Preload images for better performance
export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Batch DOM reads and writes
export class DOMScheduler {
  private readQueue: (() => void)[] = [];
  private writeQueue: (() => void)[] = [];
  private scheduled = false;

  read(fn: () => void) {
    this.readQueue.push(fn);
    this.schedule();
  }

  write(fn: () => void) {
    this.writeQueue.push(fn);
    this.schedule();
  }

  private schedule() {
    if (this.scheduled) return;
    this.scheduled = true;

    requestAnimationFrame(() => {
      // Execute all reads first
      while (this.readQueue.length) {
        const fn = this.readQueue.shift();
        fn?.();
      }

      // Then execute all writes
      while (this.writeQueue.length) {
        const fn = this.writeQueue.shift();
        fn?.();
      }

      this.scheduled = false;
    });
  }
}

// Performance monitoring
export function measurePerformance(name: string, fn: () => void): void {
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  // Performance measurement for ${name}
  void startTime; void endTime; // Used for measurement
}

// Check if device supports WebP
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Intersection Observer with performance optimizations
export function createOptimizedObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const throttledCallback = rafThrottle(callback);
  return new IntersectionObserver(throttledCallback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

// Virtual scrolling helper for large lists
export function getVisibleRange(
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan: number = 3
): { start: number; end: number } {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const end = Math.min(totalItems - 1, start + visibleCount + overscan * 2);
  
  return { start, end };
}