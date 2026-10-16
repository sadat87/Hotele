import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

let isConnected = false;

export const connectDB = async () => {
  try {
    // Try to connect to MongoDB
    const conn = await mongoose.connect(env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    logger.info(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.warn(`⚠️  MongoDB connection failed: ${error.message}`);
    logger.warn(`⚠️  Running in offline mode. To use database, ensure MongoDB is running.`);
    logger.warn(`⚠️  MongoDB URI: ${env.MONGO_URI}`);
    logger.warn(`⚠️  For cloud database, update MONGO_URI in .env with MongoDB Atlas connection string`);
    
    // Don't exit - allow app to run in offline mode for development
    isConnected = false;
    return null;
  }
};

export const disconnectDB = async () => {
  try {
    if (isConnected) {
      await mongoose.disconnect();
      isConnected = false;
      logger.info("✅ MongoDB disconnected");
    }
  } catch (error) {
    logger.error(`❌ MongoDB disconnection failed: ${error.message}`);
  }
};

export const getDBStatus = () => isConnected;
