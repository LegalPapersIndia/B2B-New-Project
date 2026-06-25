// backend/models/HeroSlide.js
import mongoose from "mongoose";

const heroSlideSchema = new mongoose.Schema(
  {
    title:        { type: String, required: true },
    subtitle:     { type: String, required: true },
    // accentColor:  { type: String, default: "#F54900" },
    bgImage:      { type: String, required: true },  // Cloudinary URL
    publicId:     { type: String, required: true },  // Cloudinary public_id (delete ke liye)
    order:        { type: Number, default: 0 },
    isActive:     { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("HeroSlide", heroSlideSchema);