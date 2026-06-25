// Admin/src/api/ctaSectionApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
  withCredentials: true,
});

// GET CTA
export const getCTA = async () => {
  const response = await axios.get(`${API}/cta-section`, getAuthHeader());
  return response.data;
};

// UPDATE CTA
export const updateCTA = async (data) => {
  const response = await axios.put(`${API}/cta-section`, data, getAuthHeader());
  return response.data;
};