// models/product.model.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────────
    // BASIC INFO
    // ─────────────────────────────────────────
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    shortDesc: {
      type: String,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    // ─────────────────────────────────────────
    // CATEGORY
    // ─────────────────────────────────────────
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: [true, "SubCategory is required"],
    },

    // ─────────────────────────────────────────
    // SELLER
    // ─────────────────────────────────────────
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: [true, "Seller is required"],
    },

    // ─────────────────────────────────────────
    // PRICING
    // ─────────────────────────────────────────
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    moq: {
      type: Number,
      default: 1,
      min: [1, "MOQ must be at least 1"],
    },

    unit: {
      type: String,
      default: "Piece",
    },

    brand: {
      type: String,
    },

    stock: {
      type: Number,
      default: 0,
    },

    // ─────────────────────────────────────────
    // IMAGES (Cloudinary)
    // ─────────────────────────────────────────
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    // ─────────────────────────────────────────
    // STATUS — subscription se control hoga
    // ─────────────────────────────────────────
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    // ─────────────────────────────────────────
    // SPECIFICATIONS
    // ─────────────────────────────────────────
    specifications: [
      {
        key: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ─────────────────────────────────────────
// AUTO SLUG — title se generate hoga
// ─────────────────────────────────────────

const Product = mongoose.model("Product", productSchema);

export default Product;