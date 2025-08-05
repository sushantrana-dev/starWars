import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaCalendar,
  FaUser,
  FaFilm,
  FaGlobe,
  FaRocket,
} from 'react-icons/fa';
import { useGetMovieByIdQuery } from '@/features/movies/moviesApi';

import Button from '@/components/atoms/Button/Button';
import Skeleton from '@/components/atoms/Skeleton/Skeleton';
import { isValidMovieId } from '@/utils/validation';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Validate movie ID before making API call
  if (!id || !isValidMovieId(id)) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-bold text-primary-red mb-4'>
          Invalid Movie ID
        </h2>
        <p className='text-gray-400 mb-6'>
          The movie ID "{id}" is not valid. Please use a number between 1 and 6.
        </p>
        <Link to='/'>
          <Button variant='primary' icon={FaArrowLeft}>
            Back to Movies
          </Button>
        </Link>
      </div>
    );
  }
  
  const { data: movie, isLoading, error } = useGetMovieByIdQuery(id);

  if (isLoading) {
    return (
      <div className='space-y-8'>
        {/* Back Button Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Skeleton type="button" className="w-32" />
        </motion.div>
        
        {/* Movie Header Skeleton */}
        <motion.div 
          className='text-center space-y-4'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Skeleton type="title" className="mx-auto" />
          <div className='flex justify-center space-x-6'>
            <Skeleton type="text" className="w-24" />
            <Skeleton type="text" className="w-20" />
          </div>
        </motion.div>

        {/* Movie Content Skeleton */}
        <motion.div 
          className='grid grid-cols-1 lg:grid-cols-3 gap-8'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Opening Crawl Skeleton */}
            <div className='card'>
              <Skeleton type="title" className="mb-4" />
              <Skeleton type="text" lines={4} />
            </div>

            {/* Movie Details Skeleton */}
            <div className='card'>
              <Skeleton type="title" className="mb-4" />
              <div className='grid grid-cols-2 gap-4'>
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
                <Skeleton type="text" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Cast Skeleton */}
            <div className='card'>
              <Skeleton type="title" className="mb-4" />
              <div className='space-y-2'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} type="text" />
                ))}
              </div>
            </div>

            {/* Planets Skeleton */}
            <div className='card'>
              <Skeleton type="title" className="mb-4" />
              <div className='space-y-2'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} type="text" />
                ))}
              </div>
            </div>

            {/* Starships Skeleton */}
            <div className='card'>
              <Skeleton type="title" className="mb-4" />
              <div className='space-y-2'>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} type="text" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className='text-center py-12'>
        <h2 className='text-2xl font-bold text-primary-red mb-4'>
          Movie Not Found
        </h2>
        <p className='text-gray-400 mb-6'>
          The movie you're looking for doesn't exist in this galaxy.
        </p>
        <Link to='/'>
          <Button variant='primary' icon={FaArrowLeft}>
            Back to Movies
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to='/'>
          <Button variant='secondary' icon={FaArrowLeft}>
            Back to Movies
          </Button>
        </Link>
      </motion.div>

      {/* Movie Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className='text-center'
      >
        <h1 className='heading mb-4'>{movie.title}</h1>
        <div className='flex justify-center items-center space-x-6 text-gray-400'>
          <div className='flex items-center space-x-2'>
            <FaFilm />
            <span>Episode {movie.episode_id}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <FaCalendar />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
        </div>
      </motion.div>

      {/* Movie Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className='lg:col-span-2 space-y-6'
        >
          {/* Opening Crawl */}
          <div className='card'>
            <h2 className='subheading mb-4'>Opening Crawl</h2>
            <div className='bg-background-secondary p-6 rounded-lg border-l-4 border-primary-gold'>
              <p className='body-text leading-relaxed italic'>
                {movie.opening_crawl}
              </p>
            </div>
          </div>

          {/* Movie Details */}
          <div className='card'>
            <h2 className='subheading mb-4'>Movie Details</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='text-sm text-gray-400'>Director</label>
                <p className='body-text font-semibold'>{movie.director}</p>
              </div>
              <div>
                <label className='text-sm text-gray-400'>Producer</label>
                <p className='body-text font-semibold'>{movie.producer}</p>
              </div>
              <div>
                <label className='text-sm text-gray-400'>Release Date</label>
                <p className='body-text font-semibold'>
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className='text-sm text-gray-400'>Episode</label>
                <p className='body-text font-semibold'>
                  Episode {movie.episode_id}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className='space-y-6'
        >
          {/* Statistics */}
          <div className='card'>
            <h2 className='subheading mb-4'>Statistics</h2>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <FaUser className='text-primary-blue' />
                  <span className='text-sm text-gray-400'>Characters</span>
                </div>
                <span className='font-semibold theme-text-primary'>
                  {movie.characters.length}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <FaGlobe className='text-primary-red' />
                  <span className='text-sm text-gray-400'>Planets</span>
                </div>
                <span className='font-semibold theme-text-primary'>
                  {movie.planets.length}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <FaRocket className='text-green-400' />
                  <span className='text-sm text-gray-400'>Starships</span>
                </div>
                <span className='font-semibold theme-text-primary'>
                  {movie.starships.length}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <FaFilm className='text-primary-gold' />
                  <span className='text-sm text-gray-400'>Vehicles</span>
                </div>
                <span className='font-semibold theme-text-primary'>
                  {movie.vehicles.length}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <FaUser className='text-purple-400' />
                  <span className='text-sm text-gray-400'>Species</span>
                </div>
                <span className='font-semibold theme-text-primary'>
                  {movie.species.length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='card'>
            <h2 className='subheading mb-4'>Quick Links</h2>
            <div className='space-y-2'>
              <Link
                to='/'
                className='block w-full text-left px-4 py-2 rounded-lg bg-background-secondary hover:bg-background-card transition-colors theme-text-secondary hover:theme-text-primary'
              >
                ← Back to Movies
              </Link>
              <a
                href={movie.url}
                target='_blank'
                rel='noopener noreferrer'
                className='block w-full text-left px-4 py-2 rounded-lg bg-background-secondary hover:bg-background-card transition-colors theme-text-secondary hover:theme-text-primary'
              >
                View on SWAPI
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Metadata */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='text-center text-gray-500 text-sm'
      >
        <p>Created: {new Date(movie.created).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(movie.edited).toLocaleDateString()}</p>
      </motion.div>
    </div>
  );
};

export default MovieDetail;
