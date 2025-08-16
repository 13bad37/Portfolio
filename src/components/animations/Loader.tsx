import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const Loader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-dark-500 z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative"
        variants={itemVariants}
      >
        <motion.div
          className="text-primary-500 w-20 h-20 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          <Code2 size={64} />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Infinity
          }}
        />
      </motion.div>
      <motion.div 
        className="mt-8 text-xl font-mono"
        variants={itemVariants}
      >
        <span className="text-secondary-400">initializing</span>
        <motion.span
          className="inline-block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >_</motion.span>
      </motion.div>
      <motion.div
        className="mt-4 bg-dark-400 h-1 w-40 rounded overflow-hidden"
        variants={itemVariants}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Loader;