// models/City.js
import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name:     { type: String, required: true },
  slug:     { type: String, required: true, unique: true },
  image:    {
    url:       { type: String, default: "" },
    public_id: { type: String, default: "" },
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("City", citySchema);