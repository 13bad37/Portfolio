/**
 * Advanced image optimization utilities
 * Handles progressive loading, WebP conversion, and responsive sizing
 */

import React from 'react';

interface ImageLoadOptions {
  placeholder?: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

interface OptimizedImageData {
  src: string;
  srcSet: string;
  placeholder: string;
  isLoaded: boolean;
  hasError: boolean;
}

class ImageOptimizer {
  private cache: Map<string, OptimizedImageData> = new Map();
  private loadingImages: Set<string> = new Set();

  public async optimizeImage(
    src: string,
    options: ImageLoadOptions = {}
  ): Promise<OptimizedImageData> {
    const cacheKey = `${src}-${JSON.stringify(options)}`;
    
    // Return cached result if available
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Check if already loading
    if (this.loadingImages.has(cacheKey)) {
      return this.waitForLoad(cacheKey);
    }

    this.loadingImages.add(cacheKey);

    try {
      const optimizedData = await this.processImage(src, options);
      this.cache.set(cacheKey, optimizedData);
      return optimizedData;
    } finally {
      this.loadingImages.delete(cacheKey);
    }
  }

  private async processImage(
    src: string,
    options: ImageLoadOptions
  ): Promise<OptimizedImageData> {
    const { quality = 85, format = 'auto', sizes } = options;

    // Generate WebP/AVIF versions if supported
    const modernFormats = await this.getModernFormats(src, format, quality);
    
    // Generate responsive srcSet
    const srcSet = this.generateSrcSet(src, modernFormats, sizes);
    
    // Create optimized placeholder
    const placeholder = await this.generatePlaceholder(src, options.placeholder);
    
    // Preload if priority
    if (options.priority) {
      this.preloadImage(modernFormats[0] || src);
    }

    return {
      src: modernFormats[0] || src,
      srcSet,
      placeholder,
      isLoaded: false,
      hasError: false
    };
  }

  private async getModernFormats(
    src: string,
    format: 'webp' | 'avif' | 'auto',
    quality: number
  ): Promise<string[]> {
    const formats: string[] = [];
    
    if (format === 'auto' || format === 'avif') {
      if (this.supportsFormat('avif')) {
        formats.push(this.convertToFormat(src, 'avif', quality));
      }
    }
    
    if (format === 'auto' || format === 'webp') {
      if (this.supportsFormat('webp')) {
        formats.push(this.convertToFormat(src, 'webp', quality));
      }
    }
    
    formats.push(src); // Fallback
    return formats;
  }

  private supportsFormat(format: 'webp' | 'avif'): boolean {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    try {
      return canvas.toDataURL(`image/${format}`).startsWith(`data:image/${format}`);
    } catch {
      return false;
    }
  }

  private convertToFormat(src: string, format: 'webp' | 'avif', quality: number): string {
    // In a real implementation, this would convert images to modern formats
    // For now, we'll assume the server handles format conversion via URL parameters
    const url = new URL(src, window.location.origin);
    url.searchParams.set('format', format);
    url.searchParams.set('quality', quality.toString());
    return url.toString();
  }

  private generateSrcSet(src: string, modernFormats: string[], sizes?: string): string {
    const breakpoints = [480, 768, 1024, 1280, 1920];
    const srcSetEntries: string[] = [];

    modernFormats.forEach(format => {
      breakpoints.forEach(width => {
        const url = new URL(format, window.location.origin);
        url.searchParams.set('w', width.toString());
        srcSetEntries.push(`${url.toString()} ${width}w`);
      });
    });

    return srcSetEntries.join(', ');
  }

  private async generatePlaceholder(src: string, customPlaceholder?: string): Promise<string> {
    if (customPlaceholder) return customPlaceholder;

    // Generate low-quality placeholder
    const url = new URL(src, window.location.origin);
    url.searchParams.set('w', '40');
    url.searchParams.set('q', '20');
    url.searchParams.set('blur', '5');
    
    return url.toString();
  }

  private preloadImage(src: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }

  private async waitForLoad(cacheKey: string): Promise<OptimizedImageData> {
    return new Promise((resolve) => {
      const checkCache = () => {
        if (this.cache.has(cacheKey)) {
          resolve(this.cache.get(cacheKey)!);
        } else {
          setTimeout(checkCache, 10);
        }
      };
      checkCache();
    });
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public getCacheSize(): number {
    return this.cache.size;
  }
}

// Singleton instance
const imageOptimizer = new ImageOptimizer();

// Progressive image loading hook
export const useOptimizedImage = (
  src: string,
  options: ImageLoadOptions = {}
): OptimizedImageData & { load: () => Promise<void> } => {
  const [imageData, setImageData] = React.useState<OptimizedImageData>({
    src,
    srcSet: '',
    placeholder: options.placeholder || '',
    isLoaded: false,
    hasError: false
  });

  const load = React.useCallback(async () => {
    try {
      const optimized = await imageOptimizer.optimizeImage(src, options);
      
      // Load the actual image
      const img = new Image();
      img.onload = () => {
        setImageData({ ...optimized, isLoaded: true });
        options.onLoad?.();
      };
      img.onerror = (error) => {
        setImageData({ ...optimized, hasError: true });
        options.onError?.(new Error('Failed to load image'));
      };
      img.src = optimized.src;
      
      // Set initial data with placeholder
      setImageData(optimized);
    } catch (error) {
      setImageData(prev => ({ ...prev, hasError: true }));
      options.onError?.(error as Error);
    }
  }, [src, options]);

  React.useEffect(() => {
    load();
  }, [load]);

  return { ...imageData, load };
};

// Image intersection observer for lazy loading
export const createImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
};

// Utility functions
export const preloadCriticalImages = (srcs: string[]): void => {
  srcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

export const optimizeImageSize = (originalWidth: number, originalHeight: number, maxSize: number): { width: number; height: number } => {
  if (originalWidth <= maxSize && originalHeight <= maxSize) {
    return { width: originalWidth, height: originalHeight };
  }

  const aspectRatio = originalWidth / originalHeight;
  
  if (originalWidth > originalHeight) {
    return {
      width: maxSize,
      height: Math.round(maxSize / aspectRatio)
    };
  } else {
    return {
      width: Math.round(maxSize * aspectRatio),
      height: maxSize
    };
  }
};

export { imageOptimizer };