// backend/models/FooterSettings.js
import mongoose from "mongoose";

const footerSettingsSchema = new mongoose.Schema(
  {
    // COMPANY INFO
    description: {
      type: String,
      default: "Connecting global buyers and verified suppliers through a trusted B2B marketplace. Quality products, transparent trade, and seamless sourcing experience.",
    },

    // CONTACT
    phone: {
      type: String,
      default: "+917505266931",
    },
    email: {
      type: String,
      default: "support@yourb2b.com",
    },

    // SOCIAL LINKS
    facebook:  { type: String, default: "https://facebook.com" },
    twitter:   { type: String, default: "https://twitter.com" },
    instagram: { type: String, default: "https://instagram.com" },
    linkedin:  { type: String, default: "https://linkedin.com" },

    // TEMPLATE BUTTON
    templateBtnText: { type: String, default: "View LPI-Website Template" },
    templateBtnLink: { type: String, default: "https://template-vert-eta.vercel.app/" },

    // COPYRIGHT
    copyrightText: { type: String, default: "LPI-B2B Marketplace. All rights reserved." },
    developerName: { type: String, default: "Legal Papers India" },
    developerLink: { type: String, default: "https://www.legalpapersindia.com/" },
  },
  { timestamps: true }
);

export default mongoose.model("FooterSettings", footerSettingsSchema);