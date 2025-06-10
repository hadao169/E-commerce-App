import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import env from "./config/env.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import "./config/database.js";
import cors from "cors";
import corsOptions from "./config/cors.js";
import helmet from "helmet";

const app = express();

// Security middleware
app.use(helmet());
app.use(cors(corsOptions));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Set security HTTP headers

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
// Error handling
app.use(errorHandler);

// Start server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
