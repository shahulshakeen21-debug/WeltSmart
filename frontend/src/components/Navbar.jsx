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
  Cpu
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", path: "/" },
    { name: "Cost Engine", path: "/calculator", icon: Calculator },
    { name: "Equipment Catalog", path: "/tools", icon: Wrench },
    { name: "Cost Analysis", path: "/why-does-it-cost", icon: HelpCircle },
    { name: "Service Directory", path: "/price-guide", icon: BookOpen },
    { name: "Quote Generator", path: "/quote-generator", icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-industrial-950/95 backdrop-blur border-b border-industrial-750 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Mark */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-sm bg-industrial-900 border border-industrial-700 flex items-center justify-center text-forge-400 group-hover:border-forge-500/60 transition-colors">
              <Cpu className="w-4 h-4 text-forge-400" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-wider text-white font-mono uppercase">
                  Weld<span className="text-forge-400">Cost</span>
                </span>
                <span className="text-[9px] font-mono font-bold bg-industrial-850 text-industrial-400 border border-industrial-750 px-1 rounded-xs">
                  v2.4
                </span>
              </div>
              <span className="text-[9px] font-mono text-industrial-500 uppercase tracking-widest -mt-0.5">
                Industrial Cost Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-sm text-xs font-medium transition-colors relative ${
                    active
                      ? "text-white bg-industrial-850 font-semibold"
                      : "text-industrial-400 hover:text-industrial-200 hover:bg-industrial-900"
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forge-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Welder Mode Console Button */}
            <Link
              to="/welder-dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wider uppercase font-mono transition-colors ${
                location.pathname.startsWith("/welder")
                  ? "bg-forge-500 text-white"
                  : "bg-industrial-900 text-forge-400 border border-forge-500/30 hover:bg-industrial-850 hover:border-forge-500/60"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Welder Console</span>
            </Link>

            {/* Admin shortcut */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-sm text-xs font-mono text-industrial-300 bg-industrial-900 border border-industrial-750 hover:text-white"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </Link>
            )}

            {/* User Session Info / Login */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-industrial-800">
                <div className="text-right">
                  <div className="text-xs font-medium text-industrial-200 truncate max-w-[120px]">
                    {user.full_name}
                  </div>
                  <span className="text-[10px] text-forge-400 uppercase font-mono">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Logout session"
                  className="p-1.5 text-industrial-400 hover:text-industrial-200 hover:bg-industrial-900 rounded-sm transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 pl-2 border-l border-industrial-800">
                <Link
                  to="/login"
                  className="px-2.5 py-1.5 text-xs text-industrial-300 hover:text-white hover:bg-industrial-900 rounded-sm transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-semibold bg-industrial-850 hover:bg-industrial-800 text-white border border-industrial-700 rounded-sm transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-sm text-industrial-400 hover:text-white hover:bg-industrial-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-industrial-950 border-b border-industrial-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-sm text-xs font-medium ${
                isActive(link.path)
                  ? "bg-industrial-900 text-white border-l-2 border-forge-500 font-semibold"
                  : "text-industrial-400 hover:bg-industrial-900 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-industrial-800 flex flex-col gap-2">
            <Link
              to="/welder-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-center rounded-sm text-xs font-bold font-mono tracking-wider bg-industrial-900 text-forge-400 border border-forge-500/40"
            >
              WELDER CONSOLE
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-center rounded-sm text-xs font-mono text-amber-400 bg-industrial-900 border border-industrial-750"
              >
                ADMIN PANEL
              </Link>
            )}
            {user ? (
              <div className="flex items-center justify-between px-3 py-2 bg-industrial-900 rounded-sm">
                <span className="text-xs text-industrial-300 font-mono">{user.full_name} ({user.role})</span>
                <button onClick={logout} className="text-xs text-red-400 font-medium">Exit</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 text-center text-xs font-medium text-industrial-300 bg-industrial-900 rounded-sm border border-industrial-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 text-center text-xs font-semibold text-white bg-forge-600 rounded-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
