import User from "../models/user.model.js";
import { errors } from "../utils/logger.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../config/jwt.js";
import { hashPassword } from "../utils/hashPassword.js";
import env from "../config/env.js";

// register new user
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    errors("Error creating user:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// login user
export const login = async (req, res) => {
  try {
    const user = req.user;

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .header("Authorization", `Bearer ${accessToken}`)
      .json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        accessToken,
      });
  } catch (error) {
    errors("Error logging in:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// google login
export const googleLogin = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .header("Authorization", `Bearer ${accessToken}`);

    const redirectUrl = new URL(env.CLIENT_URL);
    redirectUrl.searchParams.set("token", accessToken);
    return res.redirect(redirectUrl.toString());
  } catch (error) {
    errors("Google login error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    const user = req.user;
    await User.findByIdAndUpdate(user._id, {
      tokenVersion: user.tokenVersion + 1,
    });

    res.clearCookie("refreshToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    errors("Error logging out:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// refresh token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const newAccessToken = generateAccessToken(user);
    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    errors("Error refreshing token:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

// get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    errors("Error getting user info:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
