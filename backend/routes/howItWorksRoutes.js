// backend/routes/howItWorksRoutes.js
import express from "express";
import {
  getAllSteps,
  getAllStepsAdmin,
  createStep,
  updateStep,
  deleteStep,
} from "../controllers/howItWorks.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

// PUBLIC
router.get("/", getAllSteps);

// ADMIN
router.get("/admin/all", checkPermission("how-it-works"), getAllStepsAdmin); 
router.post("/", checkPermission("how-it-works"), createStep); 
router.put("/:id", checkPermission("how-it-works"), updateStep); 
router.delete("/:id", checkPermission("how-it-works"), deleteStep);

export default router;