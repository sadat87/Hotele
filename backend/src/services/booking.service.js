import { Booking } from "../models/Booking.model.js";
import { Room } from "../models/Room.model.js";
import { RoomType } from "../models/RoomType.model.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { availabilityService } from "./availability.service.js";
import { pricingService } from "./pricing.service.js";

/**
 * Booking service for creating, updating, cancelling bookings
 */
export const bookingService = {
  /**
   * Create a new booking
   */
  createBooking: async (userId, bookingData) => {
    const { roomId, checkInDate, checkOutDate, numberOfGuests, specialRequests, offerCode } =
      bookingData;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Validate dates
    if (checkOut <= checkIn) {
      throw new ApiError(400, "Check-out date must be after check-in date");
    }

    // Check availability
    const availability = await availabilityService.checkAvailability(roomId, checkIn, checkOut);

    if (!availability.available) {
      throw new ApiError(400, availability.reason);
    }

    const room = availability.room;

    if (numberOfGuests > room.roomType.maxGuests) {
      throw new ApiError(400, `Room can accommodate maximum ${room.roomType.maxGuests} guests`);
    }

    // Calculate pricing
    const pricing = await pricingService.calculatePrice(
      roomId,
      checkIn,
      checkOut,
      numberOfGuests,
      offerCode
    );

    // Create booking
    const booking = new Booking({
      customer: userId,
      hotel: room.hotel,
      room: roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfGuests,
      numberOfNights: pricing.numberOfNights,
      pricePerNight: pricing.pricePerNight,
      discount: pricing.discount,
      taxes: pricing.taxes,
      totalAmount: pricing.totalAmount,
      status: "PENDING",
      specialRequests,
    });

    await booking.save();

    logger.info(`Booking created: ${booking.bookingNumber}`);

    return booking.populate("customer room hotel");
  },

  /**
   * Get booking by ID
   */
  getBooking: async (bookingId, userId = null) => {
    const booking = await Booking.findById(bookingId).populate("customer room hotel payment");

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    // Customer can only view their own bookings
    if (userId && booking.customer._id.toString() !== userId.toString()) {
      throw new ApiError(403, "You can only view your own bookings");
    }

    return booking;
  },

  /**
   * Get user's bookings
   */
  getUserBookings: async (userId, filters = {}) => {
    const query = { customer: userId };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.fromDate) {
      query.checkInDate = { $gte: new Date(filters.fromDate) };
    }

    if (filters.toDate) {
      query.checkOutDate = { $lte: new Date(filters.toDate) };
    }

    const bookings = await Booking.find(query)
      .populate("room hotel")
      .sort({ createdAt: -1 });

    return bookings;
  },

  /**
   * Update booking
   */
  updateBooking: async (bookingId, userId, updateData) => {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    if (booking.customer.toString() !== userId.toString()) {
      throw new ApiError(403, "You can only update your own bookings");
    }

    if (booking.status !== "PENDING") {
      throw new ApiError(400, "Can only update pending bookings");
    }

    // If dates are being changed, check availability
    if (updateData.checkInDate || updateData.checkOutDate) {
      const checkIn = updateData.checkInDate ? new Date(updateData.checkInDate) : booking.checkInDate;
      const checkOut = updateData.checkOutDate ? new Date(updateData.checkOutDate) : booking.checkOutDate;

      const availability = await availabilityService.checkAvailability(
        booking.room,
        checkIn,
        checkOut
      );

      if (!availability.available) {
        throw new ApiError(400, availability.reason);
      }

      // Recalculate price
      const pricing = await pricingService.calculatePrice(
        booking.room,
        checkIn,
        checkOut,
        updateData.numberOfGuests || booking.numberOfGuests
      );

      booking.checkInDate = checkIn;
      booking.checkOutDate = checkOut;
      booking.numberOfNights = pricing.numberOfNights;
      booking.pricePerNight = pricing.pricePerNight;
      booking.totalAmount = pricing.totalAmount;
      booking.taxes = pricing.taxes;
    }

    if (updateData.numberOfGuests) {
      booking.numberOfGuests = updateData.numberOfGuests;
    }

    if (updateData.specialRequests) {
      booking.specialRequests = updateData.specialRequests;
    }

    await booking.save();

    logger.info(`Booking updated: ${booking.bookingNumber}`);

    return booking.populate("customer room hotel");
  },

  /**
   * Cancel booking
   */
  cancelBooking: async (bookingId, userId, cancellationReason) => {
    const booking = await Booking.findById(bookingId).populate("hotel");

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    if (booking.customer.toString() !== userId.toString()) {
      throw new ApiError(403, "You can only cancel your own bookings");
    }

    if (["CHECKED_OUT", "CANCELLED"].includes(booking.status)) {
      throw new ApiError(400, `Cannot cancel a ${booking.status.toLowerCase()} booking`);
    }

    // Calculate refund based on hotel's cancellation policy
    const hoursUntilCheckIn = (booking.checkInDate - new Date()) / (1000 * 60 * 60);
    const freeUntil = booking.hotel.cancellationPolicy.freeUntilHoursBeforeCheckIn;

    let refundAmount = 0;
    if (hoursUntilCheckIn >= freeUntil) {
      // Full refund
      refundAmount = booking.totalAmount;
    } else {
      // Partial refund
      refundAmount = (booking.totalAmount * booking.hotel.cancellationPolicy.refundPercentage) / 100;
    }

    booking.status = "CANCELLED";
    booking.cancellation = {
      cancelledAt: new Date(),
      cancelledBy: userId,
      reason: cancellationReason,
      refundAmount,
      refundStatus: "PENDING",
    };

    await booking.save();

    logger.info(`Booking cancelled: ${booking.bookingNumber}, refund: ${refundAmount}`);

    return booking.populate("customer room hotel");
  },

  /**
   * Confirm booking (after payment)
   */
  confirmBooking: async (bookingId, paymentId) => {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new ApiError(404, "Booking not found");
    }

    booking.status = "CONFIRMED";
    booking.payment = paymentId;

    // Update room status if booking starts today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(booking.checkInDate);
    checkInDate.setHours(0, 0, 0, 0);

    if (checkInDate.getTime() === today.getTime()) {
      const room = await Room.findById(booking.room);
      room.status = "OCCUPIED";
      room.currentGuests = booking.numberOfGuests;
      room.currentBooking = bookingId;
      await room.save();
    }

    await booking.save();

    logger.info(`Booking confirmed: ${booking.bookingNumber}`);

    return booking.populate("customer room hotel payment");
  },
};
