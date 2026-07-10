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
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC
router.get("/", getTestimonials);

// ADMIN
router.get("/admin/all",     checkPermission("testimonials"), adminGetTestimonials); 
router.post("/admin/create", checkPermission("testimonials"), upload.single("image"), adminCreateTestimonial); 
router.put("/admin/:id",     checkPermission("testimonials"), upload.single("image"), adminUpdateTestimonial); 
router.delete("/admin/:id",  checkPermission("testimonials"), adminDeleteTestimonial); 

export default router;