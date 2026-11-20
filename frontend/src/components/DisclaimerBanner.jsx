import React, { useState } from "react";
import { AlertTriangle, Info, X } from "lucide-react";

export default function DisclaimerBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-industrial-900/90 border-b border-orange-500/30 backdrop-blur-md px-4 py-2.5 text-xs text-industrial-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
            <Info className="w-3.5 h-3.5" />
          </span>
          <p>
            <strong className="text-orange-400 font-semibold tracking-wide uppercase mr-1.5">
              Price Transparency Notice:
            </strong>
            All calculations are realistic benchmark engineering cost models based on current metal rates, power tariffs, and tool wear. Final charges may vary with local complexity, metal thickness, and artisan experience.
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-industrial-400 hover:text-industrial-200 transition-colors p-1"
          aria-label="Dismiss disclaimer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

