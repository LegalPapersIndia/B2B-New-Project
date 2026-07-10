// src/api/managerApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

// GET ALL MANAGERS
export const getManagerUsers = async () => {
  const res = await axios.get(`${API}/managers`, { headers: authHeader() });
  return res.data;
};

// CREATE MANAGER
export const createManagerUser = async (data) => {
  const res = await axios.post(`${API}/managers/create`, data, { headers: authHeader() });
  return res.data;
};

// UPDATE PERMISSIONS
export const updateManagerPermissions = async (id, permissions) => {
  const res = await axios.put(
    `${API}/managers/${id}/permissions`,
    { permissions },
    { headers: authHeader() }
  );
  return res.data;
};

// DELETE MANAGER
export const deleteManagerUser = async (id) => {
  const res = await axios.delete(`${API}/managers/${id}`, { headers: authHeader() });
  return res.data;
};

// naya function add karo existing functions ke saath
export const getMyPermissions = async () => {
  const res = await axios.get(`${API}/managers/me`, { headers: authHeader() });
  return res.data;
};