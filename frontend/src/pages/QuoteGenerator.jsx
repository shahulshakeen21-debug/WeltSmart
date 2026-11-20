import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import confetti from "canvas-confetti";
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  AlertCircle,
  Phone,
  Mail,
  User,
  Flame
} from "lucide-react";

export default function QuoteGenerator() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [existingQuote, setExistingQuote] = useState(null);
  const [loadingExisting, setLoadingExisting] = useState(false);

  // Form State
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

  // Check if a quote reference is passed in URL (e.g. ?quote=WC-2026-101)
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

  // Update user info when auth state changes
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
      alert("Please provide your name.");
      return;
    }

    setGenerating(true);
    try {
      const quote = await api.createQuote(formData);
      setGeneratedQuote(quote);
      // Trigger subtle celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (err) {}
    } catch (err) {
      alert("Error generating quote: " + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const activeQuote = existingQuote || generatedQuote;

  return (
    <div className="min-h-screen bg-industrial-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* If a Quote is Active (Generated or Loaded from URL) -> Show Official Printable Invoice View */}
        {activeQuote ? (
          <div className="space-y-6">
            {/* Top Toolbar (Hidden on print) */}
            <div className="no-print flex items-center justify-between bg-industrial-900 border border-industrial-800 p-4 rounded-2xl shadow-xl">
              <button
                onClick={() => {
                  setGeneratedQuote(null);
                  setExistingQuote(null);
                }}
                className="flex items-center gap-2 text-xs font-semibold text-industrial-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Create Another Quotation</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-weld-glow transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>
            </div>

            {/* Official Printable Quotation Card */}
            <div className="bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-200 printable-card">
              
              {/* Quotation Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b-2 border-slate-900 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-orange-600 font-black text-2xl tracking-tight">
                    <Flame className="w-6 h-6 text-orange-600" />
                    <span>Weld<span className="text-slate-900">Cost</span></span>
                  </div>
                  <span className="text-[11px] uppercase font-bold tracking-widest text-slate-500 block">
                    Engineering Price Transparency Platform
                  </span>
                </div>

                <div className="text-left sm:text-right font-mono text-xs">
                  <div className="text-xl font-black text-slate-900">{activeQuote.quote_number}</div>
                  <div className="text-slate-500">
                    Date: {new Date(activeQuote.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-emerald-700 font-bold">
                    Status: {activeQuote.status}
                  </div>
                </div>
              </div>

              {/* Parties Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200 text-xs">
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Prepared For (Customer):
                  </span>
                  <div className="font-bold text-base text-slate-900">{activeQuote.customer_name}</div>
                  {activeQuote.customer_email && <div className="text-slate-600">{activeQuote.customer_email}</div>}
                  {activeQuote.customer_phone && <div className="text-slate-600">{activeQuote.customer_phone}</div>}
                  <div className="text-slate-600">Location: {activeQuote.location}</div>
                </div>

                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Project & Specifications:
                  </span>
                  <div className="font-bold text-base text-slate-900">{activeQuote.service_name}</div>
                  <div className="text-slate-600">Welding Process: {activeQuote.welding_type}</div>
                  <div className="text-slate-600">Material: {activeQuote.material_type} ({activeQuote.material_quantity_kg} kg)</div>
                  <div className="text-slate-600">Joints: {activeQuote.number_of_joints} | Duration: {activeQuote.duration_hours} hrs</div>
                  <div className="text-slate-600">Priority: {activeQuote.urgency}</div>
                </div>
              </div>

              {/* Transparent Cost Breakdown Table */}
              <div className="py-6">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-4">
                  Itemized Transparent Cost Breakdown
                </h4>
                
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-left text-slate-700 uppercase">
                      <th className="py-2.5">Cost Category</th>
                      <th className="py-2.5">Engineering Description</th>
                      <th className="py-2.5 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Material Cost</td>
                      <td className="py-2 text-slate-600">{activeQuote.material_type} raw metal ({activeQuote.material_quantity_kg} kg)</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.material_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Electrodes / Wire</td>
                      <td className="py-2 text-slate-600">Filler rods / wire consumed in joints</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.electrode_wire_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Electricity Power</td>
                      <td className="py-2 text-slate-600">High-voltage arc current @ commercial tariff</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.electricity_cost.toFixed(2)}</td>
                    </tr>
                    {activeQuote.gas_cost > 0 && (
                      <tr>
                        <td className="py-2 font-bold text-slate-900">Shielding Gas</td>
                        <td className="py-2 text-slate-600">Argon / CO2 compressed cylinder consumption</td>
                        <td className="py-2 text-right font-bold">₹{activeQuote.gas_cost.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Grinding & Cutting</td>
                      <td className="py-2 text-slate-600">Abrasive wheel diameter wear & disc erosion</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.grinding_cutting_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Machine Usage & Wear</td>
                      <td className="py-2 text-slate-600">Inverter depreciation & maintenance per hour</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.machine_usage_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Welder Labour</td>
                      <td className="py-2 text-slate-600">{activeQuote.labour_hours} artisan hours for prep, fitup & weld</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.labour_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Transportation</td>
                      <td className="py-2 text-slate-600">{activeQuote.transport_km} km tooling transport</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.transport_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Other Expenses & Safety</td>
                      <td className="py-2 text-slate-600">Protective gear wear & shop consumable buffer</td>
                      <td className="py-2 text-right font-bold">₹{activeQuote.other_expenses_cost.toFixed(2)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-300 font-sans">
                      <td colSpan="2" className="pt-3 font-bold text-slate-600">Total Operating Cost (Zero Margin):</td>
                      <td className="pt-3 text-right font-bold text-slate-900 font-mono">₹{activeQuote.total_operating_cost.toFixed(2)}</td>
                    </tr>
                    <tr className="font-sans">
                      <td colSpan="2" className="py-1 font-bold text-emerald-700">Reasonable Artisan / Trade Margin:</td>
                      <td className="py-1 text-right font-bold text-emerald-700 font-mono">+ ₹{activeQuote.profit_margin_amount.toFixed(2)}</td>
                    </tr>
                    <tr className="border-t-2 border-slate-900 font-sans text-sm">
                      <td colSpan="2" className="pt-3 font-black text-slate-900 text-base">RECOMMENDED TOTAL ESTIMATE:</td>
                      <td className="pt-3 text-right font-black text-xl text-orange-600 font-mono">₹{Math.round(activeQuote.recommended_price).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Notes & Transparency Statement */}
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-slate-900">Transparency Guarantee:</strong> This estimate proves that the welder's price is not arbitrary cash pocketed, but a fair compensation covering heavy machinery, electricity, consumable rods, and dangerous physical labour.
                </div>
                {activeQuote.notes && (
                  <p><strong className="text-slate-800">Job Notes:</strong> {activeQuote.notes}</p>
                )}
                <p className="text-[10px] text-slate-500 italic">
                  * Valid for 15 days from issuance. Subject to site verification of metal gauge and structural conditions.
                </p>
              </div>

              {/* Signatures block for formal agreement */}
              <div className="pt-12 mt-8 border-t border-slate-200 flex justify-between text-xs text-slate-500">
                <div className="border-t border-slate-400 w-48 text-center pt-2">
                  Customer Acceptance
                </div>
                <div className="border-t border-slate-400 w-48 text-center pt-2">
                  Certified Welder / Fabricator
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Quote Request Wizard Form */
          <div className="bg-industrial-900 border border-industrial-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-1">
                Instant Quote Wizard
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Customer Welding Quote Generator
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-industrial-300">
                Enter your job requirements to generate a complete, transparent, itemized cost estimate that you can download, print, or share with local welders.
              </p>
            </div>

            <form onSubmit={handleGenerateQuote} className="space-y-6">
              
              {/* Service & Process */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Welding Service Category
                  </label>
                  <select
                    value={formData.service_name}
                    onChange={(e) => handleChange("service_name", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  >
                    <option value="Gate Welding & Main Entrance Fabrication">Gate Welding & Main Entrance Fabrication</option>
                    <option value="Window Safety Grill & Balcony Enclosure Welding">Window Safety Grill & Balcony Enclosure Welding</option>
                    <option value="Spiral & Straight Metal Staircase Fabrication">Spiral & Straight Metal Staircase Fabrication</option>
                    <option value="High-Pressure Pipe Joint & Flange Welding">High-Pressure Pipe Joint & Flange Welding</option>
                    <option value="Bike, Scooter & Vehicle Chassis / Silencer Repair">Bike, Scooter & Vehicle Chassis / Silencer Repair</option>
                    <option value="Agricultural Equipment & Tractor Attachment Repair">Agricultural Equipment & Tractor Attachment Repair</option>
                    <option value="Heavy Structural I-Beam, Truss & Shed Welding">Heavy Structural I-Beam, Truss & Shed Welding</option>
                    <option value="Sheet Metal Enclosure & Cabinet Welding">Sheet Metal Enclosure & Cabinet Welding</option>
                    <option value="Industrial Loft Metal & Wood Furniture Welding">Industrial Loft Metal & Wood Furniture Welding</option>
                    <option value="Custom Metal Art & Decorative Architectural Fabrication">Custom Metal Art & Decorative Fabrication</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Welding Process
                  </label>
                  <select
                    value={formData.welding_type}
                    onChange={(e) => handleChange("welding_type", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  >
                    <option value="Arc welding">Arc / Stick (SMAW) - Standard</option>
                    <option value="MIG welding">MIG / MAG (Wire Feed) - Clean & Fast</option>
                    <option value="TIG welding">TIG (Argon Gas) - High Precision & SS</option>
                    <option value="Gas welding">Gas / Oxy-Acetylene</option>
                  </select>
                </div>
              </div>

              {/* Material & Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Material Type
                  </label>
                  <select
                    value={formData.material_type}
                    onChange={(e) => handleChange("material_type", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  >
                    <option value="Mild Steel">Mild Steel (MS)</option>
                    <option value="Stainless Steel (SS 304)">Stainless Steel (SS 304)</option>
                    <option value="Stainless Steel (SS 316)">Stainless Steel (SS 316)</option>
                    <option value="Aluminum (6061)">Aluminum (6061)</option>
                    <option value="Cast Iron">Cast Iron</option>
                    <option value="Galvanized Iron (GI)">Galvanized Iron (GI)</option>
                    <option value="Wrought Iron">Wrought Iron</option>
                    <option value="Customer Provided">Customer Has Material</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Estimated Weight / Size (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.material_quantity_kg}
                    onChange={(e) => handleChange("material_quantity_kg", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Number of Joints to Weld
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.number_of_joints}
                    onChange={(e) => handleChange("number_of_joints", parseInt(e.target.value) || 1)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Finishing, Location & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Required Finishing
                  </label>
                  <select
                    value={formData.finishing_required}
                    onChange={(e) => handleChange("finishing_required", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  >
                    <option value="Raw Slag Chipped">Raw (Slag Chipped)</option>
                    <option value="Smooth Ground Flush & Wire Brushed">Smooth Ground Flush</option>
                    <option value="Flap Disc Sanded & Mirror Smooth">Flap Disc Sanded (Ready for Paint)</option>
                    <option value="Red Oxide Anti-Rust Primer Coated">Red Oxide Anti-Rust Primer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g. Andheri East, Mumbai"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Urgency
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleChange("urgency", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  >
                    <option value="Standard">Standard (2–4 Days)</option>
                    <option value="Rush">Rush (Next Day)</option>
                    <option value="Emergency">Emergency (Same Day)</option>
                  </select>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="pt-4 border-t border-industrial-800 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => handleChange("customer_name", e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => handleChange("customer_email", e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => handleChange("customer_phone", e.target.value)}
                    placeholder="e.g. +91 98200 12345"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm uppercase tracking-wider shadow-weld-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FileText className="w-4 h-4" />
                  <span>{generating ? "Calculating Itemized Engineering Breakdown..." : "Generate Transparent Official Quotation"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}

