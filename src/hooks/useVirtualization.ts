import { useState, useMemo, useCallback } from 'react';

interface UseVirtualizationOptions {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface VirtualizationResult {
  visibleRange: { start: number; end: number };
  setScrollTop: (scrollTop: number) => void;
  totalHeight: number;
  startOffset: number;
}

export const useVirtualization = ({
  itemCount,
  itemHeight,
  containerHeight,
  overscan = 3,
}: UseVirtualizationOptions): VirtualizationResult => {
  const [scrollTop, setScrollTop] = useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + overscan, itemCount);

    return {
      start: Math.max(0, start - overscan),
      end,
    };
  }, [scrollTop, itemHeight, containerHeight, itemCount, overscan]);

  const totalHeight = itemCount * itemHeight;
  const startOffset = visibleRange.start * itemHeight;

  const handleScrollTop = useCallback((newScrollTop: number) => {
    setScrollTop(Math.max(0, newScrollTop));
  }, []);

  return {
    visibleRange,
    setScrollTop: handleScrollTop,
    totalHeight,
    startOffset,
  };
};
