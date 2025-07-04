import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Recruiter } from "../models/recruiterModel.js";

// 🔐 Middleware to protect recruiter routes
export const protectRecruiter = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is in Authorization header and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.RECRUITER_JWT_SECRET);

      // Get recruiter from DB and exclude password
      req.user = await Recruiter.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("Recruiter not found");
      }

      next();
    } catch (err) {
      console.error("Token verification failed:", err);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
