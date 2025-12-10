import axios from "axios";

let token: string | null = null;
try {
  const value = localStorage.getItem("token");
  if (value) {
    token = JSON.parse(value);
  }
} catch (error) {
  console.error(error);
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: token,
  },
});