import { API_URL } from "@/lib/config";
import axios from "axios";

export const API = axios.create({
  baseURL: API_URL,
});
