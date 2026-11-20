import React from "react";

export default function MetricCard({ title, value, subtitle, icon: Icon, badge, color = "orange", code }) {
  const accentBorder = color === "emerald" 
    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" 
    : "border-forge-500/30 text-forge-400 bg-forge-500/10";

  return (
    <div className="bg-industrial-900 border border-industrial-750 rounded-sm p-4 hover:border-industrial-700 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {code && (
              <span className="text-[9px] font-mono font-semibold text-industrial-500 uppercase tracking-wider">
                {code}
              </span>
            )}
            <span className="text-[11px] font-semibold text-industrial-400 uppercase tracking-wider block font-mono">
              {title}
            </span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
            {value}
          </div>

          {subtitle && (
            <div className="text-[11px] text-industrial-400">
              {subtitle}
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-2 rounded-xs border ${accentBorder} shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {badge && (
        <div className="mt-3 pt-2.5 border-t border-industrial-800 flex items-center justify-between text-[10px] font-mono">
          <span className="text-industrial-500">{badge.label}</span>
          <span className="font-semibold text-emerald-400">{badge.value}</span>
        </div>
      )}
    </div>
  );
}
