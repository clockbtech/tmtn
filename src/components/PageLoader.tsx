
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface PageLoaderProps {
  message?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-32 h-32">
          <DotLottieReact
            src="https://lottie.host/4db68bbd-31f6-4cd8-b6b5-2a22f24bfd1d/jxnToCAMyb.json"
            loop
            autoplay
          />
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
