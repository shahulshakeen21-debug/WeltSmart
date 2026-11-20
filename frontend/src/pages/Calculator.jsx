import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CostBreakdownCard from "../components/CostBreakdownCard";
import { 
  Calculator as CalcIcon, 
  Clock, 
  Layers, 
  FileSpreadsheet,
  Zap,
  ArrowRight,
  Activity
} from "lucide-react";

export default function Calculator() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    welding_type: "Arc welding",
    duration_hours: 3.0,
    number_of_joints: 12,
    material_type: "Mild Steel",
    material_quantity_kg: 10.0,
    electrode_wire_qty: 15.0,
    gas_usage_litres: 0.0,
    electricity_kwh_override: null,
    cutting_wheels_used: 2.0,
    grinding_wheels_used: 1.0,
    transport_km: 8.0,
    labour_hours: 3.0,
    labour_rate_per_hour: 250.0,
    electricity_rate_per_kwh: 9.5,
    machine_purchase_cost: 25000.0,
    machine_lifespan_hours: 4000.0,
    transport_rate_per_km: 16.0,
    profit_margin_percent: 22.0,
  });

  const [showAdvancedRates, setShowAdvancedRates] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savingQuote, setSavingQuote] = useState(false);
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    async function loadPresets() {
      try {
        const p = await api.getPresets();
        setPresets(p);
      } catch (e) {
        console.error(e);
      }
    }
    loadPresets();
  }, []);

  useEffect(() => {
    let active = true;
    const runCalculation = async () => {
      setLoading(true);
      try {
        const payload = { ...inputs };
        if (!payload.electricity_kwh_override) {
          delete payload.electricity_kwh_override;
        }
        const res = await api.calculateCost(payload);
        if (active) {
          setCalculationResult(res);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    };

    const timer = setTimeout(runCalculation, 200);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputs]);

  const handleChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleWeldingTypeChange = (type) => {
    let gasLitres = 0;
    let elecWire = inputs.electrode_wire_qty;
    if (type === "TIG welding") { gasLitres = 60.0; elecWire = 4.0; }
    else if (type === "MIG welding") { gasLitres = 25.0; elecWire = 1.5; }
    else if (type === "Gas welding") { gasLitres = 0; elecWire = 2.0; }
    else { gasLitres = 0; elecWire = Math.max(inputs.number_of_joints * 1.2, 5.0); }
    setInputs((prev) => ({ ...prev, welding_type: type, gas_usage_litres: gasLitres, electrode_wire_qty: elecWire }));
  };

  const applyPreset = (preset) => {
    setInputs((prev) => ({ ...prev, ...preset.params }));
  };

  const handleSaveQuote = async () => {
    setSavingQuote(true);
    try {
      const quotePayload = {
        customer_name: user ? user.full_name : "Customer Quote Inquiry",
        customer_email: user ? user.email : "guest@weldcost.com",
        customer_phone: user?.phone || "+91 98000 00000",
        location: "On-site / Workshop",
        service_name: `Custom ${inputs.welding_type} Project (${inputs.number_of_joints} joints)`,
        welding_type: inputs.welding_type,
        material_type: inputs.material_type,
        material_quantity_kg: inputs.material_quantity_kg,
        number_of_joints: inputs.number_of_joints,
        duration_hours: inputs.duration_hours,
        labour_hours: inputs.labour_hours,
        transport_km: inputs.transport_km,
        notes: `Generated via WeldCost Calculator with ${inputs.cutting_wheels_used} cutting wheels, ${inputs.grinding_wheels_used} grinding wheels.`,
      };
      const quote = await api.createQuote(quotePayload);
      navigate(`/quote-generator?quote=${quote.quote_number}`);
    } catch (e) {
      alert("Error saving quote: " + e.message);
    } finally {
      setSavingQuote(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0f14] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#1b212d]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-4 bg-orange-500 rounded-full inline-block" />
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                CALCULATION CONSOLE // V2.4 SPEC
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Fabrication Cost & Price Verification Engine
            </h1>
            <p className="mt-1 text-xs text-industrial-400 max-w-2xl">
              Configure process parameters, consumable depletion, and overheads to calculate the verified operating floor and recommended customer invoice.
            </p>
          </div>

          {/* Presets Bar */}
          {presets.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-2 bg-[#121620] border border-[#1f2633] rounded-2xl">
              <span className="text-[10px] font-mono text-industrial-500 uppercase px-1">Quick Presets:</span>
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className="px-3 py-1.5 text-[11px] font-mono rounded-full bg-[#0c0f14] hover:bg-orange-500 hover:text-white text-industrial-300 border border-[#1f2633] transition-all flex items-center gap-1.5"
                >
                  <span>{p.title.split("/")[0]}</span>
                  <span className="text-orange-400 font-bold">₹{p.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Industrial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Console Input Form */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Section 01: Welding Process */}
            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b212d] text-xs font-mono">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="text-orange-500 font-black">01.</span>
                  <span>Process Architecture</span>
                </span>
                <span className="text-industrial-500 text-[10px] bg-[#0c0f14] px-2 py-0.5 rounded-full border border-[#1b212d]">
                  ACTIVE: {inputs.welding_type}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {[
                  { id: "Arc welding", label: "SMAW (Stick)", spec: "200A • E6013/7018" },
                  { id: "MIG welding", label: "GMAW (MIG)", spec: "250A • ER70S-6 CO2" },
                  { id: "TIG welding", label: "GTAW (TIG)", spec: "200A • Argon 99.9%" },
                  { id: "Gas welding", label: "Oxy-Fuel", spec: "O2 + Acetylene" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleWeldingTypeChange(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      inputs.welding_type === item.id
                        ? "bg-orange-500/20 border-orange-500 text-white font-bold"
                        : "bg-[#0c0f14] border-[#1f2633] text-industrial-400 hover:border-orange-500/40 hover:text-industrial-200"
                    }`}
                  >
                    <div className="font-semibold text-xs">{item.label}</div>
                    <div className="text-[10px] text-industrial-500 mt-0.5">{item.spec}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 02: Temporal & Joint Constraints */}
            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b212d] text-xs font-mono">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="text-orange-500 font-black">02.</span>
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>Temporal & Joint Constraints</span>
                </span>
                <span className="text-industrial-500 text-[10px] bg-[#0c0f14] px-2 py-0.5 rounded-full border border-[#1b212d]">
                  DUTY CYCLE ~55%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-industrial-400">Total Duration (Prep + Arc):</span>
                    <span className="font-bold text-white">{inputs.duration_hours} hrs</span>
                  </div>
                  <input
                    type="range" min="0.5" max="20" step="0.5"
                    value={inputs.duration_hours}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      handleChange("duration_hours", val);
                      handleChange("labour_hours", val);
                    }}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 rounded-full bg-[#1f2633]"
                  />
                  <span className="text-[10px] text-industrial-500 mt-1 block font-sans">
                    Includes joint beveling, tacking, welding, and weld-face dressing
                  </span>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-industrial-400">Number of Welded Joints:</span>
                    <span className="font-bold text-white">{inputs.number_of_joints} joints</span>
                  </div>
                  <input
                    type="range" min="1" max="60" step="1"
                    value={inputs.number_of_joints}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      handleChange("number_of_joints", val);
                      if (inputs.welding_type === "Arc welding") {
                        handleChange("electrode_wire_qty", Math.round(val * 1.3));
                      }
                    }}
                    className="w-full accent-orange-500 cursor-pointer h-1.5 rounded-full bg-[#1f2633]"
                  />
                  <span className="text-[10px] text-industrial-500 mt-1 block font-sans">
                    Governs filler metal burn and abrasive disc depletion
                  </span>
                </div>
              </div>
            </div>

            {/* Section 03: Metallurgy & Consumable BOM */}
            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b212d] text-xs font-mono">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="text-orange-500 font-black">03.</span>
                  <Layers className="w-3.5 h-3.5 text-orange-400" />
                  <span>Metallurgy & Consumable Bill of Materials</span>
                </span>
                <span className="text-industrial-500 text-[10px] bg-[#0c0f14] px-2 py-0.5 rounded-full border border-[#1b212d]">RATES INDEXED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-industrial-400 block mb-1.5">Base Material Alloy</label>
                  <select
                    value={inputs.material_type}
                    onChange={(e) => handleChange("material_type", e.target.value)}
                    className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-orange-500"
                  >
                    <option value="Mild Steel">Mild Steel (MS) — ₹75/kg</option>
                    <option value="Stainless Steel (SS 304)">Stainless Steel SS 304 — ₹280/kg</option>
                    <option value="Stainless Steel (SS 316)">Stainless Steel SS 316 — ₹390/kg</option>
                    <option value="Aluminum (6061)">Aluminum 6061 — ₹320/kg</option>
                    <option value="Cast Iron">Cast Iron — ₹110/kg</option>
                    <option value="Galvanized Iron (GI)">Galvanized Iron (GI) — ₹88/kg</option>
                    <option value="Wrought Iron">Wrought Iron — ₹95/kg</option>
                    <option value="Customer Provided">Customer Provided Material — ₹0/kg</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-industrial-400 block mb-1.5">Stock Weight (kg)</label>
                  <input
                    type="number" min="0" step="1"
                    value={inputs.material_quantity_kg}
                    onChange={(e) => handleChange("material_quantity_kg", parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#1b212d]">
                <div>
                  <label className="text-[11px] font-mono text-industrial-400 block mb-1.5">
                    {inputs.welding_type === "MIG welding" ? "MIG Wire Stock (kg)" : "Electrode Rods (Pieces)"}
                  </label>
                  <input
                    type="number" min="0"
                    step={inputs.welding_type === "MIG welding" ? "0.2" : "1"}
                    value={inputs.electrode_wire_qty}
                    onChange={(e) => handleChange("electrode_wire_qty", parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-orange-500"
                  />
                  <span className="text-[10px] font-mono text-industrial-500 mt-1 block">
                    {inputs.welding_type === "MIG welding" ? "ER70S-6 Spool @ ₹180/kg" : "Rutile/Low-Hydrogen @ ₹12/rod"}
                  </span>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-industrial-400 block mb-1.5">
                    Shielding Gas ({inputs.welding_type === "MIG welding" ? "kg CO2" : "L Argon"})
                  </label>
                  <input
                    type="number" min="0" step="5"
                    disabled={inputs.welding_type === "Arc welding"}
                    value={inputs.gas_usage_litres}
                    onChange={(e) => handleChange("gas_usage_litres", parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-orange-500 disabled:opacity-40 disabled:cursor-not-allowed"
                  />
                  <span className="text-[10px] font-mono text-industrial-500 mt-1 block">
                    {inputs.welding_type === "Arc welding" ? "Manual Arc — flux shielded, gas N/A" : "High-pressure cylinder discharge"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-[#1b212d] font-mono text-xs">
                <div>
                  <label className="text-[10px] text-industrial-400 block mb-1.5">Cut Wheels (4")</label>
                  <input
                    type="number" min="0"
                    value={inputs.cutting_wheels_used}
                    onChange={(e) => handleChange("cutting_wheels_used", parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl px-2.5 py-1.5 text-white focus:border-orange-500 outline-none"
                  />
                  <span className="text-[9px] text-industrial-500 mt-1 block">₹35/disc</span>
                </div>
                <div>
                  <label className="text-[10px] text-industrial-400 block mb-1.5">Grind Wheels (4")</label>
                  <input
                    type="number" min="0"
                    value={inputs.grinding_wheels_used}
                    onChange={(e) => handleChange("grinding_wheels_used", parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl px-2.5 py-1.5 text-white focus:border-orange-500 outline-none"
                  />
                  <span className="text-[9px] text-industrial-500 mt-1 block">₹55/disc</span>
                </div>
                <div>
                  <label className="text-[10px] text-industrial-400 block mb-1.5">Haulage (km)</label>
                  <input
                    type="number" min="0"
                    value={inputs.transport_km}
                    onChange={(e) => handleChange("transport_km", parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl px-2.5 py-1.5 text-white focus:border-orange-500 outline-none"
                  />
                  <span className="text-[9px] text-industrial-500 mt-1 block">Two-way return</span>
                </div>
              </div>
            </div>

            {/* Section 04: Advanced Facility Rates */}
            <div className="bg-[#121620] border border-[#1f2633] rounded-2xl p-5 space-y-3">
              <button
                type="button"
                onClick={() => setShowAdvancedRates(!showAdvancedRates)}
                className="w-full flex items-center justify-between text-xs font-mono font-bold text-industrial-300 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <span className="text-orange-500 font-black">04.</span>
                  <span>Workshop Facility Overheads & Machine Parameters</span>
                </span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-colors ${showAdvancedRates ? "bg-orange-500/10 text-orange-400 border-orange-500/30" : "bg-[#0c0f14] text-industrial-400 border-[#1f2633]"}`}>
                  {showAdvancedRates ? "HIDE ▲" : "CUSTOMIZE ▼"}
                </span>
              </button>

              {showAdvancedRates && (
                <div className="pt-3 border-t border-[#1b212d] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
                  {[
                    { label: "Wage Rate (₹/hr)", field: "labour_rate_per_hour", step: "10" },
                    { label: "Grid Tariff (₹/kWh)", field: "electricity_rate_per_kwh", step: "0.5" },
                    { label: "Target Margin (%)", field: "profit_margin_percent", step: "1" },
                    { label: "Machine Cost (₹)", field: "machine_purchase_cost", step: "500" },
                    { label: "Machine Life (hrs)", field: "machine_lifespan_hours", step: "100" },
                    { label: "Vehicle Rate (₹/km)", field: "transport_rate_per_km", step: "1" },
                  ].map(({ label, field, step }) => (
                    <div key={field}>
                      <label className="text-[10px] text-industrial-500 block mb-1.5">{label}</label>
                      <input
                        type="number" step={step}
                        value={inputs[field]}
                        onChange={(e) => handleChange(field, parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#0c0f14] border border-[#1f2633] rounded-xl p-2 text-white focus:border-orange-500 outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Cost Breakdown Ledger Sheet */}
          <div className="lg:col-span-5 sticky top-20">
            <CostBreakdownCard
              data={calculationResult}
              onSaveQuote={handleSaveQuote}
              isSaving={savingQuote}
            />
          </div>

        </div>

      </div>
    </div>
  );
}
