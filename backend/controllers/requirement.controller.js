// // // controllers/requirement.controller.js

// // import Requirement from "../models/Requirement.model.js";
// // import Seller from "../models/Seller.js";
// // import Product from "../models/product.model.js";

// // // ─────────────────────────────────────────
// // // PLAN PRIORITY
// // // ─────────────────────────────────────────
// // const PLAN_PRIORITY = {
// //   gold:    1,
// //   premium: 2,
// //   basic:   3,
// // };

// // // ─────────────────────────────────────────
// // // POST REQUIREMENT (Public — Buyer)
// // // ─────────────────────────────────────────
// // export const postRequirement = async (req, res) => {
// //   try {
// //     const {
// //       buyerName,
// //       buyerEmail,
// //       buyerPhone,
// //       productName,
// //       description,
// //       quantity,
// //       budget,
// //       location,
// //       category,
// //       subCategory,
// //     } = req.body;

// //     // VALIDATION
// //     if (!buyerName || !buyerEmail || !buyerPhone || !productName || !category) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Please fill all required fields",
// //       });
// //     }

// //     // ─────────────────────────────────────────
// //     // SUBSCRIBED SELLERS FIND KARO
// //     // Us category mein products wale sellers
// //     // ─────────────────────────────────────────
// //     const categoryProducts = await Product.find({
// //       category,
// //       status: "approved",
// //     }).distinct("seller");

// //     // Subscribed sellers dhundho — plan ke saath
// //     const subscribedSellers = await Seller.find({
// //       _id:                { $in: categoryProducts },
// //       subscriptionActive: true,
// //     }).select("name email subscriptionPlan");

// //     // PLAN PRIORITY SE SORT KARO
// //     const sortedSellers = subscribedSellers.sort((a, b) => {
// //       const pa = PLAN_PRIORITY[a.subscriptionPlan] || 99;
// //       const pb = PLAN_PRIORITY[b.subscriptionPlan] || 99;
// //       return pa - pb;
// //     });

// //     // MAX 20 SELLERS KO BHEJO
// //     const topSellers = sortedSellers.slice(0, 20);

// //     // MATCHED SELLERS FORMAT
// //     const matchedSellers = topSellers.map((seller) => ({
// //       seller:   seller._id,
// //       plan:     seller.subscriptionPlan,
// //       sentAt:   new Date(),
// //       isViewed: false,
// //     }));

// //     // REQUIREMENT SAVE
// //     const requirement = await Requirement.create({
// //       buyerName,
// //       buyerEmail,
// //       buyerPhone,
// //       productName,
// //       description,
// //       quantity,
// //       budget,
// //       location,
// //       category,
// //       subCategory: subCategory || null,
// //       matchedSellers,
// //       status: "active",
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: `Requirement posted! ${matchedSellers.length} sellers notified.`,
// //       requirement,
// //       sellersNotified: matchedSellers.length,
// //     });

// //   } catch (error) {
// //     console.error("postRequirement error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to post requirement",
// //     });
// //   }
// // };

// // // ─────────────────────────────────────────
// // // GET MY REQUIREMENTS (Seller)
// // // Jo requirements seller ko match hui hain
// // // ─────────────────────────────────────────
// // export const getMyRequirements = async (req, res) => {
// //   try {
// //     const requirements = await Requirement.find({
// //       "matchedSellers.seller": req.user._id,
// //       status: "active",
// //     })
// //       .populate("category",    "name")
// //       .populate("subCategory", "name")
// //       .sort({ createdAt: -1 });

// //     // Mark as viewed
// //     await Requirement.updateMany(
// //       { "matchedSellers.seller": req.user._id },
// //       { $set: { "matchedSellers.$.isViewed": true } }
// //     );

// //     return res.status(200).json({
// //       success: true,
// //       count: requirements.length,
// //       requirements,
// //     });

// //   } catch (error) {
// //     console.error("getMyRequirements error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch requirements",
// //     });
// //   }
// // };

// // // ─────────────────────────────────────────
// // // GET ALL REQUIREMENTS (Admin)
// // // ─────────────────────────────────────────
// // export const getAllRequirements = async (req, res) => {
// //   try {
// //     const requirements = await Requirement.find()
// //       .populate("category",    "name")
// //       .populate("subCategory", "name")
// //       .populate("matchedSellers.seller", "name email subscriptionPlan")
// //       .sort({ createdAt: -1 });

// //     return res.status(200).json({
// //       success: true,
// //       count: requirements.length,
// //       requirements,
// //     });

// //   } catch (error) {
// //     console.error("getAllRequirements error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Failed to fetch requirements",
// //     });
// //   }
// // };




// // controllers/requirement.controller.js

// import Requirement from "../models/Requirement.model.js";
// import Seller from "../models/Seller.js";
// import Product from "../models/product.model.js";

// // ─────────────────────────────────────────
// // PLAN PRIORITY
// // ─────────────────────────────────────────
// const PLAN_PRIORITY = {
//   gold:    1,
//   premium: 2,
//   basic:   3,
// };

// // ─────────────────────────────────────────
// // PLAN DELAY
// // ─────────────────────────────────────────
// const PLAN_DELAY = {
//   gold:    0,                    // turant
//   premium: 30 * 60 * 1000,      // 30 min
//   basic:   60 * 60 * 1000,      // 1 hour
// };

// // ─────────────────────────────────────────
// // POST REQUIREMENT (Public)
// // ─────────────────────────────────────────
// export const postRequirement = async (req, res) => {
//   try {
//     const {
//       buyerName,
//       buyerEmail,
//       buyerPhone,
//       productName,
//       description,
//       quantity,
//       budget,
//       location,
//       category,
//       subCategory,
//     } = req.body;

//     // VALIDATION
//     if (!buyerName || !buyerEmail || !buyerPhone || !productName || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     // SUBSCRIBED SELLERS FIND
//     const categoryProducts = await Product.find({
//       category,
//       status: "approved",
//     }).distinct("seller");

//     const subscribedSellers = await Seller.find({
//       _id:                { $in: categoryProducts },
//       subscriptionActive: true,
//     }).select("name email subscriptionPlan");

//     // PLAN PRIORITY SE SORT
//     const sortedSellers = subscribedSellers.sort((a, b) => {
//       const pa = PLAN_PRIORITY[a.subscriptionPlan] || 99;
//       const pb = PLAN_PRIORITY[b.subscriptionPlan] || 99;
//       return pa - pb;
//     });

//     // MAX 20 SELLERS
//     const topSellers = sortedSellers.slice(0, 20);

//     // ✅ MATCHED SELLERS — sentAt alag alag time
//     const matchedSellers = topSellers.map((seller) => {
//       const delay = PLAN_DELAY[seller.subscriptionPlan] || 0;
//       return {
//         seller:   seller._id,
//         plan:     seller.subscriptionPlan,
//         sentAt:   new Date(Date.now() + delay),
//         isViewed: false,
//       };
//     });

//     // SAVE
//     const requirement = await Requirement.create({
//       buyerName,
//       buyerEmail,
//       buyerPhone,
//       productName,
//       description,
//       quantity,
//       budget,
//       location,
//       category,
//       subCategory: subCategory || null,
//       matchedSellers,
//       status: "active",
//     });

//     return res.status(201).json({
//       success: true,
//       message: `Requirement posted! ${matchedSellers.length} sellers notified.`,
//       requirement,
//       sellersNotified: matchedSellers.length,
//     });

//   } catch (error) {
//     console.error("postRequirement error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to post requirement",
//     });
//   }
// };

// // ─────────────────────────────────────────
// // GET MY REQUIREMENTS (Seller)
// // ─────────────────────────────────────────
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

// // ─────────────────────────────────────────
// // GET ALL REQUIREMENTS (Admin)
// // ─────────────────────────────────────────
// export const getAllRequirements = async (req, res) => {
//   try {
//     const requirements = await Requirement.find()
//       .populate("category",    "name")
//       .populate("subCategory", "name")
//       .populate("matchedSellers.seller", "name email subscriptionPlan")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: requirements.length,
//       requirements,
//     });

//   } catch (error) {
//     console.error("getAllRequirements error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch requirements",
//     });
//   }
// };


// loction base 



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
    const categoryProducts = await Product.find({
      category,
      status: "approved",
    }).distinct("seller");

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
const sortedByLocation = subscribedSellers.sort((a, b) => {
  const aMatch =
    (buyerCity  && a.city?.toLowerCase()  === buyerCity.toLowerCase())  ? 1 : 0 +
    (buyerState && a.state?.toLowerCase() === buyerState.toLowerCase()) ? 1 : 0;
  const bMatch =
    (buyerCity  && b.city?.toLowerCase()  === buyerCity.toLowerCase())  ? 1 : 0 +
    (buyerState && b.state?.toLowerCase() === buyerState.toLowerCase()) ? 1 : 0;
  return bMatch - aMatch;
});

    // PLAN PRIORITY SE SORT
  const sortedSellers = sortedByLocation.sort((a, b) => {
      const pa = PLAN_PRIORITY[a.subscriptionPlan] || 99;
      const pb = PLAN_PRIORITY[b.subscriptionPlan] || 99;
      return pa - pb;
    });

    // MAX 20 SELLERS
    const topSellers = sortedSellers.slice(0, 20);

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
      status: "active",
    })
      .populate("category",    "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requirements.length,
      requirements,
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