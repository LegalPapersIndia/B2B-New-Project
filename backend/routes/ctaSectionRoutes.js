// backend/routes/ctaSectionRoutes.js
import express from "express";
import { getCTA, updateCTA } from "../controllers/ctaSection.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

// PUBLIC
router.get("/", getCTA);

// ADMIN
// ADMIN
router.put("/", checkPermission("cta-section"), updateCTA); 

export default router;