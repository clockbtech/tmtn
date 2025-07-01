
import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && video) {
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.log('Fullscreen video autoplay failed:', error);
        }
      };
      
      setTimeout(playVideo, 100);
    }
  }, [video]);

  if (!video) return null;

  // Check if this is a local video (starts with blob:)
  const isLocalVideo = video.url.startsWith('blob:');

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
        <video
          ref={videoRef}
          key={video.id}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          poster={video.thumbnail}
          aria-label={`Video: ${video.title}`}
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(console.log);
            }
          }}
        >
          <source src={video.url} type="video/mp4" />
          {/* Fallback for different video formats */}
          {isLocalVideo && (
            <>
              <source src={video.url} type="video/webm" />
              <source src={video.url} type="video/ogg" />
            </>
          )}
          Your browser does not support the video tag.
        </video>

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
