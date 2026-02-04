import React from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function ExploreModal({ isOpen, onClose, type = 'accessories' }) {
  if (!isOpen) return null;

  const content = {
    accessories: {
      title: "Recommended Upgrades",
      products: [
        { name: "Carbon Wheels Set", price: "€800", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=200", tag: "Best Match", link: "https://www.decathlon.fr/p/paire-de-roues-carbone-vr-35-tubeless-a-disc-compatible-shimano-hg/_/R-p-361347?mc=8930433&c=noir&gad_campaignid=16508981681&gad_source=1&gbraid=0AAAAADonRCa4_pHN_mcX_Sshy1bNo1D_P&gclid=Cj0KCQiA-YvMBhDtARIsAHZuUzIqIMK-9jxhsvKPapDdb_bWgpc5j3Iu1jePQIWcDq0R1hdOvJyDMkIaAoGHEALw_wcB&utm_campaign=fr_ct-shopp_t-perf_260120-aw_ts-bra_f-cv_o-roas_spu-cy_pt-pb_xx-shopping-mq-cycling-mp_&utm_id=16508981681-197586730011&utm_medium=sea&utm_source=google" },
        { name: "Aero Handlebars", price: "€250", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=200", tag: "Performance", link: "https://www.decathlon.fr/p/mp/vision/seconde-vie-cintre-vision-trimax-carbone-4d-di2-31-8mm-400mm/_/R-p-c0940626-5e47-4ddc-bff6-e2c694bdccb9?mc=c0940626-5e47-4ddc-bff6-e2c694bdccb9_c1" },
        { name: "Ceramic Bearings", price: "€125", image: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&q=80&w=200", tag: "Efficiency", link: "https://www.decathlon.fr/p/mp/black-bearing/boitier-de-pedalier-black-bearing-skf/_/R-p-5b6567d0-8300-4619-8ce9-aece645cf9c6?mc=5b6567d0-8300-4619-8ce9-aece645cf9c6_c1&c=noir" }
      ]
    },
    bikes: {
      title: "Trade-in Opportunities",
      products: [
        { name: "Shimano 105 Di2 12V", price: "€4,500", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=200", tag: "Pro Level", link: "https://www.decathlon.fr/p/velo-de-route-shimano-105-di2-12v-capteur-de-puissance-rcr-f-pro-violet/_/R-p-356546?mc=8916105" },
        { name: "Allroad SRAM APEX AXS", price: "€2,400", image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=200", tag: "Versatile" , link: "https://www.decathlon.fr/p/velo-de-route-endurance-allroad-sram-apex-axs-1x12v-ncr-cf-jaune-serie-limitee/_/R-p-351356?mc=8967847&c=vert&gad_campaignid=16508981681&gad_source=1&gbraid=0AAAAADonRCa4_pHN_mcX_Sshy1bNo1D_P&gclid=Cj0KCQiA-YvMBhDtARIsAHZuUzLAHjjTp6fU7SoNmW6ZgNR4ofVqpYm1ztr81eCVPouHEq1U8m6QxrYaAl_CEALw_wcB&utm_campaign=fr_ct-shopp_t-perf_260120-aw_ts-bra_f-cv_o-roas_spu-cy_pt-pb_xx-shopping-mq-cycling-mp_&utm_id=16508981681-197586730931&utm_medium=sea&utm_source=google" },
        { name: "Shimano Tiagra 2x10V", price: "€1,200", image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=200", tag: "Endurance" , link: "https://www.decathlon.fr/p/velo-route-endurance-shimano-tiagra-2x10v-ncr-af-vert/_/R-p-336600?mc=8668512&c=gris&gad_campaignid=16508981681&gad_source=1&gbraid=0AAAAADonRCa4_pHN_mcX_Sshy1bNo1D_P&gclid=Cj0KCQiA-YvMBhDtARIsAHZuUzJliMYIY_BZ5gSBmYQhg8UKaJBAaqY8zMEilBB36CpftVorSA2DSVYaArVMEALw_wcB&utm_campaign=fr_ct-shopp_t-perf_260120-aw_ts-bra_f-cv_o-roas_spu-cy_pt-pb_xx-shopping-mq-cycling-mp_&utm_id=16508981681-197586730931&utm_medium=sea&utm_source=google"  }
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
                {product.link ? (
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-left text-xs font-bold text-gray-400 mt-2 group-hover:text-[#FF8946] flex items-center gap-1">
                    {type === 'bikes' ? 'Configure Trade-in' : 'View Details'} <ArrowRight size={12} />
                  </a>
                ) : (
                  <button className="text-left text-xs font-bold text-gray-400 mt-2 group-hover:text-[#FF8946] flex items-center gap-1">
                    {type === 'bikes' ? 'Configure Trade-in' : 'View Details'} <ArrowRight size={12} />
                  </button>
                )}
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