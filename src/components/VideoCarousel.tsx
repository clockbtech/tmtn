
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videos as defaultVideos } from './video/videoData';
import { Video } from './video/types';
import VideoItem from './video/VideoItem';
import FullscreenModal from './video/FullscreenModal';
import CarouselControls from './video/CarouselControls';
import ProgressIndicator from './video/ProgressIndicator';
import VideoUpload from './video/VideoUpload';

const VideoCarousel = () => {
  const [uploadedVideos, setUploadedVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreenVideo, setFullscreenVideo] = useState<Video | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Combine default videos with uploaded videos
  const allVideos = [...defaultVideos, ...uploadedVideos];
  // Duplicate videos for infinite scroll
  const extendedVideos = [...allVideos, ...allVideos, ...allVideos];

  // Auto-advance carousel continuously
  useEffect(() => {
    if (isPlaying && !fullscreenVideo && allVideos.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, fullscreenVideo, allVideos.length]);

  // Reset position when reaching the end for infinite loop
  useEffect(() => {
    if (currentIndex >= allVideos.length * 2) {
      setTimeout(() => {
        setCurrentIndex(allVideos.length);
      }, 300);
    }
  }, [currentIndex, allVideos.length]);

  const handleVideosAdd = (newVideos: Video[]) => {
    setUploadedVideos(prev => [...prev, ...newVideos]);
    console.log('Added new videos:', newVideos);
  };

  const openFullscreen = (video: Video, index: number) => {
    setFullscreenVideo(video);
    setFullscreenIndex(index % allVideos.length);
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
      setFullscreenVideo(allVideos[newIndex]);
    } else if (direction === 'next' && fullscreenIndex < allVideos.length - 1) {
      const newIndex = fullscreenIndex + 1;
      setFullscreenIndex(newIndex);
      setFullscreenVideo(allVideos[newIndex]);
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

          {/* Video Upload Component */}
          <VideoUpload onVideosAdd={handleVideosAdd} />

          {allVideos.length > 0 && (
            <>
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
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    {extendedVideos.map((video, index) => (
                      <VideoItem
                        key={`${video.id}-${index}`}
                        video={video}
                        index={index}
                        onVideoClick={openFullscreen}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>

              <ProgressIndicator 
                totalItems={allVideos.length}
                currentIndex={currentIndex}
              />
            </>
          )}

          {allVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Upload your first videos to get started!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenVideo && (
          <FullscreenModal
            video={fullscreenVideo}
            currentIndex={fullscreenIndex}
            totalVideos={allVideos.length}
            onClose={closeFullscreen}
            onNavigate={navigateFullscreen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCarousel;
