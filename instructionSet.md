# Star Wars Front-End Technical Assessment - Implementation Guide

## 📋 Project Overview

**Objective:** Create a React + Redux application that displays Star Wars movies with advanced features and optimizations.

**Core Requirements:**

- List all Star Wars movies in a sortable table
- Movie detail view with navigation
- GitHub repository submission
- Evidence of high-level design thinking

## 🏗️ Technical Architecture

### Technology Stack

**Frontend Framework:**

- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Axios** for API calls with interceptors

**UI/Styling:**

- **.SCSS** files for CSS
- **Custom-built components** (no external UI libraries)
- **React Icons** for Star Wars themed icons
- **Framer Motion** for animations

**Development Tools:**

- **Vite** for fast development and building
- **ESLint + Prettier** for code quality
- **Husky** for pre-commit hooks
- **Jest + React Testing Library (RTL)** for testing
- **MSW (Mock Service Worker)** for API mocking

**Performance Optimizations:**

- **React Window** for virtualization
- **React Virtualized Auto Sizer** for responsive virtualization
- **Infinite scroll** for large datasets
- **Intersection Observer API** for lazy loading
- **React.memo** for component memoization
- **useMemo/useCallback** for expensive computations
- **Code splitting** with React.lazy
- **Service Worker** for caching

## 📁 Atomic Design File Structure

```
starWars/
├── public/
│   ├── images/
│   │   ├── star-wars-logo.png
│   │   ├── loading-lightsaber.gif
│   │   └── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── LoadingSpinner/
│   │   │   ├── VirtualRow/
│   │   │   ├── LazyImage/
│   │   │   ├── Skeleton/
│   │   │   ├── Icon/
│   │   │   ├── Text/
│   │   │   └── Badge/
│   │   ├── molecules/
│   │   │   ├── VirtualTable/
│   │   │   │   ├── VirtualTable.tsx
│   │   │   │   ├── VirtualTable.test.tsx
│   │   │   │   ├── VirtualTable.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── InfiniteScroll/
│   │   │   ├── SortableHeader/
│   │   │   ├── SearchInput/
│   │   │   ├── FilterPanel/
│   │   │   ├── ErrorMessage/
│   │   │   └── Card/
│   │   ├── organisms/
│   │   │   ├── OptimizedMovieTable/
│   │   │   │   ├── OptimizedMovieTable.tsx
│   │   │   │   ├── OptimizedMovieTable.test.tsx
│   │   │   │   ├── OptimizedMovieTable.styles.ts
│   │   │   │   └── index.ts
│   │   │   ├── MovieDetail/
│   │   │   ├── Navigation/
│   │   │   └── Header/
│   │   └── templates/
│   │       ├── MainLayout/
│   │       └── MovieDetailLayout/
│   ├── features/
│   │   └── movies/
│   │       ├── moviesSlice.ts
│   │       ├── moviesApi.ts
│   │       ├── types.ts
│   │       └── selectors.ts
│   ├── pages/
│   │   ├── MoviesList/
│   │   │   ├── MoviesList.tsx
│   │   │   ├── MoviesList.test.tsx
│   │   │   └── index.ts
│   │   └── MovieDetail/
│   │       ├── MovieDetail.tsx
│   │       ├── MovieDetail.test.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useVirtualization.ts
│   │   ├── useInfiniteScroll.ts
│   │   ├── useDebounce.ts
│   │   ├── useIntersectionObserver.ts
│   │   ├── useSortableTable.ts
│   │   ├── useApi.ts
│   │   └── useLocalStorage.ts
│   ├── utils/
│   │   ├── api.ts
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── performance.ts
│   │   ├── cache.ts
│   │   ├── workers.ts
│   │   └── test-utils.tsx
│   ├── workers/
│   │   ├── dataProcessor.worker.ts
│   │   └── searchWorker.worker.ts
│   ├── types/
│   │   ├── global.ts
│   │   └── api.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── tokens.ts
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── setup.ts
│   └── mocks/
│       ├── handlers.ts
│       └── server.ts
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── jest.config.js
├── .eslintrc.js
├── .prettierrc
├── .gitignore
└── README.md
```

## 🎨 Design System & Styling

### Design Tokens

```typescript
// styles/tokens.ts
export const colors = {
  primary: {
    dark: '#1a1a1a',
    gold: '#FFD700',
    blue: '#0066CC',
    red: '#FF4444',
  },
  secondary: {
    gray: '#666666',
    lightGray: '#f5f5f5',
    darkGray: '#333333',
  },
  background: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    card: '#2a2a2a',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
};

export const typography = {
  heading: 'font-bold text-2xl text-gold-500',
  subheading: 'font-semibold text-lg text-white',
  body: 'text-base text-gray-300',
  caption: 'text-sm text-gray-500',
};

export const animations = {
  fadeIn: 'animate-fade-in duration-300',
  slideUp: 'animate-slide-up duration-500',
  lightsaber: 'animate-lightsaber duration-1000',
};
```

### Component Styling Approach

- **CSS-in-JS with Tailwind** for component-specific styles
- **Design tokens** for consistent theming
- **Responsive design** with mobile-first approach
- **Dark theme** with Star Wars color palette

## 🔧 Component Architecture

### Atoms (Basic Building Blocks)

- **Button**: Primary, secondary, ghost variants with loading states
- **LoadingSpinner**: Custom lightsaber-themed loader
- **VirtualRow**: Optimized row component for virtualization
- **LazyImage**: Image with lazy loading and fallback
- **Skeleton**: Loading placeholders
- **Icon**: Reusable icon component
- **Text**: Typography components (Heading, Body, Caption)
- **Badge**: Status indicators

### Molecules (Simple Combinations)

- **VirtualTable**: Generic virtualized table with sorting
- **InfiniteScroll**: Wrapper for infinite scrolling
- **SortableHeader**: Header with sort functionality
- **SearchInput**: Search with debouncing
- **FilterPanel**: Advanced filtering options
- **ErrorMessage**: Error display component
- **Card**: Basic card layout

### Organisms (Complex Components)

- **OptimizedMovieTable**: Complete movies listing with virtualization
- **MovieDetail**: Individual movie information display
- **Navigation**: Header with navigation
- **Header**: App header with branding

### Templates (Page Layouts)

- **MainLayout**: Default page layout
- **MovieDetailLayout**: Movie detail page layout

## 🚀 Performance Optimizations

### Virtualization Strategy

```typescript
// hooks/useVirtualization.ts
export const useVirtualization = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + 1,
      itemCount
    );
    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, itemCount]);

  return {
    visibleRange,
    setScrollTop,
    totalHeight: itemCount * itemHeight,
  };
};
```

### Infinite Scroll Implementation

```typescript
// hooks/useInfiniteScroll.ts
export const useInfiniteScroll = (
  onLoadMore: () => Promise<void>,
  options: UseInfiniteScrollOptions = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Failed to load more data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, onLoadMore]);

  return { isLoading, hasMore, setHasMore, loadMore };
};
```

### Caching Strategy

```typescript
// utils/cache.ts
export class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }
}
```

## 🧪 Testing Strategy

### RTL Testing Approach

```typescript
// utils/test-utils.tsx
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

### Component Testing Example

```typescript
// components/atoms/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text and variant', () => {
    render(
      <Button variant='primary' data-testid='test-button'>
        Click me
      </Button>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('bg-gold-500');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button variant='primary' onClick={handleClick} data-testid='test-button'>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByTestId('test-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state when loading prop is true', () => {
    render(
      <Button variant='primary' loading data-testid='test-button'>
        Click me
      </Button>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('test-button')).toBeDisabled();
  });
});
```

## 🔄 State Management

### Redux Store Structure

```typescript
// features/movies/moviesSlice.ts
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
  pagination: { page: 1, hasMore: true },
};
```

### API Integration

```typescript
// features/movies/moviesApi.ts
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.info/api/' }),
  endpoints: (builder) => ({
    getMovies: builder.query<Movie[], void>({
      query: () => 'films',
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `films/${id}`,
    }),
  }),
});
```

## 🐳 Containerization

### Docker Configuration

```dockerfile
# docker/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📋 Implementation Phases

### Phase 1: Foundation (Week 1)

- [ ] Project setup with Vite + TypeScript
- [ ] Redux store configuration
- [ ] Basic routing setup
- [ ] Atomic components (Button, Text, Icon, LoadingSpinner)
- [ ] RTL test setup and utilities
- [ ] Design tokens and styling foundation

### Phase 2: Core Components (Week 2)

- [ ] VirtualTable component with sorting
- [ ] Search and filter components
- [ ] API client implementation
- [ ] Redux slices and selectors
- [ ] Basic error handling

### Phase 3: Features & Optimization (Week 3)

- [ ] OptimizedMovieTable organism
- [ ] MovieDetail organism
- [ ] Navigation and layout components
- [ ] Virtualization implementation
- [ ] Infinite scroll functionality
- [ ] Performance optimizations

### Phase 4: Polish & Enhancement (Week 4)

- [ ] Templates and layouts
- [ ] Advanced error handling
- [ ] Responsive design
- [ ] Accessibility improvements
- [ ] Loading states and animations
- [ ] Service Worker for caching

### Phase 5: Testing & Deployment (Week 5)

- [ ] Comprehensive RTL test coverage
- [ ] E2E testing
- [ ] Docker containerization
- [ ] Performance testing
- [ ] Documentation
- [ ] GitHub repository setup

## 🎯 Key Success Criteria

### Technical Excellence

- [ ] 100% TypeScript coverage
- [ ] 90%+ test coverage with RTL
- [ ] Lighthouse score > 90
- [ ] Bundle size < 500KB
- [ ] First Contentful Paint < 1.5s

### User Experience

- [ ] Smooth scrolling with virtualization
- [ ] Responsive design on all devices
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Intuitive navigation
- [ ] Fast search and filtering

### Code Quality

- [ ] ESLint with zero warnings
- [ ] Prettier formatting
- [ ] Atomic design principles
- [ ] Reusable components
- [ ] Comprehensive documentation

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start development server**: `npm run dev`
4. **Run tests**: `npm test`
5. **Build for production**: `npm run build`
6. **Run with Docker**: `docker-compose up`

## 📚 Additional Resources

- [SWAPI Documentation](https://swapi.info/api/)
- [React Testing Library Best Practices](https://testing-library.com/docs/react-testing-library/intro/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Note:** This implementation focuses on demonstrating advanced front-end development skills, performance optimization, and modern React patterns while maintaining clean, maintainable code.
