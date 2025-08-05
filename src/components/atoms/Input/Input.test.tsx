import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  const defaultProps = {
    placeholder: 'Enter text',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with placeholder and handles value changes', () => {
      render(<Input {...defaultProps} />);
      const input = screen.getByPlaceholderText('Enter text');
      
      expect(input).toBeInTheDocument();
      fireEvent.change(input, { target: { value: 'test value' } });
      expect(defaultProps.onChange).toHaveBeenCalledWith('test value');
    });

    it('applies custom className', () => {
      render(<Input {...defaultProps} className="custom-class" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Input {...defaultProps} disabled />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeDisabled();
    });

    it('handles required state', () => {
      render(<Input {...defaultProps} required />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeRequired();
    });

    it('handles readOnly state', () => {
      render(<Input {...defaultProps} readOnly />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveAttribute('readOnly');
    });
  });

  describe('Input Types', () => {
    it.each([
      ['email', 'email'],
      ['password', 'password'],
      ['text', 'text']
    ])('handles %s input type', (type, expectedType) => {
      render(<Input {...defaultProps} type={type as any} />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveAttribute('type', expectedType);
    });
  });

  describe('Values', () => {
    it('handles controlled value', () => {
      render(<Input {...defaultProps} value="controlled value" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveValue('controlled value');
    });

    it('handles defaultValue', () => {
      render(<Input {...defaultProps} defaultValue="default value" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveValue('default value');
    });
  });

  describe('Validation', () => {
    it('handles validation attributes', () => {
      render(
        <Input 
          {...defaultProps} 
          maxLength={10}
          minLength={5}
          pattern="[A-Za-z]{3}"
        />
      );
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveAttribute('maxLength', '10');
      expect(input).toHaveAttribute('minLength', '5');
      expect(input).toHaveAttribute('pattern', '[A-Za-z]{3}');
    });
  });

  describe('Events', () => {
    it('handles focus and blur events', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      
      render(<Input {...defaultProps} onFocus={onFocus} onBlur={onBlur} />);
      const input = screen.getByPlaceholderText('Enter text');
      
      fireEvent.focus(input);
      expect(onFocus).toHaveBeenCalled();
      
      fireEvent.blur(input);
      expect(onBlur).toHaveBeenCalled();
    });

    it('handles keyboard events', () => {
      const onKeyDown = jest.fn();
      const onKeyUp = jest.fn();
      
      render(<Input {...defaultProps} onKeyDown={onKeyDown} onKeyUp={onKeyUp} />);
      const input = screen.getByPlaceholderText('Enter text');
      
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalled();
      
      fireEvent.keyUp(input, { key: 'Enter' });
      expect(onKeyUp).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('supports aria attributes', () => {
      render(
        <Input 
          {...defaultProps} 
          aria-label="Custom label"
          aria-describedby="description"
          aria-required={true}
        />
      );
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toHaveAttribute('aria-label', 'Custom label');
      expect(input).toHaveAttribute('aria-describedby', 'description');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('supports data-testid', () => {
      render(<Input {...defaultProps} data-testid="test-input" />);
      expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });
  });
}); 