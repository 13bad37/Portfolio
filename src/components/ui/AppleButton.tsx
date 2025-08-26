import React from 'react';
import { motion } from 'framer-motion';

interface AppleButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}


const AppleButton: React.FC<AppleButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  disabled = false,
  loading = false,
}) => {
  const baseClasses = `
    relative overflow-hidden font-medium transition-all duration-200 
    transform-gpu will-change-transform touch-target
    focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-dark-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    select-none cursor-pointer
  `;

  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 border border-primary-600/50',
    secondary: 'bg-dark-600 hover:bg-dark-500 text-white border border-dark-400 hover:border-primary-500/50 shadow-lg shadow-dark-600/25',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-primary-500/50 backdrop-blur-sm',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg min-h-[40px]',
    md: 'px-6 py-3 text-base rounded-lg min-h-[44px]',
    lg: 'px-8 py-4 text-lg rounded-xl min-h-[52px]',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const buttonContent = (
    <>
      {/* Enhanced shimmer effect overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out"
          aria-hidden="true"
        />
      </div>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        aria-hidden="true"
      />
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.div 
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>
    </>
  );

  // Enhanced Apple-inspired motion properties
  const motionProps = {
    whileHover: disabled ? {} : { 
      y: -3, 
      scale: 1.02,
      boxShadow: variant === 'primary' 
        ? '0 15px 35px -5px rgba(139, 92, 246, 0.4), 0 5px 15px -5px rgba(139, 92, 246, 0.2)' 
        : variant === 'secondary'
        ? '0 15px 35px -5px rgba(0, 0, 0, 0.3), 0 5px 15px -5px rgba(139, 92, 246, 0.1)'
        : '0 15px 35px -5px rgba(255, 255, 255, 0.1), 0 5px 15px -5px rgba(139, 92, 246, 0.2)',
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 400,
        mass: 0.8
      }
    },
    whileTap: disabled ? {} : { 
      y: -1, 
      scale: 0.98,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 500,
        mass: 0.5
      }
    },
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 400,
      mass: 0.8
    }
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        {...motionProps}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      {...motionProps}
      // Enhanced accessibility
      aria-busy={loading}
      aria-disabled={disabled}
      role="button"
    >
      {buttonContent}
    </motion.button>
  );
};

export default AppleButton;
