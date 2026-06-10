

import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const seller = await Seller.findById(decoded.id).select("-password");

    if (!seller) {
      return res.status(401).json({ message: "Seller not found" });
    }

    req.user = seller;
    next();

  } catch (error) {
    console.error("authMiddleware error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;