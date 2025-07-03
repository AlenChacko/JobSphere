import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const generateToken = (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

export const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};