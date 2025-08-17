import React from 'react';
import { motion } from 'framer-motion';

interface FloatingElementsProps {
  variant?: 'minimal' | 'tech' | 'geometric' | 'code';
  density?: 'light' | 'medium' | 'dense';
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ 
  variant = 'minimal', 
  density = 'light' 
}) => {
  const getElementCount = () => {
    switch (density) {
      case 'light': return 3;
      case 'medium': return 6;
      case 'dense': return 9;
      default: return 3;
    }
  };

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
    return Array.from({ length: getElementCount() }).map((_, index) => (
      <motion.div
        key={`minimal-${index}`}
        className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
        style={generateRandomPosition(index)}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1],
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

  const renderTechElements = () => {
    const techSymbols = ['⚡', '🔧', '💡', '🎯', '⚙️', '🚀', '💻', '📡', '🔥'];
    
    return Array.from({ length: getElementCount() }).map((_, index) => (
      <motion.div
        key={`tech-${index}`}
        className="absolute text-2xl select-none"
        style={generateRandomPosition(index)}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
        aria-hidden="true"
      >
        <span className="opacity-30 hover:opacity-60 transition-opacity">
          {techSymbols[index % techSymbols.length]}
        </span>
      </motion.div>
    ));
  };

  const renderGeometricElements = () => {
    const shapes = [
      { shape: 'circle', className: 'rounded-full' },
      { shape: 'square', className: 'rounded-lg' },
      { shape: 'triangle', className: 'transform rotate-45' },
    ];

    return Array.from({ length: getElementCount() }).map((_, index) => {
      const shapeType = shapes[index % shapes.length];
      const colors = ['border-primary-500/20', 'border-secondary-500/20', 'border-accent-500/20'];
      
      return (
        <motion.div
          key={`geometric-${index}`}
          className={`absolute w-8 h-8 border-2 ${colors[index % colors.length]} ${shapeType.className}`}
          style={generateRandomPosition(index)}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            borderWidth: [2, 3, 2],
          }}
          transition={{
            duration: 8 + index,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.4,
          }}
          aria-hidden="true"
        />
      );
    });
  };

  const renderCodeElements = () => {
    const codeSnippets = [
      { text: '{ }', color: 'text-blue-400' },
      { text: '< />', color: 'text-green-400' },
      { text: '( )', color: 'text-yellow-400' },
      { text: '[ ]', color: 'text-purple-400' },
      { text: '=>', color: 'text-pink-400' },
      { text: '&&', color: 'text-cyan-400' },
    ];

    return Array.from({ length: getElementCount() }).map((_, index) => {
      const snippet = codeSnippets[index % codeSnippets.length];
      
      return (
        <motion.div
          key={`code-${index}`}
          className={`absolute font-mono text-lg select-none ${snippet.color} opacity-20`}
          style={generateRandomPosition(index)}
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.7,
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

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {renderElements()}
    </div>
  );
};

export default FloatingElements;