import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER SELLER
export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // CHECK EXISTING SELLER
    const existingSeller = await Seller.findOne({ email });

    if (existingSeller) {
      return res.status(400).json({
        success: false,
        message: "Seller already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE SELLER
    const seller = await Seller.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN SELLER
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND SELLER
    const seller = await Seller.findOne({ email });

    if (!seller) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // TOKEN
    const token = jwt.sign(
      { id: seller._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      seller,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSellers = async (req, res) => {
  try {

    const sellers = await Seller.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      sellers,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};