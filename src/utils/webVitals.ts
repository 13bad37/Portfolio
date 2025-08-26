/**
 * Core Web Vitals monitoring utility
 * Tracks FCP, LCP, FID, CLS, and TTFB metrics
 */

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  entries: PerformanceEntry[];
  navigationType: string;
}

type WebVitalsCallback = (metric: WebVitalsMetric) => void;

class WebVitalsMonitor {
  private metrics: Map<string, number> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();
  private callbacks: Set<WebVitalsCallback> = new Set();

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    // First Contentful Paint (FCP)
    this.observeMetric('first-contentful-paint', (entry) => {
      this.reportMetric('FCP', entry.startTime);
    });

    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entry) => {
      this.reportMetric('LCP', entry.startTime);
    });

    // First Input Delay (FID)
    this.observeMetric('first-input', (entry) => {
      this.reportMetric('FID', entry.processingStart - entry.startTime);
    });

    // Cumulative Layout Shift (CLS)
    this.observeMetric('layout-shift', (entry) => {
      if (!entry.hadRecentInput) {
        const currentCLS = this.metrics.get('CLS') || 0;
        this.reportMetric('CLS', currentCLS + entry.value);
      }
    });

    // Time to First Byte (TTFB)
    if ('navigation' in performance) {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        this.reportMetric('TTFB', navigationEntry.responseStart - navigationEntry.requestStart);
      }
    }
  }

  private observeMetric(type: string, callback: (entry: any) => void): void {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach(callback);
      });

      observer.observe({ type, buffered: true });
      this.observers.set(type, observer);
    } catch (error) {
      // Observer type not supported
      console.warn(`Performance observer for ${type} not supported:`, error);
    }
  }

  private reportMetric(name: string, value: number): void {
    const previousValue = this.metrics.get(name) || 0;
    const delta = value - previousValue;
    
    this.metrics.set(name, value);

    const metric: WebVitalsMetric = {
      name,
      value,
      delta,
      entries: [],
      navigationType: this.getNavigationType()
    };

    // Notify callbacks
    this.callbacks.forEach(callback => {
      try {
        callback(metric);
      } catch (error) {
        console.error('Error in web vitals callback:', error);
      }
    });
  }

  private getNavigationType(): string {
    if ('navigation' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return navigation?.type || 'navigate';
    }
    return 'navigate';
  }

  public subscribe(callback: WebVitalsCallback): () => void {
    this.callbacks.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.callbacks.delete(callback);
    };
  }

  public getMetric(name: string): number | undefined {
    return this.metrics.get(name);
  }

  public getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  public disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.callbacks.clear();
    this.metrics.clear();
  }
}

// Singleton instance
const webVitalsMonitor = new WebVitalsMonitor();

// Convenience functions
export const trackWebVitals = (callback: WebVitalsCallback): (() => void) => {
  return webVitalsMonitor.subscribe(callback);
};

export const getWebVital = (name: string): number | undefined => {
  return webVitalsMonitor.getMetric(name);
};

export const getAllWebVitals = (): Record<string, number> => {
  return webVitalsMonitor.getAllMetrics();
};

// Performance grade calculator
export const getPerformanceGrade = (): { grade: string; score: number; details: Record<string, string> } => {
  const metrics = getAllWebVitals();
  const details: Record<string, string> = {};
  let score = 100;

  // FCP scoring (Good: <1.8s, Needs Improvement: 1.8-3.0s, Poor: >3.0s)
  if (metrics.FCP) {
    if (metrics.FCP > 3000) {
      score -= 25;
      details.FCP = 'Poor (>3.0s)';
    } else if (metrics.FCP > 1800) {
      score -= 10;
      details.FCP = 'Needs Improvement (1.8-3.0s)';
    } else {
      details.FCP = 'Good (<1.8s)';
    }
  }

  // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4.0s, Poor: >4.0s)
  if (metrics.LCP) {
    if (metrics.LCP > 4000) {
      score -= 30;
      details.LCP = 'Poor (>4.0s)';
    } else if (metrics.LCP > 2500) {
      score -= 15;
      details.LCP = 'Needs Improvement (2.5-4.0s)';
    } else {
      details.LCP = 'Good (<2.5s)';
    }
  }

  // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
  if (metrics.FID) {
    if (metrics.FID > 300) {
      score -= 25;
      details.FID = 'Poor (>300ms)';
    } else if (metrics.FID > 100) {
      score -= 10;
      details.FID = 'Needs Improvement (100-300ms)';
    } else {
      details.FID = 'Good (<100ms)';
    }
  }

  // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
  if (metrics.CLS !== undefined) {
    if (metrics.CLS > 0.25) {
      score -= 20;
      details.CLS = 'Poor (>0.25)';
    } else if (metrics.CLS > 0.1) {
      score -= 10;
      details.CLS = 'Needs Improvement (0.1-0.25)';
    } else {
      details.CLS = 'Good (<0.1)';
    }
  }

  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
  
  return { grade, score, details };
};

export { webVitalsMonitor };

// Backward-compatible helpers expected by main.tsx
// Initialize observers (already done via singleton) and allow optional reporting
export const observePerformance = (): void => {
  // Accessing the singleton ensures observers are set up
  void webVitalsMonitor;
};

export const reportWebVitals = (
  onReport?: (metric: WebVitalsMetric) => void
): (() => void) => {
  // Subscribe to metrics and either log or forward to provided callback
  return webVitalsMonitor.subscribe((metric) => {
    if (onReport) {
      onReport(metric);
    } else if (typeof console !== 'undefined') {
      try {
        const value = metric.name === 'CLS' ? metric.value : Math.round(metric.value);
        console.info(`[WebVitals] ${metric.name}:`, value, metric);
      } catch {
        // noop
      }
    }
  });
};
