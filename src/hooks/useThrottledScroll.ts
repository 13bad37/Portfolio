import { useEffect, useState, useCallback } from 'react';

interface ScrollData {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  isScrolling: boolean;
}

export const useThrottledScroll = (delay: number = 16): ScrollData => {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    scrollDirection: null,
    isScrolling: false,
  });

  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const updateScrollData = useCallback(() => {
    const currentScrollY = window.pageYOffset;
    
    setScrollData(prev => ({
      scrollY: currentScrollY,
      scrollDirection: currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : prev.scrollDirection,
      isScrolling: true,
    }));

    setLastScrollY(currentScrollY);

    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Set scrolling to false after delay
    const timeout = setTimeout(() => {
      setScrollData(prev => ({ ...prev, isScrolling: false }));
    }, 150);

    setScrollTimeout(timeout);
  }, [lastScrollY, scrollTimeout]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollData);
        ticking = true;
        setTimeout(() => { ticking = false; }, delay);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [updateScrollData, delay, scrollTimeout]);

  return scrollData;
};