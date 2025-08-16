import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  offset?: number;
  disabled?: boolean;
}

export const useParallax = ({ 
  speed = 0.5, 
  offset = 0, 
  disabled = false 
}: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    let ticking = false;

    const updateTransform = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const elementTop = rect.top + scrolled;
      const windowHeight = window.innerHeight;
      
      // Only calculate parallax when element is near viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = -(scrolled - elementTop + offset) * speed;
        setTransform(`translate3d(0, ${yPos}px, 0)`);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    updateTransform();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, offset, disabled]);

  return { ref: elementRef, transform };
};