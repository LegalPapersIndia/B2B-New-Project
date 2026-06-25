// Admin/src/api/footerSettingsApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
  withCredentials: true,
});

// GET
export const getFooterSettings = async () => {
  const response = await axios.get(`${API}/footer-settings`, getAuthHeader());
  return response.data;
};

// UPDATE
export const updateFooterSettings = async (data) => {
  const response = await axios.put(`${API}/footer-settings`, data, getAuthHeader());
  return response.data;
};