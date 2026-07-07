// migratePlans.js
// Run once: node migratePlans.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Seller from "./models/Seller.js";
import Plan from "./models/Plan.model.js";

dotenv.config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // aapke .env mein jo variable name hai wahi use karo
    console.log("✅ DB Connected");

    // ─────────────────────────────────────────
    // STEP 1 — Plan collection migrate karo
    // ORDER IMPORTANT: upar se niche (gold pehle, taaki overwrite na ho)
    // ─────────────────────────────────────────
    const goldToDiamond = await Plan.updateOne(
      { key: "gold" },
      { $set: { key: "diamond" } }
    );
    console.log("Plan: gold → diamond:", goldToDiamond.modifiedCount);

    const premiumToGold = await Plan.updateOne(
      { key: "premium" },
      { $set: { key: "gold" } }
    );
    console.log("Plan: premium → gold:", premiumToGold.modifiedCount);

    const basicToSilver = await Plan.updateOne(
      { key: "basic" },
      { $set: { key: "silver" } }
    );
    console.log("Plan: basic → silver:", basicToSilver.modifiedCount);

    // ─────────────────────────────────────────
    // STEP 2 — Seller collection migrate karo
    // Same order — gold pehle
    // ─────────────────────────────────────────
    const sellersGoldToDiamond = await Seller.updateMany(
      { subscriptionPlan: "gold" },
      { $set: { subscriptionPlan: "diamond" } }
    );
    console.log("Sellers: gold → diamond:", sellersGoldToDiamond.modifiedCount);

    const sellersPremiumToGold = await Seller.updateMany(
      { subscriptionPlan: "premium" },
      { $set: { subscriptionPlan: "gold" } }
    );
    console.log("Sellers: premium → gold:", sellersPremiumToGold.modifiedCount);

    const sellersBasicToSilver = await Seller.updateMany(
      { subscriptionPlan: "basic" },
      { $set: { subscriptionPlan: "silver" } }
    );
    console.log("Sellers: basic → silver:", sellersBasicToSilver.modifiedCount);

    console.log("🎉 Migration complete!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
};

run();