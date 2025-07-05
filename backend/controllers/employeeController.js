import cloudinary from "../utils/cloudinary.js";
import handler from "express-async-handler";
import { Employee } from "../models/employeeModel.js";
import fs from "fs";

export const getEmployeeProfile = handler(async (req, res) => {
  const employee = await Employee.findById(req.user._id).select("-password");

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  res.status(200).json(employee);
});

export const updateEmployeeProfile = handler(async (req, res) => {
  const employeeId = req.user._id;
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // ✅ Handle Profile Image
  if (req.files?.profileImage?.[0]) {
    const file = req.files.profileImage[0];

    if (employee.profileImage) {
      const publicId = employee.profileImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`JobSphere/employeeImages/${publicId}`);
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "JobSphere/employeeImages",
      width: 300,
      crop: "scale",
    });

    employee.profileImage = result.secure_url;
    fs.unlinkSync(file.path);
  }

  // ✅ Handle Resume PDF
  if (req.files?.resume?.[0]) {
    const resumeFile = req.files.resume[0];

    // Delete old resume from Cloudinary
    if (employee.resume?.publicId) {
      await cloudinary.uploader.destroy(employee.resume.publicId);
    }

    // Upload new resume PDF to Cloudinary
    const result = await cloudinary.uploader.upload(resumeFile.path, {
      folder: "JobSphere/employeeResumes",
      resource_type: "raw", // PDF file
    });

    employee.resume = {
      url: result.secure_url,
      publicId: result.public_id,
    };

    fs.unlinkSync(resumeFile.path);
  }

  // ✅ Update basic info
  employee.firstName = req.body.firstName || employee.firstName;
  employee.lastName = req.body.lastName || employee.lastName;
  employee.phone = req.body.phone || employee.phone;
  employee.designation = req.body.designation || employee.designation;

  // ✅ Update About Me
  employee.aboutMe = req.body.aboutMe || employee.aboutMe || "";

  // ✅ Location
  employee.employeeInfo.location = {
    country: req.body.country || employee.employeeInfo?.location?.country || "",
    state: req.body.state || employee.employeeInfo?.location?.state || "",
    city: req.body.city || employee.employeeInfo?.location?.city || "",
  };

  // ✅ Experience (expecting JSON string array of objects)
  if (req.body.experience) {
    try {
      employee.employeeInfo.experience = JSON.parse(req.body.experience);
    } catch (err) {
      res.status(400);
      throw new Error("Invalid experience format. Must be JSON.");
    }
  }

  // ✅ Current Role (expecting JSON string)
  if (req.body.currentRole) {
    try {
      employee.employeeInfo.currentRole = JSON.parse(req.body.currentRole);
    } catch (err) {
      res.status(400);
      throw new Error("Invalid current role format. Must be JSON.");
    }
  }

  // ✅ Education (expecting JSON string array of objects)
  if (req.body.education) {
    try {
      employee.employeeInfo.education = JSON.parse(req.body.education);
    } catch (err) {
      res.status(400);
      throw new Error("Invalid education format. Must be JSON.");
    }
  }

  // ✅ Skills
  if (req.body.skills) {
    if (Array.isArray(req.body.skills)) {
      employee.employeeInfo.skills = req.body.skills;
    } else {
      employee.employeeInfo.skills = req.body.skills.split(",").map((s) => s.trim());
    }
  }

  // ✅ Links
  employee.links = {
    github: req.body.github || employee.links?.github || "",
    linkedIn: req.body.linkedIn || employee.links?.linkedIn || "",
    portfolio: req.body.portfolio || employee.links?.portfolio || "",
  };

  const updated = await employee.save();
  res.status(200).json(updated);
});
