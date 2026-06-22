
// controllers/requirement.controller.js

import Requirement from "../models/Requirement.model.js";
import Seller from "../models/Seller.js";
import Product from "../models/product.model.js";

// ─────────────────────────────────────────
// PLAN PRIORITY
// ─────────────────────────────────────────
const PLAN_PRIORITY = {
  gold:    1,
  premium: 2,
  basic:   3,
};

// ─────────────────────────────────────────
// PLAN DELAY
// ─────────────────────────────────────────
const PLAN_DELAY = {
  gold:    0,                    // turant
  premium: 30 * 60 * 1000,      // 30 min
  basic:   60 * 60 * 1000,      // 1 hour
};

// ─────────────────────────────────────────
// POST REQUIREMENT (Public)
// ─────────────────────────────────────────
export const postRequirement = async (req, res) => {
  try {
    const {
      buyerName,
      buyerEmail,
      buyerPhone,
      productName,
      description,
      quantity,
      budget,
      location,
      category,
      subCategory,
    } = req.body;

    // VALIDATION
    if (!buyerName || !buyerEmail || !buyerPhone || !productName || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // SUBSCRIBED SELLERS FIND
    const productQuery = { category, status: "approved" };
if (subCategory) productQuery.subcategory = subCategory; // ← sirf ye add hua

const categoryProducts = await Product.find(productQuery).distinct("seller");

 // Buyer ki location se city/state nikalo
const locationParts = location
  ? location.split(",").map((s) => s.trim())
  : [];
const buyerCity  = locationParts[0] || "";
const buyerState = locationParts[1] || "";

// Location match karne wale sellers pehle, baaki baad mein
const subscribedSellers = await Seller.find({
  _id:                { $in: categoryProducts },
  subscriptionActive: true,
}).select("name email subscriptionPlan city state");

// Location ke hisaab se sort — same city/state wale upar
const getTier = (seller) => {
  const sameCity  = buyerCity  && seller.city?.toLowerCase()  === buyerCity.toLowerCase();
  const sameState = buyerState && seller.state?.toLowerCase() === buyerState.toLowerCase();
  if (sameCity)  return 1; // Same City
  if (sameState) return 2; // Same State
  return 3;                // Rest of India
};

    // PLAN PRIORITY SE SORT
 const sortedSellers = [...subscribedSellers].sort((a, b) => {
  const tierA = getTier(a);
  const tierB = getTier(b);
  if (tierA !== tierB) return tierA - tierB; // pehle tier compare karo
  // same tier mein plan priority
  const pa = PLAN_PRIORITY[a.subscriptionPlan] || 99;
  const pb = PLAN_PRIORITY[b.subscriptionPlan] || 99;
  return pa - pb;
});

    // MAX 20 SELLERS
    const topSellers = sortedSellers;

    // ✅ MATCHED SELLERS — sentAt alag alag time
    const matchedSellers = topSellers.map((seller) => {
      const delay = PLAN_DELAY[seller.subscriptionPlan] || 0;
      return {
        seller:   seller._id,
        plan:     seller.subscriptionPlan,
        sentAt:   new Date(Date.now() + delay),
        isViewed: false,
      };
    });

    // SAVE
    const requirement = await Requirement.create({
      buyerName,
      buyerEmail,
      buyerPhone,
      productName,
      description,
      quantity,
      budget,
      location,
      category,
      subCategory: subCategory || null,
      matchedSellers,
      status: "active",
    });

    return res.status(201).json({
      success: true,
      message: `Requirement posted! ${matchedSellers.length} sellers notified.`,
      requirement,
      sellersNotified: matchedSellers.length,
    });

  } catch (error) {
    console.error("postRequirement error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to post requirement",
    });
  }
};

// ─────────────────────────────────────────
// GET MY REQUIREMENTS (Seller)
// ─────────────────────────────────────────
// export const getMyRequirements = async (req, res) => {
//   try {
//     const now = new Date();

//     // ✅ SIRF WO DIKHAO JINKA sentAt TIME AA GAYA
//     const requirements = await Requirement.find({
//       matchedSellers: {
//         $elemMatch: {
//           seller: req.user._id,
//           sentAt: { $lte: now },
//         },
//       },
//       status: "active",
//     })
//       .populate("category",    "name")
//       .populate("subCategory", "name")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: requirements.length,
//       requirements,
//     });

//   } catch (error) {
//     console.error("getMyRequirements error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch requirements",
//     });
//   }
// };


export const getMyRequirements = async (req, res) => {
  try {
    const now = new Date();

    // ✅ SIRF WO DIKHAO JINKA sentAt TIME AA GAYA
    const requirements = await Requirement.find({
      matchedSellers: {
        $elemMatch: {
          seller: req.user._id,
          sentAt: { $lte: now },
        },
      },
      // status: "active" — hata diya taaki status change pe disappear na ho
    })
      .populate("category",    "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 });

    // Har requirement mein is seller ka sellerStatus inject karo
    const result = requirements.map((req_) => {
      const matched = req_.matchedSellers.find(
        (ms) => ms.seller.toString() === req.user._id.toString()
      );
      return {
        ...req_.toObject(),
        status: matched?.sellerStatus || "new",
      };
    });

    return res.status(200).json({
      success: true,
      count: result.length,
      requirements: result,
    });

  } catch (error) {
    console.error("getMyRequirements error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch requirements",
    });
  }
};

// ─────────────────────────────────────────
// GET ALL REQUIREMENTS (Admin)
// ─────────────────────────────────────────
export const getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find()
      .populate("category",    "name")
      .populate("subCategory", "name")
      .populate("matchedSellers.seller", "name email subscriptionPlan")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requirements.length,
      requirements,
    });

  } catch (error) {
    console.error("getAllRequirements error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch requirements",
    });
  }
};


// ─────────────────────────────────────────
// DELETE SINGLE REQUIREMENT (Seller)
// ─────────────────────────────────────────
export const deleteRequirement = async (req, res) => {
  try {
    // Seller sirf apni matched requirements delete kar sakta hai
    const req_ = await Requirement.findOneAndUpdate(
      {
        _id: req.params.id,
        "matchedSellers.seller": req.user._id,
      },
      {
        $pull: { matchedSellers: { seller: req.user._id } },
      },
      { new: true }
    );

    if (!req_) {
      return res.status(404).json({ success: false, message: "Requirement not found" });
    }

    return res.status(200).json({ success: true, message: "Requirement removed" });
  } catch (error) {
    console.error("deleteRequirement error:", error);
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// ─────────────────────────────────────────
// DELETE MULTIPLE REQUIREMENTS (Seller)
// ─────────────────────────────────────────
export const deleteMultipleRequirements = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !ids.length) {
      return res.status(400).json({ success: false, message: "No IDs provided" });
    }

    await Requirement.updateMany(
      {
        _id: { $in: ids },
        "matchedSellers.seller": req.user._id,
      },
      {
        $pull: { matchedSellers: { seller: req.user._id } },
      }
    );

    return res.status(200).json({ success: true, message: `${ids.length} requirements removed` });
  } catch (error) {
    console.error("deleteMultipleRequirements error:", error);
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};


// DELETE SINGLE REQUIREMENT (Admin)
export const deleteRequirementAdmin = async (req, res) => {
  try {
    const req_ = await Requirement.findByIdAndDelete(req.params.id);
    if (!req_) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, message: "Requirement deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// DELETE MULTIPLE REQUIREMENTS (Admin)
export const deleteMultipleRequirementsAdmin = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !ids.length) return res.status(400).json({ success: false, message: "No IDs provided" });
    await Requirement.deleteMany({ _id: { $in: ids } });
    return res.status(200).json({ success: true, message: `${ids.length} deleted` });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};



export const updateRequirementStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "viewed", "contacted", "converted", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    // Global status nahi — sirf is seller ka status update karo
    const requirement = await Requirement.findOneAndUpdate(
      {
        _id: req.params.id,
        "matchedSellers.seller": req.user._id,
      },
      {
        $set: { "matchedSellers.$.sellerStatus": status },
      },
      { new: true }
    );

    if (!requirement)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, requirement });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ─────────────────────────────────────────
// POST REQUIREMENT (Seller — khud buyer bankar)
// ─────────────────────────────────────────
export const postRequirementBySeller = async (req, res) => {
  try {
    const {
      productName,
      description,
      quantity,
      budget,
      location,
      category,
      subCategory,
    } = req.body;

    // VALIDATION
    if (!productName || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ✅ NEW — buyer info form se nahi, seller ke account se
    const currentSeller = await Seller.findById(req.user._id).select("name email phone");
    if (!currentSeller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    // SUBSCRIBED SELLERS FIND — same logic jaisa postRequirement mein
    const productQuery = { category, status: "approved" };
    if (subCategory) productQuery.subcategory = subCategory;

    const categoryProducts = await Product.find(productQuery).distinct("seller");

    const locationParts = location
      ? location.split(",").map((s) => s.trim())
      : [];
    const buyerCity  = locationParts[0] || "";
    const buyerState = locationParts[1] || "";

    // ✅ NEW — khud (req.user._id) ko $ne se exclude kiya
    const subscribedSellers = await Seller.find({
      _id:                { $in: categoryProducts, $ne: req.user._id },
      subscriptionActive: true,
    }).select("name email subscriptionPlan city state");

    const getTier = (seller) => {
      const sameCity  = buyerCity  && seller.city?.toLowerCase()  === buyerCity.toLowerCase();
      const sameState = buyerState && seller.state?.toLowerCase() === buyerState.toLowerCase();
      if (sameCity)  return 1;
      if (sameState) return 2;
      return 3;
    };

    const sortedSellers = [...subscribedSellers].sort((a, b) => {
      const tierA = getTier(a);
      const tierB = getTier(b);
      if (tierA !== tierB) return tierA - tierB;
      const pa = PLAN_PRIORITY[a.subscriptionPlan] || 99;
      const pb = PLAN_PRIORITY[b.subscriptionPlan] || 99;
      return pa - pb;
    });

    const topSellers = sortedSellers;

    const matchedSellers = topSellers.map((seller) => {
      const delay = PLAN_DELAY[seller.subscriptionPlan] || 0;
      return {
        seller:   seller._id,
        plan:     seller.subscriptionPlan,
        sentAt:   new Date(Date.now() + delay),
        isViewed: false,
      };
    });

    // SAVE — buyer info seller ke account se liya
    const requirement = await Requirement.create({
      buyerName:  currentSeller.name,
      buyerEmail: currentSeller.email,
      buyerPhone: currentSeller.phone,
      productName,
      description,
      quantity,
      budget,
      location,
      category,
      subCategory: subCategory || null,
      matchedSellers,
      status: "active",
      postedBySeller: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: `Requirement posted! ${matchedSellers.length} sellers notified.`,
      requirement,
      sellersNotified: matchedSellers.length,
    });

  } catch (error) {
    console.error("postRequirementBySeller error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to post requirement",
    });
  }
};


// ─────────────────────────────────────────
// GET MY POSTED REQUIREMENTS (Seller — jo khud post ki)
// ─────────────────────────────────────────
export const getMyPostedRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.find({
      postedBySeller: req.user._id,
    })
      .populate("category",    "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 });

    // ✅ Har requirement ke saath ye bhi batao kitne sellers ne dekha/contact kiya
  const result = requirements.map((r) => {
  const obj = r.toObject();
  const viewedCount = obj.matchedSellers.filter((m) =>
    ["viewed", "contacted", "converted"].includes(m.sellerStatus)
  ).length;
  const contactedCount = obj.matchedSellers.filter((m) =>
    ["contacted", "converted"].includes(m.sellerStatus)
  ).length;
  return {
    ...obj,
    totalSellersNotified: obj.matchedSellers.length,
    viewedCount,
    contactedCount,
  };
});
    return res.status(200).json({
      success: true,
      count: result.length,
      requirements: result,
    });

  } catch (error) {
    console.error("getMyPostedRequirements error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posted requirements",
    });
  }
};