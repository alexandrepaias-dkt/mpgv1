import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import InvestmentOptimizer from './components/InvestmentOptimizer';
import Recommendations from './components/Recommendations';
import MaintenanceHistory from './components/MaintenanceHistory';
import BikeHero from './components/BikeHero';
import BookingModal from './components/BookingModal';
import QuoteModal from './components/QuoteModal';
import SubscriptionModal from './components/SubscriptionModal';
import ExploreModal from './components/ExploreModal';
import TimelineControl from './components/TimelineControl';
import { DATASET } from './data/simulationData';

export default function App() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(12); // Start at index 12 (approx 1 year in)
  
  // Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [exploreType, setExploreType] = useState('accessories');
  const [selectedService, setSelectedService] = useState(null);
  
  // Bike Context (Simulating multiple bike profiles)
  const [currentBikeIndex, setCurrentBikeIndex] = useState(0);
  
  const BIKES = [
    {
      name: "Van Rysel EDR CF Ultegra", // Visual name (Dataset is LD 940E)
      epc: "30395DFA8210100000000F7A", // Updated to match CSV
      image: "https://images.unsplash.com/photo-1764067521927-9fc70adc5a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwYmlrZSUyMHByb2Zlc3Npb25hbCUyMGN5Y2xpbmd8ZW58MXx8fHwxNzcwMDQyMDAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      purchasePrice: 2799, // Updated to match CSV first_sale_price
      schedule: [
        { 
          id: 1, 
          service: "Initial Safety Check", 
          mileage: 500, 
          valueImpact: 0, 
          diyDetails: { parts: [{ name: "None", price: "€0" }], tutorial: "Basic Safety Inspection Guide" },
          replacedComponents: [] 
        },
        { 
          id: 2, 
          service: "Chain Wear Assessment", 
          mileage: 1500, 
          valueImpact: 50, 
          diyDetails: { parts: [{ name: "Chain Checker Tool", price: "€12" }], tutorial: "How to Measure Chain Wear" },
          replacedComponents: [
            { name: "Shimano Ultegra Chain 11s", epc: "3039606203C36C8000000001", tutorialUrl: "https://youtu.be/some_chain_guide" }
          ]
        },
        { 
          id: 3, 
          service: "Brake Caliper Inspection", 
          mileage: 3000, 
          valueImpact: 120, 
          diyDetails: { parts: [{ name: "Brake Pads (Pair)", price: "€25" }, { name: "Bleed Kit", price: "€35" }], tutorial: "Hydraulic Disc Brake Service" },
          replacedComponents: [
            { name: "Brake Pads L03A", epc: null }
          ]
        },
        { id: 4, service: "Full Drivetrain Service", mileage: 6000, valueImpact: 150, diyDetails: { parts: [{ name: "Cassette", price: "€85" }, { name: "Chain", price: "€45" }, { name: "Degreaser", price: "€15" }], tutorial: "Complete Drivetrain Overhaul" } },
        { id: 5, service: "Wheel Truing & Tension", mileage: 10000, valueImpact: 60, diyDetails: { parts: [{ name: "Spoke Key", price: "€8" }], tutorial: "Advanced Wheel Truing" } },
        { id: 6, service: "Bottom Bracket Service", mileage: 15000, valueImpact: 80, diyDetails: { parts: [{ name: "BB Tool", price: "€20" }, { name: "Grease", price: "€12" }], tutorial: "Bottom Bracket Maintenance" } },
        { id: 7, service: "Complete Bearing Overhaul", mileage: 20000, valueImpact: 200, diyDetails: { parts: [{ name: "Bearing Set", price: "€120" }], tutorial: "Full Bike Bearing Service" } }
      ]
    },
    {
      name: "Rockrider XC 900",
      epc: "30395DFA8210100000000FFF", 
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1080", 
      purchasePrice: 1800,
      schedule: [
        { id: 1, service: "Suspension Fork Setup", mileage: 300, valueImpact: 0, diyDetails: { parts: [{ name: "Shock Pump", price: "€25" }], tutorial: "Setting Sag and Rebound" } },
        { id: 2, service: "Tubeless Sealant Top-up", mileage: 800, valueImpact: 30, diyDetails: { parts: [{ name: "Sealant (100ml)", price: "€15" }], tutorial: "Tubeless Maintenance" } },
        { 
          id: 3, 
          service: "Fork Lower Leg Service", 
          mileage: 2500, 
          valueImpact: 150, 
          diyDetails: { parts: [{ name: "Seal Kit", price: "€40" }, { name: "Fork Oil", price: "€20" }], tutorial: "50h Fork Service" },
          replacedComponents: [
            { name: "Fork Seals 32mm", epc: "3039606203C36C8000000002", tutorialUrl: "https://youtu.be/fork_service" }
          ]
        },
        { id: 4, service: "Pivot Bearing Check", mileage: 5000, valueImpact: 200, diyDetails: { parts: [{ name: "Bearing Kit", price: "€60" }], tutorial: "Suspension Linkage Service" } },
        { id: 5, service: "Drivetrain Deep Clean", mileage: 10000, valueImpact: 100, diyDetails: { parts: [{ name: "Chain", price: "€45" }], tutorial: "MTB Drivetrain Care" } },
        { id: 6, service: "Full Suspension Service", mileage: 15000, valueImpact: 300, diyDetails: { parts: [{ name: "Seal Kit", price: "€80" }], tutorial: "200h Suspension Service" } },
        { id: 7, service: "Hub & BB Bearing Service", mileage: 20000, valueImpact: 150, diyDetails: { parts: [{ name: "Bearing Kit", price: "€50" }], tutorial: "MTB Bearing Overhaul" } }
      ]
    }
  ];

  const currentBike = BIKES[currentBikeIndex];
  const isCsvBike = currentBikeIndex === 0;

  // User Context
  const USER_NAME = "Thomas";
  const OPTIMAL_START_MONTH = 18;
  const OPTIMAL_END_MONTH = 24;

  // Derive values based on whether we are using the CSV bike or the simulated one
  const { currentDistance, monthlyDistance, buyBackValue, healthScore, productionDate, optimalSellStart, optimalSellEnd } = useMemo(() => {
    if (isCsvBike) {
      // Use CSV Data
      const data = (DATASET && DATASET.length > 0) ? DATASET[currentMonthIndex] : null;
      
      if (!data) {
        return {
          currentDistance: 0,
          monthlyDistance: 0,
          buyBackValue: 0,
          healthScore: 0,
          productionDate: "2023-10-25",
          optimalSellStart: 14000,
          optimalSellEnd: 17500
        };
      }

      return {
        currentDistance: data.total_milage,
        monthlyDistance: data.monthly_milage,
        buyBackValue: data.second_hand_price,
        healthScore: data.health_score,
        productionDate: data.production_date,
        optimalSellStart: data.low_optimal_resale_milage,
        optimalSellEnd: data.high_optimal_resale_milage
      };
    } else {
      // Use Legacy Simulation Logic (for Rockrider)
      const months = currentMonthIndex; // Approximation: index = month
      const dist = Math.round((months / 36) * 5000);
      const baseValue = currentBike.purchasePrice;
      const kmDepreciation = dist * (currentBike.purchasePrice / 12500); 
      const ageDepreciation = months * (currentBike.purchasePrice / 125);
      const val = Math.max(500, Math.round(baseValue - kmDepreciation - ageDepreciation));
      const score = Math.max(50, Math.min(100, Math.round(100 - (dist / 100))));
      
      return {
        currentDistance: dist,
        monthlyDistance: Math.round(5000 / 36),
        buyBackValue: val,
        healthScore: score,
        productionDate: "2024-01-15",
        optimalSellStart: 14000,
        optimalSellEnd: 17500
      };
    }
  }, [currentMonthIndex, currentBikeIndex, currentBike]);

  // Computed Maintenance History
  const calculatedHistory = useMemo(() => {
    let foundNext = false;
    
    return currentBike.schedule.map(item => {
      let status = 'future';
      if (currentDistance >= item.mileage) {
        status = 'completed';
      } else if (!foundNext) {
        status = 'upcoming'; 
        foundNext = true;
      }

      return {
        ...item,
        status: status,
      };
    });
  }, [currentDistance, currentBike]);

  const handleBookService = (serviceItem) => {
    setSelectedService(serviceItem.service);
    setBookingModalOpen(true);
  };

  const handleOpenExplore = (type) => {
    setExploreType(type);
    setExploreModalOpen(true);
  };

  const availableEpcs = BIKES.map(b => b.epc);

  const handleEpcSelect = (epc) => {
    const index = BIKES.findIndex(b => b.epc === epc);
    if (index !== -1) {
      setCurrentBikeIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F5] text-[#101010] font-sans pb-12 transition-colors duration-500">
      <Header 
        userName={USER_NAME} 
        epcId={currentBike.epc} 
        availableEpcs={availableEpcs}
        onEpcSelect={handleEpcSelect}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Hero Section */}
        <BikeHero
          productName={currentBike.name}
          epcId={currentBike.epc}
          productionDate={isCsvBike && DATASET && DATASET.length > 0 ? DATASET[currentMonthIndex]?.production_date : "2024-01-15"}
          purchaseDate={isCsvBike ? "October 25, 2023" : "January 15, 2024"} // CSV Production Date vs Default
          buyBackValue={buyBackValue}
          imageUrl={currentBike.image}
          onGetQuote={() => setQuoteModalOpen(true)}
        />

        {/* Timeline Control */}
        <TimelineControl 
          currentIndex={currentMonthIndex}
          maxIndex={DATASET ? DATASET.length - 1 : 36}
          onIndexChange={setCurrentMonthIndex}
          currentDate={DATASET && DATASET[currentMonthIndex] ? DATASET[currentMonthIndex].date : new Date().toISOString()}
          startDate={DATASET && DATASET[0] ? DATASET[0].date : "2024-01-01"}
          endDate={DATASET && DATASET.length > 0 ? DATASET[DATASET.length - 1].date : "2026-12-01"}
        />

        {/* Investment Optimizer - Full Width */}
        <InvestmentOptimizer 
          currentKm={currentDistance} 
          healthScore={healthScore}
          maxKm={20000} 
          optimalSellStart={optimalSellStart}
          optimalSellEnd={optimalSellEnd}
        />


        {/* Recommendations */}
        <div className="grid grid-cols-1 gap-6">
           <Recommendations 
              currentKm={currentDistance}
              monthlyDistance={monthlyDistance}
              optimalSellStartKm={optimalSellStart}
              optimalSellEndKm={optimalSellEnd}
              purchasePrice={currentBike.purchasePrice}
              currentValue={buyBackValue}
              distance={currentDistance}
              onGetQuote={() => setQuoteModalOpen(true)}
              onLearnMore={() => setSubscriptionModalOpen(true)}
              onExplore={() => handleOpenExplore('accessories')}
              onTradeIn={() => handleOpenExplore('bikes')}
            />
        </div>

        {/* Maintenance History */}
        <section className="space-y-6">
           {/* Timeline Control Copy */}
           <TimelineControl 
             currentIndex={currentMonthIndex}
             maxIndex={DATASET ? DATASET.length - 1 : 36}
             onIndexChange={setCurrentMonthIndex}
             currentDate={DATASET && DATASET[currentMonthIndex] ? DATASET[currentMonthIndex].date : new Date().toISOString()}
             startDate={DATASET && DATASET[0] ? DATASET[0].date : "2024-01-01"}
             endDate={DATASET && DATASET.length > 0 ? DATASET[DATASET.length - 1].date : "2026-12-01"}
           />

           <MaintenanceHistory 
             history={calculatedHistory}
             onBookService={(item) => handleBookService(item)}
           />
        </section>

      </main>
      
      <footer className="bg-[#949494] text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-80 font-mono">
           <p className="font-bold uppercase tracking-tight text-base opacity-100">DECATHLON</p>
           <p>EPCIS ID: {currentBike.epc}</p>
        </div>
      </footer>

      {/* Modals */}
      <BookingModal 
        isOpen={bookingModalOpen} 
        onClose={() => setBookingModalOpen(false)} 
        serviceName={selectedService} 
      />
      <QuoteModal 
        isOpen={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        productName={currentBike.name} 
        estimatedValue={buyBackValue} 
      />
      <SubscriptionModal 
        isOpen={subscriptionModalOpen} 
        onClose={() => setSubscriptionModalOpen(false)} 
        savings="€180/year" 
      />
      <ExploreModal 
        isOpen={exploreModalOpen} 
        onClose={() => setExploreModalOpen(false)} 
        type={exploreType} 
      />
    </div>
  );
}
