import React, { useState } from "react";
import { Info, X, ShieldAlert } from "lucide-react";

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-industrial-900 border-b border-industrial-750 text-[11px] text-industrial-400 font-mono py-1.5 px-4 no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="inline-flex items-center gap-1 text-forge-400 font-semibold tracking-wider uppercase text-[10px] shrink-0 bg-forge-500/10 border border-forge-500/30 px-1.5 py-0.5 rounded-xs">
            <ShieldAlert className="w-3 h-3 text-forge-400" />
            BENCHMARK SPEC
          </span>
          <p className="truncate text-industrial-300">
            Calculations reflect current market material indices, commercial power tariffs (₹9.50/kWh), and amortized machine tool wear. Final contract quotations vary with joint geometry, metal thickness, and artisan experience.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-industrial-500 hover:text-industrial-200 transition-colors shrink-0 p-0.5"
          aria-label="Dismiss disclaimer"
          title="Dismiss notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
