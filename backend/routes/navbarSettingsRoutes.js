// backend/routes/navbarSettingsRoutes.js
import express from "express";
import {
  getNavbarSettings,
  updateNavbarSettings,
} from "../controllers/navbarSettings.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getNavbarSettings);

// ADMIN
router.put("/", adminAuthMiddleware, updateNavbarSettings);

export default router;