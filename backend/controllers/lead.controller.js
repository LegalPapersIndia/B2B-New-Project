// controllers/lead.controller.js

import Lead from "../models/Lead.model.js";
import Product from "../models/product.model.js";

// ─────────────────────────────────────────
// CREATE LEAD (Public — Buyer)
// ─────────────────────────────────────────
export const createLead = async (req, res) => {
  try {
    const {
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
      quantity,
      productId,
    } = req.body;

    // VALIDATION
    if (!buyerName || !buyerEmail || !buyerPhone || !message || !productId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // PRODUCT FIND — seller automatically link hoga
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // LEAD CREATE
    const lead = await Lead.create({
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
      quantity,
      product: productId,
      seller: product.seller, // ⬅️ automatically link
    });

    return res.status(201).json({
      success: true,
      message: "Inquiry sent successfully!",
      lead,
    });

  } catch (error) {
    console.error("createLead error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send inquiry",
    });
  }
};

// ─────────────────────────────────────────
// GET MY LEADS (Seller)
// ─────────────────────────────────────────
export const getMyLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ seller: req.user._id })
      .populate("product", "title images price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });

  } catch (error) {
    console.error("getMyLeads error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

// ─────────────────────────────────────────
// UPDATE LEAD STATUS (Seller)
// ─────────────────────────────────────────
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "viewed", "responded"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const lead = await Lead.findOneAndUpdate(
      {
        _id:    req.params.id,
        seller: req.user._id,
      },
      { status },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead status updated",
      lead,
    });

  } catch (error) {
    console.error("updateLeadStatus error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};


// // ─────────────────────────────────────────
// // GET ALL LEADS (Admin)
// // ─────────────────────────────────────────
// export const getAllLeads = async (req, res) => {
//   try {
//     const leads = await Lead.find()
//       .populate("product", "title images price")
//       .populate("seller", "name email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: leads.length,
//       leads,
//     });

//   } catch (error) {
//     console.error("getAllLeads error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch leads",
//     });
//   }
// };