import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to every request if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
