
import React from 'react';
import { Play, Pause } from 'lucide-react';

interface CarouselControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({ isPlaying, onTogglePlay }) => {
  return (
    <div className="flex justify-center mb-8">
      <button
        onClick={onTogglePlay}
        className="flex items-center space-x-2 btn-gradient text-white px-6 py-3 rounded-full transition-colors shadow-lg"
        aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        <span className="font-medium">{isPlaying ? 'Pause' : 'Play'}</span>
      </button>
    </div>
  );
};

export default CarouselControls;

