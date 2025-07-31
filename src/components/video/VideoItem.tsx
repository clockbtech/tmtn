
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Video } from './types';

interface VideoItemProps {
  video: Video;
  index: number;
  onVideoClick: (video: Video, index: number) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, index, onVideoClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && isLoaded) {
      const playVideo = async () => {
        try {
          videoElement.currentTime = 0;
          await videoElement.play();
          console.log(`Video ${video.id} started playing`);
        } catch (error) {
          console.log(`Video ${video.id} autoplay failed:`, error);
        }
      };
      
      setTimeout(playVideo, 200);
    }
  }, [isLoaded, video.id]);

  const handleLoadedData = () => {
    console.log(`Video ${video.id} loaded successfully`);
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error(`Video ${video.id} failed to load:`, e);
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div
      className="flex-shrink-0 w-70"
      style={{ width: '280px' }}
    >
      <motion.div
        className="relative bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer group border-2 border-gray-100"
        style={{ aspectRatio: '9/16' }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        onClick={() => onVideoClick(video, index)}
      >
        {/* Video Element */}
        {!hasError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            aria-label={`Video: ${video.title}`}
            onLoadedData={handleLoadedData}
            onError={handleError}
            onCanPlay={() => {
              if (videoRef.current && isLoaded) {
                videoRef.current.play().catch(err => 
                  console.log(`Delayed play failed for video ${video.id}:`, err)
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
              console.error(`Thumbnail failed to load for video ${video.id}`);
              e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop';
            }}
          />
        )}

        {/* Loading state */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tmtn-red"></div>
          </div>
        )}

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

        {/* Top Brand Badge */}
        <div className="absolute top-4 left-4 bg-tmtn-red text-white px-3 py-1 rounded-full text-sm font-bold">
          NEPAL
        </div>
      </motion.div>
    </div>
  );
};

export default VideoItem;
