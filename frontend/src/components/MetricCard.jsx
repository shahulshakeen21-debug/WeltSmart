import React from "react";

export default function MetricCard({ title, value, subtitle, icon: Icon, badge, color = "orange" }) {
  const colorMap = {
    orange: "text-orange-500 bg-orange-500/10 border-orange-500/30",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    blue: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    emerald: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    purple: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  };

  return (
    <div className="bg-industrial-900/80 border border-industrial-800 rounded-xl p-5 hover:border-industrial-700 transition-all relative overflow-hidden group">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-industrial-400 uppercase tracking-wider block mb-1">
            {title}
          </span>
          <div className="text-2xl font-black text-white font-mono tracking-tight">
            {value}
          </div>
          {subtitle && (
            <div className="text-xs text-industrial-400 mt-1 flex items-center gap-1.5">
              {subtitle}
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg border ${colorMap[color] || colorMap.orange} group-hover:scale-110 transition-transform`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {badge && (
        <div className="mt-3 pt-3 border-t border-industrial-800/80 flex items-center justify-between text-[11px]">
          <span className="text-industrial-400">{badge.label}</span>
          <span className="font-semibold text-emerald-400">{badge.value}</span>
        </div>
      )}
    </div>
  );
}

