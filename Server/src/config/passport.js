import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.model.js";
import { errors } from "../utils/logger.js";
import { comparePassword } from "../utils/hashPassword.js";
import env from "./env.js"; // Dùng export default nên KHÔNG cần destructure

// JWT Strategy configuration
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // Invalidate token if tokenVersion is outdated
      if (
        payload.tokenVersion !== undefined &&
        payload.tokenVersion < user.tokenVersion
      ) {
        return done(null, false, { message: "Token has been invalidated" });
      }

      return done(null, user);
    } catch (error) {
      errors("JWT authentication error:", error.message);
      return done(error, false);
    }
  })
);

// Local strategy: for email and password login
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid email or password" });
        }

        return done(null, user);
      } catch (error) {
        errors("Local authentication error:", error.message);
        return done(error);
      }
    }
  )
);

// Middleware to protect routes using JWT
export const authenticateJWT = passport.authenticate("jwt", { session: false });

// Middleware for login via email/password
export const authenticateLocal = passport.authenticate("local", {
  session: false,
});

export default passport;
