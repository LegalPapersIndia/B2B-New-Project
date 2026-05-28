// routes/sellerProfile.routes.js

import express from "express";
import {
  getMyProfile,
  updateProfile,
} from "../controllers/sellerProfile.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET PROFILE
router.get("/", authMiddleware, getMyProfile);

// UPDATE PROFILE
router.put(
  "/update",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

export default router;