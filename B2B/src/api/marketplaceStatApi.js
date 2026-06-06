import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getMarketplaceStats = () =>
  axios.get(`${API}/marketplace-stats`).then((r) => r.data);