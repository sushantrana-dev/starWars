/**
 * Formats date to year only
 * @param dateString - Date string to format
 * @returns Year as string
 */
export const formatYear = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Invalid Date';
  
  try {
    const year = new Date(dateString).getFullYear();
    return isNaN(year) ? 'Invalid Date' : year.toString();
  } catch {
    return 'Invalid Date';
  }
};

/**
 * Formats date to readable format
 * @param dateString - Date string to format
 * @param options - Date formatting options
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    return date.toLocaleDateString('en-US', options || defaultOptions);
  } catch {
    return 'Invalid Date';
  }
};

/**
 * Formats duration in seconds to readable format
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
export const formatDuration = (seconds: number): string => {
  if (seconds <= 0) return '0s';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);
  
  return parts.join(' ');
};

/**
 * Formats number to currency
 * @param amount - Amount to format
 * @param currency - Currency code
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(amount);
};

/**
 * Formats number with commas and optional precision
 * @param num - Number to format
 * @param precision - Number of decimal places
 * @returns Formatted number string
 */
export const formatNumber = (num: number, precision?: number): string => {
  if (precision !== undefined) {
    const rounded = Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
    return rounded.toLocaleString();
  }
  return num.toLocaleString();
};

/**
 * Capitalizes first letter of each word
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncates text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}; 