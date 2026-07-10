// backend/routes/heroSlideRoutes.js
import express from "express";
import multer from "multer";
import {
  getHeroSlides,
  getHeroSlidesAdmin,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "../controllers/heroSlide.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

const storage = multer.memoryStorage();
const upload  = multer({ storage });

// PUBLIC
router.get("/",       getHeroSlides);

// ADMIN
router.get("/admin",            checkPermission("hero-slides"), getHeroSlidesAdmin); 
router.post("/",                checkPermission("hero-slides"), upload.single("image"), createHeroSlide); 
router.put("/:id",              checkPermission("hero-slides"), upload.single("image"), updateHeroSlide); 
router.delete("/:id",           checkPermission("hero-slides"), deleteHeroSlide); // ✅ UPDATED

export default router;