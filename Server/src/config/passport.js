import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import { errors } from "../utils/logger.js";
import { comparePassword } from "../utils/hashPassword.js";
import env from "./env.js"; // Dùng export default nên KHÔNG cần destructure
import { generateAccessToken } from "./jwt.js";

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

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === "  "
          ? env.GOOGLE_CALLBACK_URL
          : "http://localhost:4000/api/auth/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        if (!profile.emails || !profile.emails[0]) {
          return cb(new Error("No email provided by Google"), null);
        }

        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
          return cb(null, user);
        }

        // Create new user if it doesn't exist
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: email,
          isVerified: true,
        });

        return cb(null, user);
      } catch (err) {
        errors("Google authentication error:", err.message);
        return cb(err, null);
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

// Middleware for Google OAuth
// Middleware cho route bắt đầu OAuth (gửi scope)
export const authenticateGoogleStart = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
  failureRedirect: "/login",
});

// Middleware cho route callback (xử lý sau khi Google trả về)
export const authenticateGoogleCallback = passport.authenticate("google", {
  session: false,
  failureRedirect: "/login",
});

export default passport;
