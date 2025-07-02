
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from './types';

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
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors"
        aria-label="Close video"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate('prev')}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
          aria-label="Previous video"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {currentIndex < totalVideos - 1 && (
        <button
          onClick={() => onNavigate('next')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 text-white hover:text-gray-300 transition-colors"
          aria-label="Next video"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Video container */}
      <div className="relative w-full h-full max-w-md mx-auto">
        {!hasError ? (
          <video
            ref={videoRef}
            key={video.id}
            className="w-full h-full object-cover"
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
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Fullscreen thumbnail failed to load for video ${video.id}`);
              e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop';
            }}
          />
        )}

        {/* Loading state */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white text-xl font-bold drop-shadow-lg">
            {video.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default FullscreenModal;
