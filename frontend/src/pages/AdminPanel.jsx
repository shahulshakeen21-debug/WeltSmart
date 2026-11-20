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
  Sparkles,
  Zap
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
      showMessage("Setting updated successfully!");
    } catch (err) {
      alert("Error updating setting: " + err.message);
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
      showMessage(`Updated pricing for ${tool.name}`);
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
      showMessage(`Updated unit rate for ${consumable.name}`);
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
      <div className="min-h-screen bg-industrial-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-industrial-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-industrial-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Central Authority Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              WeldCost Administration & Price Engine Control
            </h1>
            <p className="text-xs text-industrial-400">
              Logged in as Administrator: <strong className="text-white">{user?.email}</strong>. Changes reflect instantly across all calculators.
            </p>
          </div>

          {statusMessage && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Platform Overview Metrics */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <MetricCard
              title="Registered Users"
              value={stats.total_users}
              subtitle={`${stats.welders_count} Welders | ${stats.customers_count} Customers`}
              icon={Users}
              color="blue"
            />
            <MetricCard
              title="Managed Tools"
              value={stats.tools_count}
              subtitle="100% database driven"
              icon={Wrench}
              color="orange"
            />
            <MetricCard
              title="Active Consumables"
              value={stats.consumables_count}
              subtitle="Electrodes, discs, wire, gas"
              icon={Layers}
              color="amber"
            />
            <MetricCard
              title="Total Quotes Issued"
              value={stats.quotes_count}
              subtitle={`₹${stats.total_quote_value.toLocaleString()} total value`}
              icon={FileText}
              color="emerald"
            />
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-2 border-b border-industrial-800 pb-2">
          {[
            { id: "settings", label: "Central Rates & Settings", icon: Settings },
            { id: "consumables", label: "Consumable Unit Prices", icon: Layers },
            { id: "tools", label: "Welding Tools & Wear", icon: Wrench },
            { id: "services", label: "Service Price Ranges", icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white shadow-weld-glow"
                    : "bg-industrial-900 text-industrial-400 hover:text-white border border-industrial-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Global Benchmark Settings */}
        {activeTab === "settings" && (
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Platform Benchmark System Settings</h3>
              <p className="text-xs text-industrial-400">
                Updating these parameters changes the default calculation formulas across the entire platform without touching any code.
              </p>
            </div>

            <div className="divide-y divide-industrial-800">
              {settingsList.map((setting) => (
                <div key={setting.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-orange-400">{setting.key}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-industrial-950 border border-industrial-800 text-industrial-400">
                        {setting.category}
                      </span>
                    </div>
                    <p className="text-xs text-industrial-300 mt-1">{setting.description}</p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {editingKey === setting.key ? (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="bg-industrial-950 border border-orange-500 rounded-lg px-3 py-1.5 text-xs font-mono text-white outline-none w-40"
                        />
                        <button
                          onClick={() => handleUpdateSetting(setting.key)}
                          className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
                          title="Save"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingKey(null)}
                          className="p-2 rounded-lg bg-industrial-800 text-industrial-400 hover:text-white"
                          title="Cancel"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-bold text-white bg-industrial-950 px-3 py-1 rounded-lg border border-industrial-800">
                          {setting.value}
                        </span>
                        <button
                          onClick={() => {
                            setEditingKey(setting.key);
                            setEditValue(setting.value);
                          }}
                          className="p-1.5 text-industrial-400 hover:text-orange-400 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
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
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Consumable Pricing Master Table</h3>
              <p className="text-xs text-industrial-400">
                Unit prices used by the Cost Engine for rods, wire, gas, and abrasive discs.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-industrial-800 text-industrial-400 font-mono uppercase">
                    <th className="py-3 px-3">Consumable Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Unit</th>
                    <th className="py-3 px-3">Current Unit Price (₹)</th>
                    <th className="py-3 px-3">Yield / Burn Rate</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-850">
                  {consumablesList.map((c) => (
                    <tr key={c.id} className="hover:bg-industrial-850/50">
                      <td className="py-3 px-3 font-medium text-white">{c.name}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-industrial-950 border border-industrial-800 text-orange-400">
                          {c.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-industrial-300 font-mono">{c.unit}</td>
                      <td className="py-3 px-3 font-mono font-bold text-white">₹{c.unit_price}</td>
                      <td className="py-3 px-3 text-industrial-400 text-[11px]">{c.burn_rate_or_yield || "Standard"}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            const val = prompt(`Enter new unit price (₹) for ${c.name}:`, c.unit_price);
                            if (val && !isNaN(val)) {
                              handleUpdateConsumablePrice(c, val);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-industrial-800 hover:bg-orange-500 hover:text-white text-orange-400 text-xs font-semibold transition-colors"
                        >
                          Update Price
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
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Tool Catalog & Depreciation Settings</h3>
              <p className="text-xs text-industrial-400">
                Adjust purchase prices and wear amortization recovery per job.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-industrial-800 text-industrial-400 font-mono uppercase">
                    <th className="py-3 px-3">Tool Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price Range (₹)</th>
                    <th className="py-3 px-3">Lifespan</th>
                    <th className="py-3 px-3">Cost / Job (₹)</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-850">
                  {toolsList.map((t) => (
                    <tr key={t.id} className="hover:bg-industrial-850/50">
                      <td className="py-3 px-3 font-medium text-white">{t.name}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-industrial-950 border border-industrial-800 text-blue-400">
                          {t.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-white">
                        ₹{t.typical_price_min} – ₹{t.typical_price_max}
                      </td>
                      <td className="py-3 px-3 text-industrial-300 text-[11px]">{t.expected_lifespan}</td>
                      <td className="py-3 px-3 font-mono font-bold text-orange-400">₹{t.approx_cost_per_job}</td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            const minVal = prompt(`Enter min price for ${t.name}:`, t.typical_price_min);
                            const maxVal = prompt(`Enter max price for ${t.name}:`, t.typical_price_max);
                            if (minVal && maxVal && !isNaN(minVal) && !isNaN(maxVal)) {
                              handleUpdateToolPrice(t, minVal, maxVal);
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-industrial-800 hover:bg-orange-500 hover:text-white text-orange-400 text-xs font-semibold transition-colors"
                        >
                          Edit Pricing
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
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base font-bold text-white">Welding Service Price Ranges</h3>
              <p className="text-xs text-industrial-400">
                Manage estimated price boundaries displayed on the Public Service Price Guide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesList.map((s) => (
                <div key={s.id} className="bg-industrial-950 border border-industrial-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">{s.name}</h4>
                    <span className="text-[11px] text-industrial-400 block">{s.category} • ~{s.typical_duration_hours} hrs</span>
                    <span className="text-xs font-mono font-bold text-orange-400 mt-1 block">
                      Range: ₹{s.min_price} – ₹{s.max_price}
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
                    className="px-3 py-1.5 rounded-lg bg-industrial-850 hover:bg-orange-500 hover:text-white text-orange-400 text-xs font-semibold transition-colors"
                  >
                    Adjust Range
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

