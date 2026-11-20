import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Flame, UserPlus, Lock, Mail, User, Phone, Briefcase, AlertCircle } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "customer", // customer or welder
    phone: "",
    workshop_name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await register(formData);
      if (user.role === "welder") {
        navigate("/welder-dashboard");
      } else {
        navigate("/quote-generator");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-industrial-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 tech-grid">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 group mb-2">
          <div className="h-9 w-9 bg-industrial-900 border border-forge-500/40 flex items-center justify-center text-forge-500">
            <Flame className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-mono tracking-wider text-white uppercase">
            WELD<span className="text-forge-500">COST</span>
            <span className="ml-1 text-[10px] text-industrial-500 font-mono">v2.4</span>
          </span>
        </Link>
        <h2 className="text-lg font-bold font-mono text-white uppercase tracking-tight">
          Operator Account Registration
        </h2>
        <p className="text-xs font-mono text-industrial-400">
          ENROLLMENT SPECIFICATION // TRANSPARENCY PROTOCOL
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-industrial-900 border border-industrial-800 p-6 sm:p-8 space-y-5">
          
          {error && (
            <div className="p-3 bg-red-950/60 border border-red-800/80 flex items-center gap-2 font-mono text-xs text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selector Pill */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                Account Classification
              </label>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => handleChange("role", "customer")}
                  className={`py-2 px-3 border uppercase transition-colors ${
                    formData.role === "customer"
                      ? "bg-forge-600 text-white border-forge-500 font-bold"
                      : "bg-industrial-950 border-industrial-800 text-industrial-400 hover:text-white"
                  }`}
                >
                  Client / Buyer
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("role", "welder")}
                  className={`py-2 px-3 border uppercase transition-colors ${
                    formData.role === "welder"
                      ? "bg-forge-600 text-white border-forge-500 font-bold"
                      : "bg-industrial-950 border-industrial-800 text-industrial-400 hover:text-white"
                  }`}
                >
                  Artisan Welder
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                Full Name / Contact Lead *
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-industrial-950 border border-industrial-800 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-industrial-600 outline-none focus:border-forge-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                Official Email Address *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="operator@precision-weld.com"
                  className="w-full bg-industrial-950 border border-industrial-800 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-industrial-600 outline-none focus:border-forge-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                Passphrase (Min 6 Characters) *
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-industrial-950 border border-industrial-800 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-industrial-600 outline-none focus:border-forge-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                Telephone / WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-industrial-950 border border-industrial-800 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-industrial-600 outline-none focus:border-forge-500"
                />
              </div>
            </div>

            {formData.role === "welder" && (
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                  Workshop / Fabrication Entity Name
                </label>
                <div className="relative">
                  <Briefcase className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.workshop_name}
                    onChange={(e) => handleChange("workshop_name", e.target.value)}
                    placeholder="e.g. Omkar Steel & Fabrication Works"
                    className="w-full bg-industrial-950 border border-industrial-800 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-industrial-600 outline-none focus:border-forge-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-forge-600 hover:bg-forge-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-forge-400/40 disabled:opacity-50"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{loading ? "ENROLLING OPERATOR..." : "Complete Account Registration"}</span>
            </button>
          </form>

          <div className="text-center font-mono text-xs text-industrial-400 pt-2 border-t border-industrial-800/80">
            Registered entity?{" "}
            <Link to="/login" className="text-forge-500 hover:text-forge-400 font-bold underline">
              Authenticate
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
