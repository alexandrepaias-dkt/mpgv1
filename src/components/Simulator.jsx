import React from 'react';
import { Calendar, History } from 'lucide-react';
import { DATASET } from '../data/simulationData';

export default function Simulator({ 
  currentMonthIndex, 
  onMonthChange 
}) {
  if (!DATASET || DATASET.length === 0) return null;
  
  const maxIndex = DATASET.length - 1;
  const currentData = DATASET[currentMonthIndex];
  
  if (!currentData) return null;

  // Format Date for display (e.g., "January 2024")
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleChange = (e) => {
    onMonthChange(parseInt(e.target.value));
  };

  const progress = (currentMonthIndex / maxIndex) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <History size={20} className="text-[#3643BA]" />
        <h2 className="text-xl font-bold text-[#101010]">Timeline View</h2>
      </div>

      <div className="space-y-6">
        {/* Date Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#616161]" />
              <label className="text-sm font-bold text-[#101010]">Date</label>
            </div>
            <span className="text-lg font-bold text-[#3643BA]">{formatDate(currentData.date)}</span>
          </div>
          
          <input
            type="range"
            min="0"
            max={maxIndex}
            step="1"
            value={currentMonthIndex}
            onChange={handleChange}
            className="w-full h-2 bg-[#F5F4F5] rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3643BA 0%, #3643BA ${progress}%, #F5F4F5 ${progress}%, #F5F4F5 100%)`
            }}
          />
          
          <div className="flex justify-between text-xs text-[#616161] mt-1">
            <span>{formatDate(DATASET[0].date)}</span>
            <span>{formatDate(DATASET[maxIndex].date)}</span>
          </div>
        </div>

        {/* Data summary for this point in time */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#F5F4F5]">
           <div className="text-center">
             <p className="text-xs text-[#616161]">Mileage</p>
             <p className="font-bold text-[#101010]">{currentData.total_milage.toLocaleString()} km</p>
           </div>
           <div className="text-center border-l border-[#F5F4F5]">
             <p className="text-xs text-[#616161]">Value</p>
             <p className="font-bold text-[#101010]">€{currentData.second_hand_price.toLocaleString()}</p>
           </div>
           <div className="text-center border-l border-[#F5F4F5]">
             <p className="text-xs text-[#616161]">Health</p>
             <p className="font-bold text-[#101010]">{currentData.health_score}%</p>
           </div>
        </div>
      </div>

      <style>{`
        input[type="range"].slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3643BA;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input[type="range"].slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3643BA;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}