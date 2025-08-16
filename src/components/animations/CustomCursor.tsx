import React, { useState, useEffect } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const mousePosition = useMousePosition();
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'text'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hover on interactive elements
    const handleMouseOverButton = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || 
          target.closest('button') || target.closest('a') ||
          target.classList.contains('cursor-pointer')) {
        setCursorVariant('button');
      } else if (target.tagName === 'P' || target.tagName === 'H1' || 
                target.tagName === 'H2' || target.tagName === 'H3' || 
                target.tagName === 'SPAN' || target.tagName === 'LABEL' ||
                target.tagName === 'INPUT') {
        setCursorVariant('text');
      } else {
        setCursorVariant('default');
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOverButton);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOverButton);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(139, 92, 246, 0.3)",
      mixBlendMode: "difference" as const,
      border: "1px solid rgba(139, 92, 246, 0.5)",
    },
    button: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(139, 92, 246, 0.2)",
      border: "1px solid rgba(139, 92, 246, 0.8)",
      mixBlendMode: "normal" as const,
    },
    text: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      mixBlendMode: "difference" as const,
      border: "1px solid rgba(255, 255, 255, 0.3)",
    }
  };

  // Only render on non-touch devices
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="fixed top-0 left-0 z-50 rounded-full pointer-events-none"
            variants={cursorVariants}
            animate={cursorVariant}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              mass: 0.5,
            }}
            aria-hidden="true"
          />
          <motion.div
            className="fixed top-0 left-0 z-50 w-4 h-4 bg-primary-500 rounded-full pointer-events-none"
            animate={{
              x: mousePosition.x - 8,
              y: mousePosition.y - 8,
            }}
            transition={{
              type: "spring",
              damping: 40,
              stiffness: 500,
              mass: 0.2,
            }}
            aria-hidden="true"
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;