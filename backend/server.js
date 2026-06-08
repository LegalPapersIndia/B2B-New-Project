
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// import connectDB from "./config/db.js";
// import cloudinaryConnect from "./config/cloudinary.js";

// import authRoutes from "./routes/authRoutes.js";
// import sellerRoutes from "./routes/sellerRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import subCategoryRoutes from "./routes/subCategoryRoutes.js";
// import productRoutes from "./routes/product.routes.js";
// import sellerAuthRoutes from "./routes/sellerAuthRoutes.js";

// import fs from "fs";

// if (!fs.existsSync("uploads")) {
//   fs.mkdirSync("uploads");
// } 
// dotenv.config();

// const app = express();


// // Database Connection
// connectDB();


// // Cloudinary Connection
// cloudinaryConnect();


// // Middleware
// // app.use(cors());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:5174",
//     ],
//     credentials: true,
//   })
// );
// app.use(express.json());


// // Test Route
// app.get("/", (req, res) => {
//   res.send("B2B Backend Running...");
// });


// // ================= ROUTES =================

// // Auth Routes
// app.use("/api/auth", authRoutes);

// // Seller Routes
// app.use("/api/seller", sellerRoutes);

// // Admin Routes
// app.use("/api/admin", adminRoutes);

// // Category Routes
// app.use("/api/categories", categoryRoutes);

// app.use(
//   "/api/subcategories",
//   subCategoryRoutes
// );

// app.use("/api/products", productRoutes);

// app.use("/api/seller", sellerAuthRoutes);
// // ================= SERVER =================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// app.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import cloudinaryConnect from "./config/cloudinary.js";

import cron from "node-cron";
import Seller from "./models/Seller.js";
import Product from "./models/product.model.js";

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import sellerAuthRoutes from "./routes/sellerAuthRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/product.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import requirementRoutes from "./routes/requirement.routes.js";
import sellerProfileRoutes from "./routes/sellerProfile.routes.js";
import cityRoutes from "./routes/city.routes.js";
import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blog.routes.js";
import careerRoutes from "./routes/career.routes.js";
import Plan from "./models/Plan.model.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import bulkUploadRouter from "./routes/admin/bulkUpload.js";
import marketplaceStatRoutes from "./routes/marketplaceStat.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import Notification from "./models/Notification.model.js"; 

dotenv.config();

const app = express();

// ─────────────────────────────────────────
// DATABASE + CLOUDINARY
// ─────────────────────────────────────────
connectDB();

// SEED PLANS
const seedPlans = async () => {
  try {
    const count = await Plan.countDocuments();
    if (count === 0) {
      await Plan.insertMany([
        { key: "basic",   amount: 999,  duration: 30 },
        { key: "premium", amount: 1999, duration: 30 },
        { key: "gold",    amount: 3999, duration: 30 },
      ]);
      console.log(" Plans seeded");
    }
  } catch (err) {
    console.error("Seed error:", err);
  }
};


mongoose.connection.once("open", () => {
  seedPlans();
});

cloudinaryConnect();

// ─────────────────────────────────────────
// CRON JOB — HAR RAAT 12 BAJE
// ─────────────────────────────────────────
cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();

    const expiredSellers = await Seller.find({
      subscriptionActive: true,
      subscriptionExpire: { $lt: now },
    });

    if (expiredSellers.length === 0) return;

    const expiredIds = expiredSellers.map((s) => s._id);

    await Seller.updateMany(
      { _id: { $in: expiredIds } },
      { $set: { subscriptionActive: false, subscriptionPlan: null } }
    );

    await Product.updateMany(
      { seller: { $in: expiredIds } },
      { $set: { status: "pending", featured: false } }
    );

    console.log(`✅ Cron: ${expiredSellers.length} sellers expired`);
  } catch (err) {
    console.error("Cron job error:", err);
  }
});



// ── NOTIFICATION CLEANUP — HAR RAAT 1 BAJE ──
cron.schedule("0 1 * * *", async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const deleted = await Notification.deleteMany({
      createdAt: { $lt: sevenDaysAgo },
    });

    console.log(`✅ Cleanup: ${deleted.deletedCount} old notifications deleted`);
  } catch (err) {
    console.error("Notification cleanup error:", err);
  }
});

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
        // Frontend
      // "https://b2-b-new-project-wexx.vercel.app",
      "https://b2-b-new-project.vercel.app",

      // Admin Panel
      "https://b2-b-new-project-4pru.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

// ─────────────────────────────────────────
// TEST ROUTE
// ─────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("B2B Backend Running...");
});

// ─────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────

// Auth (User/Admin login)
app.use("/api/admin/auth", adminAuthRoutes);
// Seller Auth (register/login)
app.use("/api/seller", sellerAuthRoutes);

// Admin
// app.use("/api/admin", adminRoutes);

// Category
app.use("/api/categories", categoryRoutes);

// SubCategory
app.use("/api/subcategories", subCategoryRoutes);

// Products
app.use("/api/products", productRoutes);

app.use("/api/subscription", subscriptionRoutes);

app.use("/api/leads", leadRoutes);

app.use("/api/requirements", requirementRoutes);

app.use("/api/seller/profile", sellerProfileRoutes);

app.use("/api/cities", cityRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/blogs", blogRoutes);

app.use("/api/careers", careerRoutes);

app.use("/api/testimonials", testimonialRoutes);

app.use("/api/admin", bulkUploadRouter);

app.use("/api/marketplace-stats", marketplaceStatRoutes);

app.use("/api/notifications", notificationRoutes);

// ─────────────────────────────────────────
// SERVER
// ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});