// backend/models/HowItWorks.js
import mongoose from "mongoose";

const howItWorksSchema = new mongoose.Schema(
  {
    stepNumber: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true, 
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0, // sorting ke liye
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("HowItWorks", howItWorksSchema);