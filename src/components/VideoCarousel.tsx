import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
}

const VideoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullscreenVideo, setFullscreenVideo] = useState<Video | null>(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Authentic Nepali culture and mountain videos from free stock platforms
  const videos: Video[] = [
    {
      id: '1',
      title: 'Everest Base Camp Trek',
      url: 'https://cdn.pixabay.com/video/2023/04/18/158622-822617469_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop'
    },
    {
      id: '2',
      title: 'Traditional Nepali Festival',
      url: 'https://cdn.pixabay.com/video/2022/07/15/124623-728891234_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=800&fit=crop'
    },
    {
      id: '3',
      title: 'Himalayan Mountain Range',
      url: 'https://cdn.pixabay.com/video/2021/09/14/89253-605789123_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=800&fit=crop'
    },
    {
      id: '4',
      title: 'Buddhist Monasteries',
      url: 'https://cdn.pixabay.com/video/2022/03/22/111234-689456789_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=800&fit=crop'
    },
    {
      id: '5',
      title: 'Annapurna Circuit Trail',
      url: 'https://cdn.pixabay.com/video/2023/01/10/145623-756234891_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop'
    },
    {
      id: '6',
      title: 'Nepali Traditional Dance',
      url: 'https://cdn.pixabay.com/video/2022/05/08/116789-678912345_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=800&fit=crop'
    }
  ];

  // Duplicate videos for infinite scroll
  const extendedVideos = [...videos, ...videos, ...videos];

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

  // Reset position when reaching the end for infinite loop
  useEffect(() => {
    if (currentIndex >= videos.length * 2) {
      setTimeout(() => {
        setCurrentIndex(videos.length);
      }, 300);
    }
  }, [currentIndex, videos.length]);

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

  const FullscreenModal = () => {
    if (!fullscreenVideo) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      >
        {/* Close button */}
        <button
          onClick={closeFullscreen}
          className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation buttons */}
        {fullscreenIndex > 0 && (
          <button
            onClick={() => navigateFullscreen('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {fullscreenIndex < videos.length - 1 && (
          <button
            onClick={() => navigateFullscreen('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
            aria-label="Next video"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Video container */}
        <div className="relative w-full h-full max-w-md mx-auto">
          <video
            key={fullscreenVideo.id}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label={`Video: ${fullscreenVideo.title}`}
          >
            <source src={fullscreenVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-xl font-bold drop-shadow-lg">
              {fullscreenVideo.title}
            </h3>
          </div>
        </div>
      </motion.div>
    );
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

          {/* Play/Pause Controls */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center space-x-2 bg-nepal-primary text-white px-6 py-3 rounded-full hover:bg-nepal-primary/90 transition-colors shadow-lg"
              aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>

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
                  <div
                    key={`${video.id}-${index}`}
                    className="flex-shrink-0 w-70"
                    style={{ width: '280px' }}
                  >
                    <motion.div
                      className="relative bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer group border-2 border-gray-100"
                      style={{ aspectRatio: '9/16' }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openFullscreen(video, index)}
                    >
                      {/* Video Element */}
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload={index < 3 ? "metadata" : "none"}
                        aria-label={`Video: ${video.title}`}
                      >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                          {video.title}
                        </h3>
                      </div>

                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Top Brand Badge (like in reference image) */}
                      <div className="absolute top-4 left-4 bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                        NEPAL
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              {videos.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === (currentIndex % videos.length)
                      ? 'bg-nepal-orange w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenVideo && <FullscreenModal />}
      </AnimatePresence>
    </>
  );
};

export default VideoCarousel;
