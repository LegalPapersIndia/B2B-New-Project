import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("adminToken");

const authHeader = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const adminGetJobs = () =>
  axios.get(`${API}/careers/admin/all`, authHeader()).then(r => r.data);

export const adminCreateJob = (data) =>
  axios.post(`${API}/careers/admin/create`, data, authHeader()).then(r => r.data);

export const adminUpdateJob = (id, data) =>
  axios.put(`${API}/careers/admin/${id}`, data, authHeader()).then(r => r.data);

export const adminDeleteJob = (id) =>
  axios.delete(`${API}/careers/admin/${id}`, authHeader()).then(r => r.data);

export const adminGetApplications = (id) =>
  axios.get(`${API}/careers/admin/${id}/applications`, authHeader()).then(r => r.data);

export const adminUpdateAppStatus = (jobId, appId, status) =>
  axios.patch(`${API}/careers/admin/${jobId}/applications/${appId}`, { status }, authHeader()).then(r => r.data);