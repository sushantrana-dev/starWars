import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skeleton from './Skeleton';

describe('Skeleton Component', () => {
  describe('Rendering', () => {
    it('renders with correct type and data-testid', () => {
      render(<Skeleton type="title" data-testid="skeleton-loading" />);
      expect(screen.getByTestId('skeleton-loading')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Skeleton type="text" className="custom-class" />);
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });
  });

  describe('Types', () => {
    it.each([
      ['title', '.h-8.w-3\\/4'],
      ['avatar', '.h-12.w-12.rounded-full'],
      ['button', '.h-10.w-24'],
      ['card', '.h-32.w-full'],
      ['table-row', '.h-16.w-full'],
      ['text', '.h-4.w-full']
    ])('renders %s skeleton with correct classes', (type, expectedSelector) => {
      const { container } = render(<Skeleton type={type as any} />);
      expect(container.querySelector(expectedSelector)).toBeInTheDocument();
    });
  });

  describe('Multiple Lines', () => {
    it('renders multiple lines when specified', () => {
      const { container } = render(<Skeleton type="text" lines={3} />);
      const skeletonLines = container.querySelectorAll('.bg-skeleton');
      expect(skeletonLines).toHaveLength(3);
    });
  });

  describe('Custom Dimensions', () => {
    it('applies custom width and height as numbers', () => {
      const { container } = render(<Skeleton width={200} height={100} />);
      const skeleton = container.querySelector('[style*="width: 200px"]');
      expect(skeleton).toBeInTheDocument();
    });

    it('applies custom width and height as strings', () => {
      const { container } = render(<Skeleton width="50%" height="2rem" />);
      const skeleton = container.querySelector('[style*="width: 50%"]');
      expect(skeleton).toBeInTheDocument();
    });
  });
}); 