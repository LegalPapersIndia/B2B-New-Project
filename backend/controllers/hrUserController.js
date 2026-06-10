import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET ALL HR USERS
export const getHRUsers = async (req, res) => {
  try {
    const hrUsers = await User.find({ role: "hr" }).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, hrUsers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE HR USER
export const createHRUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   const hrUser = await User.create({
  name,
  email,
  phone: `hr_${Date.now()}`, // unique placeholder
  password: hashedPassword,
  role: "hr",
});

    res.status(201).json({
      success: true,
      message: "HR user created successfully",
      hrUser: { _id: hrUser._id, name: hrUser.name, email: hrUser.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE HR USER
export const deleteHRUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== "hr") {
      return res.status(404).json({ success: false, message: "HR user not found" });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: "HR user deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};