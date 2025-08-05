import { 
  setMovies, 
  setFilters, 
  setSortConfig,
  setSelectedMovie,
  setLoading,
  setError,
  setPagination,
  addMovies,
  clearMovies
} from './moviesSlice';
import moviesReducer from './moviesSlice';

describe('Movies Slice', () => {
  const mockMovies = [
    {
      id: '1',
      title: 'A New Hope',
      episode_id: 4,
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      release_date: '1977-05-25',
      opening_crawl: 'It is a period of civil war...',
      created: '2014-12-10T14:23:31.880000Z',
      edited: '2014-12-20T19:49:45.256000Z',
    },
    {
      id: '2',
      title: 'The Empire Strikes Back',
      episode_id: 5,
      director: 'Irvin Kershner',
      producer: 'Gary Kurtz',
      release_date: '1980-05-17',
      opening_crawl: 'It is a dark time for the Rebellion...',
      created: '2014-12-12T11:26:24.656000Z',
      edited: '2014-12-15T13:07:53.386000Z',
    },
  ];

  const initialState = {
    movies: [],
    selectedMovie: null,
    loading: false,
    error: null,
    sortConfig: { key: 'title', direction: 'asc' },
    filters: {},
    pagination: { page: 1, hasMore: true, loading: false },
  };

  describe('Initial State', () => {
    it('should return initial state', () => {
      expect(moviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('Movies Management', () => {
    it('should set movies in state', () => {
      const action = setMovies(mockMovies);
      const newState = moviesReducer(initialState, action);
      
      expect(newState.movies).toEqual(mockMovies);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
    });

    it('should add movies to existing list', () => {
      const existingState = { ...initialState, movies: [mockMovies[0]] };
      const action = addMovies([mockMovies[1]]);
      const newState = moviesReducer(existingState, action);
      
      expect(newState.movies).toHaveLength(2);
      expect(newState.movies).toEqual([mockMovies[0], mockMovies[1]]);
    });

    it('should clear movies and reset pagination', () => {
      const existingState = {
        ...initialState,
        movies: mockMovies,
        pagination: { page: 3, hasMore: false, loading: true },
      };
      
      const action = clearMovies();
      const newState = moviesReducer(existingState, action);
      
      expect(newState.movies).toEqual([]);
      expect(newState.pagination.page).toBe(1);
      expect(newState.pagination.hasMore).toBe(true);
    });
  });

  describe('Filters and Sorting', () => {
    it('should set filters and reset pagination', () => {
      const filters = { search: 'hope', director: 'George Lucas' };
      const action = setFilters(filters);
      const newState = moviesReducer(initialState, action);
      
      expect(newState.filters).toEqual(filters);
      expect(newState.pagination.page).toBe(1);
    });

    it('should set sort configuration', () => {
      const sortConfig = { key: 'title', direction: 'asc' as const };
      const action = setSortConfig(sortConfig);
      const newState = moviesReducer(initialState, action);
      
      expect(newState.sortConfig).toEqual(sortConfig);
    });
  });

  describe('UI State', () => {
    it('should set selected movie', () => {
      const action = setSelectedMovie(mockMovies[0]);
      const newState = moviesReducer(initialState, action);
      
      expect(newState.selectedMovie).toEqual(mockMovies[0]);
    });

    it('should set loading state', () => {
      const action = setLoading(true);
      const newState = moviesReducer(initialState, action);
      
      expect(newState.loading).toBe(true);
    });

    it('should set error and clear loading', () => {
      const error = 'Something went wrong';
      const action = setError(error);
      const newState = moviesReducer(initialState, action);
      
      expect(newState.error).toBe(error);
      expect(newState.loading).toBe(false);
    });

    it('should update pagination state', () => {
      const pagination = { page: 2, hasMore: false };
      const action = setPagination(pagination);
      const newState = moviesReducer(initialState, action);
      
      expect(newState.pagination.page).toBe(2);
      expect(newState.pagination.hasMore).toBe(false);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate state when updating movies', () => {
      const action = setMovies(mockMovies);
      const newState = moviesReducer(initialState, action);
      
      expect(newState).not.toBe(initialState);
      expect(newState.movies).not.toBe(initialState.movies);
    });

    it('should not mutate state when updating filters', () => {
      const action = setFilters({ search: 'test' });
      const newState = moviesReducer(initialState, action);
      
      expect(newState).not.toBe(initialState);
      expect(newState.filters).not.toBe(initialState.filters);
    });
  });
}); 