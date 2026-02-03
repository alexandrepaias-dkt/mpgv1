import React from 'react';
import { X, Calendar, Clock, MapPin } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, serviceName }) {
  if (!isOpen) return null;

  const slots = [
    { date: "Tomorrow, Feb 4", time: "09:00 AM", available: true },
    { date: "Tomorrow, Feb 4", time: "02:30 PM", available: true },
    { date: "Wed, Feb 5", time: "10:00 AM", available: true },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#3643BA] p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">Book Workshop</h3>
              <p className="text-blue-100 text-sm mt-1">
                {serviceName}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Location */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <MapPin size={18} className="text-[#3643BA]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Store</p>
              <p className="text-sm font-medium text-gray-900">Decathlon City Paris</p>
            </div>
          </div>

          {/* Slots */}
          <div>
            <p className="text-sm font-bold text-gray-900 mb-3">Suggested Availability</p>
            <div className="space-y-2">
              {slots.map((slot, idx) => (
                <button 
                  key={idx}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#3643BA] hover:bg-blue-50 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-gray-400 group-hover:text-[#3643BA]" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#3643BA]">
                      {slot.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {slot.time}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action */}
          <button 
            onClick={() => {
              alert("Booking Confirmed!");
              onClose();
            }}
            className="w-full bg-[#3643BA] text-white font-bold py-3.5 rounded-full uppercase tracking-wider hover:bg-[#2a3599] transition-colors shadow-lg shadow-blue-900/20"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
