import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ShieldCheck, 
  Zap, 
  Hammer, 
  Cpu, 
  Truck, 
  FileText, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function CostBreakdownCard({ data, onSaveQuote, isSaving }) {
  const [showFormulas, setShowFormulas] = useState(false);

  if (!data) return null;

  const costItems = [
    { label: "Material Cost", amount: data.material_cost, key: "material", color: "text-blue-400" },
    { label: "Electrode / Wire Cost", amount: data.electrode_wire_cost, key: "electrode_wire", color: "text-amber-400" },
    { label: "Electricity Cost", amount: data.electricity_cost, key: "electricity", color: "text-yellow-400" },
    { label: "Gas Cost", amount: data.gas_cost, key: "gas", color: "text-cyan-400" },
    { label: "Grinding / Cutting", amount: data.grinding_cutting_cost, key: "grinding_cutting", color: "text-purple-400" },
    { label: "Machine Usage & Wear", amount: data.machine_usage_cost, key: "machine_usage", color: "text-indigo-400" },
    { label: "Labour Cost", amount: data.labour_cost, key: "labour", color: "text-orange-400" },
    { label: "Transportation", amount: data.transport_cost, key: "transport", color: "text-emerald-400" },
    { label: "Other Expenses & Safety", amount: data.other_expenses_cost, key: "other_expenses", color: "text-rose-400" },
  ];

  return (
    <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative accent spark */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-industrial-800 mb-6">
        <div>
          <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest block">
            Transparent Cost Engine
          </span>
          <h3 className="text-xl font-black text-white tracking-tight">
            Itemized Cost Breakdown
          </h3>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Fair Trade Model</span>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="space-y-3 font-mono text-sm mb-6">
        {costItems.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-1 border-b border-industrial-850">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${item.color.replace('text-', 'bg-')}`}></span>
              <span className="text-industrial-300 font-sans text-xs sm:text-sm">{item.label}</span>
            </div>
            <span className="font-bold text-white tracking-wide">
              ₹{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>

      {/* Operating Cost Subtotal */}
      <div className="bg-industrial-950/80 rounded-xl p-4 border border-industrial-800 mb-6 font-mono space-y-2">
        <div className="flex items-center justify-between text-xs text-industrial-400">
          <span>Total Operating Cost (Zero Margin):</span>
          <span className="font-bold text-industrial-200">
            ₹{data.total_operating_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-teal-400">
          <span>Reasonable Service / Profit Margin:</span>
          <span className="font-bold">
            + ₹{data.profit_margin_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="pt-2 border-t border-industrial-800 flex items-center justify-between text-base font-sans">
          <span className="font-extrabold text-white">Recommended Customer Price:</span>
          <span className="text-2xl font-black text-orange-400 font-mono">
            ₹{data.recommended_price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>

      {/* Save as Official Quotation Button */}
      {onSaveQuote && (
        <button
          onClick={onSaveQuote}
          disabled={isSaving}
          className="w-full py-3 mb-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm tracking-wide shadow-weld-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FileText className="w-4 h-4" />
          <span>{isSaving ? "Generating Official Quote..." : "Generate & Save Official Quotation"}</span>
        </button>
      )}

      {/* Collapsible Mathematical Formula Inspector */}
      <div className="pt-2 border-t border-industrial-800">
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="w-full flex items-center justify-between text-xs font-semibold text-industrial-400 hover:text-orange-400 transition-colors py-2"
        >
          <span className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>How were these numbers calculated? (Formula Inspector)</span>
          </span>
          {showFormulas ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFormulas && data.explanations && (
          <div className="mt-3 space-y-2 p-3 bg-industrial-950 rounded-xl border border-industrial-800 text-[11px] text-industrial-300">
            {Object.entries(data.explanations).map(([key, explanation], idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-orange-400 font-bold uppercase shrink-0 font-mono">[{key}]:</span>
                <span className="leading-relaxed">{explanation}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Disclaimer statement */}
      <div className="mt-4 text-[10px] text-industrial-500 leading-normal italic">
        * {data.disclaimer}
      </div>
    </div>
  );
}

