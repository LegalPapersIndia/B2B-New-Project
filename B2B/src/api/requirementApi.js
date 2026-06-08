// src/api/requirementApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// POST REQUIREMENT (Public)
export const postRequirement = async (data) => {
  const response = await axios.post(`${API}/requirements/post`, data);
  return response.data;
};

// GET MY REQUIREMENTS (Seller)
export const getMyRequirements = async () => {
  const response = await axios.get(
    `${API}/requirements/my-requirements`,
    { headers: authHeader() }
  );
  return response.data;
};


export const deleteRequirement = async (id) => {
  const response = await axios.delete(`${API}/requirements/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const deleteMultipleRequirements = async (ids) => {
  const response = await axios.post(`${API}/requirements/delete-multiple`, { ids }, {
    headers: authHeader(),
  });
  return response.data;
};