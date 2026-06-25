// Admin/src/api/heroSlideApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
});

const getMultipartHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "multipart/form-data",
  },
});

// GET ALL (Admin — inactive bhi)
export const getHeroSlidesAdmin = async () => {
  const response = await axios.get(`${API}/hero-slides/admin`, getHeaders());
  return response.data;
};

// CREATE
export const createHeroSlide = async (formData) => {
  const response = await axios.post(`${API}/hero-slides`, formData, getMultipartHeaders());
  return response.data;
};

// UPDATE
export const updateHeroSlide = async (id, formData) => {
  const response = await axios.put(`${API}/hero-slides/${id}`, formData, getMultipartHeaders());
  return response.data;
};

// DELETE
export const deleteHeroSlide = async (id) => {
  const response = await axios.delete(`${API}/hero-slides/${id}`, getHeaders());
  return response.data;
};