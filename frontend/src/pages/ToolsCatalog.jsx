import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { 
  Wrench, 
  Search, 
  ExternalLink,
  ShieldAlert,
  Sliders,
  Cpu
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
    <div className="min-h-screen bg-industrial-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-industrial-800">
          <div>
            <div className="flex items-center gap-2 mb-1 text-[10px] font-mono font-bold text-forge-400 uppercase">
              <span className="w-2 h-2 bg-forge-500 rounded-xs"></span>
              <span>EQUIPMENT INVENTORY // ASSET AMORTIZATION DIRECTORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welding Equipment & Tooling Database
            </h1>
            <p className="mt-1 text-xs text-industrial-400 max-w-2xl leading-relaxed">
              Technical breakdown of power sources, abrasive consumables, and personal safety gear. Each entry documents purchase capital, service lifespan, and exact cost contribution per job.
            </p>
          </div>

          <div className="p-3 bg-industrial-900 border border-industrial-750 rounded-sm text-[11px] font-mono text-industrial-400 max-w-xs">
            <span className="text-forge-400 font-bold block mb-0.5">BENCHMARK NOTICE:</span>
            Rates represent current Indian market indices. Actual equipment costs vary by duty rating (Amps), duty cycle, and manufacturer.
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-industrial-900 border border-industrial-750 rounded-sm p-3 flex flex-col md:flex-row items-center justify-between gap-3 shadow-panel">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools, purpose, wear formula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-industrial-950 border border-industrial-750 focus:border-forge-500 rounded-xs pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-industrial-500 outline-none"
            />
          </div>

          {/* Category Pills */}
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

        {/* Tools Datasheet Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-xs h-8 w-8 border-t-2 border-b-2 border-forge-500"></div>
          </div>
        ) : tools.length === 0 ? (
          <div className="bg-industrial-900 border border-industrial-800 rounded-sm p-12 text-center text-industrial-400 font-mono text-xs">
            <Wrench className="w-8 h-8 mx-auto text-industrial-600 mb-2" />
            <div className="text-white font-bold">No Matching Equipment Found</div>
            <div className="text-industrial-500 mt-1">Try broadening search terms or resetting category filters.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-industrial-900 border border-industrial-750 hover:border-industrial-600 rounded-sm overflow-hidden flex flex-col justify-between transition-colors shadow-panel"
              >
                <div>
                  {/* Tool Image with technical spec tags */}
                  <div className="relative h-40 w-full bg-industrial-950 overflow-hidden border-b border-industrial-800">
                    <img
                      src={tool.image_url || "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"}
                      alt={tool.name}
                      className="w-full h-full object-cover opacity-75 hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute top-2 left-2 bg-industrial-950/90 border border-industrial-750 text-forge-400 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                      {tool.category}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-industrial-950/90 border border-industrial-750 text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded-xs">
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
                    <div className="bg-industrial-950 border border-industrial-800 rounded-xs p-2.5 font-mono text-[10px] grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-industrial-500 block uppercase">Lifespan Cycle</span>
                        <span className="text-industrial-200 font-semibold">{tool.expected_lifespan}</span>
                      </div>
                      <div>
                        <span className="text-industrial-500 block uppercase">Amortization / Job</span>
                        <span className="text-forge-400 font-bold">~₹{tool.approx_cost_per_job}</span>
                      </div>
                    </div>

                    {/* Why It Contributes */}
                    <div className="text-[11px] space-y-1">
                      <span className="font-mono text-[10px] font-bold text-industrial-500 uppercase block">
                        Cost Contribution Vector:
                      </span>
                      <p className="text-industrial-300 leading-relaxed text-xs">
                        {tool.why_it_matters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-3 bg-industrial-950 border-t border-industrial-800 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-industrial-500">
                    Depreciation: Active
                  </span>
                  <button
                    onClick={() => setActiveModalTool(tool)}
                    className="text-forge-400 hover:text-forge-300 font-semibold flex items-center gap-1 transition-colors uppercase"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-industrial-900 border border-industrial-700 rounded-sm max-w-lg w-full p-5 shadow-2xl relative space-y-4 font-mono text-xs">
              <button
                onClick={() => setActiveModalTool(null)}
                className="absolute top-4 right-4 text-industrial-400 hover:text-white p-1"
              >
                ✕
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-xs bg-industrial-800 text-forge-400 text-[10px] font-bold uppercase">
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

              <div className="space-y-1.5 p-3 bg-industrial-950 rounded-xs border border-industrial-800 text-xs">
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
                <div className="flex justify-between pt-1.5 border-t border-industrial-800 text-forge-400">
                  <span>Job Depreciation Recovery:</span>
                  <span className="font-bold">₹{activeModalTool.approx_cost_per_job} / job</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-industrial-500 uppercase tracking-wider block mb-1">
                  Why this must be factored into job invoices:
                </span>
                <p className="text-xs text-industrial-300 leading-relaxed bg-industrial-950 p-2.5 rounded-xs border border-industrial-800 font-sans">
                  {activeModalTool.why_it_matters}
                </p>
              </div>

              <button
                onClick={() => setActiveModalTool(null)}
                className="w-full py-2 rounded-xs bg-industrial-800 hover:bg-industrial-750 text-white font-mono font-semibold text-xs tracking-wider uppercase transition-colors"
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
