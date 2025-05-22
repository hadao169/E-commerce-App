import jwt from "jsonwebtoken";
import { errors } from "../utils/logger.js";
import env from "./env.js";

/**
 * Generate access token for a user
 * @param {Object} user - User data to include in token
 * @returns {string} JWT token
 */
export const generateAccessToken = (user) => {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    username: user.username,
    role: user.role || "user",
    tokenVersion: user.tokenVersion || 0,
  };

  try {
    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    errors("Error generating access token:", error.message);
    throw new Error("Failed to generate access token");
  }
};

/**
 * Generate refresh token for a user
 * @param {Object} user - User data
 * @returns {string} Refresh token
 */
export const generateRefreshToken = (user) => {
  const payload = {
    id: user._id || user.id,
    tokenVersion: user.tokenVersion || 0,
  };

  try {
    const token = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    errors("Error generating refresh token:", error.message);
    throw new Error("Failed to generate refresh token");
  }
};

/**
 * Verify access token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    errors("Token verification failed:", error.message);
    return null;
  }
};

/**
 * Verify refresh token
 * @param {string} token - Refresh token to verify
 * @returns {Object|null} Decoded token payload or null
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
  } catch (error) {
    errors("Refresh token verification failed:", error.message);
    return null;
  }
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
