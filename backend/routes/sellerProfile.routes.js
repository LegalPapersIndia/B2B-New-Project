// routes/sellerProfile.routes.js

import express from "express";
import {
  getMyProfile,
  updateProfile,
  getFeaturedSellers,
  getSellerPublicProfile
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

router.get("/featured", getFeaturedSellers);
router.get("/public/:id", getSellerPublicProfile);

export default router;