import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  error?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  className?: string;
  name?: string;
  id?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-required'?: boolean;
  'data-testid'?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = 'text',
  icon: Icon,
  iconPosition = 'left',
  error,
  disabled = false,
  required = false,
  readOnly = false,
  className = '',
  name,
  id,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  autoFocus,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  onKeyPress,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-required': ariaRequired,
  'data-testid': dataTestId,
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 bg-background-secondary border rounded-xl theme-text-primary focus:outline-none focus:ring-2 focus:ring-primary-gold theme-transition disabled:opacity-50 disabled:cursor-not-allowed';
  const errorClasses = error ? 'border-primary-red focus:ring-primary-red' : 'border-border-primary focus:ring-primary-gold';
  const iconClasses = Icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium theme-text-secondary">
          {label}
          {required && <span className="text-primary-red ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-muted">
            <Icon size={18} />
          </div>
        )}
        
        <motion.input
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          name={name}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onKeyPress={onKeyPress}
          className={`${baseClasses} ${errorClasses} ${iconClasses} ${className}`}
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedby}
          aria-required={ariaRequired}
          aria-invalid={!!error}
          data-testid={dataTestId}
          whileFocus={{ scale: 1.01 }}
        />
        
        {Icon && iconPosition === 'right' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 theme-text-muted">
            <Icon size={18} />
          </div>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-primary-red"
          id={ariaDescribedby}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 