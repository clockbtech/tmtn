import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Lenis from '@studio-freight/lenis'

import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Experiences from './pages/Experiences';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import BookingPage from './pages/BookingPage';
import Profile from './pages/Profile';
import SuperAdmin from './pages/SuperAdmin';
import SuperAdminDestinations from './pages/super-admin/SuperAdminDestinations';
import SuperAdminExperiences from './pages/super-admin/SuperAdminExperiences';
import SuperAdminBookings from './pages/super-admin/SuperAdminBookings';
import SuperAdminUsers from './pages/super-admin/SuperAdminUsers';
import SuperAdminTourGuides from './pages/super-admin/SuperAdminTourGuides';
import SuperAdminTestimonials from './pages/super-admin/SuperAdminTestimonials';
import SuperAdminBlogs from './pages/super-admin/SuperAdminBlogs';
import SuperAdminFAQs from './pages/super-admin/SuperAdminFAQs';
import SuperAdminPrivacyPolicy from './pages/super-admin/SuperAdminPrivacyPolicy';
import SuperAdminTermsOfService from './pages/super-admin/SuperAdminTermsOfService';
import SuperAdminSettings from './pages/super-admin/SuperAdminSettings';
import SuperAdminVideoReels from './pages/super-admin/SuperAdminVideoReels';
import SuperAdminAttractions from './pages/super-admin/SuperAdminAttractions';

const queryClient = new QueryClient();

function App() {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);

  const AdminGuard = ({ children }: { children: React.ReactNode }) => {
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    return storedIsAdmin ? <>{children}</> : <Navigate to="/login" />;
  };
  const LenisWrapper = ({children}: {children: React.ReactNode}) => {
    useEffect(() => {
      const lenis = new Lenis()

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }, [])
    return <>{children}</>
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LenisWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking/:destinationId" element={<BookingPage />} />
             <Route path="/profile" element={<Profile />} />

            {/* Super Admin Routes */}
            <Route path="/super-admin" element={<AdminGuard><SuperAdmin /></AdminGuard>} />
            <Route path="/super-admin/destinations" element={<AdminGuard><SuperAdminDestinations /></AdminGuard>} />
            <Route path="/super-admin/attractions" element={<AdminGuard><SuperAdminAttractions /></AdminGuard>} />
            <Route path="/super-admin/experiences" element={<AdminGuard><SuperAdminExperiences /></AdminGuard>} />
            <Route path="/super-admin/bookings" element={<AdminGuard><SuperAdminBookings /></AdminGuard>} />
            <Route path="/super-admin/video-reels" element={<AdminGuard><SuperAdminVideoReels /></AdminGuard>} />
            <Route path="/super-admin/users" element={<AdminGuard><SuperAdminUsers /></AdminGuard>} />
            <Route path="/super-admin/tour-guides" element={<AdminGuard><SuperAdminTourGuides /></AdminGuard>} />
            <Route path="/super-admin/testimonials" element={<AdminGuard><SuperAdminTestimonials /></AdminGuard>} />
            <Route path="/super-admin/blogs" element={<AdminGuard><SuperAdminBlogs /></AdminGuard>} />
            <Route path="/super-admin/faqs" element={<AdminGuard><SuperAdminFAQs /></AdminGuard>} />
            <Route path="/super-admin/privacy-policy" element={<AdminGuard><SuperAdminPrivacyPolicy /></AdminGuard>} />
            <Route path="/super-admin/terms-of-service" element={<AdminGuard><SuperAdminTermsOfService /></AdminGuard>} />
            <Route path="/super-admin/settings" element={<AdminGuard><SuperAdminSettings /></AdminGuard>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </LenisWrapper>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
