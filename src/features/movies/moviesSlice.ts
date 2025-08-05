import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, SortConfig, FilterConfig, PaginationState } from '@/types/api';

interface MoviesState {
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
  sortConfig: SortConfig;
  filters: FilterConfig;
  pagination: PaginationState;
}

const initialState: MoviesState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  sortConfig: { key: 'title', direction: 'asc' },
  filters: {},
  pagination: { page: 1, hasMore: true, loading: false },
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedMovie: (state, action: PayloadAction<Movie | null>) => {
      state.selectedMovie = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterConfig>) => {
      state.filters = action.payload;
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPagination: (state, action: PayloadAction<Partial<PaginationState>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    addMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = [...state.movies, ...action.payload];
      state.pagination.loading = false;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.pagination.page = 1;
      state.pagination.hasMore = true;
    },
  },
});

export const {
  setMovies,
  setSelectedMovie,
  setLoading,
  setError,
  setSortConfig,
  setFilters,
  setPagination,
  addMovies,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
