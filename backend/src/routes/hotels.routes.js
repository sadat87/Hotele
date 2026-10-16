import express from "express";
import { hotelsController } from "../controllers/hotels.controller.js";
import { roomsController } from "../controllers/rooms.controller.js";
import { verifyToken, isManager, isAdmin } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { asyncHandler } from "../utils/ApiError.js";

const router = express.Router();

/**
 * Hotels Routes
 */

// Public routes
router.get("/", asyncHandler(hotelsController.getAllHotels));

router.get("/:id", asyncHandler(hotelsController.getHotel));

// Protected routes (Admin only)
router.post("/", verifyToken, isAdmin, asyncHandler(hotelsController.createHotel));

router.patch("/:id", verifyToken, isManager, asyncHandler(hotelsController.updateHotel));

// Analytics (Manager/Admin)
router.get("/:id/analytics", verifyToken, isManager, asyncHandler(hotelsController.getHotelAnalytics));

router.get("/:id/occupancy-trends", verifyToken, isManager, asyncHandler(hotelsController.getOccupancyTrends));

/**
 * Room Types Routes
 */

router.get("/types/:hotelId", asyncHandler(roomsController.getRoomTypes));

router.post("/types", verifyToken, isManager, asyncHandler(roomsController.createRoomType));

router.patch("/types/:id", verifyToken, isManager, asyncHandler(roomsController.updateRoomType));

/**
 * Rooms Routes
 */

router.get("/rooms/:hotelId", asyncHandler(roomsController.getRoomsByHotel));

router.get("/rooms/:id/detail", asyncHandler(roomsController.getRoom));

router.post("/rooms", verifyToken, isManager, asyncHandler(roomsController.createRoom));

router.patch("/rooms/:id", verifyToken, isManager, asyncHandler(roomsController.updateRoom));

router.delete("/rooms/:id", verifyToken, isManager, asyncHandler(roomsController.deleteRoom));

router.get("/rooms/:id/calendar", asyncHandler(roomsController.getAvailabilityCalendar));

export default router;
