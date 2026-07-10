// backend/routes/navbarSettingsRoutes.js
import express from "express";
import {
  getNavbarSettings,
  updateNavbarSettings,
} from "../controllers/navbarSettings.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; // ✅ UPDATED

const router = express.Router();

// PUBLIC
router.get("/", getNavbarSettings);

// ADMIN
router.put("/", checkPermission("navbar"), updateNavbarSettings); 

export default router;