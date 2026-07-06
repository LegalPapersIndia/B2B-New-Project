// // // controllers/subCategoryController.js

// // import SubCategory from "../models/subCategoryModel.js";
// // import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// // // ================= CREATE =================
// // export const createSubCategory = async (req, res) => {
// //   try {
// //     const { name, slug, desc, category } = req.body;

// //     if (!req.file) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Image is required",
// //       });
// //     }

// //     // ✅ BUFFER SE CLOUDINARY UPLOAD
// //     const result = await uploadToCloudinary(
// //       req.file.buffer,
// //       "b2b/subcategories"
// //     );

// //     const subCategory = await SubCategory.create({
// //       name,
// //       slug,
// //       desc,
// //       category,
// //       image: result.secure_url,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Subcategory created successfully",
// //       subCategory,
// //     });

// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= GET ALL =================
// // export const getSubCategories = async (req, res) => {
// //   try {
// //     const { category } = req.query;

// //     // ✅ CATEGORY ID SE FILTER — frontend ke liye
// //     const filter = category ? { category } : {};

// //     const subCategories = await SubCategory.find(filter)
// //       .populate("category", "name slug")
// //       .sort({ createdAt: -1 });

// //     res.status(200).json({
// //       success: true,
// //       subCategories,
// //     });

// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= DELETE =================
// // export const deleteSubCategory = async (req, res) => {
// //   try {
// //     const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

// //     if (!subCategory) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Subcategory not found",
// //       });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Subcategory deleted successfully",
// //     });

// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// // // ================= UPDATE =================
// // export const updateSubCategory = async (req, res) => {
// //   try {
// //     const { name, slug, desc, category } = req.body;

// //     const subCategory = await SubCategory.findById(req.params.id);

// //     if (!subCategory) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Subcategory not found",
// //       });
// //     }

// //     // ✅ IMAGE UPDATE — buffer se
// //     if (req.file) {
// //       const result = await uploadToCloudinary(
// //         req.file.buffer,
// //         "b2b/subcategories"
// //       );
// //       subCategory.image = result.secure_url;
// //     }

// //     subCategory.name     = name     || subCategory.name;
// //     subCategory.slug     = slug     || subCategory.slug;
// //     subCategory.desc     = desc     || subCategory.desc;
// //     subCategory.category = category || subCategory.category;

// //     await subCategory.save();

// //     res.status(200).json({
// //       success: true,
// //       message: "Subcategory updated successfully",
// //       subCategory,
// //     });

// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };




// // controllers/subCategoryController.js

// import SubCategory from "../models/subCategoryModel.js";
// import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// // ================= CREATE =================
// export const createSubCategory = async (req, res) => {
//   try {
//     const { name, slug, desc, category } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Image is required",
//       });
//     }

//     // ✅ BUFFER SE CLOUDINARY UPLOAD
//     const result = await uploadToCloudinary(
//       req.file.buffer,
//       "b2b/subcategories"
//     );

//     const subCategory = await SubCategory.create({
//       name,
//       slug,
//       desc,
//       category,
//       image: result.secure_url,
//       order: req.body.order ? Number(req.body.order) : 0, // ✅ NEW
//     });

//     res.status(201).json({
//       success: true,
//       message: "Subcategory created successfully",
//       subCategory,
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= GET ALL =================
// export const getSubCategories = async (req, res) => {
//   try {
//     const { category } = req.query;

//     // ✅ CATEGORY ID SE FILTER — frontend ke liye
//     const filter = category ? { category } : {};

//     const subCategories = await SubCategory.find(filter)
//       .populate("category", "name slug")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       subCategories,
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= DELETE =================
// export const deleteSubCategory = async (req, res) => {
//   try {
//     const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

//     if (!subCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Subcategory not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Subcategory deleted successfully",
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= UPDATE =================
// export const updateSubCategory = async (req, res) => {
//   try {
//     const { name, slug, desc, category } = req.body;

//     const subCategory = await SubCategory.findById(req.params.id);

//     if (!subCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Subcategory not found",
//       });
//     }

//     // ✅ IMAGE UPDATE — buffer se
//     if (req.file) {
//       const result = await uploadToCloudinary(
//         req.file.buffer,
//         "b2b/subcategories"
//       );
//       subCategory.image = result.secure_url;
//     }

//     subCategory.name     = name     || subCategory.name;
//     subCategory.slug     = slug     || subCategory.slug;
//     subCategory.desc     = desc     || subCategory.desc;
//     subCategory.category = category || subCategory.category;

//     // ✅ NEW - order (partial-safe, jaise Category controller mein hai)
//     if (req.body.order !== undefined) {
//       subCategory.order = Number(req.body.order);
//     }

//     await subCategory.save();

//     res.status(200).json({
//       success: true,
//       message: "Subcategory updated successfully",
//       subCategory,
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





// controllers/subCategoryController.js

import SubCategory from "../models/subCategoryModel.js";
import Product from "../models/product.model.js"; // ✅ NEW
import Lead from "../models/Lead.model.js"; // ✅ NEW
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// ================= CREATE =================
export const createSubCategory = async (req, res) => {
  try {
    const { name, slug, desc, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ✅ BUFFER SE CLOUDINARY UPLOAD
    const result = await uploadToCloudinary(
      req.file.buffer,
      "b2b/subcategories"
    );

    const subCategory = await SubCategory.create({
      name,
      slug,
      desc,
      category,
      image: result.secure_url,
      order: req.body.order ? Number(req.body.order) : 0,
    });

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      subCategory,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL =================
export const getSubCategories = async (req, res) => {
  try {
    const { category } = req.query;

    // ✅ CATEGORY ID SE FILTER — frontend ke liye
    const filter = category ? { category } : {};

    const subCategories = await SubCategory.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .lean(); // ✅ UPDATED - lean() add kiya taaki plain object mile, stats attach karna aasan ho

    // ✅ NEW - saare products (subcategory + views chahiye), group karke sum karenge
    const products = await Product.find({}).select("subcategory views").lean();

    // ✅ NEW - Lead collection se productId-wise enquiry count
    const leadCounts = await Lead.aggregate([
      { $group: { _id: "$productId", count: { $sum: 1 } } },
    ]);
    const enquiryMap = {};
    leadCounts.forEach((item) => {
      if (item._id) enquiryMap[item._id.toString()] = item.count;
    });

    // ✅ NEW - subcategory-wise total views + total enquiries calculate karo
    const statsMap = {};
    products.forEach((p) => {
      if (!p.subcategory) return;
      const subId = p.subcategory.toString();
      const productEnquiries = enquiryMap[p._id.toString()] || 0;

      if (!statsMap[subId]) {
        statsMap[subId] = { totalViews: 0, totalEnquiries: 0 };
      }
      statsMap[subId].totalViews += p.views || 0;
      statsMap[subId].totalEnquiries += productEnquiries;
    });

    // ✅ NEW - har subCategory ke saath stats attach karo
    const subCategoriesWithStats = subCategories.map((sub) => ({
      ...sub,
      totalViews: statsMap[sub._id.toString()]?.totalViews || 0,
      totalEnquiries: statsMap[sub._id.toString()]?.totalEnquiries || 0,
    }));

    res.status(200).json({
      success: true,
      subCategories: subCategoriesWithStats,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================
export const updateSubCategory = async (req, res) => {
  try {
    const { name, slug, desc, category } = req.body;

    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    // ✅ IMAGE UPDATE — buffer se
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "b2b/subcategories"
      );
      subCategory.image = result.secure_url;
    }

    subCategory.name     = name     || subCategory.name;
    subCategory.slug     = slug     || subCategory.slug;
    subCategory.desc     = desc     || subCategory.desc;
    subCategory.category = category || subCategory.category;

    if (req.body.order !== undefined) {
      subCategory.order = Number(req.body.order);
    }

    await subCategory.save();

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      subCategory,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};