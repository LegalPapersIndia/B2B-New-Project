// backend/routes/contactPageRoutes.js
import express from "express";
import {
  getContactPage,
  updateContactPage,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/contactPage.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();

// PUBLIC
router.get("/", getContactPage);

// ADMIN
router.put("/",                     checkPermission("contact-page"), updateContactPage); 
router.post("/faqs",                checkPermission("contact-page"), addFaq); 
router.put("/faqs/:faqId",          checkPermission("contact-page"), updateFaq); 
router.delete("/faqs/:faqId",       checkPermission("contact-page"), deleteFaq); 

export default router;