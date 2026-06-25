// backend/routes/ctaSectionRoutes.js
import express from "express";
import { getCTA, updateCTA } from "../controllers/ctaSection.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getCTA);

// ADMIN
router.put("/", adminAuthMiddleware, updateCTA);

export default router;