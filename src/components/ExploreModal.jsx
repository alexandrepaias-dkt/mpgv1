import React from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function ExploreModal({ isOpen, onClose, type = 'accessories' }) {
  if (!isOpen) return null;

  const content = {
    accessories: {
      title: "Recommended Upgrades",
      products: [
        { name: "Carbon Wheels Set", price: "€800", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=200", tag: "Best Match" },
        { name: "Aero Handlebars", price: "€250", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=200", tag: "Performance" },
        { name: "Ceramic Bearings", price: "€120", image: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&q=80&w=200", tag: "Efficiency" }
      ]
    },
    bikes: {
      title: "Trade-in Opportunities",
      products: [
        { name: "Van Rysel RCR Pro", price: "€4,200", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=200", tag: "Pro Level" },
        { name: "Riverside GCR Carbon", price: "€2,800", image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=200", tag: "Versatile" },
        { name: "Triban RC 520", price: "€1,200", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=200", tag: "Endurance" }
      ]
    }
  };

  const currentContent = content[type] || content.accessories;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#101010]">{currentContent.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {currentContent.products.map((product, i) => (
            <div key={i} className="flex gap-4 p-3 border rounded-xl hover:border-[#FF8946] transition-all group cursor-pointer bg-white hover:shadow-md">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#FF8946] tracking-wider mb-1 block">{product.tag}</span>
                    <h4 className="font-bold text-gray-900 group-hover:text-[#FF8946] transition-colors">{product.name}</h4>
                  </div>
                  <span className="font-bold text-gray-900">{product.price}</span>
                </div>
                <button className="text-left text-xs font-bold text-gray-400 mt-2 group-hover:text-[#FF8946] flex items-center gap-1">
                  {type === 'bikes' ? 'Configure Trade-in' : 'View Details'} <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 text-center">
          <button className="text-sm font-bold text-[#3643BA] hover:underline">
            {type === 'bikes' ? 'Compare All Models' : 'View All Compatible Parts'}
          </button>
        </div>
      </div>
    </div>
  );
}