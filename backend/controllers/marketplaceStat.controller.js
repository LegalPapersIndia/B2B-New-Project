import MarketplaceStat from "../models/marketplaceStat.model.js";

// GET ALL
export const getAllStats = async (req, res) => {
  try {
    const stats = await MarketplaceStat.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE
export const createStat = async (req, res) => {
  try {
    const { icon, number, label, order } = req.body;
    const stat = await MarketplaceStat.create({ icon, number, label, order });
    res.status(201).json({ success: true, data: stat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
export const updateStat = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MarketplaceStat.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ success: false, message: "Stat not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE
export const deleteStat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MarketplaceStat.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Stat not found" });
    res.status(200).json({ success: true, message: "Stat deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};