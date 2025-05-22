import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import "./config/database.js";
import cors from "cors";
import corsOptions from "./config/cors.js";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));
// Serve static files
app.use(express.static("public"));

// Set security HTTP headers

// Routes
app.use("/api/auth", authRoutes);
// Error handling
app.use(errorHandler);

// Start server
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
