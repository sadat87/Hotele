import { asyncHandler, ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/response.js";
import { User } from "../models/User.model.js";

/**
 * Users Controller
 */
export const usersController = {
  /**
   * Get user profile
   * GET /api/users/profile
   */
  getProfile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return sendSuccess(res, 200, { user: user.toJSON() }, "Profile retrieved successfully");
  }),

  /**
   * Update user profile
   * PATCH /api/users/profile
   */
  updateProfile: asyncHandler(async (req, res) => {
    const { firstName, lastName, phone, address } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, phone, address },
      { new: true, runValidators: true }
    );

    return sendSuccess(res, 200, { user: user.toJSON() }, "Profile updated successfully");
  }),

  /**
   * Change password
   * POST /api/users/change-password
   */
  changePassword: asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      throw new ApiError(401, "Current password is incorrect");
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return sendSuccess(res, 200, null, "Password changed successfully");
  }),

  /**
   * Get all users (Admin only)
   * GET /api/users
   */
  getAllUsers: asyncHandler(async (req, res) => {
    const { role, isActive, page = 1, limit = 10 } = req.query;

    const query = {};
    if (role) query.role = role;
    if (isActive !== undefined) query.isActive = isActive === "true";

    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    return sendSuccess(res, 200, { users: users.map((u) => u.toJSON()), pagination: { total, page, limit } });
  }),

  /**
   * Get user by ID (Admin only)
   * GET /api/users/:id
   */
  getUserById: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return sendSuccess(res, 200, { user: user.toJSON() });
  }),

  /**
   * Update user (Admin only)
   * PATCH /api/users/:id
   */
  updateUser: asyncHandler(async (req, res) => {
    const { role, isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role, isActive },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return sendSuccess(res, 200, { user: user.toJSON() }, "User updated successfully");
  }),

  /**
   * Delete user (Admin only)
   * DELETE /api/users/:id
   */
  deleteUser: asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.isActive = false;
    await user.save();

    return sendSuccess(res, 200, null, "User deleted successfully");
  }),
};
