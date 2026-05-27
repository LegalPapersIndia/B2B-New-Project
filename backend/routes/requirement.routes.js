// routes/requirement.routes.js

import express from "express";
import {
  postRequirement,
  getMyRequirements,
  getAllRequirements,
} from "../controllers/requirement.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC — Buyer requirement post kare
router.post("/post", postRequirement);

// SELLER — Apni matched requirements dekhe
router.get("/my-requirements", authMiddleware, getMyRequirements);

// ADMIN — Saari requirements
router.get("/admin/all", adminAuthMiddleware, getAllRequirements);

export default router;