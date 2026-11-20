import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { 
  Wrench, 
  Search, 
  ExternalLink,
  X
} from "lucide-react";

export default function ToolsCatalog() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalTool, setActiveModalTool] = useState(null);

  const categories = ["All", "Machines", "Safety", "Cutting/Grinding", "Consumables", "Accessories", "Gas Equipment", "Equipment"];

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
    <div className="min-h-screen bg-[#0c0f14] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#1b212d]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                EQUIPMENT INVENTORY // ASSET AMORTIZATION DIRECTORY
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welding Equipment & Tooling Database
            </h1>
            <p className="mt-1 text-xs text-industrial-400 max-w-2xl leading-relaxed">
              Technical breakdown of power sources, abrasive consumables, and personal safety gear. Each entry documents purchase capital, service lifespan, and exact cost contribution per job.
            </p>
          </div>

          <div className="p-4 bg-[#121620] border border-[#1f2633] rounded-2xl text-[11px] font-mono text-industrial-400 max-w-xs shadow-xl">
            <span className="text-orange-400 font-bold block mb-0.5">BENCHMARK NOTICE:</span>
            Rates represent current Indian market indices. Costs vary by duty rating (Amps), duty cycle, and manufacturer.
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools, purpose, wear formula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-full pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-industrial-500 outline-none transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white font-bold shadow-md"
                    : "bg-[#0c0f14] text-industrial-400 hover:text-white border border-[#1f2633] hover:border-orange-500/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Datasheet Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent animate-spin rounded-full" />
            <span className="font-mono text-xs text-industrial-400">LOADING EQUIPMENT REGISTRY...</span>
          </div>
        ) : tools.length === 0 ? (
          <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-12 text-center shadow-xl">
            <Wrench className="w-10 h-10 mx-auto text-industrial-600 mb-3" />
            <div className="text-white font-bold text-sm">No Matching Equipment Found</div>
            <div className="text-industrial-500 mt-1 text-xs">Try broadening search terms or resetting category filters.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-[#121620] border border-[#1f2633] hover:border-orange-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all shadow-xl hover:shadow-orange-500/5 group"
              >
                <div>
                  {/* Tool Image */}
                  <div className="relative h-44 w-full bg-[#0c0f14] overflow-hidden border-b border-[#1f2633]">
                    <img
                      src={tool.image_url || "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"}
                      alt={tool.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity filter contrast-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f14]/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-[#0c0f14]/90 border border-orange-500/30 text-orange-400 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {tool.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#0c0f14]/90 border border-[#1f2633] text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      ₹{tool.typical_price_min.toLocaleString()} – ₹{tool.typical_price_max.toLocaleString()}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {tool.name}
                    </h3>

                    <p className="text-xs text-industrial-400 leading-relaxed line-clamp-2">
                      {tool.purpose}
                    </p>

                    {/* Technical Lifespan Box */}
                    <div className="bg-[#0c0f14] border border-[#1f2633] rounded-xl p-3 font-mono text-[10px] grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-industrial-500 block uppercase mb-0.5">Lifespan Cycle</span>
                        <span className="text-industrial-200 font-semibold">{tool.expected_lifespan}</span>
                      </div>
                      <div>
                        <span className="text-industrial-500 block uppercase mb-0.5">Amortization / Job</span>
                        <span className="text-orange-400 font-bold">~₹{tool.approx_cost_per_job}</span>
                      </div>
                    </div>

                    {/* Why It Contributes */}
                    <div className="text-[11px] space-y-1">
                      <span className="font-mono text-[10px] font-bold text-industrial-500 uppercase block">
                        Cost Contribution Vector:
                      </span>
                      <p className="text-industrial-300 leading-relaxed text-xs line-clamp-2">
                        {tool.why_it_matters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-3.5 bg-[#0c0f14]/60 border-t border-[#1f2633] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-industrial-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Depreciation: Active
                  </span>
                  <button
                    onClick={() => setActiveModalTool(tool)}
                    className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 transition-colors uppercase"
                  >
                    <span>View Datasheet</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Datasheet Modal */}
        {activeModalTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 font-mono text-xs">
              <button
                onClick={() => setActiveModalTool(null)}
                className="absolute top-4 right-4 text-industrial-400 hover:text-white p-1.5 rounded-full hover:bg-industrial-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-bold uppercase">
                  {activeModalTool.category}
                </span>
                <span className="text-[10px] text-industrial-500 uppercase">DATASHEET INSPECTION</span>
              </div>

              <h2 className="text-base font-bold text-white font-sans">
                {activeModalTool.name}
              </h2>

              <p className="text-xs text-industrial-300 leading-relaxed font-sans">
                {activeModalTool.purpose}
              </p>

              <div className="space-y-2 p-4 bg-[#0c0f14] rounded-xl border border-[#1f2633] text-xs">
                <div className="flex justify-between">
                  <span className="text-industrial-500">Market Capital Cost:</span>
                  <span className="text-white font-bold">₹{activeModalTool.typical_price_min} – ₹{activeModalTool.typical_price_max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-500">Annual Servicing Overhead:</span>
                  <span className="text-white">₹{activeModalTool.maintenance_cost_annual} / yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-industrial-500">Rated Operating Life:</span>
                  <span className="text-white">{activeModalTool.expected_lifespan}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#1f2633] text-orange-400">
                  <span>Job Depreciation Recovery:</span>
                  <span className="font-bold">₹{activeModalTool.approx_cost_per_job} / job</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-industrial-500 uppercase tracking-wider block mb-1.5">
                  Why this must be factored into job invoices:
                </span>
                <p className="text-xs text-industrial-300 leading-relaxed bg-[#0c0f14] p-3 rounded-xl border border-[#1f2633] font-sans">
                  {activeModalTool.why_it_matters}
                </p>
              </div>

              <button
                onClick={() => setActiveModalTool(null)}
                className="w-full py-2.5 rounded-full bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-400 font-mono font-semibold text-xs tracking-wider uppercase transition-all border border-orange-500/30"
              >
                Close Datasheet
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
