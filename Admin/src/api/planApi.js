// Admin/src/api/planApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const auth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

// GET ALL PLANS
export const adminGetPlans = () =>
  axios.get(`${API}/subscription/admin/plans`, auth()).then(r => r.data);

// UPDATE PLAN — price + duration
export const adminUpdatePlan = (id, data) =>
  axios.put(`${API}/subscription/admin/plans/${id}`, data, auth()).then(r => r.data);