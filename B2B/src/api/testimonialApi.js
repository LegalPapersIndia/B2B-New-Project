// B2B/src/api/testimonialApi.js
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getTestimonials = () =>
  axios.get(`${API}/testimonials`).then(r => r.data);