import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import MetricCard from "../components/MetricCard";
import { 
  ShieldAlert, 
  Settings, 
  Wrench, 
  Layers, 
  BookOpen, 
  Users, 
  FileText, 
  CheckCircle2, 
  Edit3, 
  Save, 
  Plus, 
  Trash2,
  Terminal,
  Cpu,
  Database
} from "lucide-react";

export default function AdminPanel() {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("settings");
  const [stats, setStats] = useState(null);
  const [settingsList, setSettingsList] = useState([]);
  const [toolsList, setToolsList] = useState([]);
  const [consumablesList, setConsumablesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [st, sList, tList, cList, srvList] = await Promise.all([
        api.getAdminStats(),
        api.getAdminSettings(),
        api.getTools(),
        api.getConsumables(),
        api.getServices(),
      ]);
      setStats(st);
      setSettingsList(sList);
      setToolsList(tList);
      setConsumablesList(cList);
      setServicesList(srvList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const handleUpdateSetting = async (key) => {
    try {
      await api.updateAdminSetting(key, { value: editValue });
      setSettingsList((prev) =>
        prev.map((s) => (s.key === key ? { ...s, value: editValue } : s))
      );
      setEditingKey(null);
      showMessage("Benchmark parameter updated successfully.");
    } catch (err) {
      alert("Error updating parameter: " + err.message);
    }
  };

  const handleUpdateToolPrice = async (tool, minPrice, maxPrice) => {
    try {
      await api.updateTool(tool.id, {
        typical_price_min: parseFloat(minPrice),
        typical_price_max: parseFloat(maxPrice),
      });
      setToolsList((prev) =>
        prev.map((t) =>
          t.id === tool.id
            ? { ...t, typical_price_min: parseFloat(minPrice), typical_price_max: parseFloat(maxPrice) }
            : t
        )
      );
      showMessage(`Calibrated wear price for ${tool.name}`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleUpdateConsumablePrice = async (consumable, newPrice) => {
    try {
      await api.updateConsumable(consumable.id, { unit_price: parseFloat(newPrice) });
      setConsumablesList((prev) =>
        prev.map((c) => (c.id === consumable.id ? { ...c, unit_price: parseFloat(newPrice) } : c))
      );
      showMessage(`Calibrated unit tariff for ${consumable.name}`);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const showMessage = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-industrial-950 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-forge-500 border-t-transparent animate-spin rounded-none" />
        <span className="font-mono text-xs uppercase tracking-widest text-industrial-400">
          ACCESSING CENTRAL BENCHMARK REGISTRY...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 py-8 px-4 sm:px-6 lg:px-8 tech-grid">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Control Header */}
        <div className="bg-industrial-900 border border-industrial-800 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest px-1.5 py-0.5 bg-amber-950 border border-amber-800/60 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3 text-amber-400" />
                CENTRAL AUTHORITY // ROOT REGISTRY
              </span>
              <span className="font-mono text-[10px] text-industrial-400">
                AUTH: <strong className="text-white font-mono">{user?.email || "sysadmin@weldcost.org"}</strong>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white uppercase">
              Benchmark Registry & Calculation Engine Authority
            </h1>
            <p className="text-xs font-mono text-industrial-400">
              Modifications commit directly to runtime state across all client quote engines and public ledger pages.
            </p>
          </div>

          {statusMessage && (
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Platform Overview Metrics */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <MetricCard
              title="REGISTERED OPERATORS"
              value={stats.total_users}
              subtitle={`${stats.welders_count} Artisan Shops | ${stats.customers_count} Industrial Clients`}
              icon={Users}
              color="blue"
            />
            <MetricCard
              title="CATALOGED ASSETS"
              value={stats.tools_count}
              subtitle="100% telemetry tracked wear assets"
              icon={Wrench}
              color="orange"
            />
            <MetricCard
              title="ACTIVE CONSUMABLES"
              value={stats.consumables_count}
              subtitle="Rods, wire, shielding gas, abrasives"
              icon={Layers}
              color="amber"
            />
            <MetricCard
              title="TOTAL QUOTES ISSUED"
              value={stats.quotes_count}
              subtitle={`₹${stats.total_quote_value.toLocaleString()} total gross volume`}
              icon={FileText}
              color="emerald"
            />
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 border-b border-industrial-800 pb-2">
          {[
            { id: "settings", code: "CFG-01", label: "Central Rates & Multipliers", icon: Settings },
            { id: "consumables", code: "BOM-02", label: "Consumable Unit Tariffs", icon: Layers },
            { id: "tools", code: "AST-03", label: "Equipment Wear & Recovery", icon: Wrench },
            { id: "services", code: "PKG-04", label: "Work Package Price Bounds", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors border ${
                  isActive
                    ? "bg-forge-600 text-white border-forge-500 font-bold"
                    : "bg-industrial-900 text-industrial-400 hover:text-white border-industrial-800"
                }`}
              >
                <span className={`text-[10px] ${isActive ? "text-orange-200" : "text-industrial-500"}`}>{tab.code}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Global Benchmark Settings */}
        {activeTab === "settings" && (
          <div className="bg-industrial-900 border border-industrial-800 p-5 space-y-4">
            <div className="pb-3 border-b border-industrial-800 flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">REGISTRY // PARAMETERS</span>
                <h3 className="text-xs font-bold font-mono text-white uppercase">Engine Core Benchmark Constants</h3>
              </div>
              <span className="font-mono text-[11px] text-industrial-400 bg-industrial-950 px-2 py-0.5 border border-industrial-800">
                {settingsList.length} ACTIVE CONSTANTS
              </span>
            </div>

            <div className="divide-y divide-industrial-800/80 font-mono text-xs">
              {settingsList.map((setting) => (
                <div key={setting.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="max-w-xl space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-forge-400 text-xs">{setting.key}</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 bg-industrial-950 border border-industrial-800 text-industrial-400">
                        {setting.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-industrial-400 font-sans">{setting.description}</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {editingKey === setting.key ? (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="bg-industrial-950 border border-forge-500 p-1.5 font-mono text-xs text-white outline-none w-36"
                        />
                        <button
                          onClick={() => handleUpdateSetting(setting.key)}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white"
                          title="Save"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingKey(null)}
                          className="p-1.5 bg-industrial-800 text-industrial-400 hover:text-white"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-white bg-industrial-950 px-2.5 py-1 border border-industrial-800">
                          {setting.value}
                        </span>
                        <button
                          onClick={() => {
                            setEditingKey(setting.key);
                            setEditValue(setting.value);
                          }}
                          className="p-1.5 text-industrial-400 hover:text-forge-400 transition-colors"
                          title="Edit Constant"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Consumables Unit Prices */}
        {activeTab === "consumables" && (
          <div className="bg-industrial-900 border border-industrial-800 p-5 space-y-4">
            <div className="pb-3 border-b border-industrial-800 flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">REGISTRY // CONSUMABLES</span>
                <h3 className="text-xs font-bold font-mono text-white uppercase">Consumable Unit Tariffs & Yield Rates</h3>
              </div>
              <span className="font-mono text-[11px] text-industrial-400 bg-industrial-950 px-2 py-0.5 border border-industrial-800">
                {consumablesList.length} ENTRIES
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-mono border-collapse">
                <thead>
                  <tr className="border-b border-industrial-800 bg-industrial-950 text-industrial-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">CONSUMABLE ITEM</th>
                    <th className="py-2.5 px-3">CATEGORY</th>
                    <th className="py-2.5 px-3">METRIC UNIT</th>
                    <th className="py-2.5 px-3 text-right">BENCHMARK PRICE (₹)</th>
                    <th className="py-2.5 px-3">BURN / YIELD BENCHMARK</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-800/80">
                  {consumablesList.map((c) => (
                    <tr key={c.id} className="hover:bg-industrial-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-white">{c.name}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono bg-industrial-950 border border-industrial-800 text-forge-400">
                          {c.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-industrial-300 font-mono">{c.unit}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white text-right">₹{c.unit_price}</td>
                      <td className="py-2.5 px-3 text-industrial-400 text-[11px]">{c.burn_rate_or_yield || "Standard"}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => {
                            const val = prompt(`Enter new unit price (₹) for ${c.name}:`, c.unit_price);
                            if (val && !isNaN(val)) {
                              handleUpdateConsumablePrice(c, val);
                            }
                          }}
                          className="px-2 py-1 bg-industrial-800 hover:bg-forge-600 hover:text-white text-forge-400 text-[11px] font-mono uppercase transition-colors border border-industrial-700 hover:border-forge-500"
                        >
                          Calibrate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Tools Catalog Management */}
        {activeTab === "tools" && (
          <div className="bg-industrial-900 border border-industrial-800 p-5 space-y-4">
            <div className="pb-3 border-b border-industrial-800 flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">REGISTRY // MACHINERY & TOOLS</span>
                <h3 className="text-xs font-bold font-mono text-white uppercase">Equipment Assets & Job Wear Recovery</h3>
              </div>
              <span className="font-mono text-[11px] text-industrial-400 bg-industrial-950 px-2 py-0.5 border border-industrial-800">
                {toolsList.length} ASSETS REGISTERED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-mono border-collapse">
                <thead>
                  <tr className="border-b border-industrial-800 bg-industrial-950 text-industrial-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">EQUIPMENT ASSET</th>
                    <th className="py-2.5 px-3">CLASS</th>
                    <th className="py-2.5 px-3">MARKET BAND (₹)</th>
                    <th className="py-2.5 px-3">LIFESPAN METRIC</th>
                    <th className="py-2.5 px-3 text-right">WEAR / JOB (₹)</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-800/80">
                  {toolsList.map((t) => (
                    <tr key={t.id} className="hover:bg-industrial-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-white">{t.name}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 text-[9px] font-mono bg-industrial-950 border border-industrial-800 text-blue-400">
                          {t.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-white">
                        ₹{t.typical_price_min} – ₹{t.typical_price_max}
                      </td>
                      <td className="py-2.5 px-3 text-industrial-300 text-[11px]">{t.expected_lifespan}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-forge-400 text-right">₹{t.approx_cost_per_job}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => {
                            const minVal = prompt(`Enter min price for ${t.name}:`, t.typical_price_min);
                            const maxVal = prompt(`Enter max price for ${t.name}:`, t.typical_price_max);
                            if (minVal && maxVal && !isNaN(minVal) && !isNaN(maxVal)) {
                              handleUpdateToolPrice(t, minVal, maxVal);
                            }
                          }}
                          className="px-2 py-1 bg-industrial-800 hover:bg-forge-600 hover:text-white text-forge-400 text-[11px] font-mono uppercase transition-colors border border-industrial-700 hover:border-forge-500"
                        >
                          Calibrate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Services & Ranges */}
        {activeTab === "services" && (
          <div className="bg-industrial-900 border border-industrial-800 p-5 space-y-4">
            <div className="pb-3 border-b border-industrial-800 flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">REGISTRY // FABRICATION PACKAGES</span>
                <h3 className="text-xs font-bold font-mono text-white uppercase">Work Package Scope & Estimated Bounds</h3>
              </div>
              <span className="font-mono text-[11px] text-industrial-400 bg-industrial-950 px-2 py-0.5 border border-industrial-800">
                {servicesList.length} PACKAGES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {servicesList.map((s) => (
                <div key={s.id} className="bg-industrial-950 border border-industrial-800 p-3.5 flex items-center justify-between font-mono">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-xs">{s.name}</h4>
                    <span className="text-[10px] text-industrial-400 block">{s.category} • ~{s.typical_duration_hours}h work duration</span>
                    <span className="text-xs font-mono font-bold text-forge-500 block">
                      RANGE: ₹{s.min_price} – ₹{s.max_price}
                    </span>
                  </div>
                  <button
                    onClick={async () => {
                      const minP = prompt(`Enter min price for ${s.name}:`, s.min_price);
                      const maxP = prompt(`Enter max price for ${s.name}:`, s.max_price);
                      if (minP && maxP) {
                        await api.updateService(s.id, { min_price: parseFloat(minP), max_price: parseFloat(maxP) });
                        loadAllAdminData();
                        showMessage(`Updated price range for ${s.name}`);
                      }
                    }}
                    className="px-2.5 py-1 bg-industrial-850 hover:bg-forge-600 hover:text-white text-forge-400 text-[11px] font-mono uppercase transition-colors border border-industrial-700 hover:border-forge-500"
                  >
                    Adjust Bounds
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
