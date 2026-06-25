// B2B/src/api/heroSlideApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET All Active Slides (Public)
export const getHeroSlides = async () => {
  const response = await axios.get(`${API}/hero-slides`);
  return response.data;
};