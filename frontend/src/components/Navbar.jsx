import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Flame, 
  Calculator, 
  Wrench, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  LayoutDashboard, 
  ShieldAlert, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  User, 
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const { user, logout, isWelder, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cost Calculator", path: "/calculator", icon: Calculator },
    { name: "Tools & Equipment", path: "/tools", icon: Wrench },
    { name: "Why It Costs?", path: "/why-does-it-cost", icon: HelpCircle },
    { name: "Price Guide", path: "/price-guide", icon: BookOpen },
    { name: "Get Quote", path: "/quote-generator", icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-industrial-950/90 backdrop-blur-md border-b border-industrial-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 p-0.5 shadow-weld-glow group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-industrial-950 rounded-[7px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500 group-hover:text-amber-400 transition-colors animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center">
                Weld<span className="text-orange-500">Cost</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-industrial-400 block -mt-1">
                Transparency Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-all ${
                    active
                      ? "bg-industrial-800 text-orange-400 border border-orange-500/30"
                      : "text-industrial-300 hover:text-white hover:bg-industrial-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Auth Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Welder Mode Shortcut Button */}
            <Link
              to="/welder-dashboard"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                location.pathname.startsWith("/welder")
                  ? "bg-orange-500 text-white shadow-weld-glow"
                  : "bg-industrial-900 text-orange-400 border border-orange-500/40 hover:bg-orange-500/10 hover:border-orange-500"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Welder Mode</span>
            </Link>

            {/* Admin shortcut if admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-industrial-850 text-amber-400 border border-amber-500/30 hover:bg-industrial-800"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            )}

            {/* User Profile / Login */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-industrial-800">
                <div className="text-right">
                  <div className="text-xs font-medium text-white truncate max-w-[110px]">
                    {user.full_name}
                  </div>
                  <span className="text-[10px] text-orange-400 uppercase font-mono tracking-wider">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 text-industrial-400 hover:text-red-400 hover:bg-industrial-900 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 pl-2 border-l border-industrial-800">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-medium text-industrial-200 hover:text-white hover:bg-industrial-900 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-md shadow-sm transition-all"
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
              className="p-2 rounded-md text-industrial-400 hover:text-white hover:bg-industrial-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-industrial-900/95 border-b border-industrial-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.path)
                  ? "bg-industrial-800 text-orange-400"
                  : "text-industrial-300 hover:bg-industrial-850 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-industrial-800 flex flex-col gap-2">
            <Link
              to="/welder-dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-center rounded-md text-sm font-semibold bg-industrial-850 text-orange-400 border border-orange-500/40"
            >
              Welder Mode Dashboard
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-center rounded-md text-sm font-medium bg-industrial-850 text-amber-400 border border-amber-500/30"
              >
                Admin Panel
              </Link>
            )}
            {user ? (
              <div className="flex items-center justify-between px-3 py-2 bg-industrial-850 rounded-md">
                <span className="text-xs text-industrial-300">{user.full_name} ({user.role})</span>
                <button onClick={logout} className="text-xs text-red-400 font-medium">Logout</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-center text-xs font-medium text-industrial-200 bg-industrial-800 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-center text-xs font-semibold text-white bg-orange-500 rounded-md"
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

