import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

// GET ALL CITIES (Public)
export const getCities = async () => {
  const response = await axios.get(`${API}/cities`);
  return response.data;
};

// CREATE CITY (Admin)
export const createCity = async (formData) => {
  const response = await axios.post(`${API}/cities`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// UPDATE CITY (Admin)
export const updateCity = async (id, formData) => {
  const response = await axios.put(`${API}/cities/${id}`, formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// DELETE CITY (Admin)
export const deleteCity = async (id) => {
  const response = await axios.delete(`${API}/cities/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};