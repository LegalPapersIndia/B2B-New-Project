import express from "express";
import multer from "multer";
import {
  getActiveJobs, applyJob,
  adminGetJobs, adminCreateJob, adminUpdateJob, adminDeleteJob,
  adminGetApplications, adminUpdateAppStatus,
} from "../controllers/career.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js"; // 👈 apna middleware

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC
router.get("/",            getActiveJobs);
router.post("/:id/apply",  upload.single("resume"), applyJob);

// ADMIN
router.get("/admin/all",                          adminAuthMiddleware, adminGetJobs);
router.post("/admin/create",                      adminAuthMiddleware, adminCreateJob);
router.put("/admin/:id",                          adminAuthMiddleware, adminUpdateJob);
router.delete("/admin/:id",                       adminAuthMiddleware, adminDeleteJob);
router.get("/admin/:id/applications",             adminAuthMiddleware, adminGetApplications);
router.patch("/admin/:jobId/applications/:appId", adminAuthMiddleware, adminUpdateAppStatus);

export default router;