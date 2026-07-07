// models/Subscription.model.js

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────────
    // SELLER LINK
    // ─────────────────────────────────────────
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    // ─────────────────────────────────────────
    // PLAN
    // ─────────────────────────────────────────
   plan: {
  type: String,
  enum: ["silver", "gold", "diamond"],
  required: true,
},

    // ─────────────────────────────────────────
    // PRICING
    // ─────────────────────────────────────────
    amount: {
      type: Number,
      required: true,
    },

    // ─────────────────────────────────────────
    // RAZORPAY
    // ─────────────────────────────────────────
   razorpayOrderId: {
  type: String,
  required: false,
  default: null,
},
    razorpayPaymentId: {
      type: String,
      default: null,
    },

    razorpaySignature: {
      type: String,
      default: null,
    },

    // ─────────────────────────────────────────
    // STATUS
    // ─────────────────────────────────────────
   paymentStatus: {
  type: String,
  enum: ["created", "paid", "failed", "admin_assigned"],
  default: "created",
},

    // ─────────────────────────────────────────
    // VALIDITY
    // ─────────────────────────────────────────
    startDate: {
      type: Date,
      default: null,
    },

    expireDate: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;