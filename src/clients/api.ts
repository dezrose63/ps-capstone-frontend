import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Interceptor adds the token to every request dynamically
apiClient.interceptors.request.use((config) => {
  const value = localStorage.getItem("token");
  if (value) {
    const token = JSON.parse(value);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
