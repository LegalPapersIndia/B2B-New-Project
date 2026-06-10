// // routes/product.routes.js

// import express from "express";
// import {
//   createProduct,
//   getMyProducts,
//   deleteProduct,
//   getAllProducts,
//   getSingleProduct,
//   getAdminProducts,
//     getProductsBySubCategory,
//     getProductByIdAdmin,   
//   deleteProductAdmin,
//     getFeaturedProducts,
//      getProductsByCity, 
// } from "../controllers/product.controller.js";

// import authMiddleware from "../middleware/authMiddleware.js";
// import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// // ─────────────────────────────────────────
// // ADMIN ROUTES — sabse pehle
// // ─────────────────────────────────────────
// router.get(
//   "/admin/all",
//   adminAuthMiddleware,
//   getAdminProducts
// );
// router.get("/featured", getFeaturedProducts);
// // ─────────────────────────────────────────
// // SELLER ROUTES
// // ─────────────────────────────────────────
// router.post(
//   "/add",
//   authMiddleware,
//   upload.array("images", 5),
//   createProduct
// );

// router.get(
//   "/my-products",
//   authMiddleware,
//   getMyProducts
// );

// router.delete(
//   "/:id",
//   authMiddleware,
//   deleteProduct
// );

// // ─────────────────────────────────────────
// // PUBLIC ROUTES — dynamic routes sabse neeche
// // ─────────────────────────────────────────
// router.get("/", getAllProducts);
// // router.get("/:slug", getSingleProduct);
// router.get(
//   "/city/:citySlug",
//   getProductsByCity
// );

// router.get(
//   "/subcategory/:subcategorySlug",
//   getProductsBySubCategory
// );

// // Admin routes mein add karo
// router.get(
//   "/admin/product/:id",
//   adminAuthMiddleware,
//   getProductByIdAdmin
// );

// router.delete(
//   "/admin/product/:id",
//   adminAuthMiddleware,
//   deleteProductAdmin
// );


// router.get("/:slug", getSingleProduct);

// export default router;




// routes/product.routes.js

import express from "express";
import {
  createProduct,
  getMyProducts,
  deleteProduct,
  updateProduct,        // ← NEW
  getAllProducts,
  getSingleProduct,
  getAdminProducts,
  getProductsBySubCategory,
  getProductByIdAdmin,
  deleteProductAdmin,
  getFeaturedProducts,
  getProductsByCity,
   getProductsBySeller,
} from "../controllers/product.controller.js";

import authMiddleware      from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import upload              from "../middleware/upload.js";

const router = express.Router();

// ─────────────────────────────────────────
// ADMIN ROUTES — sabse pehle
// ─────────────────────────────────────────
router.get("/admin/all",        adminAuthMiddleware, getAdminProducts);
router.get("/featured",         getFeaturedProducts);

// ─────────────────────────────────────────
// SELLER ROUTES
// ─────────────────────────────────────────
router.post(
  "/add",
  authMiddleware,
  upload.array("images", 5),
  createProduct
);

router.get("/my-products", authMiddleware, getMyProducts);

// UPDATE PRODUCT ← NEW
router.put(
  "/:id",
  authMiddleware,
  upload.array("images", 5),
  updateProduct
);

router.delete("/:id", authMiddleware, deleteProduct);

// ─────────────────────────────────────────
// PUBLIC ROUTES — dynamic routes sabse neeche
// ─────────────────────────────────────────
router.get("/",                              getAllProducts);
router.get("/city/:citySlug",               getProductsByCity);
router.get("/subcategory/:subcategorySlug", getProductsBySubCategory);

// ADMIN ROUTES
router.get("/admin/product/:id",    adminAuthMiddleware, getProductByIdAdmin);
router.delete("/admin/product/:id", adminAuthMiddleware, deleteProductAdmin);

router.get("/:slug", getSingleProduct);

router.get("/seller/:sellerId", getProductsBySeller);

export default router;