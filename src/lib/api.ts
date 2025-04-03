// lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptors nếu cần
api.interceptors.request.use(
  (config) => {
    // Thêm token auth nếu cần
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung
    return Promise.reject(error);
  }
);

export default api;
