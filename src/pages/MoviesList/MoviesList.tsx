import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import { useGetMoviesQuery } from '@/features/movies/moviesApi';
import { setMovies, setFilters, setSortConfig } from '@/features/movies/moviesSlice';
import {
  selectSortedMovies,
  selectFilters,
  selectMovieStats,
  selectSortConfig,
} from '@/features/movies/selectors';
import VirtualTable from '@/components/molecules/VirtualTable/VirtualTable';
import SearchInput from '@/components/molecules/SearchInput/SearchInput';

import Skeleton from '@/components/atoms/Skeleton/Skeleton';
import Button from '@/components/atoms/Button/Button';
import FilterPanel from '@/components/molecules/FilterPanel/FilterPanel';
import StatsCard from '@/components/molecules/StatsCard/StatsCard';
import { Movie, Column } from '@/types/api';
import { AppDispatch } from '@/store';
import { formatYear } from '@/utils/formatting';

/**
 * MoviesList Component
 * 
 * Main page component that displays a list of Star Wars movies with:
 * - Virtualized table for performance
 * - Advanced search and filtering
 * - Statistics cards
 * - Skeleton loading states
 * - Responsive design
 * 
 * @returns JSX.Element - The rendered movies list page
 */
const MoviesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showFilters, setShowFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({
    director: '',
    producer: '',
    year: '',
  });

  // Fetch movies
  const { data: moviesData, isLoading, error } = useGetMoviesQuery();

  // Selectors
  const movies = useSelector(selectSortedMovies);
  const filters = useSelector(selectFilters);
  const stats = useSelector(selectMovieStats);
  const sortConfig = useSelector(selectSortConfig);

  // Set movies in store when data is fetched
  useEffect(() => {
    if (moviesData) {
      dispatch(setMovies(moviesData));
    }
  }, [moviesData, dispatch]);

  /**
   * Handles search input changes with debouncing
   * Memoized to prevent infinite re-renders
   * 
   * @param searchTerm - The search term entered by user
   */
  const handleSearch = useCallback(
    (searchTerm: string) => {
      dispatch(setFilters({ ...filters, search: searchTerm }));
    },
    [dispatch] // Remove filters dependency to prevent infinite loops
  );

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    dispatch(setFilters({ ...filters, ...filterValues }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilterValues({ director: '', producer: '', year: '' });
    dispatch(setFilters({ search: filters.search }));
  };

  // Handle column sorting
  const handleSort = useCallback(
    (key: keyof Movie) => {
      const newDirection = 
        sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
      dispatch(setSortConfig({ key, direction: newDirection }));
    },
    [dispatch, sortConfig]
  );

  // Table columns with sortable attributes and responsive design
  const columns: Column<Movie>[] = [
    {
      key: 'episode_id',
      header: 'Episode',
      minWidth: 80,
      flex: 0.5,
      render: (value) => `${value}`,
      sortable: true,
      responsive: false,
    },
    {
      key: 'title',
      header: 'Title',
      minWidth: 200,
      flex: 2,
      render: (value) => (
        <span className='font-semibold theme-text-primary'>{String(value)}</span>
      ),
      sortable: true,
      responsive: false,
    },
    {
      key: 'director',
      header: 'Director',
      minWidth: 120,
      flex: 1,
      sortable: true,
      responsive: true,
    },
    {
      key: 'producer',
      header: 'Producer',
      minWidth: 120,
      flex: 1,
      sortable: true,
      responsive: true,
    },
    {
      key: 'release_date',
      header: 'Release Date',
      minWidth: 100,
      flex: 0.8,
      render: (value) => formatYear(String(value)),
      sortable: true,
      responsive: false,
    },
  ];

  // Handle row click
  const handleRowClick = (movie: Movie) => {
    window.location.href = `/movie/${movie.id}`;
  };

  if (isLoading) {
    return (
      <div className='min-h-screen'>
        <div className='space-y-6 md:space-y-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-6'>
          {/* Header Skeleton */}
          <motion.div 
            className='text-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Skeleton type="title" className="mx-auto mb-3" />
            <Skeleton type="text" lines={2} className="max-w-2xl mx-auto" />
          </motion.div>

          {/* Stats Skeleton */}
          <motion.div 
            className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} type="card" />
            ))}
          </motion.div>

          {/* Search Skeleton */}
          <motion.div 
            className='space-y-4'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Skeleton type="button" className="h-12" />
            <Skeleton type="card" className="h-32" />
          </motion.div>

          {/* Table Skeleton */}
          <motion.div 
            className="w-full overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Skeleton type="table-row" className="mb-2" />
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} type="table-row" className="mb-1" />
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-bold text-primary-red mb-4'>
          Error Loading Movies
        </h2>
        <p className='theme-text-muted'>
          Failed to load movies from the Star Wars API.
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      <div className='space-y-6 md:space-y-8 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className='text-center relative'
        >
          {/* Background decoration */}
          <div className='absolute inset-0 flex items-center justify-center opacity-5'>
            <div className='w-32 h-32 border-2 border-primary-gold rounded-full'></div>
          </div>
          
          {/* <h1 className='heading mb-3 text-2xl md:text-4xl lg:text-5xl relative z-10'>
            Star Wars Movies
          </h1> */}
          <p className='body-text theme-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed'>
            Explore {stats.totalMovies} Episodes from the Star Wars universe
          </p>
          
          {/* Decorative elements */}
          <div className='flex justify-center mt-4 space-x-2'>
            <motion.div
              className='w-2 h-2 bg-primary-gold rounded-full'
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className='w-2 h-2 bg-primary-blue rounded-full'
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className='w-2 h-2 bg-primary-red rounded-full'
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'
      >
        <StatsCard
          title="Episodes"
          value={stats.totalMovies}
          color="gold"
          delay={0}
        />
        <StatsCard
          title="Characters"
          value={stats.totalCharacters}
          color="blue"
          delay={0.1}
        />
        <StatsCard
          title="Planets"
          value={stats.totalPlanets}
          color="red"
          delay={0.2}
        />
        <StatsCard
          title="Starships"
          value={stats.totalStarships}
          color="green"
          delay={0.3}
        />
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className='space-y-4'
      >
        <div className='flex flex-col md:flex-row gap-3 md:gap-4'>
          <div className='flex-1'>
            <SearchInput
              placeholder='Search movies by title or description...'
              onSearch={handleSearch}
              initialValue={filters.search}
            />
          </div>
          <Button
            variant='secondary'
            icon={FaFilter}
            onClick={() => setShowFilters(!showFilters)}
            className="w-full md:w-auto"
          >
            <span className="hidden sm:inline">Filters</span>
            <span className="sm:hidden">Filter</span>
          </Button>
        </div>

        
      </motion.div>
{/* Filter Panel */}
        {showFilters && <FilterPanel
          onClose={() => setShowFilters(false)}
          filters={filterValues}
          onFilterChange={handleFilterChange}
          onApplyFilters={applyFilters}
          onClearFilters={clearFilters}
          options={{
            directors: stats.directors,
            producers: stats.producers,
            years: stats.years,
          }}
        />}
      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="w-full overflow-hidden"
      >
        <VirtualTable
          data={movies}
          columns={columns}
          height={400}
          onRowClick={handleRowClick}
          sortConfig={sortConfig}
          onSort={handleSort}
          className="w-full"
        />
      </motion.div>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className='text-center theme-text-muted text-sm md:text-base'
      >
        Showing {movies.length} of {stats.totalMovies} movies
      </motion.div>
      </div>
    </div>
  );
};

export default MoviesList;
