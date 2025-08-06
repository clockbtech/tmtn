import React, { useEffect, useState } from 'react';
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
import AboutCTA from '@/components/about/AboutCTA';
import Footer from '../components/Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace this with your actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
      ScrollTrigger.refresh();
    }, 2000); // Adjust time as needed

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
      clearTimeout(timer);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <DotLottieReact
          src="src/assets/Airplane_Lottie_Animation.lottie" // Update this path to your actual lottie file
          loop
          autoplay
          style={{ width: '200px', height: '200px' }}
        />
      </div>
    );
  }

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
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;