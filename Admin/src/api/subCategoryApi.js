// src/api/subCategoryApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

// ================= GET ALL SUBCATEGORIES (Public) =================
export const getSubCategories = async () => {
  const res = await axios.get(`${API}/subcategories`);
  return res.data;
};

// ================= CREATE SUBCATEGORY (Admin) =================
export const createSubCategory = async (formData) => {
  const res = await axios.post(`${API}/subcategories/create`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ================= UPDATE SUBCATEGORY (Admin) =================
export const updateSubCategory = async (id, formData) => {
  const res = await axios.put(`${API}/subcategories/${id}`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ================= DELETE SUBCATEGORY (Admin) =================
export const deleteSubCategory = async (id) => {
  const res = await axios.delete(`${API}/subcategories/${id}`, {
    headers: authHeader(),
  });
  return res.data;
};