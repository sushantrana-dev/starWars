import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilm, FaHome } from 'react-icons/fa';
import ThemeToggle from '@/components/atoms/ThemeToggle/ThemeToggle';

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.header
      className="bg-background-secondary/95 backdrop-blur-md border-b border-gray-800 shadow-xl theme-transition sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
            <motion.div
              className="text-primary-gold"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaFilm size={24} className="md:w-8 md:h-8" />
            </motion.div>
            <div>
              <h1 className="text-xl md:text-3xl lg:text-4xl font-star-wars text-primary-gold group-hover:text-yellow-400 transition-colors drop-shadow-lg">
                Star Wars
              </h1>
              <p className="text-xs md:text-sm theme-text-muted hidden sm:block font-medium">Movie Database</p>
            </div>
          </Link>

          {/* Theme Toggle and Decorative Elements */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            
            {/* Decorative Elements - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                className="w-2 h-2 bg-primary-gold rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-primary-blue rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="w-2 h-2 bg-primary-red rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 