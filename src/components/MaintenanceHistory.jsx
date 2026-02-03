import React, { useState } from 'react';
import { CheckCircle2, Wrench, Factory, Calendar, Bell, Hammer, ChevronDown, ChevronUp, ShoppingCart, PlayCircle, QrCode, Link as LinkIcon, PlusCircle } from 'lucide-react';

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

// Sub-component for individual component row in Completed Service Panel
const ComponentRow = ({ component }) => {
  const [currentEpc, setCurrentEpc] = useState(component.epc);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleAssignClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (inputValue.trim()) {
      setCurrentEpc(inputValue.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const digitalTwinUrl = `https://digital-twin-unique-product-prd.dktapp.cloud/details/${currentEpc}`;

  return (
    <div className="flex flex-col gap-2 bg-white p-3 rounded border border-[#34B78F]/30 shadow-sm">
      <div className="flex justify-between items-start">
        <span className="text-sm font-bold text-gray-800">{component.name}</span>
        {component.tutorialUrl && (
          <a 
            href={component.tutorialUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-[#3643BA] transition-colors"
            title="View Tutorial"
          >
            <PlayCircle size={16} />
          </a>
        )}
      </div>

      <div className="mt-1">
        {currentEpc ? (
          <a 
            href={digitalTwinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-[#3643BA] bg-[#3643BA]/5 px-2 py-1 rounded hover:bg-[#3643BA]/10 transition-colors border border-[#3643BA]/20 w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <QrCode size={12} />
            <span className="font-mono">{currentEpc}</span>
            <LinkIcon size={10} />
          </a>
        ) : isEditing ? (
          <div className="flex gap-2 w-full" onClick={(e) => e.stopPropagation()}>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Paste EPC here..."
              className="flex-1 text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#3643BA]"
              autoFocus
            />
            <button 
              onClick={handleSave}
              className="text-xs bg-[#3643BA] text-white px-3 py-1 rounded font-bold hover:bg-[#2a3599]"
            >
              Save
            </button>
          </div>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); handleAssignClick(); }}
            className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded hover:bg-gray-100 transition-colors border border-gray-200 border-dashed w-full justify-center"
          >
            <PlusCircle size={12} />
            Assign Component EPC
          </button>
        )}
      </div>
    </div>
  );
};

// Sub-component for Completed Service expansion
const CompletedServicePanel = ({ replacedComponents }) => (
  <div className="mt-4 pt-4 border-t border-[#34B78F]/20 bg-[#34B78F]/5 rounded-lg p-4 animate-in slide-in-from-top-2 cursor-default" onClick={(e) => e.stopPropagation()}>
    <h4 className="text-xs font-bold text-[#34B78F] uppercase mb-3 flex items-center gap-2">
      <CheckCircle2 size={14} />
      Service Details
    </h4>
    
    {(!replacedComponents || replacedComponents.length === 0) ? (
      <p className="text-xs text-gray-500 italic">No components replaced during this service.</p>
    ) : (
      <div className="space-y-3">
        <p className="text-xs text-gray-500 font-medium">Components Added / Replaced:</p>
        {replacedComponents.map((comp, idx) => (
          <ComponentRow key={idx} component={comp} />
        ))}
      </div>
    )}
  </div>
);

export default function MaintenanceHistory({ history, onBookService }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [reminders, setReminders] = useState({});

  const toggleExpansion = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
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
        card: 'border-[#34B78F] bg-[#34B78F]/5 hover:bg-[#34B78F]/10 cursor-pointer',
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
            const isExpanded = expandedItems[index];
            
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
                <div 
                  className={`flex-1 border rounded-xl p-4 transition-all ${styles.card}`}
                  onClick={() => item.status === 'completed' && toggleExpansion(index)}
                >
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
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2 py-1 bg-[#34B78F]/10 text-[#34B78F] text-[10px] font-bold uppercase rounded border border-[#34B78F]/20 flex items-center gap-1">
                          Completed
                          {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </span>
                      </div>
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
                          onClick={() => toggleExpansion(index)}
                          className={`flex items-center gap-1 px-4 py-2 rounded-full text-xs font-bold border transition-colors ${
                            isExpanded 
                              ? 'bg-gray-800 text-white border-gray-800' 
                              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-800'
                          }`}
                        >
                          <Hammer size={14} />
                          DIY
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
                      {isExpanded && (
                        <DIYPanel 
                          parts={item.diyDetails?.parts || []}
                          tutorial={item.diyDetails?.tutorial || "Standard Maintenance Guide"}
                        />
                      )}
                    </div>
                  )}

                  {/* Completed Service Panel */}
                  {item.status === 'completed' && isExpanded && (
                    <CompletedServicePanel replacedComponents={item.replacedComponents} />
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