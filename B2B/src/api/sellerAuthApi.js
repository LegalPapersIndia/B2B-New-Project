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


// FORGOT PASSWORD — email bhejo, OTP aayega
export const forgotPasswordApi = (email) =>
  API.post("/seller/forgot-password", { email });
 
// RESET PASSWORD — OTP + new password
export const resetPasswordApi = (data) =>
  API.post("/seller/reset-password", data);
 

