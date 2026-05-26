// src/api/authApi.js (Admin panel)

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const adminLoginApi = async (email, password) => {
  const response = await axios.post(`${API}/admin/auth/login`, {
    email,
    password,
  });
  return response.data;
};