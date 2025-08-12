import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TranslationProvider } from './contexts/TranslationContext';
import Index from './pages/Index';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Attractions from './pages/Attractions';
import AttractionsDetail from './pages/AttractionsDetail';
import Experiences from './pages/Experiences';
import ExperienceDetail from './pages/ExperienceDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import BookingComplete from './pages/BookingComplete';
import FAQ from './pages/FAQ';
import SuperAdmin from './pages/SuperAdmin';
import SuperAdminBlogs from './pages/super-admin/SuperAdminBlogs';
import SuperAdminBookings from './pages/super-admin/SuperAdminBookings';
import SuperAdminDestinations from './pages/super-admin/SuperAdminDestinations';
import SuperAdminExperiences from './pages/super-admin/SuperAdminExperiences';
import SuperAdminFAQs from './pages/super-admin/SuperAdminFAQs';
import SuperAdminSettings from './pages/super-admin/SuperAdminSettings';
import SuperAdminTourGuides from './pages/super-admin/SuperAdminTourGuides';
import SuperAdminUsers from './pages/super-admin/SuperAdminUsers';
import SuperAdminTestimonials from './pages/super-admin/SuperAdminTestimonials';
import NotFound from './pages/NotFound';
import { Toaster } from "./components/ui/sonner";
import LenisWrapper from './components/LenisWrapper';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        <Router>
          <LenisWrapper>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destinations/:id" element={<DestinationDetail />} />
                <Route path="/attractions" element={<Attractions />} />
                <Route path="/attractions/:id" element={<AttractionsDetail />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/experiences/:id" element={<ExperienceDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/account" element={<Account />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/booking-complete" element={<BookingComplete />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/super-admin" element={<SuperAdmin />} />
                <Route path="/super-admin/blogs" element={<SuperAdminBlogs />} />
                <Route path="/super-admin/bookings" element={<SuperAdminBookings />} />
                <Route path="/super-admin/destinations" element={<SuperAdminDestinations />} />
                <Route path="/super-admin/experiences" element={<SuperAdminExperiences />} />
                <Route path="/super-admin/faqs" element={<SuperAdminFAQs />} />
                <Route path="/super-admin/settings" element={<SuperAdminSettings />} />
                <Route path="/super-admin/tour-guides" element={<SuperAdminTourGuides />} />
                <Route path="/super-admin/users" element={<SuperAdminUsers />} />
                <Route path="/super-admin/testimonials" element={<SuperAdminTestimonials />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </LenisWrapper>
        </Router>
      </TranslationProvider>
    </QueryClientProvider>
  );
}

export default App;
