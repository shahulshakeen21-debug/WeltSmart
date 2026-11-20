import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Flame, LogIn, Lock, Mail, AlertCircle, UserCheck, Terminal, Shield } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === "welder") {
        navigate("/welder-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setLoading(true);
    try {
      const user = await login(demoEmail, demoPassword);
      if (user.role === "welder") {
        navigate("/welder-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Failed to login with demo account");
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
          Operator Authentication
        </h2>
        <p className="text-xs font-mono text-industrial-400">
          SECURE PROTOCOL // FABRICATION ERP & AUDIT PORTAL
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
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                Operator Identifier (Email)
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@precision-weld.com"
                  className="w-full bg-industrial-950 border border-industrial-800 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-industrial-600 outline-none focus:border-forge-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-industrial-300 uppercase block">
                Access Passphrase
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-industrial-950 border border-industrial-800 pl-9 pr-3 py-2 font-mono text-xs text-white placeholder-industrial-600 outline-none focus:border-forge-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-forge-600 hover:bg-forge-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-forge-400/40 disabled:opacity-50"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{loading ? "VALIDATING CREDENTIALS..." : "Authenticate Session"}</span>
            </button>
          </form>

          {/* Quick Demo Logins Container */}
          <div className="pt-5 border-t border-industrial-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-forge-500 uppercase tracking-widest block">
                PRE-CONFIGURED TEST PROFILES
              </span>
              <span className="font-mono text-[9px] text-industrial-500 uppercase">ONE-CLICK</span>
            </div>
            
            <div className="grid grid-cols-1 gap-2 font-mono text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("welder@weldcost.com", "welder123")}
                className="w-full py-2 px-3 bg-industrial-950 hover:bg-industrial-800 border border-forge-600/40 text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-forge-500" />
                  <span className="text-industrial-200">Artisan Welder (Rajesh Sharma)</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-forge-400 bg-forge-950 px-1 border border-forge-800">Welder</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin@weldcost.com", "admin123")}
                className="w-full py-2 px-3 bg-industrial-950 hover:bg-industrial-800 border border-amber-600/40 text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-industrial-200">Central Benchmark Admin</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-amber-400 bg-amber-950 px-1 border border-amber-800">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("customer@weldcost.com", "customer123")}
                className="w-full py-2 px-3 bg-industrial-950 hover:bg-industrial-800 border border-industrial-800 text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-industrial-400" />
                  <span className="text-industrial-300">Client / Contractor (Amit Patel)</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-industrial-500 bg-industrial-900 px-1 border border-industrial-800">Client</span>
              </button>
            </div>
          </div>

          <div className="text-center font-mono text-xs text-industrial-400 pt-2 border-t border-industrial-800/80">
            Unregistered entity?{" "}
            <Link to="/register" className="text-forge-500 hover:text-forge-400 font-bold underline">
              Create Work Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
