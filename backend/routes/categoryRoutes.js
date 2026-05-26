import express from "express";

import {
  createCategory,
  getCategories,
    deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// ==========================
// CREATE CATEGORY
// ==========================
router.post(
  "/create",
  upload.single("image"),
  createCategory
);

// UPDATE
router.put(
  "/:id",
  upload.single("image"),
  updateCategory
);

// DELETE
router.delete(
  "/:id",
  deleteCategory
);

// ==========================
// GET ALL CATEGORIES
// ==========================
router.get("/", getCategories);

export default router;