// src/services/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // apna backend URL yahan set karo
  withCredentials: true, // if cookies / sessions are used
});

// Add Authorization token automatically (if user is logged in)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
