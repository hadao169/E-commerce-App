import mongoose from "mongoose";
import dotenv from "dotenv";
import { info, errors } from "../utils/logger.js";
console.log(info);

dotenv.config();

mongoose.set("strictQuery", false);
info("connecting to ", process.env.MONGODB_URI);
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    errors("error connecting to MongoDB:", error.message);
  });
