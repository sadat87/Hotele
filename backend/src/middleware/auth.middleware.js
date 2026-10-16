import { ApiError, asyncHandler } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.model.js";

/**
 * Verify JWT token and attach user to request
 */
export const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    // Get token from header or cookies
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "No authentication token provided");
    }

    // Verify token
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (!user.isActive) {
      throw new ApiError(403, "User account is deactivated");
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "Invalid token");
    }
    throw error;
  }
});

/**
 * Verify refresh token
 */
export const verifyRefreshToken = asyncHandler(async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!refreshToken) {
      throw new ApiError(401, "No refresh token provided");
    }

    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if token is in user's refresh tokens list
    const isTokenValid = user.refreshTokens.some((rt) => rt.token === refreshToken);

    if (!isTokenValid) {
      throw new ApiError(401, "Refresh token is invalid or has been revoked");
    }

    req.user = user;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Refresh token has expired");
    }
    throw error;
  }
});

/**
 * Check if user has required role
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, `This action requires one of these roles: ${allowedRoles.join(", ")}`);
    }

    next();
  };
};

/**
 * Check if user is admin
 */
export const isAdmin = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "User not authenticated");
  }

  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "This action is only for administrators");
  }

  next();
};

/**
 * Check if user is manager
 */
export const isManager = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!["ADMIN", "MANAGER"].includes(req.user.role)) {
    throw new ApiError(403, "This action is only for managers and administrators");
  }

  next();
};

/**
 * Check if user is staff
 */
export const isStaff = (req, res, next) => {
  if (!req.user) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!["ADMIN", "MANAGER", "STAFF"].includes(req.user.role)) {
    throw new ApiError(403, "This action requires staff or higher role");
  }

  next();
};
