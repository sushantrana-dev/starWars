// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://swapi.info/api/',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Search Configuration
export const SEARCH_CONFIG = {
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_LENGTH: 100,
} as const;

// Table Configuration
export const TABLE_CONFIG = {
  DEFAULT_HEIGHT: 400,
  ITEM_HEIGHT: 60,
  OVERSCAN_COUNT: 5,
  PAGE_SIZE: 20,
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  DURATION: {
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
  },
  EASING: {
    EASE_OUT: 'easeOut',
    EASE_IN: 'easeIn',
    EASE_IN_OUT: 'easeInOut',
  },
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY_GOLD: '#ffd700',
    PRIMARY_BLUE: '#3b82f6',
    PRIMARY_RED: '#ef4444',
  },
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280,
  },
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'star-wars-theme',
  USER_PREFERENCES: 'star-wars-preferences',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  API_ERROR: 'Failed to load data from the server.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
} as const; 