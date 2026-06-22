// Admin/src/api/howItWorksApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
  withCredentials: true,
});

// GET ALL (Admin)
export const getAllStepsAdmin = async () => {
  const response = await axios.get(`${API}/how-it-works/admin/all`, getAuthHeader());
  return response.data;
};

// CREATE
export const createStep = async (data) => {
  const response = await axios.post(`${API}/how-it-works`, data, getAuthHeader());
  return response.data;
};

// UPDATE
export const updateStep = async (id, data) => {
  const response = await axios.put(`${API}/how-it-works/${id}`, data, getAuthHeader());
  return response.data;
};

// DELETE
export const deleteStep = async (id) => {
  const response = await axios.delete(`${API}/how-it-works/${id}`, getAuthHeader());
  return response.data;
};