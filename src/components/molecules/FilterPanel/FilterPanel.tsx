import React from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import Select from '@/components/atoms/Select/Select';
import Button from '@/components/atoms/Button/Button';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPanelProps {
  onClose: () => void;
  filters: {
    director: string;
    producer: string;
    year: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  options: {
    directors: string[];
    producers: string[];
    years: string[];
  };
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onClose,
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  options,
  className = '',
}) => {
  const directorOptions: FilterOption[] = [
    { value: '', label: 'All Directors' },
    ...options.directors.map(director => ({ value: director, label: director }))
  ];

  const producerOptions: FilterOption[] = [
    { value: '', label: 'All Producers' },
    ...options.producers.map(producer => ({ value: producer, label: producer }))
  ];

  const yearOptions: FilterOption[] = [
    { value: '', label: 'All Years' },
    ...options.years.map(year => ({ value: year, label: year }))
  ];



  return (
    <div
      className={`theme-card p-6 border-2 border-primary-gold border-opacity-30 filter-panel rounded-xl ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FaFilter className="text-primary-gold" />
          <h3 className="text-lg font-semibold theme-text-primary">Filters</h3>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={FaTimes}
          onClick={onClose}
          aria-label="Close filters"
        >
          Close
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Director"
          value={filters.director}
          onChange={(value) => onFilterChange('director', value)}
          options={directorOptions}
          icon={FaFilter}
        />
        
        <Select
          label="Producer"
          value={filters.producer}
          onChange={(value) => onFilterChange('producer', value)}
          options={producerOptions}
          icon={FaFilter}
        />
        
        <Select
          label="Year"
          value={filters.year}
          onChange={(value) => onFilterChange('year', value)}
          options={yearOptions}
          icon={FaFilter}
        />
      </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-border-primary">
        <Button 
          variant="secondary" 
          onClick={onClearFilters} 
          className="w-full sm:w-auto"
        >
          Clear Filters
        </Button>
        <Button 
          variant="primary" 
          onClick={onApplyFilters} 
          className="w-full sm:w-auto"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel; 