// backend/routes/howItWorksRoutes.js
import express from "express";
import {
  getAllSteps,
  getAllStepsAdmin,
  createStep,
  updateStep,
  deleteStep,
} from "../controllers/howItWorks.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllSteps);

// ADMIN
router.get("/admin/all", adminAuthMiddleware, getAllStepsAdmin);
router.post("/", adminAuthMiddleware, createStep);
router.put("/:id", adminAuthMiddleware, updateStep);
router.delete("/:id", adminAuthMiddleware, deleteStep);

export default router;