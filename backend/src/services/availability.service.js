import { Room } from "../models/Room.model.js";
import { Booking } from "../models/Booking.model.js";
import { RoomType } from "../models/RoomType.model.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";

/**
 * Availability service for room availability checks and calculations
 */
export const availabilityService = {
  /**
   * Check room availability for a date range
   */
  checkAvailability: async (roomId, checkInDate, checkOutDate) => {
    const room = await Room.findById(roomId).populate("roomType");

    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    if (!room.isActive) {
      throw new ApiError(400, "Room is not available");
    }

    // Find overlapping bookings
    const overlappingBookings = await Booking.findOne({
      room: roomId,
      $or: [
        {
          checkInDate: { $lt: checkOutDate },
          checkOutDate: { $gt: checkInDate },
        },
      ],
      status: { $ne: "CANCELLED" },
    });

    if (overlappingBookings) {
      return {
        available: false,
        reason: "Room is already booked for this period",
      };
    }

    // Check for maintenance
    const hasMaintenance = room.maintenanceSchedule.some(
      (schedule) => schedule.startDate < checkOutDate && schedule.endDate > checkInDate
    );

    if (hasMaintenance) {
      return {
        available: false,
        reason: "Room is under maintenance during this period",
      };
    }

    return {
      available: true,
      room,
    };
  },

  /**
   * Get available rooms for a hotel
   */
  getAvailableRooms: async (hotelId, checkInDate, checkOutDate, numberOfGuests) => {
    // Find all rooms of this hotel
    const rooms = await Room.find({
      hotel: hotelId,
      isActive: true,
    }).populate("roomType");

    // Filter by max guests if provided
    let filtered = rooms;
    if (numberOfGuests) {
      filtered = rooms.filter((r) => r.roomType.maxGuests >= numberOfGuests);
    }

    // Check availability for each room
    const availability = await Promise.all(
      filtered.map(async (room) => {
        const available = await this.checkAvailability(room._id, checkInDate, checkOutDate);
        return {
          room,
          available: available.available,
        };
      })
    );

    return availability.filter((a) => a.available).map((a) => a.room);
  },

  /**
   * Get occupancy rate for a hotel
   */
  getOccupancyRate: async (hotelId, startDate, endDate) => {
    const rooms = await Room.find({ hotel: hotelId, isActive: true });
    const totalRoomDays = rooms.length * Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    const bookings = await Booking.find({
      hotel: hotelId,
      checkInDate: { $lt: endDate },
      checkOutDate: { $gt: startDate },
      status: { $ne: "CANCELLED" },
    });

    let bookedRoomDays = 0;
    bookings.forEach((booking) => {
      const inDate = new Date(Math.max(booking.checkInDate, startDate));
      const outDate = new Date(Math.min(booking.checkOutDate, endDate));
      bookedRoomDays += Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    });

    return {
      occupancyRate: (bookedRoomDays / totalRoomDays) * 100,
      bookedRoomDays,
      totalRoomDays,
    };
  },

  /**
   * Get room availability calendar for a month
   */
  getRoomAvailabilityCalendar: async (roomId, year, month) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const bookings = await Booking.find({
      room: roomId,
      checkInDate: { $lt: endDate },
      checkOutDate: { $gt: startDate },
      status: { $ne: "CANCELLED" },
    });

    const daysInMonth = new Date(year, month, 0).getDate();
    const calendar = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const isBooked = bookings.some(
        (booking) => booking.checkInDate <= date && date < booking.checkOutDate
      );
      calendar[day] = isBooked ? "BOOKED" : "AVAILABLE";
    }

    return calendar;
  },
};
