import { useEffect, useState } from 'react';

export const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return {
    width,
    isXS: width < 640,
    isSP: width <= 768,
    isTablet: width > 768 && width <= 1199,
    isPC: width > 1199,
    isIP: width <= 1024,
    isLgUpToMax: width >= 1024,
    isLgUp: width >= 1024 && width < 1280,
    isXlUp: width >= 1280 && width < 1440,
    isLaptop: width >= 1440 && width < 1536,
    is2XlUp: width >= 1536 && width < 1920,
    is3XlUp: width >= 1920,
  };
};
