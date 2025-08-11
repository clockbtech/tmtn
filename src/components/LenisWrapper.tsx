
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLenisScroll } from '../hooks/useLenisScroll';

interface LenisWrapperProps {
  children: React.ReactNode;
}

const LenisWrapper = ({ children }: LenisWrapperProps) => {
  const location = useLocation();
  
  // Don't apply Lenis to admin panel pages
  const isAdminPage = location.pathname.startsWith('/super-admin');
  
  // Only initialize Lenis for non-admin pages
  if (!isAdminPage) {
    useLenisScroll();
  }

  return <>{children}</>;
};

export default LenisWrapper;
