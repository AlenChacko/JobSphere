import mongoose from "mongoose";

const recruiterSchema = mongoose.Schema(
  {
    companyName: { type: String, trim: true, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    role: { type: String, default: "recruiter" },

    recruiterName: { type: String, trim: true },
    companyLogo: { type: String, trim: true },
    industry: { type: String, trim: true },
    aboutCompany: { type: String, trim: true },

    phone: { type: String, trim: true, unique: true },
    designation: { type: String, trim: true },
    location: {
      country: { type: String, trim: true },
      state: { type: String, trim: true },
      city: { type: String, trim: true },
    },

    links: {
      linkedIn: { type: String, trim: true },
      website: { type: String, trim: true },
      twitter: { type: String, trim: true },
    },

    profileImage: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

export const Recruiter = mongoose.model("Recruiter", recruiterSchema);
