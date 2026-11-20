import React from "react";
import { Link } from "react-router-dom";
import { 
  Cpu, 
  Zap, 
  ShieldAlert, 
  Clock, 
  Disc, 
  Briefcase, 
  ArrowRight,
  FileCode,
  Layers,
  Wrench
} from "lucide-react";

export default function WhyCostSoMuch() {
  const costPillars = [
    {
      id: "machine",
      icon: Cpu,
      title: "1. Power Inverter Capital Depreciation & Thermal Stress",
      subtitle: "Capital recovery per working arc hour.",
      content: "An inverter welding machine contains high-voltage IGBT semiconductor switches, capacitors, and cooling fans. Drawing 200–250 Amperes produces immense internal thermal cycling. A commercial machine must be amortized over its rated working life (typically 4,000–5,000 hours), combined with annual board servicing and torch lead renewals. Without recovering tool wear, a fabricator cannot purchase replacement machinery when internal components inevitably fail.",
      math: "Depreciation = (₹25,000 Capital + ₹3,000 Annual Service × 3 yrs) ÷ 4,000 hrs = ~₹8.50/hr direct capital depletion"
    },
    {
      id: "electricity",
      icon: Zap,
      title: "2. Commercial Grid Electricity Demand Charges",
      subtitle: "High commercial kilowatt tariffs at 3,000°C temperatures.",
      content: "Welding does not operate on domestic residential power tariffs. An inverter drawing 200 Amperes continuously pulls between 4.5 kW and 6.0 kW from the commercial electrical distribution feeder. In Indian industrial MIDC zones, commercial power tariffs average ₹9.50 to ₹13.00 per kilowatt-hour, plus fixed connected-load demand charges. Sustaining a 3,000°C electric plasma arc generates measurable utility meter expenses.",
      math: "Energy = 5.0 kW Machine Draw × (Duration × 0.55 Duty) × ₹9.50/kWh Commercial Tariff"
    },
    {
      id: "consumables",
      icon: Disc,
      title: "3. Direct Consumable Depletion: Electrodes & Abrasives",
      subtitle: "Filler rods melt permanently into the seam; discs wear to stubs.",
      content: "Every millimeter of weld bead permanently consumes filler metals. Rutile (E6013) and low-hydrogen (E7018) electrodes burn away in 60–90 seconds each. Concurrently, cutting discs and depressed-center grinding wheels erode rapidly during joint beveling and flush smoothing. A single standard driveway entrance gate can easily deplete 30+ electrode rods and 4 abrasive wheels.",
      math: "Consumables = 25 Rods (₹300) + 2 Cutting Discs (₹70) + 2 Grinding Wheels (₹110) = ₹480"
    },
    {
      id: "safety",
      icon: ShieldAlert,
      title: "4. Severe Occupational Hazards & Mandatory Protective Gear",
      subtitle: "Protection against UV blindness, molten spatter, and toxic fumes.",
      content: "Electric arc welding emits high-intensity ultraviolet and infrared radiation that can burn corneal tissue ('arc eye' flash) in milliseconds. Artisans face severe risks from hexavalent chromium fumes, toxic ozone, high-voltage shocks, and 3,000°C molten spatter. Auto-darkening filter lenses, cowhide split leather gauntlets, protective aprons, and steel-toe boots degrade constantly and must be replaced regularly.",
      math: "Safety PPE Amortization = Heavy leather gauntlets (₹500/pair, 3-week life) + spatter shield lens replacements"
    },
    {
      id: "prep",
      icon: Clock,
      title: "5. The Non-Arc Hours: Surface Prep, Fitup & Grinding",
      subtitle: "Arc strike is only 30% of the job; preparation is 70%.",
      content: "Before striking an arc, the fabricator must mechanically remove rust, grind joint bevels, verify squareness with precision tri-squares, and clamp members with heavy F-clamps to prevent heat contraction warpage. Following welding, beads must be chipped of brittle slag, dressed flush with angle grinders, and coated with red oxide primer to inhibit atmospheric flash rusting.",
      math: "A 45-minute active arc weld requires 90+ minutes of preparation, clamping, alignment, and dressed finishing."
    },
    {
      id: "skill",
      icon: Briefcase,
      title: "6. Certified Artisan Skill & Structural Liability",
      subtitle: "Penetration control and safety against catastrophic joint failure.",
      content: "Anyone can bridge two pieces of metal with cold lap and porosity. However, achieving complete root penetration, thermal control, and crack-free metallurgical fusion requires years of apprenticeship and trade certification. If an architectural railing, staircase stringer, or vehicle subframe joint fails under load, the liability is immense. Clients pay for structural integrity that lasts decades.",
      math: "Certified skill guarantees compliance with standard fabrication shear, tensile, and load safety factors."
    }
  ];

  return (
    <div className="min-h-screen bg-industrial-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Whitepaper Header */}
        <div className="border-b border-industrial-800 pb-6">
          <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] font-bold text-forge-400 uppercase">
            <span className="w-2 h-2 bg-forge-500 rounded-xs"></span>
            <span>ENGINEERING WHITE PAPER // SECTION 03</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            The Cost Architecture of Welding & Fabrication
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-industrial-400 max-w-3xl leading-relaxed">
            An empirical investigation into why fabrication invoices cannot be evaluated strictly by arc time, and how operating equipment, utility draw, and consumable wear form the true bill of operations.
          </p>
        </div>

        {/* Master Formula Technical Banner */}
        <div className="p-4 bg-industrial-900 border border-industrial-750 rounded-sm space-y-2">
          <div className="text-[10px] font-mono font-bold uppercase text-forge-400">
            THE INVOICE RECONCILIATION EQUATION
          </div>
          <div className="p-3 bg-industrial-950 border border-industrial-800 rounded-xs font-mono text-xs sm:text-sm text-white overflow-x-auto">
            Customer Charge = Labour + Skill + Machine Wear + Power + Consumables + Material + Safety + Maintenance + Logistics + Overhead + Margin
          </div>
          <p className="text-[11px] text-industrial-400 leading-relaxed font-mono pt-1">
            If any of these 11 cost components is discounted or excluded, the shortfall is paid directly from the fabricator's personal livelihood.
          </p>
        </div>

        {/* Case Study: The 1-Hour Illusion */}
        <div className="bg-industrial-900 border border-industrial-750 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-industrial-800 text-xs font-mono">
            <span className="font-bold text-white uppercase flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-forge-400" />
              <span>Case Study // The 1-Hour Illusion</span>
            </span>
            <span className="text-[10px] text-industrial-500">EMPIRICAL BREAKDOWN</span>
          </div>

          <h3 className="text-base font-bold text-white">
            "The Welder Worked for 1 Hour on Site. Why Was the Invoice ₹600?"
          </h3>

          <p className="text-xs text-industrial-300 leading-relaxed">
            Consider a typical on-site repair of a sheared gate pivot hinge. The arc torch is energized for only 20 minutes, and total site presence is 1 hour. Below is the full time and asset balance sheet:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="bg-industrial-950 p-3 rounded-xs border border-industrial-800 space-y-1">
              <span className="text-industrial-500 text-[10px] block">PHASE 01: TRANSIT</span>
              <div className="font-bold text-white text-xs">45 Min Haulage</div>
              <p className="text-[10px] text-industrial-400 font-sans leading-normal">
                Loading 18kg power source, 50mm² cables, clamps, grinder, and riding 8 km with tooling.
              </p>
            </div>

            <div className="bg-industrial-950 p-3 rounded-xs border border-industrial-800 space-y-1">
              <span className="text-industrial-500 text-[10px] block">PHASE 02: BEVELING</span>
              <div className="font-bold text-white text-xs">20 Min Prep</div>
              <p className="text-[10px] text-industrial-400 font-sans leading-normal">
                Mechanically grinding away paint, grease, and rust to achieve clean bare steel for conductivity.
              </p>
            </div>

            <div className="bg-industrial-950 p-3 rounded-xs border border-industrial-800 space-y-1">
              <span className="text-industrial-500 text-[10px] block">PHASE 03: ARCING</span>
              <div className="font-bold text-white text-xs">20 Min Fusion</div>
              <p className="text-[10px] text-industrial-400 font-sans leading-normal">
                Drawing 200A at 3,000°C. 4 electrodes burned, UV lens spattered, commercial kilowatt draw.
              </p>
            </div>

            <div className="bg-industrial-950 p-3 rounded-xs border border-industrial-800 space-y-1">
              <span className="text-industrial-500 text-[10px] block">PHASE 04: FINISHING</span>
              <div className="font-bold text-white text-xs">20 Min Dressing</div>
              <p className="text-[10px] text-industrial-400 font-sans leading-normal">
                Chipping slag crust, flap-wheel smoothing, hinge swing alignment check, and re-packing heavy gear.
              </p>
            </div>
          </div>

          <div className="p-3 bg-industrial-950 border border-industrial-800 rounded-xs text-xs font-mono text-industrial-300 flex items-center justify-between gap-3">
            <span>
              <strong className="text-forge-400">NET REALITY:</strong> A 1-hour site visit consumed 2.5 hours of artisan time, 8 km fuel, 4 rods, half an abrasive disc, and machine depreciation. Net artisan cash is &lt;₹180.
            </span>
            <span className="text-forge-400 font-bold shrink-0 text-sm">₹180 Net</span>
          </div>
        </div>

        {/* 6 Engineering Cost Pillars */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-industrial-800 text-xs font-mono">
            <span className="font-bold text-white uppercase">
              The Six Primary Operating Vectors
            </span>
            <span className="text-[10px] text-industrial-500">TECHNICAL AUDIT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {costPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-industrial-900 border border-industrial-750 rounded-sm p-4 space-y-2.5 shadow-panel"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xs bg-industrial-950 border border-industrial-800 text-forge-400 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white tracking-tight">
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] text-industrial-500 font-mono block">
                        {pillar.subtitle}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-industrial-300 leading-relaxed">
                    {pillar.content}
                  </p>

                  <div className="p-2.5 bg-industrial-950 rounded-xs border border-industrial-800 text-[10px] font-mono text-forge-400">
                    <span className="text-industrial-500 uppercase block font-semibold text-[9px]">ENGINEERING CALCULATION:</span>
                    {pillar.math}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="p-6 bg-industrial-900 border border-industrial-750 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div>
            <div className="font-bold text-white text-sm font-sans">
              Test These Mathematical Models on Your Project
            </div>
            <div className="text-industrial-400 text-xs mt-0.5">
              Run custom parameters through the interactive calculator or generate a formal quotation.
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/calculator"
              className="px-4 py-2 bg-forge-600 hover:bg-forge-500 text-white font-bold rounded-xs transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>Launch Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
