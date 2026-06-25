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
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload  = multer({ storage });

// PUBLIC
router.get("/",       getHeroSlides);

// ADMIN
router.get("/admin",            adminAuthMiddleware, getHeroSlidesAdmin);
router.post("/",                adminAuthMiddleware, upload.single("image"), createHeroSlide);
router.put("/:id",              adminAuthMiddleware, upload.single("image"), updateHeroSlide);
router.delete("/:id",           adminAuthMiddleware, deleteHeroSlide);

export default router;