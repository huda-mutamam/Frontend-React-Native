import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Konfigurasi dasar Axios
const api = axios.create({
  // Ganti IP ini dengan IP Komputer Anda 
  baseURL: "http://192.168.1.6:8000/api",
});

// Interceptor: Menambahkan token secara otomatis ke setiap request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
