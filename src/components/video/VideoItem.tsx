
import React, { useRef, useEffect } from 'react';
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

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Ensure video plays when component mounts
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };
      
      // Small delay to ensure the video element is ready
      setTimeout(playVideo, 100);
    }
  }, []);

  // Check if this is a local video (starts with blob:)
  const isLocalVideo = video.url.startsWith('blob:');

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
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          aria-label={`Video: ${video.title}`}
          poster={video.thumbnail}
          onLoadedData={() => {
            // Ensure video plays when loaded
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
        <div className="absolute top-4 left-4 bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-bold">
          {isLocalVideo ? 'UPLOADED' : 'NEPAL'}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoItem;
