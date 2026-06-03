import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Contact Form Submit
export const createContact = async (data) => {
  const response = await axios.post(
    `${API}/contact`,
    data
  );

  return response.data;
};