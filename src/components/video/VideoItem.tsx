
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Video } from './types';

interface VideoItemProps {
  video: Video;
  index: number;
  onVideoClick: (video: Video, index: number) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, index, onVideoClick }) => {
  // Extract TikTok video ID from URL for embedding
  const getTikTokEmbedUrl = (url: string) => {
    const videoId = url.split('/video/')[1]?.split('?')[0];
    return `https://www.tiktok.com/embed/v2/${videoId}`;
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
        {/* TikTok Embed */}
        <iframe
          src={getTikTokEmbedUrl(video.url)}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title={video.title}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
            {video.title}
          </h3>
        </div>

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Play className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Top Brand Badge */}
        <div className="absolute top-4 left-4 bg-nepal-orange text-white px-3 py-1 rounded-full text-sm font-bold pointer-events-none">
          NEPAL
        </div>
      </motion.div>
    </div>
  );
};

export default VideoItem;
