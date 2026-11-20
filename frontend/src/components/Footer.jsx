import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Layers, FileCode } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0d12] border-t border-[#1b212d] text-industrial-400 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Formula Banner */}
        <div className="mb-8 p-4 bg-[#121620] border border-[#1f2633] rounded-2xl font-mono text-[11px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-industrial-300">
            <span className="w-1 h-3.5 bg-orange-500 rounded-full inline-block shrink-0" />
            <span className="font-bold text-white uppercase">Cost Transparency Equation:</span>
            <span className="text-industrial-400">
              Total = Material + Consumables + Machine Depreciation + Power + Labour + Transport + Margin
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-industrial-500 text-[10px]">
            <span>AWS D1.1 / ISO 5817 REF</span>
            <span>•</span>
            <span>TARIFF BASE: ₹9.50/kWh</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M4 10a8 8 0 0 1 16 0v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7z" />
                  <rect x="7" y="8" width="10" height="5" rx="1" />
                  <line x1="9" y1="17" x2="15" y2="17" />
                  <circle cx="4" cy="11" r="1" />
                  <circle cx="20" cy="11" r="1" />
                </svg>
              </div>
              <span className="font-black text-white font-sans tracking-wider uppercase text-sm">
                WELD<span className="text-orange-500">TECH</span>
              </span>
            </div>
            <p className="text-[11px] text-industrial-400 leading-relaxed">
              Industrial price modeling suite designed to bridge the transparency gap in metal fabrication by itemizing equipment depreciation, energy draw, abrasive wear, and certified artisan labour.
            </p>
            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>STATUS: PRODUCTION ONLINE</span>
            </div>
          </div>

          {/* Col 2: Calculation Engines */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Calculation Engines
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/calculator" className="hover:text-orange-400 transition-colors">
                  Multi-Process Cost Engine (Arc, MIG, TIG)
                </Link>
              </li>
              <li>
                <Link to="/#why-500" className="hover:text-orange-400 transition-colors">
                  Cost Decomposition Ledger ("Why ₹500?")
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-orange-400 transition-colors">
                  Industrial Equipment Amortization Catalog
                </Link>
              </li>
              <li>
                <Link to="/why-does-it-cost" className="hover:text-orange-400 transition-colors">
                  Cost Structure & "1-Hour Illusion" Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Fabrication Standards
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/price-guide" className="hover:text-orange-400 transition-colors">
                  Architectural Entrance Gates & Portals
                </Link>
              </li>
              <li>
                <Link to="/price-guide" className="hover:text-orange-400 transition-colors">
                  Window Enclosures & Safety Railings
                </Link>
              </li>
              <li>
                <Link to="/price-guide" className="hover:text-orange-400 transition-colors">
                  Structural Staircases & Stringer Channels
                </Link>
              </li>
              <li>
                <Link to="/quote-generator" className="text-orange-400 hover:text-orange-300 font-semibold">
                  Generate Formal Engineering Quotation →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Welder Mode & Admin Access */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Operator Portal
            </h4>
            <p className="text-[11px] text-industrial-400 leading-relaxed mb-3">
              Welders can register their workshops, set specific machinery tariffs, calculate anti-undercharging break-evens, and download professional client quotes.
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/welder-dashboard"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-400 text-xs font-bold transition-all border border-orange-500/30 text-center"
              >
                Launch Welder Mode
              </Link>
              <Link
                to="/login"
                className="text-industrial-500 hover:text-industrial-300 text-[10px] text-center"
              >
                Sign In to Workshop Account
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="pt-6 border-t border-[#1b212d] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-industrial-500">
          <div>
            © {new Date().getFullYear()} WELDTECH – Smart Welding System & Cost Platform. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Engineering Transparency</span>
            <span>•</span>
            <span>ISO 5817 & AWS D1.1</span>
            <span>•</span>
            <span>Zero Loss Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
