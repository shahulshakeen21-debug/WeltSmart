import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { 
  HelpCircle, 
  Sparkles, 
  Zap, 
  Hammer, 
  Cpu, 
  Disc, 
  Truck, 
  ShieldCheck, 
  TrendingUp, 
  BatteryCharging,
  ArrowRight,
  AlertCircle
} from "lucide-react";

export default function Why500Section() {
  const [price, setPrice] = useState(500);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const presets = [
    { label: "₹300 (Tiny Silencer Patch)", value: 300 },
    { label: "₹500 (Standard Hinge Repair)", value: 500 },
    { label: "₹1,200 (Grill Modification)", value: 1200 },
    { label: "₹2,500 (Door Frame Stiffener)", value: 2500 },
    { label: "₹5,000 (Sliding Gate Servicing)", value: 5000 },
  ];

  const fetchBreakdown = async (targetPrice) => {
    setLoading(true);
    try {
      const res = await api.getWhy500(targetPrice);
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreakdown(price);
  }, []);

  const handlePriceChange = (newPrice) => {
    const val = Math.max(50, Number(newPrice) || 0);
    setPrice(val);
    fetchBreakdown(val);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Hammer": return <Hammer className="w-4 h-4 text-orange-400" />;
      case "Zap": return <Zap className="w-4 h-4 text-amber-400" />;
      case "Cpu": return <Cpu className="w-4 h-4 text-blue-400" />;
      case "BatteryCharging": return <BatteryCharging className="w-4 h-4 text-yellow-400" />;
      case "Truck": return <Truck className="w-4 h-4 text-emerald-400" />;
      case "Disc": return <Disc className="w-4 h-4 text-purple-400" />;
      case "ShieldCheck": return <ShieldCheck className="w-4 h-4 text-pink-400" />;
      case "TrendingUp": return <TrendingUp className="w-4 h-4 text-teal-400" />;
      default: return <Sparkles className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <section id="why-500" className="py-16 bg-industrial-950 relative overflow-hidden border-t border-b border-industrial-800">
      {/* Background glow sparks */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Key Transparency Feature
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            “Why ₹{price.toLocaleString()}?”
          </h2>
          <p className="mt-3 text-sm sm:text-base text-industrial-300">
            A customer often thinks: <span className="text-white italic font-semibold">“The welder only worked for 45 minutes, why does it cost ₹{price}?”</span> Here is where that money actually goes:
          </p>
        </div>

        {/* Interactive Controls & Presets */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 mb-10 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="w-full md:w-auto">
              <label className="text-xs uppercase font-bold text-industrial-400 tracking-wider block mb-2">
                Select or Enter Any Job Price (₹ INR)
              </label>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-orange-500 font-mono">₹</span>
                <input
                  type="number"
                  min="50"
                  max="100000"
                  step="50"
                  value={price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="bg-industrial-950 border border-industrial-700 focus:border-orange-500 rounded-xl px-4 py-2 text-xl font-bold font-mono text-white w-40 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Quick preset pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {presets.map((p) => (
                <button
                  key={p.value}
                  onClick={() => handlePriceChange(p.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    price === p.value
                      ? "bg-orange-500 text-white shadow-weld-glow"
                      : "bg-industrial-850 text-industrial-300 hover:bg-industrial-800 hover:text-white border border-industrial-700/60"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Percentage Progress Stack */}
          {data && (
            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-industrial-400 mb-2">
                <span>Direct Operating Costs (Tools, Wear, Power, Transport): <strong className="text-industrial-200">₹{data.total_operating_cost} (88%)</strong></span>
                <span>Net Welder Margin: <strong className="text-teal-400">₹{data.net_profit} (12%)</strong></span>
              </div>
              <div className="h-5 w-full bg-industrial-950 rounded-lg overflow-hidden flex shadow-inner border border-industrial-800">
                {data.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    title={`${item.item}: ₹${item.amount} (${item.percentage}%)`}
                    className="h-full transition-all duration-500 relative group cursor-pointer"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detailed Item Cards Grid */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {data.items.map((item, index) => (
              <div
                key={index}
                className="bg-industrial-900/90 border border-industrial-800 hover:border-industrial-700 rounded-xl p-4 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-industrial-950 border border-industrial-800">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-xs font-semibold text-industrial-200">
                      {item.item}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-industrial-950 border border-industrial-800" style={{ color: item.color }}>
                    {item.percentage}%
                  </span>
                </div>

                <div className="text-xl font-black font-mono text-white mb-2">
                  ₹{item.amount.toLocaleString()}
                </div>

                <p className="text-[11px] text-industrial-400 leading-relaxed group-hover:text-industrial-300 transition-colors">
                  {item.reality}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Reality Takeaway Callout Box */}
        {data && (
          <div className="bg-gradient-to-r from-orange-950/60 via-industrial-900 to-industrial-900 border border-orange-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  The Key Takeaway for Customers & Fabricators
                </h3>
                <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed max-w-3xl">
                  {data.takeaway_message} Welding is not just a person holding a torch — it is an active factory running on site that consumes equipment depreciation, high voltage electric currents, protective gas, and abrasive discs.
                </p>
              </div>
            </div>
            <a
              href="/calculator"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-weld-glow transition-all"
            >
              <span>Calculate Custom Job</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

