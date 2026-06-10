// import express from "express";
// import multer from "multer";
// import {
//   getActiveJobs, applyJob,
//   adminGetJobs, adminCreateJob, adminUpdateJob, adminDeleteJob,
//   adminGetApplications, adminUpdateAppStatus,
// } from "../controllers/career.controller.js";
// import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js"; // 👈 apna middleware

// const router = express.Router();
// const upload = multer({ storage: multer.memoryStorage() });

// // PUBLIC
// router.get("/",            getActiveJobs);
// router.post("/:id/apply",  upload.single("resume"), applyJob);

// // ADMIN
// router.get("/admin/all",                          adminAuthMiddleware, adminGetJobs);
// router.post("/admin/create",                      adminAuthMiddleware, adminCreateJob);
// router.put("/admin/:id",                          adminAuthMiddleware, adminUpdateJob);
// router.delete("/admin/:id",                       adminAuthMiddleware, adminDeleteJob);
// router.get("/admin/:id/applications",             adminAuthMiddleware, adminGetApplications);
// router.patch("/admin/:jobId/applications/:appId", adminAuthMiddleware, adminUpdateAppStatus);

// export default router;


import express from "express";
import multer from "multer";
import {
  getActiveJobs, applyJob,
  adminGetJobs, adminCreateJob, adminUpdateJob, adminDeleteJob,
  adminGetApplications, adminUpdateAppStatus,
} from "../controllers/career.controller.js";
import adminAuthMiddleware, { hrAuthMiddleware } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC
router.get("/",            getActiveJobs);
router.post("/:id/apply",  upload.single("resume"), applyJob);

// ADMIN + HR DONO ACCESS KAR SAKTE HAIN
router.get("/admin/all",                          hrAuthMiddleware, adminGetJobs);    
router.post("/admin/create",                      hrAuthMiddleware, adminCreateJob);      
router.put("/admin/:id",                          hrAuthMiddleware, adminUpdateJob);      
router.delete("/admin/:id",                       hrAuthMiddleware, adminDeleteJob);      
router.get("/admin/:id/applications",             hrAuthMiddleware, adminGetApplications); 
router.patch("/admin/:jobId/applications/:appId", hrAuthMiddleware, adminUpdateAppStatus); 

export default router;