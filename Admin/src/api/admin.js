import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// GET SELLERS
export const getSellers = async (token) => {
  return await axios.get(
    `${API}/admin/sellers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// APPROVE SELLER
export const approveSeller = async (id, token) => {
  return await axios.put(
    `${API}/admin/seller/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// REJECT SELLER
export const rejectSeller = async (id, token) => {
  return await axios.put(
    `${API}/admin/seller/reject/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};