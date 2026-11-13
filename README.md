# WeldCost – Welding Price & Cost Transparency Platform

> **"Understand the Real Cost Behind Every Weld."**  
> *Know what you're paying for. Help welders charge fairly for their skills, time, tools, electricity, and materials.*

---

## 🛠️ Project Problem & Mission

Welders and welding-machine operators often struggle to make a reasonable profit because customers do not understand why welding work costs a particular amount. Customers may assume that the welder's charge is only for labour and often ask for a much lower price.

**WeldCost** solves this problem by clearly showing customers the **actual tools, materials, commercial electricity tariffs, consumables, machine depreciation, labour, and transportation expenses involved in welding work**.

The goal is to foster transparency and mutual respect between welders and customers through mathematical engineering breakdown models.

---

## 📐 Important Calculation Logic

WeldCost implements a comprehensive, transparent cost calculation engine:

$$\text{Total Estimated Cost} = \text{Material} + \text{Consumables} + \text{Machine Wear} + \text{Electricity} + \text{Labour} + \text{Transport} + \text{Overhead}$$

$$\text{Recommended Customer Price} = \text{Total Operating Cost} + \text{Reasonable Profit Margin}$$

### Mathematical Sub-Formulas:

1. **Machine Cost Per Hour:**
   $$\text{Machine Cost / Hour} = \frac{\text{Machine Purchase Cost}}{\text{Expected Lifespan Hours}} + \frac{\text{Annual Maintenance}}{1500\text{ hrs}}$$

2. **Commercial Electricity Consumption Cost:**
   $$\text{Electricity Cost} = \text{Power Rating (kW)} \times \text{Effective Arc Hours (55\% duty)} \times \text{Commercial Tariff (₹/kWh)}$$

3. **Consumable Cost:**
   $$\text{Consumables} = \sum (\text{Quantity Used} \times \text{Unit Price})$$
   *(Electrodes + MIG wire + Shielding Argon/$\text{CO}_2$ + Cutting discs + Grinding wheels + Flap discs + Anti-spatter)*

4. **Labour Charge:**
   $$\text{Labour Cost} = \text{Labour Hours} \times \text{Artisan Hourly Wage}$$

5. **Transportation Cost:**
   $$\text{Transport Cost} = \text{Distance (km)} \times \text{Vehicle \& Tooling Carriage Rate (₹/km)}$$

---

## 🌟 Key Features & Website Pages

### 1. Home Page
- **Hero Section:** “Understand the Real Cost Behind Every Weld.”
- **Subtitle:** “Know what you're paying for. Help welders charge fairly for their skills, time, tools and materials.”
- **Fast-Nav CTAs:**
  - *Get Welding Cost Estimate*
  - *Explore Welding Tools*
  - *Understand Welding Charges*
  - *Cost Calculator*
- **Live Interactive Mini Simulator:** Real-time feedback for instant price visualization.
- **The Customer's Myth vs. Engineering Reality:** Clear side-by-side contrast cards.

### 2. Welding Cost Calculator (`/calculator`)
- **Inputs:**
  - Type of welding (*Arc / Stick MMA, MIG / MAG Wire, TIG / GTAW Argon, Gas / Oxy-Acetylene*)
  - Welding duration (hours)
  - Number of joints (1 to 60)
  - Material type (*Mild Steel, SS 304, SS 316, Aluminum, Cast Iron, GI, Wrought Iron, Customer-provided*)
  - Material quantity (kg)
  - Electrode / wire quantity
  - Gas usage (litres or kg)
  - Commercial electricity tariff (₹/kWh) & power kW
  - Grinding & cutting wheels count
  - Transportation distance (km)
  - Labour hours & artisan wage rate
- **Transparent Output:**
  ```text
  Material Cost             ₹XXX
  Electrode/Wire Cost       ₹XXX
  Electricity Cost          ₹XXX
  Gas Cost                  ₹XXX
  Grinding/Cutting         ₹XXX
  Machine Usage             ₹XXX
  Labour Cost               ₹XXX
  Transportation            ₹XXX
  Other Expenses            ₹XXX
  --------------------------------
  Estimated Total           ₹XXXX
  Recommended Customer Price: ₹XXXX
  ```
- **Collapsible Formula Inspector:** Explains exactly how every single number was derived.
- **One-click save as official quote.**

### 3. Welding Tools & Equipment Catalog (`/tools`)
- Searchable & filterable directory of 19+ industrial tools:
  - Inverter machines (IGBT 200A–250A)
  - Auto-darkening helmets
  - Split cowhide leather gauntlet gloves
  - Pure copper welding cables & 500A earth clamps
  - High-amperage electrode holders
  - Industrial angle grinders & resinoid abrasive discs
  - MIG torches & contact tips
  - High-pressure Argon & $\text{CO}_2$ cylinders & two-stage flowmeter regulators
  - Steel-toe safety boots & protective aprons
  - Heavy cast-iron welding tables & magnetic corner squares
- For each tool: Purpose, Lifespan, Typical price range (₹), Annual maintenance, Cost per job contribution, and *Why it contributes to welding charges*.
- Clearly marked as **approximate current market estimates**, not fixed universal rates.

### 4. “Why Does Welding Cost So Much?” Educational Page (`/why-does-it-cost`)
- Detailed breakdown of:
  $$\text{Customer Charge} = \text{Labour} + \text{Skill} + \text{Machine} + \text{Electricity} + \text{Consumables} + \text{Materials} + \text{Safety} + \text{Maintenance} + \text{Transport} + \text{Overhead} + \text{Profit}$$
- **“The 1-Hour Illusion” Case Study:** Proves that a 1-hour site visit actually demands 2.5 hours of packing, travel, grinding, surface prep, and tool wear.
- The 6 Invisible Cost Pillars (Semiconductor thermal stress, Commercial tariffs, Consumable erosion, Extreme UV hazards, Fitup & alignment, Life-safety structural liability).

### 5. Welding Service Price Guide (`/price-guide`)
- 10 distinct service categories:
  - Gate welding & main entrance fabrication
  - Window safety grill & balcony enclosure
  - Spiral & straight metal staircase fabrication
  - High-pressure pipe joint & flange welding
  - Bike/vehicle chassis & silencer repair
  - Agricultural equipment & tractor attachment repair
  - Heavy structural I-beam & truss welding
  - Sheet metal enclosure & cabinet welding
  - Industrial loft metal & wood furniture
  - Custom metal art & architectural fabrication
- Realistic estimated price ranges (₹ Min – ₹ Max), typical duration, complexity, and common materials.
- One-click button to generate a quotation based on any service preset.

### 6. Customer Quote Generator (`/quote-generator`)
- Multi-step inquiry wizard collecting job requirements, finishing, location, and urgency.
- Generates official quotation with unique reference ID (e.g. `WC-2026-101`) and 15-day validity.
- **Print / PDF Formatted Output:** Clean printable invoice layout with customer details, itemized engineering breakdown table, and mutual acceptance sign-off block.

### 7. Welder Mode & Dashboard (`/welder-dashboard`)
- Welder-only command center:
  - Configure machine purchase cost and expected working hours.
  - Set local electricity tariff (₹/kWh) and hourly labour wage.
  - Set transport vehicle charge per km and target profit margin %.
  - **Minimum Profitable Price Calculator:** Protects welders from quoting below their true operational break-even floor.
  - **Analytics Metrics:** Total Jobs, Total Revenue, Total Material Cost, Total Consumable Cost, Total Electricity Cost, Total Labour Cost, Estimated Net Profit.
  - **Charts:** Monthly Revenue vs Operating Costs bar progression and Job Types distribution.
  - Saved customer quotations manager with status workflow (*Draft, Sent, Accepted, Completed*).

### 8. Central Administrator Panel (`/admin`)
- Control central platform settings (default electricity rates, suggested labour wages, transport charges).
- Real-time editing of tool prices, consumable unit rates, and service price ranges stored in database without code changes.

### 9. Special Feature: “Why ₹500?” Interactive Cost Explorer
- Interactive component showing exact decomposition for ₹500 (or any customized price):
  - **Labour:** ₹200 (40%)
  - **Electrodes:** ₹60 (12%)
  - **Machine usage & wear:** ₹50 (10%)
  - **Electricity:** ₹40 (8%)
  - **Transportation:** ₹40 (8%)
  - **Grinding wheel:** ₹30 (6%)
  - **Other expenses & safety:** ₹20 (4%)
  - **Net Profit:** ₹60 (12%)
- Debunks the common customer assumption that ₹500 goes entirely into the welder's pocket!

---

## 💻 Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti |
| **Backend** | Python 3.13, FastAPI, Pydantic v2, Uvicorn |
| **Database** | SQLite (Local Dev) / PostgreSQL (Production ready) via SQLAlchemy 2.0 ORM |
| **Authentication** | JWT (PyJWT) + Bcrypt Password Hashing (Role-based: Customer, Welder, Admin) |

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
python -m pip install -r requirements.txt

# Start FastAPI server on port 8000
python run.py
```
The backend starts at `http://127.0.0.1:8000` with interactive Swagger docs at `http://127.0.0.1:8000/docs`.

### 3. Frontend Setup
```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔑 Default Seed Accounts & Credentials

The platform auto-seeds with realistic Indian fabrication data and 3 pre-configured demo accounts:

| Role | Email | Password | Access / Scope |
|---|---|---|---|
| **Master Welder** | `welder@weldcost.com` | `welder123` | Welder Mode Dashboard, Machine rates, Minimum profit engine, Quote manager |
| **Central Admin** | `admin@weldcost.com` | `admin123` | Admin Console, Consumable master prices, Tool catalog, System rates |
| **Customer** | `customer@weldcost.com` | `customer123` | Quote inquiries, Saved personal quotes |

*Note: You can also click the "One-Click Instant Demo Login" buttons on the Sign In page.*

---

## 🛡️ License
Built for educational and commercial fair-trade transparency in welding engineering.

