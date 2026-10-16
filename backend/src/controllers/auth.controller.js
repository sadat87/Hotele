import { asyncHandler, ApiError } from "../utils/ApiError.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { authService } from "../services/auth.service.js";
import { logger } from "../utils/logger.js";

/**
 * Auth Controller
 */
export const authController = {
  /**
   * Register new user
   * POST /api/auth/register
   */
  register: asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;

    const user = await authService.registerUser({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    return sendSuccess(res, 201, { user: user.toJSON() }, "User registered successfully");
  }),

  /**
   * Login user
   * POST /api/auth/login
   */
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    // Set refresh token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return sendSuccess(res, 200, { user, accessToken, refreshToken }, "Login successful");
  }),

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  refreshToken: asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }

    const { accessToken, user } = await authService.refreshAccessToken(refreshToken, req.user._id);

    return sendSuccess(res, 200, { accessToken, user }, "Token refreshed successfully");
  }),

  /**
   * Logout user
   * POST /api/auth/logout
   */
  logout: asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }

    await authService.logoutUser(req.user._id, refreshToken);

    // Clear refresh token cookie
    res.clearCookie("refreshToken");

    return sendSuccess(res, 200, null, "Logout successful");
  }),

  /**
   * Logout from all devices
   * POST /api/auth/logout-all
   */
  logoutAllDevices: asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }

    await authService.logoutAllDevices(req.user._id);

    res.clearCookie("refreshToken");

    return sendSuccess(res, 200, null, "Logged out from all devices");
  }),

  /**
   * Get current user
   * GET /api/auth/me
   */
  getCurrentUser: asyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(401, "User not authenticated");
    }

    return sendSuccess(res, 200, { user: req.user.toJSON() }, "User profile retrieved");
  }),
};
