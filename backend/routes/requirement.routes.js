// routes/requirement.routes.js

import express from "express";
import {
  postRequirement,
  getMyRequirements,
  getAllRequirements,
    deleteRequirement,            
  deleteMultipleRequirements,
  deleteRequirementAdmin, 
  deleteMultipleRequirementsAdmin,
   updateRequirementStatus, 
    postRequirementBySeller,
  getMyPostedRequirements,
} from "../controllers/requirement.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

// PUBLIC — Buyer requirement post kare
router.post("/post", postRequirement);

// SELLER — Apni matched requirements dekhe
router.get("/my-requirements", authMiddleware, getMyRequirements);

// ADMIN — Saari requirements
router.get("/admin/all", checkPermission("leads"), getAllRequirements);

// Single delete
router.delete("/:id", authMiddleware, deleteRequirement);

// Multiple delete
router.post("/delete-multiple", authMiddleware, deleteMultipleRequirements);

router.delete("/admin/:id", checkPermission("leads"), deleteRequirementAdmin);
router.post("/admin/delete-multiple", checkPermission("leads"), deleteMultipleRequirementsAdmin);

// SELLER — Status update
router.put("/:id/status", authMiddleware, updateRequirementStatus);

// SELLER — Khud requirement post kare (buyer bankar)
router.post("/seller/post", authMiddleware, postRequirementBySeller);

// SELLER — Apni khud post ki hui requirements dekhe
router.get("/seller/my-posted", authMiddleware, getMyPostedRequirements);

export default router;