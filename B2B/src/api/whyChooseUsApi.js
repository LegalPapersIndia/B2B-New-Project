// B2B/src/api/whyChooseUsApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET ALL ACTIVE FEATURES (Public)
export const getAllFeatures = async () => {
  const response = await axios.get(`${API}/why-choose-us`);
  return response.data;
};