import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// REGISTER
export const registerSeller = async (sellerData) => {
  return await API.post("/seller/register", sellerData);
};

// LOGIN
export const loginSeller = async (sellerData) => {
  return await API.post("/seller/login", sellerData);
};

// GET ALL SELLERS
// export const getAllSellers = async () => {
//   return await API.get("/seller/all");
// };


export const getAllSellers = async () => {
  const token = localStorage.getItem("adminToken");
  return await API.get("/seller/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// DELETE SELLER (Admin)
export const deleteSeller = async (id) => {
  const token = localStorage.getItem("adminToken");
  return await API.delete(`/seller/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};