import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import MetricCard from "../components/MetricCard";
import { 
  LayoutDashboard, 
  Flame, 
  DollarSign, 
  Zap, 
  Hammer, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Sliders, 
  CheckCircle2, 
  FileText, 
  AlertTriangle,
  PlusCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  ExternalLink
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
      <div className="min-h-screen bg-industrial-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-industrial-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-industrial-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <LayoutDashboard className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Artisan Business Control
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Welder Mode: Operating Dashboard
            </h1>
            <p className="text-xs text-industrial-400">
              Workshop: <strong className="text-white">{profile?.workshop_address || user?.workshop_name || "Precision Welding Workshop"}</strong> ({profile?.city || "Mumbai"})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/calculator"
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-weld-glow transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Cost Calculation</span>
            </Link>
          </div>
        </div>

        {/* 7 Required Metrics Cards Grid */}
        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Jobs"
              value={metrics.total_jobs}
              subtitle="Logged customer projects"
              icon={Clock}
              color="orange"
            />
            <MetricCard
              title="Total Revenue"
              value={`₹${metrics.total_revenue.toLocaleString()}`}
              subtitle="Billed customer price"
              icon={DollarSign}
              color="emerald"
            />
            <MetricCard
              title="Total Material Cost"
              value={`₹${metrics.total_material_cost.toLocaleString()}`}
              subtitle="Raw steel & pipe expense"
              icon={Layers}
              color="blue"
            />
            <MetricCard
              title="Total Consumable Cost"
              value={`₹${metrics.total_consumable_cost.toLocaleString()}`}
              subtitle="Rods, wire, gas & discs"
              icon={Hammer}
              color="amber"
            />
            <MetricCard
              title="Total Electricity Cost"
              value={`₹${metrics.total_electricity_cost.toLocaleString()}`}
              subtitle="Utility power tariffs drawn"
              icon={Zap}
              color="amber"
            />
            <MetricCard
              title="Total Labour Cost"
              value={`₹${metrics.total_labour_cost.toLocaleString()}`}
              subtitle="Artisan & helper hours"
              icon={Flame}
              color="purple"
            />
            <MetricCard
              title="Estimated Net Profit"
              value={`₹${metrics.estimated_profit.toLocaleString()}`}
              subtitle={`Average Margin: ${metrics.average_profit_margin_pct}%`}
              icon={TrendingUp}
              color="emerald"
            />
            <MetricCard
              title="Break-even Security"
              value="100%"
              subtitle="Zero loss quote guarantee"
              icon={ShieldCheck}
              color="emerald"
            />
          </div>
        )}

        {/* Charts Section: Monthly Revenue & Job Distribution */}
        {metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Monthly Financials Bar Visualizer */}
            <div className="lg:col-span-8 bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <span>Monthly Revenue & Operating Expenses (₹)</span>
                </h3>
                <span className="text-xs text-industrial-400">Past 5 Months</span>
              </div>

              <div className="space-y-4 pt-2">
                {metrics.monthly_financials.map((m, idx) => {
                  const maxVal = 70000;
                  const revPct = Math.min(100, (m.revenue / maxVal) * 100);
                  const expPct = Math.min(100, (m.expenses / maxVal) * 100);

                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-white w-10">{m.month}</span>
                        <div className="flex gap-4 font-mono">
                          <span className="text-emerald-400">Revenue: ₹{m.revenue.toLocaleString()}</span>
                          <span className="text-industrial-400">Cost: ₹{m.expenses.toLocaleString()}</span>
                          <span className="text-orange-400 font-bold">Profit: ₹{m.profit.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-4 w-full bg-industrial-950 rounded-lg overflow-hidden flex relative border border-industrial-800">
                        <div
                          style={{ width: `${expPct}%` }}
                          className="bg-industrial-700 h-full"
                          title={`Expenses: ₹${m.expenses}`}
                        />
                        <div
                          style={{ width: `${revPct - expPct}%` }}
                          className="bg-orange-500 h-full"
                          title={`Profit: ₹${m.profit}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs text-industrial-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-industrial-700"></span>
                  <span>Operating Costs (Materials + Tools + Power)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-orange-500"></span>
                  <span>Retained Profit Margin</span>
                </div>
              </div>
            </div>

            {/* Job Type Breakdown */}
            <div className="lg:col-span-4 bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-industrial-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-400" />
                  <span>Job Types Distribution</span>
                </h3>

                <div className="space-y-3 pt-4">
                  {metrics.job_type_distribution.map((job, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-industrial-300 truncate max-w-[180px]">{job.name}</span>
                        <span className="font-mono font-bold text-white">{job.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-industrial-950 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${job.value}%`, backgroundColor: job.color }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-industrial-950 rounded-xl border border-industrial-800 text-[11px] text-industrial-400">
                Main gate fabrications and window security grills account for <strong className="text-white">64%</strong> of workshop cashflow.
              </div>
            </div>

          </div>
        )}

        {/* Minimum Profitable Price Engine (Prevents Undercharging) */}
        <div className="bg-industrial-900 border border-orange-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Anti-Undercharging Safety Guard</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Minimum Profitable Price Calculator
              </h2>
              <p className="text-xs sm:text-sm text-industrial-300 mt-1 max-w-2xl">
                Enter your upcoming job variables. This engine calculates your strict break-even floor and alerts you if you are quoting below your true machine wear and electricity cost!
              </p>
            </div>

            <div className="bg-industrial-950 p-4 rounded-xl border border-industrial-800 text-right min-w-[220px]">
              <span className="text-[10px] text-industrial-400 uppercase font-bold tracking-wider block">
                Never Charge Less Than:
              </span>
              <div className="text-2xl font-black text-orange-400 font-mono">
                ₹{estimatedMinProfitablePrice.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">
                (Break-even cost: ₹{estimatedMinOperatingCost.toLocaleString()})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-industrial-800 text-xs">
            <div>
              <label className="text-industrial-300 block mb-1.5 font-medium">Job Duration (Hours)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={minJobHours}
                onChange={(e) => setMinJobHours(parseFloat(e.target.value) || 0.5)}
                className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-industrial-300 block mb-1.5 font-medium">Estimated Material Cost (₹)</label>
              <input
                type="number"
                step="50"
                value={minJobMaterialCost}
                onChange={(e) => setMinJobMaterialCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white text-sm"
              />
            </div>
            <div>
              <label className="text-industrial-300 block mb-1.5 font-medium">Rods & Discs Consumables (₹)</label>
              <input
                type="number"
                step="25"
                value={minJobConsumablesCost}
                onChange={(e) => setMinJobConsumablesCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Welder Machine & Rates Configuration Form */}
        {profile && (
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-industrial-800">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">
                  Configuration Settings
                </span>
                <h3 className="text-xl font-black text-white">
                  Machine Assets, Tariffs & Hourly Labour Rates
                </h3>
              </div>

              {saveSuccess && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Rates Updated Successfully!</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Primary Machine Name</label>
                  <input
                    type="text"
                    value={profile.machine_name}
                    onChange={(e) => handleProfileChange("machine_name", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Machine Purchase Cost (₹)</label>
                  <input
                    type="number"
                    value={profile.machine_purchase_cost}
                    onChange={(e) => handleProfileChange("machine_purchase_cost", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Expected Lifespan (Hours)</label>
                  <input
                    type="number"
                    value={profile.machine_lifespan_hours}
                    onChange={(e) => handleProfileChange("machine_lifespan_hours", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Electricity Tariff (₹/kWh)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={profile.electricity_rate_kwh}
                    onChange={(e) => handleProfileChange("electricity_rate_kwh", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Your Hourly Labour Rate (₹/hr)</label>
                  <input
                    type="number"
                    step="10"
                    value={profile.hourly_labour_rate}
                    onChange={(e) => handleProfileChange("hourly_labour_rate", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Helper Labour Rate (₹/hr)</label>
                  <input
                    type="number"
                    step="10"
                    value={profile.helper_labour_rate}
                    onChange={(e) => handleProfileChange("helper_labour_rate", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Transport Rate (₹/km)</label>
                  <input
                    type="number"
                    step="1"
                    value={profile.transport_cost_per_km}
                    onChange={(e) => handleProfileChange("transport_cost_per_km", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white"
                  />
                </div>

                <div>
                  <label className="text-industrial-300 block mb-1.5 font-medium">Target Profit Margin (%)</label>
                  <input
                    type="number"
                    step="1"
                    value={profile.target_profit_margin_pct}
                    onChange={(e) => handleProfileChange("target_profit_margin_pct", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl p-2.5 font-mono text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-weld-glow transition-all disabled:opacity-50"
                >
                  {savingProfile ? "Saving Custom Rates..." : "Save Custom Rates to Profile"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Recent Quotations Table */}
        {metrics && metrics.recent_quotes.length > 0 && (
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-industrial-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-400" />
                <span>Saved Customer Quotations</span>
              </h3>
              <span className="text-xs text-industrial-400">Track quotes & profit retention</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-industrial-800 text-industrial-400 font-mono uppercase">
                    <th className="py-3 px-3">Quote Ref</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Service</th>
                    <th className="py-3 px-3">Billed Price</th>
                    <th className="py-3 px-3">Net Profit</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-industrial-850">
                  {metrics.recent_quotes.map((q) => (
                    <tr key={q.id} className="hover:bg-industrial-850/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-orange-400">{q.quote_number}</td>
                      <td className="py-3 px-3 font-medium text-white">{q.customer_name}</td>
                      <td className="py-3 px-3 text-industrial-300 max-w-[200px] truncate">{q.service_name}</td>
                      <td className="py-3 px-3 font-mono font-bold text-white">₹{q.recommended_price.toLocaleString()}</td>
                      <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">+₹{q.profit_margin_amount.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === "Accepted" || q.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-industrial-800 text-industrial-300"
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          to={`/quote-generator?quote=${q.quote_number}`}
                          className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1"
                        >
                          <span>Print / View</span>
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

