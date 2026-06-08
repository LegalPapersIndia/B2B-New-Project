


// controllers/lead.controller.js

import Lead from "../models/Lead.model.js";
import Product from "../models/product.model.js";
import Notification from "../models/Notification.model.js";
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
    if (!buyerName || !buyerPhone || !productId) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and product are required",
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

    // LEAD CREATE — model ke fields ke saath
    const lead = await Lead.create({
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
      quantity,
      productId,                    // ✅ model ka field
      productName: product.title,   // ✅ product name save
      sellerId: product.seller,     // ✅ model ka field
      type: "direct",
      status: "new",
    });

    await Notification.create({
  type: "new_lead",
  message: `New inquiry for: ${product.title}`,  // ← product.title use karo
  data: { leadId: lead._id, productName: product.title, buyerName },
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
    const leads = await Lead.find({ sellerId: req.user._id })
      .populate("productId", "title images price")
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

    if (!["new", "viewed", "contacted", "converted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const lead = await Lead.findOneAndUpdate(
      {
        _id:      req.params.id,
        sellerId: req.user._id,
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

// ─────────────────────────────────────────
// GET ALL LEADS (Admin)
// ─────────────────────────────────────────
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("productId", "title images price")
      .populate("sellerId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });

  } catch (error) {
    console.error("getAllLeads error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};


// ─────────────────────────────────────────
// DELETE SINGLE LEAD (Seller)
// ─────────────────────────────────────────
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id:      req.params.id,
      sellerId: req.user._id,
    });

    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    return res.status(200).json({ success: true, message: "Lead deleted" });
  } catch (error) {
    console.error("deleteLead error:", error);
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// ─────────────────────────────────────────
// DELETE MULTIPLE LEADS (Seller)
// ─────────────────────────────────────────
export const deleteMultipleLeads = async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!ids || !ids.length) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    await Lead.deleteMany({
      _id:      { $in: ids },
      sellerId: req.user._id,
    });

    return res.status(200).json({ success: true, message: `${ids.length} leads deleted` });
  } catch (error) {
    console.error("deleteMultipleLeads error:", error);
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};



// DELETE SINGLE LEAD (Admin)
export const deleteLeadAdmin = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });
    return res.status(200).json({ success: true, message: "Lead deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// DELETE MULTIPLE LEADS (Admin)
export const deleteMultipleLeadsAdmin = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return res.status(400).json({ success: false, message: "No IDs provided" });
    await Lead.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({ success: true, message: `${ids.length} leads deleted` });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};