import express from "express";
import { usersController } from "../controllers/users.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/ApiError.js";

const router = express.Router();

/**
 * Users Routes
 */

// Protected routes
router.get("/profile", verifyToken, asyncHandler(usersController.getProfile));

router.patch("/profile", verifyToken, asyncHandler(usersController.updateProfile));

router.post("/change-password", verifyToken, asyncHandler(usersController.changePassword));

// Admin routes
router.get("/", verifyToken, isAdmin, asyncHandler(usersController.getAllUsers));

router.get("/:id", verifyToken, isAdmin, asyncHandler(usersController.getUserById));

router.patch("/:id", verifyToken, isAdmin, asyncHandler(usersController.updateUser));

router.delete("/:id", verifyToken, isAdmin, asyncHandler(usersController.deleteUser));

export default router;
