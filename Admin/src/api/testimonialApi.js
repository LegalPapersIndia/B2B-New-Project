// Admin/src/api/testimonialApi.js
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const adminGetTestimonials = () =>
  axios.get(`${API}/testimonials/admin/all`, auth()).then(r => r.data);

export const adminCreateTestimonial = (data) =>
  axios.post(`${API}/testimonials/admin/create`, data, auth()).then(r => r.data);

export const adminUpdateTestimonial = (id, data) =>
  axios.put(`${API}/testimonials/admin/${id}`, data, auth()).then(r => r.data);

export const adminDeleteTestimonial = (id) =>
  axios.delete(`${API}/testimonials/admin/${id}`, auth()).then(r => r.data);