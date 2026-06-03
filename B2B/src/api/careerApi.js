import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const getActiveJobs = () => 
  axios.get(`${API}/careers`).then(r => r.data);

export const applyJob = (id, data) => 
  axios.post(`${API}/careers/${id}/apply`, data).then(r => r.data);