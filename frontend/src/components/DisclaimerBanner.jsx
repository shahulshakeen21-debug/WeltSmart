import React, { useState } from "react";
import { Info, X, ShieldAlert } from "lucide-react";

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#0a0d12] border-b border-[#1b212d] text-[11px] text-industrial-400 font-mono py-2 px-4 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="inline-flex items-center gap-1 text-orange-400 font-semibold tracking-wider uppercase text-[10px] shrink-0 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-full">
            <ShieldAlert className="w-3 h-3 text-orange-400" />
            BENCHMARK
          </span>
          <p className="truncate text-industrial-400">
            Calculations reflect current market indices, commercial power tariffs (₹9.50/kWh), and amortized machine tool wear. Final quotations vary by joint geometry, metal thickness & artisan experience.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-industrial-500 hover:text-industrial-200 transition-colors shrink-0 p-1 rounded-full hover:bg-industrial-800"
          aria-label="Dismiss disclaimer"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
