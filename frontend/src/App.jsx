import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DisclaimerBanner from "./components/DisclaimerBanner";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import ToolsCatalog from "./pages/ToolsCatalog";
import WhyCostSoMuch from "./pages/WhyCostSoMuch";
import PriceGuide from "./pages/PriceGuide";
import QuoteGenerator from "./pages/QuoteGenerator";
import WelderDashboard from "./pages/WelderDashboard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-industrial-950 text-industrial-100">
          <DisclaimerBanner />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/tools" element={<ToolsCatalog />} />
              <Route path="/why-does-it-cost" element={<WhyCostSoMuch />} />
              <Route path="/price-guide" element={<PriceGuide />} />
              <Route path="/quote-generator" element={<QuoteGenerator />} />
              
              {/* Welder Mode Dashboard (Protected) */}
              <Route
                path="/welder-dashboard"
                element={
                  <ProtectedRoute roleRequired="welder">
                    <WelderDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Central Admin Panel (Protected) */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roleRequired="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
