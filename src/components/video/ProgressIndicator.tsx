
import React from 'react';
import ProgressIndicatorUI from '../ui/progress-indicator';

interface ProgressIndicatorProps {
  totalItems: number;
  currentIndex: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ totalItems, currentIndex }) => {
  return (
    <div className="flex justify-center mt-8">
      <ProgressIndicatorUI
        totalItems={totalItems}
        currentIndex={currentIndex}
        className="space-x-2"
      />
    </div>
  );
};

export default ProgressIndicator;
