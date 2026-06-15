// controllers/product.controller.js

import Product from "../models/product.model.js";
import Seller from "../models/Seller.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";
import slugify from "slugify";
import SubCategory from "../models/subCategoryModel.js";
import mongoose from "mongoose";
import Notification from "../models/Notification.model.js";
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
       keyFeatures,
    } = req.body;

    // VALIDATION
    if (!title || !description || !category || !subcategory || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // IMAGE CHECK
   const isBulkUpload = req.body.bulkUpload === "true";
if (!isBulkUpload && (!req.files || req.files.length === 0)) {
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

// ✅ REAL-TIME EXPIRE CHECK
const now = new Date();
if (seller.subscriptionExpire && seller.subscriptionExpire < now) {
  seller.subscriptionActive = false;
  seller.subscriptionPlan = null;
  await seller.save();
}

const productStatus = seller.subscriptionActive
  ? "approved"
  : "pending";

      const isFeatured = ["gold", "premium"].includes(
  seller.subscriptionPlan
);

    // CLOUDINARY UPLOAD
  const images = [];
if (req.files && req.files.length > 0) {
  const uploadedImages = await Promise.all(
    req.files.map((file) =>
      uploadToCloudinary(file.buffer, "b2b/products")
    )
  );
  uploadedImages.forEach((result) => {
    images.push({ url: result.secure_url, public_id: result.public_id });
  });
}
    // UNIQUE SLUG
    const baseSlug = slugify(title, { lower: true, strict: true });
    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    // CREATE PRODUCT
    const product = await Product.create({
      title,
      slug: uniqueSlug,
      shortDesc,
      description,
       keyFeatures: keyFeatures || "",
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

    await Notification.create({
  type: "new_product",
  message: `New product added: ${title}`,
  data: { productId: product._id, title, sellerId: req.user._id },
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



export const getAllProducts = async (req, res) => {
  try {
    const { search, city, state, category, subcategory } = req.query;

    // ─── CITY/STATE SE SELLERS DHUNDO ───
    let sellerIds = null;
    if (city || state) {
      const sellerQuery = {};
      if (city)  sellerQuery.city  = { $regex: city.trim(),  $options: "i" };
      if (state) sellerQuery.state = { $regex: state.trim(), $options: "i" };
      const sellers = await Seller.find(sellerQuery).select("_id");
      sellerIds = sellers.map(s => s._id);
    }

    let products = [];

    if (search) {
      // ─── ATLAS SEARCH — FUZZY ───
      const pipeline = [
        {
          $search: {
            index: "product_search",
            text: {
              query: search,
              path: ["title", "brand", "shortDesc", "description"],
              fuzzy: {
                maxEdits: 1,       // 1 letter galat ho tab bhi milega
                prefixLength: 2,   // pehle 2 letters sahi hone chahiye
              },
            },
          },
        },

        // ─── FILTERS ───
        {
          $match: {
            status: "approved",
            isActive: true,
            ...(category    && { category:    new mongoose.Types.ObjectId(category) }),
            ...(subcategory && { subcategory: new mongoose.Types.ObjectId(subcategory) }),
            ...(sellerIds   && { seller: { $in: sellerIds } }),
          },
        },

        // ─── SCORE SE SORT — best match pehle ───
        { $sort: { score: { $meta: "searchScore" }, createdAt: -1 } },

        // ─── POPULATE ───
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category",    preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: "subcategories",
            localField: "subcategory",
            foreignField: "_id",
            as: "subcategory",
          },
        },
       { $unwind: { path: "$subcategory", preserveNullAndEmptyArrays: true } },

        {
          $lookup: {
            from: "sellers",
            localField: "seller",
            foreignField: "_id",
            as: "seller",
          },
        },
       { $unwind: { path: "$seller",      preserveNullAndEmptyArrays: true } },

        // ─── SIRF ZARURI FIELDS ───
        {
          $project: {
            title: 1, slug: 1, brand: 1, shortDesc: 1,
            price: 1, moq: 1, unit: 1, images: 1,
            status: 1, isActive: 1, createdAt: 1,
            score: { $meta: "searchScore" },
            "category.name":    1, "category.slug":    1,
            "subcategory.name": 1, "subcategory.slug": 1,
            "seller.name": 1, "seller.companyName": 1,
            "seller.city": 1, "seller.state":       1,
            "seller.companyWebsite":  1,
            "seller.subscriptionPlan": 1,
          },
        },
      ];

      products = await Product.aggregate(pipeline);

    } else {
      // ─── SEARCH NAHI HAI — NORMAL FILTER ───
      const filter = { status: "approved", isActive: true };
      if (category)    filter.category    = category;
      if (subcategory) filter.subcategory = subcategory;
      if (sellerIds)   filter.seller      = { $in: sellerIds };

      products = await Product.find(filter)
        .populate("category",    "name slug")
        .populate("subcategory", "name slug")
        .populate("seller", "name companyName city state companyWebsite subscriptionPlan")
        .sort({ createdAt: -1 });
    }

    return res.status(200).json({
      success: true,
      count:   products.length,
      products,
    });

  } catch (error) {
    console.error("getAllProducts error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch products" });
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


export const getFeaturedProducts = async (req, res) => {
  try {
    const activeSellers = await Seller.find({
      subscriptionActive: true,
      subscriptionPlan: "gold",
      accountStatus: "active",
    }).select("_id");

    const sellerIds = activeSellers.map(s => s._id);

    const products = await Product.find({
      status: "approved",
      isActive: true,
      seller: { $in: sellerIds },
    })
      .populate("seller", "name companyName companyWebsite city state subscriptionPlan")
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json({ success: true, products });

  } catch (error) {
    console.error("getFeaturedProducts error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch featured products" });
  }
};

// Neeche ye function add karo
export const getProductsByCity = async (req, res) => {
  try {
    const { citySlug } = req.params;

    const cityName = citySlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const sellers = await Seller.find({
      city: { $regex: new RegExp(`^${cityName}$`, "i") },
    }).select("_id");

    if (!sellers.length) {
      return res.status(200).json({ success: true, products: [], total: 0 });
    }

    const sellerIds = sellers.map((s) => s._id);

    const products = await Product.find({
      seller: { $in: sellerIds },
      status: "approved",
      isActive: true,
    })
      .populate("seller", "companyName city state companyWebsite")
      .populate("category", "name slug")
      .populate("subcategory", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, products, total: products.length });
  } catch (error) {
    console.error("getProductsByCity error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id:    req.params.id,
      seller: req.user._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      title,
      shortDesc,
      description,
      keyFeatures,
      category,
      subcategory,
      price,
      moq,
      unit,
      brand,
      stock,
      removeImages,
    } = req.body;

    if (title)       product.title       = title;
    if (shortDesc)   product.shortDesc   = shortDesc;
    if (description) product.description = description;
    if (keyFeatures !== undefined) product.keyFeatures = keyFeatures;
    if (category)    product.category    = category;
    if (subcategory) product.subcategory = subcategory;
    if (price)       product.price       = price;
    if (moq)         product.moq         = moq;
    if (unit)        product.unit        = unit;
    if (brand !== undefined) product.brand = brand;
    if (stock !== undefined) product.stock = stock;

    if (title) {
      const baseSlug  = slugify(title, { lower: true, strict: true });
      product.slug    = `${baseSlug}-${Date.now()}`;
    }

    if (removeImages) {
      const toRemove = JSON.parse(removeImages);
      await Promise.all(toRemove.map((pid) => deleteFromCloudinary(pid)));
      product.images = product.images.filter(
        (img) => !toRemove.includes(img.public_id)
      );
    }

    if (req.files && req.files.length > 0) {
      const uploaded = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer, "b2b/products"))
      );
      const newImages = uploaded.map((r) => ({
        url:       r.secure_url,
        public_id: r.public_id,
      }));
      product.images = [...product.images, ...newImages];
    }

    await product.save();

    await product.populate([
      { path: "category", select: "name slug" },
      { path: "subcategory", select: "name slug" },
    ]);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",  
      product,
    });

  } catch (error) {
    console.error("updateProduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Product update failed",
    });
  }
};



// ─────────────────────────────────────────
// GET PRODUCTS BY SELLER (Public)
// ─────────────────────────────────────────
export const getProductsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const products = await Product.find({
      seller:   sellerId,
      status:   "approved",
      isActive: true,
    })
      .populate("category",    "name slug")
      .populate("subcategory", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success:  true,
      count:    products.length,
      products,
    });

  } catch (error) {
    console.error("getProductsBySeller error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch seller products",
    });
  }
};