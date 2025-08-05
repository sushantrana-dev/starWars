import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';

// Base selectors
export const selectMovies = (state: RootState) => state.movies.movies;
export const selectSelectedMovie = (state: RootState) =>
  state.movies.selectedMovie;
export const selectLoading = (state: RootState) => state.movies.loading;
export const selectError = (state: RootState) => state.movies.error;
export const selectSortConfig = (state: RootState) => state.movies.sortConfig;
export const selectFilters = (state: RootState) => state.movies.filters;
export const selectPagination = (state: RootState) => state.movies.pagination;

// Filtered movies selector
export const selectFilteredMovies = createSelector(
  [selectMovies, selectFilters],
  (movies, filters) => {
    if (
      !filters.search &&
      !filters.director &&
      !filters.producer &&
      !filters.year
    ) {
      return movies;
    }

    return movies.filter((movie) => {
      const searchMatch =
        !filters.search ||
        movie.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        movie.opening_crawl
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const directorMatch =
        !filters.director ||
        movie.director.toLowerCase().includes(filters.director.toLowerCase());

      const producerMatch =
        !filters.producer ||
        movie.producer.toLowerCase().includes(filters.producer.toLowerCase());

      const yearMatch =
        !filters.year || movie.release_date.startsWith(filters.year);

      return searchMatch && directorMatch && producerMatch && yearMatch;
    });
  }
);

// Sorted movies selector
export const selectSortedMovies = createSelector(
  [selectFilteredMovies, selectSortConfig],
  (movies, sortConfig) => {
    const sortedMovies = [...movies];

    sortedMovies.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue;
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      return 0;
    });

    return sortedMovies;
  }
);

// Movie statistics selector
export const selectMovieStats = createSelector([selectMovies], (movies) => {
  const totalMovies = movies.length;
  const totalCharacters = movies.reduce(
    (sum, movie) => sum + movie.characters.length,
    0
  );
  const totalPlanets = movies.reduce(
    (sum, movie) => sum + movie.planets.length,
    0
  );
  const totalStarships = movies.reduce(
    (sum, movie) => sum + movie.starships.length,
    0
  );

  const directors = [...new Set(movies.map((movie) => movie.director))];
  const producers = [...new Set(movies.map((movie) => movie.producer))];

  const years = [
    ...new Set(movies.map((movie) => movie.release_date.split('-')[0])),
  ].sort();

  return {
    totalMovies,
    totalCharacters,
    totalPlanets,
    totalStarships,
    directors,
    producers,
    years,
  };
});

// Unique values for filters
export const selectUniqueDirectors = createSelector([selectMovies], (movies) =>
  [...new Set(movies.map((movie) => movie.director))].sort()
);

export const selectUniqueProducers = createSelector([selectMovies], (movies) =>
  [...new Set(movies.map((movie) => movie.producer))].sort()
);

export const selectUniqueYears = createSelector([selectMovies], (movies) =>
  [...new Set(movies.map((movie) => movie.release_date.split('-')[0]))].sort()
);
