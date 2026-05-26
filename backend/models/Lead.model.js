import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    // BUYER INFO
    buyerName:  { type: String, required: true },
    buyerPhone: { type: String, required: true },
    buyerEmail: { type: String },
    quantity:   { type: String },
    message:    { type: String },

    // PRODUCT INFO
    productId:   { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    productName: { type: String },

    // CATEGORY INFO
    categoryId:   { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    categoryName: { type: String },

    // SELLER — kis seller ko gayi lead
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },

    // LEAD TYPE
    type: {
      type: String,
      enum: ["direct", "broadcast"],
      default: "direct",
    },

    // STATUS
    status: {
      type: String,
      enum: ["new", "viewed", "contacted", "converted", "rejected"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;