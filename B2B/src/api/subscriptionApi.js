// src/api/subscriptionApi.js

import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ─────────────────────────────────────────
// HELPER — token header
// ─────────────────────────────────────────
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ─────────────────────────────────────────
// GET PLANS (Public)
// ─────────────────────────────────────────
export const getPlans = async () => {
  const response = await axios.get(
    `${API}/subscription/plans`
  );
  return response.data;
};

// ─────────────────────────────────────────
// CREATE ORDER (Seller)
// ─────────────────────────────────────────
export const createOrder = async (plan) => {
  const response = await axios.post(
    `${API}/subscription/create-order`,
    { plan },
    { headers: authHeader() }
  );
  return response.data;
};

// ─────────────────────────────────────────
// VERIFY PAYMENT (Seller)
// ─────────────────────────────────────────
export const verifyPayment = async (paymentData) => {
  const response = await axios.post(
    `${API}/subscription/verify-payment`,
    paymentData,
    { headers: authHeader() }
  );
  return response.data;
};

// ─────────────────────────────────────────
// GET MY SUBSCRIPTION (Seller)
// ─────────────────────────────────────────
export const getMySubscription = async () => {
  const response = await axios.get(
    `${API}/subscription/my-subscription`,
    { headers: authHeader() }
  );
  return response.data;
};