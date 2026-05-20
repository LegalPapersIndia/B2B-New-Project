import axios from "axios";

const API = "http://localhost:5000/api/auth";


// ADMIN LOGIN
export const adminLogin = (data) => {
  return axios.post(
    `${API}/admin/login`,
    data
  );
};