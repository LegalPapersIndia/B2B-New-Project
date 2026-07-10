// backend/routes/footerSettingsRoutes.js
import express from "express";
import {
  getFooterSettings,
  updateFooterSettings,
} from "../controllers/footerSettings.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getFooterSettings);

// ADMIN
router.put("/", checkPermission("footer-settings"), updateFooterSettings); 

export default router;