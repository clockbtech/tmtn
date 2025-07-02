
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

  // Create enough copies for smooth infinite scrolling
  const extendedVideos = [...videos, ...videos, ...videos, ...videos];
  const startIndex = videos.length; // Start from the middle set

  // Initialize at the middle set for infinite loop
  useEffect(() => {
    setCurrentIndex(startIndex);
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

  // Handle infinite loop reset without animation
  useEffect(() => {
    // When we reach the end of the third set, jump back to the second set
    if (currentIndex >= videos.length * 3) {
      setTimeout(() => {
        setCurrentIndex(videos.length);
      }, 50); // Very short delay to complete current animation
    }
    // When we go before the first set, jump to the second set
    else if (currentIndex < 0) {
      setTimeout(() => {
        setCurrentIndex(videos.length * 2 - 1);
      }, 50);
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
                  x: `${-currentIndex * (280 + 16)}px`
                }}
                transition={{
                  duration: currentIndex >= videos.length * 3 || currentIndex < 0 ? 0 : 0.8,
                  ease: "easeInOut"
                }}
              >
                {extendedVideos.map((video, index) => (
                  <VideoItem
                    key={`${video.id}-${Math.floor(index / videos.length)}-${index % videos.length}`}
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
            currentIndex={currentIndex - startIndex}
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
