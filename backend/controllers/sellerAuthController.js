


// // controllers/sellerAuthController.js

// import Seller from "../models/Seller.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import sendEmail from "../utils/sendEmail.js";
// import Notification from "../models/Notification.model.js";

// // ─────────────────────────────────────────
// // REGISTER SELLER
// // ─────────────────────────────────────────
// export const registerSeller = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     const existingSeller = await Seller.findOne({ email });

//     if (existingSeller) {
//       return res.status(400).json({
//         success: false,
//         message: "Seller already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const seller = await Seller.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     await Notification.create({
//   type: "new_seller",
//   message: `New seller registered: ${name}`,
//   data: { sellerId: seller._id, name, email },
// });

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

// // ─────────────────────────────────────────
// // LOGIN SELLER
// // ─────────────────────────────────────────
// export const loginSeller = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, seller.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

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

// // ─────────────────────────────────────────
// // FORGOT PASSWORD — OTP EMAIL BHEJO
// // ─────────────────────────────────────────
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const seller = await Seller.findOne({ email });

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message: "No account found with this email",
//       });
//     }

//     // 6 DIGIT OTP GENERATE
//     const otp = crypto.randomInt(100000, 999999).toString();

//     // OTP EXPIRY — 10 MINUTES
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

//     // SAVE OTP IN DB
//     seller.resetOtp       = otp;
//     seller.resetOtpExpiry = otpExpiry;
//     await seller.save();

//     // EMAIL BHEJO
//     await sendEmail({
//       to:      seller.email,
//       subject: "B2B Trade — Password Reset OTP",
//       html: `
//         <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:16px;">
//           <h2 style="color:#1e3a8a;margin-bottom:8px;">Password Reset OTP</h2>
//           <p style="color:#6b7280;">Hi <strong>${seller.name}</strong>,</p>
//           <p style="color:#6b7280;">Use the OTP below to reset your password. It is valid for <strong>10 minutes</strong>.</p>
//           <div style="font-size:36px;font-weight:bold;letter-spacing:10px;color:#ea580c;text-align:center;padding:24px 0;">
//             ${otp}
//           </div>
//           <p style="color:#9ca3af;font-size:12px;text-align:center;">If you did not request this, please ignore this email.</p>
//         </div>
//       `,
//     });

//     res.status(200).json({
//       success: true,
//       message: "OTP sent to your email",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─────────────────────────────────────────
// // RESET PASSWORD — OTP VERIFY + NEW PASSWORD
// // ─────────────────────────────────────────
// export const resetPassword = async (req, res) => {
  
//   try {
//     const { email, otp, newPassword } = req.body;

//     const seller = await Seller.findOne({ email });
       

//     if (!seller) {
//       return res.status(404).json({
//         success: false,
//         message: "No account found with this email",
//       });
//     }

//     // OTP CHECK
//     if (!seller.resetOtp || seller.resetOtp !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     // EXPIRY CHECK
//     if (seller.resetOtpExpiry < new Date()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP has expired. Please request a new one.",
//       });
//     }

//     // HASH NEW PASSWORD
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // UPDATE PASSWORD + CLEAR OTP
//     seller.password       = hashedPassword;
//     seller.resetOtp       = null;
//     seller.resetOtpExpiry = null;
//     await seller.save();

//     res.status(200).json({
//       success: true,
//       message: "Password reset successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─────────────────────────────────────────
// // GET ALL SELLERS
// // ─────────────────────────────────────────
// export const getAllSellers = async (req, res) => {
//   try {
//     const sellers = await Seller.find().sort({ createdAt: -1 });

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

// // ─────────────────────────────────────────
// // DELETE SELLER (Admin)
// // ─────────────────────────────────────────
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
import { sendOtpSms } from "../utils/sendSMS.js"; 
import Notification from "../models/Notification.model.js";
import sendEmail from "../utils/sendEmail.js";

// ─────────────────────────────────────────
// SEND REGISTRATION OTP (Step 1)
// ─────────────────────────────────────────
export const sendRegistrationOtp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // ── VALIDATION ──
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ── EMAIL FORMAT CHECK ──
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // ── PHONE VALIDATION — 10 digits ──
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be 10 digits starting with 6-9",
      });
    }

   //  FIX — sirf verified sellers ko duplicate maano
const existingEmail = await Seller.findOne({ email, isPhoneVerified: true });
if (existingEmail) {
  return res.status(400).json({
    success: false,
    message: "Email already registered",
  });
}

const existingPhone = await Seller.findOne({ phone, isPhoneVerified: true });
if (existingPhone) {
  return res.status(400).json({
    success: false,
    message: "Phone number already registered",
  });
}

    // ── OTP GENERATE ──
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log(" GENERATED OTP:", otp);
   const otpExpiry = new Date(Date.now() + 1 * 60 * 1000); // 1 min

    // ── TEMP STORE — existing seller check se bach gaye, ab OTP store karo ──
    // Pehle se koi unverified entry hai to update karo, warna naya banao
    let tempSeller = await Seller.findOne({ phone, isPhoneVerified: false });

    if (tempSeller) {
      tempSeller.name       = name;
      tempSeller.email      = email;
      tempSeller.password   = await bcrypt.hash(password, 10);
      tempSeller.regOtp     = otp;
      tempSeller.regOtpExpiry = otpExpiry;
      await tempSeller.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      tempSeller = await Seller.create({
        name,
        email,
        phone,
        password:       hashedPassword,
        regOtp:         otp,
        regOtpExpiry:   otpExpiry,
        isPhoneVerified: false,
        accountStatus:  "pending",
      });
    }

    // ── SMS OTP BHEJO ──
    await sendOtpSms(phone, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your mobile number",
    });

  } catch (error) {
    console.error("sendRegistrationOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ─────────────────────────────────────────
// REGISTER SELLER
// ─────────────────────────────────────────
// export const registerSeller = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;

//     const existingSeller = await Seller.findOne({ email });

//     if (existingSeller) {
//       return res.status(400).json({
//         success: false,
//         message: "Seller already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const seller = await Seller.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//     });

//     await Notification.create({
//   type: "new_seller",
//   message: `New seller registered: ${name}`,
//   data: { sellerId: seller._id, name, email },
// });

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


// ─────────────────────────────────────────
// VERIFY OTP + COMPLETE REGISTRATION (Step 2)
// ─────────────────────────────────────────
export const verifyAndRegister = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required",
      });
    }

    // ── SELLER DHUNDO ──
    const seller = await Seller.findOne({ phone, isPhoneVerified: false });

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "No registration found for this number. Please start again.",
      });
    }

    // ── OTP CHECK ──
    if (seller.regOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ── EXPIRY CHECK ──
    if (seller.regOtpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    // ── VERIFY + CLEAR OTP ──
    seller.isPhoneVerified = true;
    seller.regOtp          = null;
    seller.regOtpExpiry    = null;
    await seller.save();

    // ── NOTIFICATION ──
    await Notification.create({
      type:    "new_seller",
      message: `New seller registered: ${seller.name}`,
      data:    { sellerId: seller._id, name: seller.name, email: seller.email },
    });

    // ── SUCCESS EMAIL ──
    await sendEmail({
      to:      seller.email,
      subject: "Welcome to LPI-B2B! ",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:16px;">
          <h2 style="color:#1e3a8a;">Welcome to LPI-B2B!</h2>
          <p style="color:#6b7280;">Hi <strong>${seller.name}</strong>,</p>
          <p style="color:#6b7280;">Your account has been created successfully. You can now login and start selling.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${process.env.FRONTEND_URL}/login" 
               style="background:#1e3a8a;color:white;padding:12px 32px;border-radius:12px;text-decoration:none;font-weight:bold;">
              Go to Dashboard
            </a>
          </div>
          <p style="color:#9ca3af;font-size:12px;text-align:center;">Legal Papers India B2B Marketplace</p>
        </div>
      `,
    });

    // ── TOKEN ──
    const token = jwt.sign(
      { id: seller._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to LPI-B2B ",
      token,
      seller,
    });

  } catch (error) {
    console.error("verifyAndRegister error:", error);
    return res.status(500).json({
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

  //  FIX — sirf verified sellers login kar sakein
const seller = await Seller.findOne({
  $or: [{ email }, { phone: email }],
  isPhoneVerified: true,
});

    if (!seller) {
  return res.status(400).json({
    success: false,
    message: "Invalid email/phone or password",
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