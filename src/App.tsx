import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/organisms/Header/Header';

import RouteErrorBoundary from '@/components/organisms/RouteErrorBoundary/RouteErrorBoundary';
import Skeleton from '@/components/atoms/Skeleton/Skeleton';

// Lazy load pages for code splitting
const MoviesList = React.lazy(() => import('@/pages/MoviesList/MoviesList'));
const MovieDetail = React.lazy(() => import('@/pages/MovieDetail/MovieDetail'));
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-primary">
      <Header />
      <main className="responsive-container py-4 sm:py-6 lg:py-8">
        <Suspense
          fallback={
            <div className="responsive-container py-4 sm:py-6 lg:py-8">
              <div className="space-y-8">
                {/* Header Skeleton */}
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Skeleton type="title" className="mx-auto mb-4" />
                  <Skeleton type="text" lines={2} className="max-w-2xl mx-auto" />
                </motion.div>
                
                {/* Content Skeleton */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <Skeleton type="card" className="h-32" />
                  <Skeleton type="card" className="h-64" />
                </motion.div>
              </div>
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MoviesList />
                  </motion.div>
                }
                errorElement={<RouteErrorBoundary />}
              />
              <Route
                path="/movie/:id"
                element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MovieDetail />
                  </motion.div>
                }
                errorElement={<RouteErrorBoundary />}
              />
              {/* Catch-all route for 404 errors */}
              <Route
                path="*"
                element={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <NotFound />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
};

export default App;
