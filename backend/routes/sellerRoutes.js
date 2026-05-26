import express from "express";
import { updateSellerProfile } from "../controllers/sellerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/profile", authMiddleware, updateSellerProfile);

export default router;