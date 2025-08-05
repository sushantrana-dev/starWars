import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  icon?: IconType;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
  error,
  disabled = false,
  required = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}, ref) => {
  const baseClasses = 'w-full px-3 py-2 bg-background-secondary border rounded-xl theme-text-primary focus:outline-none focus:ring-2 focus:ring-primary-gold theme-transition disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer';
  const errorClasses = error ? 'border-primary-red focus:ring-primary-red' : 'border-border-primary focus:ring-primary-gold';
  const iconClasses = Icon ? 'pl-10' : '';

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium theme-text-secondary">
          {label}
          {required && <span className="text-primary-red ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 theme-text-muted pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        
        <motion.select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          className={`${baseClasses} ${errorClasses} ${iconClasses}`}
          aria-label={ariaLabel || label}
          aria-describedby={ariaDescribedby}
          aria-invalid={!!error}
          whileFocus={{ scale: 1.01 }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </motion.select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 theme-text-muted pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

Select.displayName = 'Select';

export default Select; 