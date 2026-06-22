// src/api/sellerRequirementApi.js

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ── SELLER — Submit new requirement ──
export const createRequirement = async (formData) => {
  return await API.post("/seller-requirements/", formData, authHeaders());
};

// ── SELLER — Get my requirements ──
export const getMyRequirements = async () => {
  return await API.get("/seller-requirements/my", authHeaders());
};

// ── SELLER — Delete my requirement ──
export const deleteMyRequirement = async (id) => {
  return await API.delete(`/seller-requirements/${id}`, authHeaders());
};

// ── ADMIN — Get all requirements ──
export const adminGetAllRequirements = async () => {
  const token = localStorage.getItem("adminToken");
  return await API.get("/seller-requirements/admin/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ── ADMIN — Update requirement status ──
export const adminUpdateRequirementStatus = async (id, status) => {
  const token = localStorage.getItem("adminToken");
  return await API.patch(
    `/seller-requirements/admin/${id}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// ── ADMIN — Delete requirement ──
export const adminDeleteRequirement = async (id) => {
  const token = localStorage.getItem("adminToken");
  return await API.delete(`/seller-requirements/admin/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};