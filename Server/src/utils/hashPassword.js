import bcrypt from "bcrypt";
import { errors } from "./logger.js";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    errors("Error hashing password:", error.message);
    throw new Error("Failed to hash password");
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
