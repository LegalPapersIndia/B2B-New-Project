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


// DELETE SINGLE LEAD (Admin)
export const deleteLeadAdmin = async (id) => {
  const response = await axios.delete(
    `${API}/leads/admin/${id}`,
    { headers: authHeader() }
  );
  return response.data;
};

// DELETE MULTIPLE LEADS (Admin)
export const deleteMultipleLeadsAdmin = async (ids) => {
  const response = await axios.post(
    `${API}/leads/admin/delete-multiple`,
    { ids },
    { headers: authHeader() }
  );
  return response.data;
};