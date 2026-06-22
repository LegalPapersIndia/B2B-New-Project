// B2B/src/api/howItWorksApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET ALL ACTIVE STEPS (Public)
export const getAllSteps = async () => {
  const response = await axios.get(`${API}/how-it-works`);
  return response.data;
};