// controllers/testimonial.controller.js
import Testimonial from "../models/Testimonial.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";

// ─────────────────────────────────────────
// PUBLIC — GET ALL ACTIVE TESTIMONIALS
// ─────────────────────────────────────────
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 });
    res.json({ success: true, testimonials });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// ADMIN — GET ALL TESTIMONIALS
// ─────────────────────────────────────────
export const adminGetTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, testimonials });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// ADMIN — CREATE TESTIMONIAL
// ─────────────────────────────────────────
export const adminCreateTestimonial = async (req, res) => {
  try {
    const { name, company, review, rating, isActive } = req.body;

    let image = {};
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "b2b/testimonials");
      image = { url: result.secure_url, public_id: result.public_id };
    }

    const testimonial = await Testimonial.create({
      name, company, review,
      rating: Number(rating),
      isActive: isActive === "true",
      image,
    });

    res.status(201).json({ success: true, testimonial });
  } catch {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// ADMIN — UPDATE TESTIMONIAL
// ─────────────────────────────────────────
export const adminUpdateTestimonial = async (req, res) => {
  try {
    const { name, company, review, rating, isActive } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    // NEW IMAGE UPLOAD
    if (req.file) {
      // OLD IMAGE DELETE
      if (testimonial.image?.public_id) {
        await deleteFromCloudinary(testimonial.image.public_id);
      }
      const result = await uploadToCloudinary(req.file.buffer, "b2b/testimonials");
      testimonial.image = { url: result.secure_url, public_id: result.public_id };
    }

    testimonial.name     = name;
    testimonial.company  = company;
    testimonial.review   = review;
    testimonial.rating   = Number(rating);
    testimonial.isActive = isActive === "true" || isActive === true;
    await testimonial.save();

    res.json({ success: true, testimonial });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// ─────────────────────────────────────────
// ADMIN — DELETE TESTIMONIAL
// ─────────────────────────────────────────
export const adminDeleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial)
      return res.status(404).json({ success: false, message: "Not found" });

    // CLOUDINARY SE DELETE
    if (testimonial.image?.public_id) {
      await deleteFromCloudinary(testimonial.image.public_id);
    }

    await testimonial.deleteOne();
    res.json({ success: true, message: "Deleted successfully" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};