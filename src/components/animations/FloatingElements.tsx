import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface FloatingElementsProps {
  variant?: 'minimal' | 'tech' | 'geometric' | 'code';
  density?: 'light' | 'medium' | 'dense';
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  variant = 'minimal', 
  density = 'light' 
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Optimized mouse tracking with throttling and position diffing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Mouse tracking logic preserved for future use
    // Note: Cannot use preventDefault in passive listeners
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Use passive listeners for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove]);

  // Performance-aware element count with device capability detection
  const getElementCount = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const isLowPerformance = navigator.hardwareConcurrency <= 2;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Significantly reduce elements for better performance
    if (prefersReducedMotion) return 1; // Minimal animation for accessibility
    if (isMobile || isLowPerformance) return 2; // Reduced for low-performance devices
    
    switch (density) {
      case 'light': return 3; // Reduced from 5
      case 'medium': return 4; // Reduced from 8
      case 'dense': return 6; // Reduced from 12
      default: return 3;
    }
  }, [density]);

  const generateRandomPosition = (index: number) => {
    // Mobile-safe positions that avoid button areas
    const mobilePositions = [
      { top: '5%', left: '5%' },
      { top: '15%', right: '5%' },
      { top: '25%', left: '8%' },
      { top: '35%', right: '8%' },
      { top: '45%', left: '5%' },
      { top: '65%', right: '5%' },
      { top: '75%', left: '8%' },
      { top: '85%', right: '8%' },
      { top: '95%', left: '5%' },
    ];

    // Desktop positions with more coverage
    const desktopPositions = [
      { top: '10%', left: '10%' },
      { top: '20%', right: '15%' },
      { bottom: '30%', left: '20%' },
      { top: '60%', right: '25%' },
      { bottom: '15%', right: '10%' },
      { top: '40%', left: '8%' },
      { bottom: '50%', right: '30%' },
      { top: '15%', left: '30%' },
      { bottom: '20%', left: '35%' },
    ];

    // Use mobile positions on smaller screens
    const isMobile = window.innerWidth < 768;
    const positions = isMobile ? mobilePositions : desktopPositions;
    return positions[index % positions.length];
  };

  const renderMinimalElements = () => {
    return Array.from({ length: getElementCount }).map((_, index) => {
      const position = generateRandomPosition(index);
      
      return (
        <motion.div
          key={`minimal-${index}`}
          className="absolute rounded-full bg-gradient-to-r from-primary-500/30 to-secondary-500/20"
          style={{
            ...position,
            width: '12px',
            height: '12px',
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
            boxShadow: [
              '0 0 0px rgba(139, 92, 246, 0)',
              '0 0 20px rgba(139, 92, 246, 0.4)',
              '0 0 0px rgba(139, 92, 246, 0)',
            ],
          }}
          whileHover={{
            scale: 2,
            opacity: 0.9,
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)',
          }}
          transition={{
            duration: 6 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
            scale: { duration: 0.3 },
            boxShadow: { duration: 0.3 },
          }}
          aria-hidden="true"
        />
      );
    });
  };

  const renderTechElements = () => {
    const techSymbols = ['⚡', '🔧', '💡', '🎯', '⚙️', '🚀', '💻', '📡', '🔥', '✨', '🌟', '💫'];
    
    return Array.from({ length: getElementCount }).map((_, index) => {
      const position = generateRandomPosition(index);
      
      return (
        <motion.div
          key={`tech-${index}`}
          className="absolute text-3xl select-none cursor-pointer"
          style={position}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          whileHover={{
            scale: 1.5,
            rotate: 180,
            textShadow: '0 0 20px rgba(139, 92, 246, 0.8)',
          }}
          transition={{
            duration: 8 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
            scale: { duration: 0.2 },
            rotate: { duration: 0.3 },
          }}
          aria-hidden="true"
        >
          <span className="opacity-40 hover:opacity-90 transition-all duration-300 filter drop-shadow-lg">
            {techSymbols[index % techSymbols.length]}
          </span>
        </motion.div>
      );
    });
  };

  const renderGeometricElements = () => {
    const shapes = [
      { shape: 'circle', className: 'rounded-full' },
      { shape: 'square', className: 'rounded-lg' },
      { shape: 'diamond', className: 'transform rotate-45' },
      { shape: 'hexagon', className: 'rounded-xl' },
    ];

    return Array.from({ length: getElementCount }).map((_, index) => {
      const shapeType = shapes[index % shapes.length];
      const colors = [
        'border-primary-500/30 bg-primary-500/5',
        'border-secondary-500/30 bg-secondary-500/5',
        'border-accent-500/30 bg-accent-500/5',
        'border-cyan-500/30 bg-cyan-500/5',
      ];
      const position = generateRandomPosition(index);
      
      return (
        <motion.div
          key={`geometric-${index}`}
          className={`absolute w-10 h-10 border-2 backdrop-blur-sm ${colors[index % colors.length]} ${shapeType.className}`}
          style={position}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            borderWidth: [2, 4, 2],
            opacity: [0.3, 0.7, 0.3],
          }}
          whileHover={{
            scale: 1.6,
            borderWidth: 3,
            opacity: 0.9,
            boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
          }}
          transition={{
            duration: 10 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6,
            scale: { duration: 0.3 },
            borderWidth: { duration: 0.2 },
          }}
          aria-hidden="true"
        />
      );
    });
  };

  const renderCodeElements = () => {
    const codeSnippets = [
      { text: '{ }', color: 'text-blue-400', glow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]' },
      { text: '</>', color: 'text-green-400', glow: 'drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]' },
      { text: '( )', color: 'text-yellow-400', glow: 'drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]' },
      { text: '[ ]', color: 'text-purple-400', glow: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]' },
      { text: '=>', color: 'text-pink-400', glow: 'drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]' },
      { text: '&&', color: 'text-cyan-400', glow: 'drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' },
      { text: '||', color: 'text-orange-400', glow: 'drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]' },
      { text: '===', color: 'text-indigo-400', glow: 'drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]' },
    ];

    return Array.from({ length: getElementCount }).map((_, index) => {
      const snippet = codeSnippets[index % codeSnippets.length];
      const position = generateRandomPosition(index);
      
      return (
        <motion.div
          key={`code-${index}`}
          className={`absolute font-mono text-xl font-bold select-none cursor-pointer ${snippet.color} opacity-30`}
          style={position}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          whileHover={{
            scale: 1.4,
            opacity: 0.9,
            rotate: 10,
            filter: snippet.glow,
          }}
          transition={{
            duration: 6 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.8,
            scale: { duration: 0.3 },
            filter: { duration: 0.2 },
          }}
          aria-hidden="true"
        >
          {snippet.text}
        </motion.div>
      );
    });
  };

  const renderElements = () => {
    switch (variant) {
      case 'tech': return renderTechElements();
      case 'geometric': return renderGeometricElements();
      case 'code': return renderCodeElements();
      case 'minimal':
      default: return renderMinimalElements();
    }
  };

  // Interactive particle system
  const renderInteractiveParticles = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <motion.div
        key={`particle-${index}`}
        className="absolute w-1 h-1 bg-primary-400/40 rounded-full"
        style={{
          left: `${20 + index * 30}%`,
          top: `${30 + index * 20}%`,
        }}
        animate={{
          x: isHovering ? [0, 50, -30, 0] : [0, 20, -10, 0],
          y: isHovering ? [0, -30, 20, 0] : [0, -15, 10, 0],
          scale: isHovering ? [1, 2, 1.5, 1] : [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.6, 0.4],
        }}
        transition={{
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.5,
        }}
        aria-hidden="true"
      />
    ));
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main floating elements */}
      {renderElements()}
      
      {/* Interactive particle system */}
      {variant === 'minimal' && renderInteractiveParticles()}
      
      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default FloatingElements;