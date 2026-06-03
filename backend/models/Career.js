import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  coverLetter: { type: String },
  resume:      { url: String, public_id: String },
  status:      { type: String, enum: ["pending", "reviewed", "shortlisted", "rejected"], default: "pending" },
  appliedAt:   { type: Date, default: Date.now },
});

const careerSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  department:   { type: String, required: true },
  location:     { type: String, required: true },
  type:         { type: String, enum: ["Full-time", "Part-time", "Remote", "Internship"], required: true },
  experience:   { type: String, required: true },
  salary:       { type: String },
  description:  { type: String, required: true },
  requirements: [{ type: String }],
  isActive:     { type: Boolean, default: true },
  applications: [applicationSchema],
}, { timestamps: true });

export default mongoose.model("Career", careerSchema);