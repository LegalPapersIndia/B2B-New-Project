// import Category from "../models/Category.js";
// import { cloudinary } from "../config/cloudinary.js";

// // ==========================
// // CREATE CATEGORY
// // ==========================
// export const createCategory = async (req, res) => {
//   try {
//     const { name, slug, desc, products } = req.body;

//     // IMAGE CHECK
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Category image is required",
//       });
//     }

//     // ==========================
//     // UPLOAD CATEGORY IMAGE
//     // ==========================
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: "b2b-categories",
//     });

//     // ==========================
//     // CREATE CATEGORY
//     // ==========================
//     const category = await Category.create({
//       name,
//       slug,
//       desc,
//       image: result.secure_url,

//       // PRODUCTS ARRAY
//       products: products ? JSON.parse(products) : [],
//     });

//     res.status(201).json({
//       success: true,
//       message: "Category created successfully",
//       category,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================
// // GET ALL CATEGORIES
// // ==========================
// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       categories,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// export const deleteCategory =
//   async (req, res) => {
//     try {
//       const category =
//         await Category.findByIdAndDelete(
//           req.params.id
//         );

//       if (!category) {
//         return res.status(404).json({
//           message:
//             "Category not found",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message:
//           "Category deleted successfully",
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };

// // ================= UPDATE =================
// export const updateCategory =
//   async (req, res) => {
//     try {
//       const { name, slug, desc } =
//         req.body;

//       const category =
//         await Category.findById(
//           req.params.id
//         );

//       if (!category) {
//         return res.status(404).json({
//           message:
//             "Category not found",
//         });
//       }

//       // IMAGE UPDATE
//       if (req.file) {
//         const result =
//           await cloudinary.v2.uploader.upload(
//             req.file.path,
//             {
//               folder:
//                 "b2b-categories",
//             }
//           );

//         category.image =
//           result.secure_url;
//       }

//       category.name =
//         name || category.name;

//       category.slug =
//         slug || category.slug;

//       category.desc =
//         desc || category.desc;

//       await category.save();

//       res.status(200).json({
//         success: true,
//         message:
//           "Category updated successfully",
//         category,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };



import Category from "../models/Category.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";
import Product from "../models/product.model.js";

// ==========================
// CREATE CATEGORY
// ==========================
export const createCategory = async (req, res) => {
  try {
    const { name, slug, desc } = req.body;

    // IMAGE CHECK
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Category image is required",
      });
    }

    // ✅ BUFFER SE CLOUDINARY UPLOAD
    const result = await uploadToCloudinary(
      req.file.buffer,
      "b2b/categories"
    );

    // CREATE CATEGORY
    const category = await Category.create({
      name,
      slug,
      desc,
      image: result.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// GET ALL CATEGORIES
// ==========================
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).lean();

    // Har category ke liye product count add karo
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await Product.countDocuments({
          category: cat._id,
          status: "approved",
        });
        return { ...cat, productCount };
      })
    );

    res.status(200).json({
      success: true,
      categories: categoriesWithCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================
// DELETE CATEGORY
// ==========================
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// UPDATE CATEGORY
// ==========================
export const updateCategory = async (req, res) => {
  try {
    const { name, slug, desc } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // ✅ IMAGE UPDATE — buffer se
    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "b2b/categories"
      );
      category.image = result.secure_url;
    }

    category.name = name || category.name;
    category.slug = slug || category.slug;
    category.desc = desc || category.desc;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};