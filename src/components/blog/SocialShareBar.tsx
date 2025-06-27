
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Facebook, Instagram, Linkedin, MessageCircleMore } from 'lucide-react';

interface SocialShareBarProps {
  blog: {
    title: string;
    slug?: string;
  };
}

const SocialShareBar = ({ blog }: SocialShareBarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedTitle = encodeURIComponent(blog.title);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: string) => {
    if (platform === 'instagram') {
      // For Instagram, we'll just open their main page since they don't support direct sharing
      window.open(shareLinks.instagram, '_blank');
      return;
    }
    
    const url = shareLinks[platform as keyof typeof shareLinks];
    window.open(url, '_blank', 'width=600,height=400');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop - Floating Left Sidebar */}
      <div className="hidden lg:block fixed left-6 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg shadow-lg p-3 border">
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-gray-700 text-center mb-2">Share</span>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare('facebook')}
              className="w-10 h-10 rounded-full hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600"
            >
              <span className="text-xs font-bold"> <Facebook /></span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare('X')}
              className="w-10 h-10 rounded-full hover:bg-black-400 hover:text-white border-black-400 text-black-400"
            >
              <span className="text-xs font-bold">x</span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare('instagram')}
              className="w-10 h-10 rounded-full hover:bg-pink-600 hover:text-white border-pink-600 text-pink-600"
            >
              <span className="text-xs font-bold"><Instagram /></span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare('linkedin')}
              className="w-10 h-10 rounded-full hover:bg-blue-700 hover:text-white border-blue-700 text-blue-700"
            >
              <span className="text-xs font-bold"> <Linkedin /></span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare('whatsapp')}
              className="w-10 h-10 rounded-full hover:bg-green-600 hover:text-white border-green-600 text-green-600"
            >
              <span className="text-xs font-bold"><MessageCircleMore /></span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile - Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Share this article:</span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="px-3 hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600"
              >
                Facebook
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="px-3 hover:bg-blue-400 hover:text-white border-blue-400 text-blue-400"
              >
                Twitter
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('instagram')}
                className="px-3 hover:bg-pink-600 hover:text-white border-pink-600 text-pink-600"
              >
                Instagram
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialShareBar;
