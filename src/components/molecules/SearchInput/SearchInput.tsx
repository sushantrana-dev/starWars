import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  initialValue?: string;
  className?: string;
  debounceMs?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  initialValue = '',
  className = '',
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);
  const onSearchRef = useRef(onSearch);

  // Update the ref when onSearch changes
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Update local state when initialValue changes
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearchRef.current(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearchRef.current('');
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <FaSearch
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 theme-text-muted transition-colors ${
            isFocused ? 'text-primary-gold' : ''
          }`}
          size={18}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-background-secondary border border-border-primary rounded-2xl theme-text-primary placeholder-theme-text-muted focus:outline-none focus:ring-2 focus:ring-primary-gold focus:border-transparent theme-transition shadow-lg"
        />
        {searchTerm && (
          <motion.button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 theme-text-muted hover:text-primary-red transition-colors p-1 rounded-full hover:bg-red-500/10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Clear search"
          >
            <FaTimes size={16} />
          </motion.button>
        )}
      </div>
      
      {/* Search indicator */}
      {searchTerm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -bottom-6 left-0 text-xs theme-text-muted"
        >
          Searching for "{searchTerm}"...
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchInput;
