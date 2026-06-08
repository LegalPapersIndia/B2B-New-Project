// src/api/leadApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ─────────────────────────────────────────
// CREATE LEAD (Public)
// ─────────────────────────────────────────
export const createLead = async (leadData) => {
  const response = await axios.post(
    `${API}/leads/create`,
    leadData
  );
  return response.data;
};

// ─────────────────────────────────────────
// GET MY LEADS (Seller)
// ─────────────────────────────────────────
export const getMyLeads = async () => {
  const response = await axios.get(
    `${API}/leads/my-leads`,
    { headers: authHeader() }
  );
  return response.data;
};

// ─────────────────────────────────────────
// UPDATE LEAD STATUS (Seller)
// ─────────────────────────────────────────
export const updateLeadStatus = async (id, status) => {
  const response = await axios.patch(
    `${API}/leads/${id}/status`,
    { status },
    { headers: authHeader() }
  );
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await axios.delete(`${API}/leads/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const deleteMultipleLeads = async (ids) => {
  const response = await axios.post(`${API}/leads/delete-multiple`, { ids }, {
    headers: authHeader(),
  });
  return response.data;
};