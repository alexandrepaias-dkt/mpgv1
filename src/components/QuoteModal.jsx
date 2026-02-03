import React from 'react';
import { X, Calendar, MapPin, Store, CheckCircle } from 'lucide-react';

export default function QuoteModal({ isOpen, onClose, productName, estimatedValue }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="bg-[#3643BA] p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold">Sell Your Bike</h3>
              <p className="text-blue-100 text-sm mt-1">{productName}</p>
            </div>
            <button onClick={onClose} className="p-1 bg-white/10 hover:bg-white/20 rounded-full">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-gray-500 mb-1">Estimated Buy-Back Value</p>
            <p className="text-3xl font-bold text-[#3643BA]">€{estimatedValue}</p>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Select Store for Drop-off</label>
            <div className="space-y-2">
              {['Decathlon City Paris', 'Decathlon Wagram'].map((store, i) => (
                <button key={i} className="w-full flex items-center gap-3 p-3 border rounded-lg hover:border-[#3643BA] hover:bg-blue-50 transition-all group text-left">
                  <Store size={18} className="text-gray-400 group-hover:text-[#3643BA]" />
                  <span className="text-sm font-medium text-gray-700">{store}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { alert('Appointment Confirmed'); onClose(); }} className="w-full bg-[#FF8946] text-white font-bold py-3.5 rounded-full uppercase tracking-wider hover:bg-[#e67835] transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
