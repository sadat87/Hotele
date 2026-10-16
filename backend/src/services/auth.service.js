import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { tokenService } from "./token.service.js";
import { logger } from "../utils/logger.js";

/**
 * Authentication service
 */
export const authService = {
  /**
   * Register new user
   */
  registerUser: async (userData) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    // Create new user
    const user = new User({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || null,
      role: userData.role || "CUSTOMER",
    });

    await user.save();

    logger.info(`New user registered: ${user.email}`);

    return user;
  },

  /**
   * Login user
   */
  loginUser: async (email, password) => {
    // Find user by email and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Your account has been deactivated");
    }

    // Generate tokens
    const accessToken = tokenService.generateAccessToken(user._id);
    const refreshToken = tokenService.generateRefreshToken(user._id);

    // Save refresh token to database
    user.refreshTokens.push({ token: refreshToken });
    user.lastLoginAt = new Date();
    await user.save();

    logger.info(`User logged in: ${user.email}`);

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
    };
  },

  /**
   * Refresh access token
   */
  refreshAccessToken: async (refreshToken, userId) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Verify refresh token
    tokenService.verifyRefreshToken(refreshToken);

    // Check if token exists in user's refresh tokens
    const isTokenValid = user.refreshTokens.some((rt) => rt.token === refreshToken);

    if (!isTokenValid) {
      throw new ApiError(401, "Refresh token is invalid or has been revoked");
    }

    // Generate new access token
    const newAccessToken = tokenService.generateAccessToken(user._id);

    logger.debug(`Access token refreshed for user: ${user.email}`);

    return {
      accessToken: newAccessToken,
      user: user.toJSON(),
    };
  },

  /**
   * Logout user
   */
  logoutUser: async (userId, refreshToken) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Remove refresh token from database
    user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== refreshToken);
    await user.save();

    logger.info(`User logged out: ${user.email}`);

    return true;
  },

  /**
   * Logout all devices (revoke all refresh tokens)
   */
  logoutAllDevices: async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.refreshTokens = [];
    await user.save();

    logger.info(`User logged out from all devices: ${user.email}`);

    return true;
  },
};
