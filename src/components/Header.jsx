import React from 'react';
import { User, ScanBarcode } from 'lucide-react';

export default function Header({ userName, epcId }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tight text-[#3643BA]">DECATHLON</span>
          {epcId && (
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-xs text-gray-600 font-mono transition-colors group cursor-pointer border border-transparent hover:border-gray-300">
              <ScanBarcode size={16} className="text-[#3643BA]" />
              <span className="tracking-widest">{epcId}</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {userName && (
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              Hello, {userName}
            </span>
          )}
          <button className="w-8 h-8 rounded-full bg-[#F5F4F5] flex items-center justify-center hover:bg-[#949494] hover:text-white transition-colors">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}