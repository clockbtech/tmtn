
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminGuard } from "@/components/super-admin/AdminGuard";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const About = lazy(() => import("./pages/About"));
const Destinations = lazy(() => import("./pages/Destinations"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));
const Experiences = lazy(() => import("./pages/Experiences"));
const ExperienceDetail = lazy(() => import("./pages/ExperienceDetail"));
const Attractions = lazy(() => import("./pages/Attractions"));
const AttractionsDetail = lazy(() => import("./pages/AttractionsDetail"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Account = lazy(() => import("./pages/Account"));
const Checkout = lazy(() => import("./pages/Checkout"));
const BookingComplete = lazy(() => import("./pages/BookingComplete"));
const Auth = lazy(() => import("./pages/Auth"));
const SuperAdmin = lazy(() => import("./pages/SuperAdmin"));
const SuperAdminDestinations = lazy(() => import("./pages/super-admin/SuperAdminDestinations"));
const SuperAdminExperiences = lazy(() => import("./pages/super-admin/SuperAdminExperiences"));
const SuperAdminBookings = lazy(() => import("./pages/super-admin/SuperAdminBookings"));
const SuperAdminUsers = lazy(() => import("./pages/super-admin/SuperAdminUsers"));
const SuperAdminTourGuides = lazy(() => import("./pages/super-admin/SuperAdminTourGuides"));
const SuperAdminBlogs = lazy(() => import("./pages/super-admin/SuperAdminBlogs"));
const SuperAdminFAQs = lazy(() => import("./pages/super-admin/SuperAdminFAQs"));
const SuperAdminSettings = lazy(() => import("./pages/super-admin/SuperAdminSettings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/about"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/destinations"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Destinations />
                </Suspense>
              }
            />
            <Route
              path="/destinations/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <DestinationDetail />
                </Suspense>
              }
            />
            <Route
              path="/experiences"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Experiences />
                </Suspense>
              }
            />
            <Route
              path="/experiences/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ExperienceDetail />
                </Suspense>
              }
            />
            <Route
              path="/attractions"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Attractions />
                </Suspense>
              }
            />
            <Route
              path="/attractions/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AttractionsDetail />
                </Suspense>
              }
            />
            <Route
              path="/faq"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FAQ />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/blog"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Blog />
                </Suspense>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BlogDetail />
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Account />
                </Suspense>
              }
            />
            <Route
              path="/checkout"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Checkout />
                </Suspense>
              }
            />
            <Route
              path="/booking-complete"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BookingComplete />
                </Suspense>
              }
            />
            <Route
              path="/auth"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Auth />
                </Suspense>
              }
            />
            <Route
              path="/super-admin"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdmin />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/destinations"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminDestinations />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/experiences"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminExperiences />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/bookings"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminBookings />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/users"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminUsers />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/tour-guides"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminTourGuides />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/blogs"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminBlogs />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/faqs"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminFAQs />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="/super-admin/settings"
              element={
                <AdminGuard>
                  <Suspense fallback={<div>Loading...</div>}>
                    <SuperAdminSettings />
                  </Suspense>
                </AdminGuard>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
