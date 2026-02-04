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
            { name: "Shimano Ultegra Chain 11s", epc: "30395DFA8181C440000139D4", tutorialUrl: "https://youtu.be/some_chain_guide" }
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
  const isCsvBike = currentBikeIndex === 0; // In this prototype, only the first bike uses CSV

  // Filter dataset for the current bike
  const currentBikeData = useMemo(() => {
    if (!DATASET) return [];
    
    // 1. Filter by EPC
    const rawData = DATASET.filter(d => d.epc === currentBike.epc);
    
    if (rawData.length === 0) return [];

    // 2. Check if we need to inject a "Start" point (0 km)
    // The CSV might start at Jan 1st with 300km already on the clock.
    const firstRecord = rawData[0];
    
    // Ensure we don't duplicate if it already exists (unlikely given the analysis)
    if (firstRecord.total_milage > 0 && firstRecord.production_date) {
      const syntheticStart = {
        ...firstRecord,
        date: firstRecord.production_date, // Start at production/purchase
        total_milage: 0,
        monthly_milage: 0,
        health_score: 100,
        second_hand_price: firstRecord.first_sale_price,
        maintenance_count: 0
      };
      return [syntheticStart, ...rawData];
    }

    return rawData;
  }, [currentBike.epc]);

  // Reset or adjust index when bike changes to avoid out-of-bounds
  React.useEffect(() => {
    setCurrentMonthIndex(0);
  }, [currentBikeIndex]);

  // User Context
  const USER_NAME = "Thomas";
  const OPTIMAL_START_MONTH = 18;
  const OPTIMAL_END_MONTH = 24;

  // Derive values based on whether we are using the CSV bike or the simulated one
  const { currentDistance, monthlyDistance, buyBackValue, healthScore, productionDate, optimalSellStart, optimalSellEnd, ownershipChangeKm, dates } = useMemo(() => {
    const isAvailableInCsv = currentBikeData.length > 0;
    
    if (isAvailableInCsv) {
      const data = currentBikeData[currentMonthIndex] || currentBikeData[0];
      
      // Calculate ownership change mileage
      let changeKm = null;
      for (let i = 1; i < currentBikeData.length; i++) {
        if (currentBikeData[i].owner_number > currentBikeData[i-1].owner_number) {
          changeKm = currentBikeData[i].total_milage;
          break;
        }
      }

      return {
        currentDistance: data.total_milage,
        monthlyDistance: data.monthly_milage,
        buyBackValue: data.second_hand_price,
        healthScore: data.health_score,
        productionDate: data.production_date,
        optimalSellStart: data.low_optimal_resale_milage,
        optimalSellEnd: data.high_optimal_resale_milage,
        ownershipChangeKm: changeKm,
        dates: currentBikeData.map(d => d.date)
      };
    } else {
      // Simulation Mode (for Rockrider)
      const totalMonths = 36;
      const simDates = Array.from({ length: totalMonths }).map((_, i) => {
        const d = new Date("2024-01-01");
        d.setMonth(d.getMonth() + i);
        return d.toISOString();
      });

      const months = currentMonthIndex;
      const dist = Math.round((months / totalMonths) * 5000);
      const baseValue = currentBike.purchasePrice;
      const kmDepreciation = dist * (currentBike.purchasePrice / 12500); 
      const ageDepreciation = months * (currentBike.purchasePrice / 125);
      const val = Math.max(500, Math.round(baseValue - kmDepreciation - ageDepreciation));
      const score = Math.max(50, Math.min(100, Math.round(100 - (dist / 100))));
      
      // Calculate mileage for August 2024 (index 7) for simulated ownership change
      const changeKm = Math.round((7 / totalMonths) * 5000);

      return {
        currentDistance: dist,
        monthlyDistance: Math.round(5000 / totalMonths),
        buyBackValue: val,
        healthScore: score,
        productionDate: "2024-01-15",
        optimalSellStart: 2500, // Reasonable for MTB
        optimalSellEnd: 4000,
        ownershipChangeKm: changeKm,
        dates: simDates
      };
    }
  }, [currentMonthIndex, currentBikeIndex, currentBike, currentBikeData]);

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

  const timelineMaxIndex = dates.length - 1;

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
          productionDate={productionDate}
          purchaseDate={currentBikeIndex === 0 ? "October 25, 2023" : "January 15, 2024"} 
          buyBackValue={buyBackValue}
          imageUrl={currentBike.image}
          onGetQuote={() => setQuoteModalOpen(true)}
        />

        {/* Timeline Control */}
        <TimelineControl 
          currentIndex={currentMonthIndex}
          maxIndex={timelineMaxIndex}
          onIndexChange={setCurrentMonthIndex}
          currentDate={dates[currentMonthIndex]}
          startDate={dates[0]}
          endDate={dates[timelineMaxIndex]}
        />

        {/* Investment Optimizer - Full Width */}
        <InvestmentOptimizer 
          currentKm={currentDistance} 
          healthScore={healthScore}
          maxKm={currentBikeIndex === 0 ? 20000 : 8000} // Custom scale for MTB
          optimalSellStart={optimalSellStart}
          optimalSellEnd={optimalSellEnd}
          ownershipChangeKm={ownershipChangeKm}
          serviceHistory={calculatedHistory}
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
           {/* Timeline Control Sync */}
           <TimelineControl 
             currentIndex={currentMonthIndex}
             maxIndex={timelineMaxIndex}
             onIndexChange={setCurrentMonthIndex}
             currentDate={dates[currentMonthIndex]}
             startDate={dates[0]}
             endDate={dates[timelineMaxIndex]}
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
