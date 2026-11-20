import React from "react";
import { Link } from "react-router-dom";
import { Cpu, ShieldCheck, Layers, FileCode } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-industrial-950 border-t border-industrial-800 text-industrial-400 text-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Top Technical Formula Bar */}
        <div className="mb-8 p-4 bg-industrial-900 border border-industrial-800 rounded-sm font-mono text-[11px] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-industrial-300">
            <FileCode className="w-4 h-4 text-forge-400 shrink-0" />
            <span className="font-bold text-white uppercase">Standard Cost Formula:</span>
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
          {/* Col 1: System Identification */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-xs bg-industrial-900 border border-industrial-700 flex items-center justify-center text-forge-400">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-black text-white font-mono tracking-wider uppercase">
                Weld<span className="text-forge-400">Cost</span>
              </span>
            </div>
            <p className="text-[11px] text-industrial-400 leading-relaxed">
              Industrial price modeling suite designed to bridge the transparency gap in metal fabrication by itemizing equipment depreciation, energy draw, abrasive wear, and certified artisan labour.
            </p>
            <div className="text-[10px] font-mono text-industrial-500">
              STATUS: PRODUCTION • REGISTRY ACTIVE
            </div>
          </div>

          {/* Col 2: Engineering Calculators */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5 font-mono">
              Calculation Engines
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/calculator" className="hover:text-forge-400 transition-colors">
                  Multi-Process Cost Engine (Arc, MIG, TIG)
                </Link>
              </li>
              <li>
                <Link to="/#why-500" className="hover:text-forge-400 transition-colors">
                  Cost Decomposition Ledger ("Why ₹500?")
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-forge-400 transition-colors">
                  Industrial Equipment Amortization Catalog
                </Link>
              </li>
              <li>
                <Link to="/why-does-it-cost" className="hover:text-forge-400 transition-colors">
                  Cost Structure & "1-Hour Illusion" Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Categories */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5 font-mono">
              Fabrication Standards
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/price-guide" className="hover:text-forge-400 transition-colors">
                  Architectural Entrance Gates & Portals
                </Link>
              </li>
              <li>
                <Link to="/price-guide" className="hover:text-forge-400 transition-colors">
                  Window Enclosures & Safety Railings
                </Link>
              </li>
              <li>
                <Link to="/price-guide" className="hover:text-forge-400 transition-colors">
                  Structural Staircases & Stringer Channels
                </Link>
              </li>
              <li>
                <Link to="/quote-generator" className="text-forge-400 hover:text-forge-300 font-medium">
                  Generate Formal Engineering Quotation →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Artisan Console */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-2.5 font-mono">
              Fabricator Portal
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/welder-dashboard" className="text-industrial-300 hover:text-forge-400 transition-colors">
                  Welder Mode Operating Console
                </Link>
              </li>
              <li>
                <Link to="/welder-dashboard" className="hover:text-forge-400 transition-colors">
                  Minimum Profitable Price Engine
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-forge-400 transition-colors">
                  Central Benchmark Settings Registry
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-forge-400 transition-colors">
                  Account Sign In / Switch Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Technical Line */}
        <div className="pt-6 border-t border-industrial-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-industrial-500 font-mono gap-3">
          <p>© {new Date().getFullYear()} WeldCost Systems. Engineering cost modeling software.</p>
          <div className="flex items-center gap-1.5 text-industrial-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Industrial Engineering Benchmark Engine</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
