import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  HelpCircle, 
  Flame, 
  Cpu, 
  Zap, 
  ShieldAlert, 
  Clock, 
  Disc, 
  Truck, 
  Briefcase, 
  TrendingUp, 
  Layers, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Eye,
  AlertTriangle
} from "lucide-react";

export default function WhyCostSoMuch() {
  const [activeTab, setActiveTab] = useState("all");

  const costPillars = [
    {
      id: "machine",
      icon: Cpu,
      title: "1. The ₹25,000+ Machine Investment & Degradation",
      subtitle: "Machines are not free tools — they wear out with every spark.",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      content: "An inverter welding machine contains sensitive IGBT semiconductor power switches, high-voltage capacitors, and cooling fans. Drawing hundreds of amperes creates severe internal thermal stress. A welder must amortize this machine over roughly 4,000 working hours, plus pay for torch replacements, copper leads, and servicing. If they don't recover machine wear, they can't afford a replacement when it burns out.",
      math: "Machine Cost / Hour = (₹25,000 Purchase + ₹3,000 Annual Service × 3 yrs) ÷ 4,000 hrs = ~₹8.5/hr direct wear"
    },
    {
      id: "electricity",
      icon: Zap,
      title: "2. The Commercial Electricity Spike",
      subtitle: "Welding does not use ordinary household fan power.",
      color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
      content: "A 200-Ampere welding inverter pulls between 4.5 kW and 6.0 kW of electric power. In workshops and commercial zones, electricity tariffs in India average ₹9.5 to ₹13.0 per kilowatt-hour, plus fixed connected-load demand penalties. Running an electric arc at 3,000°C generates substantial power utility bills that must be covered by the job.",
      math: "Power Cost = 5.0 kW × 2 hrs × ₹10.0/kWh = ₹100 direct electricity consumption"
    },
    {
      id: "consumables",
      icon: Disc,
      title: "3. Disappearing Consumables: Electrodes & Discs",
      subtitle: "Rods melt into the steel; abrasive discs turn to dust.",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30",
      content: "Every single weld seam physically consumes filler rod metal. Rutile (E6013) and low-hydrogen (E7018) electrodes burn away in 60 seconds each. In addition, cutting discs and grinding wheels are consumed rapidly when beveling steel sections and smoothing weld beads flat. A single gate fabrication can easily burn through 30 electrodes and 4 abrasive wheels.",
      math: "Consumables = 25 Rods (₹300) + 2 Cutting Discs (₹70) + 2 Grinding Wheels (₹110) = ₹480"
    },
    {
      id: "safety",
      icon: ShieldAlert,
      title: "4. Extreme Health Risks & Safety Equipment",
      subtitle: "UV blindness, 3000°C molten sparks, and toxic metallic fumes.",
      color: "text-red-400 bg-red-500/10 border-red-500/30",
      content: "Welding produces violent ultraviolet and infrared radiation that can blind the naked eye in seconds ('arc eye' flash burns). Artisans risk lung damage from hexavalent chromium and manganese fumes, severe skin burns from molten slag droppings, and high-voltage shock. Auto-darkening helmets, split leather aprons, heavy gauntlets, and safety shoes are mandatory and wear out continuously.",
      math: "Safety Amortization = Heavy leather gloves (₹500/pair, lasting 3 weeks) + lens spatter guards"
    },
    {
      id: "prep",
      icon: Clock,
      title: "5. Invisible Preparation & Finishing Time",
      subtitle: "Welding is only 30% of the job; prep & fitting is 70%.",
      color: "text-orange-400 bg-orange-500/10 border-orange-500/30",
      content: "Before a single weld spark is struck, the welder must clean rust, deburr edges, grind bevels, measure diagonals with tri-squares, and clamp steel members dead square with heavy F-clamps. After welding, they must chip away hard slag, grind beads smooth, sand surfaces with flap wheels, and apply red oxide primer to stop flash rusting.",
      math: "A 45-minute weld requires 90 minutes of prep, measuring, clamping, and grinding!"
    },
    {
      id: "skill",
      icon: Briefcase,
      title: "6. Certified Skill, Precision & Structural Safety",
      subtitle: "A bad weld looks okay from the outside but collapses under load.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      content: "Anyone can stick two pieces of metal together with spatter and cold lap. But proper weld penetration, root fusion, heat input management, and avoiding metal embrittlement requires years of apprentice training. If a balcony railing, main gate pivot, or vehicle chassis weld snaps, people can get seriously injured. You pay for the artisan's guarantee that the joint will never break.",
      math: "Certified artisan skill ensures life-safety and decades of structural durability"
    }
  ];

  return (
    <div className="min-h-screen bg-industrial-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Educational Price Transparency Guide
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            “Why Does Welding Cost So Much?”
          </h1>

          <p className="text-base sm:text-lg text-industrial-300 max-w-2xl mx-auto leading-relaxed">
            Understanding why a customer is not paying only for the welder's time, but for an entire operating industrial factory running on their behalf.
          </p>
        </div>

        {/* Master Formula Banner */}
        <div className="bg-gradient-to-r from-industrial-900 via-industrial-850 to-industrial-900 border border-orange-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-bold text-orange-400 tracking-widest block">
              The Real Welding Invoice Equation
            </span>
            <div className="text-sm sm:text-lg font-black text-white font-mono bg-industrial-950 p-4 rounded-xl border border-industrial-800 inline-block max-w-full overflow-x-auto">
              Customer Charge = Labour + Skill + Machine + Electricity + Consumables + Materials + Safety + Maintenance + Transportation + Business Expenses + Profit
            </div>
            <p className="text-xs text-industrial-400 max-w-2xl mx-auto pt-2">
              If any of these 11 factors is ignored or bargained away, the welder is forced to pay for your project out of their own personal livelihood.
            </p>
          </div>
        </div>

        {/* The "1-Hour Illusion" Visual Story */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
            <Clock className="w-4 h-4" />
            <span>Case Study: The 1-Hour Illusion</span>
          </div>

          <h3 className="text-2xl font-black text-white">
            “The Welder Only Worked for 1 Hour. Why Did It Cost ₹600?”
          </h3>

          <p className="text-sm text-industrial-300 leading-relaxed">
            Imagine a welder arrives at your gate to weld a broken pivot hinge. The arc torch is only on for 20 minutes, and the total visit takes 1 hour. Here is the financial reality of that single hour:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-industrial-950 p-4 rounded-xl border border-industrial-800 text-xs">
              <span className="text-industrial-500 block mb-1 font-mono">1. Packing & Travel</span>
              <strong className="text-white block text-sm mb-1">45 Mins Transit</strong>
              <p className="text-industrial-400 text-[11px]">Loading 18kg machine, heavy cables, clamps, grinder, and riding 8 km on a two-wheeler with tooling weight.</p>
            </div>

            <div className="bg-industrial-950 p-4 rounded-xl border border-industrial-800 text-xs">
              <span className="text-industrial-500 block mb-1 font-mono">2. Setup & Beveling</span>
              <strong className="text-white block text-sm mb-1">20 Mins Prep</strong>
              <p className="text-industrial-400 text-[11px]">Grinding away years of rust, oil, and paint. Setting true alignment before striking the first arc.</p>
            </div>

            <div className="bg-industrial-950 p-4 rounded-xl border border-industrial-800 text-xs">
              <span className="text-industrial-500 block mb-1 font-mono">3. Active Arcing</span>
              <strong className="text-white block text-sm mb-1">20 Mins Weld</strong>
              <p className="text-industrial-400 text-[11px]">Drawing 200 Amperes at 3,000°C. 4 electrodes burned, UV helmet lenses spattered, high electrical tariff.</p>
            </div>

            <div className="bg-industrial-950 p-4 rounded-xl border border-industrial-800 text-xs">
              <span className="text-industrial-500 block mb-1 font-mono">4. Slag Clean & Dressing</span>
              <strong className="text-white block text-sm mb-1">20 Mins Finish</strong>
              <p className="text-industrial-400 text-[11px]">Chipping slag crust, grinding weld flush, testing hinge swing, packing heavy gear back onto vehicle.</p>
            </div>
          </div>

          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl text-xs text-orange-200">
            <strong>The Truth:</strong> A "1-hour job" consumed almost 2.5 hours of artisan time, 8 km of fuel, 4 electrodes, half a grinding disc, power, and machine wear. Out of the ₹600 charge, the welder nets less than ₹180!
          </div>
        </div>

        {/* 6 Key Cost Pillars Cards Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-white">
              The 6 Invisible Cost Pillars
            </h2>
            <p className="text-xs text-industrial-400 mt-1">
              Click on each pillar to examine the engineering mathematics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {costPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-industrial-900 border border-industrial-800 hover:border-industrial-700 rounded-2xl p-6 space-y-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl border ${pillar.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-industrial-400">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-industrial-300 leading-relaxed pt-2">
                    {pillar.content}
                  </p>

                  <div className="p-3 bg-industrial-950 rounded-xl border border-industrial-800 text-[11px] font-mono text-orange-400">
                    <span className="text-industrial-500 block text-[10px] uppercase font-bold">Calculation Principle:</span>
                    {pillar.math}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to Calculator */}
        <div className="text-center pt-8 border-t border-industrial-800 space-y-4">
          <h3 className="text-xl font-bold text-white">
            Ready to test these numbers on your actual project?
          </h3>
          <div className="flex justify-center gap-4">
            <Link
              to="/calculator"
              className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-weld-glow transition-all flex items-center gap-2"
            >
              <span>Open Interactive Cost Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/tools"
              className="px-6 py-3 rounded-xl bg-industrial-900 hover:bg-industrial-850 text-industrial-200 border border-industrial-800 text-xs font-semibold tracking-wider transition-all"
            >
              <span>Explore Tool Catalog</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

