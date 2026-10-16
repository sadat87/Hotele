import express from "express";
import { bookingsController } from "../controllers/bookings.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { bookingValidators } from "../validators/booking.validator.js";
import { asyncHandler } from "../utils/ApiError.js";

const router = express.Router();

/**
 * Bookings Routes (all protected)
 */

// Check availability
router.get("/availability/check", asyncHandler(bookingsController.checkAvailability));

router.get("/available-rooms", asyncHandler(bookingsController.getAvailableRooms));

// Protected routes
router.post(
  "/",
  verifyToken,
  validateBody(bookingValidators.create.shape.body),
  asyncHandler(bookingsController.createBooking)
);

router.get("/my-bookings", verifyToken, asyncHandler(bookingsController.getMyBookings));

router.get("/:id", verifyToken, asyncHandler(bookingsController.getBooking));

router.patch(
  "/:id",
  verifyToken,
  validateBody(bookingValidators.update.shape.body),
  asyncHandler(bookingsController.updateBooking)
);

router.post(
  "/:id/cancel",
  verifyToken,
  validateBody(bookingValidators.cancel.shape.body),
  asyncHandler(bookingsController.cancelBooking)
);

export default router;
