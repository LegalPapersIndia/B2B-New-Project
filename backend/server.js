
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

import connectDB from "./config/db.js";
import cloudinaryConnect from "./config/cloudinary.js";

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

dotenv.config();

const app = express();

// ─────────────────────────────────────────
// DATABASE + CLOUDINARY
// ─────────────────────────────────────────
connectDB();
cloudinaryConnect();

// ─────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
        // Frontend
      "https://b2-b-new-project-wexx.vercel.app",
      "https://b2-b-new-project.vercel.app",

      // Admin Panel
      "https://b2-b-new-project-eah9.vercel.app",
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

// ─────────────────────────────────────────
// SERVER
// ─────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});