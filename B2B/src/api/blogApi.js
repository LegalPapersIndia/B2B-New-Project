// src/api/blogApi.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET ALL PUBLISHED BLOGS (Public)
export const getAllBlogs = async () => {
  const response = await axios.get(`${API}/blogs`);
  return response.data;
};

// GET SINGLE BLOG BY SLUG (Public)
export const getSingleBlog = async (slug) => {
  const response = await axios.get(`${API}/blogs/${slug}`);
  return response.data;
};