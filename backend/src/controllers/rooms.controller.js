import { asyncHandler, ApiError } from "../utils/ApiError.js";
import { sendSuccess } from "../utils/response.js";
import { Room } from "../models/Room.model.js";
import { RoomType } from "../models/RoomType.model.js";
import { availabilityService } from "../services/availability.service.js";

/**
 * Rooms Controller
 */
export const roomsController = {
  /**
   * Get all rooms for a hotel
   * GET /api/rooms?hotelId=:id
   */
  getRoomsByHotel: asyncHandler(async (req, res) => {
    const { hotelId, status } = req.query;

    const query = { hotel: hotelId, isActive: true };
    if (status) query.status = status;

    const rooms = await Room.find(query).populate("roomType").sort({ roomNumber: 1 });

    return sendSuccess(res, 200, { rooms }, "Rooms retrieved successfully");
  }),

  /**
   * Get room by ID
   * GET /api/rooms/:id
   */
  getRoom: asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id).populate("roomType hotel");

    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    return sendSuccess(res, 200, { room }, "Room retrieved successfully");
  }),

  /**
   * Create room (Manager/Admin only)
   * POST /api/rooms
   */
  createRoom: asyncHandler(async (req, res) => {
    const { roomNumber, roomTypeId, hotelId, floor } = req.body;

    // Check if room already exists
    const existing = await Room.findOne({ hotel: hotelId, roomNumber });
    if (existing) {
      throw new ApiError(409, "Room number already exists for this hotel");
    }

    const room = new Room({
      roomNumber,
      roomType: roomTypeId,
      hotel: hotelId,
      floor,
    });

    await room.save();

    return sendSuccess(res, 201, { room }, "Room created successfully");
  }),

  /**
   * Update room
   * PATCH /api/rooms/:id
   */
  updateRoom: asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    Object.assign(room, req.body);
    await room.save();

    return sendSuccess(res, 200, { room }, "Room updated successfully");
  }),

  /**
   * Delete room (deactivate)
   * DELETE /api/rooms/:id
   */
  deleteRoom: asyncHandler(async (req, res) => {
    const room = await Room.findById(req.params.id);

    if (!room) {
      throw new ApiError(404, "Room not found");
    }

    room.isActive = false;
    await room.save();

    return sendSuccess(res, 200, null, "Room deleted successfully");
  }),

  /**
   * Get room availability calendar
   * GET /api/rooms/:id/calendar
   */
  getAvailabilityCalendar: asyncHandler(async (req, res) => {
    const { year, month } = req.query;

    const calendar = await availabilityService.getRoomAvailabilityCalendar(
      req.params.id,
      parseInt(year),
      parseInt(month)
    );

    return sendSuccess(res, 200, { calendar }, "Availability calendar retrieved");
  }),

  /**
   * Get room types
   * GET /api/room-types?hotelId=:id
   */
  getRoomTypes: asyncHandler(async (req, res) => {
    const { hotelId } = req.query;

    const roomTypes = await RoomType.find({
      hotel: hotelId,
      isActive: true,
    }).populate("amenities");

    return sendSuccess(res, 200, { roomTypes }, "Room types retrieved successfully");
  }),

  /**
   * Create room type
   * POST /api/room-types
   */
  createRoomType: asyncHandler(async (req, res) => {
    const roomType = new RoomType(req.body);
    await roomType.save();

    return sendSuccess(res, 201, { roomType }, "Room type created successfully");
  }),

  /**
   * Update room type
   * PATCH /api/room-types/:id
   */
  updateRoomType: asyncHandler(async (req, res) => {
    const roomType = await RoomType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!roomType) {
      throw new ApiError(404, "Room type not found");
    }

    return sendSuccess(res, 200, { roomType }, "Room type updated successfully");
  }),
};
