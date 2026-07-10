// controllers/managerController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ─────────────────────────────────────────
// GET ALL MANAGER USERS
// ─────────────────────────────────────────
export const getManagerUsers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" })
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, managers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// CREATE MANAGER USER
// ─────────────────────────────────────────
export const createManagerUser = async (req, res) => {
  try {
    const { name, email, password, permissions } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const manager = await User.create({
      name,
      email,
      phone: `manager_${Date.now()}`, // unique placeholder, jaisa HR mein hai
      password: hashedPassword,
      role: "manager",
      permissions: Array.isArray(permissions) ? permissions : [],
    });

    res.status(201).json({
      success: true,
      message: "Manager created successfully",
      manager: {
        _id: manager._id,
        name: manager.name,
        email: manager.email,
        permissions: manager.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// UPDATE MANAGER PERMISSIONS
// ─────────────────────────────────────────
export const updateManagerPermissions = async (req, res) => {
  try {
    const { permissions } = req.body;

    const manager = await User.findById(req.params.id);
    if (!manager || manager.role !== "manager") {
      return res.status(404).json({ success: false, message: "Manager not found" });
    }

    manager.permissions = Array.isArray(permissions) ? permissions : [];
    await manager.save();

    res.status(200).json({
      success: true,
      message: "Permissions updated successfully",
      manager: {
        _id: manager._id,
        name: manager.name,
        email: manager.email,
        permissions: manager.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE MANAGER USER
// ─────────────────────────────────────────
export const deleteManagerUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "manager") {
      return res.status(404).json({ success: false, message: "Manager not found" });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: "Manager deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ─────────────────────────────────────────
// GET MY OWN PERMISSIONS (self - admin/hr/manager sab use kar sakte hain)
// ─────────────────────────────────────────
export const getMyPermissions = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      role: user.role,
      permissions: user.permissions || [],
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};