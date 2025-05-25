import express from "express";
import {
  register,
  login,
  googleLogin,
  logout,
  refreshToken,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import {
  authenticateJWT,
  authenticateLocal,
  authenticateGoogleStart,
  authenticateGoogleCallback,
} from "../config/passport.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", authenticateLocal, login);
router.post("/logout", authenticateJWT, logout);
router.post("/refresh-token", refreshToken);
router.get("/user", authenticateJWT, getCurrentUser);

// Google OAuth
router.get("/google", authenticateGoogleStart);
router.get("/oauth2/redirect/google", authenticateGoogleCallback, googleLogin);

export default router;
