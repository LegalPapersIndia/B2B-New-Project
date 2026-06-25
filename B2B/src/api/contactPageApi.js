// B2B/src/api/contactPageApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET Contact Page (Public)
export const getContactPage = async () => {
  const response = await axios.get(`${API}/contact-page`);
  return response.data;
};