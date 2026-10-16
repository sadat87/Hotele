import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Room type name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      minlength: [10, "Description must be at least 10 characters"],
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Hotel reference is required"],
      index: true,
    },
    maxGuests: {
      type: Number,
      required: [true, "Max guests is required"],
      min: [1, "Room must accommodate at least 1 guest"],
      max: [20, "Room cannot accommodate more than 20 guests"],
    },
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
      min: [0, "Price cannot be negative"],
    },
    discount: {
      percentage: {
        type: Number,
        default: 0,
        min: [0, "Discount cannot be less than 0"],
        max: [100, "Discount cannot exceed 100"],
      },
      validFrom: Date,
      validUntil: Date,
    },
    amenities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenity",
      },
    ],
    size: {
      type: String,
      enum: {
        values: ["COMPACT", "STANDARD", "SPACIOUS"],
        message: "Invalid size. Must be COMPACT, STANDARD, or SPACIOUS",
      },
    },
    bedType: {
      type: String,
      enum: {
        values: ["SINGLE", "DOUBLE", "QUEEN", "KING"],
        message: "Invalid bed type",
      },
    },
    numberOfBeds: {
      type: Number,
      default: 1,
      min: [1, "Must have at least 1 bed"],
    },
    images: [String],
    features: {
      airConditioning: { type: Boolean, default: true },
      wifi: { type: Boolean, default: true },
      flatscreenTV: { type: Boolean, default: true },
      miniBar: { type: Boolean, default: false },
      balcony: { type: Boolean, default: false },
      bathtub: { type: Boolean, default: false },
      shower: { type: Boolean, default: true },
      hairdryer: { type: Boolean, default: true },
      workDesk: { type: Boolean, default: true },
      safe: { type: Boolean, default: true },
    },
    occupancyRate: {
      type: Number,
      default: 0,
      min: [0, "Occupancy cannot be less than 0"],
      max: [100, "Occupancy cannot exceed 100"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    indexes: [{ hotel: 1 }, { isActive: 1 }],
  }
);

export const RoomType = mongoose.model("RoomType", roomTypeSchema);
