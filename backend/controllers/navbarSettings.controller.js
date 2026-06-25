// backend/controllers/navbarSettings.controller.js
import NavbarSettings from "../models/NavbarSettings.js";

// GET (Public)
export const getNavbarSettings = async (req, res) => {
  try {
    let navbar = await NavbarSettings.findOne();

    if (!navbar) {
      navbar = await NavbarSettings.create({});
    }

    res.json({ success: true, data: navbar });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// UPDATE (Admin)
export const updateNavbarSettings = async (req, res) => {
  try {
    let navbar = await NavbarSettings.findOne();

    if (!navbar) {
      navbar = await NavbarSettings.create(req.body);
    } else {
      navbar = await NavbarSettings.findByIdAndUpdate(
        navbar._id,
        req.body,
        { new: true }
      );
    }

    res.json({ success: true, data: navbar });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};