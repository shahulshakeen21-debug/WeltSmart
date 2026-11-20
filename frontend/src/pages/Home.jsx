import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Flame, 
  Calculator, 
  Wrench, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  Cpu,
  Hammer,
  Scale
} from "lucide-react";
import Why500Section from "../components/Why500Section";

export default function Home() {
  const [miniWeldingType, setMiniWeldingType] = useState("Arc welding");
  const [miniHours, setMiniHours] = useState(2.5);
  const [miniJoints, setMiniJoints] = useState(8);

  // Quick live teaser estimate formula for mini hero widget
  const teaserMachineCost = Math.round(miniHours * 25);
  const teaserPowerCost = Math.round(miniHours * 4.5 * 0.55 * 9.5);
  const teaserConsumables = Math.round(miniJoints * 15 + 90);
  const teaserLabour = Math.round(miniHours * 250);
  const teaserTotal = teaserMachineCost + teaserPowerCost + teaserConsumables + teaserLabour + 80;
  const teaserPrice = Math.round(teaserTotal * 1.22);

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-industrial-800 bg-grid-pattern">
        {/* Ambient Industrial Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide uppercase">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>Price & Engineering Transparency Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Understand the Real Cost <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                  Behind Every Weld.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-industrial-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Know what you're paying for. Help welders charge fairly for their skills, time, tools and materials.
              </p>

              {/* Four Main Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/quote-generator"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm tracking-wide shadow-weld-glow transition-all flex items-center gap-2 group"
                >
                  <FileText className="w-4 h-4" />
                  <span>Get Welding Cost Estimate</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/calculator"
                  className="px-5 py-3.5 rounded-xl bg-industrial-900 hover:bg-industrial-850 text-white border border-industrial-700 hover:border-orange-500/50 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-orange-400" />
                  <span>Cost Calculator</span>
                </Link>

                <Link
                  to="/tools"
                  className="px-5 py-3.5 rounded-xl bg-industrial-900 hover:bg-industrial-850 text-industrial-200 hover:text-white border border-industrial-800 font-medium text-sm transition-all flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-amber-400" />
                  <span>Explore Welding Tools</span>
                </Link>

                <Link
                  to="/why-does-it-cost"
                  className="px-5 py-3.5 rounded-xl bg-industrial-900 hover:bg-industrial-850 text-industrial-200 hover:text-white border border-industrial-800 font-medium text-sm transition-all flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  <span>Understand Charges</span>
                </Link>
              </div>

              {/* Trust & Transparency Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-industrial-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl font-black text-white font-mono">100%</div>
                  <div className="text-[11px] text-industrial-400 font-medium">Math Itemized Breakdown</div>
                </div>
                <div>
                  <div className="text-xl font-black text-white font-mono">19+</div>
                  <div className="text-[11px] text-industrial-400 font-medium">Tools & Wear Factors</div>
                </div>
                <div>
                  <div className="text-xl font-black text-orange-400 font-mono">Fair Trade</div>
                  <div className="text-[11px] text-industrial-400 font-medium">Zero Guesswork Pricing</div>
                </div>
              </div>
            </div>

            {/* Right Mini Cost Simulator Widget */}
            <div className="lg:col-span-5">
              <div className="bg-industrial-900/90 border border-industrial-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative group">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-industrial-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Live Cost Simulator
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    Real-time
                  </span>
                </div>

                {/* Welding Process selector */}
                <div className="mb-4">
                  <label className="text-xs text-industrial-400 block mb-1.5 font-medium">
                    Welding Process
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    {["Arc welding", "MIG welding", "TIG welding", "Gas welding"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setMiniWeldingType(type)}
                        className={`py-2 px-3 rounded-lg border text-left transition-all ${
                          miniWeldingType === type
                            ? "bg-orange-500/15 border-orange-500 text-orange-300 font-bold"
                            : "bg-industrial-950 border-industrial-800 text-industrial-400 hover:border-industrial-700"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job duration slider */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-industrial-400">Job Duration</span>
                    <span className="text-white font-mono font-bold">{miniHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={miniHours}
                    onChange={(e) => setMiniHours(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>

                {/* Joints counter slider */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-industrial-400">Number of Welded Joints</span>
                    <span className="text-white font-mono font-bold">{miniJoints} Joints</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="40"
                    step="1"
                    value={miniJoints}
                    onChange={(e) => setMiniJoints(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                </div>

                {/* Teaser Breakdown Box */}
                <div className="bg-industrial-950 rounded-xl p-4 border border-industrial-800 font-mono text-xs space-y-1.5 mb-4">
                  <div className="flex justify-between text-industrial-400">
                    <span>Machine & Power:</span>
                    <span>₹{teaserMachineCost + teaserPowerCost}</span>
                  </div>
                  <div className="flex justify-between text-industrial-400">
                    <span>Electrodes & Discs:</span>
                    <span>₹{teaserConsumables}</span>
                  </div>
                  <div className="flex justify-between text-industrial-400">
                    <span>Labour ({miniHours}h):</span>
                    <span>₹{teaserLabour}</span>
                  </div>
                  <div className="flex justify-between text-industrial-400">
                    <span>Transport & Safety:</span>
                    <span>₹80</span>
                  </div>
                  <div className="pt-2 border-t border-industrial-850 flex justify-between text-sm font-sans">
                    <span className="font-bold text-white">Recommended Total:</span>
                    <span className="text-lg font-black text-orange-400 font-mono">
                      ₹{teaserPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
                  to="/calculator"
                  className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider text-center block transition-colors"
                >
                  Open Full Interactive Calculator →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Core Problem & Philosophy Section */}
      <section className="py-20 bg-industrial-900 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-2">
              Why We Built WeldCost
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Solving the Fundamental Welding Price Misunderstanding
            </h2>
            <p className="mt-3 text-industrial-300 text-sm sm:text-base leading-relaxed">
              When a customer assumes welding charges are purely for labour, they ask for unreasonable discounts. WeldCost reveals the entire industrial workshop running behind every bead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* The Customer Myth */}
            <div className="bg-industrial-950 border border-red-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Uninformed Perception (The Myth)</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  “The welder is only spending 45 minutes, so ₹500 is way too high!”
                </h3>
                <ul className="space-y-2.5 text-xs text-industrial-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Assumes 100% of payment goes directly into the welder's pocket as cash profit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Ignores the ₹25,000–₹40,000 machine degrading with every single arc spark.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Overlooks commercial electricity tariffs, abrasive grinding discs, and fuel costs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span>Fails to account for extreme eye-burning UV radiation, heat, and physical danger.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-industrial-800 text-[11px] text-red-300 font-medium">
                Result: Welders get underpaid and struggle to maintain reliable tools.
              </div>
            </div>

            {/* The Engineering Reality */}
            <div className="bg-industrial-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Engineering Reality (The WeldCost Formula)</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Customer Charge = Materials + Consumables + Machine + Power + Labour + Margin
                </h3>
                <ul className="space-y-2.5 text-xs text-industrial-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Consumables Melt:</strong> Electrodes, wires, shielding gases, and cutting discs physically wear away during work.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Capital Depreciation:</strong> Machine inverters, cables, auto-darkening lenses must be amortized per working hour.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>High Commercial Tariffs:</strong> 200 Amperes drawn at high voltage incurs real electricity bills.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Fair Artisan Wage:</strong> Rewarding years of precision alignment, penetration control, and safety.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-industrial-800 text-[11px] text-emerald-300 font-medium">
                Result: Transparent estimates, mutual trust, and fair sustainable business.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Feature: "Why ₹500?" Interactive Explorer */}
      <Why500Section />

      {/* Featured Service Price Categories */}
      <section className="py-20 bg-industrial-900 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-2">
                Market Price Transparency
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                Common Welding Service Price Guide
              </h2>
              <p className="mt-2 text-industrial-400 text-sm max-w-2xl">
                Benchmark estimated price ranges for standard fabrication tasks. All ranges are dynamic engineering models, not fixed universal prices.
              </p>
            </div>
            <Link
              to="/price-guide"
              className="px-4 py-2 rounded-lg bg-industrial-850 hover:bg-industrial-800 text-orange-400 border border-orange-500/30 text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5 transition-colors"
            >
              <span>View All 10 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Gate & Main Entrance Fabrication",
                range: "₹2,500 – ₹12,000",
                duration: "6 Hours",
                type: "Arc / MMA",
                desc: "Driveway swing and sliding gates with heavy pivot hinges and lock boxes."
              },
              {
                title: "Window Safety Grill & Balcony Railing",
                range: "₹1,500 – ₹6,500",
                duration: "4 Hours",
                type: "Arc / Stick",
                desc: "Child safety bars, balcony enclosures, and anti-corrosion primer prep."
              },
              {
                title: "Bike, Scooter & Silencer Repair",
                range: "₹300 – ₹2,200",
                duration: "1.5 Hours",
                type: "MIG / CO2",
                desc: "Chassis cracks, broken footpegs, exhaust silencer rust hole patching."
              },
              {
                title: "Spiral & Straight Metal Staircase",
                range: "₹8,000 – ₹35,000",
                duration: "14 Hours",
                type: "Heavy Arc",
                desc: "ISMC channel stringers, anti-skid chequered steps, and safety railings."
              },
              {
                title: "High-Pressure Pipe & Flange Welding",
                range: "₹2,200 – ₹9,500",
                duration: "5 Hours",
                type: "TIG / GTAW",
                desc: "Certified root pass penetration and capping for hydraulic and gas lines."
              },
              {
                title: "Industrial Metal & Loft Furniture",
                range: "₹2,000 – ₹8,500",
                duration: "5 Hours",
                type: "MIG / TIG",
                desc: "Minimalist dining tables, ergonomic desks with flush ground welds."
              }
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-industrial-950 border border-industrial-800 hover:border-orange-500/40 rounded-xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between text-xs text-industrial-400 mb-3">
                  <span className="font-mono bg-industrial-900 px-2 py-0.5 rounded border border-industrial-800 text-orange-400">
                    {service.type}
                  </span>
                  <span>{service.duration}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-industrial-400 mb-4 leading-relaxed">
                  {service.desc}
                </p>
                <div className="pt-3 border-t border-industrial-850 flex items-center justify-between">
                  <span className="text-[11px] text-industrial-400 font-medium">Est. Price Range</span>
                  <span className="text-sm font-bold text-white font-mono">{service.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-industrial-950 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Fair Trade For Everyone</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Ready to Generate a Transparent Welding Quote?
          </h2>

          <p className="text-industrial-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Whether you are a customer wanting to verify a fair price, or a welder wanting to ensure your workshop never operates at a loss — WeldCost gives you instant, verified transparency.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/quote-generator"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm tracking-wide shadow-weld-glow transition-all flex items-center gap-2"
            >
              <span>Generate Customer Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/welder-dashboard"
              className="px-6 py-3.5 rounded-xl bg-industrial-900 hover:bg-industrial-850 text-orange-400 border border-orange-500/40 font-bold text-sm tracking-wide transition-all"
            >
              <span>Access Welder Mode Dashboard</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

