import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        <div className="theme-card p-8 md:p-12 rounded-xl">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <FaExclamationTriangle className="text-primary-red text-8xl mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-primary-red mb-4"
          >
            404
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-semibold theme-text-primary mb-6"
          >
            Page Not Found
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="theme-text-muted text-lg mb-8 max-w-md mx-auto"
          >
            The Force is not strong with this page. The route you're looking for doesn't exist in our galaxy.
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-8 space-x-2"
          >
            <motion.div
              className="w-2 h-2 bg-primary-gold rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary-blue rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary-red rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/">
              <Button
                variant="primary"
                icon={FaHome}
                className="w-full sm:w-auto"
              >
                Go Home
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="secondary"
                icon={FaSearch}
                className="w-full sm:w-auto"
              >
                Browse Movies
              </Button>
            </Link>
          </motion.div>

          {/* Additional help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-border-primary"
          >
            <p className="theme-text-muted text-sm">
              Try checking the URL for typos, or use the navigation above to find what you're looking for.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound; 