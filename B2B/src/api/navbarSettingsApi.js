// B2B/src/api/navbarSettingsApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET Navbar Settings (Public)
export const getNavbarSettings = async () => {
  const response = await axios.get(`${API}/navbar-settings`);
  return response.data;
};