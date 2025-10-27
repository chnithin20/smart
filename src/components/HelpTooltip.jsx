import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

const HelpTooltip = ({ content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="text-gray-400 hover:text-blue-400 transition-colors focus:outline-none"
        aria-label="Help"
      >
        <HelpCircle size={16} />
      </button>
      
      {isVisible && (
        <div
          className={`absolute z-50 ${positionClasses[position]} w-64 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg border border-gray-700 animate-fade-in`}
          role="tooltip"
        >
          {content}
          <div className="absolute w-2 h-2 bg-gray-800 border-gray-700 transform rotate-45"
            style={{
              [position === 'top' ? 'bottom' : position === 'bottom' ? 'top' : position === 'left' ? 'right' : 'left']: '-4px',
              [position === 'top' || position === 'bottom' ? 'left' : 'top']: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              borderWidth: position === 'top' ? '0 1px 1px 0' : position === 'bottom' ? '1px 0 0 1px' : position === 'left' ? '1px 1px 0 0' : '0 0 1px 1px'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HelpTooltip;
