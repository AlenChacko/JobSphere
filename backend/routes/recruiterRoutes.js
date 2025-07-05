import express from "express";

import { upload } from "../middleware/multer.js";
import { protectRecruiter } from "../middleware/authMiddleware.js";
import {
  createJob,
  getRecruiterProfile,
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