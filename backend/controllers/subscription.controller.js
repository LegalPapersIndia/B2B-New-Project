
// controllers/subscription.controller.js
 
import Razorpay from "razorpay";
import crypto from "crypto";
import Seller from "../models/Seller.js";
import Subscription from "../models/Subscription.model.js";
import Plan from "../models/Plan.model.js";
 import Notification from "../models/Notification.model.js";
 
// ─────────────────────────────────────────
// FEATURES CONFIG (hardcode rehne do)
// ─────────────────────────────────────────
const getFeatures = (key) => {
  const features = {
    basic: [
      "Unlimited product listings",
      "Products go live instantly",
      "Seller dashboard access",
      "Buy requirements access — 1 hour delay",
      "Email support",
    ],
    premium: [
      "Unlimited product listings",
      "Products go live instantly",
      "Seller dashboard access",
      "Listed in Trusted Suppliers section",
      "Buy requirements access — 30 min delay",
     
    ],
    gold: [
      "Unlimited product listings",
      "Products go live instantly",
      "Featured Products on Home Page",
      "Listed in Trusted Suppliers section",
      "Buy requirements — Instant access",
      "Priority support 24/7",
    ],
  };
  return features[key] || [];
};
 
// ─────────────────────────────────────────
// GET PLANS (Public) — DB se
// ─────────────────────────────────────────
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ amount: 1 });
 
    const plansObj = {};
    plans.forEach(p => {
      plansObj[p.key] = {
        name:     p.key.charAt(0).toUpperCase() + p.key.slice(1),
        amount:   p.amount,
        duration: p.duration,
        features: getFeatures(p.key),
      };
    });
 
    return res.status(200).json({ success: true, plans: plansObj });
  } catch (error) {
    console.error("getPlans error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch plans" });
  }
};
 
// ─────────────────────────────────────────
// CREATE ORDER (Seller)
// ─────────────────────────────────────────
export const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
 
    const { plan } = req.body;
 
    // ✅ DB se plan fetch karo
    const selectedPlan = await Plan.findOne({ key: plan });
    if (!selectedPlan) {
      return res.status(400).json({ success: false, message: "Invalid plan selected" });
    }
 
    // RAZORPAY ORDER CREATE
    const order = await razorpay.orders.create({
      amount:   selectedPlan.amount * 100,
      currency: "INR",
      receipt:  `receipt_${Date.now()}`,
      notes: {
        sellerId: req.user._id.toString(),
        plan,
      },
    });
 
    // DB MEIN SAVE
    const subscription = await Subscription.create({
      seller:          req.user._id,
      plan,
      amount:          selectedPlan.amount,
      razorpayOrderId: order.id,
      paymentStatus:   "created",
    });
 
    return res.status(201).json({
      success: true,
      order,
      subscription,
      key:         process.env.RAZORPAY_KEY_ID,
      planDetails: {
        name:     selectedPlan.key.charAt(0).toUpperCase() + selectedPlan.key.slice(1),
        amount:   selectedPlan.amount,
        duration: selectedPlan.duration,
        features: getFeatures(selectedPlan.key),
      },
    });
 
  } catch (error) {
    console.error("createOrder error:", error);
    return res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
 
// ─────────────────────────────────────────
// VERIFY PAYMENT (Seller)
// ─────────────────────────────────────────
// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;
 
//     // SIGNATURE VERIFY
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
 
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");
 
//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ success: false, message: "Payment verification failed" });
//     }
 
//     // SUBSCRIPTION FIND
//     const subscription = await Subscription.findOne({
//       razorpayOrderId: razorpay_order_id,
//     });
 
//     if (!subscription) {
//       return res.status(404).json({ success: false, message: "Subscription not found" });
//     }
 
//     // ✅ DURATION DB SE LO
//     const planData = await Plan.findOne({ key: subscription.plan });
//     const duration = planData?.duration || 30;
 
//     // DATES CALCULATE
//     const startDate  = new Date();
//     const expireDate = new Date();
//     expireDate.setDate(expireDate.getDate() + duration);
 
//     // SUBSCRIPTION UPDATE
//     subscription.razorpayPaymentId = razorpay_payment_id;
//     subscription.razorpaySignature = razorpay_signature;
//     subscription.paymentStatus     = "paid";
//     subscription.isActive          = true;
//     subscription.startDate         = startDate;
//     subscription.expireDate        = expireDate;
//     await subscription.save();
 
//     // SELLER UPDATE
//     await Seller.findByIdAndUpdate(subscription.seller, {
//       subscriptionActive: true,
//       accountStatus:      "active",
//       subscriptionPlan:   subscription.plan,
//       subscriptionExpire: expireDate,
//     });
 
//     // PENDING PRODUCTS APPROVE
//     const Product = (await import("../models/product.model.js")).default;
//    await Product.updateMany(
//   { seller: subscription.seller, status: "pending" },
//   { 
//     status: "approved",
//     featured: ["gold", "premium"].includes(subscription.plan),
//   }
// );
 
//     return res.status(200).json({
//       success: true,
//       message: "Payment verified! Subscription activated successfully.",
//       subscription,
//     });
 
//   } catch (error) {
//     console.error("verifyPayment error:", error);
//     return res.status(500).json({ success: false, message: "Payment verification failed" });
//   }
// };
 

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
 
    // SIGNATURE VERIFY
    const body = razorpay_order_id + "|" + razorpay_payment_id;
 
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");
 
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
 
    // SUBSCRIPTION FIND
    const subscription = await Subscription.findOne({
      razorpayOrderId: razorpay_order_id,
    });
 
    if (!subscription) {
      return res.status(404).json({ success: false, message: "Subscription not found" });
    }
 
    // ✅ DURATION DB SE LO
    const planData = await Plan.findOne({ key: subscription.plan });
    const duration = planData?.duration ?? 30;
 
    // DATES CALCULATE
    const startDate  = new Date();
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + duration);
 
    // SUBSCRIPTION UPDATE
    subscription.razorpayPaymentId = razorpay_payment_id;
    subscription.razorpaySignature = razorpay_signature;
    subscription.paymentStatus     = "paid";
    subscription.isActive          = true;
    subscription.startDate         = startDate;
    subscription.expireDate        = expireDate;
    await subscription.save();
 
    // SELLER UPDATE
    await Seller.findByIdAndUpdate(subscription.seller, {
      subscriptionActive: true,
      accountStatus:      "active",
      subscriptionPlan:   subscription.plan,
      subscriptionExpire: expireDate,
    });
 
    // PRODUCTS UPDATE
    const Product = (await import("../models/product.model.js")).default;
    const isFeatured = subscription.plan === "gold";

    // ✅ Pending products approve karo
    await Product.updateMany(
      { seller: subscription.seller, status: "pending" },
      { status: "approved", featured: isFeatured }
    );

    // ✅ Already approved products ka featured update karo
    await Product.updateMany(
      { seller: subscription.seller, status: "approved" },
      { featured: isFeatured }
    );
 
    // Payment verify hone ke baad
await Notification.create({
  type: "new_subscription",
  message: `New subscription: ${subscription.plan} plan activated`,
  data: { sellerId: subscription.seller, plan: subscription.plan },
});

    return res.status(200).json({
      success: true,
      message: "Payment verified! Subscription activated successfully.",
      subscription,
    });
 
  } catch (error) {
    console.error("verifyPayment error:", error);
    return res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};


// ─────────────────────────────────────────
// GET MY SUBSCRIPTION (Seller)
// ─────────────────────────────────────────
export const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      seller:        req.user._id,
      paymentStatus: "paid",
      isActive:      true,
    }).sort({ createdAt: -1 });
 
    const seller = await Seller.findById(req.user._id).select(
      "name email subscriptionActive accountStatus subscriptionPlan subscriptionExpire"
    );
 
    return res.status(200).json({ success: true, subscription, seller });
 
  } catch (error) {
    console.error("getMySubscription error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch subscription" });
  }
};