
import React from 'react';

interface ProgressIndicatorProps {
  totalItems: number;
  currentIndex: number;
  onIndicatorClick?: (index: number) => void;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  totalItems, 
  currentIndex, 
  onIndicatorClick,
  className = "" 
}) => {
  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalItems }).map((_, index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick?.(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === (currentIndex % totalItems)
              ? 'bg-nepal-orange w-8'
              : 'bg-white/50 w-2 hover:bg-white/70'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
