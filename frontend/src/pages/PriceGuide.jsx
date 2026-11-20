import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { 
  BookOpen, 
  Search, 
  Clock, 
  Layers, 
  ArrowRight, 
  ShieldAlert,
  Zap
} from "lucide-react";

export default function PriceGuide() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Architectural",
    "Structural",
    "Industrial",
    "Automotive",
    "Heavy Equipment",
    "Fabrication",
    "Decorative",
    "Artistic"
  ];

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      try {
        const data = await api.getServices({
          search: search.trim() || undefined,
          category: selectedCategory !== "All" ? selectedCategory : undefined,
        });
        setServices(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    const timer = setTimeout(loadServices, 200);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-industrial-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-industrial-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-[10px] font-mono font-bold text-forge-400 uppercase">
              <span className="w-2 h-2 bg-forge-500 rounded-xs"></span>
              <span>MARKET BENCHMARK SPECIFICATION // SERVICE DIRECTORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welding & Metal Fabrication Service Matrix
            </h1>
            <p className="mt-1 text-xs text-industrial-400 max-w-2xl leading-relaxed">
              Empirical cost benchmarks for 10 common fabrication specializations. Use these ranges as baseline reference models when scoping and verifying contractor estimates.
            </p>
          </div>

          <div className="p-3 bg-industrial-900 border border-industrial-750 rounded-sm text-[11px] font-mono text-industrial-400 max-w-xs">
            <span className="text-forge-400 font-bold block mb-0.5">ESTIMATE DISCLAIMER:</span>
            Prices represent market approximations. Final contractual amounts depend on design complexity, metal gauge, site access, and artisan certification.
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-industrial-900 border border-industrial-750 rounded-sm p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-panel">
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by service, metallurgy, keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-industrial-950 border border-industrial-750 focus:border-forge-500 rounded-xs pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-industrial-500 outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 w-full md:w-auto font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-xs transition-colors ${
                  selectedCategory === cat
                    ? "bg-industrial-800 text-white border border-industrial-600 font-bold"
                    : "bg-industrial-950 text-industrial-400 hover:text-white border border-industrial-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services List Matrix */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-xs h-8 w-8 border-t-2 border-b-2 border-forge-500"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-industrial-900 border border-industrial-800 rounded-sm p-12 text-center text-industrial-400 font-mono text-xs">
            <div className="text-white font-bold">No Matching Service Category Found</div>
            <div className="text-industrial-500 mt-1">Try resetting the filter or searching for terms like 'Gate' or 'Pipe'.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-industrial-900 border border-industrial-750 hover:border-industrial-600 rounded-sm p-5 flex flex-col justify-between transition-colors shadow-panel"
              >
                <div className="space-y-3">
                  {/* Top Metadata */}
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-forge-400 font-semibold uppercase tracking-wider">
                      PKG-{srv.id.toString().padStart(2, '0')} // {srv.category}
                    </span>
                    <span className="text-industrial-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>~{srv.typical_duration_hours} hrs duration</span>
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-industrial-400 mt-1 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {/* Price Specification Ledger Box */}
                  <div className="p-3 bg-industrial-950 rounded-xs border border-industrial-800 flex items-center justify-between font-mono">
                    <div>
                      <span className="text-[10px] text-industrial-500 uppercase block">
                        Estimated Market Range (₹)
                      </span>
                      <div className="text-base font-bold text-white">
                        ₹{srv.min_price.toLocaleString()} – ₹{srv.max_price.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-industrial-500 uppercase block">Complexity</span>
                      <span className="text-xs font-semibold text-industrial-300">{srv.complexity}</span>
                    </div>
                  </div>

                  {/* Materials & Process Spec */}
                  <div className="space-y-1 text-xs text-industrial-400 font-sans border-t border-industrial-800/80 pt-2.5">
                    {srv.typical_materials && (
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="font-mono text-industrial-500 uppercase shrink-0 text-[10px]">MATERIALS:</span>
                        <span className="text-industrial-300">{srv.typical_materials}</span>
                      </div>
                    )}
                    {srv.recommended_welding_type && (
                      <div className="flex items-start gap-2 text-[11px]">
                        <span className="font-mono text-industrial-500 uppercase shrink-0 text-[10px]">PROCESS:</span>
                        <span className="text-forge-400 font-mono">{srv.recommended_welding_type}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-4 pt-3 border-t border-industrial-800 flex items-center justify-between gap-2 font-mono text-xs">
                  <Link
                    to={`/quote-generator?service=${encodeURIComponent(srv.name)}`}
                    className="flex-1 py-1.5 rounded-xs bg-forge-600 hover:bg-forge-500 text-white font-bold text-center transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Generate Quote For This Spec
                  </Link>
                  <Link
                    to="/calculator"
                    className="px-3 py-1.5 rounded-xs bg-industrial-950 hover:bg-industrial-850 text-industrial-400 hover:text-white border border-industrial-800 transition-colors uppercase tracking-wider text-[11px]"
                  >
                    Open Engine
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
