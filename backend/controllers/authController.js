import handler from "express-async-handler";
import { Employee } from "../models/employeeModel.js";
import { Recruiter } from "../models/recruiterModel.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/utils.js";

export const registerEmployee = handler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Required fields are missing");
  }

  const isExisting = await Employee.findOne({ email });
  if (isExisting) {
    res.status(409);
    throw new Error("This email already registered");
  }

  const hashedPassword = await hashPassword(password);
  const newEmployee = await Employee.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (!newEmployee) {
    res.status(500);
    throw new Error("Employee registration failed");
  } else {
    const { password, ...employeeWithoutPassword } = newEmployee._doc;
    res
      .status(201)
      .json({
        message: "Employee registration success",
        ...employeeWithoutPassword,
        token: generateToken(
          { id: newEmployee._id },
          process.env.EMPLOYEE_JWT_SECRET
        ),
      });
  }
});

export const loginEmployee = handler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Required fields are missing");
  }

  const employee = await Employee.findOne({ email });

  if (!employee) {
    res.status(404);
    throw new Error("Account doesn't exist");
  }

  const matchPassword = await comparePassword(password, employee.password);

  if (matchPassword) {
    const { password, ...employeeData } = employee._doc;
    res.status(200).json({
      message: "Employee login success",
      ...employeeData,
      token: generateToken(
        { id: employee._id },
        process.env.EMPLOYEE_JWT_SECRET
      ),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

export const registerRecruiter = handler(async (req, res) => {
  const { companyName, email, password } = req.body;

  if (!companyName || !email || !password) {
    res.status(400);
    throw new Error("Required fields are missing");
  }

  const isExisting = await Recruiter.findOne({ email });
  if (isExisting) {
    res.status(409);
    throw new Error("This email already registered");
  }

  const hashedPassword = await hashPassword(password);
  const newRecruiter = await Recruiter.create({
    companyName,
    email,
    password: hashedPassword,
  });

  if (!newRecruiter) {
    res.status(500);
    throw new Error("Recruiter registration failed");
  } else {
    const { password, ...recruiterWithoutPassword } = newRecruiter._doc;
    res
      .status(201)
      .json({
        message: "Recruiter registration success",
        ...recruiterWithoutPassword,
        token: generateToken(
          { id: newRecruiter._id },
          process.env.RECRUITER_JWT_SECRET
        ),
      });
  }
});

export const loginRecruiter = handler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Required fields are missing");
  }

  const recruiter = await Recruiter.findOne({ email });

  if (!recruiter) {
    res.status(404);
    throw new Error("Account doesn't exist");
  }

  const matchPassword = await comparePassword(password, recruiter.password);

  if (matchPassword) {
    const { password, ...recruiterData } = recruiter._doc;
    res.status(200).json({
      message: "Employee login success",
      ...recruiterData,
      token: generateToken(
        { id: recruiter._id },
        process.env.RECRUITER_JWT_SECRET
      ),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

export const loginAdmin = handler(async (req, res) => {});
