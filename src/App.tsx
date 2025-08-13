import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { TranslationProvider } from './contexts/TranslationContext';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Experiences from './pages/Experiences';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import SingleBlog from './pages/SingleBlog';
import DestinationDetail from './pages/DestinationDetail';
import ExperienceDetail from './pages/ExperienceDetail';
import BookingPage from './pages/BookingPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminGuard from './components/AdminGuard';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
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
    <QueryClient.Provider client={queryClient}>
      <TranslationProvider>
        <Router>
          <div className="App">
            <LenisWrapper />
            <Toaster />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetail />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/experiences/:id" element={<ExperienceDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<SingleBlog />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/super-admin" element={
                <AdminGuard>
                  <SuperAdminDashboard />
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
          </div>
        </Router>
      </TranslationProvider>
    </QueryClient.Provider>
  );
}

export default App;
