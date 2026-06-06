// // routes/subscription.routes.js

// import express from "express";
// import {
//   getPlans,
//   createOrder,
//   verifyPayment,
//   getMySubscription,
// } from "../controllers/subscription.controller.js";

// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ─────────────────────────────────────────
// // PUBLIC — Plans dekho
// // ─────────────────────────────────────────
// router.get("/plans", getPlans);

// // ─────────────────────────────────────────
// // SELLER — Razorpay order banao
// // ─────────────────────────────────────────
// router.post(
//   "/create-order",
//   authMiddleware,
//   createOrder
// );

// // ─────────────────────────────────────────
// // SELLER — Payment verify karo
// // ─────────────────────────────────────────
// router.post(
//   "/verify-payment",
//   authMiddleware,
//   verifyPayment
// );

// // ─────────────────────────────────────────
// // SELLER — Apni subscription dekho
// // ─────────────────────────────────────────
// router.get(
//   "/my-subscription",
//   authMiddleware,
//   getMySubscription
// );

// export default router;



// routes/subscription.routes.js

import express from "express";
import {
  getPlans,
  createOrder,
  verifyPayment,
  getMySubscription,
} from "../controllers/subscription.controller.js";
import Plan from "../models/Plan.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

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
router.get("/admin/plans", adminAuthMiddleware, async (req, res) => {
  try {
    const plans = await Plan.find().sort({ amount: 1 });
    res.json({ success: true, plans });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// UPDATE PLAN — price + duration
router.put("/admin/plans/:id", adminAuthMiddleware, async (req, res) => {
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