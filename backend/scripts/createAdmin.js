// scripts/createAdmin.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // CHECK IF ADMIN EXISTS
    const existing = await User.findOne({ role: "admin" });

    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // CREATE ADMIN
    const admin = await User.create({
      name:       "Super Admin",
      email:      "admin@b2b.com",
      phone:      "9999999999",
      password:   hashedPassword,
      role:       "admin",
      isVerified: true,
      isApproved: true,
    });

    console.log("✅ Admin created successfully!");
    console.log("Email:   ", admin.email);
    console.log("Password: admin123");

    process.exit(0);

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

createAdmin();