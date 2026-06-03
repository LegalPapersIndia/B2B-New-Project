import Blog from "../models/blog.model.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";
import slugify from "slugify";

// ─────────────────────────────────────────
// CREATE BLOG (Admin)
// ─────────────────────────────────────────
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, category, author, readTime, isPublished } = req.body;

    let image = {};
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "b2b/blogs");
      image = { url: result.secure_url, public_id: result.public_id };
    }

    const slug = slugify(title, { lower: true, strict: true });

    const blog = await Blog.create({
      title, excerpt, content, category, author, readTime, isPublished, image, slug
    });

    return res.status(201).json({ success: true, blog });
  } catch (err) {
    console.error("createBlog error:", err);
    return res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};

// ─────────────────────────────────────────
// GET ALL BLOGS (Public)
// ─────────────────────────────────────────
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

// ─────────────────────────────────────────
// GET ALL BLOGS ADMIN (Admin - published + drafts)
// ─────────────────────────────────────────
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

// ─────────────────────────────────────────
// GET SINGLE BLOG (Public - by slug)
// ─────────────────────────────────────────
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    return res.status(200).json({ success: true, blog });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};

// ─────────────────────────────────────────
// UPDATE BLOG (Admin)
// ─────────────────────────────────────────
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    const { title, excerpt, content, category, author, readTime, isPublished } = req.body;

    if (req.file) {
      if (blog.image?.public_id) await deleteFromCloudinary(blog.image.public_id);
      const result = await uploadToCloudinary(req.file.buffer, "b2b/blogs");
      blog.image = { url: result.secure_url, public_id: result.public_id };
    }

    blog.title       = title       ?? blog.title;
    blog.excerpt     = excerpt     ?? blog.excerpt;
    blog.content     = content     ?? blog.content;
    blog.category    = category    ?? blog.category;
    blog.author      = author      ?? blog.author;
    blog.readTime    = readTime    ?? blog.readTime;
    blog.isPublished = isPublished !== undefined ? isPublished : blog.isPublished;
    if (title) blog.slug = slugify(title, { lower: true, strict: true });

    await blog.save();
    return res.status(200).json({ success: true, blog });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update blog" });
  }
};

// ─────────────────────────────────────────
// DELETE BLOG (Admin)
// ─────────────────────────────────────────
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    if (blog.image?.public_id) await deleteFromCloudinary(blog.image.public_id);
    await blog.deleteOne();

    return res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};