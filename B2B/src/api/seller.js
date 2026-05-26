import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const saveSellerProfile = async (data, token) => {
  return await axios.post(
    `${API}/seller/profile`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getMe = async (token) => {
  return await axios.get(`${API}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};