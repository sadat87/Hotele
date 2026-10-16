import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Hotel description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    image: {
      type: String,
      default: null,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
    },
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      website: String,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    totalRooms: {
      type: Number,
      required: [true, "Total rooms is required"],
      min: [1, "Hotel must have at least 1 room"],
    },
    availableRooms: {
      type: Number,
      default: 0,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    checkInTime: {
      type: String,
      default: "14:00", // HH:mm format
    },
    checkOutTime: {
      type: String,
      default: "11:00", // HH:mm format
    },
    cancellationPolicy: {
      freeUntilHoursBeforeCheckIn: {
        type: Number,
        default: 24,
      },
      refundPercentage: {
        type: Number,
        default: 100,
        min: [0, "Refund percentage cannot be less than 0"],
        max: [100, "Refund percentage cannot exceed 100"],
      },
    },
    bankingDetails: {
      accountHolderName: String,
      accountNumber: String,
      routingNumber: String,
      bankName: String,
    },
  },
  {
    timestamps: true,
    indexes: [{ name: 1, unique: true }, { manager: 1 }, { isActive: 1 }, { city: 1 }],
  }
);

export const Hotel = mongoose.model("Hotel", hotelSchema);
