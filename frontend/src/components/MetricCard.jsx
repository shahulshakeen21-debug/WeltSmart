import React from "react";

export default function MetricCard({ title, value, subtitle, icon: Icon, badge, color = "orange", code }) {
  const iconColor = {
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  }[color] || "text-orange-400 bg-orange-500/10 border-orange-500/20";

  return (
    <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-4 hover:border-orange-500/30 transition-all shadow-lg group">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 flex-1 min-w-0">
          {code && (
            <span className="text-[9px] font-mono font-semibold text-industrial-500 uppercase tracking-wider block">
              {code}
            </span>
          )}
          <span className="text-[11px] font-semibold text-industrial-400 uppercase tracking-wider block font-mono leading-snug">
            {title}
          </span>

          <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
            {value}
          </div>

          {subtitle && (
            <div className="text-[11px] text-industrial-400 leading-snug">
              {subtitle}
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-2 rounded-xl border ${iconColor} shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {badge && (
        <div className="mt-3 pt-2.5 border-t border-[#1b212d] flex items-center justify-between text-[10px] font-mono">
          <span className="text-industrial-500">{badge.label}</span>
          <span className="font-semibold text-emerald-400">{badge.value}</span>
        </div>
      )}
    </div>
  );
}
