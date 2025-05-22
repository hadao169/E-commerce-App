import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { errors } from "../utils/logger.js";
import { comparePassword } from "../utils/hashPassword.js";

dotenv.config();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Configure JWT Bearer Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Find the user by id from JWT payload
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // Check if token was issued before user's tokenVersion was incremented
      // This allows token invalidation when user logs out or changes password
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

// Configure Local Strategy (username/password auth)
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
        console.error("Local authentication error:", error.message);
        return done(error);
      }
    }
  )
);

// Middleware to authenticate with JWT Bearer token
export const authenticateJWT = passport.authenticate("jwt", { session: false });

// Middleware for local authentication (username/password)
export const authenticateLocal = passport.authenticate("local", {
  session: false,
});

export default passport;
