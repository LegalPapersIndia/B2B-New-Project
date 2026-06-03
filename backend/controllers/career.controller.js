import Career from "../models/Career.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";

// ── PUBLIC: GET ALL ACTIVE JOBS ──
export const getActiveJobs = async (req, res) => {
  try {
    const jobs = await Career.find({ isActive: true })
      .select("-applications")
      .sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── PUBLIC: APPLY FOR JOB ──
export const applyJob = async (req, res) => {
  try {
    const { name, email, phone, coverLetter } = req.body;
    const job = await Career.findById(req.params.id);

    if (!job || !job.isActive)
      return res.status(404).json({ success: false, message: "Job not found" });

    // RESUME UPLOAD
    let resume = {};
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "b2b/resumes", "raw");
      resume = { url: result.secure_url, public_id: result.public_id };
    }

    job.applications.push({ name, email, phone, coverLetter, resume });
    await job.save();

    res.json({ success: true, message: "Application submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ADMIN: GET ALL JOBS ──
export const adminGetJobs = async (req, res) => {
  try {
    const jobs = await Career.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ADMIN: CREATE JOB ──
export const adminCreateJob = async (req, res) => {
  try {
    const { title, department, location, type, experience, salary, description, requirements } = req.body;
    const job = await Career.create({
      title, department, location, type, experience, salary, description,
      requirements: requirements ? JSON.parse(requirements) : [],
    });
    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ADMIN: UPDATE JOB ──
export const adminUpdateJob = async (req, res) => {
  try {
    const { title, department, location, type, experience, salary, description, requirements, isActive } = req.body;
    const job = await Career.findByIdAndUpdate(
      req.params.id,
      { title, department, location, type, experience, salary, description,
        requirements: requirements ? JSON.parse(requirements) : [],
        isActive },
      { new: true }
    );
    res.json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ADMIN: DELETE JOB ──
export const adminDeleteJob = async (req, res) => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ADMIN: GET APPLICATIONS ──
export const adminGetApplications = async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, applications: job.applications, jobTitle: job.title });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ── ADMIN: UPDATE APPLICATION STATUS ──
export const adminUpdateAppStatus = async (req, res) => {
  try {
    const job = await Career.findById(req.params.jobId);
    const app = job.applications.id(req.params.appId);
    if (!app) return res.status(404).json({ success: false, message: "Application not found" });
    app.status = req.body.status;
    await job.save();
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};