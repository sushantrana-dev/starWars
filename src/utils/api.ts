/**
 * Extracts ID from SWAPI URL
 * @param url - SWAPI URL string
 * @returns Extracted ID or empty string
 */
export const extractIdFromUrl = (url: string): string => {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? match[1] : '';
};

/**
 * Formats API error message for user display
 * @param error - Error object from API
 * @returns User-friendly error message
 */
export const formatApiError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.data?.message) return error.data.message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};

/**
 * Debounces function calls
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 