import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// GET ALL NOTIFICATIONS
export const getNotifications = async () => {
  const res = await axios.get(`${API}/notifications`, getAuthHeader());
  return res.data;
};

// MARK ALL READ
export const markAllRead = async () => {
  const res = await axios.patch(`${API}/notifications/read`, {}, getAuthHeader());
  return res.data;
};