import mongoose from "mongoose";

const marketplaceStatSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MarketplaceStat", marketplaceStatSchema);