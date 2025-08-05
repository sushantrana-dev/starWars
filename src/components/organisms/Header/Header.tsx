import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilm } from 'react-icons/fa';
import ThemeToggle from '@/components/atoms/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-background-primary/95 backdrop-blur-sm border-b border-border-primary theme-transition"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="text-2xl text-primary-gold"
            >
              <FaFilm />
            </motion.div>
            <motion.h1 
              className="text-xl font-bold theme-text-primary group-hover:text-primary-gold transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Star Wars Explorer
            </motion.h1>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 