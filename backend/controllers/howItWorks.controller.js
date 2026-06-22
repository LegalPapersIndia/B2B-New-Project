// backend/controllers/howItWorks.controller.js
import HowItWorks from "../models/HowItWorks.js";

// GET ALL (Public)
export const getAllSteps = async (req, res) => {
  try {
    const steps = await HowItWorks.find({ isActive: true }).sort({ order: 1 });
    res.json(steps);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL (Admin)
export const getAllStepsAdmin = async (req, res) => {
  try {
    const steps = await HowItWorks.find().sort({ order: 1 });
    res.json(steps);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
export const createStep = async (req, res) => {
  try {
    const step = new HowItWorks(req.body);
    await step.save();
    res.status(201).json(step);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const updateStep = async (req, res) => {
  try {
    const step = await HowItWorks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(step);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
export const deleteStep = async (req, res) => {
  try {
    await HowItWorks.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};