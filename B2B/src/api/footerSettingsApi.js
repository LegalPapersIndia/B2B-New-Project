// B2B/src/api/footerSettingsApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET Footer Settings (Public)
export const getFooterSettings = async () => {
  const response = await axios.get(`${API}/footer-settings`);
  return response.data;
};