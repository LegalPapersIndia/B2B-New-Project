// models/Requirement.model.js

import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────────
    // BUYER INFO
    // ─────────────────────────────────────────
    buyerName:  { type: String, required: true, trim: true },
    buyerEmail: { type: String, required: true, lowercase: true },
    buyerPhone: { type: String, required: true },

    // ─────────────────────────────────────────
    // REQUIREMENT DETAILS
    // ─────────────────────────────────────────
    productName: { type: String, required: true },
    description: { type: String },
    quantity:    { type: String },
    budget:      { type: String },
    location:    { type: String },

    // ─────────────────────────────────────────
    // CATEGORY LINK
    // ─────────────────────────────────────────
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    // ─────────────────────────────────────────
    // SELLERS JO MATCH HAIN
    // ─────────────────────────────────────────
  matchedSellers: [
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    plan:         { type: String },
    sentAt:       { type: Date, default: Date.now },
    isViewed:     { type: Boolean, default: false },
    sellerStatus: { type: String, enum: ["new", "viewed", "contacted", "converted", "rejected"], default: "new" }, // ← ADD
  },
],

postedBySeller: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Seller",
  default: null,
},

    // ─────────────────────────────────────────
    // STATUS
    // ─────────────────────────────────────────
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Requirement = mongoose.model("Requirement", requirementSchema);
export default Requirement;