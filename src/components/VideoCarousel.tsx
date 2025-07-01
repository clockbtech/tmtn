
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, ChevronUp, ChevronDown } from 'lucide-react';

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

  // Sample video data - replace with your actual video URLs
  const videos: Video[] = [
    {
      id: '1',
      title: 'Everest Base Camp Trek - The Ultimate Adventure',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
    },
    {
      id: '2',
      title: 'Annapurna Circuit - Spectacular Mountain Views',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop'
    },
    {
      id: '3',
      title: 'Kathmandu Culture Tour - Ancient Temples',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1920&h=1080&fit=crop'
    },
    {
      id: '4',
      title: 'Chitwan Wildlife Safari - Jungle Adventures',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&h=1080&fit=crop'
    },
    {
      id: '5',
      title: 'Pokhara Lake District - Serene Beauty',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (isPlaying && !fullscreenVideo) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, videos.length, fullscreenVideo]);

  // Smooth scroll to current video
  useEffect(() => {
    if (carouselRef.current) {
      const scrollLeft = currentIndex * carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const openFullscreen = (video: Video, index: number) => {
    setFullscreenVideo(video);
    setFullscreenIndex(index);
    setIsPlaying(false);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
    setIsPlaying(true);
  };

  const navigateFullscreen = (direction: 'up' | 'down') => {
    if (direction === 'up' && fullscreenIndex > 0) {
      const newIndex = fullscreenIndex - 1;
      setFullscreenIndex(newIndex);
      setFullscreenVideo(videos[newIndex]);
    } else if (direction === 'down' && fullscreenIndex < videos.length - 1) {
      const newIndex = fullscreenIndex + 1;
      setFullscreenIndex(newIndex);
      setFullscreenVideo(videos[newIndex]);
    }
  };

  const TikTokStyleModal = () => {
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
            onClick={() => navigateFullscreen('up')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous video"
          >
            <ChevronUp className="w-8 h-8" />
          </button>
        )}

        {fullscreenIndex < videos.length - 1 && (
          <button
            onClick={() => navigateFullscreen('down')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
            aria-label="Next video"
          >
            <ChevronDown className="w-8 h-8" />
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
      <section className="py-20 bg-gray-50 overflow-hidden">
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

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Play/Pause Controls */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 bg-nepal-primary text-white px-4 py-2 rounded-full hover:bg-nepal-primary/90 transition-colors"
                aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
            </div>

            {/* Video Carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-full snap-center px-2"
                >
                  <motion.div
                    className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
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
                      loading={index === 0 ? "eager" : "lazy"}
                      aria-label={`Video: ${video.title}`}
                    >
                      <source src={video.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                      <h3 className="text-white font-bold drop-shadow-lg text-lg sm:text-xl lg:text-2xl leading-tight">
                        {video.title}
                      </h3>
                    </div>

                    {/* Play Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-nepal-orange scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TikTok-style Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenVideo && <TikTokStyleModal />}
      </AnimatePresence>
    </>
  );
};

export default VideoCarousel;
