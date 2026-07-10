

// routes/subscription.routes.js

import express from "express";
import {
  getPlans,
  createOrder,
  verifyPayment,
  getMySubscription,
  adminAssignPlan,

} from "../controllers/subscription.controller.js";
import Plan from "../models/Plan.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

// ─────────────────────────────────────────
// PUBLIC — Plans dekho
// ─────────────────────────────────────────
router.get("/plans", getPlans);

// ─────────────────────────────────────────
// SELLER — Razorpay order banao
// ─────────────────────────────────────────
router.post("/create-order", authMiddleware, createOrder);

// ─────────────────────────────────────────
// SELLER — Payment verify karo
// ─────────────────────────────────────────
router.post("/verify-payment", authMiddleware, verifyPayment);

// ─────────────────────────────────────────
// SELLER — Apni subscription dekho
// ─────────────────────────────────────────
router.get("/my-subscription", authMiddleware, getMySubscription);

// ─────────────────────────────────────────
// ADMIN — Plans manage karo
// ─────────────────────────────────────────

// GET ALL PLANS
router.get("/admin/plans", checkPermission("plans"), async (req, res) => { 
  try {
    const plans = await Plan.find().sort({ amount: 1 });
    res.json({ success: true, plans });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────
// ADMIN — Manually plan assign karo seller ko
// ─────────────────────────────────────────
// ADMIN — Manually plan assign karo seller ko
router.post("/admin/assign-plan/:sellerId", checkPermission("sellers"), adminAssignPlan); 

// UPDATE PLAN — price + duration
router.put("/admin/plans/:id", checkPermission("plans"), async (req, res) => { 
  try {
    const { amount, duration } = req.body;
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { amount, duration },
      { new: true }
    );
    res.json({ success: true, plan });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

export default router;