import cloudinary from "../utils/cloudinary.js";
import handler from 'express-async-handler'
import { Recruiter } from "../models/recruiterModel.js";

// 🔹 Helper to extract public_id from URL
const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  return `JobSphere/companyLogo/${fileName.split(".")[0]}`;
};

export const updateRecruiterProfile = async (req, res) => {
  try {
    const recruiterId = req.user._id;
    const recruiter = await Recruiter.findById(recruiterId);

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    // If file is uploaded
    if (req.file) {
      // Delete old logo if exists
      if (recruiter.companyLogo) {
        const public_id = getPublicIdFromUrl(recruiter.companyLogo);
        await cloudinary.uploader.destroy(public_id);
      }

      // Upload new logo
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "JobSphere/companyLogo",
        resource_type: "image",
      });

      recruiter.companyLogo = result.secure_url;
    }

    // Update other fields (name, phone, etc.)
    const fieldsToUpdate = [
      "companyName",
      "recruiterName",
      "industry",
      "aboutCompany",
      "phone",
      "designation",
      "location",
      "links",
    ];

   fieldsToUpdate.forEach((field) => {
  if (req.body[field]) {
    if (["location", "links"].includes(field)) {
      try {
        recruiter[field] = JSON.parse(req.body[field]); // Parse string to object
      } catch (err) {
        console.error(`Failed to parse ${field}:`, err.message);
      }
    } else {
      recruiter[field] = req.body[field];
    }
  }
});


    await recruiter.save();

    res.status(200).json({
      message: "Profile updated successfully",
      recruiter,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getRecruiterById = handler(async (req, res) => {
  const recruiter = await Recruiter.findById(req.params.id);
  if (!recruiter) {
    res.status(404);
    throw new Error("Recruiter not found");
  }
  res.status(200).json({ recruiter });
});
