// backend/routes/whyChooseUsRoutes.js
import express from "express";
import {
  getAllFeatures,
  getAllFeaturesAdmin,
  createFeature,
  updateFeature,
  deleteFeature,
} from "../controllers/whyChooseUs.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

// PUBLIC
router.get("/", getAllFeatures);

// ADMIN
router.get("/admin/all", checkPermission("why-choose-us"), getAllFeaturesAdmin); 
router.post("/", checkPermission("why-choose-us"), createFeature);
router.put("/:id", checkPermission("why-choose-us"), updateFeature); 
router.delete("/:id", checkPermission("why-choose-us"), deleteFeature); 

export default router;