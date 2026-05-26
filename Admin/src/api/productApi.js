// src/api/productApi.js  (Admin panel)

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

// ─────────────────────────────────────────
// GET ALL PRODUCTS (filter ke saath)
// ─────────────────────────────────────────
export const getAdminProducts = async (status = "all") => {
  const response = await axios.get(
    `${API}/products/admin/all`,
    {
      headers: authHeader(),
      params: status !== "all" ? { status } : {},
    }
  );
  return response.data;
};

// GET SINGLE PRODUCT BY ID (Admin)
export const getProductById = async (id) => {
  const response = await axios.get(
    `${API}/products/admin/product/${id}`,
    { headers: authHeader() }
  );
  return response.data;
};

// DELETE PRODUCT (Admin)
export const deleteProductAdmin = async (id) => {
  const response = await axios.delete(
    `${API}/products/admin/product/${id}`,
    { headers: authHeader() }
  );
  return response.data;
};