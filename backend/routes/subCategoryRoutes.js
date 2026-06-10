

import express from "express";
import upload from "../middleware/upload.js";

import {
  createSubCategory,
  getSubCategories,
  deleteSubCategory,
  updateSubCategory,
} from "../controllers/subCategoryController.js";

const router = express.Router();

// CREATE
router.post(
  "/create",
  upload.single("image"),
  createSubCategory
);

// GET ALL
router.get("/", getSubCategories);

// ✅ GET BY CATEGORY (ADD THIS)
router.get("/category/:categoryId", getSubCategories);

// DELETE
router.delete("/:id", deleteSubCategory);

// UPDATE
router.put(
  "/:id",
  upload.single("image"),
  updateSubCategory
);

export default router;