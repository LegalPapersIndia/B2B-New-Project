// backend/controllers/heroSlide.controller.js
import HeroSlide from "../models/HeroSlide.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";

// ─────────────────────────────────────────
// GET ALL (Public)
// ─────────────────────────────────────────
export const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: slides });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// GET ALL ADMIN (Admin — inactive bhi)
// ─────────────────────────────────────────
export const getHeroSlidesAdmin = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json({ success: true, data: slides });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// CREATE (Admin)
// ─────────────────────────────────────────
export const createHeroSlide = async (req, res) => {
  try {
    const { title, subtitle, accentColor, order } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image required hai" });
    }
    if (!title || !subtitle) {
      return res.status(400).json({ success: false, message: "Title aur Subtitle required hain" });
    }

    const result = await uploadToCloudinary(req.file.buffer, "b2b/hero-slides");

    const slide = await HeroSlide.create({
      title,
      subtitle,
      accentColor: accentColor || "#F54900",
      bgImage:  result.secure_url,
      publicId: result.public_id,
      order:    order ? Number(order) : 0,
    });

    res.status(201).json({ success: true, data: slide });
  } catch (error) {
    console.error("createHeroSlide error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// UPDATE (Admin)
// ─────────────────────────────────────────
export const updateHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, accentColor, order, isActive } = req.body;

    const slide = await HeroSlide.findById(id);
    if (!slide) return res.status(404).json({ success: false, message: "Slide not found" });

    // Naya image upload hua hai to purana delete karo
    if (req.file) {
      await deleteFromCloudinary(slide.publicId);
      const result = await uploadToCloudinary(req.file.buffer, "b2b/hero-slides");
      slide.bgImage  = result.secure_url;
      slide.publicId = result.public_id;
    }

    if (title)              slide.title       = title;
    if (subtitle)           slide.subtitle    = subtitle;
    if (accentColor)        slide.accentColor = accentColor;
    if (order !== undefined) slide.order      = Number(order);
    if (isActive !== undefined) slide.isActive = isActive === "true" || isActive === true;

    await slide.save();

    res.json({ success: true, data: slide });
  } catch (error) {
    console.error("updateHeroSlide error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// DELETE (Admin)
// ─────────────────────────────────────────
export const deleteHeroSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const slide = await HeroSlide.findById(id);
    if (!slide) return res.status(404).json({ success: false, message: "Slide not found" });

    await deleteFromCloudinary(slide.publicId);
    await HeroSlide.findByIdAndDelete(id);

    res.json({ success: true, message: "Slide deleted successfully" });
  } catch (error) {
    console.error("deleteHeroSlide error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};