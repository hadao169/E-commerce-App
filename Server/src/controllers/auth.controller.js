import User from "../models/user.model.js";
import { errors } from "../utils/logger.js";
import { signupSchema } from "../utils/validator.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../config/jwt.js";
import { hashPassword } from "../utils/hashPassword.js";

// register new user
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // const { error } = signupSchema.safeParse(req.body);
    // if (error) {
    //   return res.status(400).json({ error: error.message });
    // }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    await User.create({
      email,
      username,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    errors("Error creating user:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// login user
export const login = async (req, res) => {
  try {
    // Because user is authenticated in passport, req.user is populated
    const user = req.user;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .header("Authorization", accessToken)
      .json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        accessToken,
        refreshToken,
      });
  } catch (error) {
    errors("Error logging in:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    const user = req.user;
    await User.findByIdAndUpdate(user._id, {
      tokenVersion: user.tokenVersion + 1,
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    errors("Error logging out:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// refresh token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token" });
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const newAccessToken = generateAccessToken(user);
    return res.status(200).json({
      accessToken: newAccessToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    errors("Error refreshing token:", error.message);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

// get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    errors("Error getting user info:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
