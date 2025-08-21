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

/**
 * Apple-inspired button component with sophisticated animations
 * Features:
 * - Smooth scale and elevation animations
 * - Shimmer effect on hover
 * - Hardware-accelerated transforms
 * - Proper touch targets for mobile
 * - Loading states with spinner
 */
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
  `;

  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25',
    secondary: 'bg-dark-600 hover:bg-dark-500 text-white border border-dark-400 hover:border-primary-500/50',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-primary-500/50',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const buttonContent = (
    <>
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"
          aria-hidden="true"
        />
      </div>
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </span>
    </>
  );

  const motionProps = {
    whileHover: disabled ? {} : { 
      y: -2, 
      scale: 1.02,
      boxShadow: variant === 'primary' 
        ? '0 10px 25px -5px rgba(139, 92, 246, 0.4)' 
        : '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
    },
    whileTap: disabled ? {} : { 
      y: 0, 
      scale: 0.98 
    },
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
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
    >
      {buttonContent}
    </motion.button>
  );
};

export default AppleButton;