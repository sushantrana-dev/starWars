import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Movie, Character, Planet, Starship } from '@/types/api';
import { extractIdFromUrl } from '@/utils';

// Transform function to add IDs to movies
const transformMovies = (response: Movie[]) => {
  console.log('response', response);
  return response.map((movie) => ({
    ...movie,
    id: extractIdFromUrl(movie.url),
  }));
};

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.info/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Movies', 'Movie', 'Characters', 'Planets', 'Starships'],
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => 'films',
      transformResponse: transformMovies,
      providesTags: ['Movies'],
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `films/${id}`,
      transformResponse: (movie: Movie) => ({
        ...movie,
        id: extractIdFromUrl(movie.url),
      }),
      providesTags: (_result, _error, id) => [{ type: 'Movie', id }],
    }),
    getCharacters: builder.query<Character[], string[]>({
      query: (urls) => ({
        url: 'people/',
        params: { urls: urls.join(',') },
      }),
      transformResponse: (response: { results: Character[] }) => {
        return response.results.map((character) => ({
          ...character,
          id: extractIdFromUrl(character.url),
        }));
      },
      providesTags: ['Characters'],
    }),
    getPlanets: builder.query<Planet[], string[]>({
      query: (urls) => ({
        url: 'planets/',
        params: { urls: urls.join(',') },
      }),
      transformResponse: (response: { results: Planet[] }) => {
        return response.results.map((planet) => ({
          ...planet,
          id: extractIdFromUrl(planet.url),
        }));
      },
      providesTags: ['Planets'],
    }),
    getStarships: builder.query<Starship[], string[]>({
      query: (urls) => ({
        url: 'starships/',
        params: { urls: urls.join(',') },
      }),
      transformResponse: (response: { results: Starship[] }) => {
        return response.results.map((starship) => ({
          ...starship,
          id: extractIdFromUrl(starship.url),
        }));
      },
      providesTags: ['Starships'],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useGetCharactersQuery,
  useGetPlanetsQuery,
  useGetStarshipsQuery,
} = moviesApi;
