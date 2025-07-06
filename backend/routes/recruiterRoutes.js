import express from "express";

import { upload } from "../middleware/multer.js";
import { protectRecruiter } from "../middleware/authMiddleware.js";
import {
  createJob,
  deleteJob,
  getJobById,
  getRecruiterJobs,
  getRecruiterProfile,
  updateJob,
  updateRecruiterProfile,
} from "../controllers/recruiterController.js";

export const recruiterRouter = express.Router();

recruiterRouter.get("/profile", protectRecruiter, getRecruiterProfile);
recruiterRouter.patch(
  "/update-profile",
  protectRecruiter,
  upload.single("companyLogo"),
  updateRecruiterProfile
);



recruiterRouter.post("/create-job", protectRecruiter, createJob);

recruiterRouter.get("/view-jobs", protectRecruiter, getRecruiterJobs);
recruiterRouter.delete("/delete-job/:jobId", protectRecruiter, deleteJob);
recruiterRouter.get("/get-job/:id", protectRecruiter, getJobById);
recruiterRouter.put("/update-job/:id", protectRecruiter, updateJob);