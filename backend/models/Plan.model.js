// models/Plan.model.js
import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  key:      { type: String, required: true, unique: true },
  amount:   { type: Number, required: true },
  duration: { type: Number, required: true, default: 30 },
}, { timestamps: true });

export default mongoose.model("Plan", planSchema);