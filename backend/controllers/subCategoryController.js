// controllers/subCategoryController.js

import SubCategory from "../models/subCategoryModel.js";
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
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      subCategories,
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