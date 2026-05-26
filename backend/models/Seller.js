import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ACTIVATION STATUS
    subscriptionActive: {
      type: Boolean,
      default: false,
    },

    accountStatus: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },
    
    // models/Seller.js mein add karo

subscriptionPlan: {
  type: String,
  enum: ["basic", "premium", "gold"],
  default: null,
},

subscriptionExpire: {
  type: Date,
  default: null,
},

  },
  { timestamps: true },
  
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
