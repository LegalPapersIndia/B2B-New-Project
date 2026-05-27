// src/api/requirementApi.js (Admin panel)

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

// GET ALL REQUIREMENTS (Admin)
export const getAllRequirements = async () => {
  const response = await axios.get(
    `${API}/requirements/admin/all`,
    { headers: authHeader() }
  );
  return response.data;
};