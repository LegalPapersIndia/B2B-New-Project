import express from "express";

import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";

import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/", createContact);

// ADMIN
router.get("/", adminAuthMiddleware, getAllContacts);

router.get("/:id", adminAuthMiddleware, getContactById);

router.put("/:id/status", adminAuthMiddleware, updateContactStatus);

router.delete("/:id", adminAuthMiddleware, deleteContact);

export default router;