import mongoose from "mongoose";
import { info, errors } from "../utils/logger.js";
import env from "./env.js";

mongoose.set("strictQuery", false);
info("connecting to ", env.MONGODB_URI);
const MONGODB_URI = env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    errors("error connecting to MongoDB:", error.message);
  });
