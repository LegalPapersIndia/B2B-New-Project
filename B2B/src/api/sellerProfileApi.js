// src/api/sellerProfileApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// GET MY PROFILE
export const getMyProfile = async () => {
  const response = await axios.get(
    `${API}/seller/profile`,
    { headers: authHeader() }
  );
  return response.data;
};

// UPDATE PROFILE
export const updateProfile = async (formData) => {
  const response = await axios.put(
    `${API}/seller/profile/update`,
    formData,
    {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};