import React from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
  'data-testid'?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  onClick,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-pressed': ariaPressed,
  'data-testid': dataTestId,
}) => {
  const isDisabled = disabled || loading;

  const baseClasses = [
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-gold',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'hover:scale-105 active:scale-95',
  ];

  const variantClasses = {
    primary: 'bg-primary-gold text-background-primary hover:bg-yellow-400 focus:ring-primary-gold',
    secondary: 'bg-background-secondary text-theme-text-primary hover:bg-background-card focus:ring-primary-gold',
    outline: 'border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-background-primary focus:ring-primary-gold',
    ghost: 'text-theme-text-primary hover:bg-background-secondary focus:ring-primary-gold',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = [
    ...baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].join(' ');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!isDisabled && onClick) {
        onClick();
      }
    }
  };

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      data-testid={dataTestId}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
    >
      {loading && (
        <motion.div
          className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {Icon && !loading && (
        <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
      )}
      <span className={loading ? 'opacity-50' : ''}>
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
