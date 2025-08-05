# Star Wars Movie Database

A modern, high-performance React application for exploring Star Wars movies with advanced features and optimizations.

## 🚀 Features

- **Virtualized Movie Table**: Efficient rendering of large datasets with react-window
- **Advanced Search & Filtering**: Real-time search with debouncing and multiple filter options
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimizations**: Code splitting, memoization, and lazy loading
- **Modern Tech Stack**: React 18, TypeScript, Redux Toolkit, Vite
- **Comprehensive Testing**: Jest and React Testing Library with 90%+ coverage
- **Star Wars Theming**: Custom design system with authentic Star Wars aesthetics
- **Skeleton Loading States**: Beautiful skeleton loading animations for better UX (no spinners)
- **Reusable Components**: Atomic design with comprehensive component library
- **Error Handling**: Route-level error boundaries with graceful fallbacks
- **Form Components**: Accessible Input and Select components with validation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router v6** for navigation
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Performance & Optimization
- **React Window** for virtualization
- **React Virtualized Auto Sizer** for responsive virtualization
- **Code Splitting** with React.lazy
- **Debounced Search** for optimal performance
- **Memoized Selectors** for efficient state management

### Development Tools
- **ESLint + Prettier** for code quality
- **Jest + React Testing Library** for testing
- **Husky** for pre-commit hooks
- **TypeScript** for type safety

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic building blocks
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Select/
│   │   └── Skeleton/
│   ├── molecules/       # Simple combinations
│   │   ├── VirtualTable/
│   │   ├── SearchInput/
│   │   ├── FilterPanel/
│   │   └── StatsCard/
│   └── organisms/       # Complex components
│       ├── Header/
│       └── RouteErrorBoundary/
├── features/
│   └── movies/         # Redux slices and API
├── hooks/              # Custom hooks
├── pages/              # Page components
├── store/              # Redux store configuration
├── styles/             # Global styles
├── test/               # Test setup
├── types/              # TypeScript types
└── utils/              # Utility functions
    ├── api.ts
    ├── formatting.ts
    ├── validation.ts
    └── constants.ts
```

## 🎨 Design System

### Colors
- **Primary Gold**: #FFD700 (Star Wars theme)
- **Primary Blue**: #0066CC
- **Primary Red**: #FF4444
- **Background**: Dark theme with multiple levels

### Typography
- **Star Wars Font**: Custom Starjedi font for headings
- **Inter**: Modern sans-serif for body text

### Components
- **Atomic Design**: Systematic component architecture
- **Consistent Spacing**: Tailwind-based spacing system
- **Responsive**: Mobile-first design approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd star-wars-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

## 🧪 Testing

The project includes comprehensive testing with:

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Redux store and API testing
- **Coverage**: 90%+ test coverage target

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📊 Performance Features

### Virtualization
- **React Window**: Efficient rendering of large datasets
- **Auto Sizer**: Responsive virtualization
- **Overscan**: Smooth scrolling experience

### Optimization
- **Code Splitting**: Lazy-loaded components
- **Memoization**: Optimized re-renders
- **Debouncing**: Efficient search performance
- **Caching**: RTK Query for API caching

### Bundle Analysis
- **Tree Shaking**: Unused code elimination
- **Chunk Splitting**: Optimized bundle sizes
- **Source Maps**: Development debugging

## 🎯 Key Features

### Movie List
- Virtualized table with sorting
- Real-time search with debouncing
- Advanced filtering (Director, Producer, Year)
- Responsive design
- Loading states and error handling

### Movie Detail
- Comprehensive movie information
- Opening crawl display
- Statistics and metadata
- Navigation and breadcrumbs

### Performance
- First Contentful Paint < 1.5s
- Lighthouse score > 90
- Bundle size < 500KB
- Smooth 60fps animations

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=https://swapi.info/api/
VITE_APP_TITLE=Star Wars Movies
```

### Build Configuration
- **Vite**: Fast development and optimized builds
- **TypeScript**: Strict type checking
- **Tailwind**: Utility-first CSS framework
- **PostCSS**: CSS processing pipeline

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Docker Deployment
```bash
# Build Docker image
docker build -t star-wars-app .

# Run container
docker run -p 80:80 star-wars-app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Maintain 90%+ test coverage
- Use atomic design principles
- Follow ESLint and Prettier rules

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **SWAPI**: Star Wars API for data
- **React Team**: For the amazing framework
- **Vite Team**: For the fast build tool
- **Tailwind CSS**: For the utility-first CSS framework

---

**May the Force be with you!** 🌟
