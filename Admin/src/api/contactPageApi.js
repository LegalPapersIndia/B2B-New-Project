// Admin/src/api/contactPageApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
});

// GET (Public)
export const getContactPage = async () => {
  const response = await axios.get(`${API}/contact-page`);
  return response.data;
};

// UPDATE Main Info (Hero + Contact + Map)
export const updateContactPage = async (data) => {
  const response = await axios.put(`${API}/contact-page`, data, getHeaders());
  return response.data;
};

// FAQ — ADD
export const addFaq = async (data) => {
  const response = await axios.post(`${API}/contact-page/faqs`, data, getHeaders());
  return response.data;
};

// FAQ — UPDATE
export const updateFaq = async (faqId, data) => {
  const response = await axios.put(`${API}/contact-page/faqs/${faqId}`, data, getHeaders());
  return response.data;
};

// FAQ — DELETE
export const deleteFaq = async (faqId) => {
  const response = await axios.delete(`${API}/contact-page/faqs/${faqId}`, getHeaders());
  return response.data;
};