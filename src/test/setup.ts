import '@testing-library/jest-dom';

// Mock IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock ResizeObserver
(global as any).ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});


// Mock fetch
global.fetch = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
};

// Mock RTK Query
jest.mock('@reduxjs/toolkit/query', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query'),
  fetchBaseQuery: () => jest.fn(),
}));

// Mock RTK Query React
jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  createApi: jest.fn(() => ({
    reducerPath: 'mockApi',
    reducer: (state = {}) => state,
    middleware: () => (next: any) => (action: any) => next(action),
    useGetMoviesQuery: jest.fn(),
    useGetMovieByIdQuery: jest.fn(),
  })),
}));
