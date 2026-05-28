// controllers/product.controller.js

import Product from "../models/product.model.js";
import Seller from "../models/Seller.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";
import slugify from "slugify";
import SubCategory from "../models/subCategoryModel.js";
// ─────────────────────────────────────────
// CREATE PRODUCT (Seller)
// ─────────────────────────────────────────
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      shortDesc,
      description,
      category,
      subcategory,
      price,
      moq,
      unit,
      brand,
      stock,
    } = req.body;

    // VALIDATION
    if (!title || !description || !category || !subcategory || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // IMAGE CHECK
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least 1 image is required",
      });
    }

    // ─────────────────────────────────────────
    // SUBSCRIPTION CHECK
    // subscriptionActive = true  → approved
    // subscriptionActive = false → pending
    // ─────────────────────────────────────────
    const seller = await Seller.findById(req.user._id);

    const productStatus = seller.subscriptionActive
      ? "approved"
      : "pending";

      const isFeatured = ["gold", "premium"].includes(
  seller.subscriptionPlan
);

    // CLOUDINARY UPLOAD
    const uploadedImages = await Promise.all(
      req.files.map((file) =>
        uploadToCloudinary(file.buffer, "b2b/products")
      )
    );

    // FORMAT IMAGES
    const images = uploadedImages.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    // UNIQUE SLUG
    const baseSlug = slugify(title, { lower: true, strict: true });
    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    // CREATE PRODUCT
    const product = await Product.create({
      title,
      slug: uniqueSlug,
      shortDesc,
      description,
      category,
      subcategory,
      price,
      moq:   moq   || 1,
      unit:  unit  || "Piece",
      brand,
      stock: stock || 0,
      images,
      seller: req.user._id,
      status: productStatus,
      featured: isFeatured,
    });

    return res.status(201).json({
      success: true,
      message:
        productStatus === "approved"
          ? "Product published successfully! 🎉"
          : "Product added. It will go live after subscription activation.",
      product,
    });

  } catch (error) {
    console.error("createProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Product creation failed",
    });
  }
};

// ─────────────────────────────────────────
// GET MY PRODUCTS (Seller)
// ─────────────────────────────────────────
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id })
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.error("getMyProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// ─────────────────────────────────────────
// DELETE PRODUCT (Seller)
// ─────────────────────────────────────────
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      seller: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // CLOUDINARY SE DELETE
    await Promise.all(
      product.images.map((img) =>
        deleteFromCloudinary(img.public_id)
      )
    );

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("deleteProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

// ─────────────────────────────────────────
// GET ALL APPROVED PRODUCTS (Public)
// ─────────────────────────────────────────
export const getAllProducts = async (req, res) => {
  try {
    const { category, subcategory, minPrice, maxPrice, search } = req.query;

    const filter = {
      status: "approved",
      isActive: true,
    };

    if (category)    filter.category    = category;
    if (subcategory) filter.subcategory = subcategory;
    if (search)      filter.title       = { $regex: search, $options: "i" };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .populate("seller", "name companyName city state companyWebsite")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.error("getAllProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// ─────────────────────────────────────────
// GET SINGLE PRODUCT (Public)
// ─────────────────────────────────────────
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "approved",
      isActive: true,
    })
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .populate("seller", "name email companyName city state companyWebsite")

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("getSingleProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// ─────────────────────────────────────────
// GET ALL PRODUCTS — ADMIN
// ─────────────────────────────────────────
export const getAdminProducts = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status && status !== "all") filter.status = status;

    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("seller", "name email subscriptionActive")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    console.error("getAdminProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};



// ─────────────────────────────────────────
// GET PRODUCTS BY SUBCATEGORY SLUG (Public)
// ─────────────────────────────────────────
export const getProductsBySubCategory = async (req, res) => {
  try {
    const { subcategorySlug } = req.params;

    // ✅ Dynamic import HATA DO — upar se already import ho raha hai
    const subCategory = await SubCategory.findOne({
      slug: subcategorySlug,
    });

    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    const products = await Product.find({
      subcategory: subCategory._id,
      status:      "approved",
      isActive:    true,
    })
      .populate("category",    "name slug")
      .populate("subcategory", "name slug")
     
      .populate("seller", "name companyName city state companyWebsite")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success:     true,
      count:       products.length,
      subCategory,
      products,
    });

  } catch (error) {
    console.error("getProductsBySubCategory error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// ─────────────────────────────────────────
// GET SINGLE PRODUCT BY ID (Admin)
// ─────────────────────────────────────────
export const getProductByIdAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category",    "name slug")
      .populate("subcategory", "name slug")
      .populate("seller",      "name email subscriptionActive accountStatus");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("getProductByIdAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// ─────────────────────────────────────────
// DELETE PRODUCT (Admin)
// ─────────────────────────────────────────
export const deleteProductAdmin = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // CLOUDINARY SE DELETE
    await Promise.all(
      product.images.map((img) =>
        deleteFromCloudinary(img.public_id)
      )
    );

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("deleteProductAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};


// ─────────────────────────────────────────
// GET FEATURED PRODUCTS (Public)
// Premium/Gold sellers ke products
// ─────────────────────────────────────────
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      status:   "approved",
      featured: true,
      isActive: true,
    })
      .populate("category",    "name slug")
      .populate("subcategory", "name slug")
      .populate("seller",      "name companyName companyWebsite city state subscriptionPlan")
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {
    console.error("getFeaturedProducts error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch featured products",
    });
  }
};