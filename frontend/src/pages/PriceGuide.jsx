import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import {
  BookOpen,
  Search,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  Zap,
  ChevronRight,
  Info
} from "lucide-react";

export default function PriceGuide() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const complexityColor = (c) => {
    if (!c) return "text-gray-400";
    const cl = c.toLowerCase();
    if (cl.includes("low") || cl.includes("simple")) return "text-emerald-400";
    if (cl.includes("high") || cl.includes("complex")) return "text-red-400";
    return "text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[#0c0f14] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            Service Price Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Welding &amp; Fabrication{" "}
            <span className="text-orange-500">Price Ranges</span>
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Estimated market benchmarks for common welding services. Use these ranges
            to understand fair pricing before requesting a quote.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="bg-[#141820] border border-[#1f2633] rounded-2xl p-5 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services, materials, keywords…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-full pl-11 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-white"
                    : "bg-[#0c0f14] border border-[#1f2633] text-gray-400 hover:text-white hover:border-gray-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-[#141820] border border-[#1f2633] rounded-2xl p-16 text-center">
            <div className="text-white font-semibold text-sm">No Services Found</div>
            <div className="text-gray-500 text-xs mt-1">Try resetting the filter or search for terms like 'Gate' or 'Pipe'.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-[#141820] border border-[#1f2633] hover:border-orange-500/30 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group"
              >
                <div className="space-y-4">
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                          {srv.category}
                        </span>
                        {srv.complexity && (
                          <span className={`text-[10px] font-semibold ${complexityColor(srv.complexity)}`}>
                            · {srv.complexity}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white leading-tight">{srv.name}</h3>
                    </div>
                    <div className="shrink-0 flex items-center gap-1 text-gray-500 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      <span>~{srv.typical_duration_hours}h</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed">{srv.description}</p>

                  {/* Price Range Badge */}
                  <div className="bg-[#0c0f14] border border-[#1f2633] rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">Estimated Range</span>
                      <div className="text-xl font-bold text-white">
                        ₹{srv.min_price.toLocaleString()}
                        <span className="text-gray-400 font-normal text-sm"> – </span>
                        ₹{srv.max_price.toLocaleString()}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-orange-400" />
                    </div>
                  </div>

                  {/* Materials & Process */}
                  <div className="space-y-2 pt-1">
                    {srv.typical_materials && (
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-gray-500 shrink-0 mt-0.5">Materials:</span>
                        <span className="text-gray-300">{srv.typical_materials}</span>
                      </div>
                    )}
                    {srv.recommended_welding_type && (
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-gray-500 shrink-0 mt-0.5">Process:</span>
                        <span className="text-orange-400 font-medium">{srv.recommended_welding_type}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-5 pt-4 border-t border-[#1f2633] flex items-center gap-2">
                  <Link
                    to={`/quote-generator?service=${encodeURIComponent(srv.name)}`}
                    className="flex-1 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    Get Quote
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/calculator"
                    className="px-4 py-2 rounded-full bg-[#0c0f14] border border-[#1f2633] hover:border-gray-500 text-gray-400 hover:text-white text-xs font-medium transition-colors"
                  >
                    Calculator
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-[#141820] border border-orange-500/20 rounded-2xl p-5 flex items-start gap-4">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Info className="w-4.5 h-4.5 text-orange-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Price Estimate Disclaimer</div>
            <p className="text-xs text-gray-400 leading-relaxed">
              All prices shown are market estimates only and are not fixed quotations.
              Final costs depend on material grade, design complexity, site access, local labour rates,
              consumable prices, and other job-specific conditions. Always request a detailed quote from your welder.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
