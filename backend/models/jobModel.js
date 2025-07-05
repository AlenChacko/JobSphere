import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Mid-Level", "Senior", "Manager"],
      required: true,
    },
    salaryRange: { type: String },
    skillsRequired: [String],
    description: { type: String, required: true },
    openings: { type: Number, default: 1 },
    deadline: { type: Date },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
