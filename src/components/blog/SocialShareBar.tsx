
import React, { useState, useEffect } from 'react';
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
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedTitle = encodeURIComponent(blog.title);
  const encodedUrl = encodeURIComponent(currentUrl);
  
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    instagram: `https://www.instagram.com/`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  // Scroll detection effect with footer detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 200;
      
      // Get footer element
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Hide if footer is visible
        if (footerRect.top <= windowHeight) {
          setShowStickyBar(false);
          return;
        }
      }
      
      setShowStickyBar(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = (platform: string) => {
    if (platform === 'instagram') {
      window.open(shareLinks.instagram, '_blank');
      return;
    }
    const url = shareLinks[platform as keyof typeof shareLinks];
    window.open(url, '_blank', 'width=600,height=400');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop - Floating Left Sidebar - Positioned further left */}
      <div className={`hidden lg:block fixed left-2 top-1/2 transform -translate-y-1/2 z-40 transition-all duration-300 ${
        showStickyBar ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
      }`}>
        <div className="bg-white shadow-lg p-3 border rounded-full">
          <div className="flex flex-col space-y-3">
            <span className="text-sm font-medium text-gray-700 text-center mb-2">Share</span>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleShare('facebook')} 
              className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white border-blue-600 text-blue-600 hover:border-transparent transition-all duration-300"
            >
              <Facebook />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleShare('twitter')} 
              className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:text-white border-black text-black hover:border-transparent transition-all duration-300"
            >
              <span className="text-xs font-bold">𝕏</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleShare('instagram')} 
              className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 hover:text-white border-pink-600 text-pink-600 hover:border-transparent transition-all duration-300"
            >
              <Instagram />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleShare('linkedin')} 
              className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white border-blue-700 text-blue-700 hover:border-transparent transition-all duration-300"
            >
              <Linkedin />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handleShare('whatsapp')} 
              className="w-10 h-10 rounded-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white border-green-600 text-green-600 hover:border-transparent transition-all duration-300"
            >
              <MessageCircleMore />
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
                className="px-3 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white border-blue-600 text-blue-600 hover:border-transparent transition-all duration-300"
              >
                Facebook
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleShare('twitter')} 
                className="px-3 hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:text-white border-blue-400 text-blue-400 hover:border-transparent transition-all duration-300"
              >
                Twitter
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleShare('instagram')} 
                className="px-3 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 hover:text-white border-pink-600 text-pink-600 hover:border-transparent transition-all duration-300"
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
