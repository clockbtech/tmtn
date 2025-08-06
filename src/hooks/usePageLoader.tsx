
import { useState, useEffect } from 'react';

export const usePageLoader = (initialLoading = true, delay = 2000) => {
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [initialLoading, delay]);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return {
    isLoading,
    showLoader,
    hideLoader
  };
};
