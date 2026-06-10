import express from "express";
import { getHRUsers, createHRUser, deleteHRUser } from "../controllers/hrUserController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.get("/",          adminAuthMiddleware, getHRUsers);
router.post("/",         adminAuthMiddleware, createHRUser);
router.delete("/:id",    adminAuthMiddleware, deleteHRUser);

export default router;