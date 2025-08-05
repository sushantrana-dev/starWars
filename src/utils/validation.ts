/**
 * Validates email format
 * @param email - Email to validate
 * @returns True if valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates URL format
 * @param url - URL to validate
 * @returns True if valid URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

/**
 * Validates required field
 * @param value - Value to check
 * @returns True if value is not empty
 */
export const isRequired = (value: string | null | undefined): boolean => {
  if (value === null || value === undefined) return false;
  return value.trim().length > 0;
};

/**
 * Validates minimum length
 * @param value - Value to check
 * @param minLength - Minimum required length
 * @returns True if value meets minimum length
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Validates maximum length
 * @param value - Value to check
 * @param maxLength - Maximum allowed length
 * @returns True if value is within maximum length
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Validates date format
 * @param dateString - Date string to validate
 * @returns True if valid date
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Validates movie ID format
 * @param id - Movie ID to validate
 * @returns True if valid movie ID
 */
export const isValidMovieId = (id: string): boolean => {
  const movieId = parseInt(id, 10);
  return !isNaN(movieId) && movieId >= 1 && movieId <= 6;
};

/**
 * Validates URL parameters
 * @param params - URL parameters object
 * @returns True if all required parameters are valid
 */
export const validateUrlParams = (params: Record<string, string | undefined>): boolean => {
  return Object.values(params).every(param => param !== undefined && param.trim() !== '');
};

/**
 * Validates a single field with rules
 * @param value - Value to validate
 * @param rules - Validation rules
 * @returns Error message or null if valid
 */
export const validateField = (value: string, rules: any): string | null => {
  if (rules.required && !isRequired(value)) {
    return rules.messages?.required || 'This field is required';
  }
  
  if (rules.email && !isValidEmail(value)) {
    return rules.messages?.email || 'Please enter a valid email address';
  }
  
  if (rules.minLength && !hasMinLength(value, rules.minLength)) {
    return rules.messages?.minLength || `Minimum length is ${rules.minLength} characters`;
  }
  
  if (rules.maxLength && !hasMaxLength(value, rules.maxLength)) {
    return rules.messages?.maxLength || `Maximum length is ${rules.maxLength} characters`;
  }
  
  if (rules.custom && typeof rules.custom === 'function') {
    return rules.custom(value);
  }
  
  return null;
};

/**
 * Validates an entire form
 * @param formData - Form data object
 * @param rules - Validation rules for each field
 * @returns Validation result with errors
 */
export const validateForm = (formData: Record<string, string>, rules: Record<string, any>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    const value = formData[fieldName] || '';
    const error = validateField(value, fieldRules);
    if (error) {
      errors[fieldName] = error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}; 