import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

interface UseIntersectionObserverReturn<T extends HTMLElement> {
  ref: React.RefObject<T>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
  enabled = true,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn<T> {
  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
        
        if (observerEntry.isIntersecting) {
          setIsIntersecting(true);
          
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, enabled]);

  return { ref, isIntersecting, entry };
}

// Specialized hook for animations with stagger support
export function useStaggeredIntersection<T extends HTMLElement>(
  delay: number = 100
): UseIntersectionObserverReturn<T> & { animationDelay: number } {
  const { ref, isIntersecting, entry } = useIntersectionObserver<T>();
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    if (isIntersecting) {
      const timer = setTimeout(() => {
        setAnimationDelay(delay);
      }, Math.random() * delay);

      return () => clearTimeout(timer);
    }
  }, [isIntersecting, delay]);

  return { ref, isIntersecting, entry, animationDelay };
}