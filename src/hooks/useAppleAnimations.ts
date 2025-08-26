import { useEffect, useRef, useState } from 'react';

interface AppleAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  animationType?: 'fade-up' | 'scale' | 'slide-left' | 'slide-right';
}

export const useAppleAnimation = ({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
  delay = 0,
  animationType = 'fade-up'
}: AppleAnimationOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const actualDelay = prefersReducedMotion ? 0 : delay;
          
          setTimeout(() => {
            setIsVisible(true);
            element.classList.add('in-view');
            
            // Add Apple-inspired spring animation
            element.style.transition = prefersReducedMotion 
              ? 'none'
              : `all 0.6s cubic-bezier(0.16, 1, 0.3, 1)`;
            
          }, actualDelay);
          
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
          element.classList.remove('in-view');
        }
      },
      { threshold, rootMargin }
    );

    // Enhanced animation classes with Apple's physics
    const animationClass = animationType === 'scale' ? 'apple-scale' : 'apple-animate';
    element.classList.add(animationClass);
    
    // Apply physics-based initial state
    if (!prefersReducedMotion) {
      element.style.transform = animationType === 'fade-up' 
        ? 'translate3d(0, 30px, 0)' 
        : animationType === 'scale'
        ? 'scale3d(0.95, 0.95, 1)'
        : animationType === 'slide-left'
        ? 'translate3d(-30px, 0, 0)'
        : 'translate3d(30px, 0, 0)';
      element.style.opacity = '0';
    }

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, animationType]);

  return { ref, isVisible };
};

// Hook for staggered animations
export const useStaggeredAnimation = (
  itemCount: number,
  staggerDelay: number = 100
) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Add staggered animation to children
          const children = container.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('in-view');
            }, index * staggerDelay);
          });
          
          observer.unobserve(container);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Add initial classes to children
    const children = container.children;
    Array.from(children).forEach((child) => {
      child.classList.add('apple-animate');
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [itemCount, staggerDelay]);

  return { ref: containerRef, isVisible };
};

// Hook for parallax scrolling effects
export const useParallaxScroll = (speed: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        setOffset(rate);
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { ref, offset };
};

// Hook for smooth scroll to element
export const useSmoothScroll = () => {
  const scrollToElement = (elementId: string, offset: number = 100) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  return { scrollToElement };
};