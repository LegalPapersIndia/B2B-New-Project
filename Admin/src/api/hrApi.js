import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("adminToken");

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const getHRUsers = () =>
  axios.get(`${API}/hr-users`, authHeader()).then(r => r.data);

export const createHRUser = (data) =>
  axios.post(`${API}/hr-users`, data, authHeader()).then(r => r.data);

export const deleteHRUser = (id) =>
  axios.delete(`${API}/hr-users/${id}`, authHeader()).then(r => r.data);