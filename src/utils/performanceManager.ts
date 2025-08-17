// Advanced performance management for 120fps optimization

interface PerformanceConfig {
  targetFPS: number;
  adaptiveQuality: boolean;
  reduceAnimations: boolean;
  optimizeForMobile: boolean;
}

class PerformanceManager {
  private config: PerformanceConfig;
  private frameTime: number = 16.67; // Target 60fps baseline
  private actualFrameTime: number = 16.67;
  private frameCount: number = 0;
  private lastFrameTime: number = 0;
  private performanceMetrics: {
    averageFPS: number;
    frameDrops: number;
    memoryUsage: number;
  } = {
    averageFPS: 60,
    frameDrops: 0,
    memoryUsage: 0
  };

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      targetFPS: 120,
      adaptiveQuality: true,
      reduceAnimations: false,
      optimizeForMobile: this.isMobileDevice(),
      ...config
    };

    this.frameTime = 1000 / this.config.targetFPS;
    this.initializePerformanceMonitoring();
    this.applyPerformanceOptimizations();
  }

  private isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private isHighRefreshRateDisplay(): boolean {
    // Check if display supports high refresh rates
    return window.screen.width > 1920 || 
           (window.devicePixelRatio > 1 && !this.isMobileDevice());
  }

  private initializePerformanceMonitoring(): void {
    const frames: number[] = [];
    
    const measureFrame = (timestamp: number) => {
      if (this.lastFrameTime) {
        const delta = timestamp - this.lastFrameTime;
        frames.push(delta);
        
        // Keep only last 60 frames for moving average
        if (frames.length > 60) {
          frames.shift();
        }
        
        this.actualFrameTime = frames.reduce((a, b) => a + b, 0) / frames.length;
        this.performanceMetrics.averageFPS = 1000 / this.actualFrameTime;
        
        // Detect frame drops
        if (delta > this.frameTime * 2) {
          this.performanceMetrics.frameDrops++;
        }
      }
      
      this.lastFrameTime = timestamp;
      this.frameCount++;
      
      // Adaptive quality adjustment
      if (this.config.adaptiveQuality && this.frameCount % 120 === 0) {
        this.adjustQuality();
      }
      
      requestAnimationFrame(measureFrame);
    };
    
    requestAnimationFrame(measureFrame);
  }

  private adjustQuality(): void {
    const currentFPS = this.performanceMetrics.averageFPS;
    const targetFPS = this.config.targetFPS;
    
    if (currentFPS < targetFPS * 0.8) {
      // Performance is poor, reduce quality
      this.enablePerformanceMode();
    } else if (currentFPS > targetFPS * 0.95) {
      // Performance is good, can increase quality
      this.enableQualityMode();
    }
  }

  private enablePerformanceMode(): void {
    document.documentElement.classList.add('performance-mode');
    document.documentElement.classList.remove('quality-mode');
    
    // Reduce particle count
    this.dispatchEvent('performance:reduce-particles');
    
    // Simplify animations
    this.dispatchEvent('performance:simplify-animations');
  }

  private enableQualityMode(): void {
    document.documentElement.classList.add('quality-mode');
    document.documentElement.classList.remove('performance-mode');
    
    // Restore full quality
    this.dispatchEvent('performance:restore-quality');
  }

  private dispatchEvent(eventName: string, data?: unknown): void {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }

  private applyPerformanceOptimizations(): void {
    // Apply CSS optimizations based on device capabilities
    if (this.isHighRefreshRateDisplay()) {
      document.documentElement.classList.add('high-refresh');
    }
    
    if (this.config.optimizeForMobile) {
      document.documentElement.classList.add('mobile-optimized');
    }
    
    // Set CSS custom properties for dynamic animations
    document.documentElement.style.setProperty('--target-fps', this.config.targetFPS.toString());
    document.documentElement.style.setProperty('--frame-time', `${this.frameTime}ms`);
    
    // Enable content visibility optimizations
    this.enableContentVisibility();
  }

  private enableContentVisibility(): void {
    // Apply content-visibility to sections for better rendering performance
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (!section.classList.contains('hero-section')) {
        section.classList.add('content-auto');
      }
    });
  }

  // Public methods for external use
  public getMetrics() {
    return { ...this.performanceMetrics };
  }

  public updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.frameTime = 1000 / this.config.targetFPS;
    this.applyPerformanceOptimizations();
  }

  public forcePerformanceMode(): void {
    this.enablePerformanceMode();
  }

  public forceQualityMode(): void {
    this.enableQualityMode();
  }

  // Memory management
  public optimizeMemory(): void {
    // Force garbage collection if available
    if ('gc' in window && typeof (window as unknown as { gc?: () => void }).gc === 'function') {
      (window as unknown as { gc: () => void }).gc();
    }
    
    // Clean up unused resources
    this.dispatchEvent('performance:cleanup-resources');
  }

  // Frame rate limiting for battery optimization
  public enableBatteryMode(): void {
    this.updateConfig({ targetFPS: 60, adaptiveQuality: true, reduceAnimations: true });
  }

  public enableHighPerformanceMode(): void {
    this.updateConfig({ targetFPS: 120, adaptiveQuality: false, reduceAnimations: false });
  }
}

// CSS optimizations based on performance mode
const performanceStyles = `
.performance-mode {
  --animation-duration: 0.1s;
  --particle-count: 20;
  --blur-radius: 5px;
}

.quality-mode {
  --animation-duration: 0.3s;
  --particle-count: 100;
  --blur-radius: 15px;
}

.high-refresh {
  --refresh-rate: 120;
}

@media (max-width: 768px) {
  .mobile-optimized {
    --animation-duration: 0.2s;
    --particle-count: 30;
    --blur-radius: 8px;
  }
}
`;

// Inject performance styles
const styleSheet = document.createElement('style');
styleSheet.textContent = performanceStyles;
document.head.appendChild(styleSheet);

// Singleton instance
let performanceManager: PerformanceManager | null = null;

export function getPerformanceManager(config?: Partial<PerformanceConfig>): PerformanceManager {
  if (!performanceManager) {
    performanceManager = new PerformanceManager(config);
  }
  return performanceManager;
}

export { PerformanceManager };
export type { PerformanceConfig };