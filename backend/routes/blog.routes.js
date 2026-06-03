import express from "express";
import multer from "multer";
import {
  createBlog, getAllBlogs, getAllBlogsAdmin,
  getSingleBlog, updateBlog, deleteBlog
} from "../controllers/blog.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC
router.get("/",           getAllBlogs);
router.get("/:slug",      getSingleBlog);

// ADMIN
router.get("/admin/all",                        adminAuthMiddleware, getAllBlogsAdmin);
router.post("/",          upload.single("image"), adminAuthMiddleware, createBlog);
router.put("/:id",        upload.single("image"), adminAuthMiddleware, updateBlog);
router.delete("/:id",                            adminAuthMiddleware, deleteBlog);

export default router;