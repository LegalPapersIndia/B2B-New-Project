// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();


// // Middleware
// app.use(cors());
// app.use(express.json());


// // Test Route
// app.get("/", (req, res) => {
//   res.send("B2B Backend Running...");
// });

// app.use("/api/auth", authRoutes);

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));


// // Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import cloudinaryConnect from "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();


// Database Connection
connectDB();


// Cloudinary Connection
cloudinaryConnect();


// Middleware
app.use(cors());
app.use(express.json());


// Test Route
app.get("/", (req, res) => {
  res.send("B2B Backend Running...");
});


// Routes
app.use("/api/auth", authRoutes);


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});