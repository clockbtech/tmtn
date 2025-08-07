import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutVideoSection from '../components/about/AboutVideoSection';
import AboutCTA from '../components/about/AboutCTA';
import TrendingExperiences from '../components/TrendingExperiences';
import Testimonials from '../components/Testimonials';

const About = () => {
  const [fullscreenVideo, setFullscreenVideo] = useState<{ url: string; title: string } | null>(null);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const openFullscreen = () => {
    const videoData = {
      url: "/Videos/Video1.mp4", // Using actual video file
      title: "Watch Our Story"
    };
    setFullscreenVideo(videoData);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  const handlePlayButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    openFullscreen();
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      <Header />
      <main>
        <AboutHero />
        
        {/* About Story Section */}
        <AboutStory />

        {/* Video Section */}
        <AboutVideoSection 
          onVideoClick={handlePlayButtonClick}
          ripples={ripples}
        />

        {/* Trending Experiences Section */}
        <TrendingExperiences />

        {/* CTA Section */}
        <AboutCTA />

        {/* Testimonials Section */}
        <Testimonials />
      </main>
      <Footer />

    </div>
  );
};

export default About;
