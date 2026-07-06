

// import express from "express";
// import upload from "../middleware/upload.js";

// import {
//   createSubCategory,
//   getSubCategories,
//   deleteSubCategory,
//   updateSubCategory,
// } from "../controllers/subCategoryController.js";

// const router = express.Router();

// // CREATE
// router.post(
//   "/create",
//   upload.single("image"),
//   createSubCategory
// );

// // GET ALL
// router.get("/", getSubCategories);

// // ✅ GET BY CATEGORY (ADD THIS)
// router.get("/category/:categoryId", getSubCategories);

// // DELETE
// router.delete("/:id", deleteSubCategory);

// // UPDATE
// router.put(
//   "/:id",
//   upload.single("image"),
//   updateSubCategory
// );

// export default router;





// backend/routes/subCategoryRoutes.js

import express from "express";
import upload from "../middleware/upload.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

import {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

// CREATE (Admin only)
router.post(
  "/create",
  adminAuthMiddleware,
  upload.single("image"),
  createSubCategory
);

// GET ALL (Public)
router.get("/", getSubCategories);

// GET BY CATEGORY (Public)
router.get("/category/:categoryId", getSubCategories);

// DELETE (Admin only)
router.delete("/:id", adminAuthMiddleware, deleteSubCategory);

// UPDATE (Admin only)
router.put(
  "/:id",
  adminAuthMiddleware,
  upload.single("image"),
  updateSubCategory
);

export default router;