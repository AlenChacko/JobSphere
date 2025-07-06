import cloudinary from "../utils/cloudinary.js";
import handler from 'express-async-handler'
import { Recruiter } from "../models/recruiterModel.js";
import { Job } from "../models/jobModel.js";


export const getRecruiterProfile = handler(async (req, res) => {
 const recruiter = await Recruiter.findById(req.user._id).select("-password");
  
  if (!recruiter) {
    res.status(404);
    throw new Error("Recruiter not found");
  }

  res.status(200).json(recruiter);
});

export const updateRecruiterProfile = handler(async (req, res) => {
  const recruiterId = req.user._id; // Auth middleware should attach this
  const recruiter = await Recruiter.findById(recruiterId);

  if (!recruiter) {
    res.status(404);
    throw new Error("Recruiter not found");
  }

  // Handle company logo update
  if (req.file) {
    // Delete old logo from Cloudinary
    if (recruiter.companyLogo) {
      const publicId = recruiter.companyLogo
        .split("/")
        .pop()
        .split(".")[0]; // Extract publicId

      await cloudinary.uploader.destroy(`JobSphere/companyLogos/${publicId}`);
    }

    // Upload new logo to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "JobSphere/companyLogos",
      width: 300,
      crop: "scale",
    });

    recruiter.companyLogo = result.secure_url;
  }

  // Update fields
  recruiter.companyName = req.body.companyName || recruiter.companyName;
  recruiter.recruiterName = req.body.recruiterName || recruiter.recruiterName;
  recruiter.phone = req.body.phone || recruiter.phone;
  recruiter.industry = req.body.industry || recruiter.industry;
  recruiter.aboutCompany = req.body.aboutCompany || recruiter.aboutCompany;
  recruiter.companySize = req.body.companySize || recruiter.companySize;

  recruiter.location = {
    country: req.body.country || recruiter.location?.country || "",
    state: req.body.state || recruiter.location?.state || "",
    city: req.body.city || recruiter.location?.city || "",
  };

  recruiter.links = {
    linkedIn: req.body.linkedIn || recruiter.links?.linkedIn || "",
    website: req.body.website || recruiter.links?.website || "",
    twitter: req.body.twitter || recruiter.links?.twitter || "",
  };

  const updatedRecruiter = await recruiter.save();

  res.status(200).json(updatedRecruiter);
});


export const createJob = handler(async (req, res) => {
  const recruiterId = req.user._id;

  const {
    title,
    company,
    location,
    jobType,
    experienceLevel,
    salaryRange,
    skillsRequired,
    description,
    openings,
    deadline,
  } = req.body;

  // Basic validations
  if (!title || !company || !location || !jobType || !experienceLevel || !description) {
    res.status(400);
    throw new Error("Please fill in all required fields.");
  }

  const job = new Job({
    recruiter: recruiterId,
    title,
    company,
    location,
    jobType,
    experienceLevel,
    salaryRange,
    skillsRequired: Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired.split(",").map((skill) => skill.trim()),
    description,
    openings: openings || 1,
    deadline,
  });

  const createdJob = await job.save();
  res.status(201).json(createdJob);
});

export const getRecruiterJobs = handler(async (req, res) => {
  const recruiterId = req.user._id;

  const jobs = await Job.find({ recruiter: recruiterId }).sort({ createdAt: -1 });

  res.status(200).json(jobs);
});

export const deleteJob = handler(async (req, res) => {
  const recruiterId = req.user._id;
  const jobId = req.params.jobId;

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  if (job.recruiter.toString() !== recruiterId.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this job");
  }

  await job.deleteOne();
  res.status(200).json({ message: "Job deleted successfully" });
});