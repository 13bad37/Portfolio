import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedFloatingElementsProps {
  variant?: 'digital-rain' | 'network-nodes' | 'floating-icons' | 'data-streams' | 'particle-field';
  density?: 'light' | 'medium' | 'dense';
}

const EnhancedFloatingElements: React.FC<EnhancedFloatingElementsProps> = ({ 
  variant = 'digital-rain', 
  density = 'light' 
}) => {
  const getElementCount = () => {
    switch (density) {
      case 'light': return 2;
      case 'medium': return 4;
      case 'dense': return 6;
      default: return 2;
    }
  };

  const renderDigitalRain = () => {
    return Array.from({ length: getElementCount() }).map((_, index) => (
      <motion.div
        key={`rain-${index}`}
        className="absolute font-mono text-xs text-green-400/20 pointer-events-none select-none"
        style={{
          left: `${10 + (index * 15)}%`,
          top: '-10%',
        }}
        animate={{
          y: ['0vh', '110vh'],
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{
          duration: 6 + index * 0.5,
          repeat: Infinity,
          ease: "linear",
          delay: index * 0.8,
        }}
        aria-hidden="true"
      >
        {['01', '10', '11', '00', '01', '11'].map((binary, i) => (
          <div key={i} className="mb-2">
            {binary}
          </div>
        ))}
      </motion.div>
    ));
  };

  const renderNetworkNodes = () => {
    const nodes = Array.from({ length: getElementCount() }).map((_, index) => {
      const positions = [
        { x: 15, y: 20 },
        { x: 85, y: 30 },
        { x: 20, y: 70 },
        { x: 80, y: 75 },
        { x: 50, y: 40 },
        { x: 30, y: 50 },
        { x: 70, y: 60 },
        { x: 60, y: 25 },
        { x: 40, y: 80 },
        { x: 10, y: 90 },
        { x: 90, y: 85 },
        { x: 25, y: 15 },
      ];
      return positions[index % positions.length];
    });

    return (
      <>
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {nodes.map((node, index) => 
            nodes.slice(index + 1).map((targetNode, targetIndex) => {
              const distance = Math.sqrt(
                Math.pow(node.x - targetNode.x, 2) + Math.pow(node.y - targetNode.y, 2)
              );
              if (distance < 40) {
                return (
                  <motion.line
                    key={`line-${index}-${targetIndex}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke="rgba(139, 92, 246, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: [0, 1, 0],
                      opacity: [0, 0.4, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={`node-${index}`}
            className="absolute w-3 h-3 bg-primary-500/60 rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          />
        ))}
      </>
    );
  };

  const renderFloatingIcons = () => {
    const icons = ['⚡', '🔧', '💡', '🎯', '⚙️', '🚀', '💻', '📡', '🔥', '✨', '🎨', '🔬'];
    
    return Array.from({ length: getElementCount() }).map((_, index) => (
      <motion.div
        key={`icon-${index}`}
        className="absolute text-2xl select-none pointer-events-none"
        style={{
          left: `${10 + (index * 8)}%`,
          top: `${15 + (index * 7)}%`,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, Math.sin(index) * 20, 0],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
        aria-hidden="true"
      >
        <span className="opacity-30 hover:opacity-60 transition-opacity duration-300">
          {icons[index % icons.length]}
        </span>
      </motion.div>
    ));
  };

  const renderDataStreams = () => {
    return Array.from({ length: getElementCount() }).map((_, index) => (
      <motion.div
        key={`stream-${index}`}
        className="absolute"
        style={{
          left: `${5 + (index * 12)}%`,
          top: '0%',
          width: '2px',
          height: '100%',
        }}
      >
        <motion.div
          className="w-full bg-gradient-to-b from-transparent via-primary-500/40 to-transparent"
          style={{ height: '20px' }}
          animate={{
            y: ['0%', '500%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4 + index * 0.3,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.6,
          }}
        />
        <motion.div
          className="w-full bg-gradient-to-b from-transparent via-secondary-500/30 to-transparent"
          style={{ height: '15px' }}
          animate={{
            y: ['0%', '600%'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 5 + index * 0.4,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.8 + 1,
          }}
        />
      </motion.div>
    ));
  };

  const renderParticleField = () => {
    return Array.from({ length: getElementCount() * 2 }).map((_, index) => (
      <motion.div
        key={`particle-${index}`}
        className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, Math.sin(index) * 50, 0],
          y: [0, Math.cos(index) * 30, 0],
          scale: [0.5, 1.2, 0.5],
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 4 + index * 0.1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        }}
        aria-hidden="true"
      />
    ));
  };

  const renderElements = () => {
    switch (variant) {
      case 'network-nodes': return renderNetworkNodes();
      case 'floating-icons': return renderFloatingIcons();
      case 'data-streams': return renderDataStreams();
      case 'particle-field': return renderParticleField();
      case 'digital-rain':
      default: return renderDigitalRain();
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {renderElements()}
    </div>
  );
};

export default EnhancedFloatingElements;