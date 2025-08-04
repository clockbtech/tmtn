
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from './types';
import RecommendedExperiences from './RecommendedExperiences';

interface FullscreenModalProps {
  video: Video | null;
  currentIndex: number;
  totalVideos: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({
  video,
  currentIndex,
  totalVideos,
  onClose,
  onNavigate
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (video) {
      setIsLoaded(false);
      setHasError(false);
    }
  }, [video]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && video && isLoaded) {
      const playVideo = async () => {
        try {
          videoElement.currentTime = 0;
          await videoElement.play();
          console.log(`Fullscreen video ${video.id} started playing`);
        } catch (error) {
          console.log(`Fullscreen video ${video.id} autoplay failed:`, error);
        }
      };
      
      setTimeout(playVideo, 200);
    }
  }, [video, isLoaded]);

  const handleLoadedData = () => {
    console.log(`Fullscreen video ${video?.id} loaded successfully`);
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error(`Fullscreen video ${video?.id} failed to load:`, e);
    setHasError(true);
    setIsLoaded(false);
  };

  if (!video) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex items-center justify-center p-4"
    >
      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors"
        aria-label="Close video"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <X className="w-8 h-8" />
      </motion.button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <motion.button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
          aria-label="Previous video"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>
      )}

      {currentIndex < totalVideos - 1 && (
        <motion.button
          onClick={() => onNavigate('next')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
          aria-label="Next video"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>
      )}

      {/* Main content container */}
      <motion.div
        className="flex w-full h-full max-w-7xl mx-auto gap-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Video section - Left side */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '9/16' }}>
            {!hasError ? (
              <video
                ref={videoRef}
                key={video.id}
                className="w-full h-full object-cover rounded-lg"
                muted
                loop
                playsInline
                controls={false}
                aria-label={`Video: ${video.title}`}
                onLoadedData={handleLoadedData}
                onError={handleError}
                onCanPlay={() => {
                  if (videoRef.current && isLoaded) {
                    videoRef.current.play().catch(err => 
                      console.log(`Delayed fullscreen play failed for video ${video.id}:`, err)
                    );
                  }
                }}
              >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              // Fallback to thumbnail if video fails to load
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  console.error(`Fullscreen thumbnail failed to load for video ${video.id}`);
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop';
                }}
              />
            )}

            {/* Loading state */}
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
              </div>
            )}

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white text-xl font-bold drop-shadow-lg">
                {video.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Recommended experiences section - Right side */}
        <div className="w-80 flex-shrink-0">
          <RecommendedExperiences currentVideoId={video.id} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FullscreenModal;
