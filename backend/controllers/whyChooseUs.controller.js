// backend/controllers/whyChooseUs.controller.js
import WhyChooseUs from "../models/WhyChooseUs.js";

// GET ALL (Public)
export const getAllFeatures = async (req, res) => {
  try {
    const features = await WhyChooseUs.find({ isActive: true }).sort({ order: 1 });
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL (Admin)
export const getAllFeaturesAdmin = async (req, res) => {
  try {
    const features = await WhyChooseUs.find().sort({ order: 1 });
    res.json(features);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
export const createFeature = async (req, res) => {
  try {
    const feature = new WhyChooseUs(req.body);
    await feature.save();
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE
export const updateFeature = async (req, res) => {
  try {
    const feature = await WhyChooseUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(feature);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
export const deleteFeature = async (req, res) => {
  try {
    await WhyChooseUs.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};