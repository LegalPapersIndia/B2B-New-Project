// import Seller from "../models/Seller.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // REGISTER SELLER
// export const registerSeller = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     // CHECK EXISTING SELLER
//     const existingSeller = await Seller.findOne({ email });

//     if (existingSeller) {
//       return res.status(400).json({
//         success: false,
//         message: "Seller already exists",
//       });
//     }

//     // HASH PASSWORD
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // CREATE SELLER
//     const seller = await Seller.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Seller registered successfully",
//       seller,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // LOGIN SELLER
// export const loginSeller = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // FIND SELLER
//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // CHECK PASSWORD
//     const isMatch = await bcrypt.compare(password, seller.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // TOKEN
//     const token = jwt.sign(
//       { id: seller._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       seller,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getAllSellers = async (req, res) => {
//   try {

//     const sellers = await Seller.find()
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       sellers,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };


// // DELETE SELLER (Admin)
// export const deleteSeller = async (req, res) => {
//   try {
//     const seller = await Seller.findById(req.params.id);

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message: "Seller not found",
//       });
//     }

//     await seller.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Seller deleted successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// controllers/sellerAuthController.js

import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
import Notification from "../models/Notification.model.js";

// ─────────────────────────────────────────
// REGISTER SELLER
// ─────────────────────────────────────────
export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const seller = await Seller.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await Notification.create({
  type: "new_seller",
  message: `New seller registered: ${name}`,
  data: { sellerId: seller._id, name, email },
});

    res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// LOGIN SELLER
// ─────────────────────────────────────────
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: seller._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// FORGOT PASSWORD — OTP EMAIL BHEJO
// ─────────────────────────────────────────
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // 6 DIGIT OTP GENERATE
    const otp = crypto.randomInt(100000, 999999).toString();

    // OTP EXPIRY — 10 MINUTES
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // SAVE OTP IN DB
    seller.resetOtp       = otp;
    seller.resetOtpExpiry = otpExpiry;
    await seller.save();

    // EMAIL BHEJO
    await sendEmail({
      to:      seller.email,
      subject: "B2B Trade — Password Reset OTP",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:16px;">
          <h2 style="color:#1e3a8a;margin-bottom:8px;">Password Reset OTP</h2>
          <p style="color:#6b7280;">Hi <strong>${seller.name}</strong>,</p>
          <p style="color:#6b7280;">Use the OTP below to reset your password. It is valid for <strong>10 minutes</strong>.</p>
          <div style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#ea580c;text-align:center;padding:24px 0;">
            ${otp}
          </div>
          <p style="color:#9ca3af;font-size:12px;text-align:center;">If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// RESET PASSWORD — OTP VERIFY + NEW PASSWORD
// ─────────────────────────────────────────
export const resetPassword = async (req, res) => {
  
  try {
    const { email, otp, newPassword } = req.body;

    const seller = await Seller.findOne({ email });
       

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email",
      });
    }

    // OTP CHECK
    if (!seller.resetOtp || seller.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // EXPIRY CHECK
    if (seller.resetOtpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // HASH NEW PASSWORD
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // UPDATE PASSWORD + CLEAR OTP
    seller.password       = hashedPassword;
    seller.resetOtp       = null;
    seller.resetOtpExpiry = null;
    await seller.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// GET ALL SELLERS
// ─────────────────────────────────────────
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      sellers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// DELETE SELLER (Admin)
// ─────────────────────────────────────────
export const deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    await seller.deleteOne();

    res.status(200).json({
      success: true,
      message: "Seller deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};