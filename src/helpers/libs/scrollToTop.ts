import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { ScrollToTopProps } from '../types/common.types';

export function ScrollToTop({ children }: ScrollToTopProps) {
  const pathname = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
