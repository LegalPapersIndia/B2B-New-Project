// backend/routes/contactPageRoutes.js
import express from "express";
import {
  getContactPage,
  updateContactPage,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../controllers/contactPage.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getContactPage);

// ADMIN
router.put("/",                     adminAuthMiddleware, updateContactPage);
router.post("/faqs",                adminAuthMiddleware, addFaq);
router.put("/faqs/:faqId",          adminAuthMiddleware, updateFaq);
router.delete("/faqs/:faqId",       adminAuthMiddleware, deleteFaq);

export default router;