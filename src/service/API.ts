import { API_URL } from "@/lib/config";
import axios from "axios";
import cookies from "js-cookie";

export const API = axios.create({
  baseURL: API_URL,
});

// Inject Token
API.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
