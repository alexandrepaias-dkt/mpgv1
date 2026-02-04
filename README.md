# TraceRider - Gear Investment & Care Dashboard

**TraceRider** is a high-fidelity prototype for a digital asset management platform focused on the longevity and circularity of sporting equipment. Developed as a hackathon concept for Decathlon, it transforms high-value products like bikes into managed assets with transparent histories.

## Core Philosophy
- **Care for Longevity**: High-resolution maintenance tracking to ensure gear lasts longer.
- **Traceability**: Leveraging Digital Passports (EPCIS) to create a "V5C" for bikes.
- **Investment Optimization**: Helping users understand the real-time value of their gear and the optimal moments to service, upgrade, or trade-in.

## Key Features

### 1. Value Timeline & Simulator
Visualize how maintenance and mileage affect a bike's buy-back value over time. Use the timeline slider to simulate future usage and see the impact on asset health.

### 2. Smart Investment Optimizer
Identify the "Sweet Spot" for resale. The dashboard highlights the optimal window to trade-in your bike to maximize value before heavy depreciation or major service requirements kick in.

### 3. Traceability Alerts
Receive contextual advice based on the asset's lifecycle stage. Whether it's a "Traceability Alert" for a needed service or a recommendation for a subscription plan to lower ownership costs.

### 4. Digital Maintenance Ledger
A comprehensive history of services, parts replaced, and DIY guides. Every action is recorded to boost the bike's "Health Score" and subsequent resale value.

## Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS (Decathlon Design System inspired)
- **Charts**: Recharts (Customized for value/health visualization)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Data Strategy
TraceRider uses a hybrid data approach to power the prototype:
- **Real-world Data**: The `Van Rysel EDR` profile is powered by an embedded CSV dataset containing historical and projected values for a real product.
- **Algorithmic Simulation**: The `Rockrider XC 900` profile demonstrates our simulation engine, calculating depreciation and health scores dynamically based on usage patterns.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

---
*Developed for the 2026 Asset Management Hackathon.*
