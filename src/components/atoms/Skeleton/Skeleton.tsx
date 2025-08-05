import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  type?: 'text' | 'title' | 'avatar' | 'button' | 'card' | 'table-row';
  lines?: number;
  className?: string;
  width?: string | number;
  height?: string | number;
  'data-testid'?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  lines = 1,
  className = '',
  width,
  height,
  'data-testid': dataTestId,
}) => {
  const baseClasses = 'bg-skeleton rounded animate-skeleton-pulse';
  
  const getSkeletonClasses = () => {
    switch (type) {
      case 'title':
        return 'h-8 w-3/4';
      case 'avatar':
        return 'h-12 w-12 rounded-full';
      case 'button':
        return 'h-10 w-24';
      case 'card':
        return 'h-32 w-full';
      case 'table-row':
        return 'h-16 w-full';
      default:
        return 'h-4 w-full';
    }
  };

  const getSkeletonStyle = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    return style;
  };

  if (type === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`${baseClasses} ${getSkeletonClasses()}`}
            style={getSkeletonStyle()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            data-testid={dataTestId}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${getSkeletonClasses()} ${className}`}
      style={getSkeletonStyle()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      data-testid={dataTestId}
    />
  );
};

export default Skeleton; 