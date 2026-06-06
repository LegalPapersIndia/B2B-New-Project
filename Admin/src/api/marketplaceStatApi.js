import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const adminGetMarketplaceStats = () =>
  axios.get(`${API}/marketplace-stats`, auth()).then((r) => r.data);

export const adminCreateMarketplaceStat = (data) =>
  axios.post(`${API}/marketplace-stats`, data, auth()).then((r) => r.data);

export const adminUpdateMarketplaceStat = (id, data) =>
  axios.put(`${API}/marketplace-stats/${id}`, data, auth()).then((r) => r.data);

export const adminDeleteMarketplaceStat = (id) =>
  axios.delete(`${API}/marketplace-stats/${id}`, auth()).then((r) => r.data);