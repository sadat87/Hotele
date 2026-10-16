import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

/**
 * Global error handling middleware
 * Must be defined after all other middleware and route handlers
 */
export const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, err);

  // Handle ApiError instances
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors || null,
      success: false,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});

    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed",
      errors,
      success: false,
    });
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      statusCode: 409,
      message: `${field} already exists`,
      errors: { [field]: `${field} already exists` },
      success: false,
    });
  }

  // Handle CastError (invalid MongoDB ID)
  if (err.name === "CastError") {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid ID format",
      errors: { id: "Invalid ID format" },
      success: false,
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      statusCode: 401,
      message: "Invalid token",
      success: false,
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      statusCode: 401,
      message: "Token has expired",
      success: false,
    });
  }

  // Default error response
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal server error",
    success: false,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
