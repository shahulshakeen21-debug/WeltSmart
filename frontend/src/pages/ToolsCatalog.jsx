import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { 
  Wrench, 
  Search, 
  Filter, 
  Info, 
  ShieldCheck, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  HelpCircle,
  AlertCircle
} from "lucide-react";

export default function ToolsCatalog() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalTool, setActiveModalTool] = useState(null);

  const categories = [
    "All",
    "Machines",
    "Safety",
    "Cutting/Grinding",
    "Consumables",
    "Accessories",
    "Gas Equipment",
    "Equipment"
  ];

  const fetchTools = async () => {
    setLoading(true);
    try {
      const data = await api.getTools({
        search: search.trim() || undefined,
        category: selectedCategory !== "All" ? selectedCategory : undefined,
      });
      setTools(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchTools, 200);
    return () => clearTimeout(timer);
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-industrial-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            Equipment & Tooling Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Welding Tools & Equipment Catalog
          </h1>
          <p className="mt-2 text-sm sm:text-base text-industrial-300">
            Explore the specialized industrial machinery, abrasive consumables, and life-critical protective gear that enable modern welding — and see why each contributes to every job invoice.
          </p>

          <div className="mt-4 p-3 bg-industrial-900 border border-orange-500/30 rounded-xl inline-flex items-center gap-2 text-xs text-orange-300 text-left">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              <strong>Market Estimate Notice:</strong> Tool prices represent current Indian industrial market benchmarks and vary by brand, rating (Amps), and local dealer availability.
            </span>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-industrial-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools, purpose, or wear explanation..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-industrial-950 border border-industrial-700 focus:border-orange-500 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-industrial-500 outline-none transition-colors"
            />
          </div>

          {/* Category Pills */}
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

        {/* Tools Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : tools.length === 0 ? (
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-12 text-center text-industrial-400">
            <Wrench className="w-10 h-10 mx-auto text-industrial-600 mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No Tools Found</h3>
            <p className="text-xs">Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-orange-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div>
                  {/* Tool Image with category badge */}
                  <div className="relative h-44 w-full bg-industrial-950 overflow-hidden">
                    <img
                      src={tool.image_url || "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"}
                      alt={tool.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-industrial-950/90 backdrop-blur-md text-orange-400 border border-orange-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {tool.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-industrial-950/90 text-white font-mono text-xs font-bold px-2 py-0.5 rounded border border-industrial-800">
                      ₹{tool.typical_price_min.toLocaleString()} – ₹{tool.typical_price_max.toLocaleString()}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-xs text-industrial-300 leading-relaxed line-clamp-2">
                      {tool.purpose}
                    </p>

                    {/* Lifespan & Wear Stats */}
                    <div className="bg-industrial-950 rounded-xl p-3 border border-industrial-800 text-[11px] font-mono grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-industrial-500 block text-[10px]">Expected Life</span>
                        <span className="text-industrial-200 font-semibold">{tool.expected_lifespan}</span>
                      </div>
                      <div>
                        <span className="text-industrial-500 block text-[10px]">Wear Contribution</span>
                        <span className="text-orange-400 font-bold">~₹{tool.approx_cost_per_job} / job</span>
                      </div>
                    </div>

                    {/* Why It Matters / Transparency Education */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-industrial-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Why It Contributes to Charges:</span>
                      </div>
                      <p className="text-xs text-industrial-400 leading-relaxed">
                        {tool.why_it_matters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="p-4 bg-industrial-950/60 border-t border-industrial-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-industrial-500 font-mono">
                    Depreciation: {tool.depreciation_formula ? "Calculated" : "Standard"}
                  </span>
                  <button
                    onClick={() => setActiveModalTool(tool)}
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                  >
                    <span>View Breakdown</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for Deep Tool Breakdown */}
        {activeModalTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-industrial-900 border border-industrial-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
              <button
                onClick={() => setActiveModalTool(null)}
                className="absolute top-4 right-4 text-industrial-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-xs font-bold">
                  {activeModalTool.category}
                </span>
                <span className="text-xs text-industrial-400">Tool Transparency Sheet</span>
              </div>

              <h2 className="text-xl font-bold text-white">
                {activeModalTool.name}
              </h2>

              <p className="text-xs text-industrial-300 leading-relaxed">
                {activeModalTool.purpose}
              </p>

              <div className="space-y-2 p-3 bg-industrial-950 rounded-xl border border-industrial-800 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-industrial-400">Typical Purchase Cost:</span>
                  <span className="text-white font-bold">₹{activeModalTool.typical_price_min} – ₹{activeModalTool.typical_price_max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-400">Annual Maintenance:</span>
                  <span className="text-white">₹{activeModalTool.maintenance_cost_annual} / yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-400">Expected Working Life:</span>
                  <span className="text-white">{activeModalTool.expected_lifespan}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-industrial-850 text-orange-400">
                  <span>Job Wear & Tear Recovery:</span>
                  <span className="font-bold">₹{activeModalTool.approx_cost_per_job} per job</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Why this must be factored in welding charges:
                </h4>
                <p className="text-xs text-industrial-300 leading-relaxed bg-industrial-850 p-3 rounded-lg border border-industrial-800">
                  {activeModalTool.why_it_matters}
                </p>
              </div>

              <button
                onClick={() => setActiveModalTool(null)}
                className="w-full py-2.5 rounded-xl bg-industrial-800 hover:bg-industrial-700 text-white font-semibold text-xs tracking-wide"
              >
                Close Inspector
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

