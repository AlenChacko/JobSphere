import cloudinary from "../utils/cloudinary.js";
import handler from 'express-async-handler'
import { Recruiter } from "../models/recruiterModel.js";


export const getRecruiterProfile = handler(async (req, res) => {
 const recruiter = await Recruiter.findById(req.user._id).select("-password");
  
  if (!recruiter) {
    res.status(404);
    throw new Error("Recruiter not found");
  }

  res.status(200).json(recruiter);
});