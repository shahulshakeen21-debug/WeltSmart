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
  Layers,
  Clock,
  ShieldCheck,
  Scale,
  Play,
  Activity,
  Thermometer,
  Zap,
  Gauge,
  Cpu,
  TrendingUp,
  Settings,
  Shield
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
    <div className="min-h-screen bg-[#0c0f14] text-industrial-200">
      
      {/* =========================================================================
          HERO SECTION: MATCHING EXACT REFERENCE DESIGN
          ========================================================================= */}
      <section className="relative pt-8 pb-12 overflow-hidden border-b border-[#1b212d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[440px]">
            
            {/* Left Column: Heading & CTAs */}
            <div className="lg:col-span-7 z-10 space-y-5">
              
              {/* Kicker: PRECISION • EFFICIENCY • RELIABILITY */}
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-orange-500 uppercase">
                <span>PRECISION</span>
                <span className="text-orange-400">•</span>
                <span>EFFICIENCY</span>
                <span className="text-orange-400">•</span>
                <span>RELIABILITY</span>
              </div>

              {/* Exact Hero Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Smart Welding <br />
                <span className="text-orange-500">Monitoring System</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-industrial-300 max-w-xl leading-relaxed">
                Real-time weld quality analysis and defect detection using advanced machine learning techniques and transparent cost engineering.
              </p>

              {/* Exact Pill Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/calculator"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all text-xs uppercase tracking-wider group"
                >
                  <span>Start Monitoring</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/why-does-it-cost"
                  className="bg-[#121620] hover:bg-[#1a202c] text-white border border-[#232c3f] font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all text-xs uppercase tracking-wider"
                >
                  <Play className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                  <span>Learn More</span>
                </Link>
              </div>

            </div>

            {/* Right Column: Welder Mask Photo & Sparks with diagonal vignette */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Welder Image Container with mask blend */}
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#1f2633] shadow-2xl">
                <img
                  src="/welder-hero.jpg"
                  alt="Professional Welder at Work"
                  className="w-full h-full object-cover object-top filter brightness-90 contrast-110 saturate-110"
                />
                
                {/* Radial and gradient overlays to match reference seamlessly */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0f14] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14] via-transparent to-transparent opacity-60" />

                {/* Subtle blue arc glow accent */}
                <div className="absolute bottom-12 right-20 w-32 h-32 bg-cyan-400/20 blur-2xl rounded-full pointer-events-none" />
                <div className="absolute bottom-16 right-24 w-16 h-16 bg-orange-500/20 blur-xl rounded-full pointer-events-none" />
              </div>

              {/* Exact Vertical Index Stepper on Far Right */}
              <div className="hidden sm:flex flex-col items-center gap-3 absolute -right-2 top-1/2 -translate-y-1/2 font-mono text-xs font-bold">
                <span className="text-orange-500">01</span>
                <span className="text-industrial-600">02</span>
                <span className="text-industrial-700">03</span>
              </div>

            </div>

          </div>

          {/* =========================================================================
              EXACT DASHBOARD ROW 1: 3 CARDS
              - Key Features
              - Weld Quality Status
              - Live Welding Parameters
              ========================================================================= */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            
            {/* CARD 1: Key Features */}
            <div className="lg:col-span-4 bg-[#121620] border border-[#1f2633] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
                  <h3 className="font-bold text-white text-sm tracking-wide">Key Features</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Feature 1 */}
                  <div className="bg-[#0c0f14]/80 border border-[#1b212d] rounded-xl p-3 flex flex-col gap-2 hover:border-orange-500/40 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Activity className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white leading-tight">
                      Real-Time Monitoring
                    </span>
                  </div>

                  {/* Feature 2 */}
                  <div className="bg-[#0c0f14]/80 border border-[#1b212d] rounded-xl p-3 flex flex-col gap-2 hover:border-orange-500/40 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white leading-tight">
                      Defect Detection
                    </span>
                  </div>

                  {/* Feature 3 */}
                  <div className="bg-[#0c0f14]/80 border border-[#1b212d] rounded-xl p-3 flex flex-col gap-2 hover:border-orange-500/40 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white leading-tight">
                      Data Analytics
                    </span>
                  </div>

                  {/* Feature 4 */}
                  <div className="bg-[#0c0f14]/80 border border-[#1b212d] rounded-xl p-3 flex flex-col gap-2 hover:border-orange-500/40 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Settings className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-white leading-tight">
                      Automated Alerts
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Weld Quality Status (Circular Progress Gauge) */}
            <div className="lg:col-span-4 bg-[#121620] border border-[#1f2633] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
                    <h3 className="font-bold text-white text-sm tracking-wide">Weld Quality Status</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Healthy
                  </span>
                </div>

                <div className="flex items-center justify-around pt-2">
                  {/* SVG Circular Ring Gauge */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      {/* Background Track */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#1c2332"
                        strokeWidth="8"
                      />
                      {/* Active Green Arc */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="7.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-black text-white font-mono">98.5%</span>
                      <span className="text-[9px] text-industrial-400 font-medium">Quality Score</span>
                    </div>
                  </div>

                  {/* Status Breakdown Legend */}
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-industrial-300">Healthy</span>
                      </div>
                      <span className="font-bold text-white">98.5%</span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-industrial-300">Warning</span>
                      </div>
                      <span className="font-bold text-white">1.2%</span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-industrial-300">Critical</span>
                      </div>
                      <span className="font-bold text-white">0.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Live Welding Parameters with Sparkline Curve */}
            <div className="lg:col-span-4 bg-[#121620] border border-[#1f2633] rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
                  <h3 className="font-bold text-white text-sm tracking-wide">Live Welding Parameters</h3>
                </div>

                {/* 4 Telemetry Metrics */}
                <div className="grid grid-cols-4 gap-2 text-center pb-3">
                  <div>
                    <Thermometer className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white font-mono">72.4°C</div>
                    <div className="text-[9px] text-industrial-400">Temperature</div>
                  </div>

                  <div>
                    <Zap className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white font-mono">18.5 A</div>
                    <div className="text-[9px] text-industrial-400">Current</div>
                  </div>

                  <div>
                    <Gauge className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white font-mono">23.7 V</div>
                    <div className="text-[9px] text-industrial-400">Voltage</div>
                  </div>

                  <div>
                    <Activity className="w-4 h-4 text-orange-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white font-mono">2.8 mm/s</div>
                    <div className="text-[9px] text-industrial-400">Feed Rate</div>
                  </div>
                </div>

                {/* Live Sparkline Graph */}
                <div className="relative pt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col justify-between h-10 text-[8px] font-mono text-industrial-500">
                      <span>100</span>
                      <span>50</span>
                      <span>0</span>
                    </div>
                    <div className="w-full h-10 relative flex items-center">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="5" x2="200" y2="5" stroke="#1c2332" strokeWidth="0.7" strokeDasharray="2,2" />
                        <line x1="0" y1="20" x2="200" y2="20" stroke="#1c2332" strokeWidth="0.7" strokeDasharray="2,2" />
                        <line x1="0" y1="35" x2="200" y2="35" stroke="#1c2332" strokeWidth="0.7" strokeDasharray="2,2" />
                        {/* Sine Waveform Curve in Orange */}
                        <path
                          d="M0,25 Q20,15 40,25 T80,25 T120,18 T160,26 T200,20"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              EXACT DASHBOARD ROW 2: WELDING PROCESS FLOW
              ========================================================================= */}
          <div className="mt-5 bg-[#121620] border border-[#1f2633] rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
              <h3 className="font-bold text-white text-sm tracking-wide">Welding Process Flow</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left: 4 Sequence Steps with Arrows */}
              <div className="lg:col-span-8 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                
                {/* Step 1: Input Material */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#0c0f14]/80 border border-[#1b212d] w-full sm:w-32 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white">Input Material</span>
                </div>

                <ArrowRight className="hidden sm:block w-4 h-4 text-industrial-500 shrink-0" />

                {/* Step 2: Welding Process */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#0c0f14]/80 border border-[#1b212d] w-full sm:w-32 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
                    {/* Torch & Arc SVG */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-4" />
                      <path d="M10 16l2-2 2 2" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-white">Welding Process</span>
                </div>

                <ArrowRight className="hidden sm:block w-4 h-4 text-industrial-500 shrink-0" />

                {/* Step 3: Quality Analysis */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#0c0f14]/80 border border-[#1b212d] w-full sm:w-32 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white">Quality Analysis</span>
                </div>

                <ArrowRight className="hidden sm:block w-4 h-4 text-industrial-500 shrink-0" />

                {/* Step 4: Result Report */}
                <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#0c0f14]/80 border border-[#1b212d] w-full sm:w-32 hover:border-orange-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 mb-2">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-white">Result Report</span>
                </div>

              </div>

              {/* Right: Slanted Metallic Seam Photo Slice */}
              <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-[#1f2633] h-28 flex items-center">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="Precision Welded Metal Seam"
                  className="w-full h-full object-cover filter contrast-125 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0f14]/90 via-[#0c0f14]/70 to-transparent" />
                
                {/* Slanted Orange Accent Line */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500 transform -skew-x-12" />

                <div className="absolute left-5 right-3 text-left">
                  <h4 className="font-bold text-white text-xs sm:text-sm tracking-wide">
                    Built for Industrial Excellence
                  </h4>
                  <p className="text-[11px] text-industrial-300 mt-0.5 leading-snug">
                    Enhancing welding quality with AI-powered and mathematical cost precision.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE FAST CALCULATOR SIMULATOR & PRICE BREAKDOWN
          ========================================================================= */}
      <section className="py-12 border-b border-[#1b212d] bg-[#0c0f14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                  LIVE BENCHMARK ENGINE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Simulate Job Expenses in Real-Time
              </h2>
              <p className="text-xs sm:text-sm text-industrial-400 mt-1 max-w-xl">
                Test how welding duration, joint counts, and process types impact machine depreciation, power tariffs, and artisan compensation.
              </p>
            </div>

            <Link
              to="/calculator"
              className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto shadow-md"
            >
              <Calculator className="w-4 h-4" />
              <span>Full Cost Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Input Simulator Panel */}
            <div className="lg:col-span-6 bg-[#121620] border border-[#1f2633] rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="font-bold text-white text-sm uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-[#1b212d]">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>Operating Variables</span>
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-industrial-400 block mb-1">Process Type</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["Arc welding", "MIG welding", "TIG welding", "Gas welding"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setMiniWeldingType(t)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          miniWeldingType === t
                            ? "bg-orange-500 text-white border-orange-500 font-bold"
                            : "bg-[#0c0f14] border-[#1f2633] text-industrial-400 hover:text-white"
                        }`}
                      >
                        {t.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-industrial-400 mb-1">
                    <span>Arc & Rigging Duration:</span>
                    <strong className="text-white font-bold">{miniHours} hrs</strong>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={miniHours}
                    onChange={(e) => setMiniHours(parseFloat(e.target.value))}
                    className="w-full accent-orange-500 bg-[#1f2633] rounded-lg h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-industrial-400 mb-1">
                    <span>Structural Joint Count:</span>
                    <strong className="text-white font-bold">{miniJoints} joints</strong>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="1"
                    value={miniJoints}
                    onChange={(e) => setMiniJoints(parseInt(e.target.value))}
                    className="w-full accent-orange-500 bg-[#1f2633] rounded-lg h-2"
                  />
                </div>
              </div>
            </div>

            {/* Simulated Result Breakdown Card */}
            <div className="lg:col-span-6 bg-[#121620] border border-[#1f2633] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide flex items-center justify-between pb-3 border-b border-[#1b212d]">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <span>Cost Ledger Output</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    CALCULATED
                  </span>
                </h3>

                <div className="divide-y divide-[#1b212d] font-mono text-xs pt-3">
                  <div className="py-2 flex justify-between text-industrial-400">
                    <span>Machine Wear & Maintenance</span>
                    <span className="text-white">₹{teaserMachineCost}</span>
                  </div>
                  <div className="py-2 flex justify-between text-industrial-400">
                    <span>Grid Electricity (~{Math.round(miniHours * 4.5 * 0.55)} kWh)</span>
                    <span className="text-white">₹{teaserPowerCost}</span>
                  </div>
                  <div className="py-2 flex justify-between text-industrial-400">
                    <span>Electrodes, Wire & Abrasive Discs</span>
                    <span className="text-white">₹{teaserConsumables}</span>
                  </div>
                  <div className="py-2 flex justify-between text-industrial-400">
                    <span>Artisan Labour & Fitter Hours</span>
                    <span className="text-white">₹{teaserLabour}</span>
                  </div>
                  <div className="py-2 flex justify-between text-industrial-400">
                    <span>Transit & Safety Gear Overhead</span>
                    <span className="text-white">₹80</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1b212d] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-industrial-400 uppercase font-mono block">Recommended Fair Bid</span>
                  <span className="text-2xl font-black text-orange-500 font-mono">₹{teaserPrice}</span>
                </div>
                <Link
                  to="/calculator"
                  className="px-4 py-2 rounded-full bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-400 border border-orange-500/30 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Adjust Parameters →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          WHY 500 SECTION: TRANSPARENCY AUDIT
          ========================================================================= */}
      <section className="py-12 border-b border-[#1b212d] bg-[#0a0d12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Why500Section />
        </div>
      </section>

      {/* =========================================================================
          THREE PILLAR CALLOUTS
          ========================================================================= */}
      <section className="py-12 bg-[#0c0f14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-6 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Equipment Catalog</h3>
              <p className="text-xs text-industrial-400 leading-relaxed">
                Explore 19+ industrial tools: inverter machines, auto-darkening helmets, regulators, cutting discs, and their cost-per-job amortization.
              </p>
              <Link to="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300">
                <span>View Equipment Datasheets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-6 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Fabrication Price Guide</h3>
              <p className="text-xs text-industrial-400 leading-relaxed">
                Benchmark market price ranges for 10 structural packages including main gates, window security grills, vehicle repairs, and piping.
              </p>
              <Link to="/price-guide" className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300">
                <span>Explore Service Ranges</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-6 shadow-xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Why Does Welding Cost?</h3>
              <p className="text-xs text-industrial-400 leading-relaxed">
                Understand "The 1-Hour Illusion" and discover why a customer's charge must recover machinery, electricity, consumables, safety, and artisan mastery.
              </p>
              <Link to="/why-does-it-cost" className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300">
                <span>Read Cost Analysis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
