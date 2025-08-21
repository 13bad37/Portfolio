import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedDividerProps {
  type?: 'dots' | 'wave' | 'gradient' | 'tech';
  className?: string;
}

const AnimatedDivider: React.FC<AnimatedDividerProps> = ({ type = 'gradient', className = '' }) => {
  const renderDivider = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={`flex justify-center items-center space-x-2 py-8 ${className}`}>
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case 'wave':
        return (
          <div className={`relative h-16 overflow-hidden ${className}`}>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0,60 Q300,10 600,60 T1200,60 L1200,120 L0,120 Z"
                fill="url(#waveGradient)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );

      case 'tech':
        return (
          <div className={`flex justify-center items-center py-8 ${className}`}>
            <div className="flex items-center space-x-4">
              <motion.div
                className="text-primary-500"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ⚙️
              </motion.div>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent"
                style={{ width: '200px' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                className="text-secondary-500"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                💻
              </motion.div>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-secondary-500 to-transparent"
                style={{ width: '200px' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.div
                className="text-accent-500"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                🚀
              </motion.div>
            </div>
          </div>
        );

      case 'gradient':
      default:
        return (
          <div className={`relative py-8 ${className}`}>
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent mx-auto"
              style={{ width: '60%' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-primary-500/30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {renderDivider()}
    </motion.div>
  );
};

export default AnimatedDivider;
