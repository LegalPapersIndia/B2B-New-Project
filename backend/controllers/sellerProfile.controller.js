// controllers/sellerProfile.controller.js

import Seller from "../models/Seller.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";
import Product from "../models/product.model.js";

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


// ─────────────────────────────────────────
// GET FEATURED SELLERS (Public)
// Gold + Premium sellers
// ─────────────────────────────────────────
export const getFeaturedSellers = async (req, res) => {
  try {
    // Gold + Premium sellers fetch karo
    const sellers = await Seller.find({
  subscriptionActive: true,
  subscriptionPlan:   { $in: ["diamond", "gold"] },
  companyName:        { $ne: "" },
})
  .select("name companyName companyType city state profileImage subscriptionPlan yearEstablished")
  .sort({ subscriptionPlan: 1 }) // diamond pehle
  .limit(10);

    // Har seller ke products count karo
    const sellersWithCount = await Promise.all(
      sellers.map(async (seller) => {
        const productCount = await Product.countDocuments({
          seller:   seller._id,
          status:   "approved",
          isActive: true,
        });

        return {
          ...seller.toObject(),
          productCount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      sellers: sellersWithCount,
    });

  } catch (error) {
    console.error("getFeaturedSellers error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch sellers",
    });
  }
};



// ─────────────────────────────────────────
// GET SELLER PUBLIC PROFILE (Public)
// ─────────────────────────────────────────
export const getSellerPublicProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id)
      .select("-password -panNumber -regNumber");

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Seller ke approved products
    const products = await Product.find({
      seller:   seller._id,
      status:   "approved",
      isActive: true,
    })
      .populate("category",    "name slug")
      .populate("subcategory", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      seller,
      products,
    });

  } catch (error) {
    console.error("getSellerPublicProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch seller profile",
    });
  }
};