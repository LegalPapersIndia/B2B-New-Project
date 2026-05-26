

// // middleware/authMiddleware.js

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // ─────────────────────────────────────────
// // GENERAL AUTH (existing — mat chhedo)
// // ─────────────────────────────────────────
// const authMiddleware = async (req, res, next) => {
//   try {

//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "No token",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     req.user = user;

//     next();

//   } catch (error) {

//     console.log(error);

//     return res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // SELLER AUTH
// // ─────────────────────────────────────────
// export const sellerAuthMiddleware = async (req, res, next) => {
//   try {

//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Access denied. No token provided.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // SELLER HONA CHAHIYE
//     if (user.role !== "seller") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Seller only.",
//       });
//     }

//     // IMPORTANT:
//     // ADMIN APPROVAL SYSTEM REMOVE HO CHUKA HAI
//     // ISLIYE isApproved CHECK REMOVE KAR DIYA

//     req.seller = user;

//     next();

//   } catch (error) {

//     console.error("sellerAuth error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // ADMIN AUTH
// // ─────────────────────────────────────────
// export const adminAuthMiddleware = async (req, res, next) => {
//   try {

//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Access denied. No token provided.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ADMIN HONA CHAHIYE
//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admin only.",
//       });
//     }

//     req.admin = user;

//     next();

//   } catch (error) {

//     console.error("adminAuth error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default authMiddleware;




// middleware/authMiddleware.js

// import jwt from "jsonwebtoken";
// import Seller from "../models/Seller.js";

// // ─────────────────────────────────────────
// // GENERAL AUTH (existing — mat chhedo)
// // ─────────────────────────────────────────
// const authMiddleware = async (req, res, next) => {
//   try {

//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "No token",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await Seller.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     req.user = user;

//     next();

//   } catch (error) {

//     console.log(error);

//     return res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // SELLER AUTH
// // ─────────────────────────────────────────
// export const sellerAuthMiddleware = async (req, res, next) => {
//   try {

//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Access denied. No token provided.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await Seller.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.role && user.role !== "seller") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Seller only.",
//       });
//     }

//     req.seller = user;

//     next();

//   } catch (error) {

//     console.error("sellerAuth error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // ADMIN AUTH (NO CHANGE)
// // ─────────────────────────────────────────
// export const adminAuthMiddleware = async (req, res, next) => {
//   try {

//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Access denied. No token provided.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await Seller.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Admin only.",
//       });
//     }

//     req.admin = user;

//     next();

//   } catch (error) {

//     console.error("adminAuth error:", error);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default authMiddleware;




import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

const authMiddleware = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await Seller.findById(decoded.id).select("-password");

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;