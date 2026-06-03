// src/api/blogApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export const getAllBlogsAdmin = () =>
  axios.get(`${API}/blogs/admin/all`, { headers: authHeader() });

export const createBlog = (formData) =>
  axios.post(`${API}/blogs`, formData, { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } });

export const updateBlog = (id, formData) =>
  axios.put(`${API}/blogs/${id}`, formData, { headers: { ...authHeader(), "Content-Type": "multipart/form-data" } });

export const deleteBlog = (id) =>
  axios.delete(`${API}/blogs/${id}`, { headers: authHeader() });

export const getAllBlogs = () =>
  axios.get(`${API}/blogs`);

export const getSingleBlog = (slug) =>
  axios.get(`${API}/blogs/${slug}`);