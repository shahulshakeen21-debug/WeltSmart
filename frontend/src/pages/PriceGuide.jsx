import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Wrench, 
  Layers, 
  ArrowRight, 
  AlertCircle, 
  Sparkles,
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

  const handleLaunchCalculator = (service) => {
    navigate("/calculator");
  };

  return (
    <div className="min-h-screen bg-industrial-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Market Reference Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Welding Service Price Guide
          </h1>
          <p className="mt-2 text-sm sm:text-base text-industrial-300">
            Estimated market price benchmarks across 10 common welding and fabrication specializations. Use these as transparency references when evaluating quotes.
          </p>

          {/* Mandatory Disclaimer Box */}
          <div className="mt-5 p-4 bg-industrial-900 border border-orange-500/40 rounded-2xl text-left flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div className="text-xs text-industrial-300 leading-relaxed">
              <strong className="text-orange-400 uppercase tracking-wide block mb-0.5">
                Important Disclaimer:
              </strong>
              Prices are realistic market estimates and may vary according to material type (mild steel vs. stainless vs. aluminum), gauge thickness, architectural complexity, location, welder certification, consumables used, and prevailing steel tariffs. Never treat these as fixed statutory prices.
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-industrial-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, materials or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-industrial-950 border border-industrial-700 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-industrial-500 outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white shadow-weld-glow"
                    : "bg-industrial-950 text-industrial-400 hover:text-white border border-industrial-800 hover:border-industrial-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services List */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-12 text-center text-industrial-400">
            <h3 className="text-base font-bold text-white mb-1">No Services Found</h3>
            <p className="text-xs">Try searching for other terms like 'Gate', 'Grill', or 'Pipe'.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-orange-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div className="space-y-4">
                  {/* Top metadata */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-industrial-950 border border-industrial-800 text-orange-400">
                      {srv.category}
                    </span>
                    <span className="text-xs font-mono text-industrial-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-industrial-500" />
                      <span>~{srv.typical_duration_hours} Hours</span>
                    </span>
                  </div>

                  {/* Service Title */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-industrial-300 mt-1.5 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  {/* Estimated Price Range Highlight */}
                  <div className="p-4 bg-industrial-950 rounded-xl border border-industrial-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-industrial-400 uppercase tracking-wider block">
                        Estimated Market Range
                      </span>
                      <div className="text-xl font-black text-orange-400 font-mono">
                        ₹{srv.min_price.toLocaleString()} – ₹{srv.max_price.toLocaleString()}
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-industrial-400 px-2.5 py-1 rounded bg-industrial-900 border border-industrial-800">
                      {srv.complexity} Complexity
                    </span>
                  </div>

                  {/* Engineering Specifications */}
                  <div className="space-y-1.5 text-xs text-industrial-400">
                    {srv.typical_materials && (
                      <div className="flex items-start gap-2">
                        <Layers className="w-3.5 h-3.5 text-industrial-500 shrink-0 mt-0.5" />
                        <span><strong className="text-industrial-300">Common Materials:</strong> {srv.typical_materials}</span>
                      </div>
                    )}
                    {srv.recommended_welding_type && (
                      <div className="flex items-start gap-2">
                        <Zap className="w-3.5 h-3.5 text-industrial-500 shrink-0 mt-0.5" />
                        <span><strong className="text-industrial-300">Recommended Process:</strong> {srv.recommended_welding_type}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-industrial-800 flex items-center justify-between gap-3">
                  <Link
                    to={`/quote-generator?service=${encodeURIComponent(srv.name)}`}
                    className="flex-1 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs tracking-wide text-center transition-colors shadow-weld-glow"
                  >
                    Generate Quote for This Service
                  </Link>
                  <Link
                    to="/calculator"
                    className="px-4 py-2 rounded-xl bg-industrial-950 hover:bg-industrial-850 text-industrial-300 hover:text-white border border-industrial-800 text-xs font-medium transition-colors"
                  >
                    Open Calculator
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

