import dotenv from "dotenv";

dotenv.config();

// Environment
const NODE_ENV = process.env.NODE_ENV || "development";

// Server config
const PORT = process.env.PORT || 5000;

// App configs
const config = {
  env: NODE_ENV,
  isDev: NODE_ENV === "development",
  isProd: NODE_ENV === "production",
  isTest: NODE_ENV === "test",
  port: PORT,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
};

export default config;
