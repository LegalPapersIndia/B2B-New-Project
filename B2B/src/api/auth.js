import axios from "axios";

const API = "http://localhost:5000/api";

export const registerSeller = async (data) => {
  return await axios.post(
    `${API}/auth/seller/register`,
    data
  );
};

export const loginSeller = async (data) => {
  return await axios.post(
    `${API}/auth/seller/login`,
    data
  );
};