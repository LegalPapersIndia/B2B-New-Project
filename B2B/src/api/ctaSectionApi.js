// B2B/src/api/ctaSectionApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET CTA (Public)
export const getCTA = async () => {
  const response = await axios.get(`${API}/cta-section`);
  return response.data;
};