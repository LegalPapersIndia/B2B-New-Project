// src/api/leadApi.js (Admin panel)

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

// ─────────────────────────────────────────
// GET ALL LEADS (Admin)
// ─────────────────────────────────────────
export const getAllLeads = async () => {
  const response = await axios.get(
    `${API}/leads/admin/all`,
    { headers: authHeader() }
  );
  return response.data;
};