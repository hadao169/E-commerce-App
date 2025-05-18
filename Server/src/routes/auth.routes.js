import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { authenticateJWT, authenticateLocal } from "../config/passport.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", authenticateLocal, login);
router.post("/logout", authenticateJWT, logout);
router.post("/refresh-token", refreshToken);
router.get("/user", authenticateJWT, getCurrentUser);

export default router;
