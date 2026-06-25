// Admin/src/api/navbarSettingsApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
  withCredentials: true,
});

// GET
export const getNavbarSettings = async () => {
  const response = await axios.get(`${API}/navbar-settings`, getAuthHeader());
  return response.data;
};

// UPDATE
export const updateNavbarSettings = async (data) => {
  const response = await axios.put(`${API}/navbar-settings`, data, getAuthHeader());
  return response.data;
};