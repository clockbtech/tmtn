
import React from 'react';

interface ProgressIndicatorProps {
  totalItems: number;
  currentIndex: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalItems, currentIndex }) => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === (currentIndex % totalItems)
                ? 'bg-nepal-orange w-8'
                : 'bg-gray-300 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
