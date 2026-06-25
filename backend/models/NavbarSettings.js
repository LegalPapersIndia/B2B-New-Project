// backend/models/NavbarSettings.js
import mongoose from "mongoose";

const navbarSettingsSchema = new mongoose.Schema(
  {
    // LOGO
    logoText: {
      type: String,
      default: "LPI-B2B",
    },
    logoTagline: {
      type: String,
      default: "Wholesale Marketplace",
    },
    logoImage: {
      url:       { type: String, default: "" },
      public_id: { type: String, default: "" },
    },

    // TOP BAR
    phone: {
      type: String,
      default: "+91 75052 66931",
    },
    email: {
      type: String,
      default: "support@b2bhub.com",
    },

    // FESTIVAL BADGE
    festivalActive: {
      type: Boolean,
      default: false,
    },
    festivalName: {
      type: String,
      default: "Happy Diwali",
    },
    festivalEmoji: {
      type: String,
      default: "🪔",
    },
    festivalAnimation: {
      type: String,
      enum: ["diyas", "colors", "stars", "snow", "fireworks", "flowers", "confetti", "tiranga"],
      default: "confetti",
    },
    festivalTextColor: {
      type: String,
      default: "#FF6B6B",
    },
    festivalStartDate: {
      type: Date,
      default: null,
    },
    festivalEndDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("NavbarSettings", navbarSettingsSchema);