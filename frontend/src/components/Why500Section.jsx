import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { 
  ArrowRight, 
  Cpu, 
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
    { label: "₹300 (Exhaust Patch)", value: 300 },
    { label: "₹500 (Gate Hinge Fix)", value: 500 },
    { label: "₹1,200 (Grill Reinforcement)", value: 1200 },
    { label: "₹2,500 (Door Subframe)", value: 2500 },
    { label: "₹5,000 (Sliding Track Overhaul)", value: 5000 },
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
    <section id="why-500" className="py-16 bg-industrial-950 border-t border-b border-industrial-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] uppercase font-bold text-forge-400">
              <span className="inline-block w-2 h-2 bg-forge-500 rounded-xs"></span>
              <span>Module 04 // Empirical Cost Audit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Does a ₹{price.toLocaleString()} Weld Cost ₹{price.toLocaleString()}?
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-industrial-400 max-w-2xl">
              Customers frequently assume a 45-minute repair is pure income. This engineering ledger demonstrates where each rupee actually goes.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-industrial-400 uppercase">Input Amount:</span>
            <div className="flex items-center bg-industrial-900 border border-industrial-750 px-3 py-1.5 rounded-sm">
              <span className="text-forge-400 font-mono text-xs font-bold mr-1">₹</span>
              <input
                type="number"
                min="50"
                max="100000"
                step="50"
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-24 bg-transparent font-mono font-bold text-sm text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preset Selector Strip */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 p-2 bg-industrial-900 border border-industrial-800 rounded-sm">
          <span className="text-[11px] font-mono text-industrial-400 px-2 shrink-0">
            Standard Task Benchmarks:
          </span>
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePriceChange(p.value)}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs transition-colors ${
                price === p.value
                  ? "bg-industrial-800 text-white border border-industrial-600 font-bold"
                  : "bg-industrial-950 text-industrial-400 hover:text-white border border-industrial-800"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Proportional Technical Stack Bar */}
        {data && (
          <div className="mb-6 p-4 bg-industrial-900 border border-industrial-800 rounded-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-industrial-400">
                Direct Operating Recovery: <strong className="text-white">₹{data.total_operating_cost.toLocaleString()} (88%)</strong>
              </span>
              <span className="text-emerald-400 font-semibold">
                Net Retained Margin: ₹{data.net_profit.toLocaleString()} (12%)
              </span>
            </div>

            <div className="h-3 w-full bg-industrial-950 rounded-xs overflow-hidden flex border border-industrial-750">
              <div style={{ width: '88%' }} className="bg-industrial-700 h-full border-r border-industrial-600" title="Operating Cost: 88%" />
              <div style={{ width: '12%' }} className="bg-forge-500 h-full" title="Net Margin: 12%" />
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-industrial-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-industrial-700 rounded-xs inline-block"></span>
                  <span>Hard Costs (Depreciation, Grid Power, Filler Metals, Discs, Transport)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-forge-500 rounded-xs inline-block"></span>
                  <span>Retained Profit (12%)</span>
                </span>
              </div>
              <span>Total: ₹{price.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Detailed Decomposition Table */}
        {data && (
          <div className="bg-industrial-900 border border-industrial-750 rounded-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-industrial-850 border-b border-industrial-750 text-[10px] font-mono text-industrial-400 uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-semibold">Cost Component</th>
                    <th className="py-2.5 px-3 font-mono font-semibold text-right">Share (%)</th>
                    <th className="py-2.5 px-4 font-mono font-semibold text-right">Amount (₹)</th>
                    <th className="py-2.5 px-4 font-semibold">Engineering Factor & Asset Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-800 font-sans text-xs">
                  {data.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-industrial-850/40 transition-colors">
                      <td className="py-2.5 px-4 font-medium text-white">
                        {item.item}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-right text-industrial-400">
                        {item.percentage}%
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-right text-white">
                        ₹{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-2.5 px-4 text-industrial-400 text-[11px] leading-relaxed">
                        {item.reality}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Engineering Takeaway Summary Callout */}
        {data && (
          <div className="p-4 bg-industrial-900 border-l-2 border-l-forge-500 border border-industrial-800 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-forge-400">
                AUDIT CONCLUSION
              </span>
              <p className="text-xs text-industrial-300 max-w-3xl leading-relaxed">
                {data.takeaway_message} Welding equipment operates like an on-site factory drawing high utility currents and consuming heavy asset depreciation. Quoting below this threshold causes the fabricator to subsidize the job out of their family income.
              </p>
            </div>
            <a
              href="/calculator"
              className="shrink-0 px-4 py-2 bg-industrial-800 hover:bg-industrial-750 text-white font-mono font-semibold text-xs rounded-sm border border-industrial-700 transition-colors flex items-center gap-1.5"
            >
              <span>Test Custom Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
