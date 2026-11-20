import React from "react";
import { Link } from "react-router-dom";
import { Flame, ShieldCheck, HeartHandshake, Compass, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-industrial-950 border-t border-industrial-800 text-industrial-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Weld<span className="text-orange-500">Cost</span>
              </span>
            </Link>
            <p className="text-xs text-industrial-400 leading-relaxed">
              Empowering welders to charge fairly for equipment, consumables, electricity, and hard-earned artisan skills while showing customers the real engineering costs behind every weld.
            </p>
            <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
              <HeartHandshake className="w-4 h-4" />
              <span>Built for Fair Trade & Transparency</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Calculators & Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/calculator" className="hover:text-orange-400 transition-colors">
                  Interactive Cost Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-orange-400 transition-colors">
                  Welding Equipment Catalog
                </Link>
              </li>
              <li>
                <Link to="/why-does-it-cost" className="hover:text-orange-400 transition-colors">
                  Why Does Welding Cost So Much?
                </Link>
              </li>
              <li>
                <Link to="/#why-500" className="hover:text-orange-400 transition-colors">
                  "Why ₹500?" Cost Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Price Guide */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Welding Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/price-guide" className="hover:text-orange-400 transition-colors">
                  Gate & Main Entrance Fabrication
                </Link>
              </li>
              <li>
                <Link to="/price-guide" className="hover:text-orange-400 transition-colors">
                  Window Safety Grills & Railings
                </Link>
              </li>
              <li>
                <Link to="/price-guide" className="hover:text-orange-400 transition-colors">
                  Automotive Chassis & Silencer Fixes
                </Link>
              </li>
              <li>
                <Link to="/quote-generator" className="hover:text-orange-400 transition-colors text-orange-400 font-semibold">
                  Generate Customer Quote →
                </Link>
              </li>
            </ul>
          </div>

          {/* Welder Mode & Standards */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              For Artisans & Fabricators
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/welder-dashboard" className="hover:text-orange-400 transition-colors font-medium text-industrial-200">
                  Welder Mode Dashboard
                </Link>
              </li>
              <li>
                <Link to="/welder-dashboard" className="hover:text-orange-400 transition-colors">
                  Minimum Profitable Price Engine
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-orange-400 transition-colors">
                  Central Rates & Benchmarks
                </Link>
              </li>
              <li>
                <div className="mt-3 p-2.5 rounded-lg bg-industrial-900 border border-industrial-800 text-[11px] text-industrial-400">
                  <span className="text-white font-medium block mb-1">Standard Cost Formula</span>
                  Total = Material + Consumables + Machine + Power + Labour + Transport + Margin
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 mt-8 border-t border-industrial-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-industrial-500 gap-4">
          <p>© {new Date().getFullYear()} WeldCost Platform. Transparency in Welding & Metal Fabrication.</p>
          <p className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Industrial Engineering Benchmark Engine</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

