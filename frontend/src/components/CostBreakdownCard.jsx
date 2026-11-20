import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  FileText,
  Info,
  FileSpreadsheet
} from "lucide-react";

export default function CostBreakdownCard({ data, onSaveQuote, isSaving }) {
  const [showFormulas, setShowFormulas] = useState(false);

  if (!data) return (
    <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 min-h-[300px] text-center shadow-xl">
      <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
        <FileSpreadsheet className="w-6 h-6 text-orange-400 opacity-60" />
      </div>
      <p className="text-xs text-industrial-400 font-mono">Configure process parameters to generate the cost ledger</p>
    </div>
  );

  const costItems = [
    { code: "BOM-01", label: "Base Metal Stock", amount: data.material_cost, desc: "Raw plate, SHS, angle section" },
    { code: "CON-01", label: "Electrode / Wire Depletion", amount: data.electrode_wire_cost, desc: "Filler rods / wire deposited" },
    { code: "ENG-01", label: "Electric Arc Power Draw", amount: data.electricity_cost, desc: "Commercial utility tariff" },
    { code: "GAS-01", label: "Shielding Gas Volume", amount: data.gas_cost, desc: "Compressed Argon / CO2" },
    { code: "ABR-01", label: "Grinding & Cutting Discs", amount: data.grinding_cutting_cost, desc: "Abrasive wheel erosion" },
    { code: "CAP-01", label: "Machine Tool Wear & Amortization", amount: data.machine_usage_cost, desc: "Inverter depreciation + service" },
    { code: "LAB-01", label: "Welder Skilled Labour", amount: data.labour_cost, desc: "Prep, fitup, root & cap passes" },
    { code: "LOG-01", label: "Logistics & Tooling Haulage", amount: data.transport_cost, desc: "Equipment & vehicle carriage" },
    { code: "OHD-01", label: "Safety PPE & Consumable Buffer", amount: data.other_expenses_cost, desc: "Lenses, gloves, flux, shop buffer" },
  ];

  return (
    <div className="bg-[#121620] border border-[#1f2633] rounded-2xl overflow-hidden shadow-xl">

      {/* Technical Header */}
      <div className="bg-[#161c28] px-5 py-3.5 border-b border-[#1f2633] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Engineering Cost Ledger
            </h3>
            <span className="text-[10px] text-industrial-400 font-mono">
              SPEC-ID: EST-{Math.round(data.recommended_price % 10000)} • ISO 5817
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 text-[10px] font-mono font-semibold">
          <ShieldCheck className="w-3 h-3" />
          VERIFIED BOM
        </span>
      </div>

      {/* Itemized Table */}
      <div className="p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1b212d] text-[10px] text-industrial-500 uppercase tracking-wider text-left">
                <th className="pb-2 font-semibold">Code</th>
                <th className="pb-2 font-semibold">Cost Vector</th>
                <th className="pb-2 text-right font-semibold">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b212d]">
              {costItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#161c28] transition-colors">
                  <td className="py-2.5 text-[10px] text-orange-500/70 pr-3 shrink-0">
                    {item.code}
                  </td>
                  <td className="py-2.5">
                    <div className="text-industrial-200 font-sans font-medium text-xs">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-industrial-500 font-sans">
                      {item.desc}
                    </div>
                  </td>
                  <td className="py-2.5 text-right font-bold text-white">
                    ₹{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Operating Subtotal & Final Margin Reconciliation */}
        <div className="bg-[#0c0f14] border border-[#1f2633] rounded-2xl p-4 font-mono text-xs space-y-2.5">
          <div className="flex items-center justify-between text-industrial-400">
            <span>Direct Operating Cost (Zero Margin):</span>
            <span className="font-semibold text-industrial-200">
              ₹{data.total_operating_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between text-emerald-400">
            <span>Trade Service / Operating Margin:</span>
            <span className="font-semibold">
              + ₹{data.profit_margin_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="pt-3 border-t border-[#1f2633] flex items-center justify-between">
            <div>
              <span className="font-bold text-white block text-xs uppercase tracking-wide">Recommended Invoice Price</span>
              <span className="text-[10px] text-industrial-500 font-mono">Tax / Site Contingencies Not Included</span>
            </div>
            <span className="text-2xl font-bold text-orange-500 font-mono tracking-tight">
              ₹{Math.round(data.recommended_price).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Button */}
        {onSaveQuote && (
          <button
            onClick={onSaveQuote}
            disabled={isSaving}
            className="w-full py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-orange-500/25"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isSaving ? "GENERATING QUOTE SHEET..." : "Create Formal Quotation"}</span>
          </button>
        )}

        {/* Expandable Formula Inspector */}
        <div className="border-t border-[#1b212d] pt-3">
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className="w-full flex items-center justify-between text-[11px] font-mono text-industrial-400 hover:text-industrial-200 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-industrial-500" />
              <span>Inspection of Mathematical Models</span>
            </span>
            {showFormulas ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showFormulas && data.explanations && (
            <div className="mt-2.5 p-3 bg-[#0c0f14] rounded-xl border border-[#1f2633] space-y-1.5 text-[10px] font-mono text-industrial-300">
              {Object.entries(data.explanations).map(([key, explanation], idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-orange-400 font-bold uppercase shrink-0">[{key}]:</span>
                  <span className="leading-relaxed text-industrial-400">{explanation}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Standard Disclaimer */}
        <div className="text-[10px] text-industrial-500 leading-normal font-sans border-t border-[#1b212d] pt-2">
          * {data.disclaimer}
        </div>
      </div>

    </div>
  );
}
