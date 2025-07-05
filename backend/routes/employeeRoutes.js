import express from "express";

import { upload } from "../middleware/multer.js";
import { protectEmployee } from "../middleware/authMiddleware.js";
import {
  getEmployeeProfile,
  updateEmployeeProfile,
} from "../controllers/employeeController.js";

export const employeeRouter = express.Router();

employeeRouter.get("/profile", protectEmployee, getEmployeeProfile);

employeeRouter.patch(
  "/update-profile",
  protectEmployee,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateEmployeeProfile
);
