// // routes/lead.routes.js

// import express from "express";
// import {
//   createLead,
//   getMyLeads,
//   updateLeadStatus,
  
// } from "../controllers/lead.controller.js";

// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// // ─────────────────────────────────────────
// // PUBLIC — Buyer inquiry bheje
// // ─────────────────────────────────────────
// router.post("/create", createLead);

// // ─────────────────────────────────────────
// // SELLER — Apni leads dekhe
// // ─────────────────────────────────────────
// router.get("/my-leads", authMiddleware, getMyLeads);

// // ─────────────────────────────────────────
// // SELLER — Lead status update kare
// // ─────────────────────────────────────────
// router.patch("/:id/status", authMiddleware, updateLeadStatus);

// export default router;



// routes/lead.routes.js

import express from "express";
import {
  createLead,
  getMyLeads,
  updateLeadStatus,
  getAllLeads,        
    deleteLead,              
  deleteMultipleLeads, 
  deleteLeadAdmin, deleteMultipleLeadsAdmin
} from "../controllers/lead.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";  // ⬅️ ADD KARO

const router = express.Router();

// ─────────────────────────────────────────
// PUBLIC — Buyer inquiry bheje
// ─────────────────────────────────────────
router.post("/create", createLead);

// ─────────────────────────────────────────
// SELLER — Apni leads dekhe
// ─────────────────────────────────────────
router.get("/my-leads", authMiddleware, getMyLeads);

// ─────────────────────────────────────────
// SELLER — Lead status update kare
// ─────────────────────────────────────────
router.patch("/:id/status", authMiddleware, updateLeadStatus);

// ─────────────────────────────────────────
// ADMIN — Saari leads dekhe
// ─────────────────────────────────────────
router.get("/admin/all", adminAuthMiddleware, getAllLeads); 

// Single delete
router.delete("/:id", authMiddleware, deleteLead);

// Multiple delete
router.post("/delete-multiple", authMiddleware, deleteMultipleLeads);

router.delete("/admin/:id", adminAuthMiddleware, deleteLeadAdmin);
router.post("/admin/delete-multiple", adminAuthMiddleware, deleteMultipleLeadsAdmin);

export default router;