import dotenv from "dotenv";

dotenv.config();

export const env = {
  // Environment
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT, 10) || 5000,

  // Database
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/hotel_management_system",

  // JWT
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "your_super_secret_access_token_key_min_32_chars",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your_super_secret_refresh_token_key_min_32_chars",
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || "15m",
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",

  // Encryption
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,

  // Payment
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || "",

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
};

// Validate critical environment variables
if (!env.JWT_ACCESS_SECRET || env.JWT_ACCESS_SECRET.includes("your_super_secret")) {
  console.warn("⚠️  JWT_ACCESS_SECRET is not properly set in environment variables");
}

if (!env.JWT_REFRESH_SECRET || env.JWT_REFRESH_SECRET.includes("your_super_secret")) {
  console.warn("⚠️  JWT_REFRESH_SECRET is not properly set in environment variables");
}
