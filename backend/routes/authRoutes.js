import express from "express";

import {
  registerEmployee,
  loginEmployee,
  registerRecruiter,
  loginRecruiter,
  loginAdmin,
} from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/register-employee", registerEmployee);
authRouter.post("/login-employee", loginEmployee);
authRouter.post("/register-recruiter", registerRecruiter);
authRouter.post("/login-recruiter", loginRecruiter);
authRouter.post("/login-admin", loginAdmin);
