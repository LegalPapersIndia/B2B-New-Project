// backend/models/CTASection.js
import mongoose from "mongoose";

const ctaSectionSchema = new mongoose.Schema(
  {
    // HEADER
    badgeText: {
      type: String,
      default: "Trusted B2B Marketplace",
    },
    heading: {
      type: String,
      default: "Grow Your Business With Verified Buyers & Suppliers",
    },
    headingHighlight: {
      type: String,
      default: "Verified Buyers & Suppliers",
    },
    description: {
      type: String,
      default: "Join thousands of manufacturers, exporters, wholesalers, and buyers connecting daily.",
    },

    // STATS
    stat1Icon: { type: String, default: "Users" },
    stat1Value: { type: String, default: "50K+" },
    stat1Label: { type: String, default: "Active Buyers" },

    stat2Icon: { type: String, default: "Globe" },
    stat2Value: { type: String, default: "120+" },
    stat2Label: { type: String, default: "Countries Connected" },

    // BUTTONS
    btn1Text: { type: String, default: "Start Selling" },
    btn1Link: { type: String, default: "/register" },

    btn2Text: { type: String, default: "Post Buy Requirement" },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("CTASection", ctaSectionSchema);