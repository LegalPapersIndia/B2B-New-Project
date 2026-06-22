// Admin/src/api/whyChooseUsApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
  withCredentials: true,
});

// GET ALL (Admin)
export const getAllFeaturesAdmin = async () => {
  const response = await axios.get(`${API}/why-choose-us/admin/all`, getAuthHeader());
  return response.data;
};

// CREATE
export const createFeature = async (data) => {
  const response = await axios.post(`${API}/why-choose-us`, data, getAuthHeader());
  return response.data;
};

// UPDATE
export const updateFeature = async (id, data) => {
  const response = await axios.put(`${API}/why-choose-us/${id}`, data, getAuthHeader());
  return response.data;
};

// DELETE
export const deleteFeature = async (id) => {
  const response = await axios.delete(`${API}/why-choose-us/${id}`, getAuthHeader());
  return response.data;
};