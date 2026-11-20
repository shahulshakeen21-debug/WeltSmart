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
  Layers,
  Wrench,
  TrendingUp,
  Truck
} from "lucide-react";

export default function WhyCostSoMuch() {
  const costPillars = [
    {
      id: "machine",
      icon: Cpu,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      title: "Machine Depreciation",
      subtitle: "Capital recovery per working arc hour",
      content:
        "An inverter welding machine contains high-voltage IGBT switches, capacitors, and cooling fans. Drawing 200–250 A produces immense thermal cycling. A commercial machine must be amortized over its rated life (4,000–5,000 hours), combined with annual board servicing and lead renewals.",
      math: "₹25,000 capital ÷ 4,000 hrs ≈ ₹6.25 per arc hour",
    },
    {
      id: "electricity",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      title: "Commercial Electricity",
      subtitle: "High commercial kW tariffs at 3,000°C arc temperatures",
      content:
        "Welding runs on commercial power tariffs. An inverter drawing 200 A continuously pulls 4.5–6.0 kW from the grid. In Indian industrial zones, commercial tariffs average ₹9.50–₹13.00 per kWh plus fixed demand charges.",
      math: "5 kW × 1 hr × 60% duty × ₹10/kWh = ₹30 electricity cost",
    },
    {
      id: "consumables",
      icon: Disc,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      title: "Consumables: Rods & Abrasives",
      subtitle: "Filler rods melt permanently into the seam; discs wear to stubs",
      content:
        "Every millimeter of weld bead permanently consumes filler metals. Rutile (E6013) and low-hydrogen (E7018) electrodes burn away in 60–90 seconds each. Cutting and grinding discs erode rapidly during joint beveling and flush smoothing.",
      math: "25 rods (₹300) + 2 cutting discs (₹70) + 2 grinding wheels (₹110) = ₹480",
    },
    {
      id: "safety",
      icon: ShieldAlert,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      title: "Safety & Protective Equipment",
      subtitle: "Protection against UV blindness, spatter, and toxic fumes",
      content:
        "Arc welding emits UV radiation that can burn corneal tissue in milliseconds. Artisans face risks from hexavalent chromium fumes, toxic ozone, high-voltage shocks, and 3,000°C molten spatter. Auto-darkening filter lenses, leather gauntlets, aprons, and steel-toe boots degrade constantly.",
      math: "Leather gloves (₹500/pair, 3-week life) + lens replacements = ₹200+/month",
    },
    {
      id: "prep",
      icon: Clock,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      title: "Preparation & Finishing Time",
      subtitle: "Arc strike is only 30% of the job; preparation is 70%",
      content:
        "Before striking an arc, the fabricator must remove rust, grind joint bevels, verify squareness, and clamp members to prevent heat contraction warpage. After welding, beads must be slag-chipped, dressed flush, and coated with red oxide primer.",
      math: "45 min active arc + 90 min prep/finishing = 2.25 total working hours billed",
    },
    {
      id: "skill",
      icon: Briefcase,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      title: "Certified Skill & Liability",
      subtitle: "Complete penetration control against catastrophic joint failure",
      content:
        "Anyone can bridge metal with cold lap and porosity. Achieving complete root penetration, thermal control, and crack-free metallurgical fusion requires years of apprenticeship. If a railing, staircase, or vehicle subframe joint fails under load, the liability is enormous.",
      math: "Structural welds must sustain years of load — a defective weld can cost lives, not just money",
    },
    {
      id: "transport",
      icon: Truck,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      title: "Transportation & Site Access",
      subtitle: "Heavy equipment doesn't move itself",
      content:
        "Welding machines weigh 15–40 kg. Gas cylinders weigh 50–70 kg. The welder must transport all equipment to the job site using a vehicle, paying for fuel, tolls, and loading labour. Remote or upper-floor sites add significant cost.",
      math: "8 km round trip × ₹12/km + loading help = ₹96–₹200 transport cost per job",
    },
    {
      id: "overhead",
      icon: TrendingUp,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
      title: "Business Overhead & Margin",
      subtitle: "Without margin, the business cannot survive",
      content:
        "A welder runs a small business with tool replacement, workshop rent, phone bills, insurance, and accounting costs. After paying for all consumables, electricity, transport, and labour — a reasonable profit margin ensures the business can sustain and grow.",
      math: "Sustainable margin = 15–25% above direct cost to maintain and grow the business",
    },
  ];

  const timeline = [
    { phase: "01 Site Visit & Measurement", time: "30 min", note: "Travel, assess job, measure dimensions, plan approach" },
    { phase: "02 Surface Preparation", time: "30 min", note: "Grinding rust, cutting, beveling, clamping members" },
    { phase: "03 Active Arc Welding", time: "20 min", note: "Drawing 200A at 3,000°C — 4 electrodes burned" },
    { phase: "04 Finishing & Quality Check", time: "20 min", note: "Slag chipping, flap-wheel smoothing, primer coat" },
    { phase: "05 Cleanup & Packing", time: "10 min", note: "Clearing spatter, packing equipment, return transit" },
  ];

  return (
    <div className="min-h-screen bg-[#0c0f14] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest">
            <ShieldAlert className="w-3.5 h-3.5" />
            Cost Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Does Welding{" "}
            <span className="text-orange-500">Cost So Much?</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            When you pay a welder, you are not just paying for the minutes the arc is burning.
            You are paying for every tool, every consumable, every hour of preparation, skill, and risk.
          </p>
        </div>

        {/* Key Formula Card */}
        <div className="bg-[#141820] border border-[#1f2633] rounded-2xl p-6 sm:p-8">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">The Real Cost Formula</div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">
            {["Labour", "Machine", "Electricity", "Consumables", "Materials", "Safety PPE", "Transport", "Overhead", "Profit"].map((item, i, arr) => (
              <React.Fragment key={item}>
                <span className="px-3 py-1.5 rounded-xl bg-[#0c0f14] border border-[#1f2633] text-gray-200 text-xs">
                  {item}
                </span>
                {i < arr.length - 1 && <span className="text-orange-500 font-bold text-base">+</span>}
              </React.Fragment>
            ))}
            <span className="text-orange-500 font-bold text-lg ml-1">=</span>
            <span className="px-4 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold">
              Fair Customer Price
            </span>
          </div>
        </div>

        {/* Real Job Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">What a "1-Hour Weld" Actually Looks Like</h2>
            <span className="text-xs text-gray-500 uppercase tracking-wider">Real Job Timeline</span>
          </div>
          <div className="bg-[#141820] border border-[#1f2633] rounded-2xl divide-y divide-[#1f2633] overflow-hidden">
            {timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 hover:bg-[#0c0f14]/50 transition-colors">
                <div className="shrink-0 w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-white">{step.phase}</span>
                    <span className="text-xs font-bold text-orange-400 shrink-0">{step.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{step.note}</p>
                </div>
              </div>
            ))}
            {/* Net result */}
            <div className="p-4 bg-orange-500/5 flex items-center justify-between gap-4">
              <div className="text-xs text-gray-300">
                <strong className="text-orange-400">Net Reality:</strong> A "1-hour weld" consumed ~2.5 hours of artisan
                time, 8 km fuel, 4 rods, half an abrasive disc, and machine depreciation.
              </div>
              <span className="text-orange-500 font-bold text-sm shrink-0">Total: ~2.5h</span>
            </div>
          </div>
        </div>

        {/* 8 Cost Pillars */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">The 8 Cost Components Behind Every Weld</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {costPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-[#141820] border border-[#1f2633] hover:border-orange-500/20 rounded-2xl p-5 space-y-3 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${pillar.bg} border ${pillar.border} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${pillar.color}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                      <span className="text-[11px] text-gray-500">{pillar.subtitle}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-xs text-gray-400 leading-relaxed">{pillar.content}</p>

                  {/* Math */}
                  <div className="bg-[#0c0f14] border border-[#1f2633] rounded-xl p-3">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Cost Estimate</span>
                    <span className={`text-xs font-semibold ${pillar.color}`}>{pillar.math}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#141820] border border-[#1f2633] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">See the Real Cost for Your Project</h3>
            <p className="text-xs text-gray-400 max-w-md">
              Run your own parameters through the interactive calculator or generate a formal quotation with a full cost breakdown.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/calculator"
              className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors flex items-center gap-2"
            >
              Open Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/quote-generator"
              className="px-6 py-2.5 rounded-full bg-[#0c0f14] border border-[#1f2633] hover:border-gray-500 text-gray-300 hover:text-white font-semibold text-sm transition-colors"
            >
              Get Quote
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
