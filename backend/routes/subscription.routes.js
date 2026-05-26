// routes/subscription.routes.js

import express from "express";
import {
  getPlans,
  createOrder,
  verifyPayment,
  getMySubscription,
} from "../controllers/subscription.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ─────────────────────────────────────────
// PUBLIC — Plans dekho
// ─────────────────────────────────────────
router.get("/plans", getPlans);

// ─────────────────────────────────────────
// SELLER — Razorpay order banao
// ─────────────────────────────────────────
router.post(
  "/create-order",
  authMiddleware,
  createOrder
);

// ─────────────────────────────────────────
// SELLER — Payment verify karo
// ─────────────────────────────────────────
router.post(
  "/verify-payment",
  authMiddleware,
  verifyPayment
);

// ─────────────────────────────────────────
// SELLER — Apni subscription dekho
// ─────────────────────────────────────────
router.get(
  "/my-subscription",
  authMiddleware,
  getMySubscription
);

export default router;