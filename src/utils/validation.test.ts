import { 
  isValidMovieId, 
  isValidEmail, 
  isValidUrl, 
  isValidDate, 
  isRequired,
  validateField,
  validateForm
} from './validation';

describe('Validation Utilities', () => {
  describe('isValidMovieId', () => {
    it('validates correct movie IDs', () => {
      expect(isValidMovieId('1')).toBe(true);
      expect(isValidMovieId('6')).toBe(true);
    });

    it('rejects invalid movie IDs', () => {
      expect(isValidMovieId('0')).toBe(false);
      expect(isValidMovieId('7')).toBe(false);
      expect(isValidMovieId('abc')).toBe(false);
      expect(isValidMovieId('')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(isValidMovieId(null as any)).toBe(false);
      expect(isValidMovieId(undefined as any)).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('validates correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://www.example.org')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('validates correct dates', () => {
      expect(isValidDate('2023-12-25')).toBe(true);
      expect(isValidDate('1977-05-25')).toBe(true);
    });

    it('rejects invalid dates', () => {
      expect(isValidDate('invalid-date')).toBe(false);
      expect(isValidDate('2023-13-01')).toBe(false);
      expect(isValidDate('')).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('validates required fields', () => {
      expect(isRequired('test')).toBe(true);
      expect(isRequired('0')).toBe(true);
    });

    it('rejects empty values', () => {
      expect(isRequired('')).toBe(false);
      expect(isRequired('   ')).toBe(false);
      expect(isRequired(null)).toBe(false);
      expect(isRequired(undefined)).toBe(false);
    });
  });

  describe('validateField', () => {
    it('validates single field with rules', () => {
      const rules = { required: true, email: true };
      expect(validateField('test@example.com', rules)).toBeNull();
      expect(validateField('', rules)).toBe('This field is required');
      expect(validateField('invalid-email', rules)).toBe('Please enter a valid email address');
    });

    it('validates with custom error messages', () => {
      const rules = { 
        required: true, 
        email: true,
        messages: {
          required: 'Custom required message',
          email: 'Custom email message'
        }
      };
      expect(validateField('', rules)).toBe('Custom required message');
      expect(validateField('invalid', rules)).toBe('Custom email message');
    });

    it('handles multiple validation rules', () => {
      const rules = { required: true, minLength: 3, maxLength: 10 };
      expect(validateField('test', rules)).toBeNull();
      expect(validateField('ab', rules)).toBe('Minimum length is 3 characters');
      expect(validateField('verylongstring', rules)).toBe('Maximum length is 10 characters');
    });
  });

  describe('validateForm', () => {
    it('validates entire form successfully', () => {
      const formData = {
        email: 'test@example.com',
        name: 'John Doe',
        age: '25'
      };
      const rules = {
        email: { required: true, email: true },
        name: { required: true, minLength: 2 },
        age: { required: true, min: 18 }
      };
      
      const result = validateForm(formData, rules);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('returns errors for invalid form', () => {
      const formData = {
        name: '',
        email: 'invalid-email',
      };
      
      const rules = {
        name: { required: true },
        email: { required: true, email: true },
      };
      
      const result = validateForm(formData, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveProperty('email');
      expect(result.errors).toHaveProperty('name');
    });

    it('handles custom validation functions', () => {
      const formData = { password: 'weak' };
      const rules = {
        password: {
          required: true,
          custom: (value: string) => value.length >= 8 ? null : 'Password must be at least 8 characters'
        }
      };
      
      const result = validateForm(formData, rules);
      expect(result.isValid).toBe(false);
      expect(result.errors.password).toBe('Password must be at least 8 characters');
    });
  });
}); 