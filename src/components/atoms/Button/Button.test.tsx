import React from 'react';
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

    it('renders with icon when provided', () => {
      const MockIcon = () => <span data-testid="icon">Icon</span>;
      render(<Button {...defaultProps} icon={MockIcon} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it.each([
      ['primary', 'bg-primary-gold'],
      ['secondary', 'bg-background-secondary'],
      ['outline', 'border-2 border-primary-gold'],
      ['ghost', 'text-theme-text-primary']
    ])('applies %s variant styles', (variant, expectedClass) => {
      render(<Button {...defaultProps} variant={variant as any} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(expectedClass);
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button {...defaultProps} disabled />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      fireEvent.click(button);
      expect(defaultProps.onClick).not.toHaveBeenCalled();
    });

    it('handles loading state', () => {
      render(<Button {...defaultProps} loading />);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button.querySelector('.animate-spin')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it.each([
      ['sm', 'px-3 py-1.5 text-sm'],
      ['lg', 'px-6 py-3 text-lg']
    ])('applies %s size styles', (size, expectedClasses) => {
      render(<Button {...defaultProps} size={size as any} />);
      const button = screen.getByRole('button');
      expectedClasses.split(' ').forEach(className => {
        expect(button).toHaveClass(className);
      });
    });
  });

  describe('Accessibility', () => {
    it('handles keyboard navigation', () => {
      render(<Button {...defaultProps} />);
      const button = screen.getByRole('button');
      
      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.keyDown(button, { key: ' ' });
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(2);
    });

    it('supports aria attributes', () => {
      render(
        <Button 
          {...defaultProps} 
          aria-label="Custom label"
          aria-describedby="description"
        />
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Props', () => {
    it('applies custom className', () => {
      render(<Button {...defaultProps} className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('handles different button types', () => {
      const { rerender } = render(<Button {...defaultProps} type="submit" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

      rerender(<Button {...defaultProps} type="reset" />);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });
}); 