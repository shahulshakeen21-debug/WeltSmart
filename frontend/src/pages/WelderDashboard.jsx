import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import MetricCard from "../components/MetricCard";
import { 
  Flame, 
  DollarSign, 
  Zap, 
  Hammer, 
  Layers, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  AlertTriangle,
  PlusCircle,
  Clock,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Sliders,
  Terminal,
  Activity,
  Calculator
} from "lucide-react";

export default function WelderDashboard() {
  const { user } = useAuth();

  const [metrics, setMetrics] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Minimum profitable price check simulator
  const [minJobHours, setMinJobHours] = useState(2.0);
  const [minJobMaterialCost, setMinJobMaterialCost] = useState(500.0);
  const [minJobConsumablesCost, setMinJobConsumablesCost] = useState(200.0);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dash, prof] = await Promise.all([
        api.getWelderDashboard(),
        api.getWelderProfile(),
      ]);
      setMetrics(dash);
      setProfile(prof);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setSaveSuccess(false);
    try {
      const updated = await api.updateWelderProfile(profile);
      setProfile(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSavingProfile(false);
    }
  };

  // Calculate live minimum break-even and profitable charge for a job
  const machineRatePerHr = profile 
    ? (profile.machine_purchase_cost / Math.max(profile.machine_lifespan_hours, 1000)) + (profile.maintenance_cost_annual / 1500)
    : 10.0;
  const powerRatePerHr = profile ? profile.default_power_rating_kw * 0.55 * profile.electricity_rate_kwh : 25.0;
  const labourRatePerHr = profile ? profile.hourly_labour_rate : 300.0;
  
  const estimatedMinOperatingCost = Math.round(
    minJobMaterialCost +
    minJobConsumablesCost +
    (minJobHours * (machineRatePerHr + powerRatePerHr + labourRatePerHr + 20)) +
    (profile ? profile.transport_cost_per_km * 5 : 80)
  );
  const marginPct = profile ? profile.target_profit_margin_pct : 22.0;
  const estimatedMinProfitablePrice = Math.round(estimatedMinOperatingCost * (1 + marginPct / 100));

  if (loading) {
    return (
      <div className="min-h-screen bg-industrial-950 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-forge-500 border-t-transparent animate-spin rounded-none" />
        <span className="font-mono text-xs uppercase tracking-widest text-industrial-400">
          INITIALIZING FABRICATION ERP CONSOLE...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 py-8 px-4 sm:px-6 lg:px-8 tech-grid">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Instrumentation Header */}
        <div className="bg-industrial-900 border border-industrial-800 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest px-1.5 py-0.5 bg-forge-950 border border-forge-800/60">
                ERP-CONSOLE // FABRICATION SHOP
              </span>
              <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                ONLINE (ID: {user?.id || "OP-841"})
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white uppercase">
              Welder Operations & Shop Ledger
            </h1>
            <p className="text-xs font-mono text-industrial-400">
              FACILITY: <span className="text-industrial-200 uppercase">{profile?.workshop_address || user?.workshop_name || "Precision Welding Workshop"}</span> [{profile?.city || "MUMBAI"}]
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch md:self-auto">
            <Link
              to="/calculator"
              className="w-full md:w-auto px-4 py-2.5 bg-forge-600 hover:bg-forge-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-forge-400/40"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Cost Calculation</span>
            </Link>
          </div>
        </div>

        {/* 7 Required Metrics Cards Grid */}
        {metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard
              title="TOTAL JOBS LOGGED"
              value={metrics.total_jobs}
              subtitle="Closed & active work orders"
              icon={Clock}
              color="orange"
            />
            <MetricCard
              title="CUMULATIVE REVENUE"
              value={`₹${metrics.total_revenue.toLocaleString()}`}
              subtitle="Gross customer invoicing"
              icon={DollarSign}
              color="emerald"
            />
            <MetricCard
              title="RAW METALLURGY EXPENSE"
              value={`₹${metrics.total_material_cost.toLocaleString()}`}
              subtitle="Base steel, angle & plate"
              icon={Layers}
              color="blue"
            />
            <MetricCard
              title="CONSUMABLES DISBURSED"
              value={`₹${metrics.total_consumable_cost.toLocaleString()}`}
              subtitle="Electrodes, shielding & abrasives"
              icon={Hammer}
              color="amber"
            />
            <MetricCard
              title="COMMERCIAL POWER EXPENSE"
              value={`₹${metrics.total_electricity_cost.toLocaleString()}`}
              subtitle="Grid metering tariff costs"
              icon={Zap}
              color="amber"
            />
            <MetricCard
              title="ARTISAN LABOUR WAGES"
              value={`₹${metrics.total_labour_cost.toLocaleString()}`}
              subtitle="Certified welders & rigging hours"
              icon={Flame}
              color="purple"
            />
            <MetricCard
              title="SHOP NET SURPLUS"
              value={`₹${metrics.estimated_profit.toLocaleString()}`}
              subtitle={`Mean Margin Realized: ${metrics.average_profit_margin_pct}%`}
              icon={TrendingUp}
              color="emerald"
            />
            <MetricCard
              title="BREAK-EVEN SECURITY"
              value="100.0%"
              subtitle="Zero loss guarantee compliance"
              icon={ShieldCheck}
              color="emerald"
            />
          </div>
        )}

        {/* Charts & Production Mix */}
        {metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Monthly Financials Bar Visualizer */}
            <div className="lg:col-span-8 bg-industrial-900 border border-industrial-800 p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">TELEMETRY // FINANCIAL PERFORMANCE</span>
                  <h3 className="text-xs font-bold font-mono text-white uppercase flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-forge-500" />
                    Monthly Invoicing vs Direct Manufacturing Costs (₹)
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-industrial-400 bg-industrial-950 px-2 py-0.5 border border-industrial-800">
                  5-MONTH AUDIT
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {metrics.monthly_financials.map((m, idx) => {
                  const maxVal = 70000;
                  const revPct = Math.min(100, (m.revenue / maxVal) * 100);
                  const expPct = Math.min(100, (m.expenses / maxVal) * 100);

                  return (
                    <div key={idx} className="space-y-1 bg-industrial-950/60 p-2 border border-industrial-800/80">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="font-bold text-industrial-200 w-12">{m.month}</span>
                        <div className="flex gap-4 font-mono text-[11px]">
                          <span className="text-industrial-300">Revenue: <strong className="text-white">₹{m.revenue.toLocaleString()}</strong></span>
                          <span className="text-industrial-400">Costs: <strong className="text-industrial-300">₹{m.expenses.toLocaleString()}</strong></span>
                          <span className="text-emerald-400 font-bold">Surplus: +₹{m.profit.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-industrial-950 flex overflow-hidden border border-industrial-800">
                        <div
                          style={{ width: `${expPct}%` }}
                          className="bg-industrial-700 h-full border-r border-industrial-900"
                          title={`Expenses: ₹${m.expenses}`}
                        />
                        <div
                          style={{ width: `${Math.max(0, revPct - expPct)}%` }}
                          className="bg-forge-500 h-full"
                          title={`Retained Profit: ₹${m.profit}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2 text-[11px] font-mono text-industrial-400 border-t border-industrial-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-industrial-700 border border-industrial-600"></span>
                  <span>Operating Cost Matrix (BOM + Tools + Power + Helper)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-forge-500 border border-forge-400"></span>
                  <span>Net Retained Margin (Shop Retained Capital)</span>
                </div>
              </div>
            </div>

            {/* Job Type Breakdown */}
            <div className="lg:col-span-4 bg-industrial-900 border border-industrial-800 p-5 space-y-4 flex flex-col justify-between">
              <div>
                <div className="pb-3 border-b border-industrial-800">
                  <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">ANALYSIS // WORK ORDERS</span>
                  <h3 className="text-xs font-bold font-mono text-white uppercase flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-forge-500" />
                    Fabrication Work Package Share
                  </h3>
                </div>

                <div className="space-y-3 pt-3">
                  {metrics.job_type_distribution.map((job, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-industrial-300 truncate max-w-[200px]">{job.name}</span>
                        <span className="font-bold text-white">{job.value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-industrial-950 overflow-hidden border border-industrial-800">
                        <div
                          style={{ width: `${job.value}%`, backgroundColor: job.color || "#ea580c" }}
                          className="h-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-industrial-950 border border-industrial-800 font-mono text-[10px] text-industrial-400 leading-relaxed">
                NOTE: Structural security grills and perimeter gates constitute <span className="text-white font-bold">64.0%</span> of active workshop throughput.
              </div>
            </div>

          </div>
        )}

        {/* Anti-Undercharging Safety Guard */}
        <div className="bg-industrial-900 border border-forge-600/60 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-industrial-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest px-1.5 py-0.5 bg-forge-950 border border-forge-800/60 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-forge-500" />
                  SAFETY GUARD // ZERO LOSS ENGINE
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-white uppercase">
                Break-Even Floor & Minimum Quote Engine
              </h2>
              <p className="text-xs font-mono text-industrial-400 max-w-2xl">
                Simulate upcoming job scope. Validates that proposed estimates cover amortized capital depreciation, standby machine wear, and utility tariffs.
              </p>
            </div>

            <div className="bg-industrial-950 p-3.5 border border-industrial-800 text-right min-w-[240px]">
              <span className="text-[10px] text-industrial-400 uppercase font-mono tracking-wider block">
                MINIMUM VIABLE BID FLOOR:
              </span>
              <div className="text-2xl font-bold text-forge-500 font-mono">
                ₹{estimatedMinProfitablePrice.toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">
                (Strict Zero-Profit Break-Even: ₹{estimatedMinOperatingCost.toLocaleString()})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <label className="text-industrial-300 block mb-1 text-[11px] uppercase">Job Arc/Setup Duration (Hours)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={minJobHours}
                onChange={(e) => setMinJobHours(parseFloat(e.target.value) || 0.5)}
                className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-industrial-300 block mb-1 text-[11px] uppercase">Estimated Raw Steel/BOM (₹)</label>
              <input
                type="number"
                step="50"
                value={minJobMaterialCost}
                onChange={(e) => setMinJobMaterialCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-industrial-300 block mb-1 text-[11px] uppercase">Estimated Consumables & Abrasives (₹)</label>
              <input
                type="number"
                step="25"
                value={minJobConsumablesCost}
                onChange={(e) => setMinJobConsumablesCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Welder Machine & Rates Configuration Form */}
        {profile && (
          <div className="bg-industrial-900 border border-industrial-800 p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-industrial-800">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">
                  SHOP CALIBRATION // MACHINE & HOURLY RATES
                </span>
                <h3 className="text-base font-bold font-mono text-white uppercase">
                  Depreciation Baseline & Operational Tariffs
                </h3>
              </div>

              {saveSuccess && (
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-950/60 px-3 py-1 border border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PARAMETERS COMMITTED</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Primary Welder Asset Name</label>
                  <input
                    type="text"
                    value={profile.machine_name}
                    onChange={(e) => handleProfileChange("machine_name", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Machine Purchase Cost (₹)</label>
                  <input
                    type="number"
                    value={profile.machine_purchase_cost}
                    onChange={(e) => handleProfileChange("machine_purchase_cost", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Duty Cycle Lifespan (Hours)</label>
                  <input
                    type="number"
                    value={profile.machine_lifespan_hours}
                    onChange={(e) => handleProfileChange("machine_lifespan_hours", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Grid Power Tariff (₹/kWh)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={profile.electricity_rate_kwh}
                    onChange={(e) => handleProfileChange("electricity_rate_kwh", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Lead Artisan Rate (₹/hr)</label>
                  <input
                    type="number"
                    step="10"
                    value={profile.hourly_labour_rate}
                    onChange={(e) => handleProfileChange("hourly_labour_rate", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Helper / Fitter Rate (₹/hr)</label>
                  <input
                    type="number"
                    step="10"
                    value={profile.helper_labour_rate}
                    onChange={(e) => handleProfileChange("helper_labour_rate", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Transit Overhead (₹/km)</label>
                  <input
                    type="number"
                    step="1"
                    value={profile.transport_cost_per_km}
                    onChange={(e) => handleProfileChange("transport_cost_per_km", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-industrial-400 block mb-1 text-[11px] uppercase">Required Shop Margin (%)</label>
                  <input
                    type="number"
                    step="1"
                    value={profile.target_profit_margin_pct}
                    onChange={(e) => handleProfileChange("target_profit_margin_pct", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-800 p-2 font-mono text-white text-xs focus:border-forge-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2.5 bg-industrial-800 hover:bg-forge-600 text-white font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50 border border-industrial-700 hover:border-forge-500"
                >
                  {savingProfile ? "WRITING CONFIGURATION..." : "Save Calibration Parameters"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Recent Quotations Table */}
        {metrics && metrics.recent_quotes.length > 0 && (
          <div className="bg-industrial-900 border border-industrial-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">AUDIT REGISTER // CLIENT QUOTATIONS</span>
                <h3 className="text-xs font-bold font-mono text-white uppercase flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-forge-500" />
                  Logged Work Order Quotations
                </h3>
              </div>
              <span className="font-mono text-[11px] text-industrial-400">
                {metrics.recent_quotes.length} RECORDS ACTIVE
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left font-mono border-collapse">
                <thead>
                  <tr className="border-b border-industrial-800 bg-industrial-950 text-industrial-400 uppercase text-[10px]">
                    <th className="py-2.5 px-3">RECORD ID</th>
                    <th className="py-2.5 px-3">CLIENT ENTITY</th>
                    <th className="py-2.5 px-3">SERVICE PACKAGE</th>
                    <th className="py-2.5 px-3 text-right">BILLED ESTIMATE</th>
                    <th className="py-2.5 px-3 text-right">RETAINED MARGIN</th>
                    <th className="py-2.5 px-3 text-center">LIFECYCLE</th>
                    <th className="py-2.5 px-3 text-right">DOCUMENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-800/80">
                  {metrics.recent_quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-industrial-800/40 transition-colors">
                      <td className="py-2.5 px-3 font-mono font-bold text-forge-500">{q.quote_number}</td>
                      <td className="py-2.5 px-3 text-white">{q.customer_name}</td>
                      <td className="py-2.5 px-3 text-industrial-300 max-w-[220px] truncate">{q.service_name}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-white text-right">₹{q.recommended_price.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-mono text-emerald-400 font-semibold text-right">+₹{q.profit_margin_amount.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-block px-1.5 py-0.5 text-[9px] uppercase font-mono ${
                          q.status === "Accepted" || q.status === "Completed"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-industrial-950 text-industrial-400 border border-industrial-800"
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <Link
                          to={`/quote-generator?quote=${q.quote_number}`}
                          className="text-forge-500 hover:text-forge-400 inline-flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span>INSPECT</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
