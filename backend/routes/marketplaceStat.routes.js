import express from "express";
import {
  getAllStats,
  createStat,
  updateStat,
  deleteStat,
} from "../controllers/marketplaceStat.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC — frontend fetch karega
router.get("/", getAllStats);

// PROTECTED — sirf admin
router.post("/", adminAuthMiddleware, createStat);
router.put("/:id", adminAuthMiddleware, updateStat);
router.delete("/:id", adminAuthMiddleware, deleteStat);

export default router;