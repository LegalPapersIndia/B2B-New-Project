// routes/testimonial.routes.js
import express from "express";
import multer from "multer";
import {
  getTestimonials,
  adminGetTestimonials,
  adminCreateTestimonial,
  adminUpdateTestimonial,
  adminDeleteTestimonial,
} from "../controllers/testimonial.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC
router.get("/", getTestimonials);

// ADMIN
router.get("/admin/all",     adminAuthMiddleware, adminGetTestimonials);
router.post("/admin/create", adminAuthMiddleware, upload.single("image"), adminCreateTestimonial);
router.put("/admin/:id",     adminAuthMiddleware, upload.single("image"), adminUpdateTestimonial);
router.delete("/admin/:id",  adminAuthMiddleware, adminDeleteTestimonial);

export default router;