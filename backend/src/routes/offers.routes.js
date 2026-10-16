import express from "express";
import { offersController } from "../controllers/offers.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/ApiError.js";

const router = express.Router();

/**
 * Offers Routes
 */

// Public routes
router.get("/", asyncHandler(offersController.getAllOffers));

router.get("/:code", asyncHandler(offersController.getOfferByCode));

// Protected routes (Admin only)
router.post("/", verifyToken, isAdmin, asyncHandler(offersController.createOffer));

router.patch("/:id", verifyToken, isAdmin, asyncHandler(offersController.updateOffer));

router.delete("/:id", verifyToken, isAdmin, asyncHandler(offersController.deleteOffer));

export default router;
