
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "./contexts/TranslationContext";
import { AdminGuard } from "./components/super-admin/AdminGuard";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Attractions from "./pages/Attractions";
import AttractionsDetail from "./pages/AttractionsDetail";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import FAQ from "./pages/FAQ";
import Checkout from "./pages/Checkout";
import BookingComplete from "./pages/BookingComplete";
import NotFound from "./pages/NotFound";

// Super Admin Pages
import SuperAdmin from "./pages/SuperAdmin";
import SuperAdminBookings from "./pages/super-admin/SuperAdminBookings";
import SuperAdminUsers from "./pages/super-admin/SuperAdminUsers";
import SuperAdminDestinations from "./pages/super-admin/SuperAdminDestinations";
import SuperAdminExperiences from "./pages/super-admin/SuperAdminExperiences";
import SuperAdminBlogs from "./pages/super-admin/SuperAdminBlogs";
import SuperAdminFAQs from "./pages/super-admin/SuperAdminFAQs";
import SuperAdminSettings from "./pages/super-admin/SuperAdminSettings";

import Lenis from "@studio-freight/lenis";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Lenis smooth scroll
  useEffect(() => {
  const lenis = new Lenis({
    duration: 0.9,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
  };
}, []);


  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetail />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/attractions/:id" element={<AttractionsDetail />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/experiences/:id" element={<ExperienceDetail />} />
              <Route path="/experiences/:id/checkout" element={<Checkout />} />
              <Route path="/booking-complete" element={<BookingComplete />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Super Admin Routes - Protected */}
              <Route path="/super-admin" element={
                <AdminGuard>
                  <SuperAdmin />
                </AdminGuard>
              } />
              <Route path="/super-admin/bookings" element={
                <AdminGuard>
                  <SuperAdminBookings />
                </AdminGuard>
              } />
              <Route path="/super-admin/users" element={
                <AdminGuard>
                  <SuperAdminUsers />
                </AdminGuard>
              } />
              <Route path="/super-admin/destinations" element={
                <AdminGuard>
                  <SuperAdminDestinations />
                </AdminGuard>
              } />
              <Route path="/super-admin/experiences" element={
                <AdminGuard>
                  <SuperAdminExperiences />
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
              <Route path="/super-admin/settings" element={
                <AdminGuard>
                  <SuperAdminSettings />
                </AdminGuard>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
};

export default App;
