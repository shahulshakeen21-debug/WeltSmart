import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calculator, 
  Wrench, 
  HelpCircle, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Cpu,
  Layers,
  Clock,
  ShieldCheck,
  Scale
} from "lucide-react";
import Why500Section from "../components/Why500Section";

export default function Home() {
  const [miniWeldingType, setMiniWeldingType] = useState("Arc welding");
  const [miniHours, setMiniHours] = useState(2.5);
  const [miniJoints, setMiniJoints] = useState(8);

  // Live calculation model matching cost_engine.py
  const teaserMachineCost = Math.round(miniHours * 25);
  const teaserPowerCost = Math.round(miniHours * 4.5 * 0.55 * 9.5);
  const teaserConsumables = Math.round(miniJoints * 15 + 90);
  const teaserLabour = Math.round(miniHours * 250);
  const teaserTotal = teaserMachineCost + teaserPowerCost + teaserConsumables + teaserLabour + 80;
  const teaserPrice = Math.round(teaserTotal * 1.22);

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-200">
      
      {/* Hero Section: Technical Product Introduction */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-industrial-800 tech-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Product Positioning */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-industrial-900 border border-industrial-750 text-industrial-400 font-mono text-[11px] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-forge-500"></span>
                <span>Industrial Fabrication & Cost Modeling Suite</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Understand the Real Cost <br className="hidden sm:inline" />
                Behind Every Weld.
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 max-w-2xl leading-relaxed">
                Know what you're paying for. WeldCost itemizes equipment depreciation, commercial electricity tariffs, consumable rod depletion, and skilled artisan labour to establish fair fabrication pricing.
              </p>

              {/* Functional CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/calculator"
                  className="px-5 py-2.5 rounded-sm bg-forge-600 hover:bg-forge-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Launch Cost Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/tools"
                  className="px-4 py-2.5 rounded-sm bg-industrial-900 hover:bg-industrial-850 text-industrial-300 hover:text-white border border-industrial-750 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <Wrench className="w-3.5 h-3.5 text-industrial-400" />
                  <span>Equipment Catalog</span>
                </Link>

                <Link
                  to="/why-does-it-cost"
                  className="px-4 py-2.5 rounded-sm bg-industrial-900 hover:bg-industrial-850 text-industrial-300 hover:text-white border border-industrial-750 font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-industrial-400" />
                  <span>Why It Costs?</span>
                </Link>
              </div>

              {/* Technical System Status Strip */}
              <div className="pt-6 border-t border-industrial-800 grid grid-cols-3 gap-4 max-w-lg text-left font-mono">
                <div>
                  <div className="text-[10px] text-industrial-500 uppercase">CALCULATION MODEL</div>
                  <div className="text-sm font-bold text-white mt-0.5">BOM + Overhead</div>
                </div>
                <div>
                  <div className="text-[10px] text-industrial-500 uppercase">RATE REGISTRY</div>
                  <div className="text-sm font-bold text-white mt-0.5">Commercial 2026</div>
                </div>
                <div>
                  <div className="text-[10px] text-industrial-500 uppercase">DEPRECIATION</div>
                  <div className="text-sm font-bold text-forge-400 mt-0.5">Amortized / hr</div>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Parameter Console */}
            <div className="lg:col-span-5">
              <div className="bg-industrial-900 border border-industrial-750 rounded-sm overflow-hidden shadow-panel">
                
                {/* Console Top Bar */}
                <div className="bg-industrial-850 px-4 py-2.5 border-b border-industrial-750 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-xs bg-forge-500"></span>
                    <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                      PARAMETER SIMULATOR // FAST AUDIT
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-industrial-400">
                    REALTIME
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Process Selector */}
                  <div>
                    <label className="text-[11px] font-mono font-semibold text-industrial-400 uppercase tracking-wider block mb-1.5">
                      Process Type
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
                      {["Arc welding", "MIG welding", "TIG welding", "Gas welding"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setMiniWeldingType(type)}
                          className={`py-1.5 px-2.5 rounded-xs border text-left transition-colors ${
                            miniWeldingType === type
                              ? "bg-industrial-800 border-forge-500/70 text-white font-bold"
                              : "bg-industrial-950 border-industrial-800 text-industrial-400 hover:text-industrial-300"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-industrial-400">Duration (Active Arc + Setup):</span>
                        <span className="font-bold text-white">{miniHours} hrs</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="10"
                        step="0.5"
                        value={miniHours}
                        onChange={(e) => setMiniHours(parseFloat(e.target.value))}
                        className="w-full accent-forge-500 cursor-pointer h-1 bg-industrial-800"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-industrial-400">Welded Joints Count:</span>
                        <span className="font-bold text-white">{miniJoints} joints</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="40"
                        step="1"
                        value={miniJoints}
                        onChange={(e) => setMiniJoints(parseInt(e.target.value))}
                        className="w-full accent-forge-500 cursor-pointer h-1 bg-industrial-800"
                      />
                    </div>
                  </div>

                  {/* Ledger Summary Box */}
                  <div className="bg-industrial-950 border border-industrial-800 rounded-xs p-3 font-mono text-xs space-y-1.5">
                    <div className="flex justify-between text-industrial-400">
                      <span>Machine Tool Wear & Power:</span>
                      <span className="text-industrial-200">₹{teaserMachineCost + teaserPowerCost}</span>
                    </div>
                    <div className="flex justify-between text-industrial-400">
                      <span>Filler Rods & Discs:</span>
                      <span className="text-industrial-200">₹{teaserConsumables}</span>
                    </div>
                    <div className="flex justify-between text-industrial-400">
                      <span>Labour ({miniHours}h skilled):</span>
                      <span className="text-industrial-200">₹{teaserLabour}</span>
                    </div>
                    <div className="flex justify-between text-industrial-400">
                      <span>Haulage & Safety Wear:</span>
                      <span className="text-industrial-200">₹80</span>
                    </div>
                    <div className="pt-2 border-t border-industrial-800 flex justify-between font-sans text-xs">
                      <span className="font-bold text-white">Recommended Invoice Floor:</span>
                      <span className="text-base font-bold text-forge-400 font-mono">
                        ₹{teaserPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    to="/calculator"
                    className="w-full py-2 bg-industrial-850 hover:bg-industrial-800 text-industrial-200 hover:text-white border border-industrial-750 font-mono font-semibold text-xs rounded-xs text-center block transition-colors uppercase tracking-wider"
                  >
                    Open Full Multi-Variable Calculator →
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Technical Contrast: Market Misconception vs Engineering Reality */}
      <section className="py-16 bg-industrial-900 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-1 text-[10px] font-mono uppercase font-bold text-industrial-400">
              <span className="w-1.5 h-1.5 bg-industrial-500 rounded-xs"></span>
              <span>Module 02 // Pricing Disconnect Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Fabrication Quotes Are Frequently Misunderstood
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-industrial-400 leading-relaxed">
              When clients perceive a welding charge as solely payment for physical time, they omit the industrial machinery operating on their behalf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: The Informal Perception */}
            <div className="bg-industrial-950 border border-industrial-750 rounded-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-industrial-400 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4 text-industrial-500" />
                <span>The Informal Client Assumption</span>
              </div>
              
              <h3 className="text-base font-bold text-white">
                "The welder only spent 45 minutes on site, so a ₹500 invoice is unreasonable."
              </h3>

              <div className="space-y-2 text-xs text-industrial-400">
                <p className="border-l border-industrial-800 pl-3">
                  • Assumes 100% of the invoice is cash profit kept by the operator.
                </p>
                <p className="border-l border-industrial-800 pl-3">
                  • Omits capital depreciation of ₹25,000–₹40,000 IGBT power inverters.
                </p>
                <p className="border-l border-industrial-800 pl-3">
                  • Overlooks commercial electricity tariffs and rapid abrasive disc erosion.
                </p>
                <p className="border-l border-industrial-800 pl-3">
                  • Ignores physical hazards, UV eye radiation exposure, and travel logistics.
                </p>
              </div>

              <div className="pt-3 border-t border-industrial-800 font-mono text-[11px] text-industrial-500">
                OUTCOME: Fabricators operate near zero-margin and fail to maintain capital assets.
              </div>
            </div>

            {/* Right: The Engineering Cost Model */}
            <div className="bg-industrial-950 border border-industrial-750 rounded-sm p-6 space-y-4">
              <div className="flex items-center gap-2 text-forge-400 font-mono text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4 text-forge-400" />
                <span>The WeldCost Engineering Framework</span>
              </div>

              <h3 className="text-base font-bold text-white font-mono">
                Invoice = Material + Consumables + Machine + Power + Labour + Margin
              </h3>

              <div className="space-y-2 text-xs text-industrial-300">
                <p className="border-l border-forge-500/40 pl-3">
                  • <strong className="text-white">Consumable Depletion:</strong> Electrodes, wires, and abrasive cutting wheels physically disintegrate into the seam.
                </p>
                <p className="border-l border-forge-500/40 pl-3">
                  • <strong className="text-white">Machine Amortization:</strong> High-amperage duty cycles wear semiconductor switches and transformers.
                </p>
                <p className="border-l border-forge-500/40 pl-3">
                  • <strong className="text-white">Commercial Tariff Draw:</strong> 200 Amperes drawn at high voltages incurs documented kilowatt utility charges.
                </p>
                <p className="border-l border-forge-500/40 pl-3">
                  • <strong className="text-white">Skilled Artisan Wage:</strong> Rewarding certified penetration, joint alignment, and structural stability.
                </p>
              </div>

              <div className="pt-3 border-t border-industrial-800 font-mono text-[11px] text-emerald-400">
                OUTCOME: Transparent estimates, mutual trust, and sustainable fabrication.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 3: "Why ₹500?" Interactive Cost Decomposition Section */}
      <Why500Section />

      {/* Section 4: Service Benchmarks Catalog */}
      <section className="py-16 bg-industrial-900 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1 text-[10px] font-mono uppercase font-bold text-industrial-400">
                <span className="w-1.5 h-1.5 bg-industrial-500 rounded-xs"></span>
                <span>Module 05 // Reference Price Index</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Standard Welding Service Price Directory
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-industrial-400 max-w-2xl">
                Benchmark price ranges derived from verified industrial workshop rates across common fabrication disciplines.
              </p>
            </div>

            <Link
              to="/price-guide"
              className="px-3.5 py-1.5 rounded-sm bg-industrial-800 hover:bg-industrial-750 text-industrial-200 border border-industrial-700 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors self-start md:self-auto"
            >
              <span>View All 10 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Gate & Main Entrance Portals",
                range: "₹2,500 – ₹12,000",
                duration: "6 Hours",
                type: "Arc / MMA",
                desc: "Driveway swing and sliding gate fabrication with heavy pivot hinges and lock boxes."
              },
              {
                title: "Window Safety Grills & Railings",
                range: "₹1,500 – ₹6,500",
                duration: "4 Hours",
                type: "Arc / Stick",
                desc: "Square bar and hollow section window child safety enclosures and anti-rust prep."
              },
              {
                title: "Motorcycle Chassis & Silencer Fixes",
                range: "₹300 – ₹2,200",
                duration: "1.5 Hours",
                type: "MIG / CO2",
                desc: "Subframe cracks, broken footpeg brackets, exhaust silencer rust hole repair."
              },
              {
                title: "Spiral & Straight Metal Staircases",
                range: "₹8,000 – ₹35,000",
                duration: "14 Hours",
                type: "Heavy Arc",
                desc: "Structural channel stringers, chequered tread plates, and safety handrails."
              },
              {
                title: "High-Pressure Pipe & Flange Welding",
                range: "₹2,200 – ₹9,500",
                duration: "5 Hours",
                type: "TIG / GTAW",
                desc: "Full penetration root pass and capping for hydraulic, steam, and gas lines."
              },
              {
                title: "Architectural Loft Metal Furniture",
                range: "₹2,000 – ₹8,500",
                duration: "5 Hours",
                type: "MIG / TIG",
                desc: "Precision square tubing frames, flush ground welds ready for powder coating."
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-industrial-950 border border-industrial-750 rounded-sm p-4 flex flex-col justify-between hover:border-industrial-600 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-forge-400 font-semibold">{service.type}</span>
                    <span className="text-industrial-500">~{service.duration}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {service.title}
                  </h3>

                  <p className="text-xs text-industrial-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-industrial-800 flex items-center justify-between font-mono">
                  <span className="text-[10px] text-industrial-500 uppercase">EST. RANGE</span>
                  <span className="text-xs font-bold text-white">{service.range}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 5: Engineering Callout */}
      <section className="py-16 bg-industrial-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-industrial-900 border border-industrial-750 text-industrial-400 font-mono text-[10px] uppercase">
            <Scale className="w-3.5 h-3.5 text-forge-400" />
            <span>Industrial Transparency Standard</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ready to Verify or Generate a Fabrication Quote?
          </h2>

          <p className="text-xs sm:text-sm text-industrial-400 max-w-xl mx-auto leading-relaxed">
            Eliminate pricing uncertainty with structured engineering BOM models. Generate formal quote sheets or configure your workshop's custom machine amortization.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/quote-generator"
              className="px-5 py-2.5 rounded-sm bg-forge-600 hover:bg-forge-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>Generate Formal Quotation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/welder-dashboard"
              className="px-5 py-2.5 rounded-sm bg-industrial-900 hover:bg-industrial-850 text-industrial-200 border border-industrial-750 font-mono font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Access Welder Console</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
