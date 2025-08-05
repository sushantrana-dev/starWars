import React from 'react';
import { useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';
import Button from '@/components/atoms/Button/Button';
import { formatApiError } from '@/utils/api';

interface RouteError {
  status?: number;
  statusText?: string;
  data?: any;
  message?: string;
}

const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError() as RouteError;

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return 'The page you are looking for does not exist. Please check the URL and try again.';
    }
    if (error?.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (error?.status >= 400) {
      return 'Bad request. Please check your input.';
    }
    return formatApiError(error) || 'An unexpected error occurred.';
  };

  const getErrorTitle = () => {
    if (error?.status === 404) {
      return 'Page Not Found';
    }
    if (error?.status >= 500) {
      return 'Server Error';
    }
    if (error?.status >= 400) {
      return 'Bad Request';
    }
    return 'Something went wrong';
  };

  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="theme-card text-center p-8 rounded-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <FaExclamationTriangle className="text-primary-red text-6xl mx-auto" />
          </motion.div>
          
          <h1 className="text-2xl font-bold text-primary-red mb-4">
            {getErrorTitle()}
          </h1>
          
          <p className="theme-text-muted mb-6">
            {getErrorMessage()}
          </p>

          {process.env.NODE_ENV === 'development' && error && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer theme-text-secondary font-semibold mb-2">
                Error Details (Development)
              </summary>
              <div className="bg-red-900 bg-opacity-20 p-4 rounded-lg text-sm font-mono text-red-300 overflow-auto">
                <div className="mb-2">
                  <strong>Status:</strong> {error.status || 'Unknown'}
                </div>
                <div className="mb-2">
                  <strong>Message:</strong> {error.message || 'No message'}
                </div>
                {error.data && (
                  <div>
                    <strong>Data:</strong>
                    <pre className="whitespace-pre-wrap mt-1">{JSON.stringify(error.data, null, 2)}</pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              icon={FaRedo}
              onClick={handleRetry}
              className="flex-1 sm:flex-none"
            >
              Try Again
            </Button>
            <Button
              variant="secondary"
              icon={FaHome}
              onClick={handleGoHome}
              className="flex-1 sm:flex-none"
            >
              Go Home
            </Button>
          </div>

          <div className="mt-6 text-xs theme-text-muted">
            Error ID: {error?.status || 'Unknown'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RouteErrorBoundary; 