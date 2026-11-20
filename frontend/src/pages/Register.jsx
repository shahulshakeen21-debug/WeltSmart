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
    <div className="min-h-screen bg-industrial-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="h-10 w-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <span className="text-2xl font-black text-white">
            Weld<span className="text-orange-500">Cost</span>
          </span>
        </Link>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Create an Account
        </h2>
        <p className="mt-1 text-xs text-industrial-400">
          Join the platform promoting fair trade transparency between welders and clients.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-industrial-900 border border-industrial-800 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selector Pill */}
            <div>
              <label className="text-xs font-semibold text-industrial-300 block mb-1.5">
                I am registering as a:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange("role", "customer")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    formData.role === "customer"
                      ? "bg-orange-500/20 border-orange-500 text-orange-400 shadow-sm"
                      : "bg-industrial-950 border-industrial-800 text-industrial-400 hover:text-white"
                  }`}
                >
                  Customer / Client
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("role", "welder")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    formData.role === "welder"
                      ? "bg-orange-500/20 border-orange-500 text-orange-400 shadow-sm"
                      : "bg-industrial-950 border-industrial-800 text-industrial-400 hover:text-white"
                  }`}
                >
                  Welder / Fabricator
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-industrial-300 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-industrial-950 border border-industrial-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-industrial-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-industrial-300 block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-industrial-950 border border-industrial-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-industrial-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-industrial-300 block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-industrial-950 border border-industrial-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-industrial-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-industrial-300 block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-industrial-950 border border-industrial-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-industrial-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {formData.role === "welder" && (
              <div>
                <label className="text-xs font-semibold text-industrial-300 block mb-1">
                  Workshop / Business Name
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.workshop_name}
                    onChange={(e) => handleChange("workshop_name", e.target.value)}
                    placeholder="e.g. Omkar Steel & Fabrication Works"
                    className="w-full bg-industrial-950 border border-industrial-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-industrial-500 outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-weld-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? "Creating Account..." : "Complete Registration"}</span>
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-industrial-400">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-400 font-bold hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

