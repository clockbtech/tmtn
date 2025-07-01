
import React from 'react';
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
  if (!video) return null;

  // Extract TikTok video ID from URL for embedding
  const getTikTokEmbedUrl = (url: string) => {
    const videoId = url.split('/video/')[1]?.split('?')[0];
    return `https://www.tiktok.com/embed/v2/${videoId}`;
  };

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

      {/* TikTok Embed container */}
      <div className="relative w-full h-full max-w-md mx-auto">
        <iframe
          key={video.id}
          src={getTikTokEmbedUrl(video.url)}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title={video.title}
        />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <h3 className="text-white text-xl font-bold drop-shadow-lg">
            {video.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default FullscreenModal;
