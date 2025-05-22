import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import "./config/database.js";
dotenv.config();

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: config.clientUrl, credentials: true }));
// Serve static files
app.use(express.static("public"));

// Set security HTTP headers

// Routes
app.use("/api/auth", authRoutes);
// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
