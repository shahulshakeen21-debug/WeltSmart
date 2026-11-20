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
  FileSpreadsheet
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
    <div className="min-h-screen bg-industrial-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Active Quote Document View */}
        {activeQuote ? (
          <div className="space-y-4">
            {/* Top Toolbar */}
            <div className="no-print flex items-center justify-between bg-industrial-900 border border-industrial-750 p-3 rounded-sm">
              <button
                onClick={() => {
                  setGeneratedQuote(null);
                  setExistingQuote(null);
                }}
                className="flex items-center gap-1.5 text-xs font-mono text-industrial-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>[NEW SPECIFICATION INQUIRY]</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-1.5 rounded-xs bg-forge-600 hover:bg-forge-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Formal Document</span>
              </button>
            </div>

            {/* Official Printable Quotation Document */}
            <div className="bg-white text-slate-900 p-8 sm:p-10 border border-slate-300 shadow-panel font-sans printable-card rounded-xs">
              
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-slate-950 font-black text-xl tracking-tight font-mono">
                    <Cpu className="w-5 h-5 text-orange-600" />
                    <span>WELD<span className="text-orange-600">COST</span> SYSTEMS</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500 block">
                    ENGINEERING BILL OF OPERATIONS & PRICE SPECIFICATION
                  </span>
                </div>

                <div className="text-left sm:text-right font-mono text-xs">
                  <div className="text-lg font-black text-slate-950">{activeQuote.quote_number}</div>
                  <div className="text-slate-600">
                    ISSUED: {new Date(activeQuote.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-emerald-700 font-bold uppercase text-[10px]">
                    STATUS: {activeQuote.status}
                  </div>
                </div>
              </div>

              {/* Parties Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 border-b border-slate-200 text-xs">
                <div className="space-y-1">
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-400 text-[10px] block">
                    Client / Purchasing Party:
                  </span>
                  <div className="font-bold text-sm text-slate-950">{activeQuote.customer_name}</div>
                  {activeQuote.customer_email && <div className="text-slate-600 font-mono text-[11px]">{activeQuote.customer_email}</div>}
                  {activeQuote.customer_phone && <div className="text-slate-600 font-mono text-[11px]">{activeQuote.customer_phone}</div>}
                  <div className="text-slate-600 text-[11px]">Site: {activeQuote.location}</div>
                </div>

                <div className="space-y-1">
                  <span className="font-mono font-bold uppercase tracking-wider text-slate-400 text-[10px] block">
                    Work Package Specification:
                  </span>
                  <div className="font-bold text-sm text-slate-950">{activeQuote.service_name}</div>
                  <div className="text-slate-600 text-[11px]">Welding Process: <strong className="text-slate-800">{activeQuote.welding_type}</strong></div>
                  <div className="text-slate-600 text-[11px]">Alloy: {activeQuote.material_type} ({activeQuote.material_quantity_kg} kg stock)</div>
                  <div className="text-slate-600 text-[11px]">Joint Count: {activeQuote.number_of_joints} | Estimated Duration: {activeQuote.duration_hours} hrs</div>
                </div>
              </div>

              {/* Itemized Cost Breakdown Table */}
              <div className="py-6">
                <h4 className="font-mono font-bold text-[10px] uppercase tracking-wider text-slate-500 mb-3">
                  Itemized Cost Breakdown (Bill of Materials & Operations)
                </h4>
                
                <table className="w-full text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-300 text-left text-slate-700 uppercase text-[10px]">
                      <th className="py-2">Vector</th>
                      <th className="py-2">Engineering Description</th>
                      <th className="py-2 text-right">Amortized Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Base Metal</td>
                      <td className="py-2 text-slate-600">{activeQuote.material_type} structural stock ({activeQuote.material_quantity_kg} kg)</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.material_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Filler Rods / Wire</td>
                      <td className="py-2 text-slate-600">Depleted filler electrode or copper wire</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.electrode_wire_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Power Utility</td>
                      <td className="py-2 text-slate-600">High-amperage arc draw @ commercial tariff (₹9.50/kWh)</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.electricity_cost.toFixed(2)}</td>
                    </tr>
                    {activeQuote.gas_cost > 0 && (
                      <tr>
                        <td className="py-2 font-bold text-slate-900">Shielding Gas</td>
                        <td className="py-2 text-slate-600">Compressed cylinder discharge volume</td>
                        <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.gas_cost.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Abrasives</td>
                      <td className="py-2 text-slate-600">Cutting and grinding wheel disc erosion</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.grinding_cutting_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Machine Tool Wear</td>
                      <td className="py-2 text-slate-600">Inverter capital depreciation + maintenance per arc hour</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.machine_usage_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Skilled Labour</td>
                      <td className="py-2 text-slate-600">{activeQuote.labour_hours} artisan hours for prep, fitup, root & cap</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.labour_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Logistics</td>
                      <td className="py-2 text-slate-600">{activeQuote.transport_km} km tooling transport carriage</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.transport_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Safety & Overheads</td>
                      <td className="py-2 text-slate-600">UV lens replacements, gloves wear, shop buffer</td>
                      <td className="py-2 text-right font-bold text-slate-900">₹{activeQuote.other_expenses_cost.toFixed(2)}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-300">
                      <td colSpan="2" className="pt-2.5 font-bold text-slate-700">Direct Operating Cost (Zero Margin):</td>
                      <td className="pt-2.5 text-right font-bold text-slate-900">₹{activeQuote.total_operating_cost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="py-1 font-bold text-emerald-800">Trade Service Margin:</td>
                      <td className="py-1 text-right font-bold text-emerald-800">+ ₹{activeQuote.profit_margin_amount.toFixed(2)}</td>
                    </tr>
                    <tr className="border-t-2 border-slate-900 text-sm">
                      <td colSpan="2" className="pt-2.5 font-black text-slate-950 font-sans">TOTAL RECOMMENDED ESTIMATE:</td>
                      <td className="pt-2.5 text-right font-black text-lg text-orange-600 font-mono">
                        ₹{Math.round(activeQuote.recommended_price).toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Notes & Verification Clause */}
              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-600 space-y-2">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xs font-mono text-[10px]">
                  <strong>PRICE TRANSPARENCY NOTICE:</strong> This specification certifies that the quoted amount is derived directly from empirical equipment amortization, consumable depletion, and commercial utility rates, not arbitrary markup.
                </div>
                {activeQuote.notes && (
                  <p className="text-slate-700"><strong>Notes:</strong> {activeQuote.notes}</p>
                )}
                <div className="text-[10px] text-slate-500 font-mono">
                  * Valid for 15 days from issuance date. Subject to joint accessibility and surface metallurgy verification.
                </div>
              </div>

              {/* Signature Blocks */}
              <div className="pt-10 mt-6 border-t border-slate-200 flex justify-between text-[11px] font-mono text-slate-600">
                <div className="border-t border-slate-400 w-40 text-center pt-1.5">
                  Client Authorization
                </div>
                <div className="border-t border-slate-400 w-40 text-center pt-1.5">
                  Certified Fabricator
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Work Order Specification Inquiry Form */
          <div className="bg-industrial-900 border border-industrial-750 rounded-sm p-6 sm:p-8 shadow-panel space-y-6">
            <div className="pb-4 border-b border-industrial-800">
              <div className="flex items-center gap-2 mb-1 text-[10px] font-mono font-bold text-forge-400 uppercase">
                <span className="w-2 h-2 bg-forge-500 rounded-xs"></span>
                <span>WORK ORDER SPECIFICATION WIZARD</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Customer Fabrication Quote Generator
              </h1>
              <p className="mt-1 text-xs text-industrial-400">
                Input project requirements to generate an itemized, verifiable bill of operations that you can print, archive, or present to fabricators.
              </p>
            </div>

            <form onSubmit={handleGenerateQuote} className="space-y-5">
              
              {/* Service & Process */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Fabrication Discipline
                  </label>
                  <select
                    value={formData.service_name}
                    onChange={(e) => handleChange("service_name", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
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
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Welding Process
                  </label>
                  <select
                    value={formData.welding_type}
                    onChange={(e) => handleChange("welding_type", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  >
                    <option value="Arc welding">SMAW / Manual Arc (Stick) - Standard</option>
                    <option value="MIG welding">GMAW / MIG Wire (CO2 Shielded)</option>
                    <option value="TIG welding">GTAW / TIG Argon (High Precision SS)</option>
                    <option value="Gas welding">Oxy-Acetylene Thermal Set</option>
                  </select>
                </div>
              </div>

              {/* Material & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Base Metallurgy
                  </label>
                  <select
                    value={formData.material_type}
                    onChange={(e) => handleChange("material_type", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  >
                    <option value="Mild Steel">Mild Steel (MS)</option>
                    <option value="Stainless Steel (SS 304)">Stainless Steel (SS 304)</option>
                    <option value="Stainless Steel (SS 316)">Stainless Steel (SS 316)</option>
                    <option value="Aluminum (6061)">Aluminum (6061)</option>
                    <option value="Cast Iron">Cast Iron</option>
                    <option value="Galvanized Iron (GI)">Galvanized Iron (GI)</option>
                    <option value="Wrought Iron">Wrought Iron</option>
                    <option value="Customer Provided">Customer Provided Material</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Stock Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.material_quantity_kg}
                    onChange={(e) => handleChange("material_quantity_kg", parseFloat(e.target.value) || 0)}
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Joints Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.number_of_joints}
                    onChange={(e) => handleChange("number_of_joints", parseInt(e.target.value) || 1)}
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  />
                </div>
              </div>

              {/* Finishing, Location, Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Weld Dressing / Finish
                  </label>
                  <select
                    value={formData.finishing_required}
                    onChange={(e) => handleChange("finishing_required", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  >
                    <option value="Raw Slag Chipped">Raw (Slag Chipped Only)</option>
                    <option value="Smooth Ground Flush & Wire Brushed">Smooth Ground Flush</option>
                    <option value="Flap Disc Sanded & Mirror Smooth">Flap Disc Sanded (Ready for Paint)</option>
                    <option value="Red Oxide Anti-Rust Primer Coated">Red Oxide Anti-Rust Primer Coated</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Site Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="e.g. Andheri East, Mumbai"
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Schedule Priority
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => handleChange("urgency", e.target.value)}
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  >
                    <option value="Standard">Standard Schedule (2–4 Days)</option>
                    <option value="Rush">Expedited / Rush (Next Day)</option>
                    <option value="Emergency">Emergency Site Call (Same Day)</option>
                  </select>
                </div>
              </div>

              {/* Customer Contact */}
              <div className="pt-3 border-t border-industrial-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customer_name}
                    onChange={(e) => handleChange("customer_name", e.target.value)}
                    placeholder="e.g. Rajesh Malhotra"
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) => handleChange("customer_email", e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-industrial-400 block mb-1">
                    Phone / Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.customer_phone}
                    onChange={(e) => handleChange("customer_phone", e.target.value)}
                    placeholder="+91 98200 00000"
                    className="w-full bg-industrial-950 border border-industrial-750 rounded-xs px-3 py-2 text-xs font-mono text-white outline-none focus:border-forge-500"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={generating}
                  className="w-full py-3 rounded-xs bg-forge-600 hover:bg-forge-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{generating ? "Computing Engineering Bill of Materials..." : "Generate Official Quotation Document"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
