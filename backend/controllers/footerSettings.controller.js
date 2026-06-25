// backend/controllers/footerSettings.controller.js
import FooterSettings from "../models/FooterSettings.js";

// GET (Public)
export const getFooterSettings = async (req, res) => {
  try {
    let footer = await FooterSettings.findOne();

    // Agar DB mein kuch nahi hai to default data bhejo
    if (!footer) {
      footer = await FooterSettings.create({});
    }

    res.json({ success: true, data: footer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE (Admin)
export const updateFooterSettings = async (req, res) => {
  try {
    let footer = await FooterSettings.findOne();

    if (!footer) {
      footer = await FooterSettings.create(req.body);
    } else {
      footer = await FooterSettings.findByIdAndUpdate(
        footer._id,
        req.body,
        { new: true }
      );
    }

    res.json({ success: true, data: footer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};