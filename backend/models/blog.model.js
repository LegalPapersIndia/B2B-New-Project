// models/blog.model.js
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  excerpt:     { type: String, required: true },
  content:     { type: String, required: true },
  category:    { type: String, required: true },
  author:      { type: String, required: true },
  readTime:    { type: String },
  image: {
    url:        { type: String },
    public_id:  { type: String },
  },
  isPublished: { type: Boolean, default: false },
  slug:        { type: String, unique: true },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);