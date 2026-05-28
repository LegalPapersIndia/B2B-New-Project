// controllers/sellerProfile.controller.js

import Seller from "../models/Seller.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";

// ─────────────────────────────────────────
// GET MY PROFILE
// ─────────────────────────────────────────
export const getMyProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user._id).select("-password");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    return res.status(200).json({
      success: true,
      seller,
    });

  } catch (error) {
    console.error("getMyProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// ─────────────────────────────────────────
// UPDATE PROFILE
// ─────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const {
  name, phone,
  companyName, companyType, yearEstablished,
  employees, annualTurnover, companyWebsite, companyDescription,
  gstNumber, panNumber, regNumber,
  city, state, pincode, address,
} = req.body;

    const seller = await Seller.findById(req.user._id);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // ─────────────────────────────────────────
    // PROFILE IMAGE UPDATE
    // ─────────────────────────────────────────
    if (req.file) {
      // Purani image delete karo
      if (seller.profileImage?.public_id) {
        await deleteFromCloudinary(seller.profileImage.public_id);
      }

      // Nayi image upload karo
      const result = await uploadToCloudinary(
        req.file.buffer,
        "b2b/seller-profiles"
      );

      seller.profileImage = {
        url:       result.secure_url,
        public_id: result.public_id,
      };
    }

    // FIELDS UPDATE
   seller.name               = name               || seller.name;
seller.phone              = phone              || seller.phone;
seller.companyName        = companyName        ?? seller.companyName;
seller.companyType        = companyType        ?? seller.companyType;
seller.yearEstablished    = yearEstablished    ?? seller.yearEstablished;
seller.employees          = employees          ?? seller.employees;
seller.annualTurnover     = annualTurnover     ?? seller.annualTurnover;
seller.companyWebsite     = companyWebsite     ?? seller.companyWebsite;
seller.companyDescription = companyDescription ?? seller.companyDescription;
seller.gstNumber          = gstNumber          ?? seller.gstNumber;
seller.panNumber          = panNumber          ?? seller.panNumber;
seller.regNumber          = regNumber          ?? seller.regNumber;
seller.city               = city               ?? seller.city;
seller.state              = state              ?? seller.state;
seller.pincode            = pincode            ?? seller.pincode;
seller.address            = address            ?? seller.address;
    await seller.save();

    // LOCALSTORAGE UPDATE KE LIYE CLEAN DATA BHEJO
    const updatedSeller = await Seller.findById(req.user._id).select("-password");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      seller: updatedSeller,
    });

  } catch (error) {
    console.error("updateProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};