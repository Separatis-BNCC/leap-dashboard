import { API_URL } from "@/lib/config";
import axios from "axios";
import cookies from "js-cookie";

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${cookies.get("token")}`,
  },
});
