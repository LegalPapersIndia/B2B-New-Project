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


// DELETE SINGLE REQUIREMENT (Admin)
export const deleteRequirementAdmin = async (id) => {
  const response = await axios.delete(
    `${API}/requirements/admin/${id}`,
    { headers: authHeader() }
  );
  return response.data;
};

// DELETE MULTIPLE REQUIREMENTS (Admin)
export const deleteMultipleRequirementsAdmin = async (ids) => {
  const response = await axios.post(
    `${API}/requirements/admin/delete-multiple`,
    { ids },
    { headers: authHeader() }
  );
  return response.data;
};