import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import PopularDestinations from '../components/PopularDestinations';
import VideoCarousel from '../components/VideoCarousel';
import TrendingExperiences from '../components/TrendingExperiences';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import BlogPreview from '../components/BlogPreview';
import Footer from '../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Global GSAP ScrollTrigger refresh on load
    ScrollTrigger.refresh();
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Add event listeners for smooth scrolling
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <HeroSection />
        <PopularDestinations />
        <VideoCarousel />
        <TrendingExperiences />
        <WhyChooseUs />
        <Testimonials />
        <BlogPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
