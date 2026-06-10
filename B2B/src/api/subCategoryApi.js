
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET ALL SUBCATEGORIES
export const getSubCategories = async () => {
  const res = await axios.get(`${API}/subcategories`);
  return res.data;
};

// GET SUBCATEGORIES BY CATEGORY ID
export const getSubCategoriesByCategory = async (categoryId) => {
  const res = await axios.get(`${API}/subcategories?category=${categoryId}`);
  return res.data;
};