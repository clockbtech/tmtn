
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videos } from './video/videoData';
import { Video } from './video/types';
import VideoItem from './video/VideoItem';
import FullscreenModal from './video/FullscreenModal';
import CarouselControls from './video/CarouselControls';

const VideoCarousel = () => {
  const [fullscreenVideo, setFullscreenVideo] = useState<Video | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const extendedVideos = [...videos, ...videos];

  return (
    <>
      <section className="py-20 bg-white overflow-hidden relative">
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
        </div>

        {/* Draggable Scrolling Video Carousel */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            ref={carouselRef}
            className="flex gap-4 px-8 py-6 cursor-grab active:cursor-grabbing"
            animate={isPlaying && !isDragging ? {
              x: ['0%', '-50%'],
            } : {}}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
            }}
            drag="x"
            dragConstraints={{ left: -1000, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            dragElastic={0.2}
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
      </section>

      {/* Fullscreen Modal with Zoom Effect */}
      <AnimatePresence>
        {fullscreenVideo && (
          <motion.div
            key="fullscreen"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <FullscreenModal
              video={fullscreenVideo}
              currentIndex={fullscreenIndex}
              totalVideos={videos.length}
              onClose={closeFullscreen}
              onNavigate={navigateFullscreen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VideoCarousel;
