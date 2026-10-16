import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Token service for JWT operations
 */
export const tokenService = {
  /**
   * Generate access token
   */
  generateAccessToken: (userId) => {
    return jwt.sign({ id: userId }, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRY,
    });
  },

  /**
   * Generate refresh token
   */
  generateRefreshToken: (userId) => {
    return jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRY,
    });
  },

  /**
   * Verify access token
   */
  verifyAccessToken: (token) => {
    try {
      return jwt.verify(token, env.JWT_ACCESS_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, "Access token has expired");
      }
      throw new ApiError(401, "Invalid access token");
    }
  },

  /**
   * Verify refresh token
   */
  verifyRefreshToken: (token) => {
    try {
      return jwt.verify(token, env.JWT_REFRESH_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(401, "Refresh token has expired");
      }
      throw new ApiError(401, "Invalid refresh token");
    }
  },

  /**
   * Decode token without verification
   */
  decodeToken: (token) => {
    return jwt.decode(token);
  },
};
