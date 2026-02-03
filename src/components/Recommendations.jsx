import React from 'react';
import { ArrowUpRight, Calendar, ArrowRight, TrendingUp, Sparkles, TrendingDown } from 'lucide-react';

export default function Recommendations({ 
  currentMonth, 
  optimalStart, 
  optimalEnd,
  purchasePrice,
  currentValue,
  distance,
  onGetQuote,
  onLearnMore,
  onExplore,
  onTradeIn
}) {
  const isTooSoon = currentMonth < optimalStart;
  const isOptimalWindow = currentMonth >= optimalStart && currentMonth <= optimalEnd;
  const isUpgradePhase = currentMonth > optimalEnd;

  const costPerKm = distance > 0 
    ? ((purchasePrice - currentValue) / distance).toFixed(2)
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Dynamic Main Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#8BABFE]/10 flex items-center justify-center flex-shrink-0">
            <TrendingDown size={20} className="text-[#8BABFE]" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1 text-[#101010]">Investment Optimizer</h3>
            <p className="text-sm text-[#616161]">
              Maximize your bike's value over its lifecycle
            </p>
          </div>
        </div>

        {isTooSoon && (
          <div className="bg-gradient-to-r from-[#8BABFE]/10 to-[#8BABFE]/5 border-2 border-[#8BABFE] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-[#8BABFE]" />
              <h4 className="font-bold text-[#101010]">Early Ownership Phase</h4>
            </div>
            <p className="text-sm text-[#616161] mb-4">
              Your bike is still new! The best selling window starts at <strong>{(optimalStart * 150).toLocaleString()} km</strong>.
              Current value: <strong className="text-[#3643BA]">€{currentValue}</strong>
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white rounded-lg p-3">
                <p className="text-[#616161] mb-1">Value retention</p>
                <p className="font-bold text-[#34B78F] text-lg">{Math.round((currentValue / purchasePrice) * 100)}%</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-[#616161] mb-1">Cost of Ownership</p>
                <p className="font-bold text-[#8BABFE] text-lg">€{costPerKm} / km</p>
              </div>
            </div>
          </div>
        )}

        {isOptimalWindow && (
          <div className="bg-gradient-to-br from-[#34B78F] to-[#2d9d7a] text-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown size={18} />
              <h4 className="font-bold">⭐ Optimal Selling Window - Act Now!</h4>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Your bike maintains excellent value. This is the sweet spot to maximize your return before major service costs.
            </p>
            <div className="bg-white/20 border border-white/30 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Estimated Sale Price:</span>
                <span className="font-bold text-2xl">€{currentValue}</span>
              </div>
              <p className="text-xs opacity-80">Demand is high for this model.</p>
            </div>
            <button 
              onClick={onGetQuote}
              className="w-full bg-white text-[#34B78F] px-6 py-3 rounded-full text-sm uppercase font-bold hover:bg-[#F5F4F5] transition-colors flex items-center justify-center gap-2"
            >
              GET SELLING QUOTE
              <ArrowUpRight size={16} />
            </button>
          </div>
        )}

        {isUpgradePhase && (
          <div className="bg-gradient-to-br from-[#FF8946] to-[#e67835] text-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight size={18} />
              <h4 className="font-bold">Time to Upgrade - Trade-In Opportunity</h4>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Your bike has served you well! Consider upgrading to unlock better performance. Trade-in value maximizes your investment.
            </p>
            <div className="bg-white/20 border border-white/30 rounded-lg p-4 mb-4">
              <p className="text-sm mb-3">
                <strong>Trade-in Deal:</strong> Van Rysel RCR Pro Carbon
              </p>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Your bike trade-in:</span>
                <span className="font-bold">€{currentValue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Upgrade for only:</span>
                <span className="font-bold text-2xl">€{4200 - currentValue}</span>
              </div>
            </div>
            <button 
              onClick={onTradeIn}
              className="w-full bg-white text-[#FF8946] px-6 py-3 rounded-full text-sm uppercase font-bold hover:bg-[#F5F4F5] transition-colors"
            >
              EXPLORE TRADE-IN
            </button>
          </div>
        )}
      </div>

      {/* Secondary Service Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Maintenance Subscription */}
        <div className="bg-gradient-to-br from-[#3643BA] to-[#2a3599] text-white rounded-xl shadow-sm p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Cyclist Pro Plan</h3>
              <p className="text-sm opacity-90">Personalized maintenance</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2">You ride <strong>{Math.round(distance/36)} km/month</strong>.</p>
            <p className="text-lg">
              Save <strong className="text-[#7AFFA6]">€15/mo</strong> with our plan.
            </p>
          </div>
          <button 
            onClick={onLearnMore}
            className="w-full bg-white text-[#3643BA] px-6 py-3 rounded-full text-sm uppercase font-bold hover:bg-[#F5F4F5] transition-colors"
          >
            LEARN MORE
          </button>
        </div>

        {/* Upgrade Path */}
        <div className="bg-white border-2 border-[#FF8946] rounded-xl shadow-sm p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FF8946]/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp size={20} className="text-[#FF8946]" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 text-[#101010]">Upgrades</h3>
              <p className="text-sm text-[#616161]">Boost performance</p>
            </div>
          </div>
          <div className="mb-4">
             <p className="text-sm text-[#616161] mb-2">
              Ready for <strong>Carbon Wheels</strong>?
            </p>
            <p className="text-lg text-[#101010]">
              Only <strong className="text-[#FF8946]">€800</strong>
            </p>
          </div>
          <button 
            onClick={onExplore}
            className="w-full bg-[#FF8946] text-white px-6 py-3 rounded-full text-sm uppercase font-bold hover:bg-[#e67835] transition-colors"
          >
            EXPLORE
          </button>
        </div>
      </div>

    </div>
  );
}