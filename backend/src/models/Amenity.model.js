import mongoose from "mongoose";

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Amenity name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String, // Font Awesome icon class or emoji
      default: null,
    },
    category: {
      type: String,
      enum: {
        values: ["ROOM", "HOTEL", "FACILITY"],
        message: "Invalid category. Must be ROOM, HOTEL, or FACILITY",
      },
      default: "ROOM",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    indexes: [{ name: 1, unique: true }, { category: 1 }],
  }
);

export const Amenity = mongoose.model("Amenity", amenitySchema);
