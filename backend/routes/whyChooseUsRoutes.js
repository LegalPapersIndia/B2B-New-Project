// backend/routes/whyChooseUsRoutes.js
import express from "express";
import {
  getAllFeatures,
  getAllFeaturesAdmin,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../controllers/whyChooseUs.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllFeatures);

// ADMIN
router.get("/admin/all", adminAuthMiddleware, getAllFeaturesAdmin);
router.post("/", adminAuthMiddleware, createFeature);
router.put("/:id", adminAuthMiddleware, updateFeature);
router.delete("/:id", adminAuthMiddleware, deleteFeature);

export default router;