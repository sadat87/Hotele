import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
    },
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoomType",
      required: [true, "Room type is required"],
      index: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Hotel reference is required"],
      index: true,
    },
    floor: {
      type: Number,
      required: [true, "Floor number is required"],
      min: [0, "Floor cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ["AVAILABLE", "OCCUPIED", "MAINTENANCE", "RESERVED"],
        message: "Invalid status",
      },
      default: "AVAILABLE",
      index: true,
    },
    currentGuests: {
      type: Number,
      default: 0,
      min: [0, "Current guests cannot be negative"],
    },
    currentBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    maintenanceSchedule: [
      {
        startDate: Date,
        endDate: Date,
        reason: String,
        notes: String,
      },
    ],
    lastMaintenanceDate: {
      type: Date,
      default: null,
    },
    cleanliness: {
      lastCleanedAt: Date,
      status: {
        type: String,
        enum: {
          values: ["CLEAN", "DIRTY", "IN_PROGRESS"],
          message: "Invalid cleanliness status",
        },
        default: "CLEAN",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      { hotel: 1, roomNumber: 1, unique: true },
      { roomType: 1 },
      { status: 1 },
      { isActive: 1 },
    ],
  }
);

export const Room = mongoose.model("Room", roomSchema);
