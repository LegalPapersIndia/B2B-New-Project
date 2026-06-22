// backend/models/WhyChooseUs.js
import mongoose from "mongoose";

const whyChooseUsSchema = new mongoose.Schema(
  {
    iconName: {
      type: String,
      required: true, // e.g. "ShieldCheck"
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    badgeText: {
      type: String,
      default: "Trusted B2B Solution", // footer badge text
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("WhyChooseUs", whyChooseUsSchema);