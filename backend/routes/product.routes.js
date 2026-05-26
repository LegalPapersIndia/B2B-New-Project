// routes/product.routes.js

import express from "express";
import {
  createProduct,
  getMyProducts,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  getAdminProducts,
    getProductsBySubCategory,
    getProductByIdAdmin,   
  deleteProductAdmin,
} from "../controllers/product.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ─────────────────────────────────────────
// ADMIN ROUTES — sabse pehle
// ─────────────────────────────────────────
router.get(
  "/admin/all",
  adminAuthMiddleware,
  getAdminProducts
);

// ─────────────────────────────────────────
// SELLER ROUTES
// ─────────────────────────────────────────
router.post(
  "/add",
  authMiddleware,
  upload.array("images", 5),
  createProduct
);

router.get(
  "/my-products",
  authMiddleware,
  getMyProducts
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProduct
);

// ─────────────────────────────────────────
// PUBLIC ROUTES — dynamic routes sabse neeche
// ─────────────────────────────────────────
router.get("/", getAllProducts);
router.get("/:slug", getSingleProduct);

router.get(
  "/subcategory/:subcategorySlug",
  getProductsBySubCategory
);

// Admin routes mein add karo
router.get(
  "/admin/product/:id",
  adminAuthMiddleware,
  getProductByIdAdmin
);

router.delete(
  "/admin/product/:id",
  adminAuthMiddleware,
  deleteProductAdmin
);

export default router;