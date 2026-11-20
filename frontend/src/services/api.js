// API Service for WeldCost Platform
const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (import.meta.env.VITE_API_BASE) return import.meta.env.VITE_API_BASE;
  if (typeof window !== "undefined") {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost && window.location.port !== "8000") {
      return "http://127.0.0.1:8000/api";
    }
  }
  return "/api";
};

const API_BASE = getApiBase();

const getAuthHeaders = () => {
  const token = localStorage.getItem("weldcost_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

async function handleResponse(res) {
  if (!res.ok) {
    let errorDetail = "An unexpected error occurred";
    try {
      const data = await res.json();
      errorDetail = data.detail || errorDetail;
    } catch (e) {
      errorDetail = res.statusText || errorDetail;
    }
    throw new Error(errorDetail);
  }
  if (res.status === 204) return null;
  return await res.json();
}

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(res);
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  // Calculator
  async calculateCost(inputData) {
    const res = await fetch(`${API_BASE}/calculator/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(inputData),
    });
    return handleResponse(res);
  },

  async getWhy500(price = 500) {
    const res = await fetch(`${API_BASE}/calculator/why-500?price=${encodeURIComponent(price)}`);
    return handleResponse(res);
  },

  async getPresets() {
    const res = await fetch(`${API_BASE}/calculator/presets`);
    return handleResponse(res);
  },

  // Tools
  async getTools(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.category) query.append("category", params.category);
    const res = await fetch(`${API_BASE}/tools?${query.toString()}`);
    return handleResponse(res);
  },

  async getTool(idOrSlug) {
    const res = await fetch(`${API_BASE}/tools/${idOrSlug}`);
    return handleResponse(res);
  },

  async createTool(toolData) {
    const res = await fetch(`${API_BASE}/tools`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(toolData),
    });
    return handleResponse(res);
  },

  async updateTool(id, toolData) {
    const res = await fetch(`${API_BASE}/tools/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(toolData),
    });
    return handleResponse(res);
  },

  async deleteTool(id) {
    const res = await fetch(`${API_BASE}/tools/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  // Consumables
  async getConsumables(category) {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const res = await fetch(`${API_BASE}/consumables${query}`);
    return handleResponse(res);
  },

  async createConsumable(data) {
    const res = await fetch(`${API_BASE}/consumables`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async updateConsumable(id, data) {
    const res = await fetch(`${API_BASE}/consumables/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteConsumable(id) {
    const res = await fetch(`${API_BASE}/consumables/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  // Services
  async getServices(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.category) query.append("category", params.category);
    const res = await fetch(`${API_BASE}/services?${query.toString()}`);
    return handleResponse(res);
  },

  async getService(idOrSlug) {
    const res = await fetch(`${API_BASE}/services/${idOrSlug}`);
    return handleResponse(res);
  },

  async createService(data) {
    const res = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async updateService(id, data) {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteService(id) {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  // Quotes
  async createQuote(quoteData) {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(quoteData),
    });
    return handleResponse(res);
  },

  async getQuotes() {
    const res = await fetch(`${API_BASE}/quotes`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  async getQuoteByNumber(quoteNumber) {
    const res = await fetch(`${API_BASE}/quotes/${quoteNumber}`);
    return handleResponse(res);
  },

  async updateQuote(id, data) {
    const res = await fetch(`${API_BASE}/quotes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async deleteQuote(id) {
    const res = await fetch(`${API_BASE}/quotes/${id}`, {
      method: "DELETE",
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  // Welder
  async getWelderProfile() {
    const res = await fetch(`${API_BASE}/welder/profile`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  async updateWelderProfile(profileData) {
    const res = await fetch(`${API_BASE}/welder/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(profileData),
    });
    return handleResponse(res);
  },

  async getWelderDashboard() {
    const res = await fetch(`${API_BASE}/welder/dashboard`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  // Admin
  async getAdminSettings() {
    const res = await fetch(`${API_BASE}/admin/settings`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },

  async updateAdminSetting(key, settingData) {
    const res = await fetch(`${API_BASE}/admin/settings/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(settingData),
    });
    return handleResponse(res);
  },

  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(res);
  },
};

