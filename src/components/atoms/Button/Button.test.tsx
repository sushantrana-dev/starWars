import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  const defaultProps = {
    children: 'Test Button',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with correct text and calls onClick', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button', { name: 'Test Button' });
      
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('applies variant classes correctly', () => {
      render(<Button {...defaultProps} variant="secondary" />);
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toHaveClass('bg-background-secondary');
    });

    it('applies size classes correctly', () => {
      render(<Button {...defaultProps} size="lg" />);
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toHaveClass('px-6 py-3 text-lg');
    });

    it('disables button when disabled is true', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeDisabled();
    });

    it('does not call onClick when disabled', () => {
      render(<Button {...defaultProps} disabled />);
      fireEvent.click(screen.getByRole('button', { name: 'Test Button' }));
      expect(defaultProps.onClick).not.toHaveBeenCalled();
    });

    it('renders with icon when provided', () => {
      const MockIcon = () => <div data-testid="mock-icon">Icon</div>;
      render(<Button {...defaultProps} icon={MockIcon} />);
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Button {...defaultProps} className="custom-class" />);
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toHaveClass('custom-class');
    });

    it('handles loading state', () => {
      render(<Button {...defaultProps} loading />);
      const button = screen.getByRole('button', { name: 'Test Button' });
      expect(button).toBeDisabled();
      expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('handles keyboard navigation', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.keyDown(button, { key: ' ' });
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(2);
    });
  });
}); 