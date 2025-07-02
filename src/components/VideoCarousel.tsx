
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videos } from './video/videoData';
import { Video } from './video/types';
import VideoItem from './video/VideoItem';
import FullscreenModal from './video/FullscreenModal';
import CarouselControls from './video/CarouselControls';
import ProgressIndicator from './video/ProgressIndicator';

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreenVideo, setFullscreenVideo] = useState<Video | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create multiple copies for smooth infinite scrolling
  const getExtendedVideos = () => {
    const copies = 5; // Reduced copies for better performance
    const extended = [];
    for (let i = 0; i < copies; i++) {
      extended.push(...videos);
    }
    return extended;
  };

  const extendedVideos = getExtendedVideos();
  const startingIndex = videos.length * 2; // Start from middle section

  // Initialize at middle section
  useEffect(() => {
    setCurrentIndex(startingIndex);
  }, []);

  // Auto-advance carousel continuously
  useEffect(() => {
    if (isPlaying && !fullscreenVideo) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, fullscreenVideo]);

  // Handle seamless infinite loop reset
  useEffect(() => {
    // Reset to middle section when we reach the end
    if (currentIndex >= videos.length * 4) {
      const timer = setTimeout(() => {
        setCurrentIndex(videos.length * 2);
      }, 800); // Wait for animation to complete
      return () => clearTimeout(timer);
    }
    // Reset to middle section when we go too far back
    if (currentIndex < videos.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(videos.length * 3 - 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const openFullscreen = (video: Video, index: number) => {
    setFullscreenVideo(video);
    setFullscreenIndex(index % videos.length);
    setIsPlaying(false);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
    setIsPlaying(true);
  };

  const navigateFullscreen = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && fullscreenIndex > 0) {
      const newIndex = fullscreenIndex - 1;
      setFullscreenIndex(newIndex);
      setFullscreenVideo(videos[newIndex]);
    } else if (direction === 'next' && fullscreenIndex < videos.length - 1) {
      const newIndex = fullscreenIndex + 1;
      setFullscreenIndex(newIndex);
      setFullscreenVideo(videos[newIndex]);
    }
  };

  const itemWidth = 280 + 16; // width + gap

  return (
    <>
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-4xl font-tm-sans uppercase font-extrabold text-nepal-primary mb-4">
              Experience Nepal
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immerse yourself in the beauty and adventure of Nepal through our curated video experiences
            </p>
          </motion.div>

          <CarouselControls 
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
          />

          {/* Video Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: -currentIndex * itemWidth
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smoother animation
                  type: "tween"
                }}
              >
                {extendedVideos.map((video, index) => (
                  <VideoItem
                    key={`${video.id}-${Math.floor(index / videos.length)}-${index}`}
                    video={video}
                    index={index}
                    onVideoClick={openFullscreen}
                  />
                ))}
              </motion.div>
            </div>
          </div>

          <ProgressIndicator 
            totalItems={videos.length}
            currentIndex={(currentIndex - startingIndex) % videos.length}
          />
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenVideo && (
          <FullscreenModal
            video={fullscreenVideo}
            currentIndex={fullscreenIndex}
            totalVideos={videos.length}
            onClose={closeFullscreen}
            onNavigate={navigateFullscreen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCarousel;
