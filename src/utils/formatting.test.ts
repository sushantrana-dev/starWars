import { formatYear, formatDate, formatDuration, formatCurrency, formatNumber } from './formatting';

describe('Formatting Utilities', () => {
  describe('formatYear', () => {
    it('formats valid date strings to year', () => {
      expect(formatYear('1977-05-25')).toBe('1977');
      expect(formatYear('1980-05-17')).toBe('1980');
    });

    it('handles invalid date strings', () => {
      expect(formatYear('invalid-date')).toBe('Invalid Date');
      expect(formatYear('')).toBe('Invalid Date');
      expect(formatYear(null as any)).toBe('Invalid Date');
    });
  });

  describe('formatDate', () => {
    it('formats date to readable format', () => {
      expect(formatDate('1977-05-25')).toBe('May 25, 1977');
      expect(formatDate('1980-05-17')).toBe('May 17, 1980');
    });

    it('handles invalid dates', () => {
      expect(formatDate('invalid-date')).toBe('Invalid Date');
      expect(formatDate('')).toBe('Invalid Date');
    });
  });

  describe('formatDuration', () => {
    it('formats seconds to readable duration', () => {
      expect(formatDuration(90)).toBe('1m 30s');
      expect(formatDuration(3661)).toBe('1h 1m 1s');
      expect(formatDuration(30)).toBe('30s');
    });

    it('handles edge cases', () => {
      expect(formatDuration(0)).toBe('0s');
      expect(formatDuration(-90)).toBe('0s');
    });
  });

  describe('formatCurrency', () => {
    it('formats numbers to currency', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles different currencies', () => {
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
      expect(formatCurrency(1000, 'GBP')).toBe('£1,000.00');
    });

    it('handles negative values', () => {
      expect(formatCurrency(-1000)).toBe('-$1,000.00');
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(0)).toBe('0');
    });

    it('handles decimals and precision', () => {
      expect(formatNumber(1234.56)).toBe('1,234.56');
      expect(formatNumber(1234.567, 2)).toBe('1,234.57');
      expect(formatNumber(1234.567, 0)).toBe('1,235');
    });

    it('handles negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1,000');
    });
  });
}); 