import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import CostBreakdownCard from "../components/CostBreakdownCard";
import { 
  Calculator as CalcIcon, 
  Settings2, 
  Sparkles, 
  Zap, 
  RotateCcw, 
  Sliders, 
  CheckCircle,
  Truck,
  Disc,
  Info,
  Clock,
  Layers,
  Fuel,
  Hammer
} from "lucide-react";

export default function Calculator() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form inputs state
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
    // Welder custom overrides
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

  // Fetch presets on load
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

  // Recalculate whenever inputs change
  useEffect(() => {
    let active = true;
    const runCalculation = async () => {
      setLoading(true);
      try {
        const payload = { ...inputs };
        // Clean empty overrides
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

    const timer = setTimeout(runCalculation, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputs]);

  const handleChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWeldingTypeChange = (type) => {
    let gasLitres = 0;
    let elecWire = inputs.electrode_wire_qty;

    if (type === "TIG welding") {
      gasLitres = 60.0;
      elecWire = 4.0;
    } else if (type === "MIG welding") {
      gasLitres = 25.0;
      elecWire = 1.5; // kg
    } else if (type === "Gas welding") {
      gasLitres = 0;
      elecWire = 2.0;
    } else {
      gasLitres = 0;
      elecWire = Math.max(inputs.number_of_joints * 1.2, 5.0);
    }

    setInputs((prev) => ({
      ...prev,
      welding_type: type,
      gas_usage_litres: gasLitres,
      electrode_wire_qty: elecWire,
    }));
  };

  const applyPreset = (preset) => {
    setInputs((prev) => ({
      ...prev,
      ...preset.params,
    }));
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
    <div className="min-h-screen bg-industrial-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <CalcIcon className="w-3.5 h-3.5" />
            Interactive Engineering Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Welding Cost & Transparency Calculator
          </h1>
          <p className="mt-2 text-sm sm:text-base text-industrial-300">
            Adjust any welding variable below to see the exact mathematical cost breakdown across materials, machine wear, power consumption, consumables, and fair labour.
          </p>

          {/* Quick presets pills */}
          {presets.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-industrial-400 font-semibold mr-1">Quick Presets:</span>
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-industrial-900 border border-industrial-800 hover:border-orange-500/50 text-industrial-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>{p.title}</span>
                  <span className="text-orange-400 font-mono">₹{p.price}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-column layout: Inputs on Left, Real-time Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Welding Process Selector */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6">
              <label className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>1. Select Welding Process</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "Arc welding", label: "Arc / Stick", sub: "SMAW, MMA" },
                  { id: "MIG welding", label: "MIG / MAG", sub: "GMAW Wire" },
                  { id: "TIG welding", label: "TIG Welding", sub: "GTAW, Argon" },
                  { id: "Gas welding", label: "Gas Welding", sub: "Oxy-Acetylene" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleWeldingTypeChange(item.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      inputs.welding_type === item.id
                        ? "bg-orange-500/15 border-orange-500 text-white shadow-weld-glow"
                        : "bg-industrial-950 border-industrial-800 text-industrial-400 hover:border-industrial-700"
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold block">{item.label}</div>
                    <div className="text-[10px] text-industrial-400 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Job Dimensions & Time */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 space-y-5">
              <label className="text-xs font-bold text-orange-400 uppercase tracking-widest block flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>2. Time, Joints & Labour Duration</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-industrial-300 font-medium">Job Duration (Total Hours)</span>
                    <span className="text-white font-mono font-bold">{inputs.duration_hours} hrs</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="20"
                    step="0.5"
                    value={inputs.duration_hours}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      handleChange("duration_hours", val);
                      handleChange("labour_hours", val);
                    }}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-industrial-500 mt-1">Includes setup, arc time, and grinding</div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-industrial-300 font-medium">Number of Joints to Fuse</span>
                    <span className="text-white font-mono font-bold">{inputs.number_of_joints} joints</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    value={inputs.number_of_joints}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      handleChange("number_of_joints", val);
                      if (inputs.welding_type === "Arc welding") {
                        handleChange("electrode_wire_qty", Math.round(val * 1.3));
                      }
                    }}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <div className="text-[10px] text-industrial-500 mt-1">Directly influences filler rods & discs needed</div>
                </div>
              </div>
            </div>

            {/* 3. Raw Materials & Filler Metals */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 space-y-5">
              <label className="text-xs font-bold text-orange-400 uppercase tracking-widest block flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>3. Material Type & Consumables</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-industrial-300 block mb-1.5 font-medium">
                    Base Material Type
                  </label>
                  <select
                    value={inputs.material_type}
                    onChange={(e) => handleChange("material_type", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-orange-500"
                  >
                    <option value="Mild Steel">Mild Steel (₹75/kg)</option>
                    <option value="Stainless Steel (SS 304)">Stainless Steel SS 304 (₹280/kg)</option>
                    <option value="Stainless Steel (SS 316)">Stainless Steel SS 316 (₹390/kg)</option>
                    <option value="Aluminum (6061)">Aluminum 6061 (₹320/kg)</option>
                    <option value="Cast Iron">Cast Iron (₹110/kg)</option>
                    <option value="Galvanized Iron (GI)">Galvanized Iron GI (₹88/kg)</option>
                    <option value="Wrought Iron">Wrought Iron (₹95/kg)</option>
                    <option value="Customer Provided">Customer Already Has Material (₹0)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-industrial-300 block mb-1.5 font-medium">
                    Material Quantity (kg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={inputs.material_quantity_kg}
                    onChange={(e) => handleChange("material_quantity_kg", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Electrodes / Wire & Gas Usage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-industrial-800">
                <div>
                  <label className="text-xs text-industrial-300 block mb-1.5 font-medium">
                    {inputs.welding_type === "MIG welding" ? "MIG Wire (kg)" : "Welding Rods (Pieces)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step={inputs.welding_type === "MIG welding" ? "0.2" : "1"}
                    value={inputs.electrode_wire_qty}
                    onChange={(e) => handleChange("electrode_wire_qty", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-orange-500"
                  />
                  <div className="text-[10px] text-industrial-500 mt-1">
                    {inputs.welding_type === "MIG welding" ? "@ ₹180 per kg" : "@ ₹12 per electrode rod"}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-industrial-300 block mb-1.5 font-medium">
                    Shielding Gas ({inputs.welding_type === "MIG welding" ? "kg CO2" : "Litres Argon"})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    disabled={inputs.welding_type === "Arc welding"}
                    value={inputs.gas_usage_litres}
                    onChange={(e) => handleChange("gas_usage_litres", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none focus:border-orange-500 disabled:opacity-40"
                  />
                  <div className="text-[10px] text-industrial-500 mt-1">
                    {inputs.welding_type === "Arc welding" ? "Not required for stick welding" : "Industrial compressed cylinder charge"}
                  </div>
                </div>
              </div>

              {/* Cutting & Grinding Wheels */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-industrial-800">
                <div>
                  <label className="text-xs text-industrial-300 block mb-1 font-medium">
                    Cutting Discs
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={inputs.cutting_wheels_used}
                    onChange={(e) => handleChange("cutting_wheels_used", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3 py-1.5 text-xs font-mono text-white"
                  />
                  <div className="text-[10px] text-industrial-500 mt-0.5">₹35/disc</div>
                </div>

                <div>
                  <label className="text-xs text-industrial-300 block mb-1 font-medium">
                    Grinding Discs
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={inputs.grinding_wheels_used}
                    onChange={(e) => handleChange("grinding_wheels_used", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3 py-1.5 text-xs font-mono text-white"
                  />
                  <div className="text-[10px] text-industrial-500 mt-0.5">₹55/disc</div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs text-industrial-300 block mb-1 font-medium">
                    Transport (km)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={inputs.transport_km}
                    onChange={(e) => handleChange("transport_km", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3 py-1.5 text-xs font-mono text-white"
                  />
                  <div className="text-[10px] text-industrial-500 mt-0.5">Two-way haulage</div>
                </div>
              </div>
            </div>

            {/* 4. Welder Mode Advanced Parameters Toggle */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-5">
              <button
                type="button"
                onClick={() => setShowAdvancedRates(!showAdvancedRates)}
                className="w-full flex items-center justify-between text-xs font-bold text-industrial-300 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-400" />
                  <span>Customize Welder Operating Rates & Machine Costs</span>
                </span>
                <span className="text-xs text-orange-400 font-mono">
                  {showAdvancedRates ? "Hide Rates ▲" : "Configure Custom Rates ▼"}
                </span>
              </button>

              {showAdvancedRates && (
                <div className="mt-5 pt-4 border-t border-industrial-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-industrial-400 block mb-1">Labour Rate (₹/hour)</label>
                    <input
                      type="number"
                      value={inputs.labour_rate_per_hour}
                      onChange={(e) => handleChange("labour_rate_per_hour", parseFloat(e.target.value) || 0)}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="text-industrial-400 block mb-1">Power Tariff (₹/kWh)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={inputs.electricity_rate_per_kwh}
                      onChange={(e) => handleChange("electricity_rate_per_kwh", parseFloat(e.target.value) || 0)}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="text-industrial-400 block mb-1">Profit Margin (%)</label>
                    <input
                      type="number"
                      value={inputs.profit_margin_percent}
                      onChange={(e) => handleChange("profit_margin_percent", parseFloat(e.target.value) || 0)}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="text-industrial-400 block mb-1">Machine Cost (₹)</label>
                    <input
                      type="number"
                      value={inputs.machine_purchase_cost}
                      onChange={(e) => handleChange("machine_purchase_cost", parseFloat(e.target.value) || 0)}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="text-industrial-400 block mb-1">Machine Lifespan (hrs)</label>
                    <input
                      type="number"
                      value={inputs.machine_lifespan_hours}
                      onChange={(e) => handleChange("machine_lifespan_hours", parseFloat(e.target.value) || 0)}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 font-mono text-white"
                    />
                  </div>
                  <div>
                    <label className="text-industrial-400 block mb-1">Transport Rate (₹/km)</label>
                    <input
                      type="number"
                      value={inputs.transport_rate_per_km}
                      onChange={(e) => handleChange("transport_rate_per_km", parseFloat(e.target.value) || 0)}
                      className="w-full bg-industrial-950 border border-industrial-700 rounded-lg p-2 font-mono text-white"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Live Itemized Cost Breakdown Card */}
          <div className="lg:col-span-5 sticky top-24">
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

