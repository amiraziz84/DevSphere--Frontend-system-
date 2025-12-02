// src/services/api.ts
import axios from "axios";

export const BASE_URL = "http://localhost:3000";  // ✅ ADD THIS

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
