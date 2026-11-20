import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { 
  ArrowRight, 
  HelpCircle,
  FileCheck2,
  Sliders,
  DollarSign
} from "lucide-react";

export default function Why500Section() {
  const [price, setPrice] = useState(500);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const presets = [
    { label: "₹300 (Patch Weld)", value: 300 },
    { label: "₹500 (Gate Hinge Fix)", value: 500 },
    { label: "₹1,200 (Grill Reinforce)", value: 1200 },
    { label: "₹2,500 (Door Subframe)", value: 2500 },
    { label: "₹5,000 (Track Overhaul)", value: 5000 },
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

  return (
    <div id="why-500" className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
              EMPIRICAL COST AUDIT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Why Does a ₹{price.toLocaleString()} Weld Cost ₹{price.toLocaleString()}?
          </h2>
          <p className="text-xs sm:text-sm text-industrial-400 mt-1 max-w-2xl leading-relaxed">
            Customers often assume that a 15-minute welding job costs the welder nothing. This mathematical decomposition reveals the exact 8 expenses consumed behind every invoice.
          </p>
        </div>

        {/* Quick Amount Presets */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePriceChange(p.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                price === p.value
                  ? "bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20"
                  : "bg-[#121620] border border-[#1f2633] text-industrial-400 hover:text-white hover:border-orange-500/40"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Audit Card */}
      <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-6 shadow-xl space-y-6">
        
        {/* Custom Price Slider */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#1b212d]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-mono text-industrial-400 uppercase">Input Billed Quote:</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 font-mono text-xs font-bold">₹</span>
              <input
                type="number"
                min="100"
                step="50"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="bg-[#0c0f14] border border-[#1f2633] rounded-xl pl-6 pr-3 py-1.5 text-xs font-mono text-white w-32 focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400">
            <span>Net Artisan Retention:</span>
            <strong className="text-emerald-400 font-bold text-sm">
              ₹{data?.breakdown?.find(b => b.key === "profit")?.amount || Math.round(price * 0.12)}
            </strong>
            <span className="text-[10px] text-industrial-500">
              (~{data?.breakdown?.find(b => b.key === "profit")?.pct || 12}%)
            </span>
          </div>
        </div>

        {/* Proportional Cost Bar */}
        {data && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-industrial-400">
              <span>EXPENSE CONSUMPTION SPECTRUM</span>
              <span>100% AUDIT</span>
            </div>
            
            <div className="h-5 w-full bg-[#0c0f14] rounded-full overflow-hidden flex border border-[#1f2633]">
              {data.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  className="h-full relative group transition-all duration-300 hover:opacity-90"
                  title={`${item.label}: ₹${item.amount} (${item.pct}%)`}
                />
              ))}
            </div>

            {/* Micro Legend */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-mono">
              {data.breakdown.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-industrial-300">{item.label}</span>
                  <span className="text-industrial-500">₹{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Breakdown Items Grid */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            {data.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0c0f14]/80 border border-[#1b212d] rounded-xl p-3.5 space-y-2 hover:border-orange-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate pr-2">{item.label}</span>
                  <span
                    className="font-mono text-xs font-bold shrink-0"
                    style={{ color: item.color }}
                  >
                    ₹{item.amount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-industrial-400">
                  <span>Share</span>
                  <span>{item.pct}%</span>
                </div>
                <p className="text-[11px] text-industrial-400 leading-snug line-clamp-2">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Insight Banner */}
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-orange-300">
            <HelpCircle className="w-4 h-4 shrink-0 text-orange-400" />
            <span>
              If a customer asks for a ₹200 discount on a ₹500 job, the welder actually operates at a net financial loss!
            </span>
          </div>
          <Link
            to="/why-does-it-cost"
            className="text-orange-400 hover:text-orange-300 font-bold inline-flex items-center gap-1 shrink-0"
          >
            <span>Read 1-Hour Illusion Whitepaper</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
