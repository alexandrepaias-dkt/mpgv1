import React from 'react';
import { X, Check, Sparkles, TrendingUp } from 'lucide-react';

export default function SubscriptionModal({ isOpen, onClose, savings }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
        <div className="bg-gradient-to-r from-[#3643BA] to-[#2a3599] p-6 text-white text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-3 text-[#7AFFA6]" />
          <h3 className="text-2xl font-bold">Cyclist Pro Plan</h3>
          <p className="text-blue-100">Unlimited Maintenance & Support</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-4">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <TrendingUp className="text-[#34B78F]" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Projected Annual Savings</p>
              <p className="text-2xl font-bold text-[#34B78F]">{savings}</p>
            </div>
          </div>

          <ul className="space-y-3">
            {['Unlimited safety checks', 'Free labor on part replacements', 'Priority workshop booking', '10% off components'].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <Check size={16} className="text-[#3643BA]" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Monthly Plan</span>
              <span className="text-xl font-bold text-[#101010]">€15<span className="text-sm font-normal text-gray-400">/mo</span></span>
            </div>
            <button onClick={() => { alert('Subscribed!'); onClose(); }} className="w-full bg-[#3643BA] text-white font-bold py-3.5 rounded-full uppercase tracking-wider hover:bg-[#2a3599] transition-colors">
              Subscribe Now
            </button>
          </div>
        </div>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
