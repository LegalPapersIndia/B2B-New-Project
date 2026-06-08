import express from "express";
import { getNotifications, markAllRead } from "../controllers/notification.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.get("/",         adminAuthMiddleware, getNotifications);
router.patch("/read",   adminAuthMiddleware, markAllRead);

export default router;