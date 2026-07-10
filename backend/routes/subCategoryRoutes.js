
// // backend/routes/subCategoryRoutes.js

// import express from "express";
// import upload from "../middleware/upload.js";
// import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js";

// import {
//   createSubCategory,
//   getSubCategories,
//   deleteSubCategory,
//   updateSubCategory,
// } from "../controllers/subCategoryController.js";

// const router = express.Router();

// // CREATE (Admin only)
// router.post(
//   "/create",
// checkPermission("subcategories"),
//   adminAuthMiddleware,
//   upload.single("image"),
//   createSubCategory
// );

// // GET ALL (Public)
// router.get("/", getSubCategories);

// // GET BY CATEGORY (Public)
// router.get("/category/:categoryId", getSubCategories);

// // DELETE (Admin only)
// router.delete("/:id", checkPermission("subcategories"), deleteSubCategory);
// // UPDATE (Admin only)
// router.put(
//   "/:id",
// checkPermission("subcategories"),
//   adminAuthMiddleware,
//   upload.single("image"),
//   updateSubCategory
// );

// export default router;



// backend/routes/subCategoryRoutes.js

import express from "express";
import upload from "../middleware/upload.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; // ✅ UPDATED

import {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

// CREATE (Admin + Manager-with-permission) ✅ UPDATED
router.post(
  "/create",
  
  checkPermission("subcategories"),
  upload.single("image"),
  createSubCategory
);

// GET ALL (Public) - unchanged
router.get("/", getSubCategories);

// GET BY CATEGORY (Public) - unchanged
router.get("/category/:categoryId", getSubCategories);

// DELETE (Admin + Manager-with-permission) ✅ UPDATED
router.delete("/:id", checkPermission("subcategories"), deleteSubCategory);

// UPDATE (Admin + Manager-with-permission) ✅ UPDATED
router.put(
  "/:id",
  checkPermission("subcategories"),
  upload.single("image"),
  updateSubCategory
);

export default router;