import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Recruiter } from "../models/recruiterModel.js";
import { Employee } from "../models/employeeModel.js";

// 🔐 Middleware to protect recruiter routes
export const protectRecruiter = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token using RECRUITER_JWT_SECRET
      const decoded = jwt.verify(token, process.env.RECRUITER_JWT_SECRET);

      // Optional: log decoded payload to debug
      // console.log("Decoded JWT:", decoded); // should contain { id: ... }

      // Find recruiter by decoded.id and exclude password
      const recruiter = await Recruiter.findById(decoded.id).select("-password");

      if (!recruiter) {
        res.status(401);
        throw new Error("Recruiter not found");
      }

      req.user = recruiter;
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401);
      throw new Error("Not authorized, token invalid or expired");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }
});


export const protectEmployee = asyncHandler(async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token using EMPLOYEE_JWT_SECRET
      const decoded = jwt.verify(token, process.env.EMPLOYEE_JWT_SECRET);

      // Find employee by decoded.id and exclude password
      const employee = await Employee.findById(decoded.id).select("-password");

      if (!employee) {
        res.status(401);
        throw new Error("Employee not found");
      }

      req.user = employee;
      next();
    } catch (error) {
      console.error("Token verification failed:", error.message);
      res.status(401);
      throw new Error("Not authorized, token invalid or expired");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, token missing");
  }
});