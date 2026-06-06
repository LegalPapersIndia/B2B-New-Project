// src/api/productApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ─────────────────────────────────────────
// HELPER — token header
// ─────────────────────────────────────────
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ─────────────────────────────────────────
// SELLER — Product add (images + FormData)
// ─────────────────────────────────────────
export const addProduct = async (formData) => {
  const response = await axios.post(
    `${API}/products/add`,
    formData,
    {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// ─────────────────────────────────────────
// SELLER — Apne products dekho
// ─────────────────────────────────────────
export const getMyProducts = async () => {
  const response = await axios.get(
    `${API}/products/my-products`,
    { headers: authHeader() }
  );
  return response.data;
};

// ─────────────────────────────────────────
// SELLER — Product delete
// ─────────────────────────────────────────
export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${API}/products/${id}`,
    { headers: authHeader() }
  );
  return response.data;
};

// ─────────────────────────────────────────
// PUBLIC — Approved products (frontend)
// ─────────────────────────────────────────
export const getAllProducts = async (filters = {}) => {
  const response = await axios.get(
    `${API}/products`,
    { params: filters }
  );
  return response.data;
};

// ─────────────────────────────────────────
// PUBLIC — Single product
// ─────────────────────────────────────────
export const getSingleProduct = async (slug) => {
  const response = await axios.get(
    `${API}/products/${slug}`
  );
  return response.data;
};

// ─────────────────────────────────────────
// ADMIN — Saare products (filter ke saath)
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

// GET PRODUCTS BY SUBCATEGORY
export const getProductsBySubCategory = async (subcategorySlug) => {
  const response = await axios.get(
    `${API}/products/subcategory/${subcategorySlug}`
  );
  return response.data;
};

// GET FEATURED PRODUCTS
export const getFeaturedProducts = async () => {
  const response = await axios.get(`${API}/products/featured`);
  return response.data;
};


export const getProductsByCity = async (citySlug) => {
  try {
    const response = await axios.get(`${API}/products/city/${citySlug}`);
    return response.data;
  } catch (error) {
    console.error("getProductsByCity API error:", error);
    return { success: false, products: [], total: 0 };
  }
};



// SEARCH PRODUCTS
export const searchProducts = async (params) => {
  const response = await axios.get(`${API}/products`, { params });
  return response.data;
};


// UPDATE PRODUCT (Seller)
export const updateProduct = async (id, formData) => {
  const response = await axios.put(
    `${API}/products/${id}`,
    formData,
    {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
 