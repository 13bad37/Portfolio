import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  offset?: [string, string];
}

/**
 * Apple-inspired parallax section component
 * Features:
 * - Smooth parallax scrolling with customizable speed
 * - Hardware-accelerated transforms for 60fps performance
 * - Intersection observer for performance optimization
 * - Responsive design with reduced motion support
 */
const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  className = '',
  offset = ["start end", "end start"]
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as [string, string]
  });

  // Transform scroll progress to parallax movement
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Intersection observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Respect user's motion preferences
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          y: prefersReducedMotion ? 0 : (isInView ? y : 0),
          opacity: isInView ? opacity : 0,
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: isInView ? 'transform, opacity' : 'auto'
        }}
        className="transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;