import express from "express";
import { authController } from "../controllers/auth.controller.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { authValidators } from "../validators/auth.validator.js";
import { asyncHandler } from "../utils/ApiError.js";
import { verifyToken, verifyRefreshToken } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Auth Routes
 */

// Public routes
router.post("/register", validateBody(authValidators.register.shape.body), authController.register);

router.post("/login", validateBody(authValidators.login.shape.body), authController.login);

router.post("/refresh", validateBody(authValidators.refreshToken.shape.body), verifyRefreshToken, asyncHandler(authController.refreshToken));

// Protected routes
router.post("/logout", verifyToken, validateBody(authValidators.logout.shape.body), authController.logout);

router.post("/logout-all", verifyToken, authController.logoutAllDevices);

router.get("/me", verifyToken, authController.getCurrentUser);

export default router;
