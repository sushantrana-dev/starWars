import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  hover = true,
  interactive = false,
  className = '',
  onClick,
  style,
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200 theme-transition';
  
  const variantClasses = {
    default: 'theme-card',
    elevated: 'bg-background-card shadow-lg hover:shadow-xl border border-border-secondary rounded-xl',
    outlined: 'bg-transparent border-2 border-primary-gold rounded-xl',
    glass: 'bg-background-card bg-opacity-50 backdrop-blur-sm border border-border-primary rounded-xl',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
  };

  const interactiveClasses = interactive ? 'cursor-pointer' : '';
  const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-lg' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${interactiveClasses} ${hoverClasses} ${className}`;

  if (interactive || onClick) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        style={style}
        whileHover={hover ? { y: -2 } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default Card; 