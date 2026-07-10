import express from "express";
import multer from "multer";
import {
  createBlog, getAllBlogs, getAllBlogsAdmin,
  getSingleBlog, updateBlog, deleteBlog
} from "../controllers/blog.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// PUBLIC
router.get("/",           getAllBlogs);
router.get("/:slug",      getSingleBlog);

// ADMIN
router.get("/admin/all",                        checkPermission("blogs"), getAllBlogsAdmin); 
router.post("/",          upload.single("image"), checkPermission("blogs"), createBlog); 
router.put("/:id",        upload.single("image"), checkPermission("blogs"), updateBlog); 
router.delete("/:id",                            checkPermission("blogs"), deleteBlog); 

export default router;