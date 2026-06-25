// backend/routes/footerSettingsRoutes.js
import express from "express";
import {
  getFooterSettings,
  updateFooterSettings,
} from "../controllers/footerSettings.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getFooterSettings);

// ADMIN
router.put("/", adminAuthMiddleware, updateFooterSettings);

export default router;