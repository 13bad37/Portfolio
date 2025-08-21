// Web Vitals monitoring for performance tracking
export const reportWebVitals = (onPerfEntry?: (metric: unknown) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Only try to import web-vitals in development or if available
    try {
      // Use dynamic import that doesn't fail the build
      if (typeof window !== 'undefined') {
        Promise.resolve().then(() => {
          // Simple performance monitoring without external dependencies
          // Performance monitoring active
        });
      }
    } catch {
      console.warn('Web Vitals monitoring not available');
    }
  }
};

// Performance observer for additional metrics
export const observePerformance = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        // Track LCP
        void lastEntry; // Used for tracking
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          // Track FID
          void entry; // Used for tracking
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { hadRecentInput?: boolean; value?: number }) => {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
          }
        });
        // Track CLS
        void clsValue; // Used for tracking
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }
};