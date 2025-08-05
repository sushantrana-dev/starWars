import moviesSlice, { 
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
import { Movie } from '@/types/api';

describe('Movies Slice', () => {
  const mockMovies: Movie[] = [
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
      characters: ['https://swapi.info/api/people/1/', 'https://swapi.info/api/people/2/'],
      planets: ['https://swapi.info/api/planets/1/', 'https://swapi.info/api/planets/2/'],
      starships: ['https://swapi.info/api/starships/1/', 'https://swapi.info/api/starships/2/'],
      vehicles: ['https://swapi.info/api/vehicles/1/'],
      species: ['https://swapi.info/api/species/1/'],
      url: 'https://swapi.info/api/films/1/',
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
      characters: ['https://swapi.info/api/people/1/', 'https://swapi.info/api/people/3/'],
      planets: ['https://swapi.info/api/planets/1/', 'https://swapi.info/api/planets/3/'],
      starships: ['https://swapi.info/api/starships/1/', 'https://swapi.info/api/starships/3/'],
      vehicles: ['https://swapi.info/api/vehicles/2/'],
      species: ['https://swapi.info/api/species/2/'],
      url: 'https://swapi.info/api/films/2/',
    },
  ];

  const initialState = {
    movies: [] as Movie[],
    selectedMovie: null as Movie | null,
    loading: false,
    error: null as string | null,
    sortConfig: { key: 'title' as keyof Movie, direction: 'asc' as const },
    filters: {},
    pagination: { page: 1, hasMore: true, loading: false },
  };

  describe('Initial State', () => {
    it('should return initial state', () => {
      expect(moviesSlice(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('Movies Management', () => {
    it('should set movies in state', () => {
      const action = setMovies(mockMovies);
      const newState = moviesSlice(initialState, action);
      
      expect(newState.movies).toEqual(mockMovies);
      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
    });

    it('should add movies to existing list', () => {
      const existingState = { ...initialState, movies: [mockMovies[0]] };
      const action = addMovies([mockMovies[1]]);
      const newState = moviesSlice(existingState, action);
      
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
      const newState = moviesSlice(existingState, action);
      
      expect(newState.movies).toEqual([]);
      expect(newState.pagination.page).toBe(1);
      expect(newState.pagination.hasMore).toBe(true);
    });
  });

  describe('Filters and Sorting', () => {
    it('should set filters and reset pagination', () => {
      const filters = { search: 'hope', director: 'George Lucas' };
      const action = setFilters(filters);
      const newState = moviesSlice(initialState, action);
      
      expect(newState.filters).toEqual(filters);
      expect(newState.pagination.page).toBe(1);
    });

    it('should set sort configuration', () => {
      const sortConfig = { key: 'title' as keyof Movie, direction: 'asc' as const };
      const action = setSortConfig(sortConfig);
      const newState = moviesSlice(initialState, action);
      
      expect(newState.sortConfig).toEqual(sortConfig);
    });
  });

  describe('UI State', () => {
    it('should set selected movie', () => {
      const action = setSelectedMovie(mockMovies[0]);
      const newState = moviesSlice(initialState, action);
      
      expect(newState.selectedMovie).toEqual(mockMovies[0]);
    });

    it('should set loading state', () => {
      const action = setLoading(true);
      const newState = moviesSlice(initialState, action);
      
      expect(newState.loading).toBe(true);
    });

    it('should set error and clear loading', () => {
      const error = 'Something went wrong';
      const action = setError(error);
      const newState = moviesSlice(initialState, action);
      
      expect(newState.error).toBe(error);
      expect(newState.loading).toBe(false);
    });

    it('should update pagination state', () => {
      const pagination = { page: 2, hasMore: false };
      const action = setPagination(pagination);
      const newState = moviesSlice(initialState, action);
      
      expect(newState.pagination.page).toBe(2);
      expect(newState.pagination.hasMore).toBe(false);
    });
  });

  describe('State Immutability', () => {
    it('should not mutate state when updating movies', () => {
      const action = setMovies(mockMovies);
      const newState = moviesSlice(initialState, action);
      
      expect(newState).not.toBe(initialState);
      expect(newState.movies).not.toBe(initialState.movies);
    });

    it('should not mutate state when updating filters', () => {
      const action = setFilters({ search: 'test' });
      const newState = moviesSlice(initialState, action);
      
      expect(newState).not.toBe(initialState);
      expect(newState.filters).not.toBe(initialState.filters);
    });
  });
}); 