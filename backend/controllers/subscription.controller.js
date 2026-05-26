// // controllers/subscription.controller.js

// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Seller from "../models/Seller.js";
// import Subscription from "../models/Subscription.model.js";

// // ─────────────────────────────────────────
// // RAZORPAY INSTANCE
// // ─────────────────────────────────────────
// const razorpay = new Razorpay({
//   key_id:     process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ─────────────────────────────────────────
// // PLANS CONFIG
// // ─────────────────────────────────────────
// const PLANS = {
//   basic: {
//     name:     "Basic",
//     amount:   999,
//     duration: 30, // days
//     features: [
//       "Unlimited product listings",
//       "Products go live instantly",
//       "Basic seller dashboard",
//       "Email support",
//     ],
//   },
//   premium: {
//     name:     "Premium",
//     amount:   1999,
//     duration: 30,
//     features: [
//       "Everything in Basic",
//       "Featured product listing",
//       "Priority search ranking",
//       "Chat support",
//     ],
//   },
//   gold: {
//     name:     "Gold",
//     amount:   3999,
//     duration: 30,
//     features: [
//       "Everything in Premium",
//       "Dedicated account manager",
//       "Analytics dashboard",
//       "Priority support 24/7",
//     ],
//   },
// };

// // ─────────────────────────────────────────
// // GET PLANS (Public)
// // ─────────────────────────────────────────
// export const getPlans = async (req, res) => {
//   try {
//     return res.status(200).json({
//       success: true,
//       plans: PLANS,
//     });
//   } catch (error) {
//     console.error("getPlans error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch plans",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // CREATE RAZORPAY ORDER (Seller)
// // ─────────────────────────────────────────
// export const createOrder = async (req, res) => {
//   try {
//     const { plan } = req.body;

//     // PLAN VALIDATE
//     if (!PLANS[plan]) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid plan selected",
//       });
//     }

//     const selectedPlan = PLANS[plan];

//     // RAZORPAY ORDER CREATE
//     const order = await razorpay.orders.create({
//       amount:   selectedPlan.amount * 100, // paise mein
//       currency: "INR",
//       receipt:  `receipt_${Date.now()}`,
//       notes: {
//         sellerId: req.user._id.toString(),
//         plan,
//       },
//     });

//     // DB MEIN SAVE
//     const subscription = await Subscription.create({
//       seller:          req.user._id,
//       plan,
//       amount:          selectedPlan.amount,
//       razorpayOrderId: order.id,
//       paymentStatus:   "created",
//     });

//     return res.status(201).json({
//       success: true,
//       order,
//       subscription,
//       key: process.env.RAZORPAY_KEY_ID,
//       planDetails: selectedPlan,
//     });

//   } catch (error) {
//     console.error("createOrder error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Order creation failed",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // VERIFY PAYMENT (Seller)
// // ─────────────────────────────────────────
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

//     const isValid = expectedSignature === razorpay_signature;

//     if (!isValid) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     // SUBSCRIPTION FIND
//     const subscription = await Subscription.findOne({
//       razorpayOrderId: razorpay_order_id,
//     });

//     if (!subscription) {
//       return res.status(404).json({
//         success: false,
//         message: "Subscription not found",
//       });
//     }

//     // DATES CALCULATE
//     const startDate  = new Date();
//     const expireDate = new Date();
//     expireDate.setDate(
//       expireDate.getDate() + 30 // 30 days validity
//     );

//     // SUBSCRIPTION UPDATE
//     subscription.razorpayPaymentId = razorpay_payment_id;
//     subscription.razorpaySignature = razorpay_signature;
//     subscription.paymentStatus     = "paid";
//     subscription.isActive          = true;
//     subscription.startDate         = startDate;
//     subscription.expireDate        = expireDate;
//     await subscription.save();

//     // ─────────────────────────────────────────
//     // SELLER UPDATE
//     // subscriptionActive = true
//     // accountStatus = "active"
//     // ─────────────────────────────────────────
//     await Seller.findByIdAndUpdate(
//       subscription.seller,
//       {
//         subscriptionActive: true,
//         accountStatus:      "active",
//         subscriptionPlan:   subscription.plan,
//         subscriptionExpire: expireDate,
//       }
//     );

//     // ─────────────────────────────────────────
//     // SELLER KE PENDING PRODUCTS APPROVE KARO
//     // ─────────────────────────────────────────
//     const Product = (await import("../models/product.model.js")).default;

//     await Product.updateMany(
//       {
//         seller: subscription.seller,
//         status: "pending",
//       },
//       {
//         status: "approved",
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Payment verified! Subscription activated successfully.",
//       subscription,
//     });

//   } catch (error) {
//     console.error("verifyPayment error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // GET MY SUBSCRIPTION (Seller)
// // ─────────────────────────────────────────
// export const getMySubscription = async (req, res) => {
//   try {
//     const subscription = await Subscription.findOne({
//       seller:        req.user._id,
//       paymentStatus: "paid",
//       isActive:      true,
//     }).sort({ createdAt: -1 });

//     const seller = await Seller.findById(req.user._id).select(
//       "subscriptionActive accountStatus subscriptionPlan subscriptionExpire"
//     );

//     return res.status(200).json({
//       success: true,
//       subscription,
//       seller,
//     });

//   } catch (error) {
//     console.error("getMySubscription error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch subscription",
//     });
//   }
// };




// controllers/subscription.controller.js

import Razorpay from "razorpay";
import crypto from "crypto";
import Seller from "../models/Seller.js";
import Subscription from "../models/Subscription.model.js";

// ─────────────────────────────────────────
// PLANS CONFIG
// ─────────────────────────────────────────
const PLANS = {
  basic: {
    name:     "Basic",
    amount:   999,
    duration: 30,
    features: [
      "Unlimited product listings",
      "Products go live instantly",
      "Basic seller dashboard",
      "Email support",
    ],
  },
  premium: {
    name:     "Premium",
    amount:   1999,
    duration: 30,
    features: [
      "Everything in Basic",
      "Featured product listing",
      "Priority search ranking",
      "Chat support",
    ],
  },
  gold: {
    name:     "Gold",
    amount:   3999,
    duration: 30,
    features: [
      "Everything in Premium",
      "Dedicated account manager",
      "Analytics dashboard",
      "Priority support 24/7",
    ],
  },
};

// ─────────────────────────────────────────
// GET PLANS (Public)
// ─────────────────────────────────────────
export const getPlans = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      plans: PLANS,
    });
  } catch (error) {
    console.error("getPlans error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
    });
  }
};

// ─────────────────────────────────────────
// CREATE ORDER (Seller)
// ─────────────────────────────────────────
export const createOrder = async (req, res) => {
  try {

    // ✅ RAZORPAY INSTANCE YAHAN BANAO
    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { plan } = req.body;

    // PLAN VALIDATE
    if (!PLANS[plan]) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan selected",
      });
    }

    const selectedPlan = PLANS[plan];

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
      planDetails: selectedPlan,
    });

  } catch (error) {
    console.error("createOrder error:", error);
    return res.status(500).json({
      success: false,
      message: "Order creation failed",
    });
  }
};

// ─────────────────────────────────────────
// VERIFY PAYMENT (Seller)
// ─────────────────────────────────────────
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

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // SUBSCRIPTION FIND
    const subscription = await Subscription.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    // DATES CALCULATE
    const startDate  = new Date();
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);

    // SUBSCRIPTION UPDATE
    subscription.razorpayPaymentId = razorpay_payment_id;
    subscription.razorpaySignature = razorpay_signature;
    subscription.paymentStatus     = "paid";
    subscription.isActive          = true;
    subscription.startDate         = startDate;
    subscription.expireDate        = expireDate;
    await subscription.save();

    // SELLER UPDATE
    await Seller.findByIdAndUpdate(
      subscription.seller,
      {
        subscriptionActive: true,
        accountStatus:      "active",
        subscriptionPlan:   subscription.plan,
        subscriptionExpire: expireDate,
      }
    );

    // PENDING PRODUCTS APPROVE
    const Product = (await import("../models/product.model.js")).default;

    await Product.updateMany(
      {
        seller: subscription.seller,
        status: "pending",
      },
      {
        status: "approved",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified! Subscription activated successfully.",
      subscription,
    });

  } catch (error) {
    console.error("verifyPayment error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
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

    return res.status(200).json({
      success: true,
      subscription,
      seller,
    });

  } catch (error) {
    console.error("getMySubscription error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch subscription",
    });
  }
};