import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Calculator, 
  Wrench, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  LayoutDashboard, 
  ShieldAlert, 
  Menu, 
  X, 
  LogOut, 
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Monitoring & Calc", path: "/calculator" },
    { name: "Analytics & Tools", path: "/tools" },
    { name: "Price Guide", path: "/price-guide" },
    { name: "Why Cost Analysis", path: "/why-does-it-cost" },
    { name: "Quote Generator", path: "/quote-generator" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname !== "/") return false;
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0c0f14]/95 backdrop-blur-md border-b border-[#1b212d] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Mark: Welder Mask Logo + Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 group-hover:border-orange-500/80 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all">
              {/* Exact Welder Helmet SVG Icon */}
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 text-orange-500"
              >
                <path d="M4 10a8 8 0 0 1 16 0v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7z" />
                <rect x="7" y="8" width="10" height="5" rx="1" />
                <line x1="9" y1="17" x2="15" y2="17" />
                <line x1="10" y1="19" x2="14" y2="19" />
                <circle cx="4" cy="11" r="1" />
                <circle cx="20" cy="11" r="1" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-wider text-white font-sans uppercase">
                WELD<span className="text-orange-500">TECH</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-industrial-400 uppercase -mt-0.5">
                SMART WELDING SYSTEM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-5 text-xs font-medium transition-colors relative flex items-center ${
                    active
                      ? "text-white font-bold"
                      : "text-industrial-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-orange-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Status / Auth */}
          <div className="hidden md:flex items-center gap-4">
            {/* System Online Status Indicator */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-industrial-300">System Online</span>
            </div>

            {/* Welder Mode Console (if logged in as welder) */}
            {user?.role === "welder" && (
              <Link
                to="/welder-dashboard"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500 hover:text-white transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Welder Console</span>
              </Link>
            )}

            {/* Admin shortcut */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500 hover:text-white transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}

            {/* Login / User pill button */}
            {user ? (
              <div className="flex items-center gap-2 border-l border-[#1f2633] pl-3">
                <span className="text-xs font-medium text-industrial-300 truncate max-w-[120px]">
                  {user.full_name?.split(" ")[0] || user.email}
                </span>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 text-industrial-400 hover:text-red-400 rounded-full hover:bg-industrial-800 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-1.5 rounded-full text-xs font-semibold text-industrial-200 hover:text-white border border-amber-600/60 hover:border-orange-500 hover:bg-orange-500/10 transition-all shadow-sm"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-500" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-industrial-400">Online</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-industrial-400 hover:text-white rounded-lg bg-industrial-900 border border-industrial-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0f14] border-b border-[#1b212d] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                isActive(link.path)
                  ? "bg-orange-500/20 text-orange-400 font-bold border-l-2 border-orange-500"
                  : "text-industrial-300 hover:bg-industrial-900"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#1b212d] flex flex-col gap-2">
            <Link
              to="/welder-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30 text-center"
            >
              Welder Dashboard
            </Link>
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-center"
              >
                Sign Out ({user.email})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold rounded-full bg-orange-500 text-white text-center flex items-center justify-center gap-1.5"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
