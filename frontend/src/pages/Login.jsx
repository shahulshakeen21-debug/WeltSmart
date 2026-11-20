import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Flame, LogIn, Lock, Mail, AlertCircle, Sparkles, UserCheck } from "lucide-react";

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
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-xs text-industrial-400">
          Access your transparent quotations, welder dashboard, or cost benchmarks.
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
            <div>
              <label className="text-xs font-semibold text-industrial-300 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-industrial-950 border border-industrial-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-industrial-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-industrial-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-industrial-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-industrial-950 border border-industrial-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-industrial-500 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-weld-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? "Authenticating..." : "Sign In"}</span>
            </button>
          </form>

          {/* Quick Demo Logins Container */}
          <div className="mt-6 pt-6 border-t border-industrial-800 space-y-3">
            <span className="text-[11px] font-bold text-industrial-400 uppercase tracking-widest block text-center">
              One-Click Instant Demo Login
            </span>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("welder@weldcost.com", "welder123")}
                className="w-full py-2 px-3 rounded-lg bg-industrial-950 hover:bg-industrial-850 border border-orange-500/40 text-orange-400 text-xs font-semibold text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Login as Master Welder (Rajesh Sharma)</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-industrial-400">Welder</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin@weldcost.com", "admin123")}
                className="w-full py-2 px-3 rounded-lg bg-industrial-950 hover:bg-industrial-850 border border-amber-500/30 text-amber-400 text-xs font-semibold text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Login as Central Administrator</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-industrial-400">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("customer@weldcost.com", "customer123")}
                className="w-full py-2 px-3 rounded-lg bg-industrial-950 hover:bg-industrial-850 border border-industrial-800 text-industrial-300 text-xs font-medium text-left flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Login as Customer (Amit Patel)</span>
                </div>
                <span className="text-[10px] uppercase font-mono text-industrial-500">Customer</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-industrial-400">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-orange-400 font-bold hover:underline">
              Create an Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

