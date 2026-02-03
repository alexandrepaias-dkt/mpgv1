import React, { useState } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, className, ...rest } = props;

  return didError ? (
    <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
      <img src={ERROR_IMG_SRC} alt="Error" className="w-12 h-12 opacity-50" />
    </div>
  ) : (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setDidError(true)} 
      {...rest} 
    />
  );
}

export default function BikeHero({ productName, purchaseDate, productionDate, epcId, buyBackValue, imageUrl, onGetQuote }) {
  return (
    <div className="relative bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-48 sm:h-60 overflow-hidden">
        <ImageWithFallback 
          key={imageUrl}
          src={imageUrl} 
          alt={productName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{productName}</h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-90">
             <p>Purchased: {purchaseDate}</p>
             {productionDate && (
               <p>
                 Produced: <a 
                   href={`https://digital-twin-unique-product-prd.dktapp.cloud/details/${epcId}`} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="underline hover:text-[#FF8946] transition-colors"
                   title="View Digital Passport"
                 >
                   {productionDate}
                 </a>
               </p>
             )}
          </div>
        </div>
      </div>
      <div className="p-6 bg-gradient-to-r from-[#FF8946]/10 to-[#FF8946]/5 border-t-2 border-[#FF8946]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#616161] mb-1">Current Buy-Back Value</p>
            <p className="text-3xl font-bold text-[#FF8946]">€{buyBackValue.toLocaleString()}</p>
          </div>
          <button 
            onClick={onGetQuote}
            className="bg-[#3643BA] text-white px-6 py-2 rounded-full text-sm uppercase font-bold hover:bg-[#2a3599] transition-colors shadow-lg shadow-blue-900/10"
          >
            GET QUOTE
          </button>
        </div>
      </div>
    </div>
  );
}