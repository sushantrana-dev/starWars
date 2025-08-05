import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  hover = true,
  interactive = false,
  className = '',
  onClick,
  ...props
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

  const MotionComponent = interactive || onClick ? motion.div : 'div';

  return (
    <MotionComponent
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Card; 