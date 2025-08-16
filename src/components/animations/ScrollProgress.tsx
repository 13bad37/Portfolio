import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 z-50"
      style={{ 
        width: `${scrollProgress * 100}%`,
        boxShadow: '0 0 10px rgba(99, 102, 241, 0.7)'
      }}
      initial={{ width: '0%' }}
      animate={{ width: `${scrollProgress * 100}%` }}
      transition={{ duration: 0.1 }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(scrollProgress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export default ScrollProgress;