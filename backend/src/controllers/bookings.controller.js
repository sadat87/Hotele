import { asyncHandler } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/response.js";
import { bookingService } from "../services/booking.service.js";
import { availabilityService } from "../services/availability.service.js";

/**
 * Bookings Controller
 */
export const bookingsController = {
  /**
   * Create new booking
   * POST /api/bookings
   */
  createBooking: asyncHandler(async (req, res) => {
    const booking = await bookingService.createBooking(req.user._id, req.body);

    return sendSuccess(res, 201, { booking }, "Booking created successfully");
  }),

  /**
   * Get user's bookings
   * GET /api/bookings/my-bookings
   */
  getMyBookings: asyncHandler(async (req, res) => {
    const bookings = await bookingService.getUserBookings(req.user._id, req.query);

    return sendSuccess(res, 200, { bookings }, "Bookings retrieved successfully");
  }),

  /**
   * Get booking by ID
   * GET /api/bookings/:id
   */
  getBooking: asyncHandler(async (req, res) => {
    const booking = await bookingService.getBooking(req.params.id, req.user._id);

    return sendSuccess(res, 200, { booking }, "Booking retrieved successfully");
  }),

  /**
   * Update booking
   * PATCH /api/bookings/:id
   */
  updateBooking: asyncHandler(async (req, res) => {
    const booking = await bookingService.updateBooking(req.params.id, req.user._id, req.body);

    return sendSuccess(res, 200, { booking }, "Booking updated successfully");
  }),

  /**
   * Cancel booking
   * POST /api/bookings/:id/cancel
   */
  cancelBooking: asyncHandler(async (req, res) => {
    const booking = await bookingService.cancelBooking(
      req.params.id,
      req.user._id,
      req.body.reason
    );

    return sendSuccess(res, 200, { booking }, "Booking cancelled successfully");
  }),

  /**
   * Check room availability
   * GET /api/bookings/availability/check
   */
  checkAvailability: asyncHandler(async (req, res) => {
    const { roomId, checkInDate, checkOutDate } = req.query;

    const availability = await availabilityService.checkAvailability(
      roomId,
      new Date(checkInDate),
      new Date(checkOutDate)
    );

    return sendSuccess(res, 200, { availability }, "Availability checked");
  }),

  /**
   * Get available rooms for hotel
   * GET /api/bookings/available-rooms
   */
  getAvailableRooms: asyncHandler(async (req, res) => {
    const { hotelId, checkInDate, checkOutDate, guests } = req.query;

    const rooms = await availabilityService.getAvailableRooms(
      hotelId,
      new Date(checkInDate),
      new Date(checkOutDate),
      guests ? parseInt(guests) : null
    );

    return sendSuccess(res, 200, { rooms }, "Available rooms retrieved");
  }),
};
