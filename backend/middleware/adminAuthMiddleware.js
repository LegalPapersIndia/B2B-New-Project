// middleware/adminAuthMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const adminAuthMiddleware = async (req, res, next) => {
  try {

    // GET TOKEN
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // GET USER
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ROLE CHECK
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }

    // SAVE IN REQUEST
    req.admin = user;
    next();

  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default adminAuthMiddleware;