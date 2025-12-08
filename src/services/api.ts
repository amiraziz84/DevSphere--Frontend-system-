import axios from "axios";

// Use the backend URL from environment variables
export const BASE_URL = import.meta.env.VITE_API_URL;

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
