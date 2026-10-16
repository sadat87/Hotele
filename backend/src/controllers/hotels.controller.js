import { asyncHandler, ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/response.js";
import { Hotel } from "../models/Hotel.model.js";
import { Booking } from "../models/Booking.model.js";
import { availabilityService } from "../services/availability.service.js";

/**
 * Hotels Controller
 */
export const hotelsController = {
  /**
   * Get all hotels
   * GET /api/hotels
   */
  getAllHotels: asyncHandler(async (req, res) => {
    const { city, search, page = 1, limit = 10 } = req.query;

    const query = { isActive: true };

    if (city) query["address.city"] = city;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const hotels = await Hotel.find(query)
      .populate("manager", "firstName lastName email")
      .populate("amenities")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });

    const total = await Hotel.countDocuments(query);

    return sendSuccess(res, 200, { hotels, pagination: { total, page, limit } }, "Hotels retrieved");
  }),

  /**
   * Get hotel by ID
   * GET /api/hotels/:id
   */
  getHotel: asyncHandler(async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)
      .populate("manager", "firstName lastName email")
      .populate("amenities");

    if (!hotel) {
      throw new ApiError(404, "Hotel not found");
    }

    return sendSuccess(res, 200, { hotel }, "Hotel retrieved successfully");
  }),

  /**
   * Create hotel (Admin only)
   * POST /api/hotels
   */
  createHotel: asyncHandler(async (req, res) => {
    const hotel = new Hotel(req.body);
    await hotel.save();

    return sendSuccess(res, 201, { hotel }, "Hotel created successfully");
  }),

  /**
   * Update hotel (Manager/Admin only)
   * PATCH /api/hotels/:id
   */
  updateHotel: asyncHandler(async (req, res) => {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!hotel) {
      throw new ApiError(404, "Hotel not found");
    }

    return sendSuccess(res, 200, { hotel }, "Hotel updated successfully");
  }),

  /**
   * Get hotel analytics (Manager/Admin)
   * GET /api/hotels/:id/analytics
   */
  getHotelAnalytics: asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      throw new ApiError(404, "Hotel not found");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Get occupancy rate
    const occupancy = await availabilityService.getOccupancyRate(hotel._id, start, end);

    // Get bookings
    const bookings = await Booking.find({
      hotel: hotel._id,
      status: { $ne: "CANCELLED" },
      checkInDate: { $gte: start },
      checkOutDate: { $lte: end },
    });

    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const avgBookingValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;

    return sendSuccess(res, 200, {
      analytics: {
        occupancyRate: occupancy.occupancyRate,
        totalBookings: bookings.length,
        totalRevenue,
        avgBookingValue,
        bookedRoomDays: occupancy.bookedRoomDays,
        totalRoomDays: occupancy.totalRoomDays,
      },
    });
  }),

  /**
   * Get hotel occupancy trends (Manager/Admin)
   * GET /api/hotels/:id/occupancy-trends
   */
  getOccupancyTrends: asyncHandler(async (req, res) => {
    const { months = 6 } = req.query;

    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      throw new ApiError(404, "Hotel not found");
    }

    const trends = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);

      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const occupancy = await availabilityService.getOccupancyRate(hotel._id, startDate, endDate);

      trends.push({
        month: startDate.toLocaleString("default", { month: "short", year: "numeric" }),
        occupancyRate: occupancy.occupancyRate,
      });
    }

    return sendSuccess(res, 200, { trends }, "Occupancy trends retrieved");
  }),
};
