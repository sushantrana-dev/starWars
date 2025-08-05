import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: number | string;
  color: 'gold' | 'blue' | 'red' | 'green';
  delay?: number;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  color,
  delay = 0,
  className = '',
}) => {
  const colorClasses = {
    gold: 'text-primary-gold',
    blue: 'text-primary-blue',
    red: 'text-primary-red',
    green: 'text-green-400',
  };

  const gradientClasses = {
    gold: 'from-primary-gold/10 to-transparent',
    blue: 'from-primary-blue/10 to-transparent',
    red: 'from-primary-red/10 to-transparent',
    green: 'from-green-400/10 to-transparent',
  };

  return (
    <motion.div 
      className={`theme-card text-center p-4 md:p-6 relative overflow-hidden group rounded-xl ${className}`}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2, delay }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[color]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className={`text-2xl md:text-3xl font-bold ${colorClasses[color]} mb-1`}>
          {value}
        </div>
        <div className="text-sm md:text-base theme-text-muted font-medium">
          {title}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard; 