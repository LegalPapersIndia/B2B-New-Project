import express from "express";
import {
  getAllStats,
  createStat,
  updateStat,
  deleteStat,
} from "../controllers/marketplaceStat.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

// PUBLIC — frontend fetch karega
router.get("/", getAllStats);

// PROTECTED — sirf admin
router.post("/", checkPermission("marketplace-stats"), createStat); 
router.put("/:id", checkPermission("marketplace-stats"), updateStat); 
router.delete("/:id", checkPermission("marketplace-stats"), deleteStat); 

export default router;