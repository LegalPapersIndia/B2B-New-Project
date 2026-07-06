// import express from "express";

// import {
//   createCategory,
//   getCategories,
//     deleteCategory,
//   updateCategory,
// } from "../controllers/categoryController.js";

// import upload from "../middleware/upload.js";

// const router = express.Router();

// // ==========================
// // CREATE CATEGORY
// // ==========================
// router.post(
//   "/create",
//   upload.single("image"),
//   createCategory
// );

// // UPDATE
// router.put(
//   "/:id",
//   upload.single("image"),
//   updateCategory
// );

// // DELETE
// router.delete(
//   "/:id",
//   deleteCategory
// );

// // ==========================
// // GET ALL CATEGORIES
// // ==========================
// router.get("/", getCategories);

// export default router;


import express from "express";

import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

import upload from "../middleware/upload.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js"; // ✅ NEW

const router = express.Router();

// ==========================
// CREATE CATEGORY (Admin only) ✅ UPDATED
// ==========================
router.post(
  "/create",
  adminAuthMiddleware,
  upload.single("image"),
  createCategory
);

// UPDATE (Admin only) ✅ UPDATED
router.put(
  "/:id",
  adminAuthMiddleware,
  upload.single("image"),
  updateCategory
);

// DELETE (Admin only) ✅ UPDATED
router.delete(
  "/:id",
  adminAuthMiddleware,
  deleteCategory
);

// ==========================
// GET ALL CATEGORIES (Public) - unchanged
// ==========================
router.get("/", getCategories);

export default router;