import React from 'react';
import { Calendar, PlayCircle } from 'lucide-react';

export default function TimelineControl({ 
  currentIndex, 
  maxIndex, 
  onIndexChange,
  currentDate,
  startDate,
  endDate 
}) {
  
  const progress = (currentIndex / maxIndex) * 100;

  // Format Date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex items-center gap-6">
      
      {/* Label / Icon */}
      <div className="flex items-center gap-2 text-[#3643BA] flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-[#3643BA]/10 flex items-center justify-center">
            <PlayCircle size={18} fill="#3643BA" className="text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#616161] uppercase tracking-wider">Simulation</p>
          <p className="font-bold text-sm leading-none whitespace-nowrap">{formatDate(currentDate)}</p>
        </div>
      </div>

      {/* Slider Container */}
      <div className="flex-1 relative">
         {/* Range Input */}
         <input
            type="range"
            min="0"
            max={maxIndex}
            step="1"
            value={currentIndex}
            onChange={(e) => onIndexChange(parseInt(e.target.value))}
            className="w-full h-2 bg-[#F5F4F5] rounded-lg appearance-none cursor-pointer slider relative z-10"
            style={{
              background: `linear-gradient(to right, #3643BA 0%, #3643BA ${progress}%, #F5F4F5 ${progress}%, #F5F4F5 100%)`
            }}
          />
          
          {/* Ticks/Labels */}
          <div className="flex justify-between text-[10px] text-[#949494] mt-2 font-medium">
             <span>{formatDate(startDate)}</span>
             <span>{formatDate(endDate)}</span>
          </div>
      </div>

      <style>{`
        input[type="range"].slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3643BA;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          transition: transform 0.1s;
        }
        input[type="range"].slider::-webkit-slider-thumb:hover {
           transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
