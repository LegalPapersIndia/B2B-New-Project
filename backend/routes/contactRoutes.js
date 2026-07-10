import express from "express";

import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; // ✅ UPDATED

const router = express.Router();

// PUBLIC
router.post("/", createContact);

// ADMIN
// ADMIN
router.get("/", checkPermission("contacts"), getAllContacts); 

router.get("/:id", checkPermission("contacts"), getContactById); 

router.put("/:id/status", checkPermission("contacts"), updateContactStatus); 

router.delete("/:id", checkPermission("contacts"), deleteContact);

export default router;