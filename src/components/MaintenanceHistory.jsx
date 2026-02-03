import React, { useState } from 'react';
import { CheckCircle2, Wrench, Factory, Calendar, Bell, Hammer, ChevronDown, ChevronUp, ShoppingCart, PlayCircle } from 'lucide-react';

// Sub-component for the DIY expansion panel
const DIYPanel = ({ parts, tutorial }) => (
  <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 rounded-lg p-4 animate-in slide-in-from-top-2">
    <h4 className="text-xs font-bold text-gray-700 uppercase mb-3 flex items-center gap-2">
      <Hammer size={14} className="text-[#3643BA]" />
      Do It Yourself Kit
    </h4>
    
    <div className="space-y-3 mb-4">
      <p className="text-xs text-gray-500 font-medium">Required Components:</p>
      {parts.map((part, idx) => (
        <div key={idx} className="flex justify-between items-center bg-white p-2 rounded border border-gray-200 shadow-sm">
          <span className="text-sm text-gray-800">{part.name}</span>
          <span className="text-sm font-bold text-[#FF8946]">{part.price}</span>
        </div>
      ))}
      <button className="w-full mt-2 flex items-center justify-center gap-2 text-xs font-bold text-[#3643BA] border border-[#3643BA] rounded-full py-2 hover:bg-[#3643BA] hover:text-white transition-colors">
        <ShoppingCart size={14} />
        ADD ALL TO CART
      </button>
    </div>

    <div>
      <p className="text-xs text-gray-500 font-medium mb-2">Tutorial:</p>
      <div className="flex items-center gap-3 p-2 bg-white rounded border border-gray-200 cursor-pointer hover:border-[#3643BA] transition-colors group">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#3643BA] group-hover:text-white transition-colors">
          <PlayCircle size={16} />
        </div>
        <span className="text-sm text-gray-700 font-medium underline decoration-gray-300 group-hover:decoration-[#3643BA]">
          {tutorial}
        </span>
      </div>
    </div>
  </div>
);

export default function MaintenanceHistory({ history, onBookService }) {
  const [openDIY, setOpenDIY] = useState({});
  const [reminders, setReminders] = useState({});

  const toggleDIY = (id) => {
    setOpenDIY(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleReminder = (id) => {
    setReminders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getEventIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 size={20} className="text-[#34B78F]" />;
    if (status === 'upcoming') return <Calendar size={20} className="text-[#3643BA]" />;
    return <Wrench size={20} className="text-gray-400" />;
  };

  // Logic for Visual Styles
  const getEventStyles = (status) => {
    if (status === 'completed') {
      return {
        card: 'border-[#34B78F] bg-[#34B78F]/5',
        opacity: 'opacity-100'
      };
    }
    if (status === 'upcoming') {
      return {
        // Stronger blue accent: left border + blue tint background
        card: 'border-[#3643BA] border-l-4 bg-blue-50/50 shadow-md', 
        opacity: 'opacity-100'
      };
    }
    return {
      card: 'border-gray-200 bg-gray-50/50', // Grayed out "Future"
      opacity: 'opacity-60 hover:opacity-100 transition-opacity' // Dimmed but clickable
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#101010]">Service Log</h2>
        <div className="flex items-center gap-2 text-sm text-[#616161]">
          <Factory size={16} />
          <span>Lifetime Schedule</span>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#F5F4F5]" />

        <div className="space-y-6">
          {history.map((item, index) => {
            const styles = getEventStyles(item.status);
            
            return (
              <div key={index} className={`relative flex gap-4 ${styles.opacity}`}>
                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 ${
                  item.status === 'completed' ? 'border-[#34B78F]' : 
                  item.status === 'upcoming' ? 'border-[#3643BA] shadow-lg' : 'border-gray-200'
                }`}>
                  {getEventIcon(item.status)}
                </div>

                {/* Card */}
                <div className={`flex-1 border rounded-xl p-4 transition-all ${styles.card}`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold ${item.status === 'future' ? 'text-gray-500' : 'text-[#101010]'}`}>
                          {item.service}
                        </h3>
                        {item.status === 'upcoming' && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3643BA] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3643BA]"></span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#616161] font-medium">{item.mileage} km</p>
                    </div>
                    
                    {/* Status Badge */}
                    {item.status === 'completed' && (
                      <span className="px-2 py-1 bg-[#34B78F]/10 text-[#34B78F] text-[10px] font-bold uppercase rounded border border-[#34B78F]/20">
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Actions for Upcoming/Future */}
                  {item.status !== 'completed' && (
                    <div className="mt-4 space-y-3">
                      
                      {/* Primary Actions Row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button 
                          onClick={() => onBookService(item)}
                          className={`flex-1 px-4 py-2 rounded-full text-xs font-bold transition-colors shadow-sm ${
                            item.status === 'upcoming' 
                              ? 'bg-[#3643BA] text-white hover:bg-[#2a3599]' 
                              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          BOOK WORKSHOP
                        </button>
                        
                        <button 
                          onClick={() => toggleDIY(index)}
                          className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                            openDIY[index] 
                              ? 'bg-gray-800 text-white border-gray-800' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-800'
                          }`}
                        >
                          <Hammer size={14} />
                          DIY
                          {openDIY[index] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>

                      {/* Secondary Actions Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-black/5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Remind Me
                          </span>
                          <button 
                            onClick={() => toggleReminder(index)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                              reminders[index] ? 'bg-[#3643BA]' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              reminders[index] ? 'translate-x-5' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                        
                        {item.valueImpact > 0 && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-[#FF8946] bg-[#FF8946]/10 px-2 py-1 rounded">
                            <span>+€{item.valueImpact} Value</span>
                          </div>
                        )}
                      </div>

                      {/* DIY Panel */}
                      {openDIY[index] && (
                        <DIYPanel 
                          parts={item.diyDetails?.parts || []}
                          tutorial={item.diyDetails?.tutorial || "Standard Maintenance Guide"}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}