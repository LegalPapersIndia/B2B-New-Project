
// // routes/sellerAuthRoutes.js

// import express from "express";

// import {
//   registerSeller,
//   loginSeller,
//   getAllSellers,
//   deleteSeller,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/sellerAuthController.js";

// import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// // REGISTER
// router.post("/register", registerSeller);

// // LOGIN
// router.post("/login", loginSeller);

// // FORGOT PASSWORD — email daalo, OTP aayega
// router.post("/forgot-password", forgotPassword);

// // RESET PASSWORD — OTP + new password
// router.post("/reset-password", resetPassword);

// // GET ALL SELLERS
// router.get("/all", getAllSellers);

// // DELETE SELLER (Admin)
// router.delete("/:id", adminAuthMiddleware, deleteSeller);

// export default router;



// routes/sellerAuthRoutes.js

import express from "express";

import {
  sendRegistrationOtp,
  verifyAndRegister,
  loginSeller,
  getAllSellers,
  deleteSeller,
  forgotPassword,
  resetPassword,
} from "../controllers/sellerAuthController.js";

import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; // ✅ UPDATED

const router = express.Router();

// REGISTER
router.post("/send-otp", sendRegistrationOtp);

router.post("/verify-register", verifyAndRegister);

// LOGIN
router.post("/login", loginSeller);

// FORGOT PASSWORD — email daalo, OTP aayega
router.post("/forgot-password", forgotPassword);

// RESET PASSWORD — OTP + new password
router.post("/reset-password", resetPassword);

// GET ALL SELLERS
router.get("/all", getAllSellers);

// DELETE SELLER (Admin)
router.delete("/:id", checkPermission("sellers"), deleteSeller);

export default router;