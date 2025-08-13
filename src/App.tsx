
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TranslationProvider } from './contexts/TranslationContext';
import Index from './pages/Index';
import Destinations from './pages/Destinations';
import Experiences from './pages/Experiences';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import DestinationDetail from './pages/DestinationDetail';
import ExperienceDetail from './pages/ExperienceDetail';
import Checkout from './pages/Checkout';
import BookingComplete from './pages/BookingComplete';
import Account from './pages/Account';
import Auth from './pages/Auth';
import SuperAdmin from './pages/SuperAdmin';
import { AdminGuard } from './components/super-admin/AdminGuard';
import { SuperAdminLayout } from './components/super-admin/SuperAdminLayout';
import SuperAdminDestinations from './pages/super-admin/SuperAdminDestinations';
import { Toaster } from "@/components/ui/toaster"
import Lenis from '@studio-freight/lenis'
import SuperAdminUsers from './pages/super-admin/SuperAdminUsers';
import SuperAdminBookings from './pages/super-admin/SuperAdminBookings';
import SuperAdminExperiences from './pages/super-admin/SuperAdminExperiences';
import SuperAdminTestimonials from './pages/super-admin/SuperAdminTestimonials';
import SuperAdminBlogs from './pages/super-admin/SuperAdminBlogs';
import SuperAdminFAQs from './pages/super-admin/SuperAdminFAQs';
import SuperAdminSettings from './pages/super-admin/SuperAdminSettings';
import SuperAdminPrivacyPolicy from './pages/super-admin/SuperAdminPrivacyPolicy';
import SuperAdminTermsOfService from './pages/super-admin/SuperAdminTermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import SuperAdminTourGuides from './pages/super-admin/SuperAdminTourGuides';
import SuperAdminVideoReels from './pages/super-admin/SuperAdminVideoReels';
import SuperAdminAttractions from './pages/super-admin/SuperAdminAttractions';

const queryClient = new QueryClient();

function LenisWrapper() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - (2 ** (-10 * t)))
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    })

    return () => {
      lenis.destroy();
    };
  }, [location]);

  return null;
}

import { ScrollTrigger } from "gsap/all";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <Router>
          <div className="App">
            <LenisWrapper />
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetail />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/experiences/:id" element={<ExperienceDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/booking-complete" element={<BookingComplete />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/super-admin" element={
                <AdminGuard>
                  <SuperAdmin />
                </AdminGuard>
              } />
              <Route path="/super-admin/destinations" element={
                <AdminGuard>
                  <SuperAdminDestinations />
                </AdminGuard>
              } />
               <Route path="/super-admin/attractions" element={
                <AdminGuard>
                  <SuperAdminAttractions />
                </AdminGuard>
              } />
              <Route path="/super-admin/experiences" element={
                <AdminGuard>
                  <SuperAdminExperiences />
                </AdminGuard>
              } />
              <Route path="/super-admin/bookings" element={
                <AdminGuard>
                  <SuperAdminBookings />
                </AdminGuard>
              } />
              <Route path="/super-admin/video-reels" element={
                <AdminGuard>
                  <SuperAdminVideoReels />
                </AdminGuard>
              } />
              <Route path="/super-admin/users" element={
                <AdminGuard>
                  <SuperAdminUsers />
                </AdminGuard>
              } />
              <Route path="/super-admin/tour-guides" element={
                <AdminGuard>
                  <SuperAdminTourGuides />
                </AdminGuard>
              } />
              <Route path="/super-admin/testimonials" element={
                <AdminGuard>
                  <SuperAdminTestimonials />
                </AdminGuard>
              } />
              <Route path="/super-admin/blogs" element={
                <AdminGuard>
                  <SuperAdminBlogs />
                </AdminGuard>
              } />
              <Route path="/super-admin/faqs" element={
                <AdminGuard>
                  <SuperAdminFAQs />
                </AdminGuard>
              } />
              <Route path="/super-admin/privacy-policy" element={
                <AdminGuard>
                  <SuperAdminPrivacyPolicy />
                </AdminGuard>
              } />
              <Route path="/super-admin/terms-of-service" element={
                <AdminGuard>
                  <SuperAdminTermsOfService />
                </AdminGuard>
              } />
              <Route path="/super-admin/settings" element={
                <AdminGuard>
                  <SuperAdminSettings />
                </AdminGuard>
              } />
            </Routes>
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </Router>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
