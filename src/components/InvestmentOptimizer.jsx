import React from 'react';
import { TrendingDown, ShieldCheck } from 'lucide-react';

export default function InvestmentOptimizer({ 
  currentKm, 
  healthScore = 100, 
  maxKm = 20000,
  optimalSellStart = 14000,
  optimalSellEnd = 17500,
  ownershipChangeKm = null,
  serviceHistory = []
}) {
  // Timeline milestones (in km) - Dynamic scale
  const milestones = {
    purchase: 0,
    optimalSellStart: optimalSellStart,
    optimalSellEnd: optimalSellEnd,
    endOfLife: maxKm // Use dynamic max
  };

  // Calculate current position on timeline (0-100%)
  const timelinePosition = Math.min(100, (currentKm / milestones.endOfLife) * 100);

  // Health Score Visual Logic
  const getHealthColor = (score) => {
    if (score >= 90) return '#34B78F'; // Green
    if (score >= 75) return '#3643BA'; // Decathlon Blue
    if (score >= 60) return '#FF8946'; // Orange
    return '#D70321'; // Red
  };

  const healthColor = getHealthColor(healthScore);
  const circumference = 2 * Math.PI * 30; // Radius 30
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  // Asset Grade Logic
  const getGrade = (score) => {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    return 'D';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 relative overflow-hidden">
      
      {/* Header Section with Health Score */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#8BABFE]/10 flex items-center justify-center flex-shrink-0">
            <TrendingDown size={20} className="text-[#8BABFE]" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#101010]">Investment Optimizer</h3>
            <p className="text-sm text-[#616161]">
              Visualize your asset lifecycle and protect your resale value
            </p>
          </div>
        </div>

        {/* Circular Health Indicator (Top Right) */}
        <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="#E5E7EB"
                strokeWidth="5"
                fill="none"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke={healthColor}
                strokeWidth="5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-black" style={{ color: healthColor }}>
                {getGrade(healthScore)}
              </span>
            </div>
          </div>
          <div className="pr-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Health</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">{healthScore}%</p>
            <div className="flex items-center gap-1">
               <ShieldCheck size={10} className="text-[#34B78F]" />
               <span className="text-[10px] font-bold text-[#34B78F] uppercase tracking-tighter">Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Timeline */}
      <div className="relative px-4 pb-4">
        <div className="relative h-4 bg-[#F5F4F5] rounded-full overflow-visible"> {/* overflow-visible for flags */}
          
          {/* Zone 1: Early Ownership (Split by Past/Current Owner) */}
          {ownershipChangeKm ? (
            <>
              {/* Past Owner Zone (Grey) */}
              <div 
                className="absolute top-0 left-0 h-full bg-[#E5E7EB]"
                style={{ width: `${(ownershipChangeKm / milestones.endOfLife) * 100}%` }}
              />
              {/* Current Owner Zone (Blue Gradient) */}
              <div 
                className="absolute top-0 h-full bg-gradient-to-r from-[#3643BA]/20 to-[#3643BA]/40"
                style={{ 
                  left: `${(ownershipChangeKm / milestones.endOfLife) * 100}%`,
                  width: `${((milestones.optimalSellStart - ownershipChangeKm) / milestones.endOfLife) * 100}%`
                }}
              />
            </>
          ) : (
            /* Original Single Zone */
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#3643BA]/20 to-[#3643BA]/40"
              style={{ width: `${(milestones.optimalSellStart / milestones.endOfLife) * 100}%` }}
            />
          )}

          {/* Zone 2: Best Sell Window (Green) */}
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-[#34B78F] to-[#7AFFA6]"
            style={{ 
              left: `${(milestones.optimalSellStart / milestones.endOfLife) * 100}%`,
              width: `${((milestones.optimalSellEnd - milestones.optimalSellStart) / milestones.endOfLife) * 100}%`
            }}
          />

          {/* Zone 3: Upgrade/High Usage (Orange/Red) */}
          <div 
            className="absolute top-0 h-full bg-gradient-to-r from-[#FF8946] to-[#D70321]"
            style={{ 
              left: `${(milestones.optimalSellEnd / milestones.endOfLife) * 100}%`,
              width: `${((milestones.endOfLife - milestones.optimalSellEnd) / milestones.endOfLife) * 100}%`
            }}
          />

          {/* Service History Markers (Top Side) */}
          {serviceHistory
            .filter(item => (item.status === 'completed' || item.status === 'missed') && item.mileage <= maxKm)
            .map((item, index) => {
              const isMissed = item.status === 'missed';
              const color = isMissed ? '#D70321' : '#34B78F';
              const label = isMissed ? 'Missed' : 'Service';
              const bgClass = isMissed ? 'bg-white/90' : 'bg-white/80';

              return (
                <div 
                  key={`service-${index}`}
                  className="absolute top-0 -translate-x-1/2"
                  style={{ left: `${(item.mileage / milestones.endOfLife) * 100}%` }}
                >
                  <div className="flex flex-col items-center -translate-y-full mb-1">
                      <p 
                        className={`text-[9px] font-bold uppercase tracking-tighter ${bgClass} px-1 rounded shadow-sm`}
                        style={{ color: color }}
                      >
                        {label}
                      </p>
                      <div 
                        className="w-0.5 h-2" 
                        style={{ backgroundColor: isMissed ? 'rgba(215, 3, 33, 0.6)' : 'rgba(52, 183, 143, 0.4)' }}
                      />
                  </div>
                </div>
              );
            })}

          {/* Current Position Marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500 ease-out z-20"
            style={{ left: `${Math.min(100, timelinePosition)}%` }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#3643BA] border-4 border-white shadow-xl flex items-center justify-center">
                 <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="bg-[#3643BA] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {currentKm.toLocaleString()} km
                </div>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#3643BA] mx-auto mt-[-1px]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Labels below timeline */}
        <div className="relative mt-6 h-12 text-[10px] sm:text-xs">
          <div className="absolute" style={{ left: '0%', transform: 'translateX(-50%)' }}>
            <div className="text-center">
              <div className="w-0.5 h-4 bg-gray-300 mx-auto mb-2" />
              <p className="font-bold text-[#101010] uppercase tracking-tighter">Purchase</p>
              <p className="text-[#616161]">0 km</p>
            </div>
          </div>

          {/* Owner Change Label */}
          {ownershipChangeKm && (
            <div className="absolute" style={{ left: `${(ownershipChangeKm / milestones.endOfLife) * 100}%`, transform: 'translateX(-50%)' }}>
              <div className="text-center">
                <div className="w-0.5 h-4 bg-[#616161] mx-auto mb-2" />
                <p className="font-bold text-[#616161] uppercase tracking-tighter">Owner Change</p>
                <p className="text-[#616161]">{ownershipChangeKm.toLocaleString()} km</p>
              </div>
            </div>
          )}

          <div className="absolute" style={{ left: `${(milestones.optimalSellStart / milestones.endOfLife) * 100}%`, transform: 'translateX(-50%)' }}>
            <div className="text-center">
              <div className="w-0.5 h-4 bg-[#34B78F] mx-auto mb-2" />
              <p className="font-bold text-[#34B78F] uppercase tracking-tighter">Best Sell Window</p>
              <p className="text-[#616161]">{milestones.optimalSellStart.toLocaleString()} km</p>
            </div>
          </div>
          <div className="absolute" style={{ left: `${(milestones.optimalSellEnd / milestones.endOfLife) * 100}%`, transform: 'translateX(-50%)' }}>
            <div className="text-center">
              <div className="w-0.5 h-4 bg-[#FF8946] mx-auto mb-2" />
              <p className="font-bold text-[#FF8946] uppercase tracking-tighter">Upgrade Zone</p>
              <p className="text-[#616161]">{milestones.optimalSellEnd.toLocaleString()} km</p>
            </div>
          </div>
          <div className="absolute" style={{ left: '100%', transform: 'translateX(-50%)' }}>
            <div className="text-center">
              <div className="w-0.5 h-4 bg-[#D70321] mx-auto mb-2" />
              <p className="font-bold text-[#101010] uppercase tracking-tighter whitespace-nowrap">High Usage</p>
              <p className="text-[#616161]">{milestones.endOfLife.toLocaleString()} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}