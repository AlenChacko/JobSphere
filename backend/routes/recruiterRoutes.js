import express from 'express'

import { upload } from '../middleware/multer.js'
import { getRecruiterById, updateRecruiterProfile } from '../controllers/recruiterController.js'
import { protectRecruiter } from '../middleware/authMiddleware.js';

export const recruiterRouter = express.Router()

recruiterRouter.put(
  "/update-profile",
  protectRecruiter,
  upload.single("companyLogo"),
  updateRecruiterProfile
);

recruiterRouter.get("/:id", protectRecruiter, getRecruiterById);
