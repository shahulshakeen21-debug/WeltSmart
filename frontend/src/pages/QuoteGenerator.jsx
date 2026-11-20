import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import confetti from "canvas-confetti";
import { 
  FileText, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Cpu,
  Layers,
  Clock,
  Sparkles,
  Download
} from "lucide-react";

export default function QuoteGenerator() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [existingQuote, setExistingQuote] = useState(null);
  const [loadingExisting, setLoadingExisting] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: user ? user.full_name : "",
    customer_email: user ? user.email : "",
    customer_phone: user?.phone || "",
    location: "Mumbai & Suburbs",
    urgency: "Standard",
    service_name: searchParams.get("service") || "Gate Welding & Main Entrance Fabrication",
    welding_type: "Arc welding",
    material_type: "Mild Steel",
    material_quantity_kg: 25.0,
    number_of_joints: 16,
    duration_hours: 4.5,
    labour_hours: 4.5,
    transport_km: 8.0,
    finishing_required: "Smooth Ground Flush & Wire Brushed",
    notes: "",
  });

  const [generating, setGenerating] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState(null);

  useEffect(() => {
    const qNum = searchParams.get("quote");
    if (qNum) {
      async function loadQuote() {
        setLoadingExisting(true);
        try {
          const q = await api.getQuoteByNumber(qNum);
          setExistingQuote(q);
        } catch (e) {
          console.error(e);
        } finally {
          setLoadingExisting(false);
        }
      }
      loadQuote();
    }
  }, [searchParams]);

  useEffect(() => {
    if (user && !formData.customer_name) {
      setFormData((prev) => ({
        ...prev,
        customer_name: user.full_name,
        customer_email: user.email,
        customer_phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateQuote = async (e) => {
    e.preventDefault();
    if (!formData.customer_name) {
      alert("Please provide the customer name or organization.");
      return;
    }

    setGenerating(true);
    try {
      const quote = await api.createQuote(formData);
      setGeneratedQuote(quote);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 }
        });
      } catch (err) {}
    } catch (err) {
      alert("Error generating quotation: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const activeQuote = existingQuote || generatedQuote;

  return (
    <div className="min-h-screen bg-[#0c0f14] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Active Quote Document View */}
        {activeQuote ? (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="no-print flex items-center justify-between bg-[#141820] border border-[#1f2633] p-4 rounded-2xl">
              <button
                onClick={() => {
                  setGeneratedQuote(null);
                  setExistingQuote(null);
                }}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>New Specification Quote</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-orange-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Quote</span>
              </button>
            </div>

            {/* Official Printable Quotation Document */}
            <div className="bg-white text-slate-900 p-8 sm:p-10 border border-slate-200 shadow-2xl rounded-2xl font-sans printable-card">
              
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-slate-950 font-black text-xl tracking-tight">
                    <span className="w-3.5 h-3.5 bg-orange-500 rounded-full inline-block"></span>
                    <span>WELDTECH INDUSTRIAL AUDIT SPECIFICATION</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-1">
                    REFERENCE NO: {activeQuote.quote_number || "EST-2026-WLD"}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs font-semibold text-slate-600">Generated: {new Date().toLocaleDateString()}</div>
                  <div className="text-[11px] text-slate-500">Validity: 14 Days from issuance</div>
                </div>
              </div>

              {/* Client & Project Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
                <div>
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">Customer &amp; Site Details</div>
                  <div className="text-slate-900 font-bold text-sm">{activeQuote.customer_name}</div>
                  {activeQuote.customer_email && <div className="text-slate-600">{activeQuote.customer_email}</div>}
                  {activeQuote.customer_phone && <div className="text-slate-600">{activeQuote.customer_phone}</div>}
                  <div className="text-slate-600 mt-1">Site: {activeQuote.location}</div>
                </div>

                <div>
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">Scope &amp; Metallurgy</div>
                  <div className="text-slate-900 font-semibold">{activeQuote.service_name}</div>
                  <div className="text-slate-600">Process: {activeQuote.welding_type}</div>
                  <div className="text-slate-600">Material: {activeQuote.material_type} ({activeQuote.material_quantity_kg} kg)</div>
                  <div className="text-slate-600">Joints: {activeQuote.number_of_joints} | Urgency: {activeQuote.urgency}</div>
                </div>
              </div>

              {/* Cost Itemization Breakdown Table */}
              <div className="py-6">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Engineering Itemized Cost Ledger
                </div>

                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-500 font-medium text-left">
                      <th className="py-2">Vector</th>
                      <th className="py-2 text-right">Qty / Duration</th>
                      <th className="py-2 text-right">Rate Metric</th>
                      <th className="py-2 text-right">Subtotal (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Direct Material Stock</td>
                      <td className="py-2 text-right text-slate-600">{activeQuote.material_quantity_kg} kg</td>
                      <td className="py-2 text-right text-slate-600">Base alloy market</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.material_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Filler Electrode / Wire Depletion</td>
                      <td className="py-2 text-right text-slate-600">Calculated beads</td>
                      <td className="py-2 text-right text-slate-600">AWS Standard</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.electrode_wire_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Commercial Arc Electricity</td>
                      <td className="py-2 text-right text-slate-600">{activeQuote.duration_hours} hrs machine pull</td>
                      <td className="py-2 text-right text-slate-600">Commercial MIDC</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.electricity_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Shielding Gas Discharges</td>
                      <td className="py-2 text-right text-slate-600">Cylinder draw</td>
                      <td className="py-2 text-right text-slate-600">Flow regulator</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.gas_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Abrasives &amp; Edge Preparation</td>
                      <td className="py-2 text-right text-slate-600">Discs &amp; wheels</td>
                      <td className="py-2 text-right text-slate-600">Wear rate</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.grinding_cutting_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Machine Tool Wear &amp; Depletion</td>
                      <td className="py-2 text-right text-slate-600">Inverter duty</td>
                      <td className="py-2 text-right text-slate-600">Amortization</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.machine_usage_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Certified Artisan Labour</td>
                      <td className="py-2 text-right text-slate-600">{activeQuote.labour_hours} billable hrs</td>
                      <td className="py-2 text-right text-slate-600">Skill benchmark</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.labour_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">Equipment Logistics &amp; Transport</td>
                      <td className="py-2 text-right text-slate-600">{activeQuote.transport_km} km transit</td>
                      <td className="py-2 text-right text-slate-600">Per km equipment run</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.transportation_cost?.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-slate-800">PPE &amp; Ancillary Consumables</td>
                      <td className="py-2 text-right text-slate-600">Safety overhead</td>
                      <td className="py-2 text-right text-slate-600">Compliance</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.other_expenses?.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Grand Total */}
              <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-center">
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Audited Estimate</div>
                  <div className="text-[11px] text-slate-400">Includes all materials, consumables, and labor margins</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-slate-900">
                    ₹{activeQuote.total_estimated_cost?.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Input Form */
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-widest">
                <FileText className="w-3.5 h-3.5" />
                Quotation Builder
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Customer <span className="text-orange-500">Quote Generator</span>
              </h1>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Enter your project specifications to generate a transparent, formal engineering quote
                complete with full material and operational itemization.
              </p>
            </div>

            <form onSubmit={handleGenerateQuote} className="bg-[#141820] border border-[#1f2633] rounded-2xl p-6 sm:p-8 space-y-6">
              
              {/* Section 1: Customer Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#1f2633]">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">01. Customer Information</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Client / Organization Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.customer_name}
                      onChange={(e) => handleChange("customer_name", e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) => handleChange("customer_email", e.target.value)}
                      placeholder="ramesh@example.com"
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.customer_phone}
                      onChange={(e) => handleChange("customer_phone", e.target.value)}
                      placeholder="+91 98200 00000"
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Technical Specifications */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#1f2633]">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">02. Job Requirements &amp; Scope</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Service Classification</label>
                    <input
                      type="text"
                      value={formData.service_name}
                      onChange={(e) => handleChange("service_name", e.target.value)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Welding Process Type</label>
                    <select
                      value={formData.welding_type}
                      onChange={(e) => handleChange("welding_type", e.target.value)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    >
                      <option value="Arc welding">SMAW (Shielded Metal Arc / Stick)</option>
                      <option value="MIG welding">GMAW (MIG / Solid Wire Gas Shielded)</option>
                      <option value="TIG welding">GTAW (TIG / Argon Shielded)</option>
                      <option value="Gas welding">Oxy-Acetylene Torch Fusion</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Parent Metal Alloy</label>
                    <select
                      value={formData.material_type}
                      onChange={(e) => handleChange("material_type", e.target.value)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    >
                      <option value="Mild Steel">Mild Steel (IS 2062 / Structural)</option>
                      <option value="Stainless Steel">Stainless Steel (SS 304 / 316)</option>
                      <option value="Aluminum">Aluminum Alloy (6061 / 5052)</option>
                      <option value="Cast Iron">Cast Iron Component Repair</option>
                      <option value="Galvanized Iron">Galvanized Steel Pipe</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Est. Raw Metal Weight (kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.material_quantity_kg}
                      onChange={(e) => handleChange("material_quantity_kg", parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Time & Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#1f2633]">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">03. Time, Transport &amp; Finishing</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Number of Joints</label>
                    <input
                      type="number"
                      value={formData.number_of_joints}
                      onChange={(e) => handleChange("number_of_joints", parseInt(e.target.value) || 0)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Labour Hours</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.labour_hours}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        handleChange("labour_hours", val);
                        handleChange("duration_hours", val);
                      }}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Transport Distance (km)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={formData.transport_km}
                      onChange={(e) => handleChange("transport_km", parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Finishing Specification</label>
                    <select
                      value={formData.finishing_required}
                      onChange={(e) => handleChange("finishing_required", e.target.value)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    >
                      <option value="Raw Slag Chipped">Raw (Slag Chipped Only)</option>
                      <option value="Smooth Ground Flush & Wire Brushed">Smooth Ground Flush</option>
                      <option value="Flap Disc Sanded & Mirror Smooth">Flap Disc Sanded (Ready for Paint)</option>
                      <option value="Red Oxide Anti-Rust Primer Coated">Red Oxide Anti-Rust Primer Coated</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Site Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-300 block mb-1.5">Schedule Priority</label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => handleChange("urgency", e.target.value)}
                      className="w-full bg-[#0c0f14] border border-[#1f2633] focus:border-orange-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none transition-colors"
                    >
                      <option value="Standard">Standard Schedule (2–4 Days)</option>
                      <option value="Rush">Expedited / Rush (Next Day)</option>
                      <option value="Emergency">Emergency Site Call (Same Day)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#1f2633]">
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50"
                >
                  <FileText className="w-4 h-4" />
                  <span>{generating ? "Calculating Itemized Cost..." : "Generate Official Quotation"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
