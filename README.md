# TraceRider 🚴‍♂️📱

> **Decathlon Traceability Hackathon 2026**  
> *Theme: How to use traceability for the hyper-personalization of services*

**TraceRider** is a digital asset management dashboard that transforms a bike from a simple product into a connected, value-retaining asset. By leveraging traceability data (EPCIS), we provide hyper-personalized services that extend the product's life and optimize the user's investment.

## 👥 The Team
- **Alex**
- **Hugo**
- **Youssef**
- **Thibault**

---

## 🎯 Project Vision
In the context of Decathlon's sports customers, **TraceRider** answers the question: *How can we use the digital history of a product to offer the right service at the exact right moment?*

Our solution uses a "Digital Twin" approach to:
1.  **Predict Maintenance:** Suggest services based on actual usage (mileage) rather than generic time intervals.
2.  **Optimize Resale:** Calculate real-time "Health Scores" and "Buy-Back Values" to tell the user the financially optimal time to upgrade.
3.  **Personalize Care:** Offer specific DIY tutorials or workshop bookings based on the exact components installed on the bike (tracked via EPC).

## 🌟 Key Features

### 1. 📈 Dynamic Value Timeline
A powerful simulator that lets users visualize their bike's future value.
- **Traceability in action:** Integrates real usage data to project future depreciation.
- **User Benefit:** Helps users understand the cost of ownership and the value of maintenance.

### 2. 🧠 Smart Investment Optimizer
Identify the "Sweet Spot" for resale.
- **Hyper-personalization:** The system alerts the user when their specific bike model, with its specific condition, is at its peak trade-in value relative to upcoming maintenance costs.

### 3. 🔧 Digital Maintenance Ledger
A transparent, immutable history of all services and part replacements.
- **Traceability in action:** Every part replaced is logged (potentially with its own EPC), creating a "V5C" (logbook) for the bike that proves its condition to future buyers.
- **Features:** "DIY" vs "Workshop" toggles, component-specific tutorial links.

### 4. 🔔 Contextual Recommendations
- **Subscription Offers:** Suggest maintenance plans when high-usage patterns are detected.
- **Upgrade Prompts:** Recommend compatible accessories or newer models based on the rider's lifecycle stage.

## 🛠 Tech Stack
- **Frontend:** React + Vite
- **Styling:** Tailwind CSS (Customized for Decathlon's design system)
- **Visualization:** Recharts (Custom value/health charts) & Framer Motion (Animations)
- **Data Source:** Hybrid model using CSV datasets (for the *Van Rysel EDR* profile) and algorithmic simulation (for the *Rockrider XC 900* profile).

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 📂 Project Structure
- `src/components`: UI components including the Simulator, Recommendations engine, and Modals.
- `src/data`: Simulation logic and CSV datasets for the bike profiles.
- `src/photos`: Assets for the bike visualizer.

---
*Created with ❤️ for the 2026 Decathlon Hackathon.*