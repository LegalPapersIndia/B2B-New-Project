// backend/controllers/ctaSection.controller.js
import CTASection from "../models/CTASection.js";

// GET (Public)
export const getCTA = async (req, res) => {
  try {
    let cta = await CTASection.findOne();

    // Agar DB mein kuch nahi hai to default data bhejo
    if (!cta) {
      cta = await CTASection.create({});
    }

    res.json({ success: true, data: cta });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE (Admin)
export const updateCTA = async (req, res) => {
  try {
    let cta = await CTASection.findOne();

    if (!cta) {
      cta = await CTASection.create(req.body);
    } else {
      cta = await CTASection.findByIdAndUpdate(cta._id, req.body, { new: true });
    }

    res.json({ success: true, data: cta });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};