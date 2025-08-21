import React, { useState, useEffect } from 'react';

/**
 * Apple-inspired scroll progress indicator
 * Features:
 * - Smooth gradient animation that follows scroll position
 * - Hardware-accelerated transforms for 60fps performance
 * - Responsive design with proper accessibility
 * - Subtle glow effect for premium feel
 */
const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Calculate scroll progress with smooth interpolation
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
          
          setScrollProgress(progress);
          setIsVisible(window.scrollY > 100); // Show after scrolling 100px
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main progress bar */}
      <div 
        className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          width: `${scrollProgress * 100}%`,
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.7)',
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'width'
        }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      
      {/* Subtle animated background glow */}
      <div 
        className={`fixed top-0 left-0 h-1 pointer-events-none z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          width: `${Math.min(scrollProgress * 100 + 20, 100)}%`,
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
          filter: 'blur(2px)',
          transform: 'translateZ(0)'
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default ScrollProgress;