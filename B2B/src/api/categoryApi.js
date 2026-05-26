import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ==========================
// GET ALL CATEGORIES
// ==========================
export const getCategories = async () => {
  const response = await axios.get(
    `${API}/categories`
  );

  return response.data;
};