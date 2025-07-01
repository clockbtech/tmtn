
import React, { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { Video } from './types';

interface VideoUploadProps {
  onVideosAdd: (videos: Video[]) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideosAdd }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newVideos: Video[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        console.warn(`File ${file.name} is not a video file`);
        continue;
      }

      try {
        // Create object URL for the video
        const videoUrl = URL.createObjectURL(file);
        
        // Generate thumbnail from video
        const thumbnail = await generateVideoThumbnail(file);
        
        const video: Video = {
          id: `local-${Date.now()}-${i}`,
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          url: videoUrl,
          thumbnail: thumbnail
        };

        newVideos.push(video);
      } catch (error) {
        console.error(`Error processing video ${file.name}:`, error);
      }
    }

    if (newVideos.length > 0) {
      onVideosAdd(newVideos);
    }

    setIsUploading(false);
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.addEventListener('loadedmetadata', () => {
        // Set canvas dimensions to match video aspect ratio
        canvas.width = 400;
        canvas.height = (video.videoHeight / video.videoWidth) * 400;
        
        // Seek to 1 second or 10% of video duration
        video.currentTime = Math.min(1, video.duration * 0.1);
      });

      video.addEventListener('seeked', () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnail);
        } else {
          reject(new Error('Could not get canvas context'));
        }
        
        // Clean up
        URL.revokeObjectURL(video.src);
      });

      video.addEventListener('error', () => {
        reject(new Error('Could not load video'));
        URL.revokeObjectURL(video.src);
      });

      video.src = URL.createObjectURL(file);
      video.load();
    });
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-nepal-orange transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
        
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Upload Your Videos
          </h3>
          <p className="text-gray-500 mb-4">
            Select video files from your device to add to the carousel
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center px-6 py-3 bg-nepal-primary text-white rounded-lg hover:bg-nepal-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Choose Videos
              </>
            )}
          </button>
          
          <p className="text-sm text-gray-400 mt-2">
            Supports MP4, WebM, MOV and other video formats
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
