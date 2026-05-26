import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// REGISTER
export const registerSeller = async (sellerData) => {
  return await API.post("/seller/register", sellerData);
};

// LOGIN
export const loginSeller = async (sellerData) => {
  return await API.post("/seller/login", sellerData);
};

// GET ALL SELLERS
export const getAllSellers = async () => {
  return await API.get("/seller/all");
};