// routes/managerRoutes.js

import express from "express";
import {
  getManagerUsers,
  createManagerUser,
  updateManagerPermissions,
  deleteManagerUser,
  getMyPermissions,
} from "../controllers/managerController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

//  Sirf Admin ye sab kar sakta hai (adminAuthMiddleware already role === "admin" hi allow karta hai)
router.get("/", adminAuthMiddleware, getManagerUsers);
router.post("/create", adminAuthMiddleware, createManagerUser);
router.put("/:id/permissions", adminAuthMiddleware, updateManagerPermissions);
router.delete("/:id", adminAuthMiddleware, deleteManagerUser);
router.get("/me", getMyPermissions);

export default router;